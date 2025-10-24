import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CategoryPills } from "./category-pills";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative liquid-gradient pt-24 sm:pt-28 md:pt-32 pb-0 px-4 sm:px-6 overflow-hidden -mt-16">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61]/20 via-transparent to-[#74094A]/20"></div>
      </div>
      
      {/* Floating light orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-48 sm:h-80 bg-[#19E28C]/30 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent w-[200%]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 glow-on-hover">
            <div className="w-2 h-2 bg-[#19E28C] rounded-full animate-pulse"></div>
            <span className="whitespace-nowrap sm:whitespace-normal">5,000+ verified creators</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white px-4" style={{ fontWeight: 700, lineHeight: 1.1 }}>
            Personalised audio and video<br />
            from creators you rate
          </h1>
          
          <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
            Voice notes, short videos, and UGC — created to order. Safe, simple, fast.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-12 px-4">
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="group w-full"
              >
                Explore creators
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/become-creator" className="w-full sm:w-auto">
              <Button 
                variant="glass-white" 
                size="lg"
                className="group w-full"
              >
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Become a creator
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 text-white/80 text-xs sm:text-sm px-4">
            <div className="flex items-center gap-2 glass-button px-3 sm:px-4 py-2 rounded-full">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-white/20 border-2 border-[#9E0B61]" />
                ))}
              </div>
              <span className="hidden sm:inline">100K+ happy customers</span>
              <span className="sm:hidden">100K+ customers</span>
            </div>
            <div className="flex items-center gap-2 glass-button px-3 sm:px-4 py-2 rounded-full">
              <div className="flex">
                {[1,2,3,4,5].map((i) => (
                  <span key={i} className="text-[#FFC34D] text-sm sm:text-lg">★</span>
                ))}
              </div>
              <span className="hidden sm:inline">4.9/5 average rating</span>
              <span className="sm:hidden">4.9/5</span>
            </div>
            <div className="glass-button px-3 sm:px-4 py-2 rounded-full">
              <span>✓ 24h delivery</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Pills - integrated into hero with auto-scroll carousel */}
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 overflow-hidden py-12">
        <div className="flex gap-3 animate-scroll-carousel">
          <CategoryPills />
          {/* Duplicate for seamless loop */}
          <CategoryPills />
        </div>
      </div>
    </section>
  );
}
