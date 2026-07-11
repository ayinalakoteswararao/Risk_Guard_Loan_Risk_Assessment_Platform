import { z } from "zod";
import { ObjectId } from "mongodb";

// Helper type for MongoDB _id that can be string or ObjectId
const mongoId = z.union([z.string(), z.instanceof(ObjectId)]).optional();

// === MONGODB SCHEMAS ===

// User Profile Schema for MongoDB
export const userProfileSchema = z.object({
  _id: mongoId,
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Loan Application Schema for MongoDB
export const loanApplicationSchema = z.object({
  _id: mongoId,
  sequentialId: z.string().optional(), // Sequential ID for display (001, 002, etc.)
  userId: z.string().optional(), // Reference to user profile
  applicantName: z.string().min(1, "Name is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
  income: z.number().min(0, "Income must be positive"),
  creditScore: z.number().min(300).max(850),
  loanAmount: z.number().min(1000, "Minimum loan amount is $1,000"),
  loanTerm: z.number().min(1, "Loan term must be positive"),
  employmentLength: z.number().min(0, "Employment length must be positive"),
  homeOwnership: z.enum(["RENT", "OWN", "MORTGAGE"]),
  loanPurpose: z.string().min(1, "Loan purpose is required"),
  hasExistingLoans: z.boolean().default(false),
  existingLoanOverdueDelay: z.number().default(0),
  existingLoanCheckBounce: z.number().default(0),
  mobileNumber: z.string().optional(),
  emailId: z.string().optional(),
  address: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

// Prediction Schema for MongoDB
export const predictionSchema = z.object({
  _id: mongoId,
  loanApplicationId: z.string(), // Reference to loan application
  defaultProbability: z.number().min(0).max(1),
  fraudProbability: z.number().min(0).max(1),
  riskBand: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  isFraudulent: z.boolean().default(false),
  shapValues: z.record(z.number()),
  modelVersion: z.string(),
  latencyMs: z.number().optional(),
  createdAt: z.date().default(() => new Date()),
});

// === INSERT SCHEMAS ===

export const insertLoanSchema = loanApplicationSchema.omit({ 
  _id: true, 
  createdAt: true 
});

export const insertPredictionSchema = predictionSchema.omit({ 
  _id: true, 
  createdAt: true 
});

// === TYPES ===

export type UserProfile = z.infer<typeof userProfileSchema>;
export type LoanApplication = z.infer<typeof loanApplicationSchema>;
export type InsertLoanApplication = z.infer<typeof insertLoanSchema>;
export type InsertLoanInput = InsertLoanApplication; // Alias for compatibility

export type Prediction = z.infer<typeof predictionSchema>;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;

// Combined response for frontend
export type RiskAnalysisResult = {
  application: LoanApplication;
  prediction: Prediction;
};

// API Response Types
export type LoanWithPrediction = {
  application: LoanApplication;
  prediction?: Prediction | null;
};

export type AnalyzeResponse = {
  application: LoanApplication;
  prediction: Prediction;
};

export type MonitoringStats = {
  totalApplications: number;
  avgDefaultRisk: number;
  avgFraudRisk: number;
  highRiskCount: number;
};

// User Profile Response Types
export type UserProfileWithLoans = {
  profile: UserProfile;
  loanCount: number;
  loans: LoanWithPrediction[];
  totalLoanAmount: number;
  avgRiskScore: number;
};
