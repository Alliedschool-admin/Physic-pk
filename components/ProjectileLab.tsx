import React, { useState, useEffect, useRef, useCallback } from 'react';

const ProjectileLab: React.FC = () => {
  const [velocity, setVelocity] = useState(60); // m/s
  const [angle, setAngle] = useState(45); // degrees
  const [isAnimating, setIsAnimating] = useState(false);
  const [time, setTime] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const g = 9.8; // Gravity

  // Physics calculations
  const rad = (deg: number) => deg * (Math.PI / 180);
  const vx = velocity * Math.cos(rad(angle));
  const vyInitial = velocity * Math.sin(rad(angle));
  
  const totalFlightTime = (2 * vyInitial) / g;
  const maxRange = vx * totalFlightTime;
  const maxHeight = (vyInitial * vyInitial) / (2 * g);

  const animate = useCallback((timestamp: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = (timestamp - previousTimeRef.current) / 1000; // seconds
      // Speed up simulation time x5 for UX
      setTime((prevTime) => {
        const newTime = prevTime + deltaTime * 4; 
        if (newTime >= totalFlightTime) {
            setIsAnimating(false);
            return totalFlightTime;
        }
        return newTime;
      });
    }
    previousTimeRef.current = timestamp;
    if (isAnimating) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [isAnimating, totalFlightTime]);

  useEffect(() => {
    if (isAnimating) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      previousTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isAnimating, animate]);

  const resetSim = () => {
    setIsAnimating(false);
    setTime(0);
  };

  const togglePlay = () => {
    if (time >= totalFlightTime) setTime(0);
    setIsAnimating(!isAnimating);
  };

  // Drawing the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear
    ctx.clearRect(0, 0, width, height);

    // Scale factor to fit in view (approximate based on max range of 100m/s at 45deg ~ 1000m)
    // Canvas 800px wide. Let 1px = 1 meter roughly for lower speeds, scale down for high.
    const scale = Math.min(width / (maxRange * 1.2 || 1), height / (maxHeight * 2 || 1), 1.5);
    
    const originX = 50;
    const originY = height - 50;

    // Draw Axis
    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.moveTo(originX, originY);
    ctx.lineTo(width - 20, originY); // X axis
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, 20); // Y axis
    ctx.stroke();

    // Draw Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter';
    ctx.fillText('Range (m)', width - 60, originY + 20);
    ctx.fillText('Height (m)', 10, 20);

    // Draw Trajectory Path (Parabola)
    ctx.beginPath();
    ctx.strokeStyle = '#cbd5e1';
    ctx.setLineDash([5, 5]);
    ctx.moveTo(originX, originY);
    for(let t = 0; t <= totalFlightTime; t += 0.1) {
        const dx = vx * t;
        const dy = (vyInitial * t) - (0.5 * g * t * t);
        ctx.lineTo(originX + dx * scale, originY - dy * scale);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Current Ball
    const currentDx = vx * time;
    const currentDy = (vyInitial * time) - (0.5 * g * time * time);
    
    const ballX = originX + currentDx * scale;
    const ballY = originY - currentDy * scale;

    ctx.beginPath();
    ctx.fillStyle = '#ef4444'; // Red ball
    ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw Vector arrow on ball
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.moveTo(ballX, ballY);
    // Tangent angle
    const vyCurrent = vyInitial - g * time;
    const vAngle = Math.atan2(vyCurrent, vx);
    const vMag = 30; // visual length
    ctx.lineTo(ballX + Math.cos(vAngle) * vMag, ballY - Math.sin(vAngle) * vMag);
    ctx.stroke();

  }, [time, velocity, angle, totalFlightTime, maxRange, maxHeight, vx, vyInitial, g]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Projectile Motion</h2>
        <p className="text-slate-600">
          Study the motion of objects projected into the air. Note how the horizontal velocity (<span className="font-mono">Vx</span>) remains constant while vertical velocity (<span className="font-mono">Vy</span>) changes due to gravity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Parameters</h3>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Initial Velocity (v₀)</label>
                    <input 
                        type="range" min="10" max="100" 
                        value={velocity} onChange={(e) => { resetSim(); setVelocity(Number(e.target.value)); }}
                        className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>10 m/s</span>
                        <span className="font-bold text-teal-700">{velocity} m/s</span>
                        <span>100 m/s</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Launch Angle (θ)</label>
                    <input 
                        type="range" min="10" max="90" 
                        value={angle} onChange={(e) => { resetSim(); setAngle(Number(e.target.value)); }}
                        className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600"
                    />
                     <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>10°</span>
                        <span className="font-bold text-teal-700">{angle}°</span>
                        <span>90°</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <button 
                        onClick={togglePlay}
                        className={`w-full py-3 rounded-lg font-semibold shadow-sm transition-all ${
                            isAnimating 
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                    >
                        {isAnimating ? 'Pause Simulation' : (time > 0 && time < totalFlightTime) ? 'Resume' : (time >= totalFlightTime ? 'Restart' : 'Launch Projectile')}
                    </button>
                    <button 
                        onClick={resetSim}
                        className="w-full mt-2 py-2 text-sm text-slate-500 hover:text-slate-800"
                    >
                        Reset
                    </button>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-1">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Max Height (H):</span>
                        <span className="font-mono text-slate-800">{maxHeight.toFixed(1)}m</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Range (R):</span>
                        <span className="font-mono text-slate-800">{maxRange.toFixed(1)}m</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Flight Time (T):</span>
                        <span className="font-mono text-slate-800">{totalFlightTime.toFixed(1)}s</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="lg:col-span-3 bg-slate-900 rounded-xl shadow-inner flex items-center justify-center overflow-hidden relative">
            <canvas 
                ref={canvasRef} 
                width={800} 
                height={500} 
                className="w-full h-auto max-h-[600px]"
            />
            {time >= totalFlightTime && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-6 py-4 rounded-xl shadow-lg text-center backdrop-blur-sm">
                    <h4 className="font-bold text-slate-900 text-lg">Impact!</h4>
                    <p className="text-slate-600">Distance: {maxRange.toFixed(1)}m</p>
                    <button onClick={resetSim} className="mt-2 text-teal-600 font-medium text-sm hover:underline">
                        Reset
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectileLab;