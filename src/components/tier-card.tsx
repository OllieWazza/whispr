import { Check } from "lucide-react";
import { Button } from "./ui/button";

type TierType = "basic" | "standard" | "premium";

interface TierCardProps {
  tier: TierType;
  price: number;
  deliveryTime: string;
  features: string[];
  isSelected?: boolean;
  onSelect?: () => void;
}

const tierConfig = {
  basic: {
    name: "Basic",
    description: "Perfect for quick messages",
    gradient: "from-[#3A3C43] to-[#2A2B31]",
    borderColor: "border-[#3A3C43]",
  },
  standard: {
    name: "Standard",
    description: "Most popular choice",
    gradient: "from-[#9E0B61] to-[#74094A]",
    borderColor: "border-[#9E0B61]",
    popular: true,
  },
  premium: {
    name: "Premium",
    description: "Best quality & fastest",
    gradient: "from-[#8A0A56] to-[#74094A]",
    borderColor: "border-[#8A0A56]",
  },
};

export function TierCard({ 
  tier, 
  price, 
  deliveryTime, 
  features, 
  isSelected = false,
  onSelect 
}: TierCardProps) {
  const config = tierConfig[tier];

  return (
    <div 
      className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
        isSelected 
          ? `bg-gradient-to-br ${config.gradient} border-2 ${config.borderColor} shadow-lg shadow-[#9E0B61]/20` 
          : "glass-card border-2 border-transparent hover:border-[#3A3C43]"
      }`}
      onClick={onSelect}
    >
      {/* Popular Badge */}
      {config.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#9E0B61] to-[#74094A] rounded-full">
          <span className="text-sm">Most Popular</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="mb-1">{config.name}</h3>
          <p className="text-[#DADBE1] text-sm">{config.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl">£{price}</span>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2 text-sm text-[#DADBE1]">
          <Clock className="w-4 h-4" />
          <span>{deliveryTime} delivery</span>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 mt-0.5 text-[#19E28C] flex-shrink-0" />
              <span className="text-[#DADBE1]">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Select Button */}
        <Button
          fullWidth
          variant={isSelected ? "default" : "outline"}
          className="mt-4"
        >
          {isSelected ? "Selected" : "Select Tier"}
        </Button>
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
