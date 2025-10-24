import { useState, useEffect } from "react";
import { StatusChip } from "../components/status-chip";
import { EmptyStateCard } from "../components/empty-state-card";
import { Button } from "../components/ui/button";
import { 
  Download, 
  Star, 
  Package, 
  Heart,
  ShoppingBag,
  Clock,
  Sparkles,
  Edit2,
  Check,
  ChevronRight,
  Loader2
} from "lucide-react";
import { LiquidTabs } from "../components/liquid-tabs";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

type OrderStatus = "Pending" | "In progress" | "Delivered" | "Cancelled";

interface Order {
  id: string;
  creatorName: string;
  creatorImage: string;
  tier: string;
  status: OrderStatus;
  orderDate: string;
  deliveryDate?: string;
  price: number;
  occasion: string;
  hasReview: boolean;
  audioUrl?: string;
}

interface FavoriteCreator {
  id: string;
  name: string;
  image: string;
  specialization: string;
  recentPost?: string;
  isNew?: boolean;
  rating: number;
  totalOrders: number;
}

const predefinedAvatars = [
  "https://images.unsplash.com/photo-1638012107344-3ed0f994d8d7?w=400",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
  "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?w=400",
  "https://images.unsplash.com/photo-1728597578953-54a7dfe78584?w=400",
  "https://images.unsplash.com/photo-1744055879912-7fb62797a81f?w=400",
  "https://images.unsplash.com/photo-1759663174086-941229ec510f?w=400",
];

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    creatorName: "Sophie Rose",
    creatorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    tier: "Premium",
    status: "Delivered",
    orderDate: "2025-10-15",
    deliveryDate: "2025-10-16",
    price: 50,
    occasion: "Birthday",
    hasReview: false,
    audioUrl: "#",
  },
  {
    id: "ORD-002",
    creatorName: "Emma Blake",
    creatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    tier: "Standard",
    status: "In progress",
    orderDate: "2025-10-20",
    price: 30,
    occasion: "Anniversary",
    hasReview: false,
  },
  {
    id: "ORD-003",
    creatorName: "Olivia Hart",
    creatorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    tier: "Basic",
    status: "Pending",
    orderDate: "2025-10-22",
    price: 15,
    occasion: "Just Because",
    hasReview: false,
  },
  {
    id: "ORD-004",
    creatorName: "Aria Moon",
    creatorImage: "https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMjcxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tier: "Premium",
    status: "Delivered",
    orderDate: "2025-10-10",
    deliveryDate: "2025-10-12",
    price: 60,
    occasion: "Good Morning",
    hasReview: true,
    audioUrl: "#",
  },
];

const mockFavorites: FavoriteCreator[] = [
  {
    id: "1",
    name: "Sophie Rose",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    specialization: "Flirty & Playful",
    recentPost: "New bedtime story audio just dropped! 🌙",
    isNew: true,
    rating: 4.9,
    totalOrders: 2450,
  },
  {
    id: "2",
    name: "Emma Blake",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    specialization: "Sensual ASMR",
    recentPost: "Premium tier spots opening tomorrow",
    isNew: true,
    rating: 5.0,
    totalOrders: 3200,
  },
  {
    id: "3",
    name: "Aria Moon",
    image: "https://images.unsplash.com/photo-1640876305588-dbdab5869200?w=400",
    specialization: "Girlfriend Experience",
    rating: 4.8,
    totalOrders: 1890,
  },
  {
    id: "4",
    name: "Luna Star",
    image: "https://images.unsplash.com/photo-1696337431362-ba8368c09bf7?w=400",
    specialization: "Dirty Talk & Roleplay",
    recentPost: "Back from vacation! Ready to record 💋",
    isNew: true,
    rating: 4.9,
    totalOrders: 2780,
  },
];

const mockSuggested: FavoriteCreator[] = [
  {
    id: "5",
    name: "Isabella Noir",
    image: "https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?w=400",
    specialization: "Dominant & Teasing",
    rating: 4.9,
    totalOrders: 3100,
  },
  {
    id: "6",
    name: "Scarlett Vixen",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    specialization: "Bratty & Fun",
    rating: 4.8,
    totalOrders: 2340,
  },
];

export function BuyerDashboardPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites] = useState<FavoriteCreator[]>(mockFavorites); // TODO: Implement favorites
  const [suggested] = useState<FavoriteCreator[]>(mockSuggested);
  const [username, setUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [selectedAvatar, setSelectedAvatar] = useState(predefinedAvatars[0]);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "delivered" | "favorites" | "suggested">("active");

  useEffect(() => {
    if (user && profile) {
      setUsername(profile.display_name);
      setTempUsername(profile.display_name);
      if (profile.profile_picture_url) {
        setSelectedAvatar(profile.profile_picture_url);
      }
      fetchOrders();
    }
  }, [user, profile]);

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch orders where buyer_id matches current user
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          *,
          creators:seller_id (
            display_name,
            profile_picture_url
          ),
          listing_tiers (
            tier_name
          )
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        setOrders(mockOrders); // Fallback to mock data
        return;
      }

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }

      // Transform data to match Order interface
      const transformedOrders: Order[] = ordersData.map((order: any) => ({
        id: order.id,
        creatorName: order.creators?.display_name || 'Unknown Creator',
        creatorImage: order.creators?.profile_picture_url || predefinedAvatars[0],
        tier: order.listing_tiers?.tier_name || 'Standard',
        status: order.status === 'pending' ? 'Pending' :
                order.status === 'in_progress' ? 'In progress' :
                order.status === 'completed' ? 'Delivered' : 'Cancelled',
        orderDate: new Date(order.created_at).toISOString().split('T')[0],
        deliveryDate: order.completed_at ? new Date(order.completed_at).toISOString().split('T')[0] : undefined,
        price: order.amount,
        occasion: order.instructions || 'Custom Order',
        hasReview: false, // TODO: Check if review exists
        audioUrl: order.delivery_url || undefined,
      }));

      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const activeOrders = orders.filter(o => o.status === "Pending" || o.status === "In progress");
  const deliveredOrders = orders.filter(o => o.status === "Delivered");

  const stats = {
    totalPurchases: orders.length,
    activeOrders: activeOrders.length,
    delivered: deliveredOrders.length,
    favorites: favorites.length,
  };

  const handleSaveUsername = () => {
    setUsername(tempUsername);
    setIsEditingUsername(false);
  };

  const handleSelectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    setIsAvatarDialogOpen(false);
  };

  const renderOrderCard = (order: Order, showDownload: boolean = false) => (
    <div key={order.id} className="glass-card rounded-2xl p-5 hover:bg-[#0e0e0e]/80 transition-all">
      <div className="flex gap-4">
        {/* Creator Image */}
        <div className="flex-shrink-0">
          <img
            src={order.creatorImage}
            alt={order.creatorName}
            className="w-16 h-16 rounded-xl object-cover"
          />
        </div>

        {/* Order Details */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="truncate">{order.creatorName}</h4>
                <Badge variant="outline" className="text-xs shrink-0">
                  {order.tier}
                </Badge>
              </div>
              <p className="text-sm text-[#DADBE1]">Order #{order.id}</p>
            </div>
            <StatusChip status={order.status} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-[#DADBE1] block text-xs">Occasion</span>
              <p className="truncate">{order.occasion}</p>
            </div>
            <div>
              <span className="text-[#DADBE1] block text-xs">Date</span>
              <p>{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-[#DADBE1] block text-xs">Price</span>
              <p>£{order.price}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-1">
            {showDownload && order.status === "delivered" && (
              <>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                {!order.hasReview && (
                  <Button size="sm" variant="outline">
                    <Star className="w-4 h-4" />
                    <span className="hidden sm:inline">Review</span>
                  </Button>
                )}
              </>
            )}
            {order.status === "in-progress" && (
              <Button size="sm" variant="outline">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Track</span>
              </Button>
            )}
            {order.status === "pending" && (
              <Button size="sm" variant="outline">
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreatorCard = (creator: FavoriteCreator, isSuggested: boolean = false) => (
    <div key={creator.id} className="glass-card rounded-2xl p-4 hover:bg-[#0e0e0e]/80 transition-all group">
      <div className="flex gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={creator.image}
            alt={creator.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
          {creator.isNew && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#9E0B61] rounded-full border-2 border-[#0e0e0e]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <h4 className="text-sm truncate">{creator.name}</h4>
              <p className="text-xs text-[#DADBE1] truncate">{creator.specialization}</p>
            </div>
            <button className="text-[#9E0B61] hover:text-[#74094A] transition-colors shrink-0">
              <Heart className="w-4 h-4" fill={isSuggested ? "none" : "currentColor"} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#DADBE1] mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#FFC34D] text-[#FFC34D]" />
              <span>{creator.rating}</span>
            </div>
            <span>•</span>
            <span>{creator.totalOrders.toLocaleString()} orders</span>
          </div>

          {creator.recentPost && (
            <div className="bg-[#9E0B61]/10 border border-[#9E0B61]/20 rounded-lg p-2 mb-2">
              <p className="text-xs text-[#DADBE1] line-clamp-2">{creator.recentPost}</p>
            </div>
          )}

          <Button 
            size="sm" 
            variant="outline" 
            className="w-full text-xs h-7"
            onClick={() => window.location.href = `/creator/${creator.id}`}
          >
            {isSuggested ? "View Profile" : "Order Again"}
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <main className="flex-1 py-8 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#9E0B61] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
              <DialogTrigger asChild>
                <button className="relative group flex-shrink-0">
                  <img
                    src={selectedAvatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-[#9E0B61]/50 group-hover:ring-[#9E0B61] transition-all"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Edit2 className="w-5 h-5 text-white" />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-[#0e0e0e] border-[#3A3C43]">
                <DialogHeader>
                  <DialogTitle>Choose Avatar</DialogTitle>
                  <DialogDescription className="text-[#DADBE1]">
                    Select a profile picture from our collection
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                  {predefinedAvatars.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAvatar(avatar)}
                      className={`relative group rounded-xl overflow-hidden aspect-square ${
                        selectedAvatar === avatar ? "ring-2 ring-[#9E0B61]" : ""
                      }`}
                    >
                      <img
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                      {selectedAvatar === avatar && (
                        <div className="absolute inset-0 bg-[#9E0B61]/20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Username */}
            <div className="flex-1">
              <p className="text-sm text-[#DADBE1] mb-1">Welcome back,</p>
              <div className="flex items-center gap-2">
                {isEditingUsername ? (
                  <>
                    <Input
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      className="max-w-[200px] h-9"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveUsername();
                        if (e.key === "Escape") {
                          setTempUsername(username);
                          setIsEditingUsername(false);
                        }
                      }}
                      autoFocus
                    />
                    <Button size="sm" onClick={handleSaveUsername}>
                      <Check className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <h2>{username}</h2>
                    <button
                      onClick={() => setIsEditingUsername(true)}
                      className="text-[#DADBE1] hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <div className="text-right">
                <p className="text-xs text-[#DADBE1]">Total Purchases</p>
                <p className="text-xl">{stats.totalPurchases}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#DADBE1]">Favorites</p>
                <p className="text-xl">{stats.favorites}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Orders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#DADBE1]">Active Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#9E0B61]" />
                </div>
                <p className="text-2xl">{stats.activeOrders}</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#DADBE1]">Delivered</span>
                  <Package className="w-4 h-4 text-[#19E28C]" />
                </div>
                <p className="text-2xl">{stats.delivered}</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#DADBE1]">Favorites</span>
                  <Heart className="w-4 h-4 text-[#9E0B61]" />
                </div>
                <p className="text-2xl">{stats.favorites}</p>
              </div>
            </div>

            {/* Orders Tabs */}
            <LiquidTabs
              tabs={[
                { id: "active", label: "Active", icon: Clock },
                { id: "delivered", label: "Delivered", icon: Download },
                { id: "favorites", label: "Favorites", icon: Heart },
                { id: "suggested", label: "Suggested", icon: Sparkles },
              ]}
              activeTab={activeTab}
              onTabChange={(v) => setActiveTab(v as typeof activeTab)}
            />

            <div className="mt-4">
              {activeTab === "active" && (
                <div className="space-y-3">
                  {activeOrders.length > 0 ? (
                    activeOrders.map(order => renderOrderCard(order, false))
                  ) : (
                    <EmptyStateCard
                      icon={Clock}
                      title="No active orders"
                      description="You don't have any orders in progress. Browse creators to make a new request!"
                      actionLabel="Explore Creators"
                      onAction={() => window.location.href = "/marketplace"}
                    />
                  )}
                </div>
              )}

              {activeTab === "delivered" && (
                <div className="space-y-3">
                  {deliveredOrders.length > 0 ? (
                    deliveredOrders.map(order => renderOrderCard(order, true))
                  ) : (
                    <EmptyStateCard
                      icon={Package}
                      title="No delivered orders yet"
                      description="Your completed orders will appear here for download."
                    />
                  )}
                </div>
              )}

              {activeTab === "favorites" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {favorites.length > 0 ? (
                    favorites.map(creator => renderCreatorCard(creator, false))
                  ) : (
                    <div className="col-span-2">
                      <EmptyStateCard
                        icon={Heart}
                        title="No favorites yet"
                        description="Favorite creators to see their latest updates and easily order again!"
                        actionLabel="Browse Creators"
                        onAction={() => window.location.href = "/marketplace"}
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === "suggested" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {suggested.map(creator => renderCreatorCard(creator, true))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Favorites Preview */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg">Your Favorites</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setActiveTab("favorites")}
                  className="text-[#9E0B61] hover:text-[#74094A]"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {favorites.slice(0, 3).map(creator => renderCreatorCard(creator, false))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#9E0B61]" />
                <h3 className="text-lg">Suggested For You</h3>
              </div>
              <p className="text-sm text-[#DADBE1] mb-4">
                Based on your order history and favorites
              </p>
              <div className="space-y-3">
                {suggested.map(creator => renderCreatorCard(creator, true))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
