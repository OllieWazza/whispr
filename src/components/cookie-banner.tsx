import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleManageSettings = () => {
    // In a real app, this would open a detailed cookie settings modal
    alert("Cookie settings modal would open here. For this demo, we'll accept essential cookies only.");
    localStorage.setItem("cookieConsent", "essential-only");
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="hidden sm:block p-3 rounded-full bg-[#9E0B61]/20 shrink-0">
            <Cookie className="w-6 h-6 text-[#9E0B61]" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="mb-2">We value your privacy</h3>
                <p className="text-sm text-[#DADBE1]">
                  We use essential browser storage (not cookies) for authentication and site functionality only. No tracking or advertising.{" "}
                  <Link to="/privacy" className="text-[#9E0B61] hover:underline">
                    Learn more
                  </Link>
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#DADBE1]" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAcceptAll}
                size="lg"
                className="sm:min-w-[160px]"
              >
                Accept all
              </Button>
              <Button 
                variant="glass-white"
                onClick={handleManageSettings}
                size="lg"
              >
                Manage settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
