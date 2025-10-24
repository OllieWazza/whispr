import { SearchX, Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#9E0B61]/20 mb-4">
          <SearchX className="w-12 h-12 text-[#9E0B61]" />
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="font-display" style={{ fontWeight: 700, fontSize: '4rem', lineHeight: 1 }}>
            404
          </h1>
          <h2 className="text-2xl">Page not found</h2>
          <p className="text-[#DADBE1] text-lg max-w-lg mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/">
            <Button size="lg" className="group">
              <Home className="w-5 h-5" />
              Go home
            </Button>
          </Link>
          <Button 
            variant="glass-white" 
            size="lg" 
            onClick={() => window.history.back()}
            className="group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="glass-card rounded-2xl p-6 mt-8">
          <h3 className="mb-4">Helpful links</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Link to="/marketplace" className="text-[#DADBE1] hover:text-white transition-colors">
              → Explore creators
            </Link>
            <Link to="/help" className="text-[#DADBE1] hover:text-white transition-colors">
              → Help centre
            </Link>
            <Link to="/buyer-dashboard" className="text-[#DADBE1] hover:text-white transition-colors">
              → Your orders
            </Link>
            <Link to="/become-creator" className="text-[#DADBE1] hover:text-white transition-colors">
              → Become a creator
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
