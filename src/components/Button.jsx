import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-gradient-to-r from-accent-600 to-accent-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
                px-6 py-3 rounded-xl font-semibold
                ${bgColor} ${textColor} ${className}
                shadow-lg hover:shadow-glow
                transform hover:-translate-y-0.5
                transition-all duration-300
                hover:scale-105
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
            `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
