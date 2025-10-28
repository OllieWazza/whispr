import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Zap, Package, ArrowRight, Check } from "lucide-react";

export function UploadChoicePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-white mb-2">What type of listing do you want to create?</h1>
          <p className="text-white/60">Choose the right format for your content</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Instant Buy Option */}
          <button
            onClick={() => navigate('/creator/upload/instant')}
            className="group relative p-8 rounded-2xl text-left transition-all bg-white/5 border-2 border-white/10 hover:border-[#9E0B61] hover:bg-white/10"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl text-white mb-3">Instant Buy</h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                Upload pre-recorded audio clips that buyers can purchase instantly. Perfect for selling exclusive content behind a paywall.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Set a single unlock price</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Limit quantity for exclusivity</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Set price milestones as demand grows</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Option to revoke access after listening</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">Quick setup, instant sales</span>
                <ArrowRight className="w-5 h-5 text-[#9E0B61] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Custom Listing Option */}
          <button
            onClick={() => navigate('/creator/upload/custom')}
            className="group relative p-8 rounded-2xl text-left transition-all bg-white/5 border-2 border-white/10 hover:border-[#19E28C] hover:bg-white/10"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#19E28C]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#19E28C] to-[#0FA368] flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl text-white mb-3">Custom Listing</h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                Offer custom voice work based on buyer requests. Set different tiers with unique pricing and requirements.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Create 3 pricing tiers (Basic, Premium, VIP)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Set custom requirements per tier</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Define delivery times and limits</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19E28C] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">Flexible work-for-hire model</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">Personalized service, higher earnings</span>
                <ArrowRight className="w-5 h-5 text-[#19E28C] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            Not sure which to choose? You can create both types of listings for different content.
          </p>
        </div>
      </div>
    </div>
  );
}

