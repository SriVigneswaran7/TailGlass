export default function GlassPreview({ blur, opacity, color, borderOpacity }) {
  return (
    <div className="relative flex items-center justify-center min-h-[400px] bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden">
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-600 rounded-full blur-[120px] opacity-20"></div>

      <div 
        style={{ 
          backgroundColor: `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
        }}
        className="relative z-10 w-[80%] h-64 rounded-2xl shadow-2xl flex items-center justify-center group transition-all"
      >
        <p className="text-white/20 font-black text-4xl uppercase tracking-widest group-hover:text-white/40 transition-colors">
          Preview
        </p>
      </div>
    </div>
  );
}