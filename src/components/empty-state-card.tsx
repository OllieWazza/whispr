import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyStateCard({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = "" 
}: EmptyStateCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="mb-6 p-6 rounded-full bg-[#3A3C43]/20">
        <Icon className="w-12 h-12 text-[#DADBE1]" />
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#DADBE1] max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
