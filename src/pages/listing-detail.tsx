import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Star,
  Heart,
  Share2,
  Play,
  Pause,
  Check,
  Clock,
  MessageCircle,
  ShoppingCart,
  Loader2,
  ArrowLeft,
  Shield,
  Sparkles,
  Zap,
  Crown
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SubscriptionTierCard } from "../components/subscription-tier-card";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export function ListingDetailPage() {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);
  const [creator, setCreator] = useState<any>(null);
  const [tiers, setTiers] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (listingId) {
      fetchListingData();
    }
  }, [listingId]);

  const fetchListingData = async () => {
    try {
      setLoading(true);

      // Fetch listing details
      const { data: listingData, error: listingError } = await supabase
        .from('listings')
        .select(`
          *,
          creators:creator_id (
            id,
            display_name,
            profile_picture_url,
            rating,
            total_completed_jobs,
            response_time,
            satisfaction_rate
          )
        `)
        .eq('id', listingId)
        .single();

      if (listingError || !listingData) {
        console.error('Listing not found:', listingError);
        navigate('/404');
        return;
      }

      // Fetch listing tiers
      const { data: tiersData } = await supabase
        .from('listing_tiers')
        .select('*')
        .eq('listing_id', listingId)
        .order('price', { ascending: true });

      setListing(listingData);
      setCreator(listingData.creators);
      setTiers(tiersData || []);
    } catch (error) {
      console.error('Error fetching listing:', error);
      navigate('/404');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#9E0B61] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Listing not found</p>
          <Button onClick={() => navigate('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const tierComponents = tiers.map((tier) => {
    // Build features array dynamically
    const features = [
      tier.description,
      `${tier.revisions} revision${tier.revisions > 1 ? 's' : ''} included`,
      tier.delivery_days ? `Delivered in ${tier.delivery_days} day${tier.delivery_days > 1 ? 's' : ''}` : 
      tier.delivery_time ? `Delivered in ${tier.delivery_time}` : null,
      tier.max_duration_minutes ? `Up to ${tier.max_duration_minutes} minutes` : null,
      tier.custom_requirements ? tier.custom_requirements : null,
    ].filter(Boolean);

    const tierConfig = {
      id: tier.id,
      name: tier.tier_name === 'basic' ? 'Basic Tier' :
            tier.tier_name === 'premium' ? 'Premium Tier' :
            'VIP Tier',
      price: tier.price,
      period: "per order",
      deliveryTime: tier.delivery_days ? `${tier.delivery_days} days` : tier.delivery_time,
      popular: tier.tier_name === 'premium',
      icon: tier.tier_name === 'basic' ? Zap :
            tier.tier_name === 'premium' ? Sparkles :
            Crown,
      features: features,
    };
    return tierConfig;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Listing Header */}
            <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl mb-2">{listing.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                      <span>{listing.rating.toFixed(1)}</span>
                      <span>({listing.total_reviews} reviews)</span>
                    </div>
                    <Badge className="bg-[#19E28C]/10 text-[#19E28C] border border-[#19E28C]/20">
                      {listing.content_type}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`${
                      isFavorited ? "bg-[#9E0B61]/20 border-[#9E0B61]" : ""
                    }`}
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isFavorited ? "currentColor" : "none"}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail */}
              {listing.thumbnail_url && (
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <ImageWithFallback
                    src={listing.thumbnail_url}
                    alt={listing.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Voice Preview */}
              <div className="glass-card rounded-xl p-4 mb-6 bg-gradient-to-br from-[#9E0B61]/5 to-transparent border-[#9E0B61]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center">
                    <Play className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg">Voice Preview</h3>
                    <p className="text-sm text-muted-foreground">
                      Hear what makes this special
                    </p>
                  </div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <div className="flex-1">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-gradient-to-r from-[#9E0B61] to-[#E879F9] w-1/3" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>0:00</span>
                        <span>0:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl mb-3">About This Listing</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Pricing Section - Instant Buy or Custom Tiers */}
            {listing.listing_type === 'instant' ? (
              /* Instant Buy Section */
              <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-[#9E0B61]" />
                  <h2 className="text-xl">Instant Buy</h2>
                </div>
                
                <div className="bg-gradient-to-br from-[#9E0B61]/10 to-transparent rounded-xl p-6 border border-[#9E0B61]/20 mb-4">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl text-white">£{listing.instant_buy_price || listing.starting_price}</span>
                    <span className="text-white/60">one-time purchase</span>
                  </div>
                  
                  {listing.max_quantity && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-white/70">Availability</span>
                        <span className="text-[#19E28C]">
                          {listing.max_quantity - (listing.quantity_sold || 0)} of {listing.max_quantity} remaining
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#9E0B61] to-[#E879F9]" 
                          style={{width: `${((listing.quantity_sold || 0) / listing.max_quantity) * 100}%`}}
                        />
                      </div>
                      {listing.revoke_access_after_listen && (
                        <p className="text-yellow-500/80 text-sm mt-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Audio deleted after listening - one time access only
                        </p>
                      )}
                    </div>
                  )}
                  
                  <Button fullWidth size="lg" className="bg-gradient-to-r from-[#9E0B61] to-[#74094A]">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now - £{listing.instant_buy_price || listing.starting_price}
                  </Button>
                </div>
                
                {listing.audio_duration && (
                  <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                    <span>Duration</span>
                    <span>{Math.floor(listing.audio_duration / 60)}:{String(listing.audio_duration % 60).padStart(2, '0')}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Access</span>
                  <span>{listing.revoke_access_after_listen ? 'Single listen' : 'Permanent'}</span>
                </div>
              </div>
            ) : (
              /* Custom Listing Tiers */
              <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
                <h2 className="text-xl mb-6">Choose Your Tier</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tierComponents.map((tier) => (
                    <SubscriptionTierCard key={tier.id} tier={tier} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Card */}
            <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
              <h3 className="text-lg mb-4">About the Creator</h3>
              <Link to={`/profile/${creator.id}`} className="block group">
                <div className="flex items-center gap-3 mb-4">
                  <ImageWithFallback
                    src={creator.profile_picture_url || "https://via.placeholder.com/80"}
                    alt={creator.display_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="group-hover:text-[#9E0B61] transition-colors">
                      {creator.display_name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-[#FFC34D] text-[#FFC34D]" />
                      <span>{creator.rating.toFixed(1)}</span>
                      <span>({creator.total_completed_jobs} orders)</span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-[#19E28C]">{creator.response_time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Satisfaction Rate</span>
                  <span className="text-[#19E28C]">{creator.satisfaction_rate}%</span>
                </div>
              </div>

              <Button fullWidth className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact Creator
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#19E28C]" />
                <div>
                  <h4 className="mb-1">Safe & Secure</h4>
                  <p className="text-sm text-muted-foreground">
                    All transactions are secured and protected. Your satisfaction is guaranteed.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
              <h3 className="text-lg mb-4">Listing Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Starting Price</span>
                  <span className="text-lg">£{listing.starting_price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                    <span>{listing.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Reviews</span>
                  <span>{listing.total_reviews}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

