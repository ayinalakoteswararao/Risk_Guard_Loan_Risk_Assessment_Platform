import { Layout } from "@/components/layout";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 font-display mb-2">404</h1>
        <p className="text-lg text-slate-500 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
            Return Home
          </button>
        </Link>
      </div>
    </Layout>
  );
}
