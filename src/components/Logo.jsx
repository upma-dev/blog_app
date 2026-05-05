import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center gap-2" style={{ width }}>
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-glow animate-pulse-slow">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 opacity-30 blur-sm -z-10"></div>
      </div>
      <span className="text-white font-bold text-lg">
        Mega<span className="text-gradient">Blog</span>
      </span>
    </div>
  );
}

export default Logo;
