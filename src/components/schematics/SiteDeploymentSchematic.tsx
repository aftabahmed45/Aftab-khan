import React, { useState } from 'react';
import { Cpu, CheckCircle2, Shield, Radio, Activity } from 'lucide-react';

export const SiteDeploymentSchematic: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<'alpha' | 'beta' | 'gamma'>('alpha');
  const [activeChecklist, setActiveChecklist] = useState<string[]>([
    'grounding',
    'tilt',
    'vswr',
    'isdp_photos',
  ]);

  const sectors = {
    alpha: { name: 'Sector 1 (Alpha)', azimuth: '0° (North)', mechTilt: '2°', elecTilt: '4°', rruModel: 'Huawei RRU5502' },
    beta: { name: 'Sector 2 (Beta)', azimuth: '120° (South-East)', mechTilt: '3°', elecTilt: '4°', rruModel: 'Huawei RRU5502' },
    gamma: { name: 'Sector 3 (Gamma)', azimuth: '240° (South-West)', mechTilt: '2°', elecTilt: '5°', rruModel: 'Huawei RRU5502' },
  };

  const current = sectors[selectedSector];

  const toggleCheck = (id: string) => {
    setActiveChecklist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1017] p-5 text-zinc-300">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#a3e635] font-mono">Infrastructure Deployment Diagram</span>
          <h4 className="text-base font-semibold text-white">Cellular BTS Site Architecture & Sector Topology</h4>
        </div>
        <div className="flex items-center gap-2">
          {(['alpha', 'beta', 'gamma'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                selectedSector === sec
                  ? 'bg-[#a3e635] text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {sec.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Site Schematic */}
      <div className="relative my-4 h-64 w-full overflow-hidden rounded-lg bg-[#08090d] border border-white/5 p-2">
        <svg viewBox="0 0 760 230" className="h-full w-full select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="sectorCoverage" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Tower Outline (Center) */}
          <g transform="translate(260, 20)">
            {/* 4-legged lattice tower structure */}
            <polygon points="60,0 40,190 80,190" fill="none" stroke="#52525b" strokeWidth="2" />
            <polygon points="60,0 20,190 100,190" fill="none" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 2" />
            {/* Cross bracing */}
            <line x1="45" y1="50" x2="75" y2="50" stroke="#52525b" strokeWidth="1.5" />
            <line x1="38" y1="100" x2="82" y2="100" stroke="#52525b" strokeWidth="1.5" />
            <line x1="30" y1="150" x2="90" y2="150" stroke="#52525b" strokeWidth="1.5" />

            {/* Cable Tray down tower */}
            <line x1="68" y1="20" x2="68" y2="190" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Antennas at Tower Top (Mounting triangular headframe) */}
            <line x1="15" y1="15" x2="105" y2="15" stroke="#71717a" strokeWidth="3" />
            
            {/* Sector 1 (Alpha) Antenna */}
            <rect
              x="20"
              y="0"
              width="10"
              height="35"
              rx="2"
              fill={selectedSector === 'alpha' ? '#a3e635' : '#71717a'}
              stroke="#000"
              strokeWidth="1"
            />
            {/* Sector 2 (Beta) Antenna */}
            <rect
              x="55"
              y="0"
              width="10"
              height="35"
              rx="2"
              fill={selectedSector === 'beta' ? '#a3e635' : '#71717a'}
              stroke="#000"
              strokeWidth="1"
            />
            {/* Sector 3 (Gamma) Antenna */}
            <rect
              x="90"
              y="0"
              width="10"
              height="35"
              rx="2"
              fill={selectedSector === 'gamma' ? '#a3e635' : '#71717a'}
              stroke="#000"
              strokeWidth="1"
            />

            {/* Remote Radio Units (RRUs) mounted right behind antennas */}
            <rect x="22" y="38" width="6" height="14" fill="#38bdf8" />
            <rect x="57" y="38" width="6" height="14" fill="#38bdf8" />
            <rect x="92" y="38" width="6" height="14" fill="#38bdf8" />
            <text x="60" y="-5" fill="#a3e635" fontSize="9" textAnchor="middle" fontWeight="bold">3-SECTOR HEADFRAME</text>
          </g>

          {/* Sector RF Radiation Wedge (Visualizing Azimuth & Tilt) */}
          <g transform="translate(100, 20)">
            <path
              d="M 175 25 L 20 80 A 180 180 0 0 1 120 170 Z"
              fill="url(#sectorCoverage)"
              stroke="#a3e635"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text x="50" y="110" fill="#a3e635" fontSize="10" fontWeight="bold" fontFamily="monospace">
              {current.name}
            </text>
            <text x="50" y="125" fill="#94a3b8" fontSize="8" fontFamily="monospace">Azimuth: {current.azimuth}</text>
            <text x="50" y="138" fill="#94a3b8" fontSize="8" fontFamily="monospace">M-Tilt: {current.mechTilt} | E-Tilt: {current.elecTilt}</text>
          </g>

          {/* Baseband Unit & Equipment Cabinet (Right Side) */}
          <g transform="translate(480, 70)">
            {/* Outdoor Telecom Cabinet */}
            <rect x="0" y="0" width="180" height="120" rx="6" fill="#121620" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="10" y="10" width="160" height="30" rx="3" fill="#1e293b" />
            <text x="90" y="28" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              HUAWEI BBU5900 (BASEBAND)
            </text>

            <rect x="10" y="48" width="160" height="26" rx="3" fill="#18181b" stroke="#334155" strokeWidth="1" />
            <text x="90" y="64" fill="#a3e635" fontSize="9" textAnchor="middle" fontFamily="monospace">
              Huawei RTN Transmission IDU
            </text>

            <rect x="10" y="80" width="75" height="32" rx="3" fill="#0f172a" />
            <text x="47" y="96" fill="#94a3b8" fontSize="8" textAnchor="middle">-48V DC Power</text>
            <text x="47" y="106" fill="#71717a" fontSize="7" textAnchor="middle">Battery Backup</text>

            <rect x="95" y="80" width="75" height="32" rx="3" fill="#0f172a" />
            <text x="132" y="96" fill="#94a3b8" fontSize="8" textAnchor="middle">Main Earth Bar</text>
            <text x="132" y="106" fill="#a3e635" fontSize="7" textAnchor="middle" fontFamily="monospace">R &lt; 5.0 Ω</text>
          </g>

          {/* Cable interconnect bridge */}
          <path d="M 328 170 L 480 170" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
          <text x="400" y="165" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">CPRI Optical / DC</text>
        </svg>
      </div>

      {/* Selected Sector Telemetry */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs mb-4">
        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Sector Azimuth</div>
          <div className="text-base font-bold text-[#a3e635] mt-1">{current.azimuth}</div>
          <div className="text-[10px] text-zinc-500">Compass calibrated</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Mechanical Tilt</div>
          <div className="text-base font-bold text-white mt-1">{current.mechTilt} Downtilt</div>
          <div className="text-[10px] text-zinc-500">Inclinometer checked</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">Electrical RET Tilt</div>
          <div className="text-base font-bold text-white mt-1">{current.elecTilt} Software RET</div>
          <div className="text-[10px] text-zinc-500">AISG 2.0 protocol</div>
        </div>

        <div className="rounded-lg bg-black/40 border border-white/5 p-2.5">
          <div className="text-zinc-500 uppercase">RRU Radio Unit</div>
          <div className="text-base font-bold text-[#38bdf8] mt-1">{current.rruModel}</div>
          <div className="text-[10px] text-zinc-500">Multi-band 4T4R</div>
        </div>
      </div>

      {/* Quality Assurance & Site Acceptance Checklist */}
      <div className="rounded-lg bg-white/[0.02] border border-white/5 p-3.5 text-xs">
        <div className="flex items-center justify-between text-zinc-400 font-mono mb-2.5">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-[#a3e635]" />
            Site Acceptance Criteria (ISDP QA Standards)
          </span>
          <span className="text-[11px] text-zinc-500">Click to toggle audit points</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { id: 'grounding', label: 'Earthing & Grounding Resistance < 5.0 Ω verified' },
            { id: 'tilt', label: 'Sector Azimuth & Mechanical Inclinometer audit cleared' },
            { id: 'vswr', label: 'RF Feeder Return Loss / VSWR < 1.30 across carriers' },
            { id: 'isdp_photos', label: 'ISDP high-resolution photo compliance uploaded' },
          ].map((item) => {
            const isChecked = activeChecklist.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-center gap-2.5 p-2 rounded border text-left transition-colors cursor-pointer ${
                  isChecked
                    ? 'border-[#a3e635]/40 bg-[#a3e635]/10 text-white'
                    : 'border-white/5 bg-black/30 text-zinc-400'
                }`}
              >
                <CheckCircle2
                  className={`h-4 w-4 shrink-0 ${isChecked ? 'text-[#a3e635]' : 'text-zinc-600'}`}
                />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
