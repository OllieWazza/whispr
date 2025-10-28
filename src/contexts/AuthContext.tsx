import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
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
  pendingUserData: { userType: 'buyer' | 'creator', displayName: string } | null;
  signUp: (email: string, password: string, displayName: string, userType: 'buyer' | 'creator') => Promise<{ error: AuthError | null; needsEmailConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithApple: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  createProfileAfterConfirmation: (userId: string, email: string, displayName: string, userType: 'buyer' | 'creator') => Promise<{ error: any | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingUserData, setPendingUserData] = useState<{ userType: 'buyer' | 'creator', displayName: string } | null>(null);
  
  // Prevent concurrent profile fetches
  const isFetchingProfile = useRef(false);
  
  // Track if initial session has been processed to avoid duplicate fetches during init
  const hasProcessedInitialSession = useRef(false);

  // Helper function to add timeout to any promise
  const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number, timeoutError: string): Promise<T> => {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => 
        setTimeout(() => reject(new Error(timeoutError)), timeoutMs)
      )
    ]);
  };

  // Fetch user profile from buyers or creators table
  const fetchProfile = async (userId: string, retainOnFail: boolean = false) => {
    console.log('🎯 [AuthContext] fetchProfile called for user:', userId, 'retainOnFail:', retainOnFail);
    console.log('🎯 [AuthContext] isFetchingProfile.current:', isFetchingProfile.current);
    
    // Prevent concurrent fetches
    if (isFetchingProfile.current) {
      console.warn('⏭️ [AuthContext] ⚠️  Already fetching profile, SKIPPING to prevent race condition');
      return;
    }
    
    isFetchingProfile.current = true;
    console.log('🎯 [AuthContext] Set isFetchingProfile.current = true');
    
    try {
      console.log('🔵 [AuthContext] 📋 Starting profile fetch for user:', userId);
      console.log('🔵 [AuthContext] Current profile state before fetch:', profile?.user_type, profile?.display_name);
      
      // Try to fetch from buyers table first
      console.log('🔍 [AuthContext] Step 1: Querying buyers table...');
      console.log('🔍 [AuthContext] Query details: table=buyers, id=', userId);
      const buyersQueryStart = Date.now();
      
      let buyerData = null;
      let buyerError: any = null;
      
      try {
        console.log('🔍 [AuthContext] Executing buyers query NOW...');
        console.log('🔍 [AuthContext] Starting buyers table query with 2s timeout...');
        
        // Use maybeSingle() instead of single() to avoid 406 errors on empty results
        const result = await withTimeout(
          supabase
            .from('buyers')
            .select('*')
            .eq('id', userId)
            .maybeSingle(),
          2000,
          'Buyers query timeout after 2 seconds'
        );
        
        console.log('🔍 [AuthContext] Buyers query returned!', result);
        
        buyerData = result.data;
        buyerError = result.error;
        
        const queryTime = Date.now() - buyersQueryStart;
        console.log('🔍 [AuthContext] Buyers query completed in', queryTime, 'ms');
        console.log('🔍 [AuthContext] Buyer data:', buyerData);
        console.log('🔍 [AuthContext] Buyer error:', buyerError);
      } catch (error) {
        const err = error as Error;
        if (err.message?.includes('timeout')) {
          console.error('⏱️ [AuthContext] Buyers query TIMED OUT after 2 seconds!');
          buyerError = { code: 'TIMEOUT', message: 'Query timed out', details: err.message };
        } else {
          console.error('💥 [AuthContext] Buyers query threw exception:', error);
          console.error('💥 [AuthContext] Exception details:', {
            name: err?.name,
            message: err?.message,
            stack: err?.stack
          });
          buyerError = error;
        }
      }

      if (buyerError && buyerError.code !== 'PGRST116') {
        console.log('⚠️ [AuthContext] Buyer fetch error (code:', buyerError.code, '):', buyerError.message);
      }

      if (buyerData && !buyerError) {
        console.log('✅ [AuthContext] 👤 Found buyer profile:', buyerData.display_name);
        const newProfile = { ...buyerData, user_type: 'buyer' } as BuyerProfile;
        setProfile(newProfile);
        console.log('✅ [AuthContext] Profile state updated to buyer:', newProfile.display_name);
        console.log('🏁 [AuthContext] Profile fetch completed (BUYER)');
        return;
      } else {
        console.log('⏭️ [AuthContext] No buyer profile, checking creators table...');
      }

      // If not a buyer, try creators table
      console.log('🔍 [AuthContext] Step 2: Querying creators table...');
      console.log('🔍 [AuthContext] Query details: table=creators, id=', userId);
      const creatorsQueryStart = Date.now();
      
      let creatorData = null;
      let creatorError: any = null;
      
      try {
        console.log('🔍 [AuthContext] Executing creators query NOW...');
        console.log('🔍 [AuthContext] Starting creators table query with 2s timeout...');
        
        // Use maybeSingle() instead of single() to avoid 406 errors on empty results
        const result = await withTimeout(
          supabase
            .from('creators')
            .select('*')
            .eq('id', userId)
            .maybeSingle(),
          2000,
          'Creators query timeout after 2 seconds'
        );
        
        console.log('🔍 [AuthContext] Creators query returned!', result);
        
        creatorData = result.data;
        creatorError = result.error;
        
        const queryTime = Date.now() - creatorsQueryStart;
        console.log('🔍 [AuthContext] Creators query completed in', queryTime, 'ms');
        console.log('🔍 [AuthContext] Creator data:', creatorData);
        console.log('🔍 [AuthContext] Creator error:', creatorError);
      } catch (error) {
        const err = error as Error;
        if (err.message?.includes('timeout')) {
          console.error('⏱️ [AuthContext] Creators query TIMED OUT after 2 seconds!');
          creatorError = { code: 'TIMEOUT', message: 'Query timed out', details: err.message };
        } else {
          console.error('💥 [AuthContext] Creators query threw exception:', error);
          console.error('💥 [AuthContext] Exception details:', {
            name: err?.name,
            message: err?.message,
            stack: err?.stack
          });
          creatorError = error;
        }
      }

      if (creatorError && creatorError.code !== 'PGRST116') {
        console.log('⚠️ [AuthContext] Creator fetch error (code:', creatorError.code, '):', creatorError.message);
      }

      if (creatorData && !creatorError) {
        console.log('✅ [AuthContext] 🎨 Found creator profile:', creatorData.display_name);
        const newProfile = { ...creatorData, user_type: 'creator' } as CreatorProfile;
        setProfile(newProfile);
        console.log('✅ [AuthContext] Profile state updated to creator:', newProfile.display_name);
        console.log('🏁 [AuthContext] Profile fetch completed (CREATOR)');
        return;
      } else {
        console.log('⏭️ [AuthContext] No creator profile found either');
      }

      // If neither found, set profile to null (unless retaining)
      if (retainOnFail && profile) {
        console.warn('⚠️ [AuthContext] Profile not found but retaining existing profile:', profile.display_name);
        console.log('🏁 [AuthContext] Profile fetch completed (RETAINED)');
        return;
      }
      
      console.error('❌ [AuthContext] Profile not found in buyers or creators table');
      console.error('❌ [AuthContext] User ID:', userId);
      console.error('❌ [AuthContext] Buyer error:', buyerError);
      console.error('❌ [AuthContext] Creator error:', creatorError);
      console.error('❌ [AuthContext] Setting profile to NULL');
      setProfile(null);
      console.log('🏁 [AuthContext] Profile fetch completed (NOT FOUND - SET TO NULL)');
    } catch (error) {
      console.error('💥 [AuthContext] CRITICAL: Unexpected error in outer try-catch:', error);
      console.error('💥 [AuthContext] Error details:', {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      if (!retainOnFail) {
        console.error('❌ [AuthContext] Setting profile to NULL due to exception');
        setProfile(null);
      }
      console.log('🏁 [AuthContext] Profile fetch completed (EXCEPTION)');
    } finally {
      isFetchingProfile.current = false;
      console.log('🏁 [AuthContext] Finally block: Resetting fetch flag');
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('🚀 [AuthContext] Initializing auth state...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 [AuthContext] Initial session check:', session ? 'Session found' : 'No session');
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('✅ [AuthContext] User found in initial session:', session.user.id);
        fetchProfile(session.user.id);
      } else {
        console.log('⚠️ [AuthContext] No user in initial session');
      }
      
      setLoading(false);
    }).catch((error) => {
      console.error('❌ [AuthContext] Error getting initial session:', error);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 [AuthContext] ═══════════════════════════════════');
      console.log('🔔 [AuthContext] Auth state changed:', event);
      console.log('🔔 [AuthContext] User ID:', session?.user?.id);
      console.log('🔔 [AuthContext] Session expires at:', session?.expires_at ? new Date(session.expires_at * 1000).toLocaleTimeString() : 'N/A');
      console.log('🔔 [AuthContext] Current profile before change:', profile?.user_type, profile?.display_name);
      
      // Handle different auth events
      if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 [AuthContext] Token refreshed successfully - KEEPING EXISTING PROFILE');
        setSession(session);
        setUser(session?.user ?? null);
        // DO NOT refetch profile on token refresh - it's already loaded!
        console.log('✅ [AuthContext] Profile retained:', profile?.user_type, profile?.display_name);
        console.log('🔔 [AuthContext] ═══════════════════════════════════');
        return;
      }
      
      if (event === 'SIGNED_OUT') {
        console.log('🔴 [AuthContext] User signed out - CLEARING PROFILE');
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
        hasProcessedInitialSession.current = false;
        console.log('🔔 [AuthContext] ═══════════════════════════════════');
        return;
      }
      
      // SKIP SIGNED_IN during initialization - wait for INITIAL_SESSION instead
      // This prevents queries from timing out during auth recovery
      if (event === 'SIGNED_IN' && !hasProcessedInitialSession.current) {
        console.log('⏭️ [AuthContext] SIGNED_IN during init - SKIPPING (will fetch on INITIAL_SESSION)');
        setSession(session);
        setUser(session?.user ?? null);
        console.log('🔔 [AuthContext] ═══════════════════════════════════');
        return;
      }
      
      if (event === 'SIGNED_IN') {
        console.log('✅ [AuthContext] User signed in (post-init) - FETCHING PROFILE');
      }
      
      if (event === 'USER_UPDATED') {
        console.log('🔵 [AuthContext] User data updated - REFETCHING PROFILE');
      }
      
      if (event === 'INITIAL_SESSION') {
        console.log('🔵 [AuthContext] Initial session - FETCHING PROFILE');
        hasProcessedInitialSession.current = true;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      // Only fetch profile on INITIAL_SESSION, post-init SIGNED_IN, or USER_UPDATED
      if (session?.user && (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'INITIAL_SESSION')) {
        console.log('🔵 [AuthContext] Fetching profile for event:', event);
        await fetchProfile(session.user.id);
      } else if (!session?.user) {
        console.log('❌ [AuthContext] No session user - clearing profile');
        setProfile(null);
      }
      
      setLoading(false);
      console.log('🔔 [AuthContext] Auth event handler complete');
      console.log('🔔 [AuthContext] ═══════════════════════════════════');
    });

    return () => subscription.unsubscribe();
  }, []);

  // Watch profile state changes for debugging
  useEffect(() => {
    if (profile) {
      console.log('📊 [AuthContext] ✅ PROFILE LOADED:', {
        user_type: profile.user_type,
        display_name: profile.display_name,
        id: profile.id,
        timestamp: new Date().toLocaleTimeString()
      });
    } else if (user && !loading) {
      // Only warn if we have a user, we're not loading, and it's been a moment
      // This prevents false warnings during the brief moment between sign-in and profile fetch
      const timer = setTimeout(() => {
        console.warn('⚠️ [AuthContext] WARNING: Profile is still null after 2 seconds', {
          user_id: user.id,
          user_email: user.email,
          timestamp: new Date().toLocaleTimeString()
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    } else if (!user && !loading) {
      console.log('📊 [AuthContext] Profile is null (no user logged in)');
    }
  }, [profile, user, loading]);

  // Smart token refresh strategy (SIMPLIFIED - focus handlers disabled)
  useEffect(() => {
    let monitorInterval: NodeJS.Timeout;
    let visibilityRefreshTimeout: NodeJS.Timeout;
    let lastRefreshCheckTime: number = Date.now();

    const refreshToken = async (source: string = 'interval') => {
      // Skip refresh checks when window is not visible (unless it's been a while)
      if (document.hidden && source === 'interval') {
        console.log('[AuthContext] ⏸️  Window hidden, skipping interval refresh check');
        return;
      }

      const now = Date.now();
      const timeSinceLastCheck = now - lastRefreshCheckTime;
      
      // Prevent rapid-fire refresh checks (minimum 30 seconds between checks)
      if (timeSinceLastCheck < 30000 && source !== 'initial') {
        console.log(`[AuthContext] ⏭️  Skipping refresh check (only ${Math.floor(timeSinceLastCheck / 1000)}s since last check)`);
        return;
      }
      
      lastRefreshCheckTime = now;

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('[AuthContext] No session found during refresh check');
        return;
      }
      
      const expiresAt = session.expires_at;
      if (!expiresAt) {
        console.warn('[AuthContext] Session has no expiry time');
        return;
      }
      
      const expiryTime = new Date(expiresAt * 1000);
      const timeUntilExpiry = expiryTime.getTime() - now;
      const minutesUntilExpiry = Math.floor(timeUntilExpiry / 1000 / 60);
      
      console.log(`[AuthContext] 🕐 Token expires in ${minutesUntilExpiry} minutes (${expiryTime.toLocaleTimeString()}) [${source}]`);
      
      // Only refresh if less than 20 minutes remaining (reduced from 30)
      if (minutesUntilExpiry < 20 && minutesUntilExpiry > 0) {
        console.log(`🔄 [AuthContext] Token expiring soon, refreshing... [${source}]`);
        const { data, error } = await supabase.auth.refreshSession();
        if (error) {
          console.error('❌ [AuthContext] Token refresh failed:', error);
          // Try one more time
          console.log('🔄 [AuthContext] Retrying token refresh...');
          const { data: retryData, error: retryError } = await supabase.auth.refreshSession();
          if (retryError) {
            console.error('❌ [AuthContext] Retry failed:', retryError);
          } else {
            console.log('✅ [AuthContext] Token refreshed successfully on retry');
            if (retryData.session?.expires_at) {
              const newExpiry = new Date(retryData.session.expires_at * 1000);
              console.log('[AuthContext] New expiry:', newExpiry.toLocaleTimeString());
            }
          }
        } else {
          console.log('✅ [AuthContext] Token refreshed successfully');
          if (data.session?.expires_at) {
            const newExpiry = new Date(data.session.expires_at * 1000);
            console.log('[AuthContext] New expiry:', newExpiry.toLocaleTimeString());
          }
        }
      } else if (minutesUntilExpiry >= 20) {
        console.log(`✅ [AuthContext] Token still valid for ${minutesUntilExpiry} minutes, no refresh needed`);
      }
    };

    // Check every 3 minutes only (VERY conservative)
    monitorInterval = setInterval(() => refreshToken('interval'), 3 * 60 * 1000);

    // TEMPORARILY DISABLED: Focus/visibility handlers
    // These were causing issues on Mac when switching spaces/apps
    console.log('🔧 [AuthContext] Focus handlers DISABLED for testing');

    // Initial check
    refreshToken('initial');

    return () => {
      clearInterval(monitorInterval);
      clearTimeout(visibilityRefreshTimeout);
    };
  }, []);

  // Helper function to create profile after email confirmation
  const createProfileAfterConfirmation = async (
    userId: string,
    email: string,
    displayName: string,
    userType: 'buyer' | 'creator'
  ): Promise<{ error: any | null }> => {
    try {
      const tableName = userType === 'buyer' ? 'buyers' : 'creators';
      console.log(`🔵 [AuthContext] Creating ${userType} profile post-confirmation...`, {
        id: userId,
        email,
        display_name: displayName,
      });

      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .insert({
          id: userId,
          email: email,
          display_name: displayName,
        })
        .select()
        .single();

      if (profileError) {
        console.error('🔴 [AuthContext] Profile creation failed:', profileError);
        return { error: profileError };
      }

      console.log('✅ [AuthContext] Profile created successfully:', profileData);
      await fetchProfile(userId);
      return { error: null };
    } catch (error) {
      console.error('🔴 [AuthContext] Unexpected error creating profile:', error);
      return { error };
    }
  };

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    userType: 'buyer' | 'creator'
  ): Promise<{ error: AuthError | null; needsEmailConfirmation: boolean }> => {
    try {
      console.log('🔵 [AuthContext] Starting signup process', { email, userType });
      
      // 1. Create auth user
      console.log('🔵 [AuthContext] Step 1: Creating auth user...');
      
      // Set redirect URL based on user type
      const redirectUrl = userType === 'creator' 
        ? `${window.location.origin}/profile-setup`
        : `${window.location.origin}/marketplace`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName,
            user_type: userType,
          }
        }
      });

      if (authError) {
        console.error('🔴 [AuthContext] Auth signup failed:', authError);
        return { error: authError, needsEmailConfirmation: false };
      }
      
      if (!authData.user) {
        console.error('🔴 [AuthContext] No user returned from signup');
        return { error: new Error('Failed to create user') as AuthError, needsEmailConfirmation: false };
      }

      console.log('✅ [AuthContext] Auth user created:', {
        userId: authData.user.id,
        email: authData.user.email,
        role: authData.user.role,
      });

      // Check if email confirmation is required
      const needsEmailConfirmation = !authData.session;
      
      if (authData.session) {
        console.log('✅ [AuthContext] Session available immediately, user is confirmed');
        // Create profile now since user is authenticated
        await createProfileAfterConfirmation(authData.user.id, authData.user.email!, displayName, userType);
      } else {
        console.log('⚠️ [AuthContext] No session - email confirmation required');
        // Store pending data in localStorage for after email confirmation
        setPendingUserData({ userType, displayName });
        localStorage.setItem('whispr_pending_profile', JSON.stringify({
          userId: authData.user.id,
          email: authData.user.email,
          displayName,
          userType,
        }));
      }

      console.log('✅ [AuthContext] Signup completed successfully!');
      return { error: null, needsEmailConfirmation };
    } catch (error) {
      console.error('🔴 [AuthContext] Unexpected signup error:', error);
      return { error: error as AuthError, needsEmailConfirmation: false };
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

  // Check for pending profile creation after email confirmation
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      if (user && !profile && !loading) {
        // Check if there's pending profile data
        const pendingData = localStorage.getItem('whispr_pending_profile');
        if (pendingData) {
          try {
            const { userId, email, displayName, userType } = JSON.parse(pendingData);
            if (userId === user.id) {
              console.log('🔵 [AuthContext] Email confirmed! Creating profile...');
              await createProfileAfterConfirmation(userId, email, displayName, userType);
              localStorage.removeItem('whispr_pending_profile');
              setPendingUserData(null);
            }
          } catch (error) {
            console.error('🔴 [AuthContext] Error creating profile after confirmation:', error);
          }
        }
      }
    };

    handleEmailConfirmation();
  }, [user, profile, loading]);

  const value = {
    user,
    profile,
    session,
    loading,
    pendingUserData,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signOut,
    refreshProfile,
    createProfileAfterConfirmation,
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

