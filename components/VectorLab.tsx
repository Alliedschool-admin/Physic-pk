import React, { useState, useMemo } from 'react';

const VectorLab: React.FC = () => {
  const [ax, setAx] = useState(150);
  const [ay, setAy] = useState(50);
  const [bx, setBx] = useState(50);
  const [by, setBy] = useState(100);

  // Canvas center
  const cx = 200;
  const cy = 200;

  // Calculate vectors relative to center
  // Note: SVG Y coordinates are inverted relative to standard cartesian graph
  // We will treat (cx, cy) as origin (0,0)
  
  // Vector A components
  const vecA = useMemo(() => ({ x: ax, y: -ay }), [ax, ay]);
  
  // Vector B components
  const vecB = useMemo(() => ({ x: bx, y: -by }), [bx, by]);
  
  // Resultant R = A + B
  const vecR = useMemo(() => ({ x: vecA.x + vecB.x, y: vecA.y + vecB.y }), [vecA, vecB]);

  // Magnitude helper
  const mag = (x: number, y: number) => Math.sqrt(x*x + y*y).toFixed(1);
  // Angle helper (degrees)
  const ang = (x: number, y: number) => {
    let theta = Math.atan2(-y, x) * (180 / Math.PI); // -y because svg y is down
    if (theta < 0) theta += 360;
    return theta.toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Vector Addition (Head-to-Tail Rule)</h2>
        <p className="text-slate-600 mt-1">
          Visualize how vectors add up. In FSc Physics Chapter 2, the resultant vector 
          <span className="font-mono font-bold mx-1">R = A + B</span> starts from the tail of the first vector 
          to the head of the last vector.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
          <div>
            <h3 className="font-semibold text-teal-600 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Vector A
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500">X Component (Ax)</label>
                <input 
                  type="range" min="-150" max="150" value={ax} 
                  onChange={(e) => setAx(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="text-right text-xs text-slate-600">{ax}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Y Component (Ay)</label>
                <input 
                  type="range" min="-150" max="150" value={ay} 
                  onChange={(e) => setAy(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="text-right text-xs text-slate-600">{ay}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-teal-600 mb-3 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Vector B
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500">X Component (Bx)</label>
                <input 
                  type="range" min="-150" max="150" value={bx} 
                  onChange={(e) => setBx(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="text-right text-xs text-slate-600">{bx}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Y Component (By)</label>
                <input 
                  type="range" min="-150" max="150" value={by} 
                  onChange={(e) => setBy(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="text-right text-xs text-slate-600">{by}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 relative">
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px] max-h-[500px] bg-white rounded-lg shadow-inner border border-slate-100">
            {/* Grid Lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              </pattern>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
              <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
              </marker>
              <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
              </marker>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Axes */}
            <line x1="200" y1="0" x2="200" y2="400" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="2" />

            {/* Vector A (Blue) - Starts at origin */}
            <line 
              x1={cx} y1={cy} 
              x2={cx + vecA.x} y2={cy + vecA.y} 
              stroke="#3b82f6" strokeWidth="3" 
              markerEnd="url(#arrowhead-blue)"
            />
            
            {/* Vector B (Red) - Starts at head of A */}
            <line 
              x1={cx + vecA.x} y1={cy + vecA.y} 
              x2={cx + vecA.x + vecB.x} y2={cy + vecA.y + vecB.y} 
              stroke="#ef4444" strokeWidth="3" 
              markerEnd="url(#arrowhead-red)"
              strokeDasharray="5,5"
            />

            {/* Resultant R (Green) - Origin to head of B */}
            <line 
              x1={cx} y1={cy} 
              x2={cx + vecR.x} y2={cy + vecR.y} 
              stroke="#10b981" strokeWidth="4" 
              markerEnd="url(#arrowhead-green)"
              opacity="0.8"
            />
          </svg>

          <div className="grid grid-cols-3 gap-4 w-full mt-4">
             <div className="text-center p-2 bg-blue-50 rounded border border-blue-100">
                <div className="text-blue-800 font-bold">Vector A</div>
                <div className="text-xs text-blue-600">Mag: {mag(vecA.x, vecA.y)}</div>
                <div className="text-xs text-blue-600">θ: {ang(vecA.x, vecA.y)}°</div>
             </div>
             <div className="text-center p-2 bg-red-50 rounded border border-red-100">
                <div className="text-red-800 font-bold">Vector B</div>
                <div className="text-xs text-red-600">Mag: {mag(vecB.x, vecB.y)}</div>
                <div className="text-xs text-red-600">θ: {ang(vecB.x, vecB.y)}°</div>
             </div>
             <div className="text-center p-2 bg-green-50 rounded border border-green-100">
                <div className="text-green-800 font-bold">Resultant R</div>
                <div className="text-xs text-green-600">Mag: {mag(vecR.x, vecR.y)}</div>
                <div className="text-xs text-green-600">θ: {ang(vecR.x, vecR.y)}°</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VectorLab;