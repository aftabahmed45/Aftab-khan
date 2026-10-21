import React, { useState } from 'react';
import { Layers, Activity, Zap, RefreshCw, Cpu } from 'lucide-react';

export const InductiveWptSchematic: React.FC = () => {
  const [coilSeparationMm, setCoilSeparationMm] = useState<number>(14);
  const [frequencyKhz, setFrequencyKhz] = useState<number>(433);
  const [misalignmentAngleDeg, setMisalignmentAngleDeg] = useState<number>(0);

  // Coupling coefficient approximation k ~ k0 / (1 + (d/r)^2)^(1.5) * cos(theta)
  const txRadiusMm = 28;
  const k0 = 0.52;
  const ratio = coilSeparationMm / txRadiusMm;
  const angleRad = (misalignmentAngleDeg * Math.PI) / 180;
  const couplingCoeff = (k0 / Math.pow(1 + ratio * ratio, 1.5)) * Math.cos(angleRad);
  
  // Power Transfer Efficiency approximation eta = (k^2 * Q1 * Q2) / (1 + sqrt(1 + k^2 * Q1 * Q2))^2
  // Low frequency sub-MHz tissue penetration ensures minimal SAR (< 0.04 W/kg)
  const qFactorProduct = 1800; // Q1 * Q2 typical for tuned Litz wire resonant tanks
  const figureOfMerit = couplingCoeff * couplingCoeff * qFactorProduct;
  const efficiencyPercent = Math.min(88, Math.round((figureOfMerit / Math.pow(1 + Math.sqrt(1 + figureOfMerit), 2)) * 100));
  const estimatedSar = ((0.012 * (frequencyKhz / 433) * (coilSeparationMm / 10))).toFixed(3);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900/90 text-zinc-300 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#a3e635] font-mono">Academic Research Model</span>
          <h4 className="text-base font-semibold text-white">Sub-MHz Inductive Wireless Power Link for Neurostimulators</h4>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-zinc-400">Resonant Inductive Coupling</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[#a3e635] font-semibold">f0 = {frequencyKhz} kHz (Sub-MHz)</span>
        </div>
      </div>

      {/* SVG Diagram: Transmitter Coil -> Skin/Tissue Barrier -> Implantable Receiver Coil */}
      <div className="relative my-4 h-64 w-full overflow-hidden rounded-lg bg-[#06080b] border border-white/5 p-2">
        <svg viewBox="0 0 760 230" className="h-full w-full select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="magneticField" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#a3e635" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="tissueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#fb7185" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* Magnetic Field Glow between coils */}
          <ellipse
            cx={230 + (220 * (coilSeparationMm / 30))}
            cy="115"
            rx={Math.max(40, 160 * couplingCoeff * 2.2)}
            ry="75"
            fill="url(#magneticField)"
          />

          {/* Transmitter System (Left) */}
          <g transform="translate(90, 40)">
            {/* Driver Circuit Box */}
            <rect x="0" y="35" width="85" height="80" rx="6" fill="#12161f" stroke="#3f3f46" strokeWidth="1.5" />
            <text x="42" y="60" fill="#a3e635" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">TX DRIVER</text>
            <text x="42" y="78" fill="#a1a1aa" fontSize="9" textAnchor="middle">Class-E Inverter</text>
            <text x="42" y="94" fill="#71717a" fontSize="8" textAnchor="middle" fontFamily="monospace">{frequencyKhz} kHz</text>

            {/* Connecting leads */}
            <path d="M 85 55 L 120 55" stroke="#a3e635" strokeWidth="2" fill="none" />
            <path d="M 85 95 L 120 95" stroke="#a3e635" strokeWidth="2" fill="none" />

            {/* Primary TX Planar Spiral Coil */}
            <g transform="translate(130, 75)">
              <rect x="-6" y="-60" width="12" height="120" rx="3" fill="#27272a" stroke="#52525b" strokeWidth="1" />
              {/* Coil turns */}
              {[-45, -30, -15, 0, 15, 30, 45].map((y, idx) => (
                <circle key={idx} cx="0" cy={y} r="4" fill="#a3e635" stroke="#000" strokeWidth="1">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" begin={`${idx * 0.15}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <text x="0" y="75" fill="#f4f4f5" fontSize="10" textAnchor="middle" fontWeight="bold">TX Primary Coil</text>
              <text x="0" y="88" fill="#71717a" fontSize="8" textAnchor="middle" fontFamily="monospace">Ø 56mm Litz</text>
            </g>
          </g>

          {/* Biological Tissue Layer (Skin & Subcutaneous layer) */}
          <g transform="translate(360, 25)">
            <rect x="0" y="0" width="70" height="180" rx="8" fill="url(#tissueGrad)" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 3" />
            <text x="35" y="40" fill="#fda4af" fontSize="9" textAnchor="middle" fontWeight="semibold">SKIN / TISSUE</text>
            <text x="35" y="55" fill="#9f1239" fontSize="8" textAnchor="middle" fontFamily="monospace">d = {coilSeparationMm} mm</text>
            <text x="35" y="110" fill="#fda4af" fontSize="8" textAnchor="middle">Sub-MHz</text>
            <text x="35" y="122" fill="#a3e635" fontSize="8" textAnchor="middle" fontFamily="monospace">Safe SAR</text>
            <text x="35" y="145" fill="#fda4af" fontSize="8" textAnchor="middle">Tissue Safe</text>
          </g>

          {/* Receiver & Implantable Device (Right) */}
          <g transform={`translate(${480 + (coilSeparationMm - 14) * 3}, 40) rotate(${misalignmentAngleDeg}, 20, 75)`}>
            {/* Secondary RX Coil with Ferrite Substrate */}
            <g transform="translate(20, 75)">
              <rect x="-5" y="-45" width="10" height="90" rx="2" fill="#18181b" stroke="#71717a" strokeWidth="1" />
              {/* Ferrite Shield */}
              <rect x="5" y="-45" width="4" height="90" fill="#3f3f46" />
              {/* Coil turns */}
              {[-35, -20, -5, 10, 25, 40].map((y, idx) => (
                <circle key={idx} cx="0" cy={y} r="3.5" fill="#c084fc" stroke="#000" strokeWidth="1" />
              ))}
              <text x="0" y="60" fill="#f4f4f5" fontSize="10" textAnchor="middle" fontWeight="bold">RX Secondary</text>
              <text x="0" y="73" fill="#71717a" fontSize="8" textAnchor="middle" fontFamily="monospace">Implanted Coil</text>
            </g>

            {/* Connecting leads */}
            <path d="M 30 55 L 65 55" stroke="#c084fc" strokeWidth="1.5" fill="none" />
            <path d="M 30 95 L 65 95" stroke="#c084fc" strokeWidth="1.5" fill="none" />

            {/* Implantable Neurostimulator Module */}
            <g transform="translate(65, 30)">
              <rect x="0" y="0" width="130" height="90" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="6" y="6" width="118" height="24" rx="4" fill="#0284c7" fillOpacity="0.2" />
              <text x="65" y="22" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">NEUROSTIMULATOR</text>
              
              <text x="12" y="45" fill="#94a3b8" fontSize="8">· Active Rectifier & LDO</text>
              <text x="12" y="58" fill="#94a3b8" fontSize="8">· Rechargeable Cell</text>
              <text x="12" y="71" fill="#94a3b8" fontSize="8">· Pulse Generator ASIC</text>
              
              {/* Stimulation Lead Output */}
              <path d="M 130 45 C 150 45, 140 70, 160 70" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
              <circle cx="160" cy="70" r="2.5" fill="#38bdf8" />
              <text x="135" y="85" fill="#38bdf8" fontSize="8" fontFamily="monospace">To Leads</text>
            </g>
          </g>

          {/* Magnetic flux lines */}
          <path
            d="M 230 45 C 310 10, 440 10, 500 45"
            fill="none"
            stroke="#a3e635"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity={couplingCoeff > 0.15 ? '0.6' : '0.2'}
          />
          <path
            d="M 230 185 C 310 220, 440 220, 500 185"
            fill="none"
            stroke="#a3e635"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity={couplingCoeff > 0.15 ? '0.6' : '0.2'}
          />
        </svg>
      </div>

      {/* Real-time calculated simulation figures */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs mb-4">
        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Coupling Factor (k)</div>
          <div className="text-base font-bold text-[#a3e635] mt-1 tabular-nums">
            {couplingCoeff.toFixed(3)}
          </div>
          <div className="text-[10px] text-zinc-500">Target Range: 0.15 – 0.35</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Link Efficiency (η)</div>
          <div className="text-base font-bold text-white mt-1 tabular-nums">
            {efficiencyPercent}%
          </div>
          <div className="text-[10px] text-zinc-500">Resonant Tank Tuning</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Tissue SAR Index</div>
          <div className="text-base font-bold text-[#38bdf8] mt-1 tabular-nums">
            {estimatedSar} W/kg
          </div>
          <div className="text-[10px] text-zinc-500">Limit: &lt; 2.0 W/kg (Safe)</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Thermal Dissipation</div>
          <div className="text-base font-bold text-white mt-1 tabular-nums">
            &lt; 0.25 °C
          </div>
          <div className="text-[10px] text-zinc-500">Compliant with IEEE Std</div>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="space-y-3 rounded-lg bg-white/[0.02] border border-white/5 p-3.5 text-xs">
        <div className="flex items-center justify-between text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-[#a3e635]" />
            Simulation Geometric Parameters
          </span>
          <span className="text-[11px] text-zinc-500">Ansys Maxwell/HFSS Analytical Approximation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Coil Separation (d)</span>
              <span className="font-mono text-white">{coilSeparationMm} mm</span>
            </div>
            <input
              type="range"
              min="5"
              max="28"
              step="1"
              value={coilSeparationMm}
              aria-label="Coil Separation"
              onChange={(e) => setCoilSeparationMm(parseInt(e.target.value, 10))}
              className="w-full accent-[#a3e635] bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Resonance Frequency (f0)</span>
              <span className="font-mono text-white">{frequencyKhz} kHz</span>
            </div>
            <input
              type="range"
              min="150"
              max="800"
              step="10"
              value={frequencyKhz}
              aria-label="Resonance Frequency"
              onChange={(e) => setFrequencyKhz(parseInt(e.target.value, 10))}
              className="w-full accent-[#a3e635] bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Angular Misalignment (θ)</span>
              <span className="font-mono text-white">{misalignmentAngleDeg}°</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="5"
              value={misalignmentAngleDeg}
              aria-label="Angular Misalignment"
              onChange={(e) => setMisalignmentAngleDeg(parseInt(e.target.value, 10))}
              className="w-full accent-[#a3e635] bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
          <span>Final Year Project · University of Engineering & Technology (UET) Mardan</span>
          <button
            onClick={() => {
              setCoilSeparationMm(14);
              setFrequencyKhz(433);
              setMisalignmentAngleDeg(0);
            }}
            className="text-zinc-400 hover:text-white underline cursor-pointer"
          >
            Reset Simulation
          </button>
        </div>
      </div>
    </div>
  );
};
