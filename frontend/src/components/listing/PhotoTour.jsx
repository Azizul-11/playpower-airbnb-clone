import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Share, Heart } from 'lucide-react';

const PhotoTour = ({ images, onClose, onImageClick }) => {
  // Lock background scrolling when the tour is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }}
      className="fixed inset-0 z-40 bg-white overflow-y-auto"
    >
      {/* Sticky Top Navigation */}
      <div className="sticky top-0 bg-white z-10 px-4 md:px-8 py-4 flex items-center justify-between border-b border-gray-200">
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-full transition flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 underline font-medium text-sm hover:bg-gray-100 px-3 py-1.5 rounded-md transition">
            <Share className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-2 underline font-medium text-sm hover:bg-gray-100 px-3 py-1.5 rounded-md transition">
            <Heart className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      {/* Masonry Grid Layout */}
      <div className="max-w-[760px] mx-auto py-8 px-4 sm:px-6">
        <h2 className="text-[26px] font-semibold mb-8 text-airbnb-dark">Tour this place</h2>

        {/* Category: Living Room */}
        <div className="mb-12">
          <h3 className="text-[22px] font-medium mb-4 text-airbnb-dark">Living room</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {images.slice(0, 3).map((img, i) => (
              <div 
                key={i} 
                className={`w-full cursor-pointer group overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`} 
                onClick={() => onImageClick(i)}
              >
                <img 
                  src={img} 
                  alt="Living room" 
                  className="w-full h-auto object-cover group-hover:brightness-90 transition duration-200" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Category: Bedroom */}
        <div className="mb-12">
          <h3 className="text-[22px] font-medium mb-4 text-airbnb-dark">Bedroom</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {images.slice(3).map((img, i) => (
              <div 
                key={i + 3} 
                className="w-full cursor-pointer group overflow-hidden md:col-span-2" 
                onClick={() => onImageClick(i + 3)}
              >
                <img 
                  src={img} 
                  alt="Bedroom" 
                  className="w-full h-[400px] object-cover group-hover:brightness-90 transition duration-200" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoTour;