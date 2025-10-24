import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  DollarSign, 
  Clock, 
  Shield, 
  Zap, 
  TrendingUp,
  CheckCircle2,
  Star,
  Users,
  Mic,
  Calendar,
  BarChart3,
  Lock,
  ArrowRight,
  Play,
  Heart,
  MessageCircle,
  Headphones
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import { Card } from "../components/ui/card";

export function BecomeCreatorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Your Way",
      description: "Set your own prices and keep 85% of every sale. No hidden fees, just transparent earnings.",
      stat: "£500-5k+/mo",
      color: "from-[#19E28C] to-[#0EA66E]"
    },
    {
      icon: Clock,
      title: "Work Your Schedule",
      description: "Create content whenever you want. No commitments, no quotas. Full flexibility on your terms.",
      stat: "100% Flexible",
      color: "from-[#9E0B61] to-[#74094A]"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy is our priority. Control what you share, with secure payments and buyer verification.",
      stat: "Bank-Level Security",
      color: "from-[#E879F9] to-[#9E0B61]"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Brand",
      description: "Build your following with our built-in discovery tools and promotion features.",
      stat: "10k+ Active Buyers",
      color: "from-[#FFC34D] to-[#FF8A00]"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Sign up in under 2 minutes. Add your bio, profile photo, and set your pricing.",
      icon: Users
    },
    {
      step: "2",
      title: "Upload Your Content",
      description: "Record and upload your voice clips. Set prices, add descriptions, and showcase your style.",
      icon: Mic
    },
    {
      step: "3",
      title: "Get Discovered",
      description: "Appear in search results and on our marketplace. Buyers can find you and request custom content.",
      icon: Sparkles
    },
    {
      step: "4",
      title: "Start Earning",
      description: "Fulfill requests, deliver content, and get paid. Weekly payouts directly to your account.",
      icon: DollarSign
    }
  ];

  const features = [
    { icon: BarChart3, label: "Real-time Analytics" },
    { icon: Calendar, label: "Order Management" },
    { icon: MessageCircle, label: "Direct Messaging" },
    { icon: Shield, label: "Buyer Verification" },
    { icon: Lock, label: "Content Protection" },
    { icon: Zap, label: "Instant Notifications" },
  ];

  const testimonials = [
    {
      name: "Luna Rose",
      username: "@lunarose",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      quote: "I've earned over £8k in my first 3 months. WHISPR made it so easy to monetize my voice and connect with fans.",
      earnings: "£8.2k/mo",
      rating: 5.0
    },
    {
      name: "Bella Noir",
      username: "@bellanoir",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      quote: "The flexibility is amazing. I work when I want and the community is so supportive. Best platform I've used.",
      earnings: "£5.8k/mo",
      rating: 5.0
    },
    {
      name: "Scarlett Vixen",
      username: "@scarlettvixen",
      image: "https://images.unsplash.com/photo-1693333412376-7e9ab19f38de?w=400",
      quote: "WHISPR takes care of everything - payments, security, promotion. I just focus on creating content I love.",
      earnings: "£12k/mo",
      rating: 5.0
    }
  ];

  const faqs = [
    {
      question: "How much can I really earn?",
      answer: "Earnings vary based on your activity and pricing. Top creators earn £5k-15k+ per month, while most active creators average £500-2k monthly. You set your own prices and keep 85% of every sale."
    },
    {
      question: "What equipment do I need?",
      answer: "Just a smartphone or computer with a decent microphone. Most creators start with their phone and upgrade as they grow. Quality matters, but you don't need expensive gear to get started."
    },
    {
      question: "How do I get paid?",
      answer: "We process payouts weekly via direct bank transfer or PayPal. Minimum payout is £50. All transactions are secure and your earnings are available in your dashboard 24/7."
    },
    {
      question: "Is my content protected?",
      answer: "Yes. We use DRM protection, watermarking, and strict terms to protect your content. Buyers agree to our terms of service, and we take copyright infringement seriously."
    },
    {
      question: "What can I create content about?",
      answer: "Anything within our community guidelines! Popular categories include wake-up calls, GFE content, sleep aids, teasing, storytelling, and custom requests. You control what you're comfortable creating."
    },
    {
      question: "How long does approval take?",
      answer: "Most creators are approved within 24 hours. We verify your identity and ensure you meet our age requirements (18+). Once approved, you can start uploading immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61]/20 via-transparent to-[#74094A]/20" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#9E0B61] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#74094A] rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-[#9E0B61] to-[#74094A] border-0 text-sm sm:text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Join 1,000+ Creators Earning Daily
            </Badge>
            
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
              Turn Your Voice Into Income
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-[#DADBE1] mb-10 max-w-3xl mx-auto leading-relaxed">
              Create personalized audio content and get paid doing what you love. Join WHISPR and start earning from your voice today.
            </p>
            
            <div className="flex items-center justify-center mb-12">
              <Link to="/signup/creator">
                <Button size="lg" className="group gap-2 w-full sm:w-auto sm:min-w-[320px]">
                  Get started free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                { value: "85%", label: "You Keep" },
                { value: "10k+", label: "Active Buyers" },
                { value: "£2.5M+", label: "Paid to Creators" },
                { value: "4.9★", label: "Creator Rating" }
              ].map((stat, index) => (
                <div key={index} className="glass-card rounded-xl p-4 sm:p-6 backdrop-blur-2xl text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1 bg-gradient-to-br from-[#9E0B61] to-[#E879F9] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#DADBE1]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl">Why Creators Love WHISPR</h2>
          <p className="text-lg sm:text-xl text-[#DADBE1] max-w-2xl mx-auto">
            Everything you need to build your audio content business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group glass-card rounded-2xl p-6 sm:p-8 backdrop-blur-2xl hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}>
                  <benefit.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl sm:text-2xl">{benefit.title}</h3>
                    <Badge className="bg-[#9E0B61]/20 text-[#E879F9] border-0 text-xs sm:text-sm shrink-0 ml-2">
                      {benefit.stat}
                    </Badge>
                  </div>
                  <p className="text-[#DADBE1] leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl">Get Started in 4 Simple Steps</h2>
            <p className="text-lg sm:text-xl text-[#DADBE1] max-w-2xl mx-auto">
              From signup to earning in less than 30 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line (Desktop) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#9E0B61] to-transparent" />
                )}
                
                <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl h-full hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center text-xl mb-4">
                      {step.step}
                    </div>
                    <step.icon className="w-8 h-8 text-[#E879F9] absolute top-0 right-0" />
                  </div>
                  <h3 className="text-xl mb-3">{step.title}</h3>
                  <p className="text-[#DADBE1] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="group gap-2">
              Start Creating Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl">Powerful Tools for Creators</h2>
          <p className="text-lg sm:text-xl text-[#DADBE1] max-w-2xl mx-auto">
            Everything you need to manage and grow your business
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-xl p-6 backdrop-blur-2xl text-center hover:scale-[1.05] transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm sm:text-base">{feature.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl">Success Stories</h2>
            <p className="text-lg sm:text-xl text-[#DADBE1] max-w-2xl mx-auto">
              Real creators, real earnings, real experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 sm:p-8 backdrop-blur-2xl hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#9E0B61]/50">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base sm:text-lg">{testimonial.name}</h4>
                      <div className="w-5 h-5 rounded bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#DADBE1]">{testimonial.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                  ))}
                </div>

                <p className="text-[#DADBE1] mb-6 leading-relaxed text-sm sm:text-base">"{testimonial.quote}"</p>

                <Badge className="bg-gradient-to-r from-[#19E28C]/20 to-[#0EA66E]/20 text-[#19E28C] border border-[#19E28C]/20 text-sm sm:text-base px-3 py-1">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {testimonial.earnings}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="text-lg sm:text-xl text-[#DADBE1]">
            Everything you need to know to get started
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-xl overflow-hidden backdrop-blur-2xl">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg sm:text-xl pr-4">{faq.question}</h3>
                <div className={`shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center transition-transform duration-300 ${
                  openFaq === index ? 'rotate-180' : ''
                }`}>
                  <ArrowRight className="w-4 h-4 text-white rotate-90" />
                </div>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-[#DADBE1] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61] via-[#74094A] to-[#9E0B61]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E879F9] rounded-full blur-3xl" />
          </div>
          
          <div className="relative text-center py-16 sm:py-24 px-6 sm:px-12">
            <div className="max-w-3xl mx-auto">
              <Headphones className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-white/90" />
              <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
                Join thousands of creators earning from their voice. Create your profile in minutes and start receiving requests today.
              </p>
              
              <div className="flex items-center justify-center">
                <Button size="lg" className="group gap-2 bg-white text-[#9E0B61] hover:bg-white/90 w-full sm:w-auto sm:min-w-[320px]">
                  Create Account Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <p className="mt-8 text-sm sm:text-base text-white/70">
                No credit card required • Start earning in 24 hours • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
