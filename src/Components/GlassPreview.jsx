import { useState } from 'react';

export default function GlassPreview({ blur, opacity, color, borderOpacity }) {
  const [bgType, setBgType] = useState('blobs');

  const bgStyles = {
    blobs: "bg-[#030303]", // Default dark with blobs
    mesh: "bg-gradient-to-br from-indigo-900 via-slate-900 to-fuchsia-900",
    image: "bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"
  };

  return (
    <div className={`relative flex items-center justify-center min-h-[500px] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 ${bgStyles[bgType]}`}>
      
      {/* BACKGROUND SELECTOR TOGGLE */}
      <div className="absolute top-4 left-4 z-20 flex gap-2 bg-black/40 p-1 rounded-lg border border-white/10 backdrop-blur-md">
        {['blobs', 'mesh', 'image'].map((type) => (
          <button
            key={type}
            onClick={() => setBgType(type)}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
              bgType === type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* RENDER BLOBS ONLY IF TYPE IS BLOBS */}
      {bgType === 'blobs' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-600 rounded-full blur-[120px] opacity-20"></div>
        </>
      )}

      {/* THE GLASS CARD */}
      <div 
        style={{ 
          backgroundColor: `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
        }}
        className="relative z-10 w-[80%] h-64 rounded-2xl shadow-2xl flex items-center justify-center group transition-all duration-300"
      >
        <p className="text-white/20 font-black text-4xl uppercase tracking-widest group-hover:text-white/40 transition-colors">
          Preview
        </p>
      </div>
    </div>
  );
}