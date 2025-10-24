import { Search } from "lucide-react";
import { Button } from "./ui/button";

export function MarketplaceHero() {
  return (
    <div className="relative bg-gradient-to-br from-[#9E0B61] via-[#8A0A56] to-[#74094A] overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Find the perfect voice for your vision
          </h1>
          <p className="text-xl text-white/80">
            Connect with talented creators for custom audio messages, ASMR, roleplay & more
          </p>
        </div>

        {/* Enhanced Search Box */}
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden">
              <div className="flex-1 flex items-center">
                <Search className="w-6 h-6 text-[#9E0B61] ml-6 shrink-0" />
                <input
                  type="text"
                  placeholder="Try 'sultry voice message' or 'ASMR whisper'..."
                  className="w-full px-4 py-5 bg-transparent text-black placeholder:text-black/50 outline-none text-lg"
                />
              </div>
              <Button 
                size="lg" 
                variant="gradient"
                className="m-1.5 h-[52px] px-8 shrink-0"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Popular searches */}
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-white/70">Popular:</span>
            {["ASMR", "Roleplay", "Sensual Whisper", "Voice Greeting", "Product UGC"].map((term) => (
              <button
                key={term}
                className="h-9 px-4 rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
