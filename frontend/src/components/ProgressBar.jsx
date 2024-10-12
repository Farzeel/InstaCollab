import React, { useState, useEffect } from "react";
import { FaInfo } from "react-icons/fa";

const StickyProgressBar = ({progress}) => {

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="fixed bottom-4 right-4 w-64 z-50"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {progress}%
        </div>
      </div>
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          Progress: {progress}%
        </div>
      )}
      <button
        className="absolute -top-8 -right-8 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Progress Information"
      >
        <FaInfo />
      </button>
    </div>
  );
};

export default StickyProgressBar;