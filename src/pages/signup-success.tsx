import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CheckCircle, Sparkles, ShoppingBag, Mail } from "lucide-react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";

export function SignupSuccessPage() {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "buyer"; // Default to buyer

  const isBuyer = userType === "buyer";

  return (
    <div className="min-h-screen bg-[#1A1B1E] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src={whisprLogo} alt="WHISPR" className="h-12" />
          </Link>
        </div>

        {/* Success Card */}
        <div className="bg-[#0e0e0e] rounded-2xl p-8 border border-white/10 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#19E28C]/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#19E28C]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3" style={{ fontWeight: 700 }}>
            Welcome to WHISPR
          </h1>

          {/* Email Confirmation Notice */}
          <div className="mb-6 p-4 rounded-2xl liquid-gradient backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(158,11,97,0.3)]">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-white font-medium text-sm mb-1">
                  📧 Please verify your email
                </p>
                <p className="text-white/90 text-xs leading-relaxed">
                  We've sent a confirmation email to your inbox. Click the link in the email to activate your account and start {isBuyer ? 'browsing creators' : 'accepting orders'}.
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Subtext */}
          <p className="text-muted-foreground mb-8">
            {isBuyer 
              ? "Explore creators and make your first request." 
              : "Complete your profile to start earning."}
          </p>

          {/* CTA Button */}
          {isBuyer ? (
            <Link to="/marketplace" className="block">
              <Button className="w-full rounded-full mb-4">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Explore creators
              </Button>
            </Link>
          ) : (
            <Link to="/creator/dashboard" className="block">
              <Button className="w-full rounded-full mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Set up your profile
              </Button>
            </Link>
          )}

          {/* Secondary Action */}
          <Link to="/">
            <Button variant="ghost" className="w-full rounded-full">
              Go to home
            </Button>
          </Link>

          {/* Next Steps for Creators */}
          {!isBuyer && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">What's next:</p>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-[#9E0B61]" style={{ fontWeight: 600 }}>1</span>
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>Complete your profile</div>
                    <div className="text-xs text-muted-foreground">Add bio, photos, and set your pricing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-[#9E0B61]" style={{ fontWeight: 600 }}>2</span>
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>Create your first tier</div>
                    <div className="text-xs text-muted-foreground">Define what content you'll create</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-[#9E0B61]" style={{ fontWeight: 600 }}>3</span>
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>Start accepting orders</div>
                    <div className="text-xs text-muted-foreground">Buyers can request content from you</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps for Buyers */}
          {isBuyer && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">How it works:</p>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-[#9E0B61]" style={{ fontWeight: 600 }}>1</span>
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>Browse creators</div>
                    <div className="text-xs text-muted-foreground">Find the perfect creator for your request</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-[#9E0B61]" style={{ fontWeight: 600 }}>2</span>
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>Make a request</div>
                    <div className="text-xs text-muted-foreground">Choose a tier and describe what you want</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-[#9E0B61]" style={{ fontWeight: 600 }}>3</span>
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>Receive your content</div>
                    <div className="text-xs text-muted-foreground">Get personalised content delivered to you</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legal Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground px-4">
          WHISPR is a brand-safe platform. Explicit content is not permitted. Payments secured by Stripe.
        </div>
      </div>
    </div>
  );
}
