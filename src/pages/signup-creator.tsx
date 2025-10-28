import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { useState } from "react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";
import { AlertCircle, ShieldAlert, CreditCard } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function SignupCreatorPage() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ageConfirmed: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Passwords must be at least 6 characters.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Passwords must be at least 6 characters.";
    }

    if (!formData.ageConfirmed) {
      newErrors.ageConfirmed = "Please confirm you are 18 or older.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Use email prefix as temporary display name (will be set properly on profile-setup)
      const tempDisplayName = formData.email.split('@')[0];
      
      const { error, needsEmailConfirmation } = await signUp(
        formData.email,
        formData.password,
        tempDisplayName,
        'creator'
      );

      if (error) {
        setErrors({ submit: error.message });
        setLoading(false);
        return;
      }

      // Success!
      if (needsEmailConfirmation) {
        // Redirect to success page to wait for email confirmation
        navigate('/signup/success?type=creator&email=' + encodeURIComponent(formData.email));
      } else {
        // Email confirmed automatically, go to profile setup
        navigate('/profile-setup');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      setErrors({ submit: error.message });
      setLoading(false);
    }
    // OAuth redirect will handle the rest
  };

  return (
    <div className="min-h-screen liquid-gradient flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E0B61]/20 via-transparent to-[#74094A]/20"></div>
      </div>
      
      {/* Floating light orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-48 sm:h-80 bg-[#19E28C]/30 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Link to="/">
            <img src={whisprLogo} alt="WHISPR" className="h-10 sm:h-12" />
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="mb-6">
            <Link to="/signup" className="text-sm text-white/70 hover:text-white">
              ← Back
            </Link>
          </div>

          <h1 className="mb-2 text-white" style={{ fontWeight: 700 }}>
            Create creator account
          </h1>
          <p className="text-white/70 mb-6">
            Start earning by creating personalised content
          </p>

          {/* Error message */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* Google Sign-up */}
          <Button
            type="button"
            variant="glass-white"
            className="w-full mb-3 rounded-full"
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-xs text-white/50 mb-6">Or continue with email</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`mt-1.5 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-xl ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (min. 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`mt-1.5 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-xl ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="glass-white" 
              className="w-full rounded-full mt-2"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Continue'}
            </Button>

            {/* Age Confirmation Checkbox */}
            <div className="pt-3">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="ageConfirm"
                  checked={formData.ageConfirmed}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, ageConfirmed: checked as boolean })
                  }
                  className={errors.ageConfirmed ? "border-red-500 mt-0.5" : "mt-0.5"}
                />
                <Label htmlFor="ageConfirm" className="text-xs leading-relaxed cursor-pointer text-white/70">
                  I confirm I am 18 or older
                </Label>
              </div>
              {errors.ageConfirmed && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.ageConfirmed}
                </div>
              )}
            </div>

            {/* Terms and Privacy */}
            <p className="text-xs text-center text-white/50 pt-1">
              By continuing, you agree to WHISPR's{" "}
              <Link to="/terms" className="text-white/70 hover:text-white underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-white/70 hover:text-white underline">
                Privacy Policy
              </Link>
            </p>
          </form>

          {/* Future Steps Preview */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-xs text-white/50 mb-4">Up next:</p>
            
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white" style={{ fontWeight: 600 }}>Connect payout method</div>
                <div className="text-xs text-white/50">Stripe Connect (coming soon)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="mt-4 sm:mt-6 text-center text-xs text-white/50 px-2">
          WHISPR is a brand-safe platform. Explicit content is not permitted. Payments secured by Stripe.
        </div>
      </div>
    </div>
  );
}
