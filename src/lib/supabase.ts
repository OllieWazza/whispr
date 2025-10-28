import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Track if Supabase has finished initializing
let isSupabaseReady = false;
const readyCallbacks: Array<() => void> = [];

// Helper to wait for Supabase to be ready
export const waitForSupabase = (): Promise<void> => {
  if (isSupabaseReady) {
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    readyCallbacks.push(resolve);
  });
};

// Create a default client even if env vars are missing (for build time)
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Using implicit flow for simpler email verification
    },
    global: {
      headers: {
        'x-client-info': 'whispr-web'
      }
    }
  }
);

// Create a separate anonymous-only client for public data queries
// This bypasses the auth session recovery process that blocks queries when logged in
export const supabaseAnon = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'x-client-info': 'whispr-web-anon'
      }
    }
  }
);

// Monitor auth state and localStorage
supabase.auth.onAuthStateChange((event, session) => {
  console.log(`[Supabase] Auth Event: ${event}`);
  
  // Mark Supabase as ready after first auth event (initialization complete)
  if (!isSupabaseReady && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'SIGNED_OUT')) {
    console.log('[Supabase] ✅ Supabase initialization complete, marking as ready');
    isSupabaseReady = true;
    // Notify all waiting components
    readyCallbacks.forEach(callback => callback());
    readyCallbacks.length = 0; // Clear the array
  }
  
  if (event === 'TOKEN_REFRESHED') {
    console.log('✅ [Supabase] Token refreshed successfully');
    if (session?.expires_at) {
      const expiryTime = new Date(session.expires_at * 1000);
      console.log(`[Supabase] New token expires at: ${expiryTime.toLocaleString()}`);
    }
  }
  
  if (event === 'SIGNED_IN') {
    console.log('✅ [Supabase] User signed in');
    // Check if refresh token is stored
    const storageKey = `sb-${supabaseUrl.split('//')[1]?.split('.')[0]}-auth-token`;
    const storedAuth = localStorage.getItem(storageKey);
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        console.log('[Supabase] Refresh token stored:', !!parsed.refresh_token);
        console.log('[Supabase] Access token length:', parsed.access_token?.length);
      } catch (e) {
        console.error('[Supabase] Failed to parse stored auth:', e);
      }
    } else {
      console.warn('[Supabase] No auth token found in localStorage!');
    }
  }
  
  if (event === 'SIGNED_OUT') {
    console.log('🔴 [Supabase] User signed out');
  }
  
  if (event === 'USER_UPDATED') {
    console.log('🔵 [Supabase] User updated');
  }
});

// Log initial session on load
supabase.auth.getSession().then(({ data: { session }, error }) => {
  if (error) {
    console.error('[Supabase] Initial session error:', error);
  } else if (session) {
    console.log('[Supabase] Initial session loaded');
    console.log('[Supabase] User:', session.user.email);
    if (session.expires_at) {
      const expiryTime = new Date(session.expires_at * 1000);
      const now = new Date();
      const minutesRemaining = Math.floor((expiryTime.getTime() - now.getTime()) / 1000 / 60);
      console.log(`[Supabase] Token expires in ${minutesRemaining} minutes (${expiryTime.toLocaleString()})`);
    }
  } else {
    console.log('[Supabase] No initial session');
  }
});

