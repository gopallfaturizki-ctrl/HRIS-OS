import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useSupabaseData<T>(table: string, fallbackData: T[] = []) {
  const [data, setData] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState(isSupabaseConfigured());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setData(fallbackData);
      setLoading(false);
      return;
    }

    fetchData();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`table-${table}-changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table]);

  const fetchData = async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await supabase.from(table).select('*');
    
    if (fetchError) {
      setError(fetchError.message);
      setData(fallbackData);
    } else {
      setData((result || []) as T[]);
    }
    setLoading(false);
  };

  const insert = async (record: any) => {
    const { data: result, error: insertError } = await (supabase.from(table) as any).insert([record]).select();
    if (insertError) throw insertError;
    return result;
  };

  const update = async (id: string, updates: any) => {
    const { data: result, error: updateError } = await (supabase.from(table) as any)
      .update(updates)
      .eq('id', id)
      .select();
    if (updateError) throw updateError;
    return result;
  };

  const remove = async (id: string) => {
    const { error: deleteError } = await (supabase.from(table) as any).delete().eq('id', id);
    if (deleteError) throw deleteError;
  };

  return { data, loading, error, insert, update, remove, refetch: fetchData };
}
