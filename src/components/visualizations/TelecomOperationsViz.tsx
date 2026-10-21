import React, { useState } from 'react';
import { Activity, AlertOctagon, CheckCircle2, RefreshCw, Server, ShieldCheck, ArrowRight } from 'lucide-react';

export const TelecomOperationsViz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeScenario, setActiveScenario] = useState<'ber_spike' | 'power_fade' | 'dcn_cutover'>('ber_spike');

  const scenarios = {
    ber_spike: {
      name: 'High BER / RSL Fade on Jazz MW Backbone',
      alarmCode: 'MW_FEC_UNCORR_ERR (Critical)',
      impact: 'Packet loss detected on 10GE mobile backhaul interface',
      steps: [
        {
          title: 'Alarm Ingestion & NOC Coordination',
          actor: 'NOC & Field Engineer',
          description: 'NOC reports continuous frame slips and Bit Error Rate (BER > 10^-3) on microwave hop. Field engineer logs into Huawei WebLCT to inspect current RSL vs baseline reference.',
          actionTaken: 'Verified alarm logs, confirmed weather condition (clear sky - ruling out rain fade), and initiated PRBS test pattern.'
        },
        {
          title: 'ODU / Waveguide Physical Verification',
          actor: 'Site Field Rigging Specialist',
          description: 'Tower climber checks ODU BNC test port voltage (RSSI) with digital multimeter. Confirms 14 dB drop in RSL from planned -41 dBm to -55 dBm.',
          actionTaken: 'Inspected parabolic dish feed horn, discovered slight looseness in horizontal azimuth bracket due to wind turbulence.'
        },
        {
          title: 'Fine Azimuth Re-Alignment & Optimization',
          actor: 'Field Operations Team',
          description: 'Adjusted fine-thread azimuth panning screws while monitoring real-time RSSI voltage feedback until RSL peaked back at -40.8 dBm.',
          actionTaken: 'Torqued mounting bolts to OEM specification (55 N·m) and sealed waveguide flange with dielectric compound.'
        },
        {
          title: 'Performance Soak & ISDP Acceptance',
          actor: 'Huawei QA & NOC',
          description: 'Conducted 30-minute zero-error soak test with NOC. Cleared all alarms in WebLCT and uploaded calibration photos to Huawei ISDP.',
          actionTaken: 'PAT (Provisional Acceptance Test) digitally signed off and traffic restored to full 1024-QAM AMR mode.'
        }
      ]
    },
    power_fade: {
      name: 'Multipath Reflection Degradation',
      alarmCode: 'RADIO_SIGNAL_DEGRADE (Major)',
      impact: 'Adaptive Modulation falling from 2048-QAM to 64-QAM',
      steps: [
        {
          title: 'Spectral Analysis via WebLCT',
          actor: 'Transmission Engineer',
          description: 'Analyzed channel frequency response and determined severe destructive interference caused by thermal ducting over flat terrain.',
          actionTaken: 'Monitored equalizer tap coefficients in WebLCT to pinpoint frequency-selective notch.'
        },
        {
          title: 'Space Diversity / Polarization Assessment',
          actor: 'Field Engineer & RF Planner',
          description: 'Evaluated second space-diversity antenna path and verified Cross-Polarization Discrimination (XPD) ratio > 32 dB.',
          actionTaken: 'Switched primary transport priority to diversity receiver branch and adjusted antenna vertical tilt by 0.5°.'
        },
        {
          title: 'Link Parameter Tuning',
          actor: 'Field Specialist',
          description: 'Tuned Automatic Transmit Power Control (ATPC) upper ceiling to maintain 4 dB additional margin during dusk ducting hours.',
          actionTaken: 'Verified ATPC response times and eliminated constellation constellation jitter.'
        },
        {
          title: 'NOC Handover & ISDP Archive',
          actor: 'NOC Controller',
          description: 'Verified steady link throughput across peak traffic hours without secondary modulation drops.',
          actionTaken: 'Closed incident ticket with formal RCA (Root Cause Analysis) documentation.'
        }
      ]
    },
    dcn_cutover: {
      name: 'ECRF Network Upgrade & Capacity Expansion',
      actor: 'Planned Maintenance Execution',
      alarmCode: 'PLANNED_MAINTENANCE_WINDOW',
      impact: 'Bandwidth capacity expansion from 450 Mbps to 1.2 Gbps',
      steps: [
        {
          title: 'ECRF Approval & Staging',
          actor: 'Project Specialist',
          description: 'Secured approved Engineering Change Request Form (ECRF) from Jazz operator for 02:00 AM maintenance window.',
          actionTaken: 'Pre-configured RTN 950 configuration script in WebLCT offline mode and backed up NE database.'
        },
        {
          title: 'Transceiver Board Staging',
          actor: 'Site Engineer',
          description: 'Installed secondary IF board (ISX2) into RTN chassis slot 3 and ran inter-board cabling.',
          actionTaken: 'Verified board green status LED and provisioned port VLAN mappings.'
        },
        {
          title: 'XPIC Dual-Polarization Activation',
          actor: 'Commissioning Specialist',
          description: 'Configured Cross-Polarization Interference Cancellation (XPIC) cable between dual ODUs on same frequency channel.',
          actionTaken: 'Calibrated XPIC coefficient to 34 dB, doubling radio link capacity without consuming new spectrum.'
        },
        {
          title: 'Traffic Re-Route & Final Site Handover',
          actor: 'NOC & Field QA',
          description: 'Restored customer live traffic, verified zero packet drops, and documented test results in Huawei ISDP.',
          actionTaken: 'Submitted customer acceptance certificate with digital signature.'
        }
      ]
    }
  };

  const active = scenarios[activeScenario];
  const step = active.steps[currentStep - 1];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1017] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635] font-mono">Operations Workflow & Troubleshooting</span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Field Operations Protocol & NOC Coordination</h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-black/40 rounded-lg border border-slate-200 dark:border-white/5">
          {[
            { id: 'ber_spike', label: 'BER / RSL Fade' },
            { id: 'power_fade', label: 'Multipath Notch' },
            { id: 'dcn_cutover', label: 'ECRF Capacity Upgrade' },
          ].map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenario(sc.id as any);
                setCurrentStep(1);
              }}
              className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                activeScenario === sc.id
                  ? 'bg-white dark:bg-[#a3e635] text-slate-900 dark:text-black font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Header Bar */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 p-3.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white">{active.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 dark:text-zinc-400">Alarm: <span className="text-rose-500 dark:text-rose-400">{active.alarmCode}</span></span>
          <span className="text-slate-500 dark:text-zinc-500">|</span>
          <span className="text-slate-700 dark:text-zinc-300">Impact: {active.impact}</span>
        </div>
      </div>

      {/* Step Sequence Interactive Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {active.steps.map((s, idx) => {
          const stepNumber = idx + 1;
          const isCurrent = currentStep === stepNumber;
          const isDone = currentStep > stepNumber;

          return (
            <button
              key={idx}
              onClick={() => setCurrentStep(stepNumber)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isCurrent
                  ? 'border-[#a3e635] bg-[#a3e635]/10 text-slate-900 dark:text-white'
                  : isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5 text-slate-700 dark:text-zinc-300'
                  : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-zinc-900/30 text-slate-500 dark:text-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={isCurrent ? 'text-[#65a30d] dark:text-[#a3e635] font-bold' : ''}>
                  PHASE 0{stepNumber}
                </span>
                {isDone ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-zinc-600" />
                )}
              </div>
              <div className="text-xs font-semibold truncate">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Current Step Detailed Execution Panel */}
      <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/40 p-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <span className="text-[11px] font-mono text-[#65a30d] dark:text-[#a3e635] uppercase">
              Phase 0{currentStep} Execution
            </span>
            <h5 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h5>
          </div>
          <span className="text-xs font-mono rounded bg-slate-200 dark:bg-white/10 px-2.5 py-1 text-slate-700 dark:text-zinc-300">
            Responsible: {step.actor}
          </span>
        </div>

        <div className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-zinc-300">
          {step.description}
        </div>

        <div className="mt-4 rounded border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-950 dark:text-emerald-200">
          <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Engineering Action Completed:
          </div>
          <div className="mt-1 text-slate-700 dark:text-zinc-300">{step.actionTaken}</div>
        </div>

        <div className="mt-4 flex items-center justify-between pt-2">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="px-3 py-1.5 text-xs font-medium rounded border border-slate-300 dark:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-zinc-800 cursor-pointer"
          >
            Previous Phase
          </button>
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-500">
            {currentStep} / {active.steps.length}
          </span>
          <button
            disabled={currentStep === active.steps.length}
            onClick={() => setCurrentStep((prev) => Math.min(active.steps.length, prev + 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-[#a3e635] text-black font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#bef264] cursor-pointer"
          >
            <span>Next Phase</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
