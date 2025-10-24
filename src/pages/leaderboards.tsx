import { useState } from "react";
import { Trophy, TrendingUp, DollarSign, ShoppingBag, Crown, Medal, Star, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { LiquidTabs } from "../components/liquid-tabs";
import { Link } from "react-router-dom";

const creatorsData = [
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
    totalOrders: 1243,
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
    totalOrders: 1876,
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
    totalOrders: 1654,
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
    totalOrders: 2134,
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
    totalOrders: 1567,
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
    totalOrders: 1098,
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
    totalOrders: 876,
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
    totalOrders: 967,
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
    totalOrders: 1123,
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
    totalOrders: 1345,
  },
];

interface LeaderboardRowProps {
  creator: typeof creatorsData[0];
  rank: number;
  metric: "revenue" | "orders" | "week";
}

function LeaderboardRow({ creator, rank, metric }: LeaderboardRowProps) {
  const getRankIcon = () => {
    if (rank === 1) return <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC34D]" />;
    if (rank === 2) return <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-[#C0C0C0]" />;
    if (rank === 3) return <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-[#CD7F32]" />;
    return null;
  };

  const getMetricValue = () => {
    switch (metric) {
      case "revenue":
        return `£${creator.revenue.toLocaleString()}`;
      case "orders":
        return `${creator.totalOrders.toLocaleString()} orders`;
      case "week":
        return `${creator.weeklyOrders} orders`;
    }
  };

  const getMetricLabel = () => {
    switch (metric) {
      case "revenue":
        return "Revenue";
      case "orders":
        return "Total Orders";
      case "week":
        return "Weekly Orders";
    }
  };

  return (
    <div className={`transition-all duration-300 ${rank <= 3 ? "bg-white/5" : ""}`}>
      {/* Desktop Layout - Fully Clickable Row */}
      <Link 
        to={`/profile/${creator.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="hidden md:flex items-center gap-8 px-10 py-8 hover:bg-white/5 group cursor-pointer"
      >
        {/* Rank */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border shrink-0 transition-all duration-300 group-hover:border-[#9E0B61]/50 group-hover:bg-white/5">
          {getRankIcon() || <span className="text-white">{rank}</span>}
        </div>

        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 transition-all duration-300 group-hover:border-[#9E0B61]/50">
            <ImageWithFallback
              src={creator.image}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white mb-1 transition-colors group-hover:text-white/90 whitespace-nowrap">{creator.name}</h3>
          <p className="text-white/60 transition-colors group-hover:text-white/70 whitespace-nowrap">{creator.specialty}</p>
        </div>

        {/* Metric */}
        <div className="text-right shrink-0 min-w-[240px]">
          <div className="text-xs text-white/50 mb-1 whitespace-nowrap">{getMetricLabel()}</div>
          <div className="text-white transition-colors group-hover:text-[#9E0B61] whitespace-nowrap">{getMetricValue()}</div>
        </div>

        {/* Chevron Indicator */}
        <ChevronRight className="w-6 h-6 text-white/40 shrink-0 transition-all duration-300 group-hover:text-[#9E0B61] group-hover:translate-x-1" />
      </Link>

      {/* Mobile Layout - Fully Clickable Card */}
      <Link 
        to={`/profile/${creator.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="md:hidden block"
      >
        <div className="relative group">
          {/* Rank Badge - Floating Top Left */}
          <div className="absolute top-4 left-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#9E0B61]/20 to-[#74094A]/20 backdrop-blur-xl border border-white/20 shadow-lg">
            {getRankIcon() || <span className="text-white">{rank}</span>}
          </div>

          {/* Main Card */}
          <div className="m-3 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#9E0B61]/50 group-active:scale-[0.98]">
            <div className="flex items-center gap-4 mb-3">
              {/* Avatar with gradient ring */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] opacity-50 blur-sm"></div>
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                  <ImageWithFallback
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-white truncate">{creator.name}</h3>
                  <ChevronRight className="w-5 h-5 text-white/40 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-white/60 text-sm truncate">{creator.specialty}</p>
              </div>
            </div>

            {/* Metric Display - Clean and Focused */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <p className="text-white/50 text-xs mb-1">{getMetricLabel()}</p>
              <p className="text-white">{getMetricValue()}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function LeaderboardsPage() {
  const [selectedTab, setSelectedTab] = useState("week");

  const getSortedCreators = () => {
    const sorted = [...creatorsData];
    switch (selectedTab) {
      case "revenue":
        return sorted.sort((a, b) => b.revenue - a.revenue);
      case "orders":
        return sorted.sort((a, b) => b.totalOrders - a.totalOrders);
      case "week":
      default:
        return sorted.sort((a, b) => b.weeklyOrders - a.weeklyOrders);
    }
  };

  const sortedCreators = getSortedCreators();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#9E0B61] via-[#8A0A56] to-[#74094A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(158,11,97,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(116,9,74,0.4),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFC34D]" />
            </div>
            <div>
              <h1 className="text-white mb-1 sm:mb-2">Leaderboards</h1>
              <p className="text-white/70 text-sm sm:text-base">Discover our top performing creators</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-12">
            <div className="rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[#19E28C]" />
                <h3 className="text-white">Top Revenue</h3>
              </div>
              <p className="text-white mb-1">£{sortedCreators[0].revenue.toLocaleString()}</p>
              <p className="text-white/60 text-sm">{sortedCreators[0].name}</p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC34D]" />
                <h3 className="text-white">Most Orders</h3>
              </div>
              <p className="text-white mb-1">{creatorsData.sort((a, b) => b.totalOrders - a.totalOrders)[0].totalOrders.toLocaleString()}</p>
              <p className="text-white/60 text-sm">{creatorsData.sort((a, b) => b.totalOrders - a.totalOrders)[0].name}</p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#9E0B61]" />
                <h3 className="text-white">Trending This Week</h3>
              </div>
              <p className="text-white mb-1">{sortedCreators[0].weeklyOrders}</p>
              <p className="text-white/60 text-sm">{sortedCreators[0].name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-white">Rankings</h2>
          <LiquidTabs
            tabs={[
              { id: "week", label: "This Week", icon: TrendingUp },
              { id: "revenue", label: "By Revenue", icon: DollarSign },
              { id: "orders", label: "By Orders", icon: ShoppingBag },
            ]}
            activeTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-card border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {sortedCreators.map((creator, index) => (
              <LeaderboardRow
                key={creator.id}
                creator={creator}
                rank={index + 1}
                metric={selectedTab as "revenue" | "orders" | "week"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
