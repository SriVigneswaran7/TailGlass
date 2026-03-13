export default function Slider({ label, value, min, max, onChange, suffix = "" }) {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <label className="text-slate-300 text-sm font-semibold">{label}</label>
        <span className="text-indigo-400 font-mono text-sm">{value}{suffix}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
      />
    </div>
  );
}