import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";

export function SignupChoicePage() {
  return (
    <div className="min-h-screen liquid-gradient flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61]/20 via-transparent to-[#74094A]/20"></div>
      </div>
      
      {/* Floating light orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-48 sm:h-80 bg-[#19E28C]/30 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <Link to="/">
            <img src={whisprLogo} alt="WHISPR" className="h-10 sm:h-12" />
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <h1 className="text-center mb-3 text-white" style={{ fontWeight: 700 }}>
            Welcome to WHISPR
          </h1>
          <p className="text-center text-white/70 mb-8">
            Choose how you'd like to get started
          </p>

          {/* Choice Buttons */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            <Link to="/signup/buyer" className="block">
              <button className="w-full glass-button rounded-2xl p-5 sm:p-6 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 sm:gap-4 border border-white/30 hover:border-white/40">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="mb-0.5 sm:mb-1 text-white text-sm sm:text-base" style={{ fontWeight: 600 }}>I want to buy content</div>
                  <div className="text-xs sm:text-sm text-white/70">Request personalised audio and video</div>
                </div>
              </button>
            </Link>

            <Link to="/signup/creator" className="block">
              <button className="w-full glass-button rounded-2xl p-5 sm:p-6 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 sm:gap-4 border border-white/30 hover:border-white/40">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="mb-0.5 sm:mb-1 text-white text-sm sm:text-base" style={{ fontWeight: 600 }}>I want to sell content</div>
                  <div className="text-xs sm:text-sm text-white/70">Earn money creating for your fans</div>
                </div>
              </button>
            </Link>
          </div>

          {/* Sign In Link */}
          <div className="text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link to="/signin" className="text-white hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="mt-4 sm:mt-6 text-center text-xs text-white/50 px-2">
          WHISPR is a brand-safe platform. Explicit content is not permitted. Payments secured by Stripe.
        </div>
      </div>
    </div>
  );
}
