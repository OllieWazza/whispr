import { Heart, Headphones, Drama, MessageCircle, Mic, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "ASMR & Whispers",
    description: "Tingles and relaxation",
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWRwaG9uZXMlMjByZWNvcmRpbmd8ZW58MXx8fHwxNzYxMTQzMjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "2,345 creators",
  },
  {
    id: 2,
    name: "Sensual Roleplay",
    description: "Immersive experiences",
    icon: Drama,
    image: "https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMjcxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "1,892 creators",
  },
  {
    id: 3,
    name: "Voice Messages",
    description: "Personal greetings",
    icon: MessageCircle,
    image: "https://images.unsplash.com/photo-1601814924207-dc1ee8e9e979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG1pY3JvcGhvbmUlMjBzdHVkaW98ZW58MXx8fHwxNzYxMTQzMjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "3,124 creators",
  },
  {
    id: 4,
    name: "Girlfriend Experience",
    description: "Intimate conversations",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1758600433022-95b5f2a23cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF1ZGlvJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MTE0MzI0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    count: "1,567 creators",
  },
  {
    id: 5,
    name: "Custom Scripts",
    description: "Your words, their voice",
    icon: Mic,
    image: "https://images.unsplash.com/photo-1601814924207-dc1ee8e9e979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG1pY3JvcGhvbmUlMjBzdHVkaW98ZW58MXx8fHwxNzYxMTQzMjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "987 creators",
  },
  {
    id: 6,
    name: "Product UGC",
    description: "Authentic reviews",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWRwaG9uZXMlMjByZWNvcmRpbmd8ZW58MXx8fHwxNzYxMTQzMjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "756 creators",
  },
];

export function PopularCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to marketplace with category filter
    navigate(`/marketplace?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-card/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="font-display text-3xl text-white mb-2">Popular Categories</h2>
        <p className="text-white/70">Explore our most requested audio experiences</p>
      </div>

      <div className="relative -mx-6 px-6">
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border transition-all duration-300 hover:scale-[1.02] hover:border-[#9E0B61]/50 hover:shadow-[0_8px_32px_rgba(158,11,97,0.2)] active:scale-[0.98] flex-shrink-0 w-[320px] snap-start"
              >
                {/* Image Background */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="text-xl text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-white/70 mb-2">{category.description}</p>
                  <p className="text-xs text-white/50">{category.count}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
