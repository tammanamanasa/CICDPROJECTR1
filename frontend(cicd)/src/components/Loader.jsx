import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-50">
      {/* Loader Container */}
      <div className="relative flex flex-col items-center">
        {/* Animated Circular Loader */}
        <div className="relative w-24 h-24">
          <svg
            className="w-full h-full animate-spin-slow"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="black"
              strokeWidth="6"
              strokeDasharray="200"
              strokeDashoffset="100"
              strokeLinecap="round"
              className="opacity-30"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="black"
              strokeWidth="6"
              strokeDasharray="200"
              strokeDashoffset="50"
              strokeLinecap="round"
              className="animate-[dash_1.5s_ease-in-out_infinite]"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <div className="mt-4 text-lg font-semibold text-gray-900">
          Processing your request...
        </div>

        {/* Glow Effect */}
        <div className="absolute w-32 h-32 bg-gray-900 opacity-10 blur-2xl"></div>
      </div>
    </div>
  );
};

// Keyframes for animations
const style = document.createElement("style");
style.textContent = `
  @keyframes dash {
    0% { stroke-dashoffset: 100; }
    50% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -100; }
  }
  @keyframes spin-slow {
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default Loader;
