import { Star, Eye, TrendingUp, Award } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const demoCreators = [
  {
    id: "sophie-rose",
    name: "Sophie Rose",
    username: "@sophierose",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    rating: 4.9,
    reviewCount: 234,
    bio: "Professional voice artist specializing in warm, engaging audio messages. Perfect for birthdays, celebrations, and heartfelt moments.",
    tags: ["ASMR", "Voiceover", "Motivational"],
    basicPrice: 15,
    standardPrice: 30,
    premiumPrice: 50,
    verified: true,
    featured: true,
    totalOrders: 1247,
    responseTime: "1 hour",
    reviews: [
      {
        id: 1,
        userName: "James M.",
        rating: 5,
        comment: "Absolutely perfect! Sophie went above and beyond. The audio quality was incredible and she captured exactly what I wanted.",
        date: "2025-10-20",
      },
      {
        id: 2,
        userName: "Sarah K.",
        rating: 5,
        comment: "Amazing work! Very professional and delivered ahead of schedule. Highly recommend!",
        date: "2025-10-18",
      },
      {
        id: 3,
        userName: "Michael R.",
        rating: 4,
        comment: "Great quality and quick turnaround. Would definitely order again.",
        date: "2025-10-15",
      },
    ],
  },
  {
    id: "emma-blake",
    name: "Emma Blake",
    username: "@emmablake",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
    rating: 4.8,
    reviewCount: 189,
    bio: "Soothing voice perfect for relaxation and ASMR content. Creating calming audio experiences that help you unwind.",
    tags: ["ASMR", "Relaxation", "Meditation"],
    basicPrice: 20,
    standardPrice: 35,
    premiumPrice: 55,
    verified: true,
    featured: true,
    totalOrders: 956,
    responseTime: "2 hours",
    reviews: [
      {
        id: 1,
        userName: "David L.",
        rating: 5,
        comment: "Emma has the most soothing voice. Perfect for my meditation app!",
        date: "2025-10-19",
      },
      {
        id: 2,
        userName: "Lisa W.",
        rating: 5,
        comment: "Incredible ASMR content. Worth every penny!",
        date: "2025-10-16",
      },
    ],
  },
  {
    id: "olivia-hart",
    name: "Olivia Hart",
    username: "@oliviahart",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",
    rating: 4.7,
    reviewCount: 156,
    bio: "Energetic and bubbly personality! Specializing in upbeat messages for celebrations, motivation, and special occasions.",
    tags: ["Celebrations", "Motivational", "Birthday"],
    basicPrice: 12,
    standardPrice: 25,
    premiumPrice: 45,
    verified: true,
    featured: false,
    totalOrders: 743,
    responseTime: "3 hours",
    reviews: [
      {
        id: 1,
        userName: "Tom B.",
        rating: 5,
        comment: "Olivia's energy is contagious! Made my friend's birthday so special.",
        date: "2025-10-21",
      },
      {
        id: 2,
        userName: "Rachel P.",
        rating: 4,
        comment: "Very cheerful and professional. Great experience overall.",
        date: "2025-10-17",
      },
    ],
  },
  {
    id: "maya-chen",
    name: "Maya Chen",
    username: "@mayachen",
    image: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600",
    rating: 4.9,
    reviewCount: 201,
    bio: "Professional UGC creator and voice talent. Authentic, relatable content that connects with your audience.",
    tags: ["UGC", "Commercial", "Voiceover"],
    basicPrice: 18,
    standardPrice: 32,
    premiumPrice: 60,
    verified: true,
    featured: true,
    totalOrders: 1089,
    responseTime: "1 hour",
    reviews: [
      {
        id: 1,
        userName: "Alex M.",
        rating: 5,
        comment: "Maya created perfect UGC content for our brand. So natural and engaging!",
        date: "2025-10-22",
      },
    ],
  },
  {
    id: "isabella-rose",
    name: "Isabella Rose",
    username: "@isabellarose",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
    rating: 4.8,
    reviewCount: 167,
    bio: "Sultry voice perfect for romantic messages and intimate audio. Creating memorable moments for your special someone.",
    tags: ["Romantic", "Anniversary", "ASMR"],
    basicPrice: 25,
    standardPrice: 40,
    premiumPrice: 65,
    verified: true,
    featured: false,
    totalOrders: 834,
    responseTime: "2 hours",
    reviews: [
      {
        id: 1,
        userName: "Chris D.",
        rating: 5,
        comment: "The perfect anniversary gift! Isabella's voice is incredible.",
        date: "2025-10-19",
      },
      {
        id: 2,
        userName: "Emma S.",
        rating: 5,
        comment: "Beautiful work. Very professional and timely delivery.",
        date: "2025-10-14",
      },
    ],
  },
  {
    id: "chloe-morgan",
    name: "Chloe Morgan",
    username: "@chloemorgan",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600",
    rating: 4.6,
    reviewCount: 142,
    bio: "Fun and playful content creator! Bringing joy and laughter to every message. Perfect for pranks and fun occasions.",
    tags: ["Fun", "Comedy", "Birthday"],
    basicPrice: 10,
    standardPrice: 22,
    premiumPrice: 40,
    verified: true,
    featured: false,
    totalOrders: 621,
    responseTime: "4 hours",
    reviews: [
      {
        id: 1,
        userName: "Mark H.",
        rating: 5,
        comment: "Chloe made my prank video hilarious! Great to work with.",
        date: "2025-10-20",
      },
    ],
  },
];

export function DemoContentPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2">Demo Content Library</h1>
          <p className="text-[#DADBE1]">Sample creator profiles, reviews, and data for testing</p>
        </div>

        {/* Top Creators Carousel Preview */}
        <section className="space-y-6">
          <h2>Top Creators - Carousel Cards</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCreators.slice(0, 3).map((creator) => (
              <div
                key={creator.id}
                className="relative group glass-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#9E0B61]/20 transition-all"
              >
                {/* Featured Badge */}
                {creator.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-[#9E0B61] to-[#74094A] border-none">
                      <TrendingUp className="w-3 h-3" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3>{creator.name}</h3>
                      {creator.verified && (
                        <Award className="w-5 h-5 text-[#19E28C]" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                        <span>{creator.rating}</span>
                        <span className="text-[#DADBE1]">({creator.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{creator.totalOrders.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {creator.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-white/10 border-white/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Creator Profiles */}
        <section className="space-y-8">
          <h2>Complete Creator Profiles</h2>
          {demoCreators.map((creator) => (
            <div key={creator.id} className="glass-card rounded-2xl p-8 space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-32 h-32 rounded-2xl object-cover"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3>{creator.name}</h3>
                      {creator.verified && (
                        <Award className="w-5 h-5 text-[#19E28C]" />
                      )}
                      {creator.featured && (
                        <Badge className="bg-gradient-to-r from-[#9E0B61] to-[#74094A]">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-[#DADBE1]">{creator.username}</p>
                  </div>
                  <p className="text-[#DADBE1]">{creator.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {creator.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-[#3A3C43]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-[#3A3C43]">
                <div>
                  <p className="text-[#DADBE1] text-sm mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                    <span>{creator.rating}</span>
                    <span className="text-[#DADBE1] text-sm">({creator.reviewCount})</span>
                  </div>
                </div>
                <div>
                  <p className="text-[#DADBE1] text-sm mb-1">Total Orders</p>
                  <p>{creator.totalOrders.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#DADBE1] text-sm mb-1">Response Time</p>
                  <p>{creator.responseTime}</p>
                </div>
                <div>
                  <p className="text-[#DADBE1] text-sm mb-1">Starting Price</p>
                  <p>£{creator.basicPrice}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-[#3A3C43]">
                <div className="space-y-2">
                  <p className="text-[#DADBE1]">Basic</p>
                  <p className="text-2xl">£{creator.basicPrice}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#DADBE1]">Standard</p>
                  <p className="text-2xl">£{creator.standardPrice}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#DADBE1]">Premium</p>
                  <p className="text-2xl">£{creator.premiumPrice}</p>
                </div>
              </div>

              {/* Reviews */}
              <div className="pt-4 border-t border-[#3A3C43] space-y-4">
                <h4>Recent Reviews ({creator.reviews.length})</h4>
                {creator.reviews.map((review) => (
                  <div key={review.id} className="bg-[#0e0e0e]/60 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p>{review.userName}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#FFC34D] text-[#FFC34D]" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-[#DADBE1]">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#DADBE1]">{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-4">
                <Button variant="glass" className="flex-1">View Profile</Button>
                <Button variant="outline" className="flex-1">Quick Order</Button>
              </div>
            </div>
          ))}
        </section>

        {/* Data Reference */}
        <section className="glass-card rounded-2xl p-8 space-y-6">
          <h2>Implementation Notes</h2>
          <div className="space-y-4 text-[#DADBE1]">
            <p>
              All creator data is stored in the <code className="px-2 py-1 bg-[#3A3C43]/50 rounded text-[#19E28C]">demoCreators</code> array 
              and can be easily imported into other pages for testing.
            </p>
            <div>
              <h4 className="text-white mb-2">Image Sources</h4>
              <p className="text-sm">All images are from Unsplash and follow the platform's usage guidelines.</p>
            </div>
            <div>
              <h4 className="text-white mb-2">Data Structure</h4>
              <p className="text-sm">
                Each creator object includes: id, name, username, image, rating, reviewCount, bio, tags, 
                pricing tiers, verification status, featured status, totalOrders, responseTime, and reviews array.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
