import React, { useState } from 'react';
import { Layers, Activity, Zap, Cpu, Sliders, ShieldCheck } from 'lucide-react';

export const ResearchSimulationViz: React.FC = () => {
  const [distanceMm, setDistanceMm] = useState<number>(12);
  const [frequencyKhz, setFrequencyKhz] = useState<number>(433);
  const [coilRadiusMm, setCoilRadiusMm] = useState<number>(25);
  const [hasFerriteShield, setHasFerriteShield] = useState<boolean>(true);

  // Analytical approximations based on Neumann formula for coaxial circular filamentary coils:
  // k ~ (r1 * r2)^1.5 / (r1^2 + r2^2 + d^2)^1.5 * (ferriteFactor)
  const ferriteMultiplier = hasFerriteShield ? 1.35 : 1.0;
  const denominator = Math.pow(coilRadiusMm * coilRadiusMm * 2 + distanceMm * distanceMm, 1.5);
  const rawCoupling = (Math.pow(coilRadiusMm * coilRadiusMm, 1.5) / denominator) * ferriteMultiplier;
  const couplingFactor = Math.min(0.65, Math.max(0.04, rawCoupling));

  // Quality factor Q ~ omega * L / R. At sub-MHz with Litz wire Q is approx 180.
  const qFactor = Math.round(140 + (frequencyKhz / 1000) * 80);
  const figureOfMerit = couplingFactor * couplingFactor * qFactor * qFactor;
  // Link Efficiency eta
  const efficiency = Math.min(89, Math.round((figureOfMerit / Math.pow(1 + Math.sqrt(1 + figureOfMerit), 2)) * 100));

  // Specific Absorption Rate (SAR) approximation in human brain / subcutaneous tissue:
  // Tissue conductivity sigma ~ 0.5 S/m, E-field induced proportional to omega * B.
  // SAR is extremely low at sub-MHz (< 0.05 W/kg vs 2.0 W/kg safety threshold)
  const sarValue = ((0.008 * Math.pow(frequencyKhz / 433, 1.8) * (distanceMm / 10)) / (hasFerriteShield ? 1.4 : 1.0)).toFixed(4);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1017] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635] font-mono">Interactive Electromagnetic Model</span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Sub-MHz Inductive Wireless Power Link Simulator</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
            FEM Simulation Formulation (Ansys Maxwell / HFSS Concept)
          </span>
        </div>
      </div>

      {/* Interactive Visual Canvas */}
      <div className="my-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Animated Field & Coil Cross-Section */}
        <div className="md:col-span-7 relative h-72 rounded-lg bg-slate-950 p-2 border border-slate-800 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 240" className="h-full w-full select-none" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="wptGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a3e635" stopOpacity={couplingFactor * 1.2} />
                <stop offset="70%" stopColor="#a3e635" stopOpacity={couplingFactor * 0.3} />
                <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Magnetic vector potential glow */}
            <ellipse
              cx="250"
              cy="120"
              rx={180 * couplingFactor * 2}
              ry="75"
              fill="url(#wptGlow)"
            />

            {/* External Primary TX Coil (Left) */}
            <g transform="translate(130, 120)">
              {/* Core & Ferrite */}
              <rect x="-14" y="-70" width="10" height="140" rx="3" fill="#3f3f46" stroke="#71717a" strokeWidth="1" />
              {/* Litz wire turns */}
              {[-50, -35, -20, -5, 10, 25, 40, 55].map((y, i) => (
                <circle key={i} cx="-2" cy={y} r="5" fill="#a3e635" stroke="#000" strokeWidth="1">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <text x="-4" y="-80" fill="#a3e635" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">TX Coil</text>
              <text x="-4" y="95" fill="#94a3b8" fontSize="8" textAnchor="middle">Ø {coilRadiusMm * 2}mm</text>
            </g>

            {/* Biological Tissue Boundary (Center) */}
            <g transform="translate(225, 30)">
              <rect x="0" y="0" width="50" height="180" rx="6" fill="#fb7185" fillOpacity="0.1" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
              <text x="25" y="20" fill="#fda4af" fontSize="8" textAnchor="middle" fontWeight="bold">EPIDERMIS</text>
              <text x="25" y="95" fill="#f43f5e" fontSize="7" textAnchor="middle" fontFamily="monospace">Gap: {distanceMm}mm</text>
              <text x="25" y="165" fill="#fda4af" fontSize="7" textAnchor="middle">Low Loss</text>
            </g>

            {/* Implanted Secondary RX Coil (Right) */}
            <g transform={`translate(${300 + (distanceMm - 12) * 3}, 120)`}>
              {/* Ferrite Shield */}
              {hasFerriteShield && (
                <rect x="12" y="-55" width="6" height="110" rx="2" fill="#38bdf8" />
              )}
              {/* Coil Turns */}
              <rect x="0" y="-55" width="8" height="110" rx="2" fill="#18181b" stroke="#71717a" strokeWidth="1" />
              {[-40, -25, -10, 5, 20, 35].map((y, i) => (
                <circle key={i} cx="4" cy={y} r="4" fill="#c084fc" stroke="#000" strokeWidth="1" />
              ))}
              {/* ASIC Chip */}
              <rect x="22" y="-20" width="40" height="40" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              <text x="42" y="3" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ASIC</text>
              <text x="4" y="-65" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">RX Coil</text>
              <text x="25" y="75" fill="#94a3b8" fontSize="8" textAnchor="middle">Implant</text>
            </g>

            {/* Flux Lines */}
            <path
              d="M 130 50 C 230 10, 270 10, 340 50"
              fill="none"
              stroke="#a3e635"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity={couplingFactor > 0.2 ? '0.7' : '0.2'}
            />
            <path
              d="M 130 190 C 230 230, 270 230, 340 190"
              fill="none"
              stroke="#a3e635"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity={couplingFactor > 0.2 ? '0.7' : '0.2'}
            />
          </svg>
        </div>

        {/* Real-time Computed Values */}
        <div className="md:col-span-5 grid grid-cols-2 gap-2.5 font-mono text-xs">
          <div className="rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 p-3">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase">Coupling Factor (k)</span>
            <span className="text-lg font-bold text-[#65a30d] dark:text-[#a3e635]">{couplingFactor.toFixed(3)}</span>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 block mt-0.5">Mutual Induction</span>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 p-3">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase">Transfer Efficiency</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{efficiency}%</span>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 block mt-0.5">Resonant Tank η</span>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 p-3">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase">Estimated SAR</span>
            <span className="text-base font-bold text-sky-600 dark:text-sky-400">{sarValue} W/kg</span>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 block mt-0.5">IEEE Safe &lt; 2.0</span>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 p-3">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase">Tank Quality (Q)</span>
            <span className="text-base font-bold text-slate-900 dark:text-white">{qFactor}</span>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 block mt-0.5">Litz Wire Spiral</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-3 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/20 p-4 text-xs">
        <div className="flex items-center justify-between text-slate-700 dark:text-zinc-300 font-mono">
          <span className="flex items-center gap-1.5 font-bold">
            <Sliders className="h-4 w-4 text-[#65a30d] dark:text-[#a3e635]" />
            Geometric & Electrical Sliders
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasFerriteShield}
              onChange={(e) => setHasFerriteShield(e.target.checked)}
              className="accent-[#a3e635] rounded cursor-pointer"
            />
            <span className="text-[11px] text-slate-600 dark:text-zinc-400">Ferrite Flux Shield Active</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 font-mono">
          <div>
            <div className="flex justify-between text-slate-600 dark:text-zinc-400 mb-1">
              <span>Tissue Depth (d)</span>
              <span className="font-bold text-slate-900 dark:text-white">{distanceMm} mm</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={distanceMm}
              aria-label="Tissue Depth"
              onChange={(e) => setDistanceMm(parseInt(e.target.value, 10))}
              className="w-full accent-[#a3e635] bg-slate-300 dark:bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-600 dark:text-zinc-400 mb-1">
              <span>Frequency (f0)</span>
              <span className="font-bold text-slate-900 dark:text-white">{frequencyKhz} kHz</span>
            </div>
            <input
              type="range"
              min="100"
              max="900"
              step="25"
              value={frequencyKhz}
              aria-label="Frequency"
              onChange={(e) => setFrequencyKhz(parseInt(e.target.value, 10))}
              className="w-full accent-[#a3e635] bg-slate-300 dark:bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-600 dark:text-zinc-400 mb-1">
              <span>Coil Radius (r)</span>
              <span className="font-bold text-slate-900 dark:text-white">{coilRadiusMm} mm</span>
            </div>
            <input
              type="range"
              min="15"
              max="40"
              step="1"
              value={coilRadiusMm}
              aria-label="Coil Radius"
              onChange={(e) => setCoilRadiusMm(parseInt(e.target.value, 10))}
              className="w-full accent-[#a3e635] bg-slate-300 dark:bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 dark:text-zinc-500">
          <span>Simulation principles based on UET Mardan research paper. Low-frequency design prevents dangerous eddy heating.</span>
          <button
            onClick={() => {
              setDistanceMm(12);
              setFrequencyKhz(433);
              setCoilRadiusMm(25);
              setHasFerriteShield(true);
            }}
            className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
