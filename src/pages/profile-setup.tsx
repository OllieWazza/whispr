import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { AlertCircle, Upload, Mic, Play, Pause, X, Camera, ImageIcon, Loader2, Check } from "lucide-react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

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

export function ProfileSetupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const [formData, setFormData] = useState({
    displayName: profile?.display_name || "",
    bio: profile?.bio || "",
    profilePicture: null as File | null,
    profilePicturePreview: profile?.profile_picture_url || whispr4,
    selectedDefaultPicture: "whispr4", // Default selection
    headerImage: null as File | null,
    headerImagePreview: "",
    voiceNote: null as File | null,
    voiceNotePreview: "",
  });

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // Check for email verification errors in URL
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      console.error('🔴 [ProfileSetup] Email verification error:', error, errorDescription);
      setErrors({ submit: errorDescription || 'Email verification failed. Please try again.' });
    }
  }, [searchParams]);

  const handleDefaultPictureSelect = (pictureId: string, pictureSrc: string) => {
    setFormData({
      ...formData,
      profilePicture: null, // Clear custom upload
      profilePicturePreview: pictureSrc,
      selectedDefaultPicture: pictureId,
    });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
        profilePicturePreview: URL.createObjectURL(file),
        selectedDefaultPicture: "", // Clear default selection
      });
    }
  };

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        headerImage: file,
        headerImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleVoiceNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        voiceNote: file,
        voiceNotePreview: URL.createObjectURL(file),
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], 'voice-note.webm', { type: 'audio/webm' });
        setFormData({
          ...formData,
          voiceNote: file,
          voiceNotePreview: URL.createObjectURL(blob),
        });
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setAudioChunks(chunks);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setErrors({ voiceNote: 'Unable to access microphone' });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!user) {
      console.error('🔴 [ProfileSetup] No user found');
      console.error('🔴 [ProfileSetup] Please make sure you verified your email and are logged in');
      setErrors({ submit: "You must be logged in to set up your profile. Please verify your email and try again." });
      return;
    }
    
    console.log('🔵 [ProfileSetup] Starting profile setup for user:', user.email);

    setLoading(true);
    setErrors({});

    try {
      // Handle profile picture - either default or uploaded
      let profilePictureUrl = profile?.profile_picture_url || "";
      if (formData.profilePicture) {
        // Custom upload
        const fileExt = formData.profilePicture.name.split('.').pop();
        const fileName = `${user.id}-profile-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, formData.profilePicture);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        profilePictureUrl = publicUrl;
      } else if (formData.selectedDefaultPicture) {
        // Use default picture - store the preview URL (asset path)
        profilePictureUrl = formData.profilePicturePreview;
      }

      // Upload header image if provided
      let headerImageUrl = "";
      if (formData.headerImage) {
        const fileExt = formData.headerImage.name.split('.').pop();
        const fileName = `${user.id}-header-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('headers')
          .upload(fileName, formData.headerImage);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('headers')
          .getPublicUrl(fileName);
        
        headerImageUrl = publicUrl;
      }

      // Upload voice note if provided
      let voiceNoteUrl = "";
      if (formData.voiceNote) {
        const fileExt = formData.voiceNote.name.split('.').pop();
        const fileName = `${user.id}-voice-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('voice-notes')
          .upload(fileName, formData.voiceNote);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('voice-notes')
          .getPublicUrl(fileName);
        
        voiceNoteUrl = publicUrl;
      }

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('creators')
        .select('id')
        .eq('id', user.id)
        .single();

      if (existingProfile) {
        // Update existing profile
        console.log('🔵 [ProfileSetup] Updating existing creator profile...');
        const { error: updateError } = await supabase
          .from('creators')
          .update({
            display_name: formData.displayName,
            bio: formData.bio,
            profile_picture_url: profilePictureUrl,
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
      } else {
        // Create new profile (in case it wasn't created during signup)
        console.log('🔵 [ProfileSetup] Creating new creator profile...');
        const { error: insertError } = await supabase
          .from('creators')
          .insert({
            id: user.id,
            email: user.email!,
            display_name: formData.displayName,
            bio: formData.bio,
            profile_picture_url: profilePictureUrl,
          });

        if (insertError) throw insertError;
      }

      console.log('✅ [ProfileSetup] Profile setup complete!');
      
      // Refresh the profile in AuthContext before navigating
      console.log('🔄 [ProfileSetup] Refreshing profile...');
      await refreshProfile();
      
      console.log('🔵 [ProfileSetup] Profile refreshed, navigating to /my-profile');
      // Navigate to user's profile page
      navigate('/my-profile');
    } catch (error: any) {
      console.error('Profile setup error:', error);
      setErrors({ submit: error.message || 'Failed to set up profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen liquid-gradient flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61]/20 via-transparent to-[#74094A]/20"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <img src={whisprLogo} alt="WHISPR" className="h-10 sm:h-12" />
        </div>

        {/* Main Card */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <h1 className="mb-2 text-white" style={{ fontWeight: 700 }}>
            Set up your creator profile
          </h1>
          <p className="text-white/70 mb-6">
            Complete your profile to start earning on WHISPR
          </p>

          {/* Error message */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div>
              <Label htmlFor="displayName" className="text-white">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Your creator name"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className={`mt-1.5 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-xl ${errors.displayName ? "border-red-500" : ""}`}
              />
              {errors.displayName && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.displayName}
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell buyers about yourself and what you offer..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className={`mt-1.5 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-xl resize-none ${errors.bio ? "border-red-500" : ""}`}
              />
              {errors.bio && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.bio}
                </div>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <Label className="text-white mb-3 block">Profile Picture</Label>
              
              {/* Default Picture Selection - Single Row */}
              <div className="mb-4">
                <p className="text-white/70 text-sm mb-3">Choose a default picture or upload your own</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {defaultProfilePictures.map((pic) => (
                    <button
                      key={pic.id}
                      type="button"
                      onClick={() => handleDefaultPictureSelect(pic.id, pic.src)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        formData.selectedDefaultPicture === pic.id
                          ? "border-[#9E0B61] ring-2 ring-[#9E0B61]/50 scale-105"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <img src={pic.src} alt={`Profile ${pic.id}`} className="w-full h-full object-cover" />
                      {formData.selectedDefaultPicture === pic.id && (
                        <div className="absolute inset-0 bg-[#9E0B61]/30 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-[#9E0B61] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Upload */}
              <div className="flex items-center gap-4">
                {formData.profilePicturePreview ? (
                  <div className="relative">
                    <img 
                      src={formData.profilePicturePreview}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profilePicture: null, profilePicturePreview: "" })}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white/40" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                  <label htmlFor="profilePicture">
                    <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </span>
                    </Button>
                  </label>
                  <p className="text-xs text-white/50 mt-2">JPG, PNG or GIF (max. 5MB)</p>
                </div>
              </div>
            </div>

            {/* Header Image */}
            <div>
              <Label className="text-white mb-2 block">Header Image (Optional)</Label>
              <div className="relative">
                {formData.headerImagePreview ? (
                  <div className="relative">
                    <img 
                      src={formData.headerImagePreview}
                      alt="Header preview"
                      className="w-full h-32 rounded-xl object-cover border border-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, headerImage: null, headerImagePreview: "" })}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-32 rounded-xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white/40 mb-2" />
                    <p className="text-sm text-white/60">Upload header image</p>
                  </div>
                )}
                <input
                  type="file"
                  id="headerImage"
                  accept="image/*"
                  onChange={handleHeaderImageChange}
                  className="hidden"
                />
                <label htmlFor="headerImage">
                  <Button type="button" variant="outline" size="sm" className="mt-2 cursor-pointer" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      {formData.headerImagePreview ? 'Change' : 'Upload'} Header
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            {/* Voice Note */}
            <div>
              <Label className="text-white mb-2 block">Voice Introduction (Optional)</Label>
              <div className="space-y-3">
                {formData.voiceNotePreview ? (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        const audio = new Audio(formData.voiceNotePreview);
                        if (isPlaying) {
                          audio.pause();
                          setIsPlaying(false);
                        } else {
                          audio.play();
                          setIsPlaying(true);
                          audio.onended = () => setIsPlaying(false);
                        }
                      }}
                      className="shrink-0"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <div className="flex-1">
                      <p className="text-sm text-white">Voice note recorded</p>
                      <p className="text-xs text-white/50">Click play to preview</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, voiceNote: null, voiceNotePreview: "" })}
                      className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex-1 ${isRecording ? 'bg-red-500/10 border-red-500/50' : ''}`}
                    >
                      <Mic className={`w-4 h-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                      {isRecording ? 'Stop Recording' : 'Record Voice Note'}
                    </Button>
                    <div className="relative">
                      <input
                        type="file"
                        id="voiceNote"
                        accept="audio/*"
                        onChange={handleVoiceNoteChange}
                        className="hidden"
                      />
                      <label htmlFor="voiceNote">
                        <Button type="button" variant="outline" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
                <p className="text-xs text-white/50">Record or upload a short introduction (max. 2 minutes)</p>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="gradient" 
              className="w-full rounded-full mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Setting up profile...
                </>
              ) : (
                'Complete Setup'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

