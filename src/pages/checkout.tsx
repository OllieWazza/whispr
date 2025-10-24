import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { ShoppingCart, CreditCard, Lock, Check, FileText, Sparkles } from "lucide-react";

export function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const orderSummary = {
    creator: {
      name: "Scarlett Vixen",
      image: "https://images.unsplash.com/photo-1693333412376-7e9ab19f38de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5zdWFsJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    tier: "Premium Experience",
    deliveryTime: "48 hours",
    price: 50,
    platformFee: 5,
    total: 55,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-48 bg-gradient-to-r from-[#9E0B61] via-[#8A0A56] to-[#74094A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-white mb-2">Secure Checkout</h1>
          <p className="text-white/80">Complete your order and get your custom audio</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details */}
            <Card className="bg-white border-[4px] border-black">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#9E0B61]" />
                  Order Details
                </CardTitle>
                <CardDescription className="text-black/60">
                  Provide specific instructions for your custom audio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-black">
                    Custom Instructions *
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Describe what you'd like in your custom audio. Be as detailed as possible..."
                    rows={6}
                    className="border-black/20 text-black resize-none"
                  />
                  <p className="text-xs text-black/60">
                    Include tone, style, specific phrases, or any other requirements
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-black">
                    Reference Links (Optional)
                  </Label>
                  <Input
                    id="reference"
                    placeholder="https://..."
                    className="border-black/20 text-black"
                  />
                  <p className="text-xs text-black/60">
                    Share any reference materials or examples
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black">
                    Your Name (for personalization)
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter name if you want it personalized"
                    className="border-black/20 text-black"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white border-[4px] border-black">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#9E0B61]" />
                  Payment Method
                </CardTitle>
                <CardDescription className="text-black/60">
                  Choose how you'd like to pay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border-2 border-black/10 rounded-xl hover:border-[#9E0B61] transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer text-black">
                      Credit / Debit Card
                    </Label>
                    <div className="flex gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 border-black/10 rounded-xl hover:border-[#9E0B61] transition-colors cursor-pointer">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer text-black">
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 border-black/10 rounded-xl hover:border-[#9E0B61] transition-colors cursor-pointer">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto" className="flex-1 cursor-pointer text-black">
                      Cryptocurrency
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-black">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="border-black/20 text-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry" className="text-black">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="border-black/20 text-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc" className="text-black">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="border-black/20 text-black"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="bg-white border-[4px] border-black sticky top-24">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#9E0B61]" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Creator Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-black">
                    <AvatarImage src={orderSummary.creator.image} />
                    <AvatarFallback className="bg-[#9E0B61] text-white">
                      SV
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-black">{orderSummary.creator.name}</p>
                    <p className="text-sm text-black/60">{orderSummary.tier}</p>
                  </div>
                </div>

                <Separator className="bg-black/10" />

                {/* Package Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/60">Package</span>
                    <span className="text-black">{orderSummary.tier}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/60">Delivery Time</span>
                    <Badge variant="secondary" className="bg-[#9E0B61]/10 text-[#9E0B61]">
                      {orderSummary.deliveryTime}
                    </Badge>
                  </div>
                </div>

                <Separator className="bg-black/10" />

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-black/60">Subtotal</span>
                    <span className="text-black">£{orderSummary.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/60">Platform Fee</span>
                    <span className="text-black">£{orderSummary.platformFee}</span>
                  </div>
                  <Separator className="bg-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-black">Total</span>
                    <span className="text-2xl text-black">£{orderSummary.total}</span>
                  </div>
                </div>

                <Button fullWidth size="lg" variant="gradient">
                  <Lock className="w-4 h-4" />
                  Complete Secure Payment
                </Button>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-black/60">
                    <Check className="w-4 h-4 text-[#19E28C]" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-black/60">
                    <Check className="w-4 h-4 text-[#19E28C]" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-black/60">
                    <Check className="w-4 h-4 text-[#19E28C]" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
