import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Clock,
  X
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";

interface BasketItem {
  id: string;
  listingId: string;
  creatorId: string;
  creatorName: string;
  creatorImage: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  isInstantBuy: boolean;
  tierId?: string;
  tierName?: string;
  deliveryTime?: string;
  upsells?: Array<{
    id: string;
    title: string;
    price: number;
    thumbnail: string;
  }>;
}

export function BasketPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load basket from localStorage
    loadBasket();
  }, []);

  const loadBasket = () => {
    try {
      const savedBasket = localStorage.getItem('whispr_basket');
      if (savedBasket) {
        setBasketItems(JSON.parse(savedBasket));
      }
    } catch (error) {
      console.error('Error loading basket:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBasket = (items: BasketItem[]) => {
    localStorage.setItem('whispr_basket', JSON.stringify(items));
    setBasketItems(items);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = basketItems.filter(item => item.id !== itemId);
    saveBasket(updatedItems);
  };

  const updateQuantity = (itemId: string, change: number) => {
    const updatedItems = basketItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    saveBasket(updatedItems);
  };

  const subtotal = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const platformFee = subtotal * 0.10; // 10% platform fee
  const total = subtotal + platformFee;

  const handleCheckout = () => {
    if (!user) {
      navigate('/signin?redirect=/checkout');
      return;
    }
    // Save basket to pass to checkout
    navigate('/checkout', { state: { basketItems } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-white/60">Loading basket...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-48 bg-gradient-to-r from-[#9E0B61] via-[#8A0A56] to-[#74094A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8 text-white" />
            <h1 className="text-white text-3xl md:text-4xl">Your Basket</h1>
          </div>
          <p className="text-white/80">
            {basketItems.length} {basketItems.length === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {basketItems.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 backdrop-blur-2xl text-center">
            <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl mb-2">Your basket is empty</h2>
            <p className="text-white/60 mb-6">
              Discover amazing content from talented creators
            </p>
            <Button 
              variant="gradient" 
              onClick={() => navigate('/marketplace')}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Browse Marketplace
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Basket Items */}
            <div className="lg:col-span-2 space-y-4">
              {basketItems.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl p-4 sm:p-6 backdrop-blur-2xl">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.isInstantBuy && (
                        <Badge className="absolute top-2 right-2 bg-[#19E28C] text-black border-0 text-xs">
                          Instant
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg mb-1 line-clamp-1">{item.title}</h3>
                          <p className="text-sm text-white/60 mb-2">by {item.creatorName}</p>
                          {item.tierName && (
                            <Badge className="bg-[#9E0B61]/20 text-[#E879F9] border border-[#9E0B61]/40 text-xs">
                              {item.tierName}
                            </Badge>
                          )}
                          {item.deliveryTime && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-white/60">
                              <Clock className="w-3 h-3" />
                              <span>Delivery: {item.deliveryTime}</span>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-white/60 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white/5 border-white/10"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white/5 border-white/10"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-xl text-[#19E28C]">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Show upsells if this is a custom order */}
                  {!item.isInstantBuy && item.upsells && item.upsells.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-white/60 mb-3">
                        <Sparkles className="w-4 h-4 inline mr-1" />
                        Whilst you wait for your custom order
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {item.upsells.slice(0, 3).map((upsell) => (
                          <div
                            key={upsell.id}
                            className="group cursor-pointer rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-[#9E0B61]/50 transition-all"
                          >
                            <div className="aspect-video relative overflow-hidden">
                              <ImageWithFallback
                                src={upsell.thumbnail}
                                alt={upsell.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <div className="p-2">
                              <p className="text-xs line-clamp-1 mb-1">{upsell.title}</p>
                              <p className="text-xs text-[#19E28C]">£{upsell.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl sticky top-24">
                <h2 className="text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-lg">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Platform Fee (10%)</span>
                    <span className="text-lg">£{platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">Total</span>
                      <span className="text-2xl text-[#19E28C]">£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  fullWidth 
                  size="lg" 
                  variant="gradient"
                  onClick={handleCheckout}
                  className="gap-2 mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#19E28C] mt-0.5 shrink-0" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#19E28C] mt-0.5 shrink-0" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#19E28C] mt-0.5 shrink-0" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/marketplace')}
                className="gap-2 bg-white/5 border-white/10 hover:bg-white/10"
              >
                <Sparkles className="w-4 h-4" />
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

