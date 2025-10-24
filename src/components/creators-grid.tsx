import { useEffect, useState } from "react";
import { CreatorCard } from "./creator-card";
import { supabase } from "../lib/supabase";

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
    image: "https://images.unsplash.com/photo-1547626279-671ad06bbb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWx0cnklMjBtb2RlbCUyMGV5ZXN8ZW58MXx8fHwxNzYxMTMyMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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

export function CreatorsGrid() {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      
      // Fetch trending creators (top 12 by total_completed_jobs)
      const { data, error } = await supabase
        .from('creators')
        .select(`
          *,
          listings (
            starting_price
          )
        `)
        .order('total_completed_jobs', { ascending: false })
        .limit(12);

      if (error || !data || data.length === 0) {
        setCreators(mockCreators);
        return;
      }

      // Transform data
      const transformed = data.map((creator, index) => ({
        id: creator.id,
        name: creator.display_name,
        image: creator.profile_picture_url || mockCreators[index % mockCreators.length].image,
        rating: creator.rating,
        reviewCount: creator.total_completed_jobs,
        fromPrice: creator.listings && creator.listings.length > 0
          ? Math.min(...creator.listings.map((l: any) => l.starting_price))
          : 35,
        tags: ["Creator"],
      }));

      setCreators(transformed);
    } catch (error) {
      console.error('Error fetching creators:', error);
      setCreators(mockCreators);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-8 pb-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 style={{ fontWeight: 600, fontSize: '1.5rem' }}>Trending Creators</h2>
          <p className="text-muted-foreground mt-2">
            Discover the hottest voices on WHISPR right now
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
