import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 px-6 liquid-gradient relative overflow-hidden">
      {/* Liquid Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rotate-45 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rotate-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border border-white rotate-12 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-white/20 backdrop-blur-xl text-white border-white/30 px-5 py-2.5 hover:scale-105 transition-all duration-300 glow-on-hover">
            <Zap className="w-4 h-4 mr-2" />
            Limited Time Offer
          </Badge>
          
          <h2 className="font-display text-white mb-6" style={{ fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 }}>
            Get Personalized Audio from<br />Your Favorite Creators
          </h2>
          
          <p className="text-white/90 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Voice notes, audio messages, custom greetings and more delivered fast. 
            Connect with verified creators and get audio content that's uniquely yours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/marketplace" onClick={() => window.scrollTo(0, 0)}>
              <Button 
                size="xl" 
                className="group"
              >
                <span>Browse Creators</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/become-creator">
              <Button 
                size="xl" 
                variant="glass-white"
              >
                Become a Creator
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Key Statistics Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center glass-button p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-2" style={{ fontWeight: 700, fontSize: '3rem' }}>5K+</div>
            <h3 className="text-white/90 mb-1" style={{ fontWeight: 600 }}>Verified Creators</h3>
            <p className="text-white/70 text-sm">Talented people ready to create</p>
          </div>
          
          <div className="text-center glass-button p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-2" style={{ fontWeight: 700, fontSize: '3rem' }}>98%</div>
            <h3 className="text-white/90 mb-1" style={{ fontWeight: 600 }}>Satisfaction Rate</h3>
            <p className="text-white/70 text-sm">Happy customers worldwide</p>
          </div>
          
          <div className="text-center glass-button p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-2" style={{ fontWeight: 700, fontSize: '3rem' }}>24h</div>
            <h3 className="text-white/90 mb-1" style={{ fontWeight: 600 }}>Average Delivery</h3>
            <p className="text-white/70 text-sm">Most content delivered quickly</p>
          </div>
          
          <div className="text-center glass-button p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="font-display text-white mb-2" style={{ fontWeight: 700, fontSize: '3rem' }}>100K+</div>
            <h3 className="text-white/90 mb-1" style={{ fontWeight: 600 }}>Audio Clips Created</h3>
            <p className="text-white/70 text-sm">Personalized content delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}
