import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState, useEffect } from "react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function SignInPage() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, profile, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && profile) {
      if (profile.user_type === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/creator/dashboard');
      }
    }
  }, [profile, authLoading, navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password.";
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
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        setErrors({ submit: 'Invalid email or password. Please try again.' });
        setLoading(false);
        return;
      }

      // Success - AuthContext will handle profile fetch and redirect via useEffect
    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      setErrors({ submit: error.message });
      setLoading(false);
    }
    // OAuth redirect will handle the rest
  };

  return (
    <div className="min-h-screen bg-[#1A1B1E] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src={whisprLogo} alt="WHISPR" className="h-12" />
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-[#0e0e0e] rounded-2xl p-8 border border-white/10">
          <h1 className="mb-2" style={{ fontWeight: 700 }}>
            Sign in to WHISPR
          </h1>
          <p className="text-muted-foreground mb-6">
            Welcome back! Enter your details to continue
          </p>

          {/* Error message */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* Google Sign-in */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-6 rounded-full"
            onClick={handleGoogleSignIn}
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

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0e0e0e] text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`mt-1.5 rounded-full ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-[#9E0B61] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`rounded-full ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full rounded-full mt-6"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#9E0B61] hover:underline">
              Sign up
            </Link>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground px-4">
          WHISPR is a brand-safe platform. Explicit content is not permitted. Payments secured by Stripe.
        </div>
      </div>
    </div>
  );
}
