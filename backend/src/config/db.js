let supabaseClient = null;

export const getDb = async () => {
  // Singleton pattern: Only initialize if it doesn't exist
  if (!supabaseClient) {
    try {
      // Dynamic imports prevent module resolution conflicts on deployment
      const { createClient } = await import('@supabase/supabase-js');
      const ws = await import('ws'); // 1. Dynamically import the WebSocket library
      
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Missing Supabase credentials in .env");
      }

      // 2. Inject the WebSocket transport into the client configuration
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false // Best practice for backend server environments
        },
        realtime: {
          transport: ws.default // Fixes the Node.js 20 WebSocket error
        }
      });
      console.log("🟢 Supabase client dynamically initialized.");
    } catch (error) {
      console.error("🔴 Failed to initialize Supabase:", error.message);
      throw error;
    }
  }
  
  return supabaseClient;
};