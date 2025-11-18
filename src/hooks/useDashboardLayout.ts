import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

const DEFAULT_SECTION_ORDER = ['your-day', 'toolkit', 'progress'];

export function useDashboardLayout() {
  const { user } = useUser();
  const [sectionOrder, setSectionOrder] = useState<string[]>(DEFAULT_SECTION_ORDER);
  const [isCustomLayout, setIsCustomLayout] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [learningEnabled, setLearningEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Load user's layout preferences
  const loadLayoutPreferences = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    
    const { data, error } = await supabase
      .from('dashboard_layout_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error loading layout preferences:', error);
      setLoading(false);
      return;
    }
    
    if (data) {
      setSectionOrder(data.section_order as string[]);
      setIsCustomLayout(data.is_custom);
      setIsLocked(data.is_locked);
      setLearningEnabled(data.learning_enabled);
    } else {
      // Initialize default preferences
      await supabase.from('dashboard_layout_preferences').insert({
        user_id: user.id,
        section_order: DEFAULT_SECTION_ORDER,
        is_custom: false,
        is_locked: false,
        learning_enabled: true
      });
    }
    
    setLoading(false);
  }, [user]);
  
  // Save layout preferences
  const saveLayoutPreferences = useCallback(async (
    newOrder: string[],
    custom: boolean = true
  ) => {
    if (!user) return;
    
    await supabase
      .from('dashboard_layout_preferences')
      .upsert({
        user_id: user.id,
        section_order: newOrder,
        is_custom: custom,
        is_locked: isLocked,
        learning_enabled: learningEnabled,
        updated_at: new Date().toISOString()
      });
    
    setSectionOrder(newOrder);
    setIsCustomLayout(custom);
  }, [user, isLocked, learningEnabled]);
  
  // Manually reorder sections (drag & drop)
  const reorderSections = useCallback((newOrder: string[]) => {
    saveLayoutPreferences(newOrder, true);
  }, [saveLayoutPreferences]);
  
  // Reset to default layout
  const resetToDefault = useCallback(async () => {
    await saveLayoutPreferences(DEFAULT_SECTION_ORDER, false);
    setIsLocked(false);
    setLearningEnabled(true);
  }, [saveLayoutPreferences]);
  
  // Toggle layout lock
  const toggleLock = useCallback(async () => {
    if (!user) return;
    
    const newLockedState = !isLocked;
    
    await supabase
      .from('dashboard_layout_preferences')
      .update({
        is_locked: newLockedState,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);
    
    setIsLocked(newLockedState);
  }, [user, isLocked]);
  
  // Toggle AI learning
  const toggleLearning = useCallback(async () => {
    if (!user) return;
    
    const newLearningState = !learningEnabled;
    
    await supabase
      .from('dashboard_layout_preferences')
      .update({
        learning_enabled: newLearningState,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);
    
    setLearningEnabled(newLearningState);
  }, [user, learningEnabled]);
  
  useEffect(() => {
    loadLayoutPreferences();
  }, [loadLayoutPreferences]);
  
  return {
    sectionOrder,
    isCustomLayout,
    isLocked,
    learningEnabled,
    loading,
    reorderSections,
    resetToDefault,
    toggleLock,
    toggleLearning
  };
}
