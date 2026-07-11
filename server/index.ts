// server/index.ts - MongoDB-based server
import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient, Db, ObjectId } from "mongodb";
import { z } from "zod";
import { loanApplicationSchema, predictionSchema, insertLoanSchema, insertPredictionSchema, userProfileSchema } from "../shared/schema";
import { ProductionRiskModels } from "./ml-models";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "loan_risk_platform";

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
let db: Db;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(MONGO_DB_NAME);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

// Utility function to convert ObjectId to string
function convertDoc(doc: any) {
  if (doc && doc._id) {
    return { ...doc, _id: doc._id.toString() };
  }
  return doc;
}

// Initialize production ML models
const mlModels = new ProductionRiskModels();

// Production ML-based risk calculation
function calculateRisk(input: any): {
  defaultProbability: number;
  fraudProbability: number;
  riskBand: string;
  isFraudulent: boolean;
  shapValues: Record<string, number>;
  latencyMs: number;
} {
  const start = Date.now();
  
  // Use production ML models instead of simple rules
  const prediction = mlModels.predict(input);
  
  return {
    defaultProbability: prediction.defaultProbability,
    fraudProbability: prediction.fraudProbability,
    riskBand: prediction.riskBand,
    isFraudulent: prediction.isFraudulent,
    shapValues: prediction.shapValues,
    latencyMs: prediction.latencyMs,
  };
}

// Routes
app.get("/api/test", (_req, res) => {
  res.json({ message: "Server is working", timestamp: new Date().toISOString() });
});

// API: GET /api/models - Get model information
app.get("/api/models", (_req, res) => {
  res.json({
    ...mlModels.getModelInfo(),
    status: "production",
    timestamp: new Date().toISOString()
  });
});

// Function to get next sequential ID
async function getNextSequentialId(): Promise<string> {
  const counter = await db.collection("counters").findOneAndUpdate(
    { name: "loan_application_id" },
    { $inc: { sequence_value: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  
  if (!counter || counter.sequence_value === undefined) {
    throw new Error("Failed to generate sequential ID");
  }
  
  return String(counter.sequence_value).padStart(3, '0');
}

// API: POST /api/loans/analyze - Create loan & analyze
app.post("/api/loans/analyze", async (req, res) => {
  try {
    const body = req.body;
    
    // Validate input
    const validatedData = insertLoanSchema.parse(body);
    
    // Create or update user profile automatically with contact info
    const profileData = {
      name: validatedData.applicantName,
      email: validatedData.emailId || `${validatedData.applicantName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: validatedData.mobileNumber || '+1-555-0000',
      address: validatedData.address || 'Address not provided',
      gender: validatedData.gender,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Check if profile exists and create/update if needed
    const existingProfile = await db.collection("user_profiles").findOne({ 
      name: profileData.name 
    });

    if (!existingProfile) {
      await db.collection("user_profiles").insertOne(profileData);
    } else {
      // Update existing profile with new contact info if provided
      await db.collection("user_profiles").updateOne(
        { name: profileData.name },
        { 
          $set: { 
            email: profileData.email,
            phone: profileData.phone,
            address: profileData.address,
            gender: profileData.gender,
            updatedAt: new Date()
          }
        }
      );
    }
    
    // Get next sequential ID
    const sequentialId = await getNextSequentialId();
    
    // Add createdAt and sequentialId to loan application
    const applicationData = {
      ...validatedData,
      sequentialId: sequentialId,
      createdAt: new Date(),
    };

    // Insert loan application
    const result = await db.collection("loan_applications").insertOne(applicationData);
    const applicationId = result.insertedId.toString();
    
    // Get the inserted record
    const application = await db.collection("loan_applications").findOne({ _id: new ObjectId(applicationId) });

    if (!application) {
      return res.status(500).json({ message: "Failed to create application" });
    }

    // Calculate risk
    const risk = calculateRisk(applicationData);
    
    // Create prediction
    const predictionData = {
      loanApplicationId: applicationId,
      defaultProbability: risk.defaultProbability,
      fraudProbability: risk.fraudProbability,
      riskBand: risk.riskBand,
      isFraudulent: risk.isFraudulent,
      shapValues: risk.shapValues,
      modelVersion: "v1.0-mock",
      latencyMs: risk.latencyMs,
      createdAt: new Date(),
    };

    // Insert prediction
    await db.collection("predictions").insertOne(predictionData);

    res.status(201).json({
      application: convertDoc(application),
      prediction: convertDoc(predictionData),
    });
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: err.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// API: GET /api/loans - List all loans
app.get("/api/loans", async (_req, res) => {
  try {
    const loans = await db.collection("loan_applications").find({}).toArray();
    const loansWithPredictions = await Promise.all(
      loans.map(async (loan: any) => {
        const prediction = await db.collection("predictions").findOne({ 
          loanApplicationId: loan._id.toString() 
        });
        return {
          application: convertDoc(loan),
          prediction: prediction ? convertDoc(prediction) : null,
        };
      })
    );
    
    res.json(loansWithPredictions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API: GET /api/loans/:id - Get single loan
app.get("/api/loans/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const application = await db.collection("loan_applications").findOne({ _id: new ObjectId(id) });

    if (!application) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const prediction = await db.collection("predictions").findOne({ 
      loanApplicationId: id 
    });

    res.json({
      application: convertDoc(application),
      prediction: prediction ? convertDoc(prediction) : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API: GET /api/monitoring/stats
app.get("/api/monitoring/stats", async (_req, res) => {
  try {
    const allPredictions = await db.collection("predictions").find({}).toArray();
    const total = allPredictions.length;
    const avgDefault = total ? allPredictions.reduce((s: number, p: any) => s + p.defaultProbability, 0) / total : 0;
    const avgFraud = total ? allPredictions.reduce((s: number, p: any) => s + p.fraudProbability, 0) / total : 0;
    const highRisk = allPredictions.filter((p: any) => p.riskBand === "HIGH" || p.riskBand === "CRITICAL").length;

    const totalApplications = await db.collection("loan_applications").countDocuments();

    res.json({
      totalApplications,
      avgDefaultRisk: avgDefault,
      avgFraudRisk: avgFraud,
      highRiskCount: highRisk,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API: POST /api/profile - Create or update user profile
app.post("/api/profile", async (req, res) => {
  try {
    const body = req.body;
    
    // Validate input
    const validatedData = userProfileSchema.parse(body);
    
    // Add updatedAt
    const profileData = {
      ...validatedData,
      updatedAt: new Date(),
    };

    // Remove _id from profileData to let MongoDB generate it
    const { _id, ...profileDataWithoutId } = profileData;

    // Check if profile exists
    const existingProfile = await db.collection("user_profiles").findOne({ 
      name: profileData.name 
    });

    let result;
    if (existingProfile) {
      // Update existing profile
      result = await db.collection("user_profiles").updateOne(
        { name: profileData.name },
        { $set: profileDataWithoutId }
      );
    } else {
      // Create new profile with createdAt
      profileDataWithoutId.createdAt = new Date();
      result = await db.collection("user_profiles").insertOne(profileDataWithoutId);
    }

    // Get the updated/created profile
    const profile = await db.collection("user_profiles").findOne({ 
      name: profileData.name 
    });

    res.status(201).json(convertDoc(profile));
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: err.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// API: GET /api/profile/:name - Get user profile with loan history
app.get("/api/profile/:name", async (req, res) => {
  try {
    const name = req.params.name;
    
    // Find user profile by name (optional - may not exist)
    let profile = await db.collection("user_profiles").findOne({ name });

    // Find ALL loans for this person by applicantName
    const loans = await db.collection("loan_applications").find({ 
      applicantName: name 
    }).sort({ createdAt: -1 }).toArray(); // Sort by most recent first

    // If no profile exists but loans exist, create a basic profile
  if (!profile && loans.length > 0) {
    // Get mobile number from most recent loan application
    const mostRecentLoan = loans[0];
    const mobileNumber = mostRecentLoan?.mobileNumber || '+1-555-0000';
    const address = mostRecentLoan?.address || 'Address not provided';
    const gender = mostRecentLoan?.gender;
    
    profile = {
      _id: new ObjectId(),
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: mobileNumber,
      address: address,
      gender: gender,
      createdAt: mostRecentLoan.createdAt || new Date(),
      updatedAt: new Date(),
    };
  }

    // If no loans and no profile, return 404
    if (loans.length === 0 && !profile) {
      return res.status(404).json({ message: "Profile not found and no loan applications" });
    }

    // Get predictions for these loans
    const loansWithPredictions = await Promise.all(
      loans.map(async (loan: any) => {
        const prediction = await db.collection("predictions").findOne({ 
          loanApplicationId: loan._id.toString() 
        });
        return {
          application: convertDoc(loan),
          prediction: prediction ? convertDoc(prediction) : null,
        };
      })
    );

    // Calculate statistics
    const loanCount = loans.length;
    const totalLoanAmount = loans.reduce((sum: number, loan: any) => sum + loan.loanAmount, 0);
    const avgRiskScore = loansWithPredictions.length > 0 
      ? loansWithPredictions.reduce((sum: number, loan: any) => 
          sum + (loan.prediction?.defaultProbability || 0), 0) / loansWithPredictions.length
      : 0;

    res.json({
      profile: convertDoc(profile),
      loanCount,
      loans: loansWithPredictions,
      totalLoanAmount,
      avgRiskScore,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
async function startServer() {
  await connectToMongoDB();
  
  app.listen(PORT, () => {
    console.log(`Loan Risk API running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
