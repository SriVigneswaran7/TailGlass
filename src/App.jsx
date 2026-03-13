import { useState } from 'react'
import Slider from './Components/Slider'
import GlassPreview from './Components/GlassPreview'

function App() {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(20);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [color, setColor] = useState('#ffffff');
  const [copyText, setCopyText] = useState("Copy CSS Code");
  const [showToast, setShowToast] = useState(false);

  const getBlurClass = (val) => {
    if (val <= 0) return '';
    if (val <= 4) return 'backdrop-blur-sm';
    if (val <= 8) return 'backdrop-blur-md';
    if (val <= 12) return 'backdrop-blur-lg';
    if (val <= 16) return 'backdrop-blur-xl';
    if (val <= 24) return 'backdrop-blur-2xl';
    return 'backdrop-blur-3xl';
  };

  const tailwindClasses = `bg-white/[${(opacity / 100).toFixed(2)}] ${getBlurClass(blur)} border border-white/${(borderOpacity / 100).toFixed(2)} rounded-2xl`;

  const applyPreset = (b, o, bo) => {
    setBlur(b);
    setOpacity(o);
    setBorderOpacity(bo);
  };

  const generatedCode = `background: ${color}${opacity.toString(16)};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${borderOpacity / 100});
border-radius: 16px;`;

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-6 font-sans">
      <div className="relative z-10 w-full max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-white text-6xl font-black tracking-tighter mb-2">TailGlass</h1>
          <p className="text-slate-400 font-medium">Modern Glassmorphism Generator for Tailwind v4</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl space-y-8">
            <h2 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Configuration
            </h2>

            <Slider label="Blur Intensity" value={blur} min={0} max={40} onChange={setBlur} suffix="px" />
            <Slider label="Glass Opacity" value={opacity} min={0} max={100} onChange={setOpacity} suffix="%" />
            <Slider label="Border Opacity" value={borderOpacity} min={0} max={100} onChange={setBorderOpacity} suffix="%" />

            <div>
              <label className="text-slate-300 text-sm font-semibold block mb-3">Quick Presets</label>
              <div className="flex gap-2">
                <button onClick={() => applyPreset(16, 20, 30)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-white rounded-lg border border-white/10">Frosted</button>
                <button onClick={() => applyPreset(4, 10, 15)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-white rounded-lg border border-white/10">Ghost</button>
                <button onClick={() => applyPreset(25, 40, 10)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-white rounded-lg border border-white/10">Deep Sea</button>
              </div>
            </div>

            {/* BUTTONS WRAPPED IN PT-4 SPACE-Y-3 */}
            <div className="pt-4 space-y-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                  setCopyText("CSS Copied! ✅");
                  setTimeout(() => setCopyText("Copy CSS Code"), 2000);
                }}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all active:scale-95 border border-white/10"
              >
                {copyText}
              </button>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText(tailwindClasses);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                Copy Tailwind Classes
              </button>
            </div>
          </div>

          <GlassPreview blur={blur} opacity={opacity} color={color} borderOpacity={borderOpacity} />
        </div>
      </div>

      {/* TOAST MOVED OUTSIDE THE GRID SO IT FLOATS */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold animate-bounce z-50 border border-white/20">
          🚀 Tailwind Classes Copied!
        </div>
      )}
    </div>
  );
}

export default App