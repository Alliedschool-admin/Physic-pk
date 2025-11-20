import React, { useState, useEffect, useRef } from 'react';

const CircularMotionLab: React.FC = () => {
  const [radius, setRadius] = useState(100); // pixels (scale roughly 100px = 1m)
  const [mass, setMass] = useState(2); // kg
  const [velocity, setVelocity] = useState(5); // m/s
  const [isPlaying, setIsPlaying] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const requestRef = useRef<number | undefined>(undefined);

  // Calculations
  // Fc = mv^2 / r
  // Convert radius pixels to meters for calc (assume 100px = 1m for simplicity in numbers)
  const radiusMeters = radius / 100; 
  const centripetalForce = (mass * Math.pow(velocity, 2)) / radiusMeters;
  
  // Time period T = 2*pi*r / v
  const period = (2 * Math.PI * radiusMeters) / velocity;

  const animate = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const cx = width / 2;
        const cy = height / 2;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Draw Grid
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,height); }
        for(let i=0; i<height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(width,i); }
        ctx.stroke();

        // Draw Center
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();

        // Update angle based on velocity
        // angular velocity w = v/r
        // dt approx 16ms
        if (isPlaying) {
          const angularVelocity = velocity / radiusMeters; // rad/s
          angleRef.current += angularVelocity * 0.016; 
        }

        const x = cx + Math.cos(angleRef.current) * radius;
        const y = cy + Math.sin(angleRef.current) * radius;

        // Draw Path
        ctx.beginPath();
        ctx.strokeStyle = '#e2e8f0';
        ctx.setLineDash([5, 5]);
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw String/Radius
        ctx.beginPath();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Draw Puck
        ctx.beginPath();
        ctx.fillStyle = '#0f766e'; // Teal 700
        ctx.arc(x, y, 15 + mass * 2, 0, Math.PI * 2); // Size depends on mass
        ctx.fill();

        // Vectors
        const scale = 10; // Scale for visual vectors

        // Velocity Vector (Tangent)
        // Tangent direction is angle + 90 deg
        const tanAngle = angleRef.current + Math.PI / 2;
        const vx = Math.cos(tanAngle);
        const vy = Math.sin(tanAngle);
        const vMag = velocity * 8; // Visual length
        
        drawArrow(ctx, x, y, x + vx * vMag, y + vy * vMag, '#f59e0b'); // Amber (Velocity)

        // Centripetal Force Vector (Inward)
        // Direction is opposite to current position vector relative to center
        const fx = Math.cos(angleRef.current + Math.PI); // Inward
        const fy = Math.sin(angleRef.current + Math.PI);
        // Log scale for force because it grows squarely
        const fMag = Math.min(100, Math.sqrt(centripetalForce) * 10); 
        
        drawArrow(ctx, x, y, x + fx * fMag, y + fy * fMag, '#dc2626'); // Red (Force)

        // Labels near puck
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('v', x + vx * vMag + 5, y + vy * vMag);

        ctx.fillStyle = '#dc2626';
        ctx.fillText('Fc', x + fx * fMag + 5, y + fy * fMag);

      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) => {
    const headlen = 10; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [radius, mass, velocity, isPlaying]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Circular Motion</h2>
        <p className="text-slate-600">
          Investigate Centripetal Force (<span className="font-mono">Fc = mv²/r</span>). 
          See how mass, velocity, and radius affect the force needed to keep an object moving in a circle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 h-fit">
           <div>
            <h3 className="font-semibold text-teal-600 mb-4">Parameters</h3>
            
            <div className="space-y-5">
               <div>
                 <label className="flex justify-between text-sm font-medium text-slate-600">
                    <span>Mass (m)</span>
                    <span>{mass} kg</span>
                 </label>
                 <input 
                  type="range" min="1" max="10" value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600"
                 />
               </div>

               <div>
                 <label className="flex justify-between text-sm font-medium text-slate-600">
                    <span>Velocity (v)</span>
                    <span>{velocity} m/s</span>
                 </label>
                 <input 
                  type="range" min="1" max="20" value={velocity}
                  onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600"
                 />
               </div>

               <div>
                 <label className="flex justify-between text-sm font-medium text-slate-600">
                    <span>Radius (r)</span>
                    <span>{radiusMeters.toFixed(1)} m</span>
                 </label>
                 <input 
                  type="range" min="50" max="200" value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600"
                 />
               </div>
            </div>
           </div>

           <div className="pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Centripetal Force</div>
                      <div className="text-xl font-bold text-red-600">{centripetalForce.toFixed(1)} N</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Time Period</div>
                      <div className="text-xl font-bold text-slate-700">{period.toFixed(2)} s</div>
                  </div>
              </div>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full py-2 rounded-lg font-semibold transition-colors ${isPlaying ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
              >
                {isPlaying ? 'Pause' : 'Resume'}
              </button>
           </div>

           <div className="text-xs text-slate-500 leading-relaxed bg-blue-50 p-3 rounded">
              <span className="font-bold text-blue-700">Physics Tip:</span> The force vector (Red) always points to the center, while velocity (Amber) is always tangent to the path. They are perpendicular!
           </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-inner flex items-center justify-center overflow-hidden">
            <canvas 
                ref={canvasRef}
                width={600}
                height={500}
                className="w-full h-full object-contain"
            />
        </div>
      </div>
    </div>
  );
};

export default CircularMotionLab;