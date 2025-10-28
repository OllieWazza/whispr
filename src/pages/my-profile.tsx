import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { 
  Star, 
  Heart, 
  Share2, 
  Check, 
  Package,
  Zap,
  Crown,
  ShoppingCart,
  X,
  UserPlus,
  Loader2,
  Edit3,
  Save,
  Camera,
  Upload,
  Video,
  Sparkles,
  TrendingUp,
  Play,
  Trash2
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";

// Import default profile pictures
import whispr1 from "../assets/profilepicture/whispr1.png";
import whispr2 from "../assets/profilepicture/whispr2.png";
import whispr3 from "../assets/profilepicture/whispr3.png";
import whispr4 from "../assets/profilepicture/whispr4.png";
import whispr5 from "../assets/profilepicture/whispr5.png";
import whispr6 from "../assets/profilepicture/whispr6.png";
import whispr7 from "../assets/profilepicture/whispr7.png";
import whispr8 from "../assets/profilepicture/whispr8.png";
import whispr9 from "../assets/profilepicture/whispr9.png";

const defaultProfilePictures = [
  { id: 'whispr1', src: whispr1 },
  { id: 'whispr2', src: whispr2 },
  { id: 'whispr3', src: whispr3 },
  { id: 'whispr4', src: whispr4 },
  { id: 'whispr5', src: whispr5 },
  { id: 'whispr6', src: whispr6 },
  { id: 'whispr7', src: whispr7 },
  { id: 'whispr8', src: whispr8 },
  { id: 'whispr9', src: whispr9 },
];

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  price: number;
  category: string;
  plays: number;
  rating: number;
}

export function MyProfilePage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [thankYouVideoFile, setThankYouVideoFile] = useState<File | null>(null);
  const [thankYouVideoPreview, setThankYouVideoPreview] = useState<string>("");
  
  const [editForm, setEditForm] = useState({
    displayName: "",
    bio: "",
    profilePicture: null as File | null,
    profilePicturePreview: "",
    selectedDefaultPicture: "",
  });

  useEffect(() => {
    // ProtectedRoute already handles auth checks, just fetch data when profile is ready
    if (profile?.user_type === 'creator') {
      fetchCreatorData();
    }
  }, [profile]);

  const fetchCreatorData = async () => {
    try {
      setLoading(true);

      const { data: creatorData, error: creatorError } = await supabase
        .from('creators')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (creatorError || !creatorData) {
        console.error('Creator not found:', creatorError);
        return;
      }

      const { data: listingsData } = await supabase
        .from('listings')
        .select('*')
        .eq('creator_id', user?.id);

      const creatorProfile = {
        id: creatorData.id,
        name: creatorData.display_name,
        username: `@${creatorData.display_name.toLowerCase().replace(/\s+/g, '')}`,
        image: creatorData.profile_picture_url || "https://images.unsplash.com/photo-1693333412376-7e9ab19f38de?w=400",
        coverImage: "https://images.unsplash.com/photo-1704511659961-188aed53c8cc?w=1080",
        rating: creatorData.rating,
        reviewCount: creatorData.total_completed_jobs,
        followers: 0,
        totalOrders: creatorData.total_completed_jobs,
        responseTime: creatorData.response_time,
        completionRate: `${creatorData.satisfaction_rate}%`,
        bio: creatorData.bio || "Professional creator on WHISPR",
        tags: ["Creator"],
        memberSince: new Date(creatorData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };

      setCreator(creatorProfile);
      setListings(listingsData || []);
      
      // Set thank you video if exists
      if (creatorData.thank_you_video_url) {
        setThankYouVideoPreview(creatorData.thank_you_video_url);
      }
      
      // Detect if current picture is a default one
      let selectedDefault = "";
      if (creatorData.profile_picture_url) {
        const matchingDefault = defaultProfilePictures.find(pic => 
          creatorData.profile_picture_url.includes(pic.id) || creatorData.profile_picture_url === pic.src
        );
        if (matchingDefault) {
          selectedDefault = matchingDefault.id;
        }
      }

      setEditForm({
        displayName: creatorData.display_name,
        bio: creatorData.bio || "",
        profilePicture: null,
        profilePicturePreview: creatorData.profile_picture_url || whispr4,
        selectedDefaultPicture: selectedDefault || (creatorData.profile_picture_url ? "" : "whispr4"),
      });
    } catch (error) {
      console.error('Error fetching creator:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThankYouVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        alert('Please select a video file');
        return;
      }
      
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('Video file must be less than 50MB');
        return;
      }
      
      setThankYouVideoFile(file);
      setThankYouVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadThankYouVideo = async () => {
    if (!user || !thankYouVideoFile) return;

    setIsUploadingVideo(true);
    try {
      // Upload video to storage
      const fileExt = thankYouVideoFile.name.split('.').pop();
      const fileName = `${user.id}-thankyou-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('thank-you-videos')
        .upload(fileName, thankYouVideoFile);

      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('thank-you-videos')
        .getPublicUrl(fileName);

      // Update creator profile with video URL
      const { error: updateError } = await supabase
        .from('creators')
        .update({
          thank_you_video_url: publicUrl,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setThankYouVideoPreview(publicUrl);
      setThankYouVideoFile(null);
      alert('Thank you video uploaded successfully!');
      
      // Refresh data
      await fetchCreatorData();
    } catch (error: any) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleDeleteThankYouVideo = async () => {
    if (!user || !confirm('Are you sure you want to delete your thank you video?')) return;

    try {
      // Update creator profile to remove video URL
      const { error: updateError } = await supabase
        .from('creators')
        .update({
          thank_you_video_url: null,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setThankYouVideoPreview("");
      alert('Thank you video deleted successfully!');
      
      // Refresh data
      await fetchCreatorData();
    } catch (error: any) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
    }
  };

  const allContent: ContentItem[] = listings.map((listing: any) => ({
    id: listing.id,
    title: listing.title,
    thumbnail: listing.thumbnail_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    duration: "2:30",
    price: listing.starting_price,
    category: listing.category || "Uncategorized",
    plays: listing.total_reviews * 10,
    rating: listing.rating,
  }));

  const highlightedContent = allContent
    .sort((a, b) => b.rating - a.rating || b.plays - a.plays)
    .slice(0, 3);

  const handleDefaultPictureSelect = (pictureId: string, pictureSrc: string) => {
    setEditForm({
      ...editForm,
      profilePicture: null, // Clear custom upload
      profilePicturePreview: pictureSrc,
      selectedDefaultPicture: pictureId,
    });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditForm({
        ...editForm,
        profilePicture: file,
        profilePicturePreview: URL.createObjectURL(file),
        selectedDefaultPicture: "", // Clear default selection
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      let profilePictureUrl = editForm.profilePicturePreview;

      // Handle profile picture - either custom upload or default selection
      if (editForm.profilePicture) {
        // Upload custom profile picture
        const fileExt = editForm.profilePicture.name.split('.').pop();
        const fileName = `${user.id}-profile-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, editForm.profilePicture);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        profilePictureUrl = publicUrl;
      } else if (editForm.selectedDefaultPicture) {
        // Use default picture
        profilePictureUrl = editForm.profilePicturePreview;
      }

      // Update creator profile
      const { error: updateError } = await supabase
        .from('creators')
        .update({
          display_name: editForm.displayName,
          bio: editForm.bio,
          profile_picture_url: profilePictureUrl,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Refresh data
      await fetchCreatorData();
      setIsEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#9E0B61] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Profile not found</p>
          <Button onClick={() => navigate('/profile-setup')}>
            Complete Profile Setup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Cover Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={creator.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0e0e]/50 to-[#0e0e0e]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-6 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] opacity-50 blur-xl" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 ring-2 ring-[#9E0B61]/50">
                <ImageWithFallback
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl">{creator.name}</h1>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61] to-[#74094A] rounded-md blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-[#9E0B61] to-[#74094A] rounded-md shadow-lg">
                        <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white stroke-[3]" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[#DADBE1] mb-3 text-base sm:text-lg">{creator.username}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                      <span>{creator.rating}</span>
                      <span className="text-[#DADBE1]">({creator.reviewCount})</span>
                    </div>
                    <span className="text-[#DADBE1]">•</span>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4 text-[#19E28C]" />
                      <span>{creator.totalOrders.toLocaleString()} orders</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {creator.tags.map((tag: string) => (
                      <Badge key={tag} className="bg-[#9E0B61]/10 text-[#E879F9] border border-[#9E0B61]/20 hover:bg-[#9E0B61]/20 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="gradient" className="gap-2">
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1a1a1a] border-white/10 max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-white">Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        {/* Profile Picture */}
                        <div>
                          <Label className="text-white mb-3 block">Profile Picture</Label>
                          
                          {/* Preview and Upload */}
                          <div className="flex items-center gap-4 mb-4">
                            <img 
                              src={editForm.profilePicturePreview || 'https://via.placeholder.com/96'}
                              alt="Profile preview"
                              className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                            />
                            <div>
                              <input
                                type="file"
                                id="editProfilePicture"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                              />
                              <label htmlFor="editProfilePicture">
                                <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
                                  <span>
                                    <Camera className="w-4 h-4 mr-2" />
                                    Change Photo
                                  </span>
                                </Button>
                              </label>
                            </div>
                          </div>

                          {/* Default Picture Selection */}
                          <div>
                            <p className="text-white/70 text-sm mb-3">Or choose a default picture</p>
                            <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-2">
                              {defaultProfilePictures.map((pic) => (
                                <button
                                  key={pic.id}
                                  type="button"
                                  onClick={() => handleDefaultPictureSelect(pic.id, pic.src)}
                                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                    editForm.selectedDefaultPicture === pic.id
                                      ? "border-[#9E0B61] ring-2 ring-[#9E0B61]/50 scale-105"
                                      : "border-white/20 hover:border-white/40"
                                  }`}
                                >
                                  <img src={pic.src} alt={`Profile ${pic.id}`} className="w-full h-full object-cover" />
                                  {editForm.selectedDefaultPicture === pic.id && (
                                    <div className="absolute inset-0 bg-[#9E0B61]/20 flex items-center justify-center">
                                      <div className="w-6 h-6 rounded-full bg-[#9E0B61] flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Display Name */}
                        <div>
                          <Label htmlFor="editDisplayName" className="text-white">Display Name</Label>
                          <Input
                            id="editDisplayName"
                            value={editForm.displayName}
                            onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                            className="mt-1.5 bg-white/10 border-white/20 text-white"
                          />
                        </div>

                        {/* Bio */}
                        <div>
                          <Label htmlFor="editBio" className="text-white">Bio</Label>
                          <Textarea
                            id="editBio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            rows={4}
                            className="mt-1.5 bg-white/10 border-white/20 text-white resize-none"
                          />
                        </div>

                        <Button 
                          onClick={handleSaveProfile} 
                          disabled={isSaving}
                          className="w-full"
                          variant="gradient"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <p className="text-[#DADBE1] leading-relaxed">{creator.bio}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Featured Content */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#FFC34D]" />
                  <h2 className="text-lg sm:text-xl">Featured Content</h2>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/creator/upload')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </div>

              {highlightedContent.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {highlightedContent.map((content) => (
                    <div
                      key={content.id}
                      className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#9E0B61]/50 transition-all cursor-pointer"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <ImageWithFallback
                          src={content.thumbnail}
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm text-white line-clamp-1">{content.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[#19E28C] text-sm">£{content.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-[#FFC34D] text-[#FFC34D]" />
                            <span className="text-xs text-white/60">{content.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white/60 mb-4">No content yet</p>
                  <Button variant="gradient" onClick={() => navigate('/creator/upload')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Listing
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Thank You Video Card */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 backdrop-blur-2xl bg-gradient-to-br from-[#9E0B61]/10 to-transparent border-[#9E0B61]/20">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-[#E879F9]" />
                <h3 className="text-base sm:text-lg">Thank You Video</h3>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3 mb-3 border border-[#FFC34D]/20">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-[#FFC34D] mt-0.5 shrink-0" />
                  <p className="text-xs text-white/80">
                    <strong className="text-[#FFC34D]">+45% recurring purchases</strong> when you add a personal thank you message!
                  </p>
                </div>
              </div>

              {thankYouVideoPreview ? (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                    <video
                      src={thankYouVideoPreview}
                      controls
                      className="w-full h-full"
                      controlsList="nodownload"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={handleDeleteThankYouVideo}
                      className="bg-white/5 border-white/10 hover:bg-red-500/20 hover:border-red-500/50 gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        const input = document.getElementById('thankYouVideoUpload');
                        input?.click();
                      }}
                      className="bg-white/5 border-white/10 hover:bg-white/10 gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Replace
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden bg-black/30 aspect-video flex items-center justify-center border-2 border-dashed border-white/10">
                    {thankYouVideoFile ? (
                      <div className="text-center p-4">
                        <Video className="w-8 h-8 text-[#19E28C] mx-auto mb-2" />
                        <p className="text-sm text-white/80 mb-1">{thankYouVideoFile.name}</p>
                        <p className="text-xs text-white/60">
                          {(thankYouVideoFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <Video className="w-8 h-8 text-white/40 mx-auto mb-2" />
                        <p className="text-sm text-white/60">No video uploaded</p>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    id="thankYouVideoUpload"
                    accept="video/*"
                    onChange={handleThankYouVideoChange}
                    className="hidden"
                  />
                  
                  {!thankYouVideoFile ? (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        const input = document.getElementById('thankYouVideoUpload');
                        input?.click();
                      }}
                      className="bg-white/5 border-white/10 hover:bg-white/10 gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Select Video
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setThankYouVideoFile(null);
                          setThankYouVideoPreview("");
                        }}
                        className="bg-white/5 border-white/10 hover:bg-white/10 flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={handleUploadThankYouVideo}
                        disabled={isUploadingVideo}
                        className="flex-1 gap-2"
                      >
                        {isUploadingVideo ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs text-white/60 mt-3">
                <strong>Tip:</strong> Keep it short (10-30 seconds), genuine, and mention you'd love to work with them again!
              </p>
            </div>

            {/* Stats Card */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 backdrop-blur-2xl">
              <h3 className="text-base sm:text-lg mb-4">Your Stats</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Response Time</span>
                  <span className="text-[#19E28C] text-sm sm:text-base">{creator.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Completion Rate</span>
                  <span className="text-[#19E28C] text-sm sm:text-base">{creator.completionRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Total Orders</span>
                  <span className="text-sm sm:text-base">{creator.totalOrders.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#DADBE1] text-xs sm:text-sm">Member Since</span>
                  <span className="text-sm sm:text-base">{creator.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 backdrop-blur-2xl">
              <h3 className="text-base sm:text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="gradient" 
                  fullWidth 
                  className="justify-start gap-2 h-11"
                  onClick={() => navigate('/creator/dashboard')}
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Go to Dashboard</span>
                </Button>
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="justify-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 h-11"
                  onClick={() => navigate('/creator/upload')}
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Upload Content</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

