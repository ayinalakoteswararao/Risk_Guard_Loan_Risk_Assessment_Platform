import { Link, useLocation } from "wouter";
import { ShieldCheck, Mail, Phone, MapPin, Github, Twitter, Linkedin, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  return (
    <>
      <footer className="bg-[hsl(var(--border))] border-t border-[hsl(var(--border))] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[hsl(var(--foreground))]">RiskGuard</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">AI Loan Analysis Platform</p>
              </div>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Advanced machine learning algorithms providing intelligent loan risk assessment with real-time monitoring and comprehensive insights for financial institutions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-[hsl(var(--muted))]/50 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors">
                <Github className="w-4 h-4 text-[hsl(var(--foreground))]" />
              </a>
              <a href="#" className="p-2 bg-[hsl(var(--muted))]/50 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors">
                <Twitter className="w-4 h-4 text-[hsl(var(--foreground))]" />
              </a>
              <a href="#" className="p-2 bg-[hsl(var(--muted))]/50 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors">
                <Linkedin className="w-4 h-4 text-[hsl(var(--foreground))]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[hsl(var(--foreground))]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/loans/new" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  New Application
                </Link>
              </li>
              <li>
                <Link href="/loans" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  Application History
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setShowTermsModal(true)}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[hsl(var(--foreground))]">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  Risk Assessment
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  Fraud Detection
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  Credit Scoring
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  Loan Monitoring
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  Analytics Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[hsl(var(--foreground))]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[hsl(var(--primary))]" />
                <a href="mailto:support@riskguard.com" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  support@riskguard.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[hsl(var(--primary))]" />
                <a href="tel:+1234567890" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                  +91 1234567890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[hsl(var(--primary))]" />
                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                  Hyderabad<br />
                  City in Telangana
                </span>
              </div>
            </div>
            <div className="pt-4">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-[hsl(var(--primary))] transition-colors text-sm font-medium">
                Get Started
                <ShieldCheck className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[hsl(var(--border))] mt-2 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              © 2026 RiskGuard. All rights reserved.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowTermsModal(true)}
                className="group flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 transition-all duration-200 px-4 py-2 rounded-lg font-medium border border-transparent hover:border-[hsl(var(--primary))]/30 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center -ml-2">
                    <Mail className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <span>Terms & Privacy</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => setShowCookieModal(true)}
                className="group flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 transition-all duration-200 px-4 py-2 rounded-lg font-medium border border-transparent hover:border-[hsl(var(--primary))]/30 shadow-sm hover:shadow-md"
              >
                <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">🍪</span>
                </div>
                <span>Cookie Policy</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl border border-blue-100 max-w-3xl w-full max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Terms of Service & Privacy Policy</h2>
                    <p className="text-blue-100 text-sm mt-1">Last updated: January 2026</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(85vh-100px)]">
              {/* Terms of Service Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-bold text-xl text-blue-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  Terms of Service
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      Acceptance of Terms
                    </h4>
                    <p className="text-gray-700 leading-relaxed ml-8">
                      By accessing and using RiskGuard, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      Use License
                    </h4>
                    <p className="text-gray-700 leading-relaxed ml-8">
                      Permission is granted to temporarily download one copy of RiskGuard for personal, non-commercial transitory viewing only.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      Disclaimer
                    </h4>
                    <p className="text-gray-700 leading-relaxed ml-8">
                      The information on this platform is provided on an as-is basis. RiskGuard makes no warranties regarding the accuracy or reliability of the risk assessment results.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Privacy Policy Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="font-bold text-xl text-emerald-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  Privacy Policy
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-50">
                    <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">🔒</span>
                      Data Collection
                    </h4>
                    <p className="text-gray-700 leading-relaxed ml-8">
                      We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-50">
                    <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">🛡️</span>
                      Data Protection
                    </h4>
                    <p className="text-gray-700 leading-relaxed ml-8">
                      We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-50">
                    <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">👤</span>
                      User Rights
                    </h4>
                    <p className="text-gray-700 leading-relaxed ml-8">
                      You have the right to access, update, or delete your personal information at any time through your account settings or by contacting us.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-bold text-xl text-purple-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  Contact Information
                </h3>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-50">
                  <p className="text-gray-700 leading-relaxed">
                    Questions about our Terms of Service or Privacy Policy should be sent to us at <strong>support@riskguard.com</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl border border-amber-100 max-w-3xl w-full max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Cookie Policy</h2>
                    <p className="text-amber-100 text-sm mt-1">Last updated: January 2026</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCookieModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(85vh-100px)]">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-50">
                <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">🍪</span>
                  What Are Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed ml-10">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-50">
                <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">🔧</span>
                  How We Use Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed ml-10">
                  We use cookies to enhance your experience, analyze site traffic, and personalize content. Cookies help us remember your preferences and improve our services.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-50">
                <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">📋</span>
                  Types of Cookies We Use
                </h3>
                <ul className="space-y-3 ml-10">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <div>
                      <strong className="text-gray-800">Essential Cookies:</strong>
                      <span className="text-gray-700"> Required for the website to function properly</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <div>
                      <strong className="text-gray-800">Analytics Cookies:</strong>
                      <span className="text-gray-700"> Help us understand how visitors interact with our website</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <div>
                      <strong className="text-gray-800">Functional Cookies:</strong>
                      <span className="text-gray-700"> Enable enhanced functionality and personalization</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <div>
                      <strong className="text-gray-800">Advertising Cookies:</strong>
                      <span className="text-gray-700"> Used to deliver relevant advertisements</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-50">
                <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">⚙️</span>
                  Managing Your Preferences
                </h3>
                <p className="text-gray-700 leading-relaxed ml-10">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-50">
                <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">🔄</span>
                  Updates to This Policy
                </h3>
                <p className="text-gray-700 leading-relaxed ml-10">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-50">
                <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">📧</span>
                  Contact Us
                </h3>
                <p className="text-gray-700 leading-relaxed ml-10">
                  If you have any questions about our Cookie Policy, please contact us at support@riskguard.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
