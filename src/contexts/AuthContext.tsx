import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Profile can be either a buyer or creator
type BuyerProfile = {
  id: string;
  email: string;
  display_name: string;
  profile_picture_url: string | null;
  created_at: string;
  updated_at: string;
  user_type: 'buyer';
};

type CreatorProfile = {
  id: string;
  email: string;
  display_name: string;
  profile_picture_url: string | null;
  bio: string | null;
  rating: number;
  total_completed_jobs: number;
  response_time: string;
  satisfaction_rate: number;
  created_at: string;
  updated_at: string;
  user_type: 'creator';
};

type UserProfile = BuyerProfile | CreatorProfile;

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string, userType: 'buyer' | 'creator') => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithApple: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from buyers or creators table
  const fetchProfile = async (userId: string) => {
    try {
      // Try to fetch from buyers table first
      const { data: buyerData, error: buyerError } = await supabase
        .from('buyers')
        .select('*')
        .eq('id', userId)
        .single();

      if (buyerData && !buyerError) {
        setProfile({ ...buyerData, user_type: 'buyer' } as BuyerProfile);
        return;
      }

      // If not a buyer, try creators table
      const { data: creatorData, error: creatorError } = await supabase
        .from('creators')
        .select('*')
        .eq('id', userId)
        .single();

      if (creatorData && !creatorError) {
        setProfile({ ...creatorData, user_type: 'creator' } as CreatorProfile);
        return;
      }

      // If neither found, set profile to null
      console.error('Profile not found in buyers or creators table');
      setProfile(null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    userType: 'buyer' | 'creator'
  ): Promise<{ error: AuthError | null }> => {
    try {
      console.log('🔵 [AuthContext] Starting signup process', { email, userType });
      
      // 1. Create auth user
      console.log('🔵 [AuthContext] Step 1: Creating auth user...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('🔴 [AuthContext] Auth signup failed:', authError);
        return { error: authError };
      }
      
      if (!authData.user) {
        console.error('🔴 [AuthContext] No user returned from signup');
        return { error: new Error('Failed to create user') as AuthError };
      }

      console.log('✅ [AuthContext] Auth user created:', {
        userId: authData.user.id,
        email: authData.user.email,
        role: authData.user.role,
      });

      // Check current session
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('🔵 [AuthContext] Current session after signup:', {
        hasSession: !!sessionData.session,
        sessionUserId: sessionData.session?.user?.id,
        matches: sessionData.session?.user?.id === authData.user.id,
      });

      // 2. Wait a moment for the session to propagate
      console.log('🔵 [AuthContext] Waiting 500ms for session to propagate...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // 3. Create user profile in the appropriate table
      const tableName = userType === 'buyer' ? 'buyers' : 'creators';
      console.log(`🔵 [AuthContext] Step 2: Creating profile in ${tableName} table...`, {
        id: authData.user.id,
        email: authData.user.email,
        display_name: displayName,
      });

      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          display_name: displayName,
        })
        .select()
        .single();

      if (profileError) {
        console.error('🔴 [AuthContext] Profile creation failed:', {
          error: profileError,
          code: profileError.code,
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint,
          table: tableName,
        });
        return { error: profileError as unknown as AuthError };
      }

      console.log('✅ [AuthContext] Profile created successfully:', profileData);

      // Check if email confirmation is required
      if (authData.session) {
        console.log('✅ [AuthContext] Session available immediately, user is confirmed');
        // Refresh profile
        console.log('🔵 [AuthContext] Step 3: Fetching profile...');
        await fetchProfile(authData.user.id);
      } else {
        console.log('⚠️ [AuthContext] No session - email confirmation required');
      }

      console.log('✅ [AuthContext] Signup completed successfully!');
      return { error: null };
    } catch (error) {
      console.error('🔴 [AuthContext] Unexpected signup error:', error);
      return { error: error as AuthError };
    }
  };

  // Sign in function
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  // Sign in with Google
  const signInWithGoogle = async (): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error };
  };

  // Sign in with Apple
  const signInWithApple = async (): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error };
  };

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  // Refresh profile manually
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

