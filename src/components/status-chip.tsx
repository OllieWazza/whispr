import { Clock, CheckCircle, Package, XCircle } from "lucide-react";

type StatusType = "pending" | "in-progress" | "delivered" | "cancelled";

interface StatusChipProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-[#FFC34D]/10",
    text: "text-[#FFC34D]",
    border: "border-[#FFC34D]/40",
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-[#3B82F6]/10",
    text: "text-[#3B82F6]",
    border: "border-[#3B82F6]/40",
    icon: Package,
  },
  delivered: {
    label: "Delivered",
    bg: "bg-[#19E28C]/10",
    text: "text-[#19E28C]",
    border: "border-[#19E28C]/40",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-[#EF4444]/10",
    text: "text-[#EF4444]",
    border: "border-[#EF4444]/40",
    icon: XCircle,
  },
};

export function StatusChip({ status, className = "" }: StatusChipProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div 
      className={`
        inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full
        min-w-[140px]
        ${config.bg} ${config.text} ${config.border}
        border backdrop-blur-xl
        transition-all duration-300
        hover:scale-105 hover:backdrop-blur-2xl
        ${className}
      `}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm" style={{ fontWeight: 600 }}>
        {config.label}
      </span>
    </div>
  );
}
