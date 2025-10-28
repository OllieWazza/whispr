import { useEffect, useState } from "react";
import { supabaseAnon } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

interface FeaturedListingsProps {
  limit?: number;
  categoryFilter?: string | null;
  showTitle?: boolean;
}

export function FeaturedListings({ 
  limit = 12, 
  categoryFilter = null,
  showTitle = true 
}: FeaturedListingsProps) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, [categoryFilter]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      
      // Use anonymous client for public data - no auth wait needed
      let query = supabaseAnon
        .from('listings')
        .select(`
          *,
          creators (
            display_name,
            profile_picture_url
          )
        `)
        .order('rating', { ascending: false })
        .limit(limit);

      // Apply category filter if provided
      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }

      const { data: listingsData, error } = await query;

      if (error) {
        console.error('Error fetching featured listings:', error);
        return;
      }

      if (listingsData && listingsData.length > 0) {
        setListings(listingsData);
      }
    } catch (error) {
      console.error('Unexpected error fetching featured listings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        {showTitle && (
          <div className="mb-6">
            <h2 className="text-white mb-1">Featured Listings</h2>
            <p className="text-white/60">Popular content from top creators</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/5 rounded-2xl h-80"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {showTitle && (
        <div className="mb-6">
          <h2 className="text-white mb-1">Featured Listings</h2>
          <p className="text-white/60">
            {categoryFilter 
              ? `${listings.length} listing${listings.length !== 1 ? 's' : ''} in ${categoryFilter}`
              : 'Popular content from top creators'
            }
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing: any) => (
          <div 
            key={listing.id}
            className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
            onClick={() => navigate(`/listing/${listing.id}`)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={listing.thumbnail_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {listing.category && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#9E0B61]/80 backdrop-blur-sm text-white text-xs border border-[#9E0B61]/50">
                    {listing.category}
                  </span>
                </div>
              )}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={listing.creators?.profile_picture_url || 'https://via.placeholder.com/32'}
                    alt={listing.creators?.display_name}
                    className="w-6 h-6 rounded-full border border-white/20"
                  />
                  <span className="text-white text-sm">{listing.creators?.display_name}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white mb-2 line-clamp-1">{listing.title}</h3>
              <p className="text-white/60 text-sm mb-3 line-clamp-2">{listing.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[#FFC34D]">★</span>
                  <span className="text-white text-sm">{listing.rating.toFixed(1)}</span>
                  <span className="text-white/40 text-xs">({listing.total_reviews})</span>
                </div>
                <span className="text-[#19E28C] text-lg" style={{ fontWeight: 600 }}>£{listing.starting_price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


