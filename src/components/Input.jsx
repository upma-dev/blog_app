import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-2 pl-1 text-slate-300 font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
                    px-4 py-3 rounded-xl 
                    bg-slate-800/50 text-slate-100 
                    outline-none focus:ring-2 focus:ring-accent-500/50 
                    duration-200 border border-slate-700/50 
                    w-full transition-all
                    placeholder:text-slate-500
                    hover:bg-slate-800/70
                    focus:bg-slate-800
                    ${className}
                `}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
