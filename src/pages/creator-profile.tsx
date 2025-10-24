import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Star, 
  Heart, 
  Share2, 
  Check, 
  Clock, 
  MessageCircle,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Sparkles,
  Package,
  Zap,
  Crown,
  ShoppingCart,
  X,
  UserPlus
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Input } from "../components/ui/input";
import { SubscriptionTierCard } from "../components/subscription-tier-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  price: number;
  category: string;
  plays: number;
  rating: number;
}

export function CreatorProfilePage() {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("popular");

  const creator = {
    name: "Scarlett Vixen",
    username: "@scarlettvixen",
    image: "https://images.unsplash.com/photo-1693333412376-7e9ab19f38de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5zdWFsJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    coverImage: "https://images.unsplash.com/photo-1704511659961-188aed53c8cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5zdWFsJTIwd29tYW4lMjBhdWRpbyUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NjEyNDI5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviewCount: 342,
    followers: 2845,
    totalOrders: 1247,
    responseTime: "1 hour",
    completionRate: "99%",
    bio: "Specializing in sultry ASMR and intimate storytelling. Let me bring your fantasies to life with my voice. 5+ years creating custom audio experiences that will leave you breathless. 💋",
    tags: ["ASMR", "Sultry Voice", "Roleplay", "Sensual Stories", "GFE"],
    memberSince: "Jan 2023",
  };

  const highlightedContent = [
    {
      id: "1",
      title: "Good Morning Sunshine",
      thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      duration: "2:34",
      price: 15,
      category: "Wake Up Call",
      plays: 1243,
      rating: 5.0,
    },
    {
      id: "2",
      title: "Bedtime Whispers",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      duration: "5:12",
      price: 25,
      category: "Sleep Aid",
      plays: 2891,
      rating: 5.0,
    },
    {
      id: "3",
      title: "Private Thoughts",
      thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
      duration: "3:45",
      price: 35,
      category: "Intimate",
      plays: 1876,
      rating: 4.9,
    },
  ];

  const allContent: ContentItem[] = [
    ...highlightedContent,
    {
      id: "4",
      title: "Girlfriend Experience",
      thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      duration: "4:20",
      price: 30,
      category: "GFE",
      plays: 3421,
      rating: 5.0,
    },
    {
      id: "5",
      title: "Teasing You",
      thumbnail: "https://images.unsplash.com/photo-1640876305588-dbdab5869200?w=400",
      duration: "6:15",
      price: 40,
      category: "Teasing",
      plays: 2134,
      rating: 4.9,
    },
    {
      id: "6",
      title: "After Dark Stories",
      thumbnail: "https://images.unsplash.com/photo-1696337431362-ba8368c09bf7?w=400",
      duration: "8:30",
      price: 50,
      category: "Storytelling",
      plays: 1654,
      rating: 5.0,
    },
  ];

  const subscriptionTiers = [
    {
      id: 1,
      name: "Quick Whisper",
      price: 25,
      period: "per order",
      deliveryTime: "24 hours",
      icon: Zap,
      features: [
        "30-second personalized audio",
        "One revision included",
        "MP3 format delivery",
        "Commercial use rights",
      ],
    },
    {
      id: 2,
      name: "Premium Experience",
      price: 50,
      period: "per order",
      deliveryTime: "48 hours",
      popular: true,
      icon: Sparkles,
      features: [
        "2-minute custom audio",
        "Three revisions included",
        "HD audio quality",
        "Script consultation",
        "Commercial use rights",
        "Priority support",
      ],
    },
    {
      id: 3,
      name: "VIP Collection",
      price: 100,
      period: "per order",
      deliveryTime: "3 days",
      icon: Crown,
      features: [
        "5-minute premium audio",
        "Unlimited revisions",
        "Studio-grade quality",
        "Full script writing",
        "Video call consultation",
        "Commercial use rights",
        "24/7 priority support",
        "Exclusive content",
      ],
    },
  ];

  // Get unique categories for filter
  const categories = Array.from(new Set(allContent.map(item => item.category)));
  
  // Price ranges
  const priceRanges = [
    { label: "Under £20", min: 0, max: 20 },
    { label: "£20 - £35", min: 20, max: 35 },
    { label: "£35 - £50", min: 35, max: 50 },
    { label: "Over £50", min: 50, max: Infinity },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const togglePriceRange = (label: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(label)
        ? prev.filter(r => r !== label)
        : [...prev, label]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedPriceRanges.length > 0 || searchQuery !== "";

  let filteredContent = allContent.filter(item => {
    // Search filter
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);

    // Price filter
    const matchesPrice = selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some(rangeLabel => {
        const range = priceRanges.find(r => r.label === rangeLabel);
        return range && item.price >= range.min && item.price < range.max;
      });

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort content
  filteredContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
      default:
        return b.plays - a.plays;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Cover Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={creator.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0e0e]/50 to-[#0e0e0e]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-6 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] opacity-50 blur-xl" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 ring-2 ring-[#9E0B61]/50">
                <ImageWithFallback
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl">{creator.name}</h1>
                    {/* Verified Badge */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61] to-[#74094A] rounded-md blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-[#9E0B61] to-[#74094A] rounded-md shadow-lg">
                        <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white stroke-[3]" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[#DADBE1] mb-3 text-base sm:text-lg">{creator.username}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                      <span>{creator.rating}</span>
                      <span className="text-[#DADBE1]">({creator.reviewCount})</span>
                    </div>
                    <span className="text-[#DADBE1]">•</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-[#9E0B61]" />
                      <span>{creator.followers.toLocaleString()} followers</span>
                    </div>
                    <span className="text-[#DADBE1]">•</span>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4 text-[#19E28C]" />
                      <span>{creator.totalOrders.toLocaleString()} orders</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {creator.tags.map((tag) => (
                      <Badge key={tag} className="bg-[#9E0B61]/10 text-[#E879F9] border border-[#9E0B61]/20 hover:bg-[#9E0B61]/20 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`backdrop-blur-xl transition-all ${
                      isFavorited
                        ? "bg-[#9E0B61]/20 border-[#9E0B61] text-[#E879F9]"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isFavorited ? "currentColor" : "none"}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="gradient" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Subscribe</span>
                  </Button>
                </div>
              </div>
              <p className="text-[#DADBE1] leading-relaxed">{creator.bio}</p>
            </div>
          </div>
        </div>

        {/* Profile Highlight Audio Showreel */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 backdrop-blur-2xl bg-gradient-to-br from-[#9E0B61]/5 to-transparent border-[#9E0B61]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center shrink-0">
              <Play className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg">Profile Showreel</h3>
              <p className="text-xs sm:text-sm text-[#DADBE1] truncate">Hear what makes me unique</p>
            </div>
          </div>
          <div className="bg-black/30 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                size="icon"
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-[#9E0B61]/20 hover:border-[#9E0B61]/50 transition-all shrink-0 w-10 h-10 sm:w-11 sm:h-11"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
              <div className="flex-1 min-w-0">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-[#9E0B61] to-[#E879F9] w-1/3 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs text-[#DADBE1]">
                  <span>0:45</span>
                  <span>2:18</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-[#DADBE1] shrink-0">
                <Sparkles className="w-4 h-4 text-[#E879F9]" />
                <span>Sample Preview</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Top/Highlighted Content */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 backdrop-blur-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#FFC34D] shrink-0" />
                  <h2 className="text-lg sm:text-xl">Featured Content</h2>
                </div>
                <Badge className="bg-[#FFC34D]/10 text-[#FFC34D] border border-[#FFC34D]/20 text-xs sm:text-sm w-fit">
                  Top Sellers
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {highlightedContent.map((content) => (
                  <div
                    key={content.id}
                    className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#9E0B61]/50 transition-all cursor-pointer"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <ImageWithFallback
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                        {content.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-[#9E0B61] flex items-center justify-center">
                          <Play className="w-6 h-6 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm line-clamp-1">{content.title}</h4>
                        <span className="text-[#19E28C] text-sm shrink-0">£{content.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#DADBE1] mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#FFC34D] text-[#FFC34D]" />
                          <span>{content.rating}</span>
                        </div>
                        <span>•</span>
                        <span className="truncate">{content.plays.toLocaleString()} plays</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full h-9 bg-white/5 border-white/10 hover:bg-[#9E0B61]/20 hover:border-[#9E0B61]/50 text-xs sm:text-sm"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Quick Buy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Content Collection */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 backdrop-blur-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6">
                <h2 className="text-lg sm:text-xl">All {creator.name.split(' ')[0]} Content</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllContent(!showAllContent)}
                  className="gap-2 bg-white/5 border-white/10 hover:bg-white/10 w-full sm:w-auto"
                >
                  {showAllContent ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      <span>View All ({allContent.length})</span>
                    </>
                  )}
                </Button>
              </div>

              {showAllContent && (
                <>
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 transition-all duration-300" />
                      <Input
                        placeholder="Search content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-11 pr-4 h-11 rounded-full bg-white/10 border-white/20 placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 backdrop-blur-xl transition-all duration-300"
                      />
                    </div>
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-11 px-4 rounded-full bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-xl transition-all duration-300 gap-2 flex-1 sm:flex-initial"
                          >
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                            {hasActiveFilters && (
                              <Badge className="ml-1 h-5 w-5 rounded-full bg-[#9E0B61] p-0 flex items-center justify-center text-xs">
                                {selectedCategories.length + selectedPriceRanges.length}
                              </Badge>
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 bg-[#1a1a1a] border-white/10 backdrop-blur-xl">
                          <DropdownMenuLabel className="text-white">Categories</DropdownMenuLabel>
                          {categories.map((category) => (
                            <DropdownMenuCheckboxItem
                              key={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                              className="text-[#DADBE1] focus:bg-white/10 focus:text-white"
                            >
                              {category}
                            </DropdownMenuCheckboxItem>
                          ))}
                          
                          <DropdownMenuSeparator className="bg-white/10" />
                          
                          <DropdownMenuLabel className="text-white">Price Range</DropdownMenuLabel>
                          {priceRanges.map((range) => (
                            <DropdownMenuCheckboxItem
                              key={range.label}
                              checked={selectedPriceRanges.includes(range.label)}
                              onCheckedChange={() => togglePriceRange(range.label)}
                              className="text-[#DADBE1] focus:bg-white/10 focus:text-white"
                            >
                              {range.label}
                            </DropdownMenuCheckboxItem>
                          ))}
                          
                          {hasActiveFilters && (
                            <>
                              <DropdownMenuSeparator className="bg-white/10" />
                              <div className="p-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={clearFilters}
                                  className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-xs"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Clear Filters
                                </Button>
                              </div>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-11 px-4 rounded-full bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-xl transition-all duration-300 gap-2 hidden sm:flex"
                          >
                            <span className="text-sm">
                              {sortBy === "popular" && "Popular"}
                              {sortBy === "price-low" && "Price: Low"}
                              {sortBy === "price-high" && "Price: High"}
                              {sortBy === "rating" && "Rating"}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-[#1a1a1a] border-white/10 backdrop-blur-xl">
                          <DropdownMenuLabel className="text-white">Sort By</DropdownMenuLabel>
                          <DropdownMenuCheckboxItem
                            checked={sortBy === "popular"}
                            onCheckedChange={() => setSortBy("popular")}
                            className="text-[#DADBE1] focus:bg-white/10 focus:text-white"
                          >
                            Most Popular
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={sortBy === "price-low"}
                            onCheckedChange={() => setSortBy("price-low")}
                            className="text-[#DADBE1] focus:bg-white/10 focus:text-white"
                          >
                            Price: Low to High
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={sortBy === "price-high"}
                            onCheckedChange={() => setSortBy("price-high")}
                            className="text-[#DADBE1] focus:bg-white/10 focus:text-white"
                          >
                            Price: High to Low
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={sortBy === "rating"}
                            onCheckedChange={() => setSortBy("rating")}
                            className="text-[#DADBE1] focus:bg-white/10 focus:text-white"
                          >
                            Highest Rated
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          className="bg-[#9E0B61]/20 text-[#E879F9] border border-[#9E0B61]/40 pl-2 pr-1 gap-1 cursor-pointer hover:bg-[#9E0B61]/30"
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                          <X className="w-3 h-3" />
                        </Badge>
                      ))}
                      {selectedPriceRanges.map((range) => (
                        <Badge
                          key={range}
                          className="bg-[#19E28C]/20 text-[#19E28C] border border-[#19E28C]/40 pl-2 pr-1 gap-1 cursor-pointer hover:bg-[#19E28C]/30"
                          onClick={() => togglePriceRange(range)}
                        >
                          {range}
                          <X className="w-3 h-3" />
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Results Count */}
                  <div className="text-sm text-[#DADBE1] mb-4">
                    Showing {filteredContent.length} of {allContent.length} items
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredContent.map((content) => (
                      <div
                        key={content.id}
                        className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#9E0B61]/50 transition-all cursor-pointer"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <ImageWithFallback
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <Badge className="absolute top-2 left-2 text-xs bg-black/80 backdrop-blur-sm border-0">
                            {content.category}
                          </Badge>
                          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                            {content.duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded-full bg-[#9E0B61] flex items-center justify-center">
                              <Play className="w-5 h-5 ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm mb-2 line-clamp-1">{content.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-[#19E28C] text-sm">£{content.price}</span>
                            <div className="flex items-center gap-1 text-xs text-[#DADBE1]">
                              <Star className="w-3 h-3 fill-[#FFC34D] text-[#FFC34D]" />
                              <span>{content.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Subscription Packages & Custom Requests */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 backdrop-blur-2xl">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl mb-2">Custom Orders & Subscriptions</h2>
                <p className="text-[#DADBE1] text-xs sm:text-sm">
                  Request personalized content tailored just for you
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subscriptionTiers.map((tier) => (
                  <SubscriptionTierCard key={tier.id} tier={tier} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Card */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 backdrop-blur-2xl">
              <h3 className="text-base sm:text-lg mb-4">Creator Stats</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Response Time</span>
                  <span className="text-[#19E28C] text-sm sm:text-base">{creator.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Completion Rate</span>
                  <span className="text-[#19E28C] text-sm sm:text-base">{creator.completionRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Total Orders</span>
                  <span className="text-sm sm:text-base">{creator.totalOrders.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Member Since</span>
                  <span className="text-sm sm:text-base">{creator.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 backdrop-blur-2xl">
              <h3 className="text-base sm:text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="gradient" fullWidth className="justify-start gap-2 h-11">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Request Custom Content</span>
                </Button>
                <Button variant="outline" fullWidth className="justify-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 h-11">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Send Message</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
