import { Shield, Lock } from "lucide-react";

interface ComplianceNoticeProps {
  variant?: "default" | "compact";
  className?: string;
}

export function ComplianceNotice({ variant = "default", className = "" }: ComplianceNoticeProps) {
  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-center gap-2 text-sm text-[#DADBE1] ${className}`}>
        <Shield className="w-4 h-4 text-[#19E28C]" />
        <span>18+ verified creators. Explicit content is not permitted. Payments are secured by Stripe.</span>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-4 glass-card border border-[#3A3C43] ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-[#19E28C]/10">
            <Shield className="w-5 h-5 text-[#19E28C]" />
          </div>
          <div className="p-2 rounded-full bg-[#19E28C]/10">
            <Lock className="w-5 h-5 text-[#19E28C]" />
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-[#FFFFFF]">Safe & compliant platform</h4>
          <p className="text-sm text-[#DADBE1]">
            18+ verified creators. Explicit content is not permitted. Payments are secured by Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}
