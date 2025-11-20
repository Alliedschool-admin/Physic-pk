import React, { useState, useMemo } from 'react';

const OpticsLab: React.FC = () => {
  // All units in 'simulated' pixels. 1 cm approx 20px
  const [focalLength, setFocalLength] = useState(100); // f
  const [objectDist, setObjectDist] = useState(200); // p (distance from center)
  const [objectHeight, setObjectHeight] = useState(60); // h_o

  // Lens Equation: 1/f = 1/p + 1/q  => 1/q = 1/f - 1/p  => q = (p*f) / (p - f)
  // Magnification: M = -q/p = h_i / h_o
  
  // Calculate Image Distance (q)
  // Note: objectDist is p (positive by convention for real object)
  // focalLength is f (positive for convex lens)
  
  const imageDist = (objectDist * focalLength) / (objectDist - focalLength);
  const magnification = -imageDist / objectDist;
  const imageHeight = objectHeight * magnification;

  // Determine nature
  const isReal = objectDist > focalLength;
  const isVirtual = objectDist < focalLength;
  const atFocus = objectDist === focalLength;

  // SVG Coord Helpers
  // Center (Optical Center) at (350, 200)
  const cx = 350;
  const cy = 200;
  
  // Object Position (Always to left)
  const objX = cx - objectDist;
  const objY = cy - objectHeight;

  // Image Position
  // if q is positive, it's to right (Real)
  // if q is negative, it's to left (Virtual)
  const imgX = cx + imageDist;
  const imgY = cy - imageHeight; // SVG y increases downward, so subtract height if positive (upright) or add if negative (inverted)
  // Note regarding my calc: 
  // if real: imageDist > 0. mag < 0. imageHeight < 0. cy - (-val) = cy + val (below axis). Correct.
  // if virtual: imageDist < 0. mag > 0. imageHeight > 0. cy - (+val) = cy - val (above axis). Correct.

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Ray Optics (Convex Lens)</h2>
        <p className="text-slate-600">
          Explore image formation. Move the object to see how the image changes from Real/Inverted to Virtual/Upright 
          as you cross the focal point (<span className="font-mono">p &lt; f</span>).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 h-fit">
            <div>
                <h3 className="font-semibold text-cyan-600 mb-4">Parameters</h3>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                           Focal Length (f)
                        </label>
                        <input 
                            type="range" min="50" max="150" value={focalLength}
                            onChange={(e) => setFocalLength(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg accent-cyan-600"
                        />
                        <div className="text-right text-xs text-slate-500">{focalLength} units</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                           Object Distance (p)
                        </label>
                        <input 
                            type="range" min="10" max="300" value={objectDist}
                            onChange={(e) => setObjectDist(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg accent-cyan-600"
                        />
                        <div className="text-right text-xs text-slate-500">{objectDist} units</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                           Object Height (h₀)
                        </label>
                        <input 
                            type="range" min="20" max="100" value={objectHeight}
                            onChange={(e) => setObjectHeight(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg accent-cyan-600"
                        />
                        <div className="text-right text-xs text-slate-500">{objectHeight} units</div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">Image Distance (q):</span>
                    <span className="font-mono font-bold text-slate-700">
                        {atFocus ? '∞' : Math.abs(imageDist).toFixed(1)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Magnification (M):</span>
                    <span className="font-mono font-bold text-slate-700">
                         {atFocus ? '∞' : Math.abs(magnification).toFixed(2)}x
                    </span>
                </div>
                <div className="h-px bg-slate-200 my-2"></div>
                <div className="font-bold text-center uppercase tracking-wider text-slate-800">
                    {atFocus ? 'No Image Formed' : (isReal ? 'Real & Inverted' : 'Virtual & Upright')}
                </div>
            </div>
        </div>

        <div className="lg:col-span-2 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative min-h-[400px]">
             <svg viewBox="0 0 700 400" className="w-full h-full">
                <defs>
                    <marker id="arrow-ray" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" opacity="0.8" />
                    </marker>
                </defs>

                {/* Principal Axis */}
                <line x1="0" y1={cy} x2="700" y2={cy} stroke="#94a3b8" strokeWidth="1" />

                {/* Lens */}
                <path 
                    d={`M ${cx} ${cy-150} Q ${cx+30} ${cy} ${cx} ${cy+150} Q ${cx-30} ${cy} ${cx} ${cy-150}`} 
                    fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" opacity="0.6"
                />
                <line x1={cx} y1={cy-150} x2={cx} y2={cy+150} stroke="#38bdf8" strokeDasharray="4,4" opacity="0.5" />

                {/* Focal Points */}
                <circle cx={cx - focalLength} cy={cy} r="3" fill="#ef4444" />
                <text x={cx - focalLength - 5} y={cy + 20} fontSize="12" fill="#ef4444">F</text>
                
                <circle cx={cx + focalLength} cy={cy} r="3" fill="#ef4444" />
                <text x={cx + focalLength - 5} y={cy + 20} fontSize="12" fill="#ef4444">F'</text>

                {/* Object (Blue Arrow) */}
                <line x1={objX} y1={cy} x2={objX} y2={objY} stroke="#2563eb" strokeWidth="4" />
                <polygon points={`${objX-5},${objY} ${objX+5},${objY} ${objX},${objY-10}`} fill="#2563eb" />
                <text x={objX - 10} y={cy + 20} fontSize="12" fill="#2563eb" fontWeight="bold">Object</text>

                {!atFocus && (
                    <>
                        {/* Image (Green Arrow) */}
                        <line x1={imgX} y1={cy} x2={imgX} y2={imgY} stroke="#10b981" strokeWidth="4" opacity="0.8" />
                        {/* Arrowhead logic for image depending on inversion */}
                        {imageHeight < 0 ? (
                            // Inverted (Real)
                             <polygon points={`${imgX-5},${imgY} ${imgX+5},${imgY} ${imgX},${imgY+10}`} fill="#10b981" opacity="0.8" />
                        ) : (
                            // Upright (Virtual)
                             <polygon points={`${imgX-5},${imgY} ${imgX+5},${imgY} ${imgX},${imgY-10}`} fill="#10b981" opacity="0.8" />
                        )}
                        <text x={imgX - 10} y={cy + (imageHeight < 0 ? -20 : 20)} fontSize="12" fill="#10b981" fontWeight="bold">Image</text>

                        {/* Ray 1: Parallel to axis, then through F' */}
                        <path d={`M ${objX} ${objY} L ${cx} ${objY} L ${isReal ? imgX : 700} ${isReal ? imgY : cy - (700-cx)*(objY-cy)/focalLength}`} stroke="#f59e0b" strokeWidth="2" fill="none" markerMid="url(#arrow-ray)" />
                        {isVirtual && (
                             <line x1={cx} y1={objY} x2={imgX} y2={imgY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                        )}

                        {/* Ray 2: Through Optical Center (undeviated) */}
                        <line 
                            x1={objX} y1={objY} 
                            x2={isReal ? imgX : (cx + (cx-objX))} y2={isReal ? imgY : (cy + (cy-objY))} 
                            stroke="#f59e0b" strokeWidth="2" opacity="0.8" 
                        />
                         {isVirtual && (
                             <line x1={cx} y1={cy} x2={imgX} y2={imgY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                        )}
                    </>
                )}

                {atFocus && (
                    <>
                       {/* Parallel rays exiting */}
                       <line x1={objX} y1={objY} x2={cx} y2={objY} stroke="#f59e0b" strokeWidth="2" />
                       <line x1={cx} y1={objY} x2={700} y2={cy + (700-cx)*(focalLength)/(focalLength)} stroke="#f59e0b" strokeWidth="2" />
                       
                       <line x1={objX} y1={objY} x2={700} y2={objY + (700-objX)*(cy-objY)/(cx-objX)} stroke="#f59e0b" strokeWidth="2" />
                       <text x={500} y={100} fill="#64748b">Rays are parallel (Image at ∞)</text>
                    </>
                )}
             </svg>
        </div>
      </div>
    </div>
  );
};

export default OpticsLab;