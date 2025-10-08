import React from "react";
import { X, Truck } from "lucide-react";

const TopaddBanner = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-950 border-b border-gray-300 text-white flex items-center justify-center w-full py-2 sm:py-0 sm:h-12 px-3 sm:px-4">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Banner Content */}
        <div className="flex items-center justify-center flex-1 gap-2 sm:gap-3">
          {/* Icon - Hidden on mobile, shown on tablet+ */}
          <Truck size={16} className="hidden sm:block sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-300 flex-shrink-0" />
          
          {/* Banner Text */}
          <h1 className="font-librebaskerville text-xs sm:text-sm md:text-md text-center">
            <span className="sm:hidden">Free shipping over $100</span>
            <span className="hidden sm:inline">Free standard shipping on all orders over $100</span>
          </h1>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center justify-center ml-2 sm:ml-4 md:ml-6 p-1 hover:bg-green-900 rounded transition-colors duration-200 flex-shrink-0"
          aria-label="Close banner"
        >
          <X size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default TopaddBanner;