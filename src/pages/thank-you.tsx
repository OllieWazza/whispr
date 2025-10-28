import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Check, 
  Download, 
  Heart, 
  Star, 
  ArrowRight, 
  Play,
  Pause,
  Volume2,
  VolumeX,
  AlertCircle,
  Sparkles,
  Package
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export function ThankYouPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  
  const { orderId, creatorId, total } = location.state || {};

  useEffect(() => {
    if (!orderId || !creatorId) {
      navigate('/');
      return;
    }
    
    fetchCreatorData();
    checkIfVideoPlayed();
  }, [orderId, creatorId]);

  const fetchCreatorData = async () => {
    try {
      const { data: creatorData } = await supabase
        .from('creators')
        .select('*, thank_you_video_url')
        .eq('id', creatorId)
        .single();

      if (creatorData) {
        setCreator(creatorData);
      }
    } catch (error) {
      console.error('Error fetching creator:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfVideoPlayed = () => {
    // Check if this video has been played before
    const playedVideos = JSON.parse(localStorage.getItem('whispr_played_videos') || '{}');
    if (playedVideos[orderId]) {
      setHasPlayed(true);
      setVideoEnded(true);
    }
  };

  const handlePlayVideo = () => {
    if (videoRef.current && !hasPlayed) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setVideoEnded(true);
    setHasPlayed(true);
    
    // Mark video as played
    const playedVideos = JSON.parse(localStorage.getItem('whispr_played_videos') || '{}');
    playedVideos[orderId] = {
      playedAt: new Date().toISOString(),
      creatorId: creatorId
    };
    localStorage.setItem('whispr_played_videos', JSON.stringify(playedVideos));
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Prevent right-click on video
  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Prevent download
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.controlsList.add('nodownload');
      video.disablePictureInPicture = true;
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Hero */}
      <div className="relative h-64 bg-gradient-to-r from-[#19E28C] via-[#19E28C]/80 to-[#19E28C]/60 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 animate-bounce">
            <Check className="w-8 h-8 text-[#19E28C]" />
          </div>
          <h1 className="text-white text-3xl md:text-4xl mb-2">Payment Successful!</h1>
          <p className="text-white/90 text-lg">
            Thank you for your order #{orderId}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Thank You Video Section */}
        {creator?.thank_you_video_url && (
          <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#9E0B61]" />
              <h2 className="text-xl">Personal Thank You from {creator.display_name}</h2>
            </div>
            
            {!hasPlayed ? (
              <div className="bg-gradient-to-br from-[#9E0B61]/10 to-transparent rounded-xl p-4 border border-[#9E0B61]/20 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#FFC34D] mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white/90 mb-2">
                      <strong>One-time viewing:</strong> This personal thank you message can only be played once and cannot be downloaded.
                    </p>
                    <p className="text-xs text-white/60">
                      Research shows that personal thank you messages increase recurring purchases by 45%!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-4 border border-white/10 mb-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#19E28C] mt-0.5 shrink-0" />
                  <p className="text-sm text-white/60">
                    This thank you message has already been played and is no longer available.
                  </p>
                </div>
              </div>
            )}

            <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
              {!hasPlayed ? (
                <>
                  <video
                    ref={videoRef}
                    src={creator.thank_you_video_url}
                    className="w-full h-full"
                    onEnded={handleVideoEnded}
                    onContextMenu={preventContextMenu}
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                  />
                  
                  {/* Custom Controls Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    {!isPlaying && !videoEnded && (
                      <button
                        onClick={handlePlayVideo}
                        className="w-16 h-16 rounded-full bg-[#9E0B61] flex items-center justify-center hover:bg-[#74094A] transition-all hover:scale-110"
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Controls */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handlePauseVideo}
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
                        >
                          <Pause className="w-5 h-5" />
                        </button>
                        <button
                          onClick={toggleMute}
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9E0B61]/20 to-black">
                  <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-3" />
                    <p className="text-white/60">This video has already been played</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl mb-6">
          <h2 className="text-xl mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              {creator?.profile_picture_url && (
                <ImageWithFallback
                  src={creator.profile_picture_url}
                  alt={creator.display_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#9E0B61]/50"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg mb-1">{creator?.display_name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFC34D] text-[#FFC34D]" />
                    <span className="text-sm text-white/60">{creator?.rating}</span>
                  </div>
                  <Badge className="bg-[#19E28C]/20 text-[#19E28C] border-0 text-xs">
                    Verified Creator
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60 mb-1">Order ID</p>
                <p className="font-mono">{orderId}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Total Paid</p>
                <p className="text-[#19E28C] text-lg">£{total?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl mb-6">
          <h2 className="text-xl mb-4">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0">
                <span className="text-sm text-[#E879F9]">1</span>
              </div>
              <div>
                <h4 className="mb-1">Order Confirmation</h4>
                <p className="text-sm text-white/60">
                  You'll receive an email confirmation with your order details.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0">
                <span className="text-sm text-[#E879F9]">2</span>
              </div>
              <div>
                <h4 className="mb-1">Creator Gets to Work</h4>
                <p className="text-sm text-white/60">
                  {creator?.display_name} will start working on your custom content right away.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#9E0B61]/20 flex items-center justify-center shrink-0">
                <span className="text-sm text-[#E879F9]">3</span>
              </div>
              <div>
                <h4 className="mb-1">Delivery & Download</h4>
                <p className="text-sm text-white/60">
                  Once complete, you'll be notified and can download your content from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            variant="gradient" 
            fullWidth 
            onClick={() => navigate('/buyer-dashboard')}
            className="gap-2"
          >
            <Package className="w-4 h-4" />
            View My Orders
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            onClick={() => navigate('/marketplace')}
            className="gap-2 bg-white/5 border-white/10 hover:bg-white/10"
          >
            <Sparkles className="w-4 h-4" />
            Browse More Content
          </Button>
        </div>

        {/* Leave Review CTA */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-2xl mt-6 bg-gradient-to-br from-[#9E0B61]/10 to-transparent border-[#9E0B61]/20">
          <div className="flex items-start gap-4">
            <Heart className="w-6 h-6 text-[#E879F9] shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg mb-2">Enjoyed your experience?</h3>
              <p className="text-sm text-white/60 mb-4">
                Help other buyers by leaving a review once you've received your content!
              </p>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-[#9E0B61]/20 gap-2">
                <Star className="w-4 h-4" />
                Leave a Review Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

