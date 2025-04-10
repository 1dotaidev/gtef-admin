import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) throw new Error("Please provide VITE_SUPABASE_URL environment variable");
if (!SUPABASE_KEY) throw new Error("Please provide VITE_SUPABASE_ANON_KEY environment variable");

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "gtef-auth",
  },
});

// Add a helper function to check admin status directly
export const checkAdminStatus = async (userId: string) => {
  if (!userId) return { error: "No user ID provided" };
  
  try {
    console.log("Checking admin status for user ID:", userId);
    
    // First try the direct RPC function which bypasses RLS
    const { data: adminStatus, error: rpcError } = await supabaseClient
      .rpc('is_admin');
    
    if (rpcError) {
      console.error("Error calling is_admin() function:", rpcError);
      
      // Fallback: direct query with the get_admin_status function
      const { data: fnData, error: fnError } = await supabaseClient
        .rpc("get_admin_status", { user_id: userId });
      
      if (fnError) {
        console.error("Error calling get_admin_status function:", fnError);
        
        // Last resort: direct query to admin_users table
        const { data, error } = await supabaseClient
          .from("admin_users")
          .select("is_admin, email")
          .eq("id", userId)
          .single();
        
        if (error) {
          console.error("Direct admin query error:", error);
          return { error: "Admin verification failed" };
        }
        
        console.log("Admin status from direct query:", data);
        return { data };
      }
      
      console.log("Admin status from get_admin_status function:", fnData);
      return { data: fnData };
    }
    
    // The is_admin() function returns a boolean directly
    console.log("Admin status from is_admin() function:", adminStatus);
    return { 
      data: { 
        is_admin: adminStatus 
      } 
    };
  } catch (error) {
    console.error("Admin check error:", error);
    return { error: "Admin verification failed" };
  }
};
