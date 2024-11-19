import { useAuth } from 'vue-clerk'
import { createClient } from '@supabase/supabase-js'

export const createSupabaseClient = async () => {
  // Use the `useAuth()` hook to access the `getToken()` method
  const { getToken, isLoaded, isSignedIn } = useAuth()

  // Wait for the auth state to load
  if (!isLoaded) {
    throw new Error('Auth is not loaded yet')
  }

  // Check if the user is signed in
  if (!isSignedIn) {
    throw new Error('User is not signed in')
  }

  const config = useRuntimeConfig()

  const supabase = createClient(config.public.supabase_url, config.public.supabase_key, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await auth.getToken({ template: 'supabase' });
        const headers = new Headers(options?.headers);
        headers.set('Authorization', `Bearer ${clerkToken}`);
        
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });

  return supabase;
}