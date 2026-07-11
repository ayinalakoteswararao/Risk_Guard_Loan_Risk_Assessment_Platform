import { MinimalHeader } from "@/components/minimal-header";
import { Footer } from "@/components/footer";
import { 
  ShieldCheck, 
  Brain, 
  Zap, 
  TrendingUp, 
  Users, 
  Lock,
  BarChart3,
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "wouter";
import { clsx } from "clsx";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <MinimalHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[hsl(var(--primary))] rounded-full opacity-10 blur-2xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-[hsl(var(--primary))] rounded-full opacity-10 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[hsl(var(--primary))] rounded-full opacity-5 blur-xl" />
          
          {/* Geometric Shapes */}
          <div className="absolute top-32 left-20 w-0 h-0 border-l-[40px] border-l-transparent border-b-[60px] border-b-[hsl(var(--primary))] border-r-[40px] border-r-transparent opacity-20" />
          <div className="absolute bottom-40 right-32 w-0 h-0 border-l-[30px] border-l-transparent border-t-[45px] border-t-[hsl(var(--primary))] border-r-[30px] border-r-transparent opacity-15" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Main Heading */}
            <div className="text-left space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  <ShieldCheck className="w-8 h-8 text-white relative z-10" />
                </div>
                <div>
                  <h1 className="text-[hsl(var(--foreground))]">
                    <div className="brand-text text-5xl font-black">RISKGUARD</div>
                    <div className="assessment-text mt-2 text-2xl font-bold">RISK ASSESSMENT</div>
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Right Side - Description Text and CTA */}
            <div className="text-right space-y-4">
              <p className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-md ml-auto">
                Advanced ML algorithms for intelligent loan risk assessment with real-time monitoring
              </p>
              <div className="flex items-center justify-end gap-3">
                <Link href="/loans/new">
                  <button className="btn-primary flex items-center gap-2 text-base">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span>Enterprise-grade security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[hsl(var(--foreground))] mb-4">
              Why Choose RiskGuard?
            </h2>
            <p className="text-xl text-[hsl(var(--muted-foreground))] font-medium max-w-3xl mx-auto">
              Our cutting-edge AI technology transforms loan risk assessment with unparalleled accuracy and efficiency
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-[hsl(var(--border))] p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[hsl(var(--foreground))] mb-3">AI-Powered Analysis</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                Advanced machine learning models analyze multiple data points to provide accurate risk assessments with 95%+ accuracy rates.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[hsl(var(--border))] p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[hsl(var(--foreground))] mb-3">Real-Time Processing</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                Get instant risk assessments in under 2 seconds. No more waiting for manual reviews or delayed decisions.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[hsl(var(--border))] p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[hsl(var(--foreground))] mb-3">Comprehensive Analytics</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                Detailed SHAP explanations and risk factor breakdowns help you understand exactly why decisions are made.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[hsl(var(--border))] p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[hsl(var(--foreground))] mb-3">Bank-Level Security</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                Enterprise-grade encryption and security protocols ensure your data remains protected and compliant with regulations.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[hsl(var(--border))] p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[hsl(var(--foreground))] mb-3">Fraud Detection</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                Advanced algorithms detect potential fraud patterns and suspicious activities before they impact your business.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[hsl(var(--border))] p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[hsl(var(--foreground))] mb-3">Global Scalability</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                Built to handle millions of assessments globally with 99.9% uptime and automatic scaling to meet your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[hsl(var(--foreground))] mb-4">
              Trusted by Financial Institutions
            </h2>
            <p className="text-xl text-[hsl(var(--muted-foreground))] font-medium">
              Join thousands of lenders who trust RiskGuard for their risk assessment needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-[hsl(var(--primary))] mb-2">10M+</div>
              <div className="text-[hsl(var(--muted-foreground))] font-medium">Risk Assessments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[hsl(var(--primary))] mb-2">99.9%</div>
              <div className="text-[hsl(var(--muted-foreground))] font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[hsl(var(--primary))] mb-2">&lt;2s</div>
              <div className="text-[hsl(var(--muted-foreground))] font-medium">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[hsl(var(--primary))] mb-2">95%</div>
              <div className="text-[hsl(var(--muted-foreground))] font-medium">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white space-y-8">
            <h2 className="text-4xl font-black">
              Ready to Transform Your Risk Assessment?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Experience the power of AI-driven risk assessment with RiskGuard. Start making smarter lending decisions today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/loans/new">
                <button className="bg-white text-[hsl(var(--primary))] px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-colors flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
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
