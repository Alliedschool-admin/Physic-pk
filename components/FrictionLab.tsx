import React, { useState, useMemo } from 'react';

const FrictionLab: React.FC = () => {
  const [appliedForce, setAppliedForce] = useState(0);
  const [mass, setMass] = useState(10); // kg
  const [surfaceType, setSurfaceType] = useState<'wood' | 'ice' | 'rubber'>('wood');

  const g = 9.8;

  // Coefficients based on surface
  const coeffs = useMemo(() => {
    switch (surfaceType) {
      case 'ice': return { static: 0.1, kinetic: 0.05, color: '#dbeafe', label: 'Ice (Slippery)' };
      case 'rubber': return { static: 0.9, kinetic: 0.7, color: '#1e293b', label: 'Rubber (Grippy)' };
      case 'wood': default: return { static: 0.5, kinetic: 0.3, color: '#d97706', label: 'Wood (Medium)' };
    }
  }, [surfaceType]);

  const normalForce = mass * g;
  const maxStaticFriction = normalForce * coeffs.static;
  const kineticFriction = normalForce * coeffs.kinetic;

  // Physics Logic
  let frictionForce = 0;
  let isMoving = false;
  let acceleration = 0;
  let netForce = 0;

  if (appliedForce <= maxStaticFriction) {
    // Static case
    frictionForce = appliedForce;
    isMoving = false;
    acceleration = 0;
  } else {
    // Kinetic case
    frictionForce = kineticFriction;
    isMoving = true;
    netForce = appliedForce - frictionForce;
    acceleration = netForce / mass;
  }

  // Visual scaling for vectors
  const vectorScale = 2; 
  const boxSize = 80;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Forces and Friction</h2>
        <p className="text-slate-600 mt-1">
          Explore the difference between <span className="font-bold text-amber-600">Static Friction</span> (stationary) 
          and <span className="font-bold text-teal-600">Kinetic Friction</span> (moving). 
          Notice how friction opposes motion and how it changes once the object starts sliding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-8 h-fit">
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">1. Choose Surface</h3>
            <div className="flex gap-2">
              {(['wood', 'ice', 'rubber'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSurfaceType(type)}
                  className={`flex-1 py-2 text-sm rounded-lg border-2 capitalize font-medium transition-all ${
                    surfaceType === type 
                      ? 'border-teal-500 bg-teal-50 text-teal-700' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-slate-500 flex justify-between">
              <span>μₛ: {coeffs.static}</span>
              <span>μₖ: {coeffs.kinetic}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4">2. Object Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                  <span>Mass (m)</span>
                  <span>{mass} kg</span>
                </label>
                <input 
                  type="range" min="1" max="50" value={mass} 
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4">3. Apply Force</h3>
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                  <span>Applied Force (F)</span>
                  <span className="text-blue-600 font-bold">{appliedForce} N</span>
                </label>
                <input 
                  type="range" min="0" max="500" value={appliedForce} 
                  onChange={(e) => setAppliedForce(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Max Static Friction (fₛ,max):</span>
              <span className="font-mono">{maxStaticFriction.toFixed(1)} N</span>
            </div>
             <div className="flex justify-between">
              <span className="text-slate-500">Kinetic Friction (fₖ):</span>
              <span className="font-mono">{kineticFriction.toFixed(1)} N</span>
            </div>
            <div className="h-px bg-slate-200 my-2"></div>
            <div className="flex justify-between font-bold">
              <span className={isMoving ? "text-green-600" : "text-slate-600"}>
                State: {isMoving ? "MOVING" : "STATIONARY"}
              </span>
              {isMoving && <span className="text-teal-600">a = {acceleration.toFixed(2)} m/s²</span>}
            </div>
          </div>
        </div>

        {/* Simulation Area */}
        <div className="lg:col-span-2 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          
          {/* Sky/Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-sky-50 z-0"></div>
          
          {/* Floor */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-slate-200 to-slate-300 border-t border-slate-300 z-0 flex items-center justify-center">
              {isMoving && (
                <div className="w-full h-full opacity-10 animate-slide-bg" 
                     style={{
                       backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #94a3b8 40px, #94a3b8 42px)',
                       animation: `slideLeft ${Math.max(0.5, 2 - acceleration * 0.1)}s linear infinite`
                     }}
                ></div>
              )}
          </div>

          {/* SVG Visualization */}
          <svg width="100%" height="100%" viewBox="0 0 600 400" className="z-10" style={{ overflow: 'visible' }}>
            <defs>
              <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" />
              </marker>
              <marker id="arrow-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#dc2626" />
              </marker>
              <marker id="arrow-gray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>

            {/* Box */}
            <g transform="translate(300, 260)">
              <rect 
                x={-boxSize/2} y={-boxSize} 
                width={boxSize} height={boxSize} 
                fill={coeffs.color} 
                stroke="#475569" 
                strokeWidth="2"
                className="shadow-sm"
              />
              <text x="0" y={-boxSize/2 + 5} textAnchor="middle" fill="white" fontWeight="bold" style={{ mixBlendMode: 'difference' }}>
                {mass} kg
              </text>

              {/* Weight Vector (mg) */}
              <line x1="0" y1="0" x2="0" y2={Math.min(100, normalForce * 0.5)} stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow-gray)" />
              <text x="10" y={Math.min(100, normalForce * 0.5)} fontSize="12" fill="#64748b">W = mg</text>

              {/* Normal Force Vector (N) */}
              <line x1="0" y1={-boxSize} x2="0" y2={-boxSize - Math.min(100, normalForce * 0.5)} stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow-gray)" />
              <text x="10" y={-boxSize - Math.min(100, normalForce * 0.5) - 5} fontSize="12" fill="#64748b">N</text>

              {/* Applied Force Vector (Right) */}
              {appliedForce > 0 && (
                <>
                  <line 
                    x1={boxSize/2} y1={-boxSize/2} 
                    x2={boxSize/2 + Math.min(200, appliedForce * 0.8)} y2={-boxSize/2} 
                    stroke="#2563eb" strokeWidth="4" 
                    markerEnd="url(#arrow-blue)" 
                  />
                  <text x={boxSize/2 + Math.min(200, appliedForce * 0.8) + 5} y={-boxSize/2 - 10} fontSize="14" fontWeight="bold" fill="#2563eb">
                    F_app
                  </text>
                </>
              )}

              {/* Friction Force Vector (Left) */}
              {frictionForce > 0 && (
                <>
                  <line 
                    x1={-boxSize/2} y1={-boxSize/2} 
                    x2={-boxSize/2 - Math.min(200, frictionForce * 0.8)} y2={-boxSize/2} 
                    stroke="#dc2626" strokeWidth="4" 
                    markerEnd="url(#arrow-red)" 
                  />
                  <text x={-boxSize/2 - Math.min(200, frictionForce * 0.8) - 40} y={-boxSize/2 - 10} fontSize="14" fontWeight="bold" fill="#dc2626">
                    f_{isMoving ? 'k' : 's'}
                  </text>
                </>
              )}
            </g>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg text-xs border border-slate-200 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1"><div className="w-3 h-1 bg-blue-600"></div> Applied Force</div>
            <div className="flex items-center gap-2 mb-1"><div className="w-3 h-1 bg-red-600"></div> Friction</div>
            <div className="flex items-center gap-2"><div className="w-3 h-1 bg-slate-500"></div> Normal / Weight</div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideLeft {
          from { background-position: 0 0; }
          to { background-position: -82px 0; }
        }
        .animate-slide-bg {
          will-change: background-position;
        }
      `}</style>
    </div>
  );
};

export default FrictionLab;