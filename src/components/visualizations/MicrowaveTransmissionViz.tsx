import React, { useState } from 'react';
import { Radio, Cpu, Sliders, ShieldCheck, Zap, Activity } from 'lucide-react';

export const MicrowaveTransmissionViz: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'idu' | 'if' | 'odu' | 'antenna' | 'weblct'>('antenna');

  const nodeDetails = {
    idu: {
      title: 'Huawei RTN Indoor Unit (IDU)',
      models: 'RTN 905 (1U Compact) / RTN 950 (2U Multi-directional) / RTN 980 (5U High-Capacity Aggregation)',
      description: 'Houses baseband signal processing boards, IF modem boards, system control units (CSH), and auxiliary power modules. Connects to IP core routers and transmits modulated IF signals via coaxial cables to the tower top.',
      specs: [
        { label: 'Slot Capacity', value: 'Up to 14 IF boards (RTN 980)' },
        { label: 'Interface Types', value: '10GE, GE, STM-1, E1 hybrid' },
        { label: 'Switching Capacity', value: 'Packet switching up to 100 Gbit/s' },
        { label: 'Modulation', value: 'QPSK up to 4096-QAM with AMR' },
      ],
      operations: 'Board commissioning, clock synchronization (SyncE / IEEE 1588v2), and VLAN service configuration.'
    },
    if: {
      title: 'Coaxial Intermediate Frequency (IF) Cable',
      models: 'RG-8U / 5D-FB 50Ω Coaxial Feed Line with N-type Connectors',
      description: 'Carries multiplexed IF analog signal (~350 MHz / 140 MHz), DC power feed (+48V) to power the ODU, and internal telemetry control channel (FSK modulated) between IDU and ODU on a single coaxial conductor.',
      specs: [
        { label: 'Impedance', value: '50 Ω ± 2 Ω' },
        { label: 'Max Length', value: 'Up to 300 meters with standard cable' },
        { label: 'Attenuation', value: '< 6.5 dB / 100m at 350 MHz' },
        { label: 'Weatherproofing', value: 'Cold-shrink tubing & 3-layer butyl tape' },
      ],
      operations: 'IF connector termination, outdoor grounding kit bonding at top and bottom of tower, and surge arrestor validation.'
    },
    odu: {
      title: 'Huawei Outdoor Unit (ODU)',
      models: 'Huawei RTN XMC-2 / XMC-3 / XMC-5 Direct-Mount Transceiver',
      description: 'Converts IF signals from the IDU into microwave RF signals (6 GHz to 38 GHz) via up-converters and power amplifiers, then routes RF energy through circular/rectangular waveguide transitions directly into the antenna feed horn.',
      specs: [
        { label: 'Frequency Bands', value: '6, 7, 8, 11, 13, 15, 18, 23, 26, 38 GHz' },
        { label: 'Tx Output Power', value: '+19 dBm to +28 dBm (Standard/High Power)' },
        { label: 'Noise Figure', value: '< 6.0 dB typical' },
        { label: 'Operating Temp', value: '-33°C to +55°C (IP65 Outdoor Enclosure)' },
      ],
      operations: 'Polarization disk orientation (Horizontal / Vertical), waveguide flange O-ring sealing, and RSSI BNC test port probing.'
    },
    antenna: {
      title: 'High-Performance Parabolic Dish Antenna',
      models: '0.3m / 0.6m / 1.2m / 1.8m Single & Dual-Polarized Dishes',
      description: 'Focuses high-frequency microwave energy into a pencil-thin bore-sight beam (typically 1.5° to 3.0° half-power beamwidth). Requires millimeter-precision azimuth and elevation panning to lock onto the remote station dish.',
      specs: [
        { label: 'Antenna Gain', value: '32 dBi (0.3m) to 48 dBi (1.8m)' },
        { label: 'Front-to-Back Ratio', value: '> 60 dB to minimize co-channel spill' },
        { label: 'Cross-Pol (XPD)', value: '> 30 dB (critical for XPIC)' },
        { label: 'Beamwidth (3dB)', value: '1.2° – 2.8° depending on aperture' },
      ],
      operations: 'Fine threaded turnbuckle panning, visual Line-of-Sight confirmation, and tuning to target RSL (Receive Signal Level).'
    },
    weblct: {
      title: 'Huawei WebLCT (Local Craft Terminal)',
      models: 'Huawei iManager WebLCT Software Suite',
      description: 'Field configuration console used by telecom engineers to connect directly to the RTN IDU via Ethernet craft port. Used to configure network elements (NE), map transmission channels, check alarms, and run loopback diagnostics.',
      specs: [
        { label: 'Protocol Support', value: 'SNMPv3, FTP/SFTP, Telnet/SSH' },
        { label: 'Diagnostic Tools', value: 'PRBS BER test, Radio loopback, IF loopback' },
        { label: 'Performance Logs', value: '15-min and 24-hour historic RSL / BER records' },
        { label: 'License Controls', value: 'Capacity upgrade and feature enablement' },
      ],
      operations: 'Alarm monitoring, firmware patching, cross-connection creation, and DCN IP routing provisioning.'
    }
  };

  const current = nodeDetails[activeNode];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1017] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635] font-mono">Animated Signal Path & Hardware Architecture</span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Huawei RTN Microwave Transmission Chain</h4>
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
          Click any component node to inspect signal parameters
        </div>
      </div>

      {/* Interactive Animated SVG Signal Flow Diagram */}
      <div className="my-5 overflow-hidden rounded-lg bg-slate-950 p-3 border border-slate-800">
        <svg viewBox="0 0 760 170" className="w-full h-auto select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="rfWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background interconnect buses */}
          <line x1="80" y1="85" x2="680" y2="85" stroke="#27272a" strokeWidth="4" />
          
          {/* Animated signal pulses through the transmission pipeline */}
          <line
            x1="120"
            y1="85"
            x2="640"
            y2="85"
            stroke="url(#rfWave)"
            strokeWidth="2.5"
            strokeDasharray="12 8"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
          </line>

          {/* NODE 1: WebLCT Craft Terminal */}
          <g
            transform="translate(40, 45)"
            onClick={() => setActiveNode('weblct')}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <rect
              x="0"
              y="0"
              width="80"
              height="80"
              rx="8"
              fill={activeNode === 'weblct' ? '#1e293b' : '#0f172a'}
              stroke={activeNode === 'weblct' ? '#a3e635' : '#334155'}
              strokeWidth={activeNode === 'weblct' ? '2' : '1'}
              filter={activeNode === 'weblct' ? 'url(#glow)' : undefined}
            />
            <rect x="15" y="15" width="50" height="35" rx="3" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
            <text x="40" y="36" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">WebLCT</text>
            <text x="40" y="65" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">Craft PC</text>
            <text x="40" y="75" fill="#94a3b8" fontSize="7" textAnchor="middle">Config & QA</text>
          </g>

          {/* Connection wire WebLCT to IDU */}
          <path d="M 120 85 L 170 85" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

          {/* NODE 2: Huawei RTN IDU */}
          <g
            transform="translate(170, 45)"
            onClick={() => setActiveNode('idu')}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <rect
              x="0"
              y="0"
              width="110"
              height="80"
              rx="8"
              fill={activeNode === 'idu' ? '#1e293b' : '#0f172a'}
              stroke={activeNode === 'idu' ? '#a3e635' : '#334155'}
              strokeWidth={activeNode === 'idu' ? '2' : '1'}
              filter={activeNode === 'idu' ? 'url(#glow)' : undefined}
            />
            <rect x="10" y="15" width="90" height="20" rx="3" fill="#18181b" stroke="#52525b" strokeWidth="1" />
            <circle cx="20" cy="25" r="2.5" fill="#a3e635">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="58" y="28" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">RTN 950 IDU</text>
            <text x="55" y="55" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Baseband IDU</text>
            <text x="55" y="70" fill="#a3e635" fontSize="8" textAnchor="middle" fontFamily="monospace">IF 350MHz Modulation</text>
          </g>

          {/* Connection wire IDU to IF Cable */}
          <path d="M 280 85 L 330 85" stroke="#a3e635" strokeWidth="2.5" />

          {/* NODE 3: Coaxial IF Cable */}
          <g
            transform="translate(330, 45)"
            onClick={() => setActiveNode('if')}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <rect
              x="0"
              y="0"
              width="100"
              height="80"
              rx="8"
              fill={activeNode === 'if' ? '#1e293b' : '#0f172a'}
              stroke={activeNode === 'if' ? '#a3e635' : '#334155'}
              strokeWidth={activeNode === 'if' ? '2' : '1'}
              filter={activeNode === 'if' ? 'url(#glow)' : undefined}
            />
            <path d="M 15 25 Q 50 15 85 25" fill="none" stroke="#eab308" strokeWidth="3" />
            <text x="50" y="55" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">IF Coax Link</text>
            <text x="50" y="68" fill="#eab308" fontSize="8" textAnchor="middle" fontFamily="monospace">50Ω + 48V DC Feed</text>
          </g>

          {/* Connection wire IF Cable to ODU */}
          <path d="M 430 85 L 480 85" stroke="#a3e635" strokeWidth="2.5" />

          {/* NODE 4: Huawei ODU */}
          <g
            transform="translate(480, 45)"
            onClick={() => setActiveNode('odu')}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <rect
              x="0"
              y="0"
              width="100"
              height="80"
              rx="8"
              fill={activeNode === 'odu' ? '#1e293b' : '#0f172a'}
              stroke={activeNode === 'odu' ? '#a3e635' : '#334155'}
              strokeWidth={activeNode === 'odu' ? '2' : '1'}
              filter={activeNode === 'odu' ? 'url(#glow)' : undefined}
            />
            <rect x="25" y="15" width="50" height="20" rx="3" fill="#27272a" stroke="#71717a" strokeWidth="1" />
            <text x="50" y="28" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">XMC-3 ODU</text>
            <text x="50" y="55" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">RF Transceiver</text>
            <text x="50" y="70" fill="#a3e635" fontSize="8" textAnchor="middle" fontFamily="monospace">18 GHz Up-Conv</text>
          </g>

          {/* Waveguide link ODU to Antenna */}
          <path d="M 580 85 L 630 85" stroke="#a3e635" strokeWidth="3" />

          {/* NODE 5: Dish Antenna */}
          <g
            transform="translate(630, 45)"
            onClick={() => setActiveNode('antenna')}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <rect
              x="0"
              y="0"
              width="100"
              height="80"
              rx="8"
              fill={activeNode === 'antenna' ? '#1e293b' : '#0f172a'}
              stroke={activeNode === 'antenna' ? '#a3e635' : '#334155'}
              strokeWidth={activeNode === 'antenna' ? '2' : '1'}
              filter={activeNode === 'antenna' ? 'url(#glow)' : undefined}
            />
            {/* Parabolic curvature */}
            <path d="M 30 20 Q 60 40 30 60" fill="none" stroke="#f4f4f5" strokeWidth="3" />
            <line x1="45" y1="40" x2="65" y2="40" stroke="#a3e635" strokeWidth="2" />
            <circle cx="65" cy="40" r="2.5" fill="#a3e635" />
            {/* Wave arcs */}
            <path d="M 72 32 A 12 12 0 0 1 72 48" fill="none" stroke="#a3e635" strokeWidth="1.5" opacity="0.8">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
            </path>
            <path d="M 78 26 A 18 18 0 0 1 78 54" fill="none" stroke="#a3e635" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0.1;0.9;0.1" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
            </path>
            <text x="50" y="72" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">0.6m Dish</text>
          </g>
        </svg>
      </div>

      {/* Selected Component Inspection Panel */}
      <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 p-4 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <h5 className="text-base font-bold text-slate-900 dark:text-white">{current.title}</h5>
            <p className="text-xs font-mono text-[#65a30d] dark:text-[#a3e635]">{current.models}</p>
          </div>
          <span className="rounded bg-slate-200 dark:bg-white/10 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-zinc-300">
            Active Inspection View
          </span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-zinc-300">
          {current.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
          {current.specs.map((spec, i) => (
            <div key={i} className="rounded border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/60 p-2.5">
              <div className="text-[10px] uppercase text-slate-500 dark:text-zinc-400">{spec.label}</div>
              <div className="mt-0.5 font-bold text-slate-900 dark:text-white truncate">{spec.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-start gap-2 rounded bg-amber-500/10 border border-amber-500/20 p-2.5 text-xs text-amber-900 dark:text-amber-200">
          <Activity className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <span><strong>Engineering Operations:</strong> {current.operations}</span>
        </div>
      </div>
    </div>
  );
};
