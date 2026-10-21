import React from 'react';
import { ArrowDown, ArrowUpRight, Radio, ShieldCheck, Cpu } from 'lucide-react';
import { HeroSignalCanvas } from './HeroSignalCanvas';
import { ContactInfo } from '../types/portfolio';

interface HeroSectionProps {
  contactInfo: ContactInfo;
  onOpenEditModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ contactInfo, onOpenEditModal }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#a3e635]/5 dark:bg-[#a3e635]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero: 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status / Availability Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-zinc-400">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65a30d] dark:bg-[#a3e635] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#65a30d] dark:bg-[#a3e635]"></span>
                </span>
                <span>{contactInfo.organization} · {contactInfo.title}</span>
                <span aria-hidden="true" className="text-slate-400 dark:text-zinc-600">·</span>
                <span className="text-slate-500 dark:text-zinc-400">{contactInfo.location}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] [text-wrap:balance]">
              Connecting Networks.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
                Engineering Possibilities.
              </span>
            </h1>

            {/* Introduction Copy */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
              I'm <strong className="text-slate-900 dark:text-white font-semibold">Aftab Ahmed</strong>, a Telecommunications Engineer working across microwave transmission, network operations, and telecom infrastructure with Huawei Pakistan.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black hover:bg-slate-800 dark:hover:bg-[#bef264] transition-all shadow-sm"
              >
                <span>Explore My Work</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
              </a>

              <button
                onClick={onOpenEditModal}
                className="text-xs font-mono text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-300 transition-colors underline cursor-pointer"
              >
                Edit Info
              </button>
            </div>
          </div>

          {/* Right Column: Abstract Technical Visual Canvas */}
          <div className="lg:col-span-5 h-[340px] sm:h-[400px] lg:h-[440px] w-full">
            <HeroSignalCanvas />
          </div>
        </div>

        {/* Operational Focus Strip Below the Split (Full Width Row) */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <div className="text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Primary Domain</div>
            <div className="mt-1 font-bold text-slate-900 dark:text-white">Microwave Transmission</div>
            <div className="text-[11px] text-slate-600 dark:text-zinc-400">Huawei RTN 900 Series</div>
          </div>

          <div>
            <div className="text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Active Deployment</div>
            <div className="mt-1 font-bold text-slate-900 dark:text-white">Huawei Pakistan</div>
            <div className="text-[11px] text-slate-600 dark:text-zinc-400">Jazz Telecom Projects</div>
          </div>

          <div>
            <div className="text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Academic Research</div>
            <div className="mt-1 font-bold text-slate-900 dark:text-white">Wireless Power Transfer</div>
            <div className="text-[11px] text-slate-600 dark:text-zinc-400">Sub-MHz Neurostimulator Link</div>
          </div>

          <div>
            <div className="text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-[11px]">Engineering Alma Mater</div>
            <div className="mt-1 font-bold text-slate-900 dark:text-white">UET Mardan</div>
            <div className="text-[11px] text-slate-600 dark:text-zinc-400">B.Sc. Telecommunications</div>
          </div>
        </div>
      </div>
    </section>
  );
};
