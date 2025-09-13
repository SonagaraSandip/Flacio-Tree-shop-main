// components/LoadingEffect.jsx
import React from "react";

const LoadingEffect = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8"
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-green-800 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingEffect;