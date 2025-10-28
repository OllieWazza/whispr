import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
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
  Zap,
  DollarSign,
  Info
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export function UploadInstantPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  console.log('🟢 [Upload] Component mounted/rendered. User:', user?.id);
  
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTeaserPlaying, setIsTeaserPlaying] = useState(false);
  const [isTeaserRecording, setIsTeaserRecording] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
    price: "",
    maxQuantity: "",
    revokeAfterListen: false,
  });

  const [priceMilestones, setPriceMilestones] = useState([
    { atQuantity: "", newPrice: "" }
  ]);

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
        
        // Get duration
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

  // Audio file upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      
      // Get duration
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

  // Voice teaser upload
  const handleVoiceTeaserUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVoiceTeaserFile(file);
      const url = URL.createObjectURL(file);
      setVoiceTeaserPreviewUrl(url);
      
      // Get duration
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        setVoiceTeaserDuration(Math.round(audio.duration));
      };
    }
  };

  // Thumbnail upload
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Audio playback
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

  const addPriceMilestone = () => {
    setPriceMilestones([...priceMilestones, { atQuantity: "", newPrice: "" }]);
  };

  const removePriceMilestone = (index: number) => {
    setPriceMilestones(priceMilestones.filter((_, i) => i !== index));
  };

  const updatePriceMilestone = (index: number, field: 'atQuantity' | 'newPrice', value: string) => {
    const updated = [...priceMilestones];
    updated[index][field] = value;
    setPriceMilestones(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔵 [Upload] Form submitted!');
    console.log('🔵 [Upload] Form data:', formData);
    console.log('🔵 [Upload] Audio file:', audioFile);
    console.log('🔵 [Upload] User:', user);
    
    if (!user) {
      console.error('❌ [Upload] No user found!');
      toast.error("You must be logged in to create a listing");
      return;
    }

    console.log('✅ [Upload] User authenticated:', user.id);

    // Validation
    console.log('🔵 [Upload] Validating form...');
    console.log('🔵 [Upload] Title:', formData.title);
    console.log('🔵 [Upload] Description:', formData.description);
    console.log('🔵 [Upload] Audio file:', audioFile?.name);
    
    if (!formData.title || !formData.description || !audioFile) {
      console.error('❌ [Upload] Validation failed - missing required fields');
      toast.error("Please fill in all required fields and upload audio");
      return;
    }

    if (!formData.price) {
      console.error('❌ [Upload] Validation failed - no price set');
      toast.error("Please set a price");
      return;
    }

    console.log('✅ [Upload] Validation passed!');

    try {
      setLoading(true);
      console.log('🔵 [Upload] Starting upload process...');

      // 1. Upload audio file
      console.log('🔵 [Upload] Step 1: Uploading audio file...');
      const audioExt = audioFile.name.split('.').pop();
      const audioFileName = `${user.id}-audio-${Date.now()}.${audioExt}`;
      console.log('🔵 [Upload] Audio filename:', audioFileName);
      
      const { error: audioUploadError } = await supabase.storage
        .from('audio-files')
        .upload(audioFileName, audioFile);

      if (audioUploadError) {
        console.error('❌ [Upload] Audio upload error:', audioUploadError);
        toast.error("Error uploading audio: " + audioUploadError.message);
        setLoading(false);
        return;
      }

      const { data: { publicUrl: audioUrl } } = supabase.storage
        .from('audio-files')
        .getPublicUrl(audioFileName);
      
      console.log('✅ [Upload] Audio uploaded successfully:', audioUrl);

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

      // 4. Prepare price milestones
      console.log('🔵 [Upload] Step 4: Preparing price milestones...');
      const validMilestones = priceMilestones
        .filter(m => m.atQuantity && m.newPrice)
        .map(m => ({ at_quantity: parseInt(m.atQuantity), new_price: parseFloat(m.newPrice) }));
      console.log('🔵 [Upload] Valid milestones:', validMilestones);

      // 5. Create the listing
      console.log('🔵 [Upload] Step 5: Creating listing in database...');
      const listingData = {
        creator_id: user.id,
        listing_type: 'instant',
        title: formData.title,
        description: formData.description,
        category: selectedCategories[0] || null,
        content_type: 'voice',
        audio_url: audioUrl,
        audio_duration: audioDuration,
        voice_teaser_url: voiceTeaserUrl,
        thumbnail_url: thumbnailUrl,
        instant_buy_price: parseFloat(formData.price),
        starting_price: parseFloat(formData.price),
        max_quantity: formData.maxQuantity ? parseInt(formData.maxQuantity) : null,
        quantity_sold: 0,
        price_milestones: validMilestones.length > 0 ? validMilestones : null,
        revoke_access_after_listen: formData.revokeAfterListen,
        is_instant_buy: true,
      };
      
      console.log('🔵 [Upload] Listing data to insert:', listingData);
      
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
        .single();

      if (listingError) {
        console.error('❌ [Upload] Listing creation error:', listingError);
        console.error('❌ [Upload] Error details:', {
          message: listingError.message,
          details: listingError.details,
          hint: listingError.hint,
          code: listingError.code
        });
        toast.error("Error creating listing: " + listingError.message);
        setLoading(false);
        return;
      }

      console.log('✅ [Upload] Listing created successfully!', listing);
      toast.success("Instant buy listing created successfully!");
      navigate('/creator/dashboard');

    } catch (error: any) {
      console.error('❌ [Upload] Unexpected error:', error);
      console.error('❌ [Upload] Error stack:', error.stack);
      toast.error("An unexpected error occurred: " + (error.message || 'Unknown error'));
    } finally {
      console.log('🔵 [Upload] Finished, setting loading to false');
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Create Instant Buy</h1>
              <p className="text-white/60">Upload exclusive audio content for instant purchase</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Combined Audio Upload/Record Section */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white">Your Audio *</h2>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={audioInputMethod === 'record' ? 'default' : 'outline'}
                  onClick={() => setAudioInputMethod('record')}
                  className={audioInputMethod === 'record' ? 'bg-[#9E0B61]' : ''}
                >
                  <Mic className="w-4 h-4 mr-1" />
                  Record
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={audioInputMethod === 'upload' ? 'default' : 'outline'}
                  onClick={() => setAudioInputMethod('upload')}
                  className={audioInputMethod === 'upload' ? 'bg-[#9E0B61]' : ''}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </div>
            </div>

            {!audioFile ? (
              audioInputMethod === 'record' ? (
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  {!isRecording ? (
                    <>
                      <Mic className="w-12 h-12 mx-auto mb-3 text-[#9E0B61]" />
                      <p className="text-white/70 mb-3 text-sm">Record directly in your browser</p>
                      <Button type="button" onClick={startRecording} size="sm" className="bg-[#9E0B61]">
                        Start Recording
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                        <Square className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white mb-3 text-sm">Recording...</p>
                      <Button type="button" onClick={stopRecording} size="sm" variant="destructive">
                        Stop
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#9E0B61]/50 transition">
                  <input type="file" id="audio-upload" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <FileAudio className="w-12 h-12 mx-auto mb-3 text-[#9E0B61]" />
                    <p className="text-white/70 mb-1 text-sm">Click to upload audio file</p>
                    <p className="text-white/40 text-xs">MP3, WAV, or M4A (max. 100MB)</p>
                  </label>
                </div>
              )
            ) : (
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9E0B61] to-[#74094A] flex items-center justify-center">
                    <FileAudio className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm">Audio File</h3>
                    <p className="text-white/60 text-xs">{formatDuration(audioDuration)}</p>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => { setAudioFile(null); setAudioPreviewUrl(""); setAudioDuration(0); }}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Button type="button" size="icon" variant="outline" className="h-8 w-8" onClick={togglePlayback}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <div className="flex-1">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#9E0B61] to-[#E879F9] w-1/3" />
                      </div>
                    </div>
                  </div>
                  <audio ref={audioRef} src={audioPreviewUrl} onEnded={() => setIsPlaying(false)} />
                </div>
              </div>
            )}
          </div>

          {/* Combined Voice Teaser Section */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white text-sm">Voice Teaser (Optional)</h2>
                <p className="text-white/50 text-xs">Boosts conversions by up to 3x</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={teaserInputMethod === 'record' ? 'default' : 'outline'}
                  onClick={() => setTeaserInputMethod('record')}
                  className={teaserInputMethod === 'record' ? 'bg-[#19E28C]' : ''}
                >
                  <Mic className="w-3 h-3 mr-1" />
                  Record
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={teaserInputMethod === 'upload' ? 'default' : 'outline'}
                  onClick={() => setTeaserInputMethod('upload')}
                  className={teaserInputMethod === 'upload' ? 'bg-[#19E28C]' : ''}
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Upload
                </Button>
              </div>
            </div>

            {!voiceTeaserFile ? (
              teaserInputMethod === 'record' ? (
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  {!isTeaserRecording ? (
                    <>
                      <Mic className="w-10 h-10 mx-auto mb-2 text-[#19E28C]" />
                      <p className="text-white/70 mb-2 text-xs">Record 15-30 second preview</p>
                      <Button type="button" onClick={startTeaserRecording} size="sm" className="bg-[#19E28C]">
                        Start Recording
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                        <Square className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white mb-2 text-xs">Recording...</p>
                      <Button type="button" onClick={stopTeaserRecording} size="sm" variant="destructive">
                        Stop
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center">
                  <input type="file" id="teaser-upload" accept="audio/*" onChange={handleVoiceTeaserUpload} className="hidden" />
                  <label htmlFor="teaser-upload" className="cursor-pointer">
                    <Play className="w-10 h-10 mx-auto mb-2 text-white/40" />
                    <p className="text-white/70 text-xs">Upload preview audio</p>
                  </label>
                </div>
              )
            ) : (
              <div className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#19E28C] to-[#0FA368] flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-xs">Teaser</p>
                    <p className="text-white/60 text-xs">{formatDuration(voiceTeaserDuration)}</p>
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setVoiceTeaserFile(null); setVoiceTeaserPreviewUrl(""); }}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <div className="bg-black/30 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <Button type="button" size="icon" variant="outline" className="h-7 w-7" onClick={toggleTeaserPlayback}>
                      {isTeaserPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </Button>
                    <div className="flex-1">
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#19E28C] to-[#0FA368] w-1/3" />
                      </div>
                    </div>
                  </div>
                  <audio ref={teaserAudioRef} src={voiceTeaserPreviewUrl} onEnded={() => setIsTeaserPlaying(false)} />
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Upload (Optional) */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ImagePlus className="w-5 h-5 text-[#9E0B61]" />
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
                                ? "bg-gradient-to-r from-[#9E0B61] to-[#74094A]" 
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
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#9E0B61] to-[#74094A] text-white text-sm"
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
                  placeholder="e.g., Exclusive Intimate Whispers Collection"
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
                  placeholder="Describe your audio content. What makes it special? What will buyers experience?"
                  rows={6}
                  className="mt-2 bg-white/5 border-white/10 text-white resize-none"
                  required
                />
              </div>

              {audioDuration > 0 && (
                <div className="p-4 bg-white/5 rounded-xl">
                  <Label className="text-white/90">Duration</Label>
                  <p className="text-[#19E28C] text-lg mt-1">{formatDuration(audioDuration)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-5 h-5 text-[#9E0B61]" />
              <h2 className="text-white">Pricing & Availability</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price" className="text-white/90">Price (£) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="25"
                    min="1"
                    step="0.01"
                    className="mt-2 bg-white/5 border-white/10 text-white h-12"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="maxQuantity" className="text-white/90">Max Quantity (Optional)</Label>
                  <Input
                    id="maxQuantity"
                    type="number"
                    value={formData.maxQuantity}
                    onChange={(e) => setFormData({...formData, maxQuantity: e.target.value})}
                    placeholder="Leave empty for unlimited"
                    min="1"
                    className="mt-2 bg-white/5 border-white/10 text-white h-12"
                  />
                  <p className="text-white/40 text-sm mt-1">Limit sales for exclusivity</p>
                </div>
              </div>

              {/* Price Milestones */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="text-white/90">Price Milestones (Optional)</Label>
                    <p className="text-white/50 text-sm">Increase price as demand grows</p>
                  </div>
                  <Button type="button" onClick={addPriceMilestone} variant="outline" size="sm">
                    Add Milestone
                  </Button>
                </div>

                <div className="space-y-3">
                  {priceMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={milestone.atQuantity}
                        onChange={(e) => updatePriceMilestone(index, 'atQuantity', e.target.value)}
                        placeholder="Quantity"
                        className="bg-white/5 border-white/10 text-white h-10"
                      />
                      <span className="text-white/40">→</span>
                      <Input
                        type="number"
                        value={milestone.newPrice}
                        onChange={(e) => updatePriceMilestone(index, 'newPrice', e.target.value)}
                        placeholder="New price"
                        step="0.01"
                        className="bg-white/5 border-white/10 text-white h-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePriceMilestone(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-sm mt-2">Example: At 100 sales, price increases to £30</p>
              </div>

              {/* Revoke Access Option */}
              <div className="flex items-start space-x-3 pt-4 border-t border-white/10">
                <Checkbox 
                  id="revokeAccess" 
                  checked={formData.revokeAfterListen}
                  onCheckedChange={(checked) => setFormData({...formData, revokeAfterListen: checked as boolean})}
                  className="mt-1 border-white/30"
                />
                <div className="flex-1">
                  <label htmlFor="revokeAccess" className="text-white/90 cursor-pointer">
                    Revoke access after listening
                  </label>
                  <p className="text-white/50 text-sm mt-1">
                    Audio is deleted after buyer listens once. Creates urgency and prevents sharing.
                  </p>
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
              className="flex-1 bg-gradient-to-r from-[#9E0B61] to-[#74094A]"
              onClick={() => console.log('🔵 [Upload] Button clicked! Loading:', loading)}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Create Instant Buy
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

