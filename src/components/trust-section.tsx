import { Shield, Zap, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Most creators deliver within 24-48 hours",
  },
  {
    icon: CreditCard,
    title: "Payments by Stripe",
    description: "Safe and secure payment processing",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is here to help anytime",
  },
];

export function TrustSection() {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display mb-4" style={{ fontWeight: 600, fontSize: '2rem' }}>
            Why Choose WHISPR
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with verified creators for authentic, personalized content delivered securely and quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-[#9E0B61]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#9E0B61]" />
                </div>
                <h3 className="mb-2" style={{ fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
