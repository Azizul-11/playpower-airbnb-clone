import React, { useState, useEffect } from 'react';
// IMPORT SPARKLES FOR THE AI ICON
import { Share, Heart, Star, Medal, Sparkles } from 'lucide-react';
// IMPORT MOTION FOR TEXT FADE-IN
import { AnimatePresence, motion } from 'framer-motion'; 
import PhotoGallery from '../components/listing/PhotoGallery';
import Lightbox from '../components/listing/Lightbox';
import PhotoTour from '../components/listing/PhotoTour';

const ListingPage = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NEW: State for the AI Highlight
  const [aiHighlight, setAiHighlight] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // State for Overlays
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // 1. Fetch Listing Details
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/listing/current`);
        
        if (!response.ok) throw new Error('Failed to fetch listing data');
        
        // const data = await response.json();
        const data = await response.json();

// Force overwrite the broken second image slot right here
if (data && data.images && data.images.length > 1) {
  data.images[1] = "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
}

setListing(data);
        setListing(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

  // 2. NEW: Fetch AI Highlight automatically once the listing data is loaded
  useEffect(() => {
    if (listing && listing.description) {
      const fetchAiHighlight = async () => {
        setIsAiLoading(true);
        try {
          const apiUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await fetch(`${apiUrl}/ai/listing-highlight`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: listing.title,
              description: listing.description,
              amenities: listing.amenities
            })
          });
          if (response.ok) {
            const data = await response.json();
            setAiHighlight(data.highlight);
          }
        } catch (err) {
          console.error("Failed to generate AI highlight", err);
        } finally {
          setIsAiLoading(false);
        }
      };
      fetchAiHighlight();
    }
  }, [listing]);

  // Handlers for overlays
  const handleOpenLightbox = (index) => {
    setActiveImageIndex(index);
    setIsLightboxOpen(true);
  };
  const handleOpenPhotoTour = () => setIsPhotoTourOpen(true);

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-airbnb-brand"></div></div>;
  if (error || !listing) return <div className="flex h-screen items-center justify-center text-airbnb-brand font-semibold">Error: {error || 'Listing not found'}</div>;

  return (
    <main className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-6 pb-24">
      
      {/* 1. Header Section */}
      <div className="mb-6">
        <h1 className="text-[26px] leading-[30px] font-semibold text-airbnb-dark mb-2">
          {listing.title}
        </h1>
        <div className="flex justify-between items-end text-sm">
          <div className="flex items-center gap-2 font-medium text-airbnb-dark">
             <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> 4.96</span>
             <span>·</span>
             <span className="underline cursor-pointer">128 reviews</span>
             <span>·</span>
             <span className="flex items-center gap-1 text-gray-600"><Medal className="w-4 h-4" /> Superhost</span>
             <span>·</span>
             <span className="underline cursor-pointer font-semibold">{listing.location}</span>
          </div>
          <div className="flex gap-4 font-medium underline">
            <button className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1.5 rounded-md transition -ml-2"><Share className="w-4 h-4" /> Share</button>
            <button className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1.5 rounded-md transition"><Heart className="w-4 h-4" /> Save</button>
          </div>
        </div>
      </div>

      {/* 2. Hero Image Gallery */}
      <PhotoGallery images={listing.images} onImageClick={handleOpenLightbox} onShowAllClick={handleOpenPhotoTour} />

      {/* 3. Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        
        {/* Left Column: Property Details */}
        <div className="flex-grow lg:w-[60%]">
          <div className="flex justify-between items-center pb-6 border-b border-airbnb-border">
            <div>
              <h2 className="text-[22px] font-semibold mb-1">Entire rental unit hosted by {listing.host.name}</h2>
              <p className="text-airbnb-dark font-normal">
                {listing.stats.guests} guests · {listing.stats.bedrooms} bedroom · {listing.stats.beds} bed · {listing.stats.baths} bath
              </p>
            </div>
            <img src={listing.host.image} alt={listing.host.name} className="w-14 h-14 rounded-full bg-gray-200 object-cover" />
          </div>

          {/* NEW: AI Host Highlights Section */}
          <div className="py-6 border-b border-airbnb-border">
             <div className="flex gap-4 items-start mb-4">
                <Sparkles className="w-6 h-6 mt-0.5 text-airbnb-brand" />
                <div className="w-full">
                    <h3 className="font-semibold text-airbnb-dark text-lg">AI Generated Highlight</h3>
                    
                    {/* Animated Loading Skeleton */}
                    {isAiLoading ? (
                      <div className="animate-pulse flex space-x-4 mt-3">
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-2.5 bg-gray-200 rounded w-full"></div>
                          <div className="h-2.5 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    ) : (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gray-600 text-[15px] leading-relaxed mt-2"
                      >
                        {aiHighlight || "Experience luxury and comfort in this highly rated property."}
                      </motion.p>
                    )}
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:w-[33.33%] relative">
          <div className="sticky top-28 border border-airbnb-border rounded-xl p-6 shadow-airbnb">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-[22px] font-semibold">{listing.price.currency}{listing.price.perNight}</span>
              <span className="text-base font-normal text-airbnb-dark">night</span>
            </div>
            
            <div className="border border-gray-400 rounded-lg mb-4 overflow-hidden">
                <div className="flex border-b border-gray-400">
                    <div className="w-1/2 p-3 border-r border-gray-400">
                        <div className="text-[10px] font-bold uppercase">Check-in</div>
                        <div className="text-sm">Add date</div>
                    </div>
                    <div className="w-1/2 p-3">
                        <div className="text-[10px] font-bold uppercase">Checkout</div>
                        <div className="text-sm">Add date</div>
                    </div>
                </div>
                <div className="p-3">
                    <div className="text-[10px] font-bold uppercase">Guests</div>
                    <div className="text-sm">1 guest</div>
                </div>
            </div>

            <button className="w-full bg-airbnb-brand text-white py-3.5 rounded-lg font-semibold hover:bg-rose-600 transition tracking-wide text-[15px]">
              Reserve
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
          </div>
        </div>

      </div>

      {/* 4. Render Overlays */}
      <AnimatePresence>
        {isPhotoTourOpen && <PhotoTour key="photo-tour" images={listing.images} onClose={() => setIsPhotoTourOpen(false)} onImageClick={handleOpenLightbox} />}
      </AnimatePresence>
      <AnimatePresence>
        {isLightboxOpen && <Lightbox key="lightbox" images={listing.images} initialIndex={activeImageIndex} onClose={() => setIsLightboxOpen(false)} />}
      </AnimatePresence>
    </main>
  );
};

export default ListingPage;