import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Award, Eye, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const mockTopCreators = [
  {
    id: "1",
    rank: 1,
    name: "Domino Desiree",
    image: "https://images.unsplash.com/photo-1584103208051-6d190fa0e065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjBtYWtldXAlMjB3b21hbnxlbnwxfHx8fDE3NjExMzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 847,
    fromPrice: 75,
    specialty: "Sensual Story",
  },
  {
    id: "2",
    rank: 2,
    name: "Mystique Raine",
    image: "https://images.unsplash.com/photo-1556049211-355c9967e5dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMGJlYXV0eSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzMjI1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 723,
    fromPrice: 65,
    specialty: "ASMR",
  },
  {
    id: "3",
    rank: 3,
    name: "Velvet Rose",
    image: "https://images.unsplash.com/photo-1759003527318-678b19902da2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGx1cmluZyUyMGJlYXV0eSUyMG1vZGVsfGVufDF8fHx8MTc2MTEzMjI1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    reviewCount: 689,
    fromPrice: 70,
    specialty: "Roleplay",
  },
];

export function TopCreators() {
  const [topCreators, setTopCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopCreators();
  }, []);

  const fetchTopCreators = async () => {
    try {
      setLoading(true);
      
      // Fetch top 3 creators by rating
      const { data, error } = await supabase
        .from('creators')
        .select(`
          *,
          listings (
            starting_price
          )
        `)
        .order('rating', { ascending: false })
        .order('total_completed_jobs', { ascending: false })
        .limit(3);

      if (error || !data || data.length === 0) {
        setTopCreators(mockTopCreators);
        return;
      }

      // Transform data
      const transformed = data.map((creator, index) => ({
        id: creator.id,
        rank: index + 1,
        name: creator.display_name,
        image: creator.profile_picture_url || mockTopCreators[index].image,
        rating: creator.rating,
        reviewCount: creator.total_completed_jobs,
        fromPrice: creator.listings && creator.listings.length > 0
          ? Math.min(...creator.listings.map((l: any) => l.starting_price))
          : 50,
        specialty: "Creator",
      }));

      setTopCreators(transformed);
    } catch (error) {
      console.error('Error fetching top creators:', error);
      setTopCreators(mockTopCreators);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Award className="w-6 h-6 text-[#FFC34D]" />
          <h2 style={{ fontWeight: 600, fontSize: '1.5rem' }}>Top Creators</h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-2xl aspect-[4/5]"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCreators.map((creator) => (
            <div 
              key={creator.id}
              className="relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10 w-12 h-12 liquid-gradient rounded-full flex items-center justify-center shadow-lg border-2 border-white glow-on-hover">
                <span className="text-white" style={{ fontWeight: 700, fontSize: '1.125rem' }}>{creator.rank}</span>
              </div>
              
              {/* Large Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0e0e0e]">
                <ImageWithFallback 
                  src={creator.image} 
                  alt={creator.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="eager"
                />
                
                {/* Liquid Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#9E0B61]/95 via-[#9E0B61]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
                
                {/* Action Buttons - appears on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 space-y-2">
                  <Link to={`/profile/${creator.id}`}>
                    <button className="w-full py-3 bg-white/95 backdrop-blur-xl text-[#9E0B61] rounded-full hover:scale-105 hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2" style={{ fontWeight: 600 }}>
                      <Eye className="w-5 h-5" />
                      View Profile
                    </button>
                  </Link>
                  <Link to="/request">
                    <button className="w-full py-3 bg-[#9E0B61]/90 backdrop-blur-xl text-white rounded-full hover:scale-105 hover:bg-[#9E0B61] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 glow-on-hover" style={{ fontWeight: 600 }}>
                      <Zap className="w-5 h-5" />
                      Quick Buy
                    </button>
                  </Link>
                </div>
                
                {/* Content Overlay - visible by default */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white group-hover:opacity-0 transition-opacity duration-500 bg-gradient-to-t from-[#000000]/90 via-[#000000]/50 to-transparent">
                  <Badge className="mb-3 bg-[#19E28C] text-black hover:bg-[#19E28C] hover:scale-105 transition-all duration-300 border-2 border-black">
                    {creator.specialty}
                  </Badge>
                  
                  <h3 className="mb-2" style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                    {creator.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D] transition-all duration-300"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/80">({creator.reviewCount})</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-white/70">from </span>
                    <span style={{ fontWeight: 600 }}>£{creator.fromPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
}
