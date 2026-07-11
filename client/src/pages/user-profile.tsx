import { MinimalHeader } from "@/components/minimal-header";
import { Footer } from "@/components/footer";
import { useUserProfile, useCreateProfile } from "@/hooks/use-loans-mongodb";
import { useRoute, useLocation } from "wouter";
import { Link } from "wouter";
import { Loader2, ArrowLeft, User, Mail, Phone, Home, DollarSign, FileText, TrendingUp, ShieldCheck, AlertTriangle, Calendar, Briefcase, CreditCard, Award, Target, Activity, PieChart, Users, UserCircle, Clock, FileCheck } from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";
import { LoanApplication } from "../../../shared/schema";

export default function UserProfile() {
  const [match, params] = useRoute("/profile/:name");
  const [, setLocation] = useLocation();
  const name = decodeURIComponent(params?.name || "");
  const { data, isLoading, error } = useUserProfile(name);
  const createProfile = useCreateProfile();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProfile = async () => {
    setIsCreating(true);
    try {
      console.log('Creating profile for:', name);
      console.log('API URL:', `http://localhost:3000/api/profile`);
      
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          phone: '+1-555-0000',
          address: 'Address not provided'
        })
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = JSON.parse(responseText);
      console.log('Parsed data:', data);
      
      // Redirect to the same page to refresh and show the new profile
      window.location.href = `/profile/${encodeURIComponent(name)}`;
    } catch (error) {
      console.error('Profile creation failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))]">
        <MinimalHeader />
        <div className="h-[50vh] flex items-center justify-center flex-col gap-4 text-[hsl(var(--muted-foreground))]">
          <Loader2 className="w-10 h-10 animate-spin text-[hsl(var(--primary))]" />
          <p className="font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Profile will always be created if there are loan applications
  const { profile, loanCount, loans, totalLoanAmount, avgRiskScore } = data!;

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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Side - Main Heading */}
            <div className="text-left space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-800 rounded-2xl shadow-xl flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  <User className="w-8 h-8 text-white relative z-10" />
                </div>
                <div>
                  <h1 className="text-[hsl(var(--foreground))]">
                    <div className="application-text mb-2">USER</div>
                    <div className="application-highlight">PROFILE</div>
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Center - User Icon and Name Only */}
            <div className="text-center space-y-4">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-[hsl(var(--foreground))]">{profile.name}</h2>
              </div>
            </div>
            
            {/* Right Side - All Text Content Side by Side */}
            <div className="text-right space-y-4">
              <div className="flex items-center justify-end gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-blue-900">
                    Complete loan history and risk analysis
                  </p>
                  <p className="text-sm font-bold text-blue-700">
                    for <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-md">{profile.name}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg shadow-lg">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-900">Member Since</p>
                    <p className="text-sm font-bold text-emerald-700">
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-purple-900">Applications</p>
                    <p className="text-sm font-bold text-purple-700">
                      {loanCount} loan application{loanCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content Container - Full Page */}
      <section className="py-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 p-8">

          {/* Stats Overview */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {/* Total Loans */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl shadow-xl border border-blue-100 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-[hsl(var(--foreground))]">Total Loans</h3>
                </div>
                <div className="text-3xl font-black text-blue-900">{loanCount}</div>
                <p className="text-sm text-blue-600 font-medium mt-1">Applications</p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-3xl shadow-xl border border-emerald-100 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-[hsl(var(--foreground))]">Total Amount</h3>
                </div>
                <div className="text-3xl font-black text-emerald-900">${totalLoanAmount.toLocaleString()}</div>
                <p className="text-sm text-emerald-600 font-medium mt-1">Across {loanCount} application{loanCount !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Average Risk */}
            <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl shadow-xl border border-amber-100 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-[hsl(var(--foreground))]">Avg Risk Score</h3>
                </div>
                <div className="text-3xl font-black text-amber-900">{(avgRiskScore * 100).toFixed(1)}%</div>
                <p className="text-sm text-amber-600 font-medium mt-1">Default Probability</p>
              </div>
            </div>

            {/* Profile Status */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl shadow-xl border border-purple-100 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-[hsl(var(--foreground))]">Profile Status</h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full border border-purple-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-black text-sm">Active</span>
                </div>
                <p className="text-sm text-purple-600 font-medium mt-2">Verified User</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-gray-50 via-white to-slate-50 rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-gray-500 to-slate-500 rounded-xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800">Contact Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {profile.gender && (
                <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100">
                  <div className="p-2 bg-pink-500 rounded-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-pink-600 font-semibold">Gender</p>
                    <p className="text-sm font-black text-pink-900">{profile.gender}</p>
                  </div>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold">Email</p>
                    <p className="text-sm font-black text-blue-900">{profile.email}</p>
                  </div>
                </div>
              )}
              
              {profile.phone && (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-semibold">Mobile</p>
                    <p className="text-sm font-black text-green-900">{profile.phone}</p>
                  </div>
                </div>
              )}
              
              {profile.address && (
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Home className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 font-semibold">Address</p>
                    <p className="text-sm font-black text-purple-900">{profile.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Loan History */}
          <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-100 to-indigo-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-blue-900">Loan History</h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[hsl(var(--muted))] border-b border-[hsl(var(--border))]">
                  <tr>
                    <th className="px-6 py-4 font-black text-[hsl(var(--foreground))]">ID</th>
                    <th className="px-6 py-4 font-black text-[hsl(var(--foreground))]">Application Date</th>
                    <th className="px-6 py-4 font-black text-[hsl(var(--foreground))]">Loan Details</th>
                    <th className="px-6 py-4 font-black text-[hsl(var(--foreground))]">Risk Score</th>
                    <th className="px-6 py-4 font-black text-[hsl(var(--foreground))]">Status</th>
                    <th className="px-6 py-4 font-black text-[hsl(var(--foreground))] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {loans.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-[hsl(var(--muted-foreground))]">
                        <span className="font-medium">No loan applications found for this user.</span>
                      </td>
                    </tr>
                  ) : (
                    loans.map(({ application, prediction }) => (
                      <tr key={application._id?.toString()} className="hover:bg-[hsl(var(--muted))]/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[hsl(var(--muted-foreground))] font-mono text-xs font-semibold bg-[hsl(var(--muted))]/50 px-2 py-1 rounded-lg inline-block">
                              #{application.sequentialId || 'N/A'}
                            </span>
                            {loans.indexOf({ application, prediction } as any) === 0 && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-black rounded-full">Most Recent</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[hsl(var(--muted-foreground))] text-xs">
                          {new Date(application.createdAt!).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-black text-[hsl(var(--foreground))]">${application.loanAmount.toLocaleString()}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{application.loanTerm} mo • {application.loanPurpose.replace('_', ' ')}</div>
                        </td>
                        <td className="px-6 py-4">
                          {prediction ? (
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-[hsl(var(--muted))] rounded-full h-2 overflow-hidden">
                                <div 
                                  className={clsx("h-full rounded-full transition-all duration-500", 
                                    prediction.riskBand === "LOW" ? "bg-emerald-500" :
                                    prediction.riskBand === "MEDIUM" ? "bg-amber-500" :
                                    "bg-rose-500"
                                  )} 
                                  style={{ width: `${(prediction.defaultProbability * 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-black text-[hsl(var(--foreground))]">
                                {Math.round(prediction.defaultProbability * 100)}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-[hsl(var(--muted-foreground))]">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {prediction ? (
                            <span className={clsx(
                              "px-3 py-1 rounded-full text-xs font-black border",
                              prediction.riskBand === "LOW" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                              prediction.riskBand === "MEDIUM" ? "bg-amber-50 text-amber-700 border-amber-100" :
                              "bg-rose-50 text-rose-700 border-rose-100"
                            )}>
                              {prediction.riskBand}
                            </span>
                          ) : (
                            <span className="text-[hsl(var(--muted-foreground))] text-xs font-medium">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/loans/${application._id}`}>
                            <button className="inline-flex items-center gap-1 text-sm font-black text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 hover:underline transition-colors">
                              View
                              <ArrowLeft className="w-3 h-3 rotate-180" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
            
            {/* Back to Applications Button - Bottom Center */}
            <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
              <Link href="/loans">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-black transition-colors bg-blue-50 px-6 py-3 rounded-xl hover:bg-blue-100 shadow-lg hover:shadow-xl">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Applications
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
