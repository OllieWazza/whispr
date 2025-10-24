import { Star, Eye, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface CreatorCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  fromPrice: number;
  tags: string[];
  featured?: boolean;
}

export function CreatorCard({ 
  id,
  name, 
  image, 
  rating, 
  reviewCount, 
  fromPrice, 
  tags,
  featured = false
}: CreatorCardProps) {
  return (
    <Link 
      to={`/profile/${id}`}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl block"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0e0e0e]">
        <ImageWithFallback 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Liquid overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#9E0B61]/70 via-[#9E0B61]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons - appears on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 space-y-2">
          <Button 
            fullWidth 
            className="shadow-xl"
            onClick={(e) => {
              // Link will handle navigation
            }}
          >
            <Eye className="w-4 h-4" />
            View Profile
          </Button>
          <Button 
            fullWidth 
            variant="glass"
            className="shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement quick buy modal
            }}
          >
            <Zap className="w-4 h-4" />
            Quick Buy
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 bg-white">
        <div>
          <h3 className="mb-1 text-[#0E0E10]" style={{ fontWeight: 600 }}>{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-[#FFC34D] text-[#FFC34D]' : 'text-[#E0E0E0]'}`}
                />
              ))}
            </div>
            <span className="text-sm text-[#6B6B6B]">({reviewCount})</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-sm">
          <span className="text-[#6B6B6B]">from </span>
          <span className="text-[#0E0E10]" style={{ fontWeight: 600 }}>£{fromPrice}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              className="text-xs bg-[#F5F5F5] text-[#0E0E10] border border-[#E0E0E0] hover:bg-[#9E0B61] hover:text-white hover:border-[#9E0B61] hover:scale-105 transition-all duration-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
