import React, { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //scroll smooth transition to go top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed group bottom-8 right-8 z-50 p-3 bg-gray-600 hover:bg-green-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-white ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <MdKeyboardDoubleArrowUp
        size={20}
        className="w-8 h-8 text-white group-hover:animate-fade-in-up hover:text-white "
      />
    </button>
  );
};

export default ScrollToTop;


