import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface LiquidTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function LiquidTabs({ tabs, activeTab, onTabChange }: LiquidTabsProps) {
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full p-1 w-full sm:w-auto">
      {/* Sliding background indicator */}
      <motion.div
        className="absolute top-1 bottom-1 left-1 right-1 rounded-full bg-[#9E0B61]/10 border border-[#9E0B61]/40 backdrop-blur-xl"
        initial={false}
        animate={{
          x: `${activeIndex * 100}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          width: `calc(${100 / tabs.length}% - 0.25rem)`,
        }}
      />

      {/* Tab buttons */}
      <div className="relative flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex-1 flex items-center justify-center gap-2.5 
                px-6 py-3 rounded-full whitespace-nowrap
                transition-all duration-300
                ${isActive ? "text-[#E879F9]" : "text-white/60 hover:text-white/80"}
              `}
              style={{ fontWeight: 600 }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
