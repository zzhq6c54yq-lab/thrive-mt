
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  user_type: string | null;
  onboarding_completed: boolean;
  goals: string[] | null;
  primary_portal: string | null;
  secondary_portal: string | null;
  time_preference_minutes: number | null;
  is_therapist: boolean | null;
  created_at: string;
  updated_at: string;
}

interface Subscription {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

interface UserContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  subscription: Subscription | null;
  loading: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to avoid blocking auth state
          setTimeout(async () => {
            const { data: profileData, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (error) {
              console.error('[UserContext] Error fetching profile:', error);
            } else {
              setProfile(profileData);
            }

            // Only check subscription if onboarding is complete
            // Don't check during onboarding to prevent "Load failed" errors
            const isOnboarding = !localStorage.getItem('hasCompletedOnboarding');
            if (!isOnboarding && profileData?.onboarding_completed) {
              checkSubscriptionStatus();
            }
          }, 0);
        } else {
          setProfile(null);
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    setProfile(data);
  };

  const checkSubscriptionStatus = async () => {
    if (!session?.access_token) {
      // Fallback to Basic for unauthenticated users
      setSubscription({ subscribed: true, subscription_tier: 'Basic', subscription_end: null });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        // Fallback to Basic on error
        setSubscription({ subscribed: true, subscription_tier: 'Basic', subscription_end: null });
      } else {
        setSubscription(data);
      }
    } catch (error) {
      // Fallback to Basic on error
      setSubscription({ subscribed: true, subscription_tier: 'Basic', subscription_end: null });
    }
  };

  const checkSubscription = async () => {
    await checkSubscriptionStatus();
  };

  return (
    <UserContext.Provider value={{ user, session, profile, subscription, loading, updateProfile, checkSubscription }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
