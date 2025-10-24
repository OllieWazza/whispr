import { Star, TrendingUp, Trophy, Crown, Medal } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const topCreators = [
  {
    id: "1",
    name: "Scarlett Vixen",
    image: "https://images.unsplash.com/photo-1693333412376-7e9ab19f38de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5zdWFsJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviewCount: 342,
    specialty: "ASMR & Sultry Whispers",
    fromPrice: 35,
    weeklyOrders: 234,
    revenue: 8190,
  },
  {
    id: "2",
    name: "Lacey Wilde",
    image: "https://images.unsplash.com/photo-1620025719617-d52f785ae152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3VyJTIwd29tYW4lMjBsaW5nZXJpZXxlbnwxfHx8fDE3NjExMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviewCount: 478,
    specialty: "Sensual Storytelling",
    fromPrice: 45,
    weeklyOrders: 198,
    revenue: 8910,
  },
  {
    id: "3",
    name: "Vanessa Knight",
    image: "https://images.unsplash.com/photo-1700409589705-c06d984856af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcm90aWMlMjBhcnQlMjB3b21hbnxlbnwxfHx8fDE3NjExMzIyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviewCount: 412,
    specialty: "Roleplay & Fantasy",
    fromPrice: 55,
    weeklyOrders: 187,
    revenue: 10285,
  },
  {
    id: "4",
    name: "Bianca Luxe",
    image: "https://images.unsplash.com/photo-1615675101506-2ca1b9679a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRpbWF0ZSUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxMTMyMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviewCount: 523,
    specialty: "Voice Messages",
    fromPrice: 50,
    weeklyOrders: 210,
    revenue: 10500,
  },
  {
    id: "5",
    name: "Angelica Noir",
    image: "https://images.unsplash.com/photo-1739379201143-5c808ecab4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm92b2NhdGl2ZSUyMHdvbWFuJTIwbW9kZWx8ZW58MXx8fHwxNzYxMTMyMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviewCount: 467,
    specialty: "Flirty Greetings",
    fromPrice: 48,
    weeklyOrders: 176,
    revenue: 8448,
  },
  {
    id: "6",
    name: "Amber Reign",
    image: "https://images.unsplash.com/photo-1646375053039-9de58d924341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWR1Y3RpdmUlMjB3b21hbiUyMGZhY2V8ZW58MXx8fHwxNzYxMTMyMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviewCount: 256,
    specialty: "Roleplay Master",
    fromPrice: 40,
    weeklyOrders: 165,
    revenue: 6600,
  },
  {
    id: "7",
    name: "Roxy Blaze",
    image: "https://images.unsplash.com/photo-1547626279-671ad06bbb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWx0cnklMjBtb2RlbCUyMGV5ZXN8ZW58MXx8fHwxNzYxMTMyMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviewCount: 198,
    specialty: "ASMR Expert",
    fromPrice: 30,
    weeklyOrders: 154,
    revenue: 4620,
  },
  {
    id: "8",
    name: "Crystal Divine",
    image: "https://images.unsplash.com/photo-1712407336051-1ab4a8676079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3Vkb2lyJTIwcGhvdG9ncmFwaHklMjB3b21hbnxlbnwxfHx8fDE3NjExMzIyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviewCount: 289,
    specialty: "Playful Tease",
    fromPrice: 38,
    weeklyOrders: 143,
    revenue: 5434,
  },
  {
    id: "9",
    name: "Domino Desiree",
    image: "https://images.unsplash.com/photo-1679614819895-db411eef004e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTA2ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviewCount: 334,
    specialty: "Sultry Whispers",
    fromPrice: 42,
    weeklyOrders: 138,
    revenue: 5796,
  },
  {
    id: "10",
    name: "Sienna Steele",
    image: "https://images.unsplash.com/photo-1567675898636-66769e851fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWR1Y3RpdmUlMjB3b21hbiUyMGZhc2hpb258ZW58MXx8fHwxNzYxMTQzNzc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviewCount: 389,
    specialty: "Story Time",
    fromPrice: 52,
    weeklyOrders: 126,
    revenue: 6552,
  },
];

function LeaderboardRow({ creator, rank, isVisible }: { creator: typeof topCreators[0], rank: number, isVisible: boolean }) {
  const getRankIcon = () => {
    if (rank === 1) return <Crown className="w-5 h-5 text-[#FFC34D]" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-[#C0C0C0]" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-[#CD7F32]" />;
    return null;
  };

  return (
    <div
      className={`flex items-center gap-4 px-6 py-4 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${rank * 50}ms` }}
    >
      {/* Rank */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shrink-0">
        {getRankIcon() || <span className="text-white">{rank}</span>}
      </div>

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
        <ImageWithFallback
          src={creator.image}
          alt={creator.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-white truncate">{creator.name}</div>
        <div className="text-sm text-white/60 truncate">{creator.specialty}</div>
      </div>

      {/* Stats */}
      <div className="text-right shrink-0">
        <div className="text-white">£{creator.revenue.toLocaleString()}</div>
        <div className="text-xs text-white/60">{creator.weeklyOrders} orders</div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 shrink-0">
        <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
        <span className="text-sm text-white">{creator.rating}</span>
      </div>
    </div>
  );
}

function LiveLeaderboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 6) % topCreators.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleCreators = [
    ...topCreators.slice(currentIndex, currentIndex + 6),
    ...topCreators.slice(0, Math.max(0, currentIndex + 6 - topCreators.length)),
  ].slice(0, 6);

  return (
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#19E28C]" />
          <h3 className="text-lg text-white">Live Leaderboard</h3>
        </div>
        <div className="text-sm text-white/60">This Week</div>
      </div>
      <div className="divide-y divide-white/5">
        {visibleCreators.map((creator, index) => {
          const actualRank = (currentIndex + index) % topCreators.length + 1;
          return (
            <LeaderboardRow
              key={`${creator.id}-${currentIndex}`}
              creator={creator}
              rank={actualRank}
              isVisible={isVisible}
            />
          );
        })}
      </div>
    </div>
  );
}

export function TopCreatorsShowcase() {
  return (
    <div className="bg-gradient-to-br from-[#9E0B61] via-[#8A0A56] to-[#74094A] relative overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(158,11,97,0.4),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(116,9,74,0.4),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-[#19E28C]" />
              <h2 className="font-display text-3xl text-white">Most Popular Creators</h2>
            </div>
            <p className="text-white/70">Top-rated voice artists this week</p>
          </div>
          <div className="flex items-center justify-start lg:justify-end">
            <Link to="/leaderboards">
              <Button variant="glass-white" size="lg">
                View All Leaderboards
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCreators.slice(0, 6).map((creator, index) => (
              <button
                key={creator.id}
                className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:border-white/40 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] active:scale-[0.98] text-left"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Top Badge */}
                  {index < 3 && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#19E28C]/20 backdrop-blur-xl border border-[#19E28C]/40">
                      {index === 0 && <Crown className="w-3.5 h-3.5 text-[#FFC34D]" />}
                      {index === 1 && <Medal className="w-3.5 h-3.5 text-[#C0C0C0]" />}
                      {index === 2 && <Medal className="w-3.5 h-3.5 text-[#CD7F32]" />}
                      <span className="text-sm text-white">Top {index + 1}</span>
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20">
                    <Star className="w-3.5 h-3.5 fill-[#FFC34D] text-[#FFC34D]" />
                    <span className="text-sm text-white">{creator.rating}</span>
                    <span className="text-xs text-white/60">({creator.reviewCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg text-white mb-1">{creator.name}</h3>
                  <p className="text-sm text-white/70 mb-3">{creator.specialty}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">From</span>
                    <span className="text-white">£{creator.fromPrice}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Live Leaderboard */}
          <div className="lg:sticky lg:top-24">
            <LiveLeaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}
