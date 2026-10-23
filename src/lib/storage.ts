import { supabase } from '../lib/supabase';

export const storageApi = {
  // Upload file ke Supabase Storage
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    
    if (error) throw error;
    return data;
  },

  // Get public URL
  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete file
  async deleteFile(bucket: string, paths: string[]) {
    const { error } = await supabase.storage.from(bucket).remove(paths);
    if (error) throw error;
  },

  // List files
  async listFiles(bucket: string, path: string = '') {
    const { data, error } = await supabase.storage.from(bucket).list(path);
    if (error) throw error;
    return data;
  },
};

// Helper untuk upload avatar
export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  await storageApi.uploadFile('profiles', filePath, file);
  return storageApi.getPublicUrl('profiles', filePath);
}
