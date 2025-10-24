import { Check, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface SubscriptionTier {
  id: number;
  name: string;
  price: number;
  period: string;
  deliveryTime: string;
  popular?: boolean;
  icon: LucideIcon;
  features: string[];
}

interface SubscriptionTierCardProps {
  tier: SubscriptionTier;
}

export function SubscriptionTierCard({ tier }: SubscriptionTierCardProps) {
  const Icon = tier.icon;

  return (
    <div 
      className={`relative rounded-2xl p-6 transition-all duration-300 ${
        tier.popular 
          ? "bg-gradient-to-br from-[#9E0B61]/10 to-[#74094A]/5 border-2 border-[#9E0B61]/50 shadow-lg shadow-[#9E0B61]/10" 
          : "glass-card border border-white/10 hover:border-white/20"
      }`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#9E0B61] to-[#74094A] rounded-full">
          <span className="text-sm">Most Popular</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Icon & Header */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            tier.popular 
              ? "bg-gradient-to-br from-[#9E0B61] to-[#74094A]" 
              : "bg-white/5"
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg">{tier.name}</h3>
            <p className="text-xs text-[#DADBE1]">{tier.period}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl">£{tier.price}</span>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2 text-sm text-[#DADBE1]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{tier.deliveryTime} delivery</span>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 mt-0.5 text-[#19E28C] flex-shrink-0" />
              <span className="text-[#DADBE1]">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Select Button */}
        <Button
          fullWidth
          variant={tier.popular ? "gradient" : "outline"}
          className={tier.popular ? "" : "bg-white/5 border-white/10 hover:bg-white/10"}
        >
          Select Package
        </Button>
      </div>
    </div>
  );
}
