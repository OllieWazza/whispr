import { memo } from "react";
import { Mic, Headphones, Video, Briefcase, Package, Zap, MessageCircle, ShoppingBag } from "lucide-react";

const categories = [
  { id: "voice-notes", label: "Voice notes", icon: Mic },
  { id: "custom-videos", label: "Custom videos", icon: Video },
  { id: "instant-buy", label: "Instant buy", icon: Zap },
  { id: "voiceovers", label: "Voiceovers", icon: Briefcase },
  { id: "ugc-content", label: "UGC content", icon: Package },
  { id: "personal-messages", label: "Personal messages", icon: MessageCircle },
  { id: "asmr-whisper", label: "ASMR / whisper", icon: Headphones },
  { id: "professional-requests", label: "Professional requests", icon: ShoppingBag },
];

export const CategoryPills = memo(function CategoryPills() {
  return (
    <>
      {categories.map((category) => {
        const Icon = category.icon;
        
        return (
          <button
            key={category.id}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full whitespace-nowrap transition-all duration-300 bg-white/10 backdrop-blur-2xl text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-[1.05] active:scale-[0.95] hover:shadow-lg hover:shadow-white/10"
            style={{ fontWeight: 500 }}
          >
            {Icon && <Icon className="w-5 h-5" />}
            {category.label}
          </button>
        );
      })}
    </>
  );
});
