import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#FF4D6D]/20 mb-4">
          <AlertCircle className="w-12 h-12 text-[#FF4D6D]" />
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1>Something went wrong</h1>
          <p className="text-[#DADBE1] text-lg max-w-lg mx-auto">
            We're sorry, but something unexpected happened. Please try refreshing the page or come back later.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg" 
            onClick={() => window.location.reload()}
            className="group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Refresh page
          </Button>
          <Link to="/">
            <Button variant="glass-white" size="lg">
              <Home className="w-5 h-5" />
              Go home
            </Button>
          </Link>
        </div>

        {/* Technical Details (Optional) */}
        <div className="glass-card rounded-2xl p-6 mt-8 text-left">
          <h3 className="mb-3">What you can do</h3>
          <ul className="space-y-2 text-[#DADBE1] text-sm">
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache and cookies</li>
            <li>• Check your internet connection</li>
            <li>• Contact support if the problem persists</li>
          </ul>
          <p className="text-[#DADBE1] text-sm mt-4">
            Need help? Email <a href="mailto:support@whispr.com" className="text-[#9E0B61] hover:underline">support@whispr.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
