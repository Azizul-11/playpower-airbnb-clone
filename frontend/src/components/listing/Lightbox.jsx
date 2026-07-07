import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Handle Keyboard Navigation (Requirement for Accessibility)
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }, [currentIndex, onClose]);

  useEffect(() => {
    // Lock body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 md:p-6 text-white z-10">
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Main Image Area */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          {/* Left Navigation */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-12 flex items-center justify-center w-12 h-12 rounded-full border border-gray-500 hover:bg-white/10 text-white transition z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image with Slide Animation */}
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-h-[85vh] max-w-full object-contain"
          />

          {/* Right Navigation */}
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-12 flex items-center justify-center w-12 h-12 rounded-full border border-gray-500 hover:bg-white/10 text-white transition z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;