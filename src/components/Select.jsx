import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-2 pl-1 text-slate-300 font-medium"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`
                    px-4 py-3 rounded-xl 
                    bg-slate-800/50 text-slate-100 
                    outline-none focus:ring-2 focus:ring-accent-500/50 
                    duration-200 border border-slate-700/50 
                    w-full transition-all
                    hover:bg-slate-800/70
                    cursor-pointer
                    ${className}
                `}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-slate-800 text-slate-100"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
