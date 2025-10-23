import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Sparkles, Zap, Heart, Headphones, Star, TrendingUp, ArrowRight } from "lucide-react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";

export function ComingSoonPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="flex-1 relative overflow-hidden liquid-gradient">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61]/20 via-transparent to-[#74094A]/20"></div>
      </div>
      
      {/* Floating light orbs - matching home page */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-48 sm:h-80 bg-[#19E28C]/30 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent w-[200%]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-24">
        {/* Header Badge - matching home page pill style */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white text-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 glow-on-hover">
            <div className="w-2 h-2 bg-[#19E28C] rounded-full animate-pulse"></div>
            <span>Something Special is Coming</span>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div 
            className="relative transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)`,
            }}
          >
            <img 
              src={whisprLogo} 
              alt="WHISPR" 
              className="h-24 sm:h-32 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="font-display text-white mb-6" style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}>
            Your Desires,<br />
            Their Voice
          </h1>
          <p className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
            The ultimate marketplace for personalized audio experiences. Connect with exclusive creators 
            for custom voice notes, intimate messages, and sensual content crafted just for you.
          </p>
          
          {/* CTA Buttons - matching home page style */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16">
            <Button 
              size="lg"
              className="group"
            >
              Notify Me
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass-white" 
              size="lg"
              className="group"
            >
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="glass-button rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>Custom Audio</h3>
            <p className="text-sm text-white/80">
              Personalized voice notes and audio messages from your favorite creators
            </p>
          </div>

          <div className="glass-button rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>Verified Models</h3>
            <p className="text-sm text-white/80">
              Exclusive access to professional creators and adult entertainment stars
            </p>
          </div>

          <div className="glass-button rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>Fast Delivery</h3>
            <p className="text-sm text-white/80">
              Get your custom content delivered within hours, not days
            </p>
          </div>

          <div className="glass-button rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>100% Private</h3>
            <p className="text-sm text-white/80">
              Secure, discreet transactions with complete privacy protection
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 text-white text-sm mb-6 glow-on-hover">
                <TrendingUp className="w-4 h-4" />
                Platform Preview
              </div>
              <h2 className="font-display text-white mb-4" style={{ fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 }}>
                A New Era of<br />Intimate Connection
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                WHISPR brings you closer to the creators you admire. Request personalized audio content for any occasion—birthdays, good morning messages, bedtime stories, or something more... intimate.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-[#9E0B61] text-xs">✓</span>
                  </div>
                  <span className="text-white/90">Browse thousands of verified creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-[#9E0B61] text-xs">✓</span>
                  </div>
                  <span className="text-white/90">Choose from multiple pricing tiers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-[#9E0B61] text-xs">✓</span>
                  </div>
                  <span className="text-white/90">Get your custom audio within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-[#9E0B61] text-xs">✓</span>
                  </div>
                  <span className="text-white/90">Enjoy completely private, encrypted delivery</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass-button p-1">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1657223143933-33ceab36ecb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWFkcGhvbmVzJTIwZGFya3xlbnwxfHx8fDE3NjEyNDY1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="WHISPR Platform Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 glass-button rounded-2xl p-4 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/90"></div>
                  <div>
                    <div className="h-2 w-16 bg-white/30 rounded mb-1"></div>
                    <div className="h-2 w-12 bg-white/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="glass-button rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-1" style={{ fontWeight: 700, fontSize: '2.5rem' }}>5K+</div>
            <p className="text-sm text-white/80">Creators Ready</p>
          </div>
          <div className="glass-button rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-1" style={{ fontWeight: 700, fontSize: '2.5rem' }}>24h</div>
            <p className="text-sm text-white/80">Avg Delivery</p>
          </div>
          <div className="glass-button rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-1" style={{ fontWeight: 700, fontSize: '2.5rem' }}>100%</div>
            <p className="text-sm text-white/80">Secure & Private</p>
          </div>
          <div className="glass-button rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-1" style={{ fontWeight: 700, fontSize: '2.5rem' }}>98%</div>
            <p className="text-sm text-white/80">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </main>
  );
}
