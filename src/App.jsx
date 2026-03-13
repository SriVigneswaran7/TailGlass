import { useState } from 'react'

function App() {
  // 1. These are your "State" variables. They hold the numbers from your sliders.
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(20);
  const [color, setColor] = useState('#ffffff');

  // 2. This string is the magic. It's the CSS code that updates as you move sliders.
  const generatedCode = `background: ${color}${opacity.toString(16)};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, 0.3);
border-radius: 16px;`;

  return (
    <div className="min-h-screen bg-[#030303] relative overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* BACKGROUND BLOBS - This makes the glass look real */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-600 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-white text-6xl font-black tracking-tighter mb-2">TailGlass</h1>
          <p className="text-slate-400 font-medium">Modern Glassmorphism Generator for Tailwind v4</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CONTROLS */}
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
            <h2 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Configuration
            </h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-slate-300 text-sm font-semibold">Blur Intensity</label>
                  <span className="text-indigo-400 font-mono text-sm">{blur}px</span>
                </div>
                <input type="range" min="0" max="40" value={blur} onChange={(e) => setBlur(e.target.value)} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-slate-300 text-sm font-semibold">Glass Opacity</label>
                  <span className="text-indigo-400 font-mono text-sm">{opacity}%</span>
                </div>
                <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(e.target.value)} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                  Copy CSS Code
                </button>
              </div>
            </div>
          </div>

          {/* PREVIEW CONTAINER */}
          <div className="relative flex items-center justify-center min-h-[400px] bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden">
            <div 
              style={{ 
                backgroundColor: `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              className="w-[80%] h-64 rounded-2xl shadow-2xl flex items-center justify-center group transition-all"
            >
              <div className="text-center">
                <p className="text-white/20 font-black text-4xl uppercase tracking-widest group-hover:text-white/40 transition-colors">Preview</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App