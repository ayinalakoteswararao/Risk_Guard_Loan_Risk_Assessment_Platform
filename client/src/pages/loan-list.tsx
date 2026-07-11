import { MinimalHeader } from "@/components/minimal-header";
import { Footer } from "@/components/footer";
import { useLoans } from "@/hooks/use-loans";
import { Link } from "wouter";
import { clsx } from "clsx";
import { Loader2, Plus, Search, ArrowRight, Filter, User, DollarSign, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, ShieldCheck, FileText, Brain, Zap } from "lucide-react";
import { useState } from "react";
import { LoanApplication } from "../../../shared/schema";

export default function LoanList() {
  const { data: loans, isLoading } = useLoans();
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredLoans = loans?.filter(l => {
    const matchesSearch = l.application.applicantName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || l.prediction?.riskBand === filter;
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (riskBand: string) => {
    switch (riskBand) {
      case "LOW": return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", gradient: "from-emerald-400 to-emerald-600" };
      case "MEDIUM": return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", gradient: "from-amber-400 to-amber-600" };
      case "HIGH": return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", gradient: "from-orange-400 to-orange-600" };
      case "CRITICAL": return { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", gradient: "from-rose-400 to-rose-600" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", gradient: "from-gray-400 to-gray-600" };
    }
  };

  const getStatusIcon = (prediction: any) => {
    if (!prediction) return <Clock className="w-4 h-4" />;
    const riskColors = getRiskColor(prediction.riskBand);
    if (prediction.riskBand === "LOW") return <CheckCircle className="w-4 h-4" />;
    if (prediction.riskBand === "MEDIUM") return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
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
        
        <div className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex justify-between items-center w-full">
            {/* Left Side - Main Heading */}
            <div className="text-left space-y-4 flex-shrink-0">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                    <FileText className="w-6 h-6 text-white relative z-12" />
                  </div>
                  <div>
                    <h1 className="text-[hsl(var(--foreground))]">
                      <div className="application-text mb-3">APPLICATION</div>
                      <div className="application-highlight">HISTORY</div>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Space for additional text */}
            <div className="flex-1 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] bg-gradient-to-r from-emerald-50 to-emerald-100 px-6 py-3 rounded-xl border border-emerald-200 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-emerald-700">Live Data</span>
                  </div>
                  <div className="h-4 w-px bg-emerald-300"></div>
                  <span className="font-bold text-emerald-800 text-lg">{filteredLoans?.length || 0}</span>
                  <span className="font-medium text-emerald-600">Applications</span>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))] bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-lg border border-blue-200">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-blue-700">Real-time Processing</span>
                </div>
              </div>
            </div>

            {/* Right Side - Description Text and Features */}
            <div className="text-right space-y-8 flex-shrink-0">
              <div className="space-y-2">
                <p className="text-base md:text-lg text-[hsl(var(--muted-foreground))] font-medium leading-relaxed max-w-md">
                  Comprehensive loan management system with AI-powered risk assessment and real-time monitoring capabilities
                </p>
                
                {/* Feature Highlights */}
                <div className="space-y-3">
                  <div className="flex items-center justify-end gap-3">
                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-lg border border-purple-200">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-purple-700">ML Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] bg-gradient-to-r from-amber-50 to-amber-100 px-4 py-2 rounded-lg border border-amber-200">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-amber-700">Fast Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className={clsx(
              "bg-white rounded-xl p-4 border shadow-sm transition-all duration-200",
              filter === "LOW" ? "border-emerald-400 bg-emerald-50 shadow-lg scale-105" : "border-[hsl(var(--border))]"
            )}>
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold">LOW</span>
              </div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">
                {loans?.filter(l => l.prediction?.riskBand === "LOW").length || 0}
              </div>
            </div>
            <div className={clsx(
              "bg-white rounded-xl p-4 border shadow-sm transition-all duration-200",
              filter === "MEDIUM" ? "border-amber-400 bg-amber-50 shadow-lg scale-105" : "border-[hsl(var(--border))]"
            )}>
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">MEDIUM</span>
              </div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">
                {loans?.filter(l => l.prediction?.riskBand === "MEDIUM").length || 0}
              </div>
            </div>
            <div className={clsx(
              "bg-white rounded-xl p-4 border shadow-sm transition-all duration-200",
              filter === "HIGH" ? "border-orange-400 bg-orange-50 shadow-lg scale-105" : "border-[hsl(var(--border))]"
            )}>
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">HIGH</span>
              </div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">
                {loans?.filter(l => l.prediction?.riskBand === "HIGH").length || 0}
              </div>
            </div>
            <div className={clsx(
              "bg-white rounded-xl p-4 border shadow-sm transition-all duration-200",
              filter === "CRITICAL" ? "border-rose-400 bg-rose-50 shadow-lg scale-105" : "border-[hsl(var(--border))]"
            )}>
              <div className="flex items-center gap-2 text-rose-600 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">CRITICAL</span>
              </div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">
                {loans?.filter(l => l.prediction?.riskBand === "CRITICAL").length || 0}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loans Table Section */}
      <section className="py-2">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[hsl(var(--border))] shadow-xl overflow-hidden">
            {/* Enhanced Toolbar */}
            <div className="p-6 bg-gradient-to-r from-[hsl(var(--muted))]/50 to-[hsl(var(--muted))]/30 border-b border-[hsl(var(--border))]">
              <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm font-black text-[hsl(var(--muted-foreground))]">
                    <Filter className="w-4 h-4" />
                    <span>Filter:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((f) => {
                      const colors = getRiskColor(f);
                      return (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={clsx(
                            "px-4 py-2 text-sm font-black rounded-xl transition-all border shadow-sm",
                            filter === f 
                              ? `bg-gradient-to-r ${colors.gradient} text-white border-transparent shadow-lg scale-105` 
                              : "bg-white text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 hover:shadow-md"
                          )}
                        >
                          {f === 'ALL' ? 'All Loans' : f}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <div className="relative flex-1 lg:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    <input 
                      type="text"
                      placeholder="Search by name..."
                      className="pl-9 pr-4 py-2.5 bg-white border border-[hsl(var(--border))] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:border-[hsl(var(--primary))] w-full lg:w-64 shadow-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Link href="/loans/new">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap rounded-xl font-black">
                      <Plus className="w-4 h-4" />
                      New Application
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left table-fixed">
                <thead className="bg-gradient-to-r from-[hsl(var(--muted))]/70 to-[hsl(var(--muted))]/50 border-b-2 border-[hsl(var(--border))]">
                  <tr>
                    <th className="px-6 py-5 font-black text-[hsl(var(--foreground))] text-sm uppercase tracking-wider w-20">ID</th>
                    <th className="px-6 py-5 font-black text-[hsl(var(--foreground))] text-sm uppercase tracking-wider w-48">Applicant</th>
                    <th className="px-6 py-5 font-black text-[hsl(var(--foreground))] text-sm uppercase tracking-wider w-56">Loan Details</th>
                    <th className="px-6 py-5 font-black text-[hsl(var(--foreground))] text-sm uppercase tracking-wider w-48">Risk Score</th>
                    <th className="px-6 py-5 font-black text-[hsl(var(--foreground))] text-sm uppercase tracking-wider w-32">Status</th>
                    <th className="px-6 py-5 font-black text-[hsl(var(--foreground))] text-sm uppercase tracking-wider w-24 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]/50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-24 text-center text-[hsl(var(--muted-foreground))]">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--primary))]" />
                          <span className="font-medium text-lg">Loading applications...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredLoans?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-24 text-center text-[hsl(var(--muted-foreground))]">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 bg-[hsl(var(--muted))]/30 rounded-full flex items-center justify-center">
                            <Search className="w-8 h-8 text-[hsl(var(--muted-foreground))]/50" />
                          </div>
                          <span className="font-medium text-lg">No applications found</span>
                          <span className="text-sm">Try adjusting your filters or search criteria</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLoans?.map(({ application, prediction }) => {
                      const riskColors = prediction ? getRiskColor(prediction.riskBand) : null;
                      return (
                        <tr key={application._id?.toString()} className="hover:bg-[hsl(var(--muted))]/30 transition-all duration-200 border-l-4 border-transparent hover:border-l-[hsl(var(--primary))]">
                          <td className="px-6 py-5">
                            <div className="text-[hsl(var(--muted-foreground))] font-mono text-xs font-semibold bg-[hsl(var(--muted))]/50 px-2 py-1 rounded-lg inline-block">
                              #{application.sequentialId || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                <div className="font-black text-[hsl(var(--foreground))] text-base truncate">{application.applicantName}</div>
                              </div>
                              <div className="text-xs text-[hsl(var(--muted-foreground))] capitalize bg-[hsl(var(--muted))]/30 px-2 py-0.5 rounded-md inline-block">
                                {application.homeOwnership.toLowerCase()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                <div className="font-black text-[hsl(var(--foreground))] text-base">${application.loanAmount.toLocaleString()}</div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                <Calendar className="w-3 h-3" />
                                <span>{application.loanTerm} mo • {application.loanPurpose.replace('_', ' ')}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {prediction ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                   <div className="flex-1 bg-[hsl(var(--muted))] rounded-full h-2.5 overflow-hidden shadow-inner">
                                     <div 
                                       className={clsx("h-full rounded-full transition-all duration-700 shadow-sm", 
                                         `bg-gradient-to-r ${riskColors?.gradient}`
                                       )} 
                                       style={{ width: `${(prediction.defaultProbability * 100)}%` }}
                                     />
                                   </div>
                                   <span className="text-sm font-black text-[hsl(var(--foreground))] min-w-[3rem] text-right">
                                     {Math.round(prediction.defaultProbability * 100)}%
                                   </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] text-sm font-medium">
                                <Clock className="w-4 h-4" />
                                <span>Pending</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            {prediction ? (
                              <div className="flex items-center gap-2">
                                {getStatusIcon(prediction)}
                                <span className={clsx(
                                  "px-3 py-1.5 rounded-lg text-xs font-black border shadow-sm",
                                  riskColors?.bg,
                                  riskColors?.text,
                                  riskColors?.border
                                )}>
                                  {prediction.riskBand}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                <span className="text-[hsl(var(--muted-foreground))] text-xs font-medium bg-[hsl(var(--muted))]/30 px-3 py-1.5 rounded-lg">
                                  Pending
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <Link href={`/loans/${application._id}`}>
                              <button className="inline-flex items-center gap-2 text-sm font-black text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 bg-[hsl(var(--primary))]/10 hover:bg-[hsl(var(--primary))]/20 px-3 py-1.5 rounded-lg transition-all duration-200 group">
                                Details
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
