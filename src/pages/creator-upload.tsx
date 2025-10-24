import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Upload, FileAudio, X, Sparkles, Clock, DollarSign, Zap, Crown, Gift, ArrowRight, CheckCircle2, Mic, Headphones, Check, ChevronDown, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export function CreatorUploadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>("basic");
  const [contentType, setContentType] = useState<string>("audio");
  const [openCategories, setOpenCategories] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    deliveryTime: "",
    sampleUrl: "",
  });
  const [pricing, setPricing] = useState({
    basic: "",
    premium: "",
    vip: ""
  });

  const categories = [
    "ASMR",
    "Whisper Greeting",
    "Roleplay",
    "Sensual Story",
    "Voice-Over Commercial",
    "Product UGC",
    "Audio Messages",
    "Custom Scripts",
    "Guided Experience",
    "Sleep Aid",
    "Girlfriend Experience",
    "Dirty Talk",
    "Moaning/Sounds",
    "Phone Sex Simulation",
    "JOI",
    "Femdom/Domination",
    "Submissive",
    "Erotic Storytelling",
    "Fantasy Scenarios",
    "Meditation/Relaxation"
  ];

  const tones = [
    "Flirty",
    "Playful",
    "Soothing",
    "Sultry",
    "Soft-spoken",
    "Energetic",
    "Seductive",
    "Innocent",
    "Dominant",
    "Submissive",
    "Sweet",
    "Naughty",
    "Teasing",
    "Confident",
    "Shy",
    "Professional",
    "Casual",
    "Intimate",
    "Passionate",
    "Mysterious"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePricingChange = (tier: string, value: string) => {
    setPricing(prev => ({ ...prev, [tier]: value }));
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent, saveAsDraft: boolean = false) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a listing");
      return;
    }

    // Validation
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!pricing.basic && !pricing.premium && !pricing.vip) {
      toast.error("Please set at least one pricing tier");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload files to Supabase Storage (if any)
      let thumbnailUrl = null;
      if (selectedFiles.length > 0) {
        const file = selectedFiles[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('listing-photos')
          .upload(fileName, file);

        if (uploadError) {
          toast.error("Error uploading file: " + uploadError.message);
          setLoading(false);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('listing-photos')
          .getPublicUrl(fileName);
        
        thumbnailUrl = publicUrl;
      }

      // 2. Create the listing
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert({
          creator_id: user.id,
          title: formData.title,
          description: formData.description,
          content_type: contentType === 'audio' ? 'voice' : 'video',
          thumbnail_url: thumbnailUrl,
          starting_price: pricing.basic ? parseFloat(pricing.basic) : parseFloat(pricing.premium || pricing.vip || '0'),
          is_instant_buy: false,
        })
        .select()
        .single();

      if (listingError) {
        toast.error("Error creating listing: " + listingError.message);
        setLoading(false);
        return;
      }

      // 3. Create pricing tiers
      const tiers = [];
      if (pricing.basic) {
        tiers.push({
          listing_id: listing.id,
          tier_name: 'basic',
          price: parseFloat(pricing.basic),
          description: 'Standard delivery, basic customization',
          delivery_time: formData.deliveryTime || '24 hours',
          revisions: 1,
        });
      }
      if (pricing.premium) {
        tiers.push({
          listing_id: listing.id,
          tier_name: 'premium',
          price: parseFloat(pricing.premium),
          description: 'Priority delivery, extra customization',
          delivery_time: formData.deliveryTime || '24 hours',
          revisions: 3,
        });
      }
      if (pricing.vip) {
        tiers.push({
          listing_id: listing.id,
          tier_name: 'exclusive',
          price: parseFloat(pricing.vip),
          description: 'Express delivery, full customization',
          delivery_time: formData.deliveryTime || '24 hours',
          revisions: 999,
        });
      }

      if (tiers.length > 0) {
        const { error: tiersError } = await supabase
          .from('listing_tiers')
          .insert(tiers);

        if (tiersError) {
          console.error('Error creating tiers:', tiersError);
        }
      }

      // 4. Link categories (TODO: fetch category IDs from database)
      // For now, skip category linking as we need to query categories first

      toast.success(saveAsDraft ? "Listing saved as draft!" : "Listing published successfully!");
      navigate('/creator/dashboard');

    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-white mb-2">Share your voice, get selling</h1>
          <p className="text-white/60">Create your listing and start earning from your content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Recommended & Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Recommended for You */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Recommended for you</p>
                <h3 className="text-white mb-1">Upload your first audio clip</h3>
                <p className="text-white/60 text-sm">Get discovered by buyers looking for your unique voice</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              Get started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Upload Progress */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Profile progress</p>
                <h3 className="text-white mb-1">You've added 45% of your profile</h3>
                <p className="text-white/60 text-sm">Complete it to get more visibility</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#19E28C]" />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              Complete info
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <form className="space-y-6">
          {/* Content Type Selection */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-white mb-6">What are you uploading?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Audio Option */}
              <button
                type="button"
                onClick={() => setContentType("audio")}
                className={`p-6 rounded-xl text-left transition-all ${
                  contentType === "audio"
                    ? "bg-white/10 border-2 border-[#9E0B61] shadow-lg shadow-[#9E0B61]/20"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-2">Audio Clip</h3>
                <p className="text-white/50 text-sm">Voice notes, ASMR, stories</p>
              </button>

              {/* Bundle Option */}
              <button
                type="button"
                onClick={() => setContentType("bundle")}
                className={`p-6 rounded-xl text-left transition-all ${
                  contentType === "bundle"
                    ? "bg-white/10 border-2 border-[#9E0B61] shadow-lg shadow-[#9E0B61]/20"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#19E28C] to-[#0FA368] flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-2">Content Bundle</h3>
                <p className="text-white/50 text-sm">Multiple files package</p>
              </button>
            </div>
          </div>

          {/* Category & Tags Selection */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-white mb-6">Category & Style</h2>
            
            <div className="space-y-8">
              {/* Category Selection */}
              <div className="space-y-3">
                <Label className="text-white/90">
                  Select Categories * 
                  <span className="text-white/50 text-sm ml-2">({selectedCategories.length} selected)</span>
                </Label>
                <p className="text-white/50 text-sm mb-3">Choose all that apply to help buyers find your content</p>
                
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenCategories(!openCategories)}
                    className="w-full sm:w-auto sm:min-w-[280px] justify-between h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                  >
                    <span className="text-white/70">
                      {selectedCategories.length === 0 ? "Select categories..." : "Categories selected"}
                    </span>
                    <ChevronDown className={`ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform ${openCategories ? 'rotate-180' : ''}`} />
                  </Button>

                  {openCategories && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setOpenCategories(false)}
                      />
                      
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 right-0 sm:right-auto top-full mt-3 w-full sm:w-[420px] bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                        <div className="p-3 sm:p-4 space-y-1">
                          {categories.map((category) => (
                            <button
                              key={category}
                              type="button"
                              onClick={() => toggleCategory(category)}
                              className="flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 w-full text-left"
                            >
                              <div className={`flex h-4 w-4 items-center justify-center rounded border border-white/20 shrink-0 ${
                                selectedCategories.includes(category) 
                                  ? "bg-gradient-to-r from-[#9E0B61] to-[#74094A] border-[#9E0B61]" 
                                  : "bg-white/5"
                              }`}>
                                {selectedCategories.includes(category) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span>{category}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Selected Categories Display */}
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#9E0B61] to-[#74094A] text-white text-sm border border-[#9E0B61]/50"
                      >
                        <span>{category}</span>
                        <button
                          type="button"
                          onClick={() => removeCategory(category)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tone Tags */}
              <div className="space-y-3">
                <Label className="text-white/90">
                  Add Tone Tags
                  <span className="text-white/50 text-sm ml-2">({selectedTags.length} selected)</span>
                </Label>
                <p className="text-white/50 text-sm mb-4">Describe the mood and style of your voice</p>
                
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => toggleTag(tone)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedTags.includes(tone)
                          ? "bg-white/10 backdrop-blur-xl text-white border border-[#9E0B61] shadow-lg hover:bg-white/15"
                          : "bg-white/5 backdrop-blur-xl text-white/70 border border-white/10 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {tone}
                      {selectedTags.includes(tone) && (
                        <Check className="w-3 h-3 inline ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Listing Details */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-white mb-6">Listing Details</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/90">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Sultry Bedtime Story - Custom ASMR Experience"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#9E0B61]/50 focus:bg-white/10 transition-all h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/90">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your content in detail. What makes it special? What can buyers expect? Include any special requests you can fulfill..."
                  rows={8}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#9E0B61]/50 focus:bg-white/10 transition-all resize-none"
                  required
                />
                <p className="text-white/50 text-sm">Tip: Detailed descriptions help buyers understand exactly what they'll receive</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white/90">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="5"
                    min="1"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#9E0B61]/50 focus:bg-white/10 transition-all h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery" className="text-white/90 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#19E28C]" />
                    Delivery Time *
                  </Label>
                  <Select>
                    <SelectTrigger id="delivery" className="bg-white/5 border-white/10 text-white h-12 focus:border-[#9E0B61]/50">
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="48h">48 hours</SelectItem>
                      <SelectItem value="3d">3 days</SelectItem>
                      <SelectItem value="5d">5 days</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="14d">14 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample" className="text-white/90">Sample Preview URL (optional)</Label>
                <Input
                  id="sample"
                  type="url"
                  placeholder="https://soundcloud.com/your-sample"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#9E0B61]/50 focus:bg-white/10 transition-all h-12"
                />
                <p className="text-white/50 text-sm">Add a link to a short sample to increase conversions</p>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileAudio className="w-5 h-5 text-[#9E0B61]" />
              <h2 className="text-white">Upload Files</h2>
            </div>
            
            <div className="space-y-6">
              {/* Upload Zone */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9E0B61]/20 via-[#19E28C]/20 to-[#9E0B61]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-[#9E0B61]/50 transition-all bg-white/5 backdrop-blur-sm">
                  <input
                    type="file"
                    id="file-upload"
                    accept="audio/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white mb-2">
                      <span className="bg-gradient-to-r from-[#9E0B61] to-[#19E28C] bg-clip-text text-transparent">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-white/50 mb-1">
                      MP3, WAV, or M4A (max. 100MB per file)
                    </p>
                    <p className="text-white/40 text-sm">
                      You can upload preview samples or full content files
                    </p>
                  </label>
                </div>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-white/70">Uploaded Files ({selectedFiles.length})</Label>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center">
                          <FileAudio className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white">{file.name}</p>
                          <p className="text-white/50 text-sm">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-5 h-5 text-[#9E0B61]" />
              <h2 className="text-white">Set Your Price</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-white/60">Offer multiple pricing tiers to attract different buyers</p>
              
              {/* Pricing Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Basic Tier */}
                <div className={`p-5 rounded-xl border-2 transition-all ${
                  selectedTier === "basic"
                    ? "border-[#9E0B61] bg-white/10 shadow-lg shadow-[#9E0B61]/20"
                    : "border-white/10 bg-white/5"
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-[#19E28C]" />
                    <span className="text-white">Basic Tier</span>
                  </div>
                  <div className="mb-4">
                    <Label className="text-white/70 text-sm mb-2 block">Price (£)</Label>
                    <Input
                      type="number"
                      placeholder="25"
                      min="5"
                      value={pricing.basic}
                      onChange={(e) => handlePricingChange("basic", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11"
                      onFocus={() => setSelectedTier("basic")}
                    />
                  </div>
                  <p className="text-white/50 text-sm">Standard delivery, basic customization</p>
                </div>

                {/* Premium Tier */}
                <div className={`p-5 rounded-xl border-2 transition-all ${
                  selectedTier === "premium"
                    ? "border-[#9E0B61] bg-white/10 shadow-lg shadow-[#9E0B61]/20"
                    : "border-white/10 bg-white/5"
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-5 h-5 text-[#FFC34D]" />
                    <span className="text-white">Premium Tier</span>
                  </div>
                  <div className="mb-4">
                    <Label className="text-white/70 text-sm mb-2 block">Price (£)</Label>
                    <Input
                      type="number"
                      placeholder="50"
                      min="5"
                      value={pricing.premium}
                      onChange={(e) => handlePricingChange("premium", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11"
                      onFocus={() => setSelectedTier("premium")}
                    />
                  </div>
                  <p className="text-white/50 text-sm">Priority delivery, extra customization</p>
                </div>

                {/* VIP Tier */}
                <div className={`p-5 rounded-xl border-2 transition-all ${
                  selectedTier === "vip"
                    ? "border-[#9E0B61] bg-white/10 shadow-lg shadow-[#9E0B61]/20"
                    : "border-white/10 bg-white/5"
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="w-5 h-5 text-[#9E0B61]" />
                    <span className="text-white">VIP Tier</span>
                  </div>
                  <div className="mb-4">
                    <Label className="text-white/70 text-sm mb-2 block">Price (£)</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      min="5"
                      value={pricing.vip}
                      onChange={(e) => handlePricingChange("vip", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11"
                      onFocus={() => setSelectedTier("vip")}
                    />
                  </div>
                  <p className="text-white/50 text-sm">Express delivery, full customization</p>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-white mb-4">Additional Options</h3>
                
                <div className="flex items-start space-x-3">
                  <Checkbox id="commercial" className="mt-1 border-white/30 data-[state=checked]:bg-[#9E0B61] data-[state=checked]:border-[#9E0B61]" />
                  <div className="flex-1">
                    <label htmlFor="commercial" className="text-white/90 cursor-pointer">
                      Allow commercial use rights
                    </label>
                    <p className="text-white/50 text-sm mt-1">Let buyers use this content for commercial purposes (you can charge more)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="revisions" defaultChecked className="mt-1 border-white/30 data-[state=checked]:bg-[#9E0B61] data-[state=checked]:border-[#9E0B61]" />
                  <div className="flex-1">
                    <label htmlFor="revisions" className="text-white/90 cursor-pointer">
                      Offer revisions (recommended)
                    </label>
                    <p className="text-white/50 text-sm mt-1">Increase buyer confidence with revision options</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="rush" className="mt-1 border-white/30 data-[state=checked]:bg-[#9E0B61] data-[state=checked]:border-[#9E0B61]" />
                  <div className="flex-1">
                    <label htmlFor="rush" className="text-white/90 cursor-pointer">
                      Offer rush delivery option
                    </label>
                    <p className="text-white/50 text-sm mt-1">Allow buyers to pay extra for faster delivery</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="exclusive" className="mt-1 border-white/30 data-[state=checked]:bg-[#9E0B61] data-[state=checked]:border-[#9E0B61]" />
                  <div className="flex-1">
                    <label htmlFor="exclusive" className="text-white/90 cursor-pointer">
                      Offer exclusive content option
                    </label>
                    <p className="text-white/50 text-sm mt-1">One-time recordings that won't be resold to others</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-8">
            <p className="text-white/50 text-sm">
              * All fields marked with an asterisk are required
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                type="button"
                variant="outline" 
                size="lg"
                onClick={(e: any) => handleSubmit(e, true)}
                disabled={loading}
                className="flex-1 sm:flex-initial bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save as Draft
              </Button>
              <Button 
                type="submit"
                size="lg"
                onClick={(e: any) => handleSubmit(e, false)}
                disabled={loading}
                className="flex-1 sm:flex-initial bg-gradient-to-r from-[#9E0B61] to-[#74094A] hover:from-[#8A0A56] hover:to-[#5F073D] text-white px-8 shadow-lg shadow-[#9E0B61]/30 hover:shadow-xl hover:shadow-[#9E0B61]/40 transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Publish Content
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
