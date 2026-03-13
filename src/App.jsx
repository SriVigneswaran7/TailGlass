import { useState } from 'react'
import Slider from './Components/Slider'
import GlassPreview from './Components/GlassPreview'

function App() {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(20);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [color, setColor] = useState('#ffffff');
  const [toastMessage, setToastMessage] = useState('');

  const getBlurClass = (val) => {
    if (val <= 0) return '';
    if (val <= 4) return 'backdrop-blur-sm';
    if (val <= 8) return 'backdrop-blur-md';
    if (val <= 12) return 'backdrop-blur-lg';
    if (val <= 16) return 'backdrop-blur-xl';
    if (val <= 24) return 'backdrop-blur-2xl';
    return 'backdrop-blur-3xl';
  };

  const tailwindClasses = `bg-[${color}]/[${(opacity / 100).toFixed(2)}] ${getBlurClass(blur)} border border-white/${(borderOpacity / 100).toFixed(2)} rounded-2xl`;

  const applyPreset = (b, o, bo) => {
    setBlur(b);
    setOpacity(o);
    setBorderOpacity(bo);
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col items-center py-10 px-4 font-sans text-slate-200">
      <div className="relative z-10 w-full max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400 drop-shadow-sm">
            TailGlass
          </h1>
          <p className="text-slate-400 font-medium tracking-wide">
            Modern Glassmorphism Generator for Tailwind v4
          </p>
        </header>

        {/* The Main Grid holding both the Controls and the Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side: Controls */}
          <div className="bg-white/3 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl space-y-8">
            <h2 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Configuration
            </h2>

            <Slider label="Blur Intensity" value={blur} min={0} max={40} onChange={setBlur} suffix="px" />
            <Slider label="Glass Opacity" value={opacity} min={0} max={100} onChange={setOpacity} suffix="%" />
            <Slider label="Border Opacity" value={borderOpacity} min={0} max={100} onChange={setBorderOpacity} suffix="%" />

            <div>
              <label className="text-slate-300 text-sm font-semibold block mb-3">Quick Presets</label>
              <div className="flex gap-2">
                <button onClick={() => applyPreset(16, 20, 30)} className="px-4 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300">Frosted</button>
                <button onClick={() => applyPreset(4, 10, 15)} className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300">Ghost</button>
                <button onClick={() => applyPreset(25, 40, 10)} className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300">Deep Sea</button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label className="text-slate-300 text-sm font-semibold">Glass Tint</label>
                <span className="text-indigo-400 font-mono text-sm uppercase">{color}</span>
              </div>
              <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer"
                />
                <p className="text-slate-500 text-xs italic">Choose a color to tint the glass</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  const cssString = `background-color: ${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(255, 255, 255, ${borderOpacity / 100});`;
                  navigator.clipboard.writeText(cssString);
                  setToastMessage('CSS Code Copied!');
                  setTimeout(() => setToastMessage(''), 3000);
                }}
                className="w-full py-3 rounded-xl bg-white/5 text-slate-300 font-medium border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-[0.98]"
              >
                Copy CSS Code
              </button>
    
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(tailwindClasses);
                  setToastMessage('Tailwind Classes Copied!');
                  setTimeout(() => setToastMessage(''), 3000);
                }}
                className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white font-bold border border-indigo-400/30 shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                Copy Tailwind Classes
              </button>
            </div>
          </div>

          {/* Right Side: The Preview Component (Now safely inside the grid!) */}
          <GlassPreview blur={blur} opacity={opacity} color={color} borderOpacity={borderOpacity} />
          
        </div>
      </div>

      {/* The Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-sm font-medium text-white animate-bounce">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-400/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
            ✓
          </div>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;