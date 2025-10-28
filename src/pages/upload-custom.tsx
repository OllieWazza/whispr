import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { 
  Upload, 
  FileAudio, 
  X, 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Loader2, 
  Check, 
  ChevronDown,
  ArrowLeft,
  ImagePlus,
  Package,
  Zap,
  Gift,
  Crown,
  Clock,
  Info
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export function UploadCustomPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTeaserPlaying, setIsTeaserPlaying] = useState(false);
  const [isTeaserRecording, setIsTeaserRecording] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>("basic");
  const [audioInputMethod, setAudioInputMethod] = useState<'record' | 'upload'>('record');
  const [teaserInputMethod, setTeaserInputMethod] = useState<'record' | 'upload'>('record');
  
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string>("");
  
  const [voiceTeaserFile, setVoiceTeaserFile] = useState<File | null>(null);
  const [voiceTeaserDuration, setVoiceTeaserDuration] = useState<number>(0);
  const [voiceTeaserPreviewUrl, setVoiceTeaserPreviewUrl] = useState<string>("");
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [teaserMediaRecorder, setTeaserMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [teaserAudioChunks, setTeaserAudioChunks] = useState<Blob[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const teaserAudioRef = useRef<HTMLAudioElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [tiers, setTiers] = useState({
    basic: {
      price: "",
      deliveryDays: "",
      maxDuration: "",
      requirements: "",
    },
    premium: {
      price: "",
      deliveryDays: "",
      maxDuration: "",
      requirements: "",
    },
    vip: {
      price: "",
      deliveryDays: "",
      maxDuration: "",
      requirements: "",
    },
  });

  const categories = [
    "ASMR", "Whisper Greeting", "Roleplay", "Sensual Story", "Voice-Over Commercial",
    "Product UGC", "Audio Messages", "Custom Scripts", "Guided Experience", "Sleep Aid",
    "Girlfriend Experience", "Dirty Talk", "Moaning/Sounds", "Phone Sex Simulation", "JOI",
    "Femdom/Domination", "Submissive", "Erotic Storytelling", "Fantasy Scenarios", "Meditation/Relaxation"
  ];

  // Recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'audio/webm' });
        setAudioFile(file);
        const url = URL.createObjectURL(blob);
        setAudioPreviewUrl(url);
        
        const audio = new Audio(url);
        audio.onloadedmetadata = () => {
          setAudioDuration(Math.round(audio.duration));
        };
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        setAudioDuration(Math.round(audio.duration));
      };
    }
  };

  // Voice teaser recording
  const startTeaserRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], `teaser-${Date.now()}.webm`, { type: 'audio/webm' });
        setVoiceTeaserFile(file);
        const url = URL.createObjectURL(blob);
        setVoiceTeaserPreviewUrl(url);
        
        const audio = new Audio(url);
        audio.onloadedmetadata = () => {
          setVoiceTeaserDuration(Math.round(audio.duration));
        };
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setTeaserMediaRecorder(recorder);
      setTeaserAudioChunks(chunks);
      setIsTeaserRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone');
    }
  };

  const stopTeaserRecording = () => {
    if (teaserMediaRecorder && teaserMediaRecorder.state === 'recording') {
      teaserMediaRecorder.stop();
      setIsTeaserRecording(false);
    }
  };

  const handleVoiceTeaserUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVoiceTeaserFile(file);
      const url = URL.createObjectURL(file);
      setVoiceTeaserPreviewUrl(url);
      
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        setVoiceTeaserDuration(Math.round(audio.duration));
      };
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleTeaserPlayback = () => {
    if (!teaserAudioRef.current) return;
    
    if (isTeaserPlaying) {
      teaserAudioRef.current.pause();
    } else {
      teaserAudioRef.current.play();
    }
    setIsTeaserPlaying(!isTeaserPlaying);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const updateTier = (tierName: 'basic' | 'premium' | 'vip', field: string, value: string) => {
    setTiers(prev => ({
      ...prev,
      [tierName]: {
        ...prev[tierName],
        [field]: value,
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!tiers.basic.price && !tiers.premium.price && !tiers.vip.price) {
      toast.error("Please set at least one pricing tier");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload sample audio (optional)
      let audioUrl = null;
      if (audioFile) {
        const audioExt = audioFile.name.split('.').pop();
        const audioFileName = `${user.id}-sample-${Date.now()}.${audioExt}`;
        const { error: audioUploadError } = await supabase.storage
          .from('audio-files')
          .upload(audioFileName, audioFile);

        if (!audioUploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('audio-files')
            .getPublicUrl(audioFileName);
          audioUrl = publicUrl;
        }
      }

      // 2. Upload voice teaser (optional)
      let voiceTeaserUrl = null;
      if (voiceTeaserFile) {
        const teaserExt = voiceTeaserFile.name.split('.').pop();
        const teaserFileName = `${user.id}-teaser-${Date.now()}.${teaserExt}`;
        const { error: teaserUploadError } = await supabase.storage
          .from('audio-files')
          .upload(teaserFileName, voiceTeaserFile);

        if (!teaserUploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('audio-files')
            .getPublicUrl(teaserFileName);
          voiceTeaserUrl = publicUrl;
        }
      }

      // 3. Upload thumbnail (optional)
      let thumbnailUrl = null;
      if (thumbnailFile) {
        const thumbExt = thumbnailFile.name.split('.').pop();
        const thumbFileName = `${user.id}-thumb-${Date.now()}.${thumbExt}`;
        const { error: thumbUploadError } = await supabase.storage
          .from('listing-photos')
          .upload(thumbFileName, thumbnailFile);

        if (!thumbUploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('listing-photos')
            .getPublicUrl(thumbFileName);
          thumbnailUrl = publicUrl;
        }
      }

      // 4. Create the listing
      const startingPrice = tiers.basic.price ? parseFloat(tiers.basic.price) : 
                           tiers.premium.price ? parseFloat(tiers.premium.price) : 
                           parseFloat(tiers.vip.price);

      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert({
          creator_id: user.id,
          listing_type: 'custom',
          title: formData.title,
          description: formData.description,
          category: selectedCategories[0] || null,
          content_type: 'voice',
          audio_url: audioUrl,
          audio_duration: audioDuration,
          voice_teaser_url: voiceTeaserUrl,
          thumbnail_url: thumbnailUrl,
          starting_price: startingPrice,
          is_instant_buy: false,
        })
        .select()
        .single();

      if (listingError) {
        toast.error("Error creating listing: " + listingError.message);
        return;
      }

      // 5. Create pricing tiers
      const tierData = [];
      
      if (tiers.basic.price) {
        tierData.push({
          listing_id: listing.id,
          tier_name: 'basic',
          price: parseFloat(tiers.basic.price),
          delivery_days: tiers.basic.deliveryDays ? parseInt(tiers.basic.deliveryDays) : null,
          max_duration_minutes: tiers.basic.maxDuration ? parseInt(tiers.basic.maxDuration) : null,
          custom_requirements: tiers.basic.requirements || 'Standard customization included',
          description: 'Basic Tier',
          revisions: 1,
        });
      }
      
      if (tiers.premium.price) {
        tierData.push({
          listing_id: listing.id,
          tier_name: 'premium',
          price: parseFloat(tiers.premium.price),
          delivery_days: tiers.premium.deliveryDays ? parseInt(tiers.premium.deliveryDays) : null,
          max_duration_minutes: tiers.premium.maxDuration ? parseInt(tiers.premium.maxDuration) : null,
          custom_requirements: tiers.premium.requirements || 'Extra customization included',
          description: 'Premium Tier',
          revisions: 3,
        });
      }
      
      if (tiers.vip.price) {
        tierData.push({
          listing_id: listing.id,
          tier_name: 'exclusive',
          price: parseFloat(tiers.vip.price),
          delivery_days: tiers.vip.deliveryDays ? parseInt(tiers.vip.deliveryDays) : null,
          max_duration_minutes: tiers.vip.maxDuration ? parseInt(tiers.vip.maxDuration) : null,
          custom_requirements: tiers.vip.requirements || 'Full customization included',
          description: 'VIP Tier',
          revisions: 999,
        });
      }

      if (tierData.length > 0) {
        const { error: tiersError } = await supabase
          .from('listing_tiers')
          .insert(tierData);

        if (tiersError) {
          console.error('Error creating tiers:', tiersError);
        }
      }

      toast.success("Custom listing created successfully!");
      navigate('/creator/dashboard');

    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/creator/upload')}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#19E28C] to-[#0FA368] flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Create Custom Listing</h1>
              <p className="text-white/60">Offer personalized voice work with flexible pricing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Record Your Own Section */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-[#19E28C]" />
              <h2 className="text-white">Record Sample (Optional)</h2>
              <p className="text-white/60 text-sm ml-auto">Show your voice style</p>
            </div>
            
            <div className="space-y-4">
              {!audioFile ? (
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  {!isRecording ? (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#19E28C] to-[#0FA368] flex items-center justify-center">
                        <Mic className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white mb-4">Record a sample to showcase your voice</p>
                      <Button type="button" onClick={startRecording} variant="gradient" className="bg-gradient-to-r from-[#19E28C] to-[#0FA368]">
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF0000] to-[#CC0000] flex items-center justify-center animate-pulse">
                        <Square className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white mb-4">Recording in progress...</p>
                      <Button type="button" onClick={stopRecording} variant="destructive">
                        <Square className="w-4 h-4 mr-2" />
                        Stop Recording
                      </Button>
                    </>
                  )}
                </div>
              ) : audioPreviewUrl && (
                <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-[#19E28C]/5 to-transparent border-[#19E28C]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#19E28C] to-[#0FA368] flex items-center justify-center">
                      <FileAudio className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white">Sample Audio</h3>
                      <p className="text-sm text-white/60">{formatDuration(audioDuration)}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setAudioFile(null);
                        setAudioPreviewUrl("");
                        setAudioDuration(0);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={togglePlayback}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <div className="flex-1">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#19E28C] to-[#0FA368] w-1/3" />
                        </div>
                      </div>
                    </div>
                    <audio ref={audioRef} src={audioPreviewUrl} onEnded={() => setIsPlaying(false)} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload Files Section */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-5 h-5 text-[#19E28C]" />
              <h2 className="text-white">Or Upload Sample Audio</h2>
            </div>
            
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#19E28C]/20 via-[#9E0B61]/20 to-[#19E28C]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-[#19E28C]/50 transition-all bg-white/5">
                  <input
                    type="file"
                    id="audio-upload"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <FileAudio className="w-12 h-12 mx-auto mb-3 text-[#19E28C]" />
                    <p className="text-white mb-2">
                      <span className="bg-gradient-to-r from-[#19E28C] to-[#9E0B61] bg-clip-text text-transparent">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-white/50 text-sm">MP3, WAV, or M4A (max. 100MB)</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Teaser */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-[#19E28C]" />
                <div>
                  <h2 className="text-white">Voice Teaser (Optional)</h2>
                  <p className="text-white/60 text-sm">Boost conversions by up to 3x</p>
                </div>
              </div>
              <Info className="w-5 h-5 text-white/40" />
            </div>
            
            {!voiceTeaserFile ? (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
                <input
                  type="file"
                  id="teaser-upload"
                  accept="audio/*"
                  onChange={handleVoiceTeaserUpload}
                  className="hidden"
                />
                <label htmlFor="teaser-upload" className="cursor-pointer">
                  <Play className="w-10 h-10 mx-auto mb-2 text-white/40" />
                  <p className="text-white/70 mb-1">Upload a short preview (15-30 seconds)</p>
                  <p className="text-white/40 text-sm">Let buyers hear your style before ordering</p>
                </label>
              </div>
            ) : (
              <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-[#19E28C]/5 to-transparent border-[#19E28C]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#19E28C] to-[#0FA368] flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white">Voice Teaser</h3>
                    <p className="text-sm text-white/60">{formatDuration(voiceTeaserDuration)}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setVoiceTeaserFile(null);
                      setVoiceTeaserPreviewUrl("");
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={toggleTeaserPlayback}
                    >
                      {isTeaserPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <div className="flex-1">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#19E28C] to-[#0FA368] w-1/3" />
                      </div>
                    </div>
                  </div>
                  <audio ref={teaserAudioRef} src={voiceTeaserPreviewUrl} onEnded={() => setIsTeaserPlaying(false)} />
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ImagePlus className="w-5 h-5 text-[#19E28C]" />
                <div>
                  <h2 className="text-white">Cover Image (Optional)</h2>
                  <p className="text-white/60 text-sm">Increases click-through rates</p>
                </div>
              </div>
            </div>
            
            {!thumbnailPreview ? (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
                <input
                  type="file"
                  id="thumbnail-upload"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <ImagePlus className="w-10 h-10 mx-auto mb-2 text-white/40" />
                  <p className="text-white/70 mb-1">Upload cover image</p>
                  <p className="text-white/40 text-sm">JPG or PNG (recommended: 1200x800px)</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-48 object-cover rounded-xl" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setThumbnailFile(null);
                    setThumbnailPreview("");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-white mb-6">Category</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenCategories(!openCategories)}
                  className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <span className="text-white/70">
                    {selectedCategories.length === 0 ? "Select category..." : `${selectedCategories.length} selected`}
                  </span>
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${openCategories ? 'rotate-180' : ''}`} />
                </Button>

                {openCategories && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenCategories(false)} />
                    <div className="absolute left-0 right-0 top-full mt-2 bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                      <div className="p-4 space-y-1">
                        {categories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all w-full text-left"
                          >
                            <div className={`flex h-4 w-4 items-center justify-center rounded border border-white/20 ${
                              selectedCategories.includes(category) 
                                ? "bg-gradient-to-r from-[#19E28C] to-[#0FA368]" 
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

              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#19E28C] to-[#0FA368] text-white text-sm"
                    >
                      <span>{category}</span>
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Listing Details */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-white mb-6">Listing Details</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-white/90">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Custom Sensual ASMR Experience"
                  className="mt-2 bg-white/5 border-white/10 text-white h-12"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white/90">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe what you offer. What makes your service unique? What can buyers request?"
                  rows={6}
                  className="mt-2 bg-white/5 border-white/10 text-white resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-5 h-5 text-[#19E28C]" />
              <h2 className="text-white">Pricing Tiers</h2>
            </div>
            
            <p className="text-white/60 mb-6">Set up different tiers with unique pricing and requirements</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Basic Tier */}
              <div className={`p-5 rounded-xl border-2 transition-all ${
                selectedTier === "basic"
                  ? "border-[#19E28C] bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-[#19E28C]" />
                  <span className="text-white">Basic</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-white/70 text-sm">Price (£) *</Label>
                    <Input
                      type="number"
                      placeholder="25"
                      value={tiers.basic.price}
                      onChange={(e) => updateTier('basic', 'price', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                      onFocus={() => setSelectedTier("basic")}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Delivery (days)
                    </Label>
                    <Input
                      type="number"
                      placeholder="3"
                      value={tiers.basic.deliveryDays}
                      onChange={(e) => updateTier('basic', 'deliveryDays', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm">Max duration (mins)</Label>
                    <Input
                      type="number"
                      placeholder="5"
                      value={tiers.basic.maxDuration}
                      onChange={(e) => updateTier('basic', 'maxDuration', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm">Requirements & Limits</Label>
                    <Textarea
                      placeholder="What you will/won't say, word limits, etc."
                      value={tiers.basic.requirements}
                      onChange={(e) => updateTier('basic', 'requirements', e.target.value)}
                      rows={4}
                      className="mt-1 bg-white/5 border-white/10 text-white text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Premium Tier */}
              <div className={`p-5 rounded-xl border-2 transition-all ${
                selectedTier === "premium"
                  ? "border-[#FFC34D] bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-[#FFC34D]" />
                  <span className="text-white">Premium</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-white/70 text-sm">Price (£) *</Label>
                    <Input
                      type="number"
                      placeholder="50"
                      value={tiers.premium.price}
                      onChange={(e) => updateTier('premium', 'price', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                      onFocus={() => setSelectedTier("premium")}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Delivery (days)
                    </Label>
                    <Input
                      type="number"
                      placeholder="2"
                      value={tiers.premium.deliveryDays}
                      onChange={(e) => updateTier('premium', 'deliveryDays', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm">Max duration (mins)</Label>
                    <Input
                      type="number"
                      placeholder="10"
                      value={tiers.premium.maxDuration}
                      onChange={(e) => updateTier('premium', 'maxDuration', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm">Requirements & Limits</Label>
                    <Textarea
                      placeholder="What you will/won't say, word limits, etc."
                      value={tiers.premium.requirements}
                      onChange={(e) => updateTier('premium', 'requirements', e.target.value)}
                      rows={4}
                      className="mt-1 bg-white/5 border-white/10 text-white text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* VIP Tier */}
              <div className={`p-5 rounded-xl border-2 transition-all ${
                selectedTier === "vip"
                  ? "border-[#9E0B61] bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-5 h-5 text-[#9E0B61]" />
                  <span className="text-white">VIP</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-white/70 text-sm">Price (£) *</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={tiers.vip.price}
                      onChange={(e) => updateTier('vip', 'price', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                      onFocus={() => setSelectedTier("vip")}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Delivery (days)
                    </Label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={tiers.vip.deliveryDays}
                      onChange={(e) => updateTier('vip', 'deliveryDays', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm">Max duration (mins)</Label>
                    <Input
                      type="number"
                      placeholder="20"
                      value={tiers.vip.maxDuration}
                      onChange={(e) => updateTier('vip', 'maxDuration', e.target.value)}
                      className="mt-1 bg-white/5 border-white/10 text-white h-10"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/70 text-sm">Requirements & Limits</Label>
                    <Textarea
                      placeholder="What you will/won't say, word limits, etc."
                      value={tiers.vip.requirements}
                      onChange={(e) => updateTier('vip', 'requirements', e.target.value)}
                      rows={4}
                      className="mt-1 bg-white/5 border-white/10 text-white text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => navigate('/creator/upload')}
              className="flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#19E28C] to-[#0FA368]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 mr-2" />
                  Create Custom Listing
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

