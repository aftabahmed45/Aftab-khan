import React, { useState } from 'react';
import { Layers, Shield, CheckCircle2, HardHat, Compass, Cpu, Radio } from 'lucide-react';

export const InfrastructureViz: React.FC = () => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<'antennas' | 'rrus' | 'cabling' | 'cabinet' | 'grounding'>('antennas');

  const subsystems = {
    antennas: {
      name: 'Sector Antennas & Headframe Mount',
      elevation: '42m – 45m Above Ground Level',
      description: 'Tri-sector headframe supporting multi-band cross-polarized panel antennas. Each sector is positioned with calibrated azimuth orientation (0° / 120° / 240°) and adjusted with combined mechanical down-tilt and Remote Electrical Tilt (RET) via AISG 2.0 interface.',
      standards: [
        { key: 'Azimuth Accuracy', val: '± 2.0° with magnetic declination compensation' },
        { key: 'Mechanical Tilt', val: '0° – 10° via calibrated bracket scale' },
        { key: 'Wind Survival', val: 'Rated for 180 km/h wind gusts with ice load' },
        { key: 'Connector Torque', val: '7/16 DIN or 4.3-10 torqued to 30 N·m' },
      ],
      safetyAudit: 'Rigging lanyard double-carabiner hookup, fall arrest harness, and torque-seal witness marks applied.'
    },
    rrus: {
      name: 'Remote Radio Units (RRUs) & Jumpers',
      elevation: '39m – 41m Tower Leg Mounting',
      description: 'Direct tower-mounted multi-carrier transceivers (Huawei RRU5502 / RRU3959) situated immediately below antennas to eliminate high RF feeder attenuation. Converts CPRI digitized baseband optical signals into RF power.',
      standards: [
        { key: 'Optical Interface', val: 'Dual CPRI 9.8 Gbps / eCPRI 25 Gbps SFP+' },
        { key: 'RF Jumper Length', val: '< 3.0m low-loss 1/2" super-flexible coax' },
        { key: 'Operating Voltage', val: '-48V DC nominal (range -36V to -57V)' },
        { key: 'Cooling Method', val: 'Passive convective heatsink fins (no fans)' },
      ],
      safetyAudit: 'Waterproof cold-shrink boot installation over all RF connector junctions.'
    },
    cabling: {
      name: 'Cable Tray, Fiber Trunk & DC Power Feeds',
      elevation: 'Full Tower Height (0m – 40m Vertical Run)',
      description: 'Heavy-duty hot-dip galvanized cable ladder carrying multi-core single-mode optical fiber trunks and shielded DC power cables. Secured at regular 1-meter intervals using UV-resistant stainless steel butterfly clamps.',
      standards: [
        { key: 'Clamping Interval', val: 'Every 0.8m – 1.0m along vertical ladder' },
        { key: 'Bending Radius', val: 'Min 20x outer cable diameter for fiber' },
        { key: 'Drip Loop', val: 'Integrated before entry into shelter gland' },
        { key: 'Fire Rating', val: 'Flame-retardant LSZH outer sheathing' },
      ],
      safetyAudit: 'No cable crossing or abrasion against sharp tower steel angles.'
    },
    grounding: {
      name: 'Lightning Protection & Earthing Busbars',
      elevation: 'Air Terminal at 46m to Earth Ring at Base',
      description: 'Complete copper grounding grid linking the Franklin lightning arrestor rod, antenna coax outer shields, tower structural legs, and equipment chassis to deep-driven copper-bonded ground rods.',
      standards: [
        { key: 'Earth Resistance', val: '< 5.0 Ω (measured with 3-pole earth tester)' },
        { key: 'Ground Conductor', val: '50mm² bare stranded copper cable' },
        { key: 'Bonding Points', val: 'Top of tower, midpoint, base, and entry hatch' },
        { key: 'Surge Suppression', val: 'Class I + Class II SPD at DC distribution' },
      ],
      safetyAudit: 'Antioxidant grease applied on all copper-to-galvanized mechanical joints.'
    },
    cabinet: {
      name: 'Outdoor Equipment Cabinet & BBU Baseband',
      elevation: 'Concrete Plinth Ground Level',
      description: 'Weatherproof IP55 telecom enclosure housing Huawei BBU5900 baseband engine, transmission IDU, intelligent power rectifiers, and high-rate lithium-ion backup batteries.',
      standards: [
        { key: 'Baseband Engine', val: 'Huawei BBU5900 with UMPT control board' },
        { key: 'Power Rectifier', val: '96% high-efficiency 48V / 200A module' },
        { key: 'Battery Backup', val: 'SmartLi lithium battery string (4+ hour autonomy)' },
        { key: 'Climate Control', val: 'DC inverter heat exchanger' },
      ],
      safetyAudit: 'Plinth anchor bolts sealed, anti-rodent foam applied to all bottom cable conduits.'
    }
  };

  const active = subsystems[selectedSubsystem];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1017] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635] font-mono">Animated Tower Blueprint & Field Specs</span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Cellular BTS Tower & Infrastructure Blueprint</h4>
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
          Select tower section to inspect physical standards
        </div>
      </div>

      {/* Animated Tower Line Diagram */}
      <div className="my-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Tower SVG Vector Canvas */}
        <div className="md:col-span-5 relative h-80 rounded-lg bg-slate-950 p-2 border border-slate-800 flex items-center justify-center">
          <svg viewBox="0 0 260 400" className="h-full w-auto select-none" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="fiberPulse" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Lightning Rod at top */}
            <line x1="130" y1="20" x2="130" y2="5" stroke="#f4f4f5" strokeWidth="2" />
            <polygon points="130,5 128,10 132,10" fill="#a3e635" />

            {/* Lattice Tower Main Legs */}
            <polygon points="120,40 140,40 185,360 75,360" fill="none" stroke="#52525b" strokeWidth="2.5" />
            
            {/* Tower Cross Bracing Struts */}
            {[70, 110, 150, 190, 230, 270, 310, 350].map((y, idx) => {
              const widthTop = 20 + ((y - 40) / 320) * 90;
              const widthBottom = 20 + ((y - 20) / 320) * 90;
              return (
                <g key={idx}>
                  <line x1={130 - widthTop} y1={y} x2={130 + widthTop} y2={y} stroke="#3f3f46" strokeWidth="1.5" />
                  <line x1={130 - widthTop} y1={y} x2={130 + widthBottom} y2={y - 20} stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              );
            })}

            {/* Vertical Cable Ladder with Animated Fiber Pulse */}
            <line x1="138" y1="50" x2="138" y2="350" stroke="#1e293b" strokeWidth="6" />
            <line
              x1="138"
              y1="50"
              x2="138"
              y2="350"
              stroke="url(#fiberPulse)"
              strokeWidth="2.5"
              strokeDasharray="14 10"
            >
              <animate attributeName="stroke-dashoffset" from="120" to="0" dur="2.2s" repeatCount="indefinite" />
            </line>

            {/* Ground Earthing Line */}
            <line x1="75" y1="360" x2="50" y2="385" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />
            <line x1="185" y1="360" x2="210" y2="385" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />

            {/* INTERACTIVE HOTSPOTS */}

            {/* 1. Antennas Headframe */}
            <g
              transform="translate(130, 40)"
              onClick={() => setSelectedSubsystem('antennas')}
              className="cursor-pointer"
            >
              <rect
                x="-40"
                y="-15"
                width="80"
                height="30"
                rx="4"
                fill={selectedSubsystem === 'antennas' ? 'rgba(163, 230, 53, 0.2)' : 'transparent'}
                stroke={selectedSubsystem === 'antennas' ? '#a3e635' : 'transparent'}
                strokeWidth="1.5"
              />
              <line x1="-35" y1="0" x2="35" y2="0" stroke="#e4e4e7" strokeWidth="3" />
              {/* Sector 1, 2, 3 Antenna Panels */}
              <rect x="-32" y="-12" width="8" height="24" rx="1.5" fill="#a3e635" stroke="#000" strokeWidth="1" />
              <rect x="-4" y="-12" width="8" height="24" rx="1.5" fill="#a3e635" stroke="#000" strokeWidth="1" />
              <rect x="24" y="-12" width="8" height="24" rx="1.5" fill="#a3e635" stroke="#000" strokeWidth="1" />
              <text x="0" y="-18" fill="#a3e635" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">45m Sectors</text>
            </g>

            {/* 2. RRU Units */}
            <g
              transform="translate(130, 75)"
              onClick={() => setSelectedSubsystem('rrus')}
              className="cursor-pointer"
            >
              <rect
                x="-35"
                y="-12"
                width="70"
                height="24"
                rx="4"
                fill={selectedSubsystem === 'rrus' ? 'rgba(56, 189, 248, 0.2)' : 'transparent'}
                stroke={selectedSubsystem === 'rrus' ? '#38bdf8' : 'transparent'}
                strokeWidth="1.5"
              />
              <rect x="-24" y="-8" width="10" height="16" rx="1" fill="#38bdf8" />
              <rect x="14" y="-8" width="10" height="16" rx="1" fill="#38bdf8" />
              <text x="0" y="2" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">RRU Units</text>
            </g>

            {/* 3. Cable Ladder Run */}
            <g
              transform="translate(145, 180)"
              onClick={() => setSelectedSubsystem('cabling')}
              className="cursor-pointer"
            >
              <rect
                x="-12"
                y="-40"
                width="35"
                height="80"
                rx="4"
                fill={selectedSubsystem === 'cabling' ? 'rgba(163, 230, 53, 0.2)' : 'transparent'}
                stroke={selectedSubsystem === 'cabling' ? '#a3e635' : 'transparent'}
                strokeWidth="1.5"
              />
              <text x="6" y="0" fill="#f4f4f5" fontSize="7" fontWeight="bold" textAnchor="middle" transform="rotate(90, 6, 0)" fontFamily="monospace">
                CPRI Trunk
              </text>
            </g>

            {/* 4. Ground Level Equipment Cabinet */}
            <g
              transform="translate(205, 320)"
              onClick={() => setSelectedSubsystem('cabinet')}
              className="cursor-pointer"
            >
              <rect
                x="-25"
                y="0"
                width="45"
                height="45"
                rx="4"
                fill={selectedSubsystem === 'cabinet' ? '#1e293b' : '#0f172a'}
                stroke={selectedSubsystem === 'cabinet' ? '#a3e635' : '#52525b'}
                strokeWidth={selectedSubsystem === 'cabinet' ? '2' : '1'}
              />
              <rect x="-20" y="5" width="35" height="14" rx="2" fill="#38bdf8" fillOpacity="0.3" />
              <text x="-2" y="15" fill="#38bdf8" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">BBU5900</text>
              <text x="-2" y="32" fill="#f4f4f5" fontSize="6" textAnchor="middle">Shelter</text>
            </g>

            {/* 5. Main Earthing Bar */}
            <g
              transform="translate(70, 360)"
              onClick={() => setSelectedSubsystem('grounding')}
              className="cursor-pointer"
            >
              <rect
                x="-15"
                y="0"
                width="30"
                height="20"
                rx="3"
                fill={selectedSubsystem === 'grounding' ? '#854d0e' : '#451a03'}
                stroke={selectedSubsystem === 'grounding' ? '#eab308' : '#78350f'}
                strokeWidth="1.5"
              />
              <text x="0" y="12" fill="#fef08a" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">EARTH</text>
            </g>
          </svg>
        </div>

        {/* Subsystem Selector Buttons & Details */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'antennas', label: 'Antennas & Headframe' },
              { id: 'rrus', label: 'Remote Radio (RRU)' },
              { id: 'cabling', label: 'CPRI & DC Cabling' },
              { id: 'cabinet', label: 'BBU & Cabinet' },
              { id: 'grounding', label: 'Lightning & Earth' },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubsystem(sub.id as any)}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-all cursor-pointer ${
                  selectedSubsystem === sub.id
                    ? 'bg-[#a3e635] text-black font-bold'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-2.5">
              <div>
                <h5 className="text-base font-bold text-slate-900 dark:text-white">{active.name}</h5>
                <span className="text-xs font-mono text-[#65a30d] dark:text-[#a3e635]">{active.elevation}</span>
              </div>
              <span className="rounded bg-slate-200 dark:bg-white/10 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-zinc-300">
                Telecom Standard
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-zinc-300">
              {active.description}
            </p>

            {/* Standards Spec Grid */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {active.standards.map((std, i) => (
                <div key={i} className="rounded border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/60 p-2">
                  <span className="text-slate-500 dark:text-zinc-400 block text-[10px] uppercase">{std.key}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{std.val}</span>
                </div>
              ))}
            </div>

            {/* Safety & Quality Audit note */}
            <div className="mt-3 flex items-start gap-2 rounded bg-blue-500/10 border border-blue-500/20 p-2.5 text-xs text-blue-900 dark:text-blue-200">
              <Shield className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
              <span><strong>ISDP Acceptance Criterion:</strong> {active.safetyAudit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
