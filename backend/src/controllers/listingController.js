import { getDb } from '../config/db.js';

export const getListingDetails = async (req, res) => {
  // 1. Upgraded mock data with description and amenities for the AI
  const mockListing = {
    id: "1",
    title: "Romantic Jacuzzi 1BHK Candolim - Mirashya UG10",
    description: "A luxurious and intimate 1BHK apartment situated in the vibrant heart of Candolim, Goa. Designed for couples, it features a private indoor jacuzzi, sleek modern aesthetics, and quick access to the beach.",
    amenities: ["Private Jacuzzi", "Air conditioning", "Fully equipped kitchen", "High-speed Wifi", "Pool access", "Balcony"],
    location: "Candolim, Goa, India",
    host: { 
      name: "Mirashya", 
      image: "https://ui-avatars.com/api/?name=Mirashya&background=random", 
      joined: "Joined in 2021" 
    },
    stats: { guests: 2, bedrooms: 1, beds: 1, baths: 1 },
    price: { perNight: 4500, currency: "₹" },
   images: [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Fixed working URL
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
]
  };

  try {
    let dbData = null;

    try {
      const supabase = await getDb();
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', '1')
        .single();
        
      if (error && error.code !== 'PGRST116') {
          console.error("Supabase query error:", error);
      }
      dbData = data;
    } catch (dbInitError) {
      console.warn("⚠️ Warning: Supabase not configured yet. Serving mock data.");
    }

    const listing = dbData || mockListing;
    return res.status(200).json(listing);
    
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ error: "Failed to fetch listing details" });
  }
};