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
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) return { error: authError };
      if (!authData.user) return { error: new Error('Failed to create user') as AuthError };

      // 2. Create user profile in the appropriate table
      const tableName = userType === 'buyer' ? 'buyers' : 'creators';
      const { error: profileError } = await supabase
        .from(tableName)
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          display_name: displayName,
        });

      if (profileError) {
        // If profile creation fails, we should ideally delete the auth user
        // but Supabase doesn't allow this from client side
        console.error('Profile creation error:', profileError);
        return { error: profileError as unknown as AuthError };
      }

      // Refresh profile
      await fetchProfile(authData.user.id);

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
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

