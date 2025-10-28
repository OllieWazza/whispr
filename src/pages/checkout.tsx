import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { 
  ShoppingCart, 
  CreditCard, 
  Lock, 
  Check, 
  FileText, 
  Sparkles,
  Clock,
  Loader2,
  AlertCircle,
  Apple,
  Smartphone
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

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
}

interface UpsellItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  creatorName: string;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [upsellItems, setUpsellItems] = useState<UpsellItem[]>([]);
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(new Set());
  const [instructions, setInstructions] = useState("");
  const [referenceLink, setReferenceLink] = useState("");
  const [personalizationName, setPersonalizationName] = useState("");
  
  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    // Load basket from location state or localStorage
    const stateBasket = location.state?.basketItems;
    if (stateBasket) {
      setBasketItems(stateBasket);
    } else {
      const savedBasket = localStorage.getItem('whispr_basket');
      if (savedBasket) {
        setBasketItems(JSON.parse(savedBasket));
      }
    }
    
    // Fetch upsells for custom orders
    fetchUpsells();
  }, [location.state]);

  const fetchUpsells = async () => {
    // Get creator IDs from custom orders
    const customOrders = basketItems.filter(item => !item.isInstantBuy);
    if (customOrders.length === 0) return;

    const creatorIds = [...new Set(customOrders.map(item => item.creatorId))];
    
    try {
      // Fetch instant buy items from the same creators
      const { data: listings } = await supabase
        .from('listings')
        .select(`
          id,
          title,
          starting_price,
          thumbnail_url,
          creator_id,
          creators:creator_id (display_name)
        `)
        .in('creator_id', creatorIds)
        .eq('is_instant_buy', true)
        .limit(6);

      if (listings) {
        const upsells = listings.map((listing: any) => ({
          id: listing.id,
          title: listing.title,
          price: listing.starting_price,
          thumbnail: listing.thumbnail_url || 'https://via.placeholder.com/300',
          creatorName: listing.creators?.display_name || 'Unknown Creator',
        }));
        setUpsellItems(upsells);
      }
    } catch (error) {
      console.error('Error fetching upsells:', error);
    }
  };

  const toggleUpsell = (upsellId: string) => {
    const newSelected = new Set(selectedUpsells);
    if (newSelected.has(upsellId)) {
      newSelected.delete(upsellId);
    } else {
      newSelected.add(upsellId);
    }
    setSelectedUpsells(newSelected);
  };

  const hasCustomOrders = basketItems.some(item => !item.isInstantBuy);

  const subtotal = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const upsellTotal = upsellItems
    .filter(item => selectedUpsells.has(item.id))
    .reduce((sum, item) => sum + item.price, 0);
  const platformFee = (subtotal + upsellTotal) * 0.10;
  const total = subtotal + upsellTotal + platformFee;

  const handlePayment = async () => {
    if (!user) {
      navigate('/signin?redirect=/checkout');
      return;
    }

    // Validate card details for card payment
    if (paymentMethod === "card") {
      if (!cardNumber || !expiry || !cvc || !cardName) {
        alert('Please fill in all card details');
        return;
      }
    }

    // Validate instructions for custom orders
    if (hasCustomOrders && !instructions.trim()) {
      alert('Please provide instructions for your custom order');
      return;
    }

    setProcessing(true);

    try {
      // In a real implementation, this would:
      // 1. Create Stripe Payment Intent
      // 2. Process payment with selected method (Apple Pay, Google Pay, or Card)
      // 3. Create orders in database
      // 4. Clear basket
      // 5. Redirect to thank you page

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create orders in database
      for (const item of basketItems) {
        const orderData = {
          buyer_id: user.id,
          seller_id: item.creatorId,
          listing_id: item.listingId,
          tier_id: item.tierId || null,
          instant_buy_id: item.isInstantBuy ? item.listingId : null,
          order_type: item.isInstantBuy ? 'instant_buy' : 'custom',
          status: 'pending',
          amount: item.price * item.quantity,
          platform_fee: (item.price * item.quantity) * 0.10,
          creator_earnings: (item.price * item.quantity) * 0.90,
          instructions: instructions || null,
        };

        await supabase.from('orders').insert(orderData);
      }

      // Clear basket
      localStorage.removeItem('whispr_basket');

      // Redirect to thank you page
      navigate('/thank-you', { 
        state: { 
          orderId: 'ORD-' + Date.now(),
          creatorId: basketItems[0]?.creatorId,
          total: total
        } 
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (basketItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl mb-2">Your basket is empty</h2>
          <p className="text-white/60 mb-6">Add items to your basket to checkout</p>
          <Button variant="gradient" onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </Button>
        </div>
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
          <h1 className="text-white text-3xl md:text-4xl mb-2">Secure Checkout</h1>
          <p className="text-white/80">Complete your order in seconds</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details for Custom Orders */}
            {hasCustomOrders && (
              <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#9E0B61]" />
                  <h2 className="text-xl">Order Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="instructions" className="text-white mb-2 block">
                    Custom Instructions *
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Describe what you'd like in your custom audio. Be as detailed as possible..."
                    rows={6}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="bg-white/10 border-white/20 text-white resize-none"
                  />
                    <p className="text-xs text-white/60 mt-1">
                    Include tone, style, specific phrases, or any other requirements
                  </p>
                </div>

                  <div>
                    <Label htmlFor="reference" className="text-white mb-2 block">
                    Reference Links (Optional)
                  </Label>
                  <Input
                    id="reference"
                    placeholder="https://..."
                      value={referenceLink}
                      onChange={(e) => setReferenceLink(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                  />
                    <p className="text-xs text-white/60 mt-1">
                    Share any reference materials or examples
                  </p>
                </div>

                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                    Your Name (for personalization)
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter name if you want it personalized"
                      value={personalizationName}
                      onChange={(e) => setPersonalizationName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Upsells Section - Only for Custom Orders */}
            {hasCustomOrders && upsellItems.length > 0 && (
              <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#19E28C]" />
                  <h2 className="text-xl">Whilst you wait for your custom order</h2>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  Get instant access to these exclusive items from the same creator
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {upsellItems.map((upsell) => (
                    <div
                      key={upsell.id}
                      onClick={() => toggleUpsell(upsell.id)}
                      className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                        selectedUpsells.has(upsell.id)
                          ? 'border-[#19E28C] ring-2 ring-[#19E28C]/50'
                          : 'border-white/10 hover:border-[#9E0B61]/50'
                      }`}
                    >
                      <div className="aspect-video relative overflow-hidden bg-white/5">
                        <ImageWithFallback
                          src={upsell.thumbnail}
                          alt={upsell.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        {selectedUpsells.has(upsell.id) && (
                          <div className="absolute inset-0 bg-[#19E28C]/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#19E28C] flex items-center justify-center">
                              <Check className="w-5 h-5 text-black" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white/5">
                        <h4 className="text-sm line-clamp-1 mb-1">{upsell.title}</h4>
                        <p className="text-xs text-white/60 mb-2">{upsell.creatorName}</p>
                        <p className="text-sm text-[#19E28C] font-medium">£{upsell.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-[#9E0B61]" />
                <h2 className="text-xl">Payment Method</h2>
              </div>
              
              <div className="space-y-3 mb-6">
                {/* Apple Pay */}
                <button
                  onClick={() => setPaymentMethod("apple_pay")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "apple_pay"
                      ? 'border-[#9E0B61] bg-[#9E0B61]/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "apple_pay" ? 'border-[#9E0B61]' : 'border-white/40'
                  }`}>
                    {paymentMethod === "apple_pay" && (
                      <div className="w-3 h-3 rounded-full bg-[#9E0B61]" />
                    )}
                    </div>
                  <Apple className="w-5 h-5" />
                  <span className="flex-1 text-left">Apple Pay</span>
                </button>

                {/* Google Pay */}
                <button
                  onClick={() => setPaymentMethod("google_pay")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "google_pay"
                      ? 'border-[#9E0B61] bg-[#9E0B61]/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "google_pay" ? 'border-[#9E0B61]' : 'border-white/40'
                  }`}>
                    {paymentMethod === "google_pay" && (
                      <div className="w-3 h-3 rounded-full bg-[#9E0B61]" />
                    )}
                  </div>
                  <Smartphone className="w-5 h-5" />
                  <span className="flex-1 text-left">Google Pay</span>
                </button>

                {/* Card */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "card"
                      ? 'border-[#9E0B61] bg-[#9E0B61]/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "card" ? 'border-[#9E0B61]' : 'border-white/40'
                  }`}>
                    {paymentMethod === "card" && (
                      <div className="w-3 h-3 rounded-full bg-[#9E0B61]" />
                    )}
                  </div>
                  <CreditCard className="w-5 h-5" />
                  <span className="flex-1 text-left">Credit / Debit Card</span>
                  <div className="flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                  </div>
                </button>
              </div>

              {/* Card Details Form */}
                {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <Label htmlFor="cardName" className="text-white mb-2 block">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-white mb-2 block">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-white mb-2 block">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    <div>
                      <Label htmlFor="cvc" className="text-white mb-2 block">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        />
                    </div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl sticky top-24">
              <h2 className="text-xl mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#9E0B61]" />
                  Order Summary
              </h2>

              {/* Basket Items */}
              <div className="space-y-3 mb-4">
                {basketItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-white/10">
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm line-clamp-1 mb-1">{item.title}</h4>
                      <p className="text-xs text-white/60 mb-1">by {item.creatorName}</p>
                      {item.tierName && (
                        <Badge className="bg-[#9E0B61]/20 text-[#E879F9] border-0 text-xs">
                          {item.tierName}
                        </Badge>
                      )}
                      {item.deliveryTime && (
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-white/40" />
                          <span className="text-xs text-white/60">{item.deliveryTime}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-[#19E28C]">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Selected Upsells */}
              {selectedUpsells.size > 0 && (
                <div className="space-y-3 mb-4 pb-4 border-b border-white/10">
                  <p className="text-sm text-white/60 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Added items
                  </p>
                  {upsellItems
                    .filter(item => selectedUpsells.has(item.id))
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <span className="text-sm line-clamp-1">{item.title}</span>
                        <span className="text-sm text-[#19E28C]">£{item.price}</span>
                      </div>
                    ))}
                </div>
              )}

              <Separator className="my-4" />

              {/* Pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                  </div>
                {upsellTotal > 0 && (
                  <div className="flex items-center justify-between text-white/60">
                    <span>Upsells</span>
                    <span>£{upsellTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-white/60">
                  <span>Platform Fee (10%)</span>
                  <span>£{platformFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xl">
                  <span>Total</span>
                  <span className="text-[#19E28C]">£{total.toFixed(2)}</span>
                </div>
                </div>

              <Button 
                fullWidth 
                size="lg" 
                variant="gradient"
                onClick={handlePayment}
                disabled={processing}
                className="gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                  <Lock className="w-4 h-4" />
                  Complete Secure Payment
                  </>
                )}
                </Button>

                {/* Trust Badges */}
              <div className="space-y-2 pt-4 mt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-[#19E28C]" />
                    <span>Secure payment processing</span>
                  </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-[#19E28C]" />
                    <span>Money-back guarantee</span>
                  </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-[#19E28C]" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
