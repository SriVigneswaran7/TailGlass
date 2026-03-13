export default function Slider({ label, value, min, max, onChange, suffix = '' }) {
  return (
    <div className="w-full">
      {/* Label and Value Badge */}
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-slate-300 tracking-wide">
          {label}
        </label>
        {/* Sleek value badge */}
        <span className="text-xs font-mono font-medium text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 shadow-inner">
          {value}{suffix}
        </span>
      </div>

      {/* The Premium Range Input */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none hover:bg-white/20 transition-colors duration-300
        
        /* Webkit (Chrome, Safari, Edge) Thumb Styling */
        [&::-webkit-slider-thumb]:appearance-none 
        [&::-webkit-slider-thumb]:w-5 
        [&::-webkit-slider-thumb]:h-5 
        [&::-webkit-slider-thumb]:bg-white 
        [&::-webkit-slider-thumb]:rounded-full 
        [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,255,255,0.5)]
        [&::-webkit-slider-thumb]:hover:scale-125
        [&::-webkit-slider-thumb]:transition-transform
        [&::-webkit-slider-thumb]:duration-200
        
        /* Firefox Thumb Styling */
        [&::-moz-range-thumb]:w-5 
        [&::-moz-range-thumb]:h-5 
        [&::-moz-range-thumb]:bg-white 
        [&::-moz-range-thumb]:border-none
        [&::-moz-range-thumb]:rounded-full 
        [&::-moz-range-thumb]:shadow-[0_0_15px_rgba(255,255,255,0.5)]
        [&::-moz-range-thumb]:hover:scale-125
        [&::-moz-range-thumb]:transition-transform
        [&::-moz-range-thumb]:duration-200"
      />
    </div>
  );
}