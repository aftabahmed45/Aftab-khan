import React, { useState } from 'react';
import { Radio, Wifi, Sliders, CheckCircle2, AlertTriangle } from 'lucide-react';

export const MicrowaveLinkSchematic: React.FC = () => {
  const [distanceKm, setDistanceKm] = useState<number>(8.5);
  const [frequencyGhz, setFrequencyGhz] = useState<number>(18);
  const [alignmentOffset, setAlignmentOffset] = useState<number>(0);

  // Approximate Free Space Path Loss: FSPL = 92.45 + 20*log10(f_GHz) + 20*log10(d_km)
  const fspl = Math.round(92.45 + 20 * Math.log10(frequencyGhz) + 20 * Math.log10(distanceKm));
  // Tx Power ~ 22 dBm, Antenna Gain Tx + Rx ~ 76 dBi (38 dBi each), Misc losses ~ 4 dB
  const totalGain = 22 + 76 - 4;
  // Penalty for physical misalignment
  const misalignmentLoss = Math.abs(alignmentOffset) * 12;
  const calculatedRsl = Math.round(totalGain - fspl - misalignmentLoss);
  const targetRsl = -42;
  const isAligned = Math.abs(alignmentOffset) <= 0.1;
  const linkStatus = calculatedRsl > -55 ? 'Nominal Link (Optimal RSL)' : calculatedRsl > -68 ? 'Degraded (High Fade Risk)' : 'Link Failure (RSL Critical)';

  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1017] p-5 text-zinc-300">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#a3e635] font-mono">Interactive Engineering Schematic</span>
          <h4 className="text-base font-semibold text-white">Point-to-Point Microwave Link (Huawei RTN)</h4>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className={`inline-block h-2 w-2 rounded-full ${isAligned ? 'bg-[#a3e635]' : 'bg-amber-400'}`} />
            {isAligned ? 'LOS Bore-Sight Aligned' : 'Off-Axis Misaligned'}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-white font-medium">{linkStatus}</span>
        </div>
      </div>

      {/* SVG Microwave Link Topology */}
      <div className="relative my-4 h-64 w-full overflow-hidden rounded-lg bg-[#08090d] border border-white/5 p-2">
        <svg viewBox="0 0 800 240" className="h-full w-full select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity={isAligned ? '0.35' : '0.1'} />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.8" />
            </linearGradient>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="800" height="240" fill="url(#grid)" />

          {/* Ground baseline */}
          <line x1="40" y1="210" x2="760" y2="210" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
          <text x="50" y="226" fill="#71717a" fontSize="10" fontFamily="monospace">TERRAIN BASELINE: 480m AMSL</text>
          <text x="640" y="226" fill="#71717a" fontSize="10" fontFamily="monospace">DISTANCE: {distanceKm} km</text>

          {/* 1st Fresnel Zone Ellipse (dashed) */}
          <ellipse
            cx="400"
            cy="110"
            rx="260"
            ry={isAligned ? 38 : 20}
            fill="none"
            stroke="#a3e635"
            strokeOpacity="0.18"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text x="345" y="80" fill="#a3e635" fillOpacity="0.7" fontSize="10" fontFamily="monospace">
            1st FRESNEL ZONE (60% CLEAR)
          </text>

          {/* Microwave Beam Propagation Path */}
          {/* Main LOS Line */}
          <line
            x1="130"
            y1="110"
            x2="670"
            y2={110 + alignmentOffset * 40}
            stroke="#a3e635"
            strokeWidth={isAligned ? '2.5' : '1.5'}
            strokeDasharray={isAligned ? 'none' : '4 2'}
          />

          {/* Beam Envelope */}
          <polygon
            points={`130,110 400,${110 - (isAligned ? 30 : 15)} 670,${110 + alignmentOffset * 40 - 10} 670,${110 + alignmentOffset * 40 + 10} 400,${110 + (isAligned ? 30 : 15)}`}
            fill="url(#beamGrad)"
          />

          {/* Animated Wave pulses */}
          <circle cx="280" cy="110" r="4" fill="#a3e635">
            <animate attributeName="cx" values="130;670" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="450" cy="110" r="3" fill="#ffffff">
            <animate attributeName="cx" values="130;670" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.9;0.1" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
          </circle>

          {/* TOWER A (Left Site Alpha) */}
          <g transform="translate(100, 70)">
            {/* Lattice Tower Structure */}
            <polygon points="10,40 -15,140 35,140" fill="none" stroke="#52525b" strokeWidth="2" />
            <line x1="-3" y1="90" x2="23" y2="90" stroke="#52525b" strokeWidth="1.5" />
            <line x1="-10" y1="115" x2="30" y2="115" stroke="#52525b" strokeWidth="1.5" />
            <line x1="3" y1="65" x2="17" y2="65" stroke="#52525b" strokeWidth="1.5" />
            {/* Parabolic Dish Antenna */}
            <path d="M 12 25 Q 30 40 12 55" fill="none" stroke="#f4f4f5" strokeWidth="3" />
            <line x1="22" y1="40" x2="32" y2="40" stroke="#a3e635" strokeWidth="2" />
            <circle cx="32" cy="40" r="2.5" fill="#a3e635" />
            {/* ODU / IDU Callout */}
            <rect x="-4" y="32" width="10" height="16" fill="#18181b" stroke="#71717a" strokeWidth="1" />
            <text x="-40" y="25" fill="#a1a1aa" fontSize="10" fontFamily="monospace">SITE ALPHA</text>
            <text x="-40" y="38" fill="#e4e4e7" fontSize="9" fontWeight="bold">Huawei RTN 950</text>
            <text x="-40" y="50" fill="#71717a" fontSize="8" fontFamily="monospace">Tx: +22 dBm</text>
          </g>

          {/* TOWER B (Right Site Beta) */}
          <g transform="translate(680, 70)">
            {/* Lattice Tower Structure */}
            <polygon points="-10,40 -35,140 15,140" fill="none" stroke="#52525b" strokeWidth="2" />
            <line x1="-23" y1="90" x2="3" y2="90" stroke="#52525b" strokeWidth="1.5" />
            <line x1="-30" y1="115" x2="10" y2="115" stroke="#52525b" strokeWidth="1.5" />
            <line x1="-17" y1="65" x2="-3" y2="65" stroke="#52525b" strokeWidth="1.5" />
            {/* Parabolic Dish Antenna */}
            <path d="M -12 25 Q -30 40 -12 55" fill="none" stroke="#f4f4f5" strokeWidth="3" />
            <line x1="-22" y1="40" x2="-32" y2="40" stroke="#a3e635" strokeWidth="2" />
            <circle cx="-32" cy="40" r="2.5" fill="#a3e635" />
            {/* ODU / IDU Callout */}
            <rect x="-6" y="32" width="10" height="16" fill="#18181b" stroke="#71717a" strokeWidth="1" />
            <text x="20" y="25" fill="#a1a1aa" fontSize="10" fontFamily="monospace">SITE BETA</text>
            <text x="20" y="38" fill="#e4e4e7" fontSize="9" fontWeight="bold">Huawei RTN 950</text>
            <text x="20" y="50" fill="#a3e635" fontSize="9" fontWeight="bold" fontFamily="monospace">RSL: {calculatedRsl} dBm</text>
          </g>
        </svg>
      </div>

      {/* Live Engineering Telemetry Readouts */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs mb-4">
        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Received Signal (RSL)</div>
          <div className={`text-base font-bold mt-1 ${isAligned ? 'text-[#a3e635]' : 'text-amber-400'}`}>
            {calculatedRsl} dBm
          </div>
          <div className="text-[10px] text-zinc-500">Target: {targetRsl} dBm</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Free Space Loss</div>
          <div className="text-base font-bold text-white mt-1 tabular-nums">{fspl} dB</div>
          <div className="text-[10px] text-zinc-500">Freq: {frequencyGhz} GHz</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Fade Margin</div>
          <div className="text-base font-bold text-white mt-1 tabular-nums">
            {Math.max(0, 75 + calculatedRsl)} dB
          </div>
          <div className="text-[10px] text-zinc-500">Threshold: -75 dBm</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Modulation Profile</div>
          <div className="text-base font-bold text-[#a3e635] mt-1">
            {calculatedRsl > -50 ? '4096-QAM' : calculatedRsl > -60 ? '1024-QAM' : calculatedRsl > -70 ? '256-QAM' : 'QPSK'}
          </div>
          <div className="text-[10px] text-zinc-500">Adaptive Modulation (AMR)</div>
        </div>
      </div>

      {/* Interactive Sliders for Demonstration */}
      <div className="space-y-3 rounded-lg bg-white/[0.02] border border-white/5 p-3.5 text-xs">
        <div className="flex items-center justify-between text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-[#a3e635]" />
            Transmission Parameter Controls
          </span>
          <span className="text-[11px] text-zinc-500">Simulate Field Conditions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Link Distance</span>
              <span className="font-mono text-white">{distanceKm} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="0.5"
              value={distanceKm}
              aria-label="Link Distance"
              onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              className="w-full accent-[#a3e635] bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Carrier Frequency</span>
              <span className="font-mono text-white">{frequencyGhz} GHz</span>
            </div>
            <input
              type="range"
              min="7"
              max="23"
              step="1"
              value={frequencyGhz}
              aria-label="Carrier Frequency"
              onChange={(e) => setFrequencyGhz(parseInt(e.target.value, 10))}
              className="w-full accent-[#a3e635] bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Antenna Panning (Azimuth)</span>
              <span className={`font-mono ${isAligned ? 'text-[#a3e635]' : 'text-amber-400'}`}>
                {alignmentOffset === 0 ? '0.0° (Aligned)' : `${alignmentOffset > 0 ? '+' : ''}${alignmentOffset.toFixed(1)}°`}
              </span>
            </div>
            <input
              type="range"
              min="-1.5"
              max="1.5"
              step="0.1"
              value={alignmentOffset}
              aria-label="Antenna Panning (Azimuth)"
              onChange={(e) => setAlignmentOffset(parseFloat(e.target.value))}
              className="w-full accent-[#a3e635] bg-zinc-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
          <span>Equipment: Huawei RTN 900 Series · Hybrid TDM/Packet Microwave</span>
          <button
            onClick={() => {
              setDistanceKm(8.5);
              setFrequencyGhz(18);
              setAlignmentOffset(0);
            }}
            className="text-zinc-400 hover:text-white underline cursor-pointer"
          >
            Reset to Baseline
          </button>
        </div>
      </div>
    </div>
  );
};
