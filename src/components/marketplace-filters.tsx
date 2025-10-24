import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { ChevronDown } from "lucide-react";

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<string>("all");

  const categories = [
    "ASMR",
    "Whisper Greeting",
    "Roleplay",
    "Sensual Story",
    "VO-Commercial",
    "Product UGC",
  ];

  const tones = [
    "Flirty",
    "Playful",
    "Soothing",
    "Sultry",
    "Soft-spoken",
    "Energetic",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTone = (tone: string) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone]
    );
  };

  const activeFiltersCount =
    selectedCategories.length + selectedTones.length + (minRating !== "all" ? 1 : 0);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Categories Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="glass-white"
            size="default"
          >
            Categories
            {selectedCategories.length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#9E0B61] rounded-full">
                {selectedCategories.length}
              </span>
            )}
            <ChevronDown className="w-4 h-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 bg-[#0e0e0e] border-[#3A3C43]" align="start">
          <div className="space-y-3">
            <div className="pb-2 border-b border-white/10">
              <h4 className="text-sm text-white">Select Categories</h4>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <label
                  htmlFor={`cat-${category}`}
                  className="text-sm text-white/80 cursor-pointer flex-1"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Price Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="glass-white"
            size="default"
          >
            Budget
            {(priceRange[0] > 0 || priceRange[1] < 100) && (
              <span className="text-xs text-[#19E28C]">
                £{priceRange[0]}-£{priceRange[1]}
              </span>
            )}
            <ChevronDown className="w-4 h-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-[#0e0e0e] border-[#3A3C43]" align="start">
          <div className="space-y-4">
            <div className="pb-2 border-b border-white/10">
              <h4 className="text-sm text-white">Price Range</h4>
            </div>
            <Slider
              min={0}
              max={100}
              step={5}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Min: £{priceRange[0]}</span>
              <span className="text-white/60">Max: £{priceRange[1]}+</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Tone Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="glass-white"
            size="default"
          >
            Tone & Style
            {selectedTones.length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#9E0B61] rounded-full">
                {selectedTones.length}
              </span>
            )}
            <ChevronDown className="w-4 h-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 bg-[#0e0e0e] border-[#3A3C43]" align="start">
          <div className="space-y-3">
            <div className="pb-2 border-b border-white/10">
              <h4 className="text-sm text-white">Select Tone</h4>
            </div>
            {tones.map((tone) => (
              <div key={tone} className="flex items-center space-x-2">
                <Checkbox
                  id={`tone-${tone}`}
                  checked={selectedTones.includes(tone)}
                  onCheckedChange={() => toggleTone(tone)}
                />
                <label
                  htmlFor={`tone-${tone}`}
                  className="text-sm text-white/80 cursor-pointer flex-1"
                >
                  {tone}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Rating Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="glass-white"
            size="default"
          >
            Rating
            {minRating !== "all" && (
              <span className="text-xs text-[#19E28C]">{minRating}+</span>
            )}
            <ChevronDown className="w-4 h-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 bg-[#0e0e0e] border-[#3A3C43]" align="start">
          <div className="space-y-2">
            <div className="pb-2 border-b border-white/10">
              <h4 className="text-sm text-white">Minimum Rating</h4>
            </div>
            {[
              { value: "all", label: "All Ratings" },
              { value: "4.5", label: "4.5+ Stars" },
              { value: "4.0", label: "4.0+ Stars" },
              { value: "3.5", label: "3.5+ Stars" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setMinRating(option.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  minRating === option.value
                    ? "bg-[#9E0B61]/20 text-white"
                    : "text-white/70 hover:bg-[#0e0e0e]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="default"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedTones([]);
            setMinRating("all");
            setPriceRange([0, 100]);
          }}
        >
          Clear all ({activeFiltersCount})
        </Button>
      )}
    </div>
  );
}
