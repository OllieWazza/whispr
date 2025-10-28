import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MarketplaceHero } from "../components/marketplace-hero";
import { MarketplaceFilters } from "../components/marketplace-filters";
import { TrendingSection } from "../components/trending-section";
import { PopularCategories } from "../components/popular-categories";
import { TopCreatorsShowcase } from "../components/top-creators-showcase";
import { CreatorCard } from "../components/creator-card";
import { FeaturedListings } from "../components/featured-listings";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { supabaseAnon } from "../lib/supabase";
import { Database } from "../lib/database.types";

type Creator = Database['public']['Tables']['creators']['Row'] & {
  listings?: Database['public']['Tables']['listings']['Row'][];
};

// Fallback mock creators for when database is empty
const mockCreators = [
  {
    id: "1",
    name: "Scarlett Vixen",
    image: "https://images.unsplash.com/photo-1693333412376-7e9ab19f38de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5zdWFsJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 342,
    fromPrice: 35,
    tags: ["ASMR", "Sultry"],
  },
  {
    id: "2",
    name: "Lacey Wilde",
    image: "https://images.unsplash.com/photo-1620025719617-d52f785ae152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3VyJTIwd29tYW4lMjBsaW5nZXJpZXxlbnwxfHx8fDE3NjExMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 478,
    fromPrice: 45,
    tags: ["Sensual Story", "Flirty"],
  },
  {
    id: "3",
    name: "Amber Reign",
    image: "https://images.unsplash.com/photo-1646375053039-9de58d924341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWR1Y3RpdmUlMjB3b21hbiUyMGZhY2V8ZW58MXx8fHwxNzYxMTMyMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 256,
    fromPrice: 40,
    tags: ["Roleplay", "Sultry"],
  },
  {
    id: "4",
    name: "Bianca Luxe",
    image: "https://images.unsplash.com/photo-1615675101506-2ca1b9679a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRpbWF0ZSUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxMTMyMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 523,
    fromPrice: 50,
    tags: ["Whisper Greeting", "Soft-spoken"],
  },
  {
    id: "5",
    name: "Roxy Blaze",
    image: "https://images.unsplash.com/photo-1547626279-671ad06bbb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWx0cnklMjBtb2RlbCUyMGV5ZXN8ZW58MXx8fHwxNjExMzIyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviewCount: 198,
    fromPrice: 30,
    tags: ["ASMR", "Soothing"],
  },
  {
    id: "6",
    name: "Vanessa Knight",
    image: "https://images.unsplash.com/photo-1700409589705-c06d984856af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcm90aWMlMjBhcnQlMjB3b21hbnxlbnwxfHx8fDE3NjExMzIyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 412,
    fromPrice: 55,
    tags: ["Sensual Story", "Sultry"],
  },
  {
    id: "7",
    name: "Crystal Divine",
    image: "https://images.unsplash.com/photo-1712407336051-1ab4a8676079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3Vkb2lyJTIwcGhvdG9ncmFwaHklMjB3b21hbnxlbnwxfHx8fDE3NjExMzIyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviewCount: 289,
    fromPrice: 38,
    tags: ["Roleplay", "Playful"],
  },
  {
    id: "8",
    name: "Angelica Noir",
    image: "https://images.unsplash.com/photo-1739379201143-5c808ecab4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm92b2NhdGl2ZSUyMHdvbWFuJTIwbW9kZWx8ZW58MXx8fHwxNzYxMTMyMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 467,
    fromPrice: 48,
    tags: ["Whisper Greeting", "Flirty"],
  },
  {
    id: "9",
    name: "Domino Desiree",
    image: "https://images.unsplash.com/photo-1679614819895-db411eef004e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTA2ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviewCount: 334,
    fromPrice: 42,
    tags: ["ASMR", "Sultry"],
  },
  {
    id: "10",
    name: "Sienna Steele",
    image: "https://images.unsplash.com/photo-1567675898636-66769e851fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWR1Y3RpdmUlMjB3b21hbiUyMGZhc2hpb258ZW58MXx8fHwxNzYxMTQzNzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 389,
    fromPrice: 52,
    tags: ["Sensual Story", "Playful"],
  },
  {
    id: "11",
    name: "Natasha Luxe",
    image: "https://images.unsplash.com/photo-1729271640950-b2e8a898a9a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNDM3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviewCount: 267,
    fromPrice: 46,
    tags: ["Roleplay", "Flirty"],
  },
  {
    id: "12",
    name: "Ivy Velvet",
    image: "https://images.unsplash.com/photo-1696337431362-ba8368c09bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5zdWFsJTIwd29tYW4lMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjExNDM3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 401,
    fromPrice: 44,
    tags: ["Whisper Greeting", "Soft-spoken"],
  },
];

export function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, [categoryFilter]);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      console.log('🔄 [MARKETPLACE] Starting fetch (using anon client - no auth wait)...');

      // Fetch all creators using anonymous client for instant loading
      console.log('🔄 [MARKETPLACE] Querying creators table...');
      const { data: creatorsData, error } = await supabaseAnon
        .from('creators')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.error('❌ [MARKETPLACE] Database error:', error);
        console.error('❌ [MARKETPLACE] Error details:', JSON.stringify(error, null, 2));
        console.error('❌ [MARKETPLACE] This usually means RLS policies are blocking access');
        console.error('❌ [MARKETPLACE] Run fix-rls-policies-NOW.sql in Supabase to fix');
        setLoading(false);
        return;
      }

      if (!creatorsData || creatorsData.length === 0) {
        console.warn('⚠️ [MARKETPLACE] No creators found in database');
        console.warn('⚠️ [MARKETPLACE] Run dummy-data.sql to add test creators');
        setLoading(false);
        return;
      }

      console.log(`✅ [MARKETPLACE] Found ${creatorsData.length} creators:`, creatorsData.map(c => c.display_name));

      // Fetch listings separately
      const creatorIds = creatorsData.map((c: any) => c.id);
      console.log('🔄 [MARKETPLACE] Fetching listings for creators:', creatorIds);
      
      const { data: listingsData, error: listingsError } = await supabaseAnon
        .from('listings')
        .select('creator_id, starting_price')
        .in('creator_id', creatorIds);

      if (listingsError) {
        console.error('❌ [MARKETPLACE] Listings error:', listingsError);
      } else {
        console.log(`✅ [MARKETPLACE] Found ${listingsData?.length || 0} listings`);
      }

      // Transform data to match CreatorCard component format
      const transformedCreators = creatorsData.map((creator: any, index: number) => {
        const creatorListings = listingsData?.filter((l: any) => l.creator_id === creator.id) || [];
        const minPrice = creatorListings.length > 0
          ? Math.min(...creatorListings.map((l: any) => l.starting_price))
          : 35;

        return {
          id: creator.id,
          name: creator.display_name,
          image: creator.profile_picture_url || mockCreators[index % mockCreators.length].image,
          rating: creator.rating || 4.5,
          reviewCount: creator.total_completed_jobs || 0,
          fromPrice: minPrice,
          tags: ["Creator"],
        };
      });

      console.log('✅ [MARKETPLACE] Successfully loaded and transformed:', transformedCreators.length);
      setCreators(transformedCreators);
    } catch (error) {
      console.error('❌ [MARKETPLACE] Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <MarketplaceHero />

      {/* Trending Bar */}
      <TrendingSection />

      {/* Popular Categories - Horizontal Scroll */}
      <PopularCategories />

      {/* Main Marketplace Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters Bar */}
        <div className="mb-8">
          <MarketplaceFilters />
        </div>

        {/* Category Filter Display */}
        {categoryFilter && (
          <div className="mb-6 flex items-center gap-3">
            <h3 className="text-white text-lg">Category:</h3>
            <div className="px-4 py-2 rounded-full bg-[#9E0B61]/20 border border-[#9E0B61]/40 text-[#E879F9]">
              {categoryFilter}
            </div>
            <button 
              onClick={() => window.location.href = '/marketplace'}
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-white mb-1">All Creators</h2>
            <p className="text-white/60">
              {loading ? 'Loading...' : `${creators.length} creator${creators.length !== 1 ? 's' : ''} available`}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-white/60 whitespace-nowrap">Sort by:</span>
            <Select defaultValue="featured">
              <SelectTrigger className="w-full sm:w-52 h-11 bg-white/10 border-white/20 rounded-full backdrop-blur-xl hover:bg-white/15 transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Best selling</SelectItem>
                <SelectItem value="top-rated">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Creators</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Creators Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60">No creators found. Be the first to join!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12 mb-16">
          <button
            disabled
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-white/40 text-sm cursor-not-allowed hidden sm:flex items-center gap-2"
            style={{ fontWeight: 600 }}
          >
            Previous
          </button>
          <button
            disabled
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-white/40 text-sm cursor-not-allowed sm:hidden flex items-center gap-2"
            style={{ fontWeight: 600 }}
          >
            Prev
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`
                min-w-[40px] sm:min-w-[44px] px-4 py-2.5 rounded-full text-sm
                backdrop-blur-xl transition-all duration-300
                ${
                  page === 1
                    ? "bg-[#9E0B61]/10 border border-[#9E0B61]/40 text-[#E879F9]"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80"
                }
              `}
              style={{ fontWeight: 600 }}
            >
              {page}
            </button>
          ))}
          <button
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-white/60 hover:bg-white/10 hover:text-white/80 text-sm transition-all duration-300"
            style={{ fontWeight: 600 }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Featured Listings Section */}
      <FeaturedListings 
        limit={12} 
        categoryFilter={categoryFilter} 
        showTitle={true}
      />

      {/* Popular Creators Showcase - Bottom of Page */}
      <TopCreatorsShowcase />
    </div>
  );
}
