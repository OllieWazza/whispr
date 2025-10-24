import { DollarSign, ShoppingBag, Star, TrendingUp, Clock, CheckCircle, AlertCircle, Eye, MessageSquare, Calendar, Users, Flame, Sparkles, Target, BarChart3, ThumbsUp, Reply, Send, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useState } from "react";

// Mock data for charts and insights
const earningsData = [
  { date: "Mon", earnings: 145 },
  { date: "Tue", earnings: 230 },
  { date: "Wed", earnings: 180 },
  { date: "Thu", earnings: 290 },
  { date: "Fri", earnings: 350 },
  { date: "Sat", earnings: 420 },
  { date: "Sun", earnings: 380 },
];

const monthlyEarnings = [
  { month: "Jul", amount: 2100 },
  { month: "Aug", amount: 2450 },
  { month: "Sep", amount: 2800 },
  { month: "Oct", amount: 3240 },
];

const trendingContent = [
  { type: "Sultry Whispers", demand: 95, avgPrice: 65, growth: "+28%" },
  { type: "Personalized Fantasy", demand: 88, avgPrice: 85, growth: "+22%" },
  { type: "Girlfriend Experience", demand: 82, avgPrice: 75, growth: "+18%" },
  { type: "Flirty Voice Notes", demand: 76, avgPrice: 45, growth: "+15%" },
  { type: "Bedtime Stories", demand: 71, avgPrice: 55, growth: "+12%" },
];

const customerActivity = [
  { time: "12 AM", orders: 12 },
  { time: "3 AM", orders: 5 },
  { time: "6 AM", orders: 8 },
  { time: "9 AM", orders: 15 },
  { time: "12 PM", orders: 25 },
  { time: "3 PM", orders: 22 },
  { time: "6 PM", orders: 35 },
  { time: "9 PM", orders: 45 },
];

const weeklyActivity = [
  { day: "Mon", views: 320, orders: 8 },
  { day: "Tue", views: 380, orders: 12 },
  { day: "Wed", views: 290, orders: 7 },
  { day: "Thu", views: 420, orders: 15 },
  { day: "Fri", views: 510, orders: 18 },
  { day: "Sat", views: 680, orders: 22 },
  { day: "Sun", views: 590, orders: 20 },
];

const orders = [
  {
    id: "ORD-5678",
    buyer: "Marcus D.",
    type: "Sultry Voice Message",
    status: "pending",
    date: "2 hours ago",
    price: 65,
    deadline: "24 hours",
  },
  {
    id: "ORD-5679",
    buyer: "Alex T.",
    type: "Girlfriend Experience Call",
    status: "accepted",
    date: "1 day ago",
    price: 85,
    deadline: "18 hours",
  },
  {
    id: "ORD-5680",
    buyer: "Jordan R.",
    type: "Flirty Voice Note",
    status: "delivered",
    date: "2 days ago",
    price: 45,
    deadline: "Completed",
  },
  {
    id: "ORD-5681",
    buyer: "Casey M.",
    type: "Personalized Fantasy",
    status: "delivered",
    date: "3 days ago",
    price: 75,
    deadline: "Completed",
  },
  {
    id: "ORD-5682",
    buyer: "Sam L.",
    type: "Bedtime Story",
    status: "delivered",
    date: "4 days ago",
    price: 55,
    deadline: "Completed",
  },
];

const reviews = [
  {
    id: 1,
    buyer: "Marcus D.",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely amazing! Her voice is pure magic. Worth every penny and more. Can't wait to order again! 🔥",
    replied: false,
  },
  {
    id: 2,
    buyer: "Alex T.",
    rating: 5,
    date: "5 days ago",
    comment: "Incredible experience! She really knows how to make you feel special. 10/10 would definitely recommend!",
    replied: true,
    reply: "Thank you so much! It was my pleasure 💋",
  },
  {
    id: 3,
    buyer: "Jordan R.",
    rating: 4,
    date: "1 week ago",
    comment: "Great content, delivered fast. Would have loved a bit more personalization but overall very satisfied!",
    replied: false,
  },
  {
    id: 4,
    buyer: "Casey M.",
    rating: 5,
    date: "1 week ago",
    comment: "She exceeded all my expectations! The perfect voice and exactly what I was looking for. Simply perfect! ❤️",
    replied: true,
    reply: "You're too sweet! Thank you darling 😘",
  },
];

const visitorStats = [
  { date: "Oct 15", views: 145, clicks: 28 },
  { date: "Oct 16", views: 198, clicks: 35 },
  { date: "Oct 17", views: 167, clicks: 31 },
  { date: "Oct 18", views: 223, clicks: 42 },
  { date: "Oct 19", views: 289, clicks: 58 },
  { date: "Oct 20", views: 312, clicks: 67 },
  { date: "Oct 21", views: 278, clicks: 54 },
];

type TabType = "earnings" | "orders" | "ratings" | "views";

export function DashboardCreator() {
  const [activeTab, setActiveTab] = useState<TabType>("earnings");
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl" style={{ fontWeight: 700 }}>
            Creator Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Track your performance and maximize your earnings
          </p>
        </div>

        {/* Stats Cards - Now Clickable */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab("earnings")}
            className={`text-left rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              activeTab === "earnings" 
                ? "bg-[#9E0B61] text-white border-[#9E0B61] ring-2 sm:ring-4 ring-[#9E0B61]/50 scale-105" 
                : "bg-card border-border hover:scale-102 hover:border-[#9E0B61]/30"
            }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <DollarSign className={`w-6 h-6 sm:w-8 sm:h-8 ${activeTab === "earnings" ? "text-white" : "text-[#9E0B61]"}`} />
              {activeTab === "earnings" && <div className="text-xs bg-white/20 px-2 py-1 rounded-full hidden sm:block">This month</div>}
            </div>
            <div className="text-2xl sm:text-3xl mb-1" style={{ fontWeight: 700 }}>£3,240</div>
            <div className={`text-xs sm:text-sm ${activeTab === "earnings" ? "text-white/80" : "text-muted-foreground"}`}>Total Earnings</div>
            <div className="mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#19E28C]" />
              <span className="text-[#19E28C] hidden sm:inline">+12% from last month</span>
              <span className="text-[#19E28C] sm:hidden">+12%</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`text-left rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              activeTab === "orders" 
                ? "bg-[#9E0B61] text-white border-[#9E0B61] ring-2 sm:ring-4 ring-[#9E0B61]/50 scale-105" 
                : "bg-card border-border hover:scale-102 hover:border-[#9E0B61]/30"
            }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <ShoppingBag className={`w-6 h-6 sm:w-8 sm:h-8 ${activeTab === "orders" ? "text-white" : "text-[#9E0B61]"}`} />
              {activeTab === "orders" && <div className="text-xs bg-white/20 px-2 py-1 rounded-full hidden sm:block">This month</div>}
            </div>
            <div className="text-2xl sm:text-3xl mb-1" style={{ fontWeight: 700 }}>47</div>
            <div className={`text-xs sm:text-sm ${activeTab === "orders" ? "text-white/80" : "text-muted-foreground"}`}>Total Orders</div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#19E28C]">
              <span className="hidden sm:inline">2 pending • 1 in progress</span>
              <span className="sm:hidden">3 active</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("ratings")}
            className={`text-left rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              activeTab === "ratings" 
                ? "bg-[#9E0B61] text-white border-[#9E0B61] ring-2 sm:ring-4 ring-[#9E0B61]/50 scale-105" 
                : "bg-card border-border hover:scale-102 hover:border-[#9E0B61]/30"
            }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Star className={`w-6 h-6 sm:w-8 sm:h-8 ${activeTab === "ratings" ? "text-white" : "text-[#FFC34D]"}`} />
              {activeTab === "ratings" && <div className="text-xs bg-white/20 px-2 py-1 rounded-full hidden sm:block">This month</div>}
            </div>
            <div className="text-2xl sm:text-3xl mb-1" style={{ fontWeight: 700 }}>4.9</div>
            <div className={`text-xs sm:text-sm ${activeTab === "ratings" ? "text-white/80" : "text-muted-foreground"}`}>Average Rating</div>
            <div className={`mt-2 sm:mt-3 text-xs sm:text-sm ${activeTab === "ratings" ? "text-white/80" : "text-muted-foreground"}`}>
              <span className="hidden sm:inline">298 reviews • 2 unread</span>
              <span className="sm:hidden">298 reviews</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("views")}
            className={`text-left rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all ${
              activeTab === "views" 
                ? "bg-[#9E0B61] text-white border-[#9E0B61] ring-2 sm:ring-4 ring-[#9E0B61]/50 scale-105" 
                : "bg-card border-border hover:scale-102 hover:border-[#9E0B61]/30"
            }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <TrendingUp className={`w-6 h-6 sm:w-8 sm:h-8 ${activeTab === "views" ? "text-white" : "text-[#19E28C]"}`} />
              {activeTab === "views" && <div className="text-xs bg-white/20 px-2 py-1 rounded-full hidden sm:block">This month</div>}
            </div>
            <div className="text-2xl sm:text-3xl mb-1" style={{ fontWeight: 700 }}>2.4k</div>
            <div className={`text-xs sm:text-sm ${activeTab === "views" ? "text-white/80" : "text-muted-foreground"}`}>Profile Views</div>
            <div className={`mt-2 sm:mt-3 text-xs sm:text-sm ${activeTab === "views" ? "text-white/80" : "text-muted-foreground"}`}>
              <span className="hidden sm:inline">Last 30 days • +18%</span>
              <span className="sm:hidden">+18%</span>
            </div>
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="space-y-4 sm:space-y-6">
          {/* EARNINGS TAB */}
          {activeTab === "earnings" && (
            <>
              {/* Revenue Trends */}
              <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border">
                <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl" style={{ fontWeight: 600 }}>
                  Revenue Trends
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* This Week */}
                  <div>
                    <h3 className="mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground">This Week</h3>
                    <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
                      <AreaChart data={earningsData}>
                        <defs>
                          <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9E0B61" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#9E0B61" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3A3C43" />
                        <XAxis dataKey="date" stroke="#DADBE1" />
                        <YAxis stroke="#DADBE1" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0e0e0e', border: '1px solid #3A3C43', borderRadius: '8px' }}
                          labelStyle={{ color: '#DADBE1' }}
                        />
                        <Area type="monotone" dataKey="earnings" stroke="#9E0B61" fillOpacity={1} fill="url(#earningsGradient)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Last 4 Months */}
                  <div>
                    <h3 className="mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground">Monthly Growth</h3>
                    <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
                      <BarChart data={monthlyEarnings}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3A3C43" />
                        <XAxis dataKey="month" stroke="#DADBE1" />
                        <YAxis stroke="#DADBE1" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0e0e0e', border: '1px solid #3A3C43', borderRadius: '8px' }}
                          labelStyle={{ color: '#DADBE1' }}
                        />
                        <Bar dataKey="amount" fill="#9E0B61" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Trending Content - What to Create */}
              <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D6D]" />
                  <h2 className="text-lg sm:text-xl md:text-2xl" style={{ fontWeight: 600 }}>
                    What's Trending - Create This to Earn More
                  </h2>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {trendingContent.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#0e0e0e] border border-border hover:border-[#9E0B61]/30 transition-colors">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#9E0B61] text-white shrink-0" style={{ fontWeight: 700 }}>
                        <span className="text-sm sm:text-base">#{index + 1}</span>
                      </div>
                      
                      <div className="flex-1 w-full sm:w-auto">
                        <div className="mb-1 text-sm sm:text-base" style={{ fontWeight: 600 }}>{item.type}</div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                            {item.demand}%
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                            £{item.avgPrice}
                          </span>
                          <span className="flex items-center gap-1 text-[#19E28C]">
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                            {item.growth}
                          </span>
                        </div>
                      </div>

                      <Button size="sm" className="bg-[#9E0B61] hover:bg-[#9E0B61]/90 rounded-full w-full sm:w-auto text-xs sm:text-sm">
                        Create
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Tips */}
              <div className="bg-[#9E0B61]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#9E0B61]/20">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC34D]" />
                  <h2 className="text-lg sm:text-xl md:text-2xl" style={{ fontWeight: 600 }}>
                    Tips to Maximize Your Earnings
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-[#0e0e0e]/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#9E0B61]/20">
                    <div className="text-[#19E28C] mb-2 text-sm sm:text-base" style={{ fontWeight: 600 }}>Post During Peak Hours</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Your buyers are most active 6PM-10PM. Schedule content then for 40% more visibility.</p>
                  </div>
                  
                  <div className="bg-[#0e0e0e]/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#9E0B61]/20">
                    <div className="text-[#19E28C] mb-2 text-sm sm:text-base" style={{ fontWeight: 600 }}>Respond Within 2 Hours</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Quick responses increase conversion by 65%. You're currently averaging 3.5 hours.</p>
                  </div>
                  
                  <div className="bg-[#0e0e0e]/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#9E0B61]/20">
                    <div className="text-[#19E28C] mb-2 text-sm sm:text-base" style={{ fontWeight: 600 }}>Offer Premium Tiers</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Creators with 3+ pricing tiers earn 2.3x more. Add exclusive options for high spenders.</p>
                  </div>
                  
                  <div className="bg-[#0e0e0e]/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#9E0B61]/20">
                    <div className="text-[#19E28C] mb-2 text-sm sm:text-base" style={{ fontWeight: 600 }}>Weekend Bonus Potential</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Orders increase 55% on weekends. Be available Fri-Sun to capture premium demand.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <>
              {/* Customer Activity Times */}
              <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border">
                <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl" style={{ fontWeight: 600 }}>
                  When Your Customers Are Most Active
                </h2>
                
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <BarChart data={customerActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3A3C43" />
                    <XAxis dataKey="time" stroke="#DADBE1" />
                    <YAxis stroke="#DADBE1" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0e0e0e', border: '1px solid #3A3C43', borderRadius: '8px' }}
                      labelStyle={{ color: '#DADBE1' }}
                    />
                    <Bar dataKey="orders" fill="#9E0B61" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-6 p-4 bg-[#9E0B61]/10 rounded-xl border border-[#9E0B61]/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#FFC34D]" />
                    <span><span style={{ fontWeight: 600 }}>Peak Time:</span> 9PM is your golden hour with 45 average orders</span>
                  </div>
                </div>
              </div>

              {/* Weekly Performance */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="mb-6" style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                  Weekly Performance Overview
                </h2>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3A3C43" />
                    <XAxis dataKey="day" stroke="#DADBE1" />
                    <YAxis stroke="#DADBE1" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0e0e0e', border: '1px solid #3A3C43', borderRadius: '8px' }}
                      labelStyle={{ color: '#DADBE1' }}
                    />
                    <Line type="monotone" dataKey="views" stroke="#19E28C" strokeWidth={2} name="Profile Views" />
                    <Line type="monotone" dataKey="orders" stroke="#9E0B61" strokeWidth={2} name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Orders Queue */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                    Orders Queue
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#FFC34D]/20 text-[#FFC34D]">2 Pending</Badge>
                    <Badge className="bg-[#19E28C]/20 text-[#19E28C]">1 Active</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="bg-[#0e0e0e] rounded-xl p-6 border border-border hover:border-[#9E0B61]/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#9E0B61] rounded-full flex items-center justify-center">
                              <span className="text-white" style={{ fontWeight: 600 }}>
                                {order.buyer.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="mb-0.5" style={{ fontWeight: 600 }}>{order.buyer}</div>
                              <div className="text-sm text-muted-foreground">{order.type}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Order {order.id} • {order.date}
                          </div>
                        </div>

                        {/* Deadline */}
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{order.deadline}</span>
                        </div>

                        {/* Status */}
                        <div>
                          {order.status === "pending" && (
                            <Badge className="bg-[#FFC34D]/20 text-[#FFC34D]">
                              <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                              Pending
                            </Badge>
                          )}
                          {order.status === "accepted" && (
                            <Badge className="bg-[#19E28C]/20 text-[#19E28C]">
                              <Clock className="w-3.5 h-3.5 mr-1.5" />
                              In Progress
                            </Badge>
                          )}
                          {order.status === "delivered" && (
                            <Badge className="bg-[#19E28C]/20 text-[#19E28C]">
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                              Delivered
                            </Badge>
                          )}
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div style={{ fontWeight: 600 }}>£{order.price}</div>
                          </div>
                          {order.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-[#9E0B61] hover:bg-[#9E0B61]/90 rounded-full">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-full">
                                Decline
                              </Button>
                            </div>
                          )}
                          {order.status === "accepted" && (
                            <Button size="sm" className="bg-[#9E0B61] hover:bg-[#9E0B61]/90 rounded-full">
                              Upload
                            </Button>
                          )}
                          {order.status === "delivered" && (
                            <Button size="sm" variant="outline" className="rounded-full">
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Insights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#19E28C]/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#19E28C]" />
                    </div>
                    <div>
                      <div className="text-2xl" style={{ fontWeight: 700 }}>97%</div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">You complete orders faster than 85% of creators</p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9E0B61]/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#9E0B61]" />
                    </div>
                    <div>
                      <div className="text-2xl" style={{ fontWeight: 700 }}>18h</div>
                      <div className="text-sm text-muted-foreground">Avg. Delivery</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">35% faster than platform average</p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#FFC34D]/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#FFC34D]" />
                    </div>
                    <div>
                      <div className="text-2xl" style={{ fontWeight: 700 }}>£68</div>
                      <div className="text-sm text-muted-foreground">Avg. Order Value</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">+22% vs last month</p>
                </div>
              </div>
            </>
          )}

          {/* RATINGS TAB */}
          {activeTab === "ratings" && (
            <>
              {/* Rating Overview */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="mb-6" style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                  Your Rating Breakdown
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                  {[
                    { stars: 5, count: 276, percent: 93 },
                    { stars: 4, count: 18, percent: 6 },
                    { stars: 3, count: 3, percent: 1 },
                    { stars: 2, count: 1, percent: 0 },
                    { stars: 1, count: 0, percent: 0 },
                  ].map((rating) => (
                    <div key={rating.stars} className="bg-[#0e0e0e] rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-[#FFC34D] fill-[#FFC34D]" />
                        <span style={{ fontWeight: 600 }}>{rating.stars}</span>
                      </div>
                      <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>{rating.count}</div>
                      <div className="text-xs text-muted-foreground">{rating.percent}%</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-[#19E28C]/10 to-[#19E28C]/5 rounded-xl p-6 border border-[#19E28C]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-5 h-5 text-[#19E28C]" />
                    <span style={{ fontWeight: 600 }}>Excellent Performance!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">You're in the top 5% of creators. Keep up the amazing work to climb the leaderboards!</p>
                </div>
              </div>

              {/* Reviews Management */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                    Recent Reviews
                  </h2>
                  <Badge className="bg-[#9E0B61]/20 text-[#9E0B61]">2 Need Reply</Badge>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-[#0e0e0e] rounded-xl p-6 border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#9E0B61] to-[#74094A] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm" style={{ fontWeight: 600 }}>
                              {review.buyer.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="mb-1" style={{ fontWeight: 600 }}>{review.buyer}</div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-[#FFC34D] fill-[#FFC34D]' : 'text-border'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="mb-4">{review.comment}</p>

                      {review.replied ? (
                        <div className="bg-[#9E0B61]/10 rounded-lg p-4 border border-[#9E0B61]/20">
                          <div className="flex items-center gap-2 mb-2 text-sm text-[#9E0B61]">
                            <Reply className="w-4 h-4" />
                            <span style={{ fontWeight: 600 }}>Your Reply</span>
                          </div>
                          <p className="text-sm">{review.reply}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Write a thoughtful reply to build customer loyalty..."
                            className="min-h-[80px] bg-input resize-none"
                            value={replyText[review.id] || ""}
                            onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                          />
                          <Button size="sm" className="bg-[#9E0B61] hover:bg-[#9E0B61]/90 rounded-full">
                            <Send className="w-4 h-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Improvement Tips */}
              <div className="bg-gradient-to-br from-[#FFC34D]/10 to-[#FFC34D]/5 rounded-2xl p-8 border border-[#FFC34D]/20">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-[#FFC34D]" />
                  <h2 style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                    How to Maintain 5-Star Ratings
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0e0e0e]/50 rounded-xl p-4">
                    <div className="text-[#FFC34D] mb-2" style={{ fontWeight: 600 }}>Reply to Every Review</div>
                    <p className="text-sm text-muted-foreground">Responding shows you care. Creators who reply to all reviews get 40% more repeat customers.</p>
                  </div>
                  
                  <div className="bg-[#0e0e0e]/50 rounded-xl p-4">
                    <div className="text-[#FFC34D] mb-2" style={{ fontWeight: 600 }}>Over-Deliver</div>
                    <p className="text-sm text-muted-foreground">Add a personal touch or extra 30 seconds to surprise buyers. Small details get big reviews.</p>
                  </div>
                  
                  <div className="bg-[#0e0e0e]/50 rounded-xl p-4">
                    <div className="text-[#FFC34D] mb-2" style={{ fontWeight: 600 }}>Ask for Feedback</div>
                    <p className="text-sm text-muted-foreground">End deliveries with "Was this what you hoped for?" Shows professionalism and care.</p>
                  </div>
                  
                  <div className="bg-[#0e0e0e]/50 rounded-xl p-4">
                    <div className="text-[#FFC34D] mb-2" style={{ fontWeight: 600 }}>Fast Delivery</div>
                    <p className="text-sm text-muted-foreground">Delivering early gets bonus points. You're already doing great—keep it up!</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PROFILE VIEWS TAB */}
          {activeTab === "views" && (
            <>
              {/* Visitor Stats */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="mb-6" style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                  Profile Traffic & Conversion
                </h2>
                
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={visitorStats}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#19E28C" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#19E28C" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9E0B61" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9E0B61" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3A3C43" />
                    <XAxis dataKey="date" stroke="#DADBE1" />
                    <YAxis stroke="#DADBE1" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0e0e0e', border: '1px solid #3A3C43', borderRadius: '8px' }}
                      labelStyle={{ color: '#DADBE1' }}
                    />
                    <Area type="monotone" dataKey="views" stroke="#19E28C" fillOpacity={1} fill="url(#viewsGradient)" strokeWidth={2} name="Profile Views" />
                    <Area type="monotone" dataKey="clicks" stroke="#9E0B61" fillOpacity={1} fill="url(#clicksGradient)" strokeWidth={2} name="Order Clicks" />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-[#0e0e0e] rounded-xl p-4 border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
                    <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>18.2%</div>
                    <div className="text-xs text-[#19E28C]">+3.5% this week</div>
                  </div>

                  <div className="bg-[#0e0e0e] rounded-xl p-4 border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Avg. Session</div>
                    <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>3m 42s</div>
                    <div className="text-xs text-muted-foreground">Visitors love your profile</div>
                  </div>

                  <div className="bg-[#0e0e0e] rounded-xl p-4 border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Bounce Rate</div>
                    <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>22%</div>
                    <div className="text-xs text-[#19E28C]">Better than 78% of creators</div>
                  </div>
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="mb-6" style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                  Where Your Visitors Come From
                </h2>

                <div className="space-y-4">
                  {[
                    { source: "Search Results", visits: 1240, percent: 52, trend: "+8%" },
                    { source: "Marketplace Browse", visits: 680, percent: 28, trend: "+12%" },
                    { source: "Leaderboards", visits: 320, percent: 13, trend: "+22%" },
                    { source: "Direct Link", visits: 160, percent: 7, trend: "+5%" },
                  ].map((source, index) => (
                    <div key={index} className="bg-[#0e0e0e] rounded-xl p-4 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="mb-1" style={{ fontWeight: 600 }}>{source.source}</div>
                          <div className="text-sm text-muted-foreground">{source.visits} visits</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl" style={{ fontWeight: 700 }}>{source.percent}%</div>
                          <div className="text-sm text-[#19E28C]">{source.trend}</div>
                        </div>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div 
                          className="bg-[#9E0B61] h-2 rounded-full transition-all"
                          style={{ width: `${source.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard Position */}
              <div className="bg-[#9E0B61]/10 rounded-2xl p-8 border border-[#9E0B61]/20">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-[#FFC34D]" />
                  <h2 style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                    Your Leaderboard Position
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-[#0e0e0e]/50 rounded-xl p-6 border border-[#9E0B61]/20 text-center">
                    <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>#12</div>
                    <div className="text-sm text-muted-foreground mb-2">Overall Ranking</div>
                    <div className="text-xs text-[#19E28C]">↑ 3 places this week</div>
                  </div>

                  <div className="bg-[#0e0e0e]/50 rounded-xl p-6 border border-[#9E0B61]/20 text-center">
                    <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>#4</div>
                    <div className="text-sm text-muted-foreground mb-2">In Your Category</div>
                    <div className="text-xs text-[#FFC34D]">So close to top 3!</div>
                  </div>

                  <div className="bg-[#0e0e0e]/50 rounded-xl p-6 border border-[#9E0B61]/20 text-center">
                    <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>1.2k</div>
                    <div className="text-sm text-muted-foreground mb-2">Points to Next Rank</div>
                    <div className="text-xs text-muted-foreground">About 18 more orders</div>
                  </div>
                </div>

                <div className="bg-[#0e0e0e]/50 rounded-xl p-6 border border-[#9E0B61]/20">
                  <div className="mb-4" style={{ fontWeight: 600 }}>How to Climb Higher</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-[#19E28C] mt-0.5">•</span>
                      <span>Complete 15 more orders this month to reach #10 overall (+500 points)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#19E28C] mt-0.5">•</span>
                      <span>Maintain your 4.9+ rating to get a 2x point multiplier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#19E28C] mt-0.5">•</span>
                      <span>Post during peak hours (6PM-10PM) for visibility bonus points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#19E28C] mt-0.5">•</span>
                      <span>Get featured on the homepage by earning 50+ reviews (+1000 points)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Profile Optimization Tips */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-[#19E28C]" />
                  <h2 style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                    Optimize Your Profile for More Sales
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0e0e0e] rounded-xl p-6 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#19E28C]" style={{ fontWeight: 600 }}>Update Profile Photo</div>
                      <Badge className="bg-[#19E28C]/20 text-[#19E28C]">High Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Professional photos increase clicks by 85%. Show your personality!</p>
                  </div>

                  <div className="bg-[#0e0e0e] rounded-xl p-6 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#19E28C]" style={{ fontWeight: 600 }}>Add Voice Samples</div>
                      <Badge className="bg-[#FFC34D]/20 text-[#FFC34D]">Medium Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Creators with samples convert 3x better. Let them hear your voice!</p>
                  </div>

                  <div className="bg-[#0e0e0e] rounded-xl p-6 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#19E28C]" style={{ fontWeight: 600 }}>Detailed Bio</div>
                      <Badge className="bg-[#19E28C]/20 text-[#19E28C]">High Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Tell your story. Share what makes your content special and unique.</p>
                  </div>

                  <div className="bg-[#0e0e0e] rounded-xl p-6 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#19E28C]" style={{ fontWeight: 600 }}>Post Consistently</div>
                      <Badge className="bg-[#FFC34D]/20 text-[#FFC34D]">Medium Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Active creators get 60% more visibility. Aim for 3-5 posts per week.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
