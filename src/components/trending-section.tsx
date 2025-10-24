import { TrendingUp, Heart, Mic, Headphones, Sparkles, Flame } from "lucide-react";

const trendingItems = [
  { id: 1, label: "Sensual Whispers", icon: Heart, trending: true },
  { id: 2, label: "Girlfriend Experience", icon: Sparkles, trending: true },
  { id: 3, label: "ASMR Roleplay", icon: Headphones, trending: false },
  { id: 4, label: "Voice Messages", icon: Mic, trending: false },
  { id: 5, label: "Flirty Audio", icon: Heart, trending: false },
  { id: 6, label: "Custom Scripts", icon: Sparkles, trending: false },
  { id: 7, label: "Sleep Aid", icon: Headphones, trending: false },
  { id: 8, label: "Dirty Talk", icon: Flame, trending: true },
];

export function TrendingSection() {
  return (
    <div className="hidden lg:block bg-card/30 backdrop-blur-xl sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6 py-6">
          {/* Trending Label - Bigger and Sticky */}
          <div className="flex items-center gap-3 text-white shrink-0 pr-4">
            <TrendingUp className="w-6 h-6 text-[#19E28C]" />
            <span className="text-lg" style={{ fontWeight: 600 }}>Trending</span>
          </div>

          {/* Trending Pills - Auto-scrolling Carousel */}
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-2 animate-scroll-carousel">
              {trendingItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="flex items-center gap-2.5 h-10 px-5 rounded-full whitespace-nowrap transition-all duration-300 bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)] hover:scale-[1.02] active:scale-[0.98] shrink-0"
                  >
                    {item.trending && (
                      <Flame className="w-4 h-4 text-[#FFC34D]" />
                    )}
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              {/* Duplicate for seamless loop */}
              {trendingItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={`duplicate-${item.id}`}
                    className="flex items-center gap-2.5 h-10 px-5 rounded-full whitespace-nowrap transition-all duration-300 bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)] hover:scale-[1.02] active:scale-[0.98] shrink-0"
                  >
                    {item.trending && (
                      <Flame className="w-4 h-4 text-[#FFC34D]" />
                    )}
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
