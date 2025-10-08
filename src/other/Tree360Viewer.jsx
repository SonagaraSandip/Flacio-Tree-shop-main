import React, { useState, useRef, useEffect } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

const Tree360Viewer = () => {
  const totalImage = 16;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const startX = useRef(null);
  const PlayInterval = useRef(null);

  //handle mouse drag start
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
  };

  //handle mouse drag move
  const handleMouseMove = (e) => {
    if (startX.current !== null) {
      const diff = e.clientX - startX.current;
      if (Math.abs(diff) > 10) {
        let newIndex = currentIndex;
        if (diff > 0) {
          newIndex = currentIndex === 1 ? totalImage : currentIndex - 1;
        } else {
          newIndex = currentIndex === totalImage ? 1 : currentIndex + 1;
        }
        setCurrentIndex(newIndex);
        startX.current = e.clientX;
      }
    }
  };

  //handle mouse up
  const handleMouseUp = () => {
    startX.current = null;
  };

  //left right button handler
  const handlePrev = () => {
    setCurrentIndex(currentIndex === 1 ? totalImage : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === totalImage ? 1 : currentIndex + 1);
  };

  //auto play logic
  useEffect(() => {
    if (isPlaying) {
      PlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalImage ? 1 : prev + 1));
      }, 150);
    } else {
      clearInterval(PlayInterval.current);
    }

    return () => {
      clearInterval(PlayInterval.current);
    };
  }, [isPlaying]);

  //handle play pause
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center space-y-4 select-none w-full">
      <div
        className="w-full h-64 sm:h-80 md:h-96 lg:h-full relative cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={`/src/assets/product/360/360-${currentIndex}.jpg`}
          alt={`tree view ${currentIndex}`}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <div className="flex justify-center items-center gap-4 sm:gap-6 bg-white rounded-full px-3 sm:px-4 py-2 sm:py-2 shadow-lg">
        <button onClick={handlePrev} className="p-1 sm:p-0">
          <SkipBack size={18} className="sm:w-5 sm:h-5" />
        </button>
        <button onClick={handlePlayPause} className="p-1 sm:p-0">
          {isPlaying ? (
            <Pause fill="black" size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <Play fill="black" size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>
        <button onClick={handleNext} className="p-1 sm:p-0">
          <SkipForward size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Tree360Viewer;