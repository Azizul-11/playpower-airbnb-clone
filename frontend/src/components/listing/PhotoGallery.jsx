import React from 'react';

const PhotoGallery = ({ images, onImageClick, onShowAllClick }) => {
  // Fallback if images haven't loaded yet
  if (!images || images.length < 5) return null;

  return (
    <div className="relative w-full mb-8 pt-4">
      {/* The classic Airbnb Grid: 4 columns, 2 rows */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[50vh] md:h-[60vh] rounded-xl overflow-hidden">
        
        {/* Main large image - spans 2 columns and 2 rows */}
        <div 
          className="col-span-2 row-span-2 relative group cursor-pointer"
          onClick={() => onImageClick(0)}
        >
          <img 
            src={images[0]} 
            alt="Main property view" 
            className="w-full h-full object-cover group-hover:brightness-90 transition duration-200" 
          />
        </div>

        {/* Top row, middle */}
        <div 
          className="col-span-1 row-span-1 relative group cursor-pointer" 
          onClick={() => onImageClick(1)}
        >
          <img 
            src={images[1]} 
            alt="Property detail 1" 
            className="w-full h-full object-cover group-hover:brightness-90 transition duration-200" 
          />
        </div>

        {/* Top row, right */}
        <div 
          className="col-span-1 row-span-1 relative group cursor-pointer" 
          onClick={() => onImageClick(2)}
        >
          <img 
            src={images[2]} 
            alt="Property detail 2" 
            className="w-full h-full object-cover group-hover:brightness-90 transition duration-200" 
          />
        </div>

        {/* Bottom row, middle */}
        <div 
          className="col-span-1 row-span-1 relative group cursor-pointer" 
          onClick={() => onImageClick(3)}
        >
          <img 
            src={images[3]} 
            alt="Property detail 3" 
            className="w-full h-full object-cover group-hover:brightness-90 transition duration-200" 
          />
        </div>

        {/* Bottom row, right */}
        <div 
          className="col-span-1 row-span-1 relative group cursor-pointer" 
          onClick={() => onImageClick(4)}
        >
          <img 
            src={images[4]} 
            alt="Property detail 4" 
            className="w-full h-full object-cover group-hover:brightness-90 transition duration-200" 
          />
        </div>
      </div>
      
      {/* 'Show all photos' button */}
      <button 
        onClick={onShowAllClick}
        className="absolute bottom-6 right-6 bg-white border border-airbnb-dark text-airbnb-dark px-4 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition shadow-sm font-semibold text-sm z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        Show all photos
      </button>
    </div>
  );
};

export default PhotoGallery;