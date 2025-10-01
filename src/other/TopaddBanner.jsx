import React from "react";
import { X } from "lucide-react";

const TopaddBanner = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-950 h-8 text-white text-sm flex items-center justify-center w-full ">
      <h1 className="font-librebaskerville text-md items-center justify-center">
        Free standard shipping on all orders over $100
      </h1>
      <button
        onClick={onClose}
        className="flex items-center justify-center ml-40"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default TopaddBanner;
