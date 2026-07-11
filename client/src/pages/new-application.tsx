import { MinimalHeader } from "@/components/minimal-header";
import { Footer } from "@/components/footer";
import { useCreateLoan } from "@/hooks/use-loans-mongodb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Loader2, DollarSign, Briefcase, Calendar, CreditCard, User, Building2, ShieldCheck, ArrowRight, Sparkles, AlertTriangle, Clock, FileText, Home, Target, Phone, Mail } from "lucide-react";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import type { InsertLoanInput } from "@/lib/api-mongodb";

// Validation schema - matches form field types
const insertLoanSchema = z.object({
  applicantName: z.string().min(1, "Name is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
  income: z.number().min(0, "Income must be positive"),
  creditScore: z.number().min(300).max(850),
  loanAmount: z.number().min(1000, "Minimum loan amount is $1,000"),
  loanTerm: z.number().min(1),
  employmentLength: z.number().min(0),
  homeOwnership: z.enum(["RENT", "OWN", "MORTGAGE"]),
  loanPurpose: z.string(),
  mobileNumber: z.string().regex(/^\d{0,10}$/, "Mobile number must be exactly 10 digits").optional(),
  emailId: z.string().optional(),
  address: z.string().optional(),
  hasExistingLoans: z.enum(["no", "yes"]),
  existingLoanOverdueDelay: z.number().min(0).max(3).optional(),
  existingLoanCheckBounce: z.enum(["0", "1", "2", "3"]).optional(),
}).refine((data) => {
  if (data.hasExistingLoans === "yes") {
    return data.existingLoanOverdueDelay !== undefined && 
           data.existingLoanCheckBounce !== undefined;
  }
  return true;
}, {
  message: "Please provide details for existing loans",
  path: ["hasExistingLoans"]
});

// Type for form data (matches what form actually sends)
type FormData = z.infer<typeof insertLoanSchema>;

export default function NewApplication() {
  const [, setLocation] = useLocation();
  const { mutate, isPending } = useCreateLoan();
  const [showExistingLoansFields, setShowExistingLoansFields] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(insertLoanSchema),
    defaultValues: {
      applicantName: "",
      gender: "MALE" as const,
      income: 0,
      creditScore: 700,
      loanAmount: 10000,
      loanTerm: 36,
      employmentLength: 2,
      homeOwnership: "RENT",
      loanPurpose: "personal",
      mobileNumber: "",
      emailId: "",
      address: "",
      hasExistingLoans: "no",
      existingLoanOverdueDelay: 0,
      existingLoanCheckBounce: "0",
    },
    mode: "onChange", // Validate on every change for real-time feedback
    reValidateMode: "onChange", // Re-validate on every change
    shouldUnregister: false, // Keep values even when fields are unmounted
  });

  // Watch for changes in hasExistingLoans and update local state
  const hasExistingLoansValue = form.watch("hasExistingLoans");
  
  useEffect(() => {
    setShowExistingLoansFields(hasExistingLoansValue === "yes");
  }, [hasExistingLoansValue]);

  const onSubmit = (data: FormData) => {
    // Transform data to match backend schema
    const transformedData = {
      ...data,
      hasExistingLoans: data.hasExistingLoans === "yes",
      existingLoanCheckBounce: parseInt(data.existingLoanCheckBounce || "0", 10),
    };
    
    mutate(transformedData as any, {
      onSuccess: (response: any) => {
        setLocation(`/loans/${response.application._id}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <MinimalHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[hsl(var(--primary))] rounded-full opacity-10 blur-2xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-[hsl(var(--primary))] rounded-full opacity-10 blur-3xl" />
          
          {/* Geometric Shapes */}
          <div className="absolute top-32 left-20 w-0 h-0 border-l-[40px] border-l-transparent border-b-[60px] border-b-[hsl(var(--primary))] border-r-[40px] border-r-transparent opacity-20" />
          <div className="absolute bottom-40 right-32 w-0 h-0 border-l-[30px] border-l-transparent border-t-[45px] border-t-[hsl(var(--primary))] border-r-[30px] border-r-transparent opacity-15" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Main Heading */}
            <div className="text-left space-y-4">
              <div className="relative z-10 flex items-center gap-4">
                {/* Shield Icon */}
                <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                
                {/* Main heading with enhanced styling */}
                <h1 className="relative">
                  <div className="application-text mb-2">NEW LOAN</div>
                  <div className="application-highlight">APPLICATION</div>
                </h1>
                
                {/* Background decorative elements - positioned behind */}
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-orange-400/15 to-red-500/15 rounded-full blur-2xl z-[-1]" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-2xl z-[-1]" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-orange-400/20 z-[-1]" />
              </div>
            </div>
            
            {/* Right Side - Description */}
            <div className="text-right space-y-6">
              {/* Main description with icon */}
              <div className="flex items-start justify-end gap-3">
                <div className="flex-1 max-w-md">
                  <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] font-medium leading-relaxed">
                    Enter applicant details to run AI risk assessment models and get instant insights
                  </p>
                </div>
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* AI Badge with enhanced styling */}
              <div className="flex justify-end">
                <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] bg-gradient-to-r from-[hsl(var(--muted))]/50 to-[hsl(var(--primary))]/10 px-6 py-3 rounded-full border border-[hsl(var(--primary))]/20 shadow-lg">
                  <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
                  <span className="font-medium">AI-Powered Risk Analysis</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Additional info badges */}
              <div className="flex justify-end gap-3">
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] bg-white/80 px-3 py-2 rounded-lg border border-[hsl(var(--border))] shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-green-500" />
                  <span>Secure Processing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] bg-white/80 px-3 py-2 rounded-lg border border-[hsl(var(--border))] shadow-sm">
                  <Clock className="w-3 h-3 text-blue-500" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-4">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-sm border border-[hsl(var(--border))] p-6 lg:p-8">
            
            {/* Two-Section Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Section 1: Applicant Info - Blue Theme */}
              <div className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">Applicant Info</h3>
                      <p className="text-xs text-blue-100">Personal Details</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <User className="w-3 h-3 text-blue-500" />
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <input
                        {...form.register("applicantName")}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none bg-blue-50/50"
                        placeholder="John Doe"
                      />
                    </div>
                    {form.formState.errors.applicantName && (
                      <p className="text-xs text-rose-500 font-medium">{form.formState.errors.applicantName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <User className="w-3 h-3 text-blue-500" />
                      Gender
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <select
                        {...form.register("gender")}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none bg-blue-50/50"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHERS">Others</option>
                      </select>
                    </div>
                    {form.formState.errors.gender && (
                      <p className="text-xs text-rose-500 font-medium">{form.formState.errors.gender.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <Phone className="w-3 h-3 text-blue-500" />
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <input
                        type="tel"
                        {...form.register("mobileNumber")}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none bg-blue-50/50"
                        placeholder="+91-555-0123"
                      />
                    </div>
                    {form.formState.errors.mobileNumber && (
                      <p className="text-xs text-rose-500 font-medium">{form.formState.errors.mobileNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <Mail className="w-3 h-3 text-indigo-500" />
                      Email ID
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <input
                        type="text"
                        {...form.register("emailId")}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none bg-blue-50/50"
                        placeholder="email@example.com"
                      />
                    </div>
                    {form.formState.errors.emailId && (
                      <p className="text-xs text-rose-500 font-medium">{form.formState.errors.emailId.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <Home className="w-3 h-3 text-purple-500" />
                      Address
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                      <textarea
                        {...form.register("address")}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none bg-blue-50/50 resize-none"
                        placeholder="123 Main St, New York, NY 10001"
                        rows={2}
                      />
                    </div>
                    {form.formState.errors.address && (
                      <p className="text-xs text-rose-500 font-medium">{form.formState.errors.address.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <Briefcase className="w-3 h-3 text-purple-500" />
                      Employment (Years)
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <input
                        type="number"
                        {...form.register("employmentLength", { valueAsNumber: true })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none bg-blue-50/50"
                        placeholder="2"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <Home className="w-3 h-3 text-orange-500" />
                      Home Ownership
                    </label>
                    <select
                      {...form.register("homeOwnership")}
                      className="w-full px-3 py-2.5 rounded-xl border border-blue-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all outline-none bg-blue-50/50"
                    >
                      <option value="RENT">Rent</option>
                      <option value="OWN">Own</option>
                      <option value="MORTGAGE">Mortgage</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Loan & Risk Details - Purple Theme */}
              <div className="bg-gradient-to-br from-purple-50 via-purple-50/80 to-violet-50 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-md">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">Loan & Risk Details</h3>
                      <p className="text-xs text-purple-100">Financial Information & Assessment</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-3">
                  {/* Loan Details Subsection */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-purple-300">
                      <div className="p-2 bg-purple-500 rounded-lg shadow-md">
                        <DollarSign className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-base font-bold text-purple-900">Loan Details</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-purple-800 flex items-center gap-2">
                          <DollarSign className="w-3 h-3 text-purple-500" />
                          Annual Income
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                          <input
                            type="number"
                            {...form.register("income", { valueAsNumber: true })}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all outline-none bg-green-50/50"
                            placeholder="75000"
                          />
                        </div>
                        {form.formState.errors.income && (
                          <p className="text-xs text-rose-500 font-medium">{form.formState.errors.income.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-purple-800 flex items-center gap-2">
                            <DollarSign className="w-3 h-3 text-purple-500" />
                            Loan Amount
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                            <input
                              type="number"
                              {...form.register("loanAmount", { valueAsNumber: true })}
                              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all outline-none bg-green-50/50"
                              placeholder="10000"
                            />
                          </div>
                          {form.formState.errors.loanAmount && (
                            <p className="text-xs text-rose-500 font-medium">{form.formState.errors.loanAmount.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-green-800 flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-blue-500" />
                            Term (Months)
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                            <input
                              type="number"
                              {...form.register("loanTerm", { valueAsNumber: true })}
                              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-green-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none bg-green-50/50"
                              placeholder="36"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-green-800 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-indigo-500" />
                            Credit Score
                          </label>
                          <div className="relative">
                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                            <input
                              type="number"
                              {...form.register("creditScore", { valueAsNumber: true })}
                              min={300}
                              max={850}
                              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-green-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none bg-green-50/50"
                              placeholder="700"
                            />
                          </div>
                          {form.formState.errors.creditScore && (
                            <p className="text-xs text-rose-500 font-medium">{form.formState.errors.creditScore.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-green-800 flex items-center gap-2">
                            <Target className="w-3 h-3 text-purple-500" />
                            Purpose
                          </label>
                          <select
                            {...form.register("loanPurpose")}
                            className="w-full px-3 py-2.5 rounded-xl border border-green-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none bg-green-50/50"
                          >
                            <option value="personal">Personal</option>
                            <option value="education">Education</option>
                            <option value="medical">Medical</option>
                            <option value="venture">Venture/Business</option>
                            <option value="home_improvement">Home Improvement</option>
                            <option value="debt_consolidation">Debt Consolidation</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Existing Loans Subsection */}
                  <div className="space-y-3 pt-4 border-t-2 border-purple-300">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg shadow-lg p-3 flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-base font-bold text-white">Existing Loans</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-amber-800 flex items-center gap-2">
                        <CreditCard className="w-3 h-3 text-amber-500" />
                        Do you have existing loans?
                      </label>
                      <select
                        {...form.register("hasExistingLoans")}
                        className="w-full px-3 py-2.5 rounded-xl border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all outline-none bg-red-50/50"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>

                    {showExistingLoansFields && (
                      <div className="space-y-2 p-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-red-800 flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            Overdue/Delays (0-3)
                          </label>
                          <div className="relative">
                            <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                            <input
                              type="number"
                              min="0"
                              max="3"
                              {...form.register("existingLoanOverdueDelay", { valueAsNumber: true })}
                              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all outline-none bg-red-50/50"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-red-800 flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            Number of check bounces?
                          </label>
                          <select
                            {...form.register("existingLoanCheckBounce")}
                            className="w-full px-3 py-2.5 rounded-xl border border-red-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all outline-none bg-red-50/50"
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3+</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {!showExistingLoansFields && (
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-green-500 rounded-full">
                            <ShieldCheck className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-green-800 font-medium">
                              No existing loans - Lower risk!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className={clsx(
                    "btn-primary flex items-center gap-3 text-lg px-16 py-4 text-base font-semibold",
                    isPending 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:scale-105 hover:shadow-xl"
                  )}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Running Models...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Analyze Risk
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
