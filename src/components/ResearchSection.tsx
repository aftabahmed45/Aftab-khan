import React from 'react';
import { InductiveWptSchematic } from './schematics/InductiveWptSchematic';
import { Layers, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  return (
    <section id="research" className="py-20 lg:py-28 border-t border-slate-200 dark:border-white/10 bg-slate-50/30 dark:bg-[#07080b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635]">
            Academic Research Spotlight · UET Mardan
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Powering the Next Generation of Implantable Devices.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-zinc-300">
            Investigating low-frequency resonant inductive coupling to achieve safe, non-invasive transcutaneous energy transfer for miniature neurostimulators without through-skin cabling.
          </p>
        </div>

        {/* Embedded Interactive Electromagnetic Link Simulator & Schematic */}
        <div className="mb-12">
          <InductiveWptSchematic />
        </div>

        {/* Academic Context & Mathematical Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1017] p-5 shadow-sm">
            <div className="text-[11px] uppercase text-[#65a30d] dark:text-[#a3e635] font-bold">
              01. Frequency Band & Safety
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              Sub-MHz Resonant Transmission
            </h4>
            <p className="mt-2 text-slate-600 dark:text-zinc-300 leading-relaxed font-sans text-xs">
              Operating in the sub-MHz range (e.g. 200 kHz - 500 kHz) drastically reduces biological tissue electrical conductivity losses (sigma approx 0.1 to 0.5 S/m) and avoids tissue heating associated with microwave radiation.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-zinc-400">
              SAR Index &lt; 0.05 W/kg (IEEE Standard Compliant)
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1017] p-5 shadow-sm">
            <div className="text-[11px] uppercase text-[#65a30d] dark:text-[#a3e635] font-bold">
              02. Geometry & Misalignment
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              Planar Spiral Coil Optimization
            </h4>
            <p className="mt-2 text-slate-600 dark:text-zinc-300 leading-relaxed font-sans text-xs">
              Analyzed coil turn spacing, inner-to-outer diameter ratios, and high-permeability ferrite shielding to maintain resonant magnetic coupling under axial distance gaps (10mm – 25mm) and angular patient misalignment.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-zinc-400">
              Ferrite flux-guide shield boosts k by ~35%
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1017] p-5 shadow-sm">
            <div className="text-[11px] uppercase text-[#65a30d] dark:text-[#a3e635] font-bold">
              03. Research Integrity
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              Academic Formulation
            </h4>
            <p className="mt-2 text-slate-600 dark:text-zinc-300 leading-relaxed font-sans text-xs">
              Conducted as a final-year undergraduate engineering research project at UET Mardan. The model and parameters presented represent theoretical simulation formulations, not validated clinical implants.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-zinc-400">
              B.Sc. Telecommunications Engineering Thesis
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
