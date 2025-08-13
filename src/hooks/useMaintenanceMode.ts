import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useMaintenanceMode = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenanceStatus();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_settings',
          filter: 'key=eq.maintenance_mode',
        },
        () => {
          fetchMaintenanceStatus();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchMaintenanceStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'maintenance_mode')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching maintenance status:', error);
        return;
      }

      setIsMaintenanceMode(data?.value === 'true');
    } catch (error) {
      console.error('Error fetching maintenance status:', error);
    } finally {
      setLoading(false);
    }
  };

  return { isMaintenanceMode, loading };
};
