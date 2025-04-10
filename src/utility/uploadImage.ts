import { supabaseClient } from "./supabaseClient";

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Create a unique file name
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Upload the file to Supabase storage
    const { data, error } = await supabaseClient.storage
      .from('blog-images')  // Make sure this bucket exists in your Supabase storage
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('blog-images')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}; 