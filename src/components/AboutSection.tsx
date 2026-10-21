import React from 'react';
import { Radio, Cpu, Award, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#090b0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Designed Engineering Monogram & Schematic Artwork */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1017] p-8 shadow-sm">
              {/* Corner calibration accents */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 dark:text-zinc-600">SYS_ID: AA-TX-09</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 dark:text-zinc-600">PAK-TELECOM</div>

              <div className="my-6 flex flex-col items-center text-center">
                {/* Large Monogram Seal */}
                <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-slate-200 dark:border-[#a3e635]/40 bg-slate-100 dark:bg-[#a3e635]/10 text-slate-900 dark:text-[#a3e635]">
                  <span className="font-mono text-4xl font-black tracking-wider">AA</span>
                  {/* Subtle orbiting orbit ring */}
                  <div className="absolute -inset-2 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 pointer-events-none" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Aftab Ahmed</h3>
                <p className="text-xs font-mono text-[#65a30d] dark:text-[#a3e635] mt-1">
                  Telecommunications Engineer · Huawei Pakistan
                </p>

                {/* Verification badges */}
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                  <span className="rounded bg-slate-100 dark:bg-white/5 px-2.5 py-1">
                    B.Sc. Telecom Engineering
                  </span>
                  <span className="rounded bg-slate-100 dark:bg-white/5 px-2.5 py-1">
                    UET Mardan
                  </span>
                </div>
              </div>

              {/* Engineering Scope Indicators */}
              <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                  <span>Current Project</span>
                  <span className="font-bold text-slate-900 dark:text-white">Jazz Telecom Rollout</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                  <span>Core Platform</span>
                  <span className="font-bold text-slate-900 dark:text-white">Huawei RTN Microwave</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                  <span>Research Specialization</span>
                  <span className="font-bold text-slate-900 dark:text-white">Sub-MHz Inductive WPT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635]">
              Background & Engineering Discipline
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Engineering meets execution.
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-300">
              <p>
                As a telecommunications engineer currently working with Huawei Pakistan, I operate at the intersection of wireless radio propagation theory and demanding physical field delivery. My day-to-day responsibilities focus on deploying, aligning, and troubleshooting microwave transmission links across the Jazz mobile infrastructure network.
              </p>
              <p>
                Telecommunications in the field doesn't tolerate ambiguity. Whether I am calculating Fresnel zone clearances across undulating topography, adjusting parabolic dish antennas millimeter by millimeter to recover faded Receive Signal Levels (RSL), or configuring Huawei RTN 900 series IDUs and ODUs via WebLCT, success is measured in clean signal margins, zero-packet-drop availability, and rigorous site acceptance.
              </p>
              <p>
                Before joining Huawei, I built practical foundations through telecom engineering engagements at Turnotech and internships at National Telecommunication Corporation (NTC) and PTCL, gaining first-hand exposure to optical fiber trunks, NOC workflows, and exchange routing backbones.
              </p>
              <p>
                My academic journey culminated at the University of Engineering and Technology (UET) Mardan, where my final-year research tackled low-frequency wireless power transfer for implantable neurostimulators — investigating how inductive magnetic resonance can safely deliver electrical energy across biological tissue barriers without invasive cabling.
              </p>
            </div>

            {/* Core Values / Engineering Principles */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-3.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#65a30d] dark:text-[#a3e635]" />
                  Precision Alignment
                </div>
                <div className="mt-1 text-slate-500 dark:text-zinc-400">Tolerances within ±1.5 dBm of theoretical link budgets.</div>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-3.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#65a30d] dark:text-[#a3e635]" />
                  Systematic Fault-Finding
                </div>
                <div className="mt-1 text-slate-500 dark:text-zinc-400">Root-cause isolation across physical and DCN transport layers.</div>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-3.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#65a30d] dark:text-[#a3e635]" />
                  Quality Governance
                </div>
                <div className="mt-1 text-slate-500 dark:text-zinc-400">Strict adherence to ISDP and client site acceptance standards.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
