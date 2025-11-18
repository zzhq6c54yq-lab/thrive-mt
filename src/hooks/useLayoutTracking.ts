import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

interface TrackingOptions {
  sectionId: string;
  trackScroll?: boolean;
  trackClicks?: boolean;
  trackTime?: boolean;
}

export function useLayoutTracking({ 
  sectionId, 
  trackScroll = true, 
  trackClicks = true, 
  trackTime = true 
}: TrackingOptions) {
  const { user } = useUser();
  const startTimeRef = useRef<number>(Date.now());
  const isVisibleRef = useRef<boolean>(false);
  
  // Track section view
  const trackView = useCallback(async () => {
    if (!user) return;
    
    await supabase.from('dashboard_section_interactions').insert({
      user_id: user.id,
      section_id: sectionId,
      interaction_type: 'view',
      timestamp: new Date().toISOString()
    });
  }, [user, sectionId]);
  
  // Track time spent
  const trackTimeSpent = useCallback(async () => {
    if (!user || !isVisibleRef.current) return;
    
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    
    if (duration > 2) { // Only track if spent more than 2 seconds
      await supabase.from('dashboard_section_interactions').insert({
        user_id: user.id,
        section_id: sectionId,
        interaction_type: 'scroll',
        duration_seconds: duration,
        timestamp: new Date().toISOString()
      });
    }
    
    startTimeRef.current = Date.now();
  }, [user, sectionId]);
  
  // Track clicks within section
  const trackClick = useCallback(async (metadata?: Record<string, any>) => {
    if (!user) return;
    
    await supabase.from('dashboard_section_interactions').insert({
      user_id: user.id,
      section_id: sectionId,
      interaction_type: 'click',
      metadata,
      timestamp: new Date().toISOString()
    });
  }, [user, sectionId]);
  
  // Intersection Observer for visibility tracking
  useEffect(() => {
    if (!trackTime) return;
    
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          startTimeRef.current = Date.now();
        } else {
          isVisibleRef.current = false;
          trackTimeSpent();
        }
      });
    };
    
    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.5
    });
    
    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
      trackTimeSpent();
    };
  }, [sectionId, trackTime, trackTimeSpent]);
  
  // Track initial view
  useEffect(() => {
    trackView();
  }, [trackView]);
  
  return { trackClick };
}
