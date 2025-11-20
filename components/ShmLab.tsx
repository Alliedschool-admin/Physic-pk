import React, { useState, useEffect, useRef } from 'react';

const ShmLab: React.FC = () => {
  const [mass, setMass] = useState(2); // kg
  const [k, setK] = useState(50); // N/m
  const [amplitude, setAmplitude] = useState(100); // pixels
  const [isPlaying, setIsPlaying] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  
  // Physics Model
  // omega = sqrt(k/m)
  const omega = Math.sqrt(k / mass);
  const period = (2 * Math.PI) / omega;
  const frequency = 1 / period;

  const drawSpring = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, coils: number, width: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx*dx + dy*dy);
    
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    ctx.translate(x1, y1);
    ctx.rotate(Math.atan2(dy, dx));
    
    ctx.moveTo(0, 0);
    // Start segment
    ctx.lineTo(20, 0);
    
    const coilWidth = (len - 40) / coils;
    for (let i = 0; i < coils; i++) {
        const cx = 20 + i * coilWidth;
        ctx.lineTo(cx + coilWidth * 0.25, -width);
        ctx.lineTo(cx + coilWidth * 0.75, width);
    }
    
    ctx.lineTo(len - 20, 0);
    ctx.lineTo(len, 0);
    
    ctx.stroke();
    ctx.restore();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    
    // Time step
    if (isPlaying) {
      timeRef.current += 0.016; // ~60fps
    }
    const t = timeRef.current;

    // Calculations
    // x(t) = A * cos(omega * t)
    const x = amplitude * Math.cos(omega * t);
    const v = -amplitude * omega * Math.sin(omega * t);
    const a = -amplitude * omega * omega * Math.cos(omega * t);

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Origin (Center of oscillation)
    const cx = w / 2;
    const cy = h / 2 - 50; // Shift up slightly to make room for floor

    // Draw Floor
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, cy + 40, w, 10);

    // Draw Wall
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, cy - 60, 40, 120);
    for(let i=0; i<120; i+=10) {
       ctx.beginPath();
       ctx.moveTo(0, cy - 60 + i);
       ctx.lineTo(10, cy - 60 + i + 10);
       ctx.strokeStyle = '#94a3b8';
       ctx.stroke();
    }

    // Current Mass Position
    const massX = cx + x;
    
    // Draw Spring
    // From Wall (40, cy) to Mass (massX - 40, cy)
    drawSpring(ctx, 40, cy, massX - 40, cy, 12, 15);

    // Draw Mass Block
    const boxSize = 80;
    ctx.fillStyle = '#4f46e5'; // Indigo
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    ctx.fillRect(massX - boxSize/2, cy - boxSize/2, boxSize, boxSize);
    ctx.shadowColor = "transparent";
    
    // Mass Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${mass} kg`, massX, cy + 5);

    // Draw Equilibrium Line
    ctx.beginPath();
    ctx.strokeStyle = '#cbd5e1';
    ctx.setLineDash([5,5]);
    ctx.moveTo(cx, cy - 100);
    ctx.lineTo(cx, cy + 100);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Equilibrium (x=0)', cx, cy - 110);

    // Vectors (Velocity & Acceleration)
    const vectorScale = 0.5; // Scaling factor for visualization
    const yVec = cy + 60;

    // Velocity (Green)
    if (Math.abs(v) > 1) {
        const vLen = v * vectorScale;
        ctx.beginPath();
        ctx.strokeStyle = '#10b981'; // Emerald
        ctx.lineWidth = 4;
        ctx.moveTo(massX, yVec);
        ctx.lineTo(massX + vLen, yVec);
        ctx.stroke();
        // Arrowhead
        ctx.beginPath();
        ctx.fillStyle = '#10b981';
        const headDir = v > 0 ? 1 : -1;
        ctx.moveTo(massX + vLen, yVec);
        ctx.lineTo(massX + vLen - 10*headDir, yVec - 5);
        ctx.lineTo(massX + vLen - 10*headDir, yVec + 5);
        ctx.fill();
        ctx.fillText('v', massX + vLen/2, yVec - 10);
    }

    // Acceleration (Red)
    if (Math.abs(a) > 10) {
        const aLen = a * vectorScale * 0.2; // Scale down acceleration more
        const yAcc = yVec + 25;
        ctx.beginPath();
        ctx.strokeStyle = '#ef4444'; // Red
        ctx.lineWidth = 4;
        ctx.moveTo(massX, yAcc);
        ctx.lineTo(massX + aLen, yAcc);
        ctx.stroke();
        // Arrowhead
        ctx.beginPath();
        ctx.fillStyle = '#ef4444';
        const headDirA = a > 0 ? 1 : -1;
        ctx.moveTo(massX + aLen, yAcc);
        ctx.lineTo(massX + aLen - 10*headDirA, yAcc - 5);
        ctx.lineTo(massX + aLen - 10*headDirA, yAcc + 5);
        ctx.fill();
        ctx.fillText('a', massX + aLen/2, yAcc - 10);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mass, k, amplitude, isPlaying]);

  const reset = () => {
      timeRef.current = 0;
      setIsPlaying(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Simple Harmonic Motion (Mass-Spring)</h2>
        <p className="text-slate-600">
          Observe the relationship between displacement, velocity, and acceleration. 
          Note that acceleration is always directed towards the mean position (Hooke's Law: F = -kx).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 h-fit">
          <div>
            <h3 className="font-semibold text-indigo-600 mb-4">Parameters</h3>
            
            <div className="space-y-5">
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                  <span>Mass (m)</span>
                  <span>{mass} kg</span>
                </label>
                <input 
                  type="range" min="1" max="10" step="0.5" value={mass} 
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                  <span>Spring Constant (k)</span>
                  <span>{k} N/m</span>
                </label>
                <input 
                  type="range" min="10" max="200" step="10" value={k} 
                  onChange={(e) => setK(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                  <span>Amplitude (A)</span>
                  <span>{amplitude} px</span>
                </label>
                <input 
                  type="range" min="50" max="200" step="10" value={amplitude} 
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-100 text-center">
             <div>
                <div className="text-xs text-slate-500 uppercase">Period (T)</div>
                <div className="font-mono font-bold text-slate-700">{period.toFixed(2)} s</div>
             </div>
             <div>
                <div className="text-xs text-slate-500 uppercase">Frequency (f)</div>
                <div className="font-mono font-bold text-slate-700">{frequency.toFixed(2)} Hz</div>
             </div>
          </div>

          <div className="flex gap-2">
             <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${isPlaying ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
             >
                {isPlaying ? 'Pause' : 'Resume'}
             </button>
             <button 
                onClick={reset}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
             >
                Reset
             </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-inner flex items-center justify-center overflow-hidden relative">
            <canvas 
                ref={canvasRef} 
                width={700} 
                height={400}
                className="w-full h-auto"
            />
            
            <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg text-xs border border-slate-200 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-1 bg-emerald-500"></div> 
                    <span>Velocity (max at mean)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-red-500"></div> 
                    <span>Acceleration (max at extremes)</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShmLab;