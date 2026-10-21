import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Radio, Activity, Cpu, Layers, Sparkles } from 'lucide-react';
import { MicrowaveTransmissionViz } from './visualizations/MicrowaveTransmissionViz';
import { TelecomOperationsViz } from './visualizations/TelecomOperationsViz';
import { InfrastructureViz } from './visualizations/InfrastructureViz';
import { ResearchSimulationViz } from './visualizations/ResearchSimulationViz';

export const ExpertiseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('microwave');

  const icons: Record<string, React.ReactNode> = {
    Radio: <Radio className="h-4 w-4" />,
    Activity: <Activity className="h-4 w-4" />,
    Cpu: <Cpu className="h-4 w-4" />,
    Layers: <Layers className="h-4 w-4" />,
  };

  const renderVisualization = () => {
    switch (activeCategory) {
      case 'microwave':
        return <MicrowaveTransmissionViz />;
      case 'operations':
        return <TelecomOperationsViz />;
      case 'infrastructure':
        return <InfrastructureViz />;
      case 'research':
        return <ResearchSimulationViz />;
      default:
        return <MicrowaveTransmissionViz />;
    }
  };

  const currentCat = skillCategories.find((c) => c.id === activeCategory) || skillCategories[0];

  return (
    <section id="expertise" className="py-20 lg:py-28 border-t border-slate-200 dark:border-white/10 bg-slate-50/40 dark:bg-[#07080c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635]">
              Technical Competencies & Systems
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineering Expertise
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
              Specialized domain skills across microwave radio transport, cellular field operations, physical tower rigging, and electromagnetic research.
            </p>
          </div>

          {/* Interactive Skill Group Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-white/5 rounded-xl border border-slate-300 dark:border-white/10 shrink-0">
            {skillCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-[#a3e635] text-slate-900 dark:text-black shadow-sm font-bold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-slate-900 dark:text-black' : 'text-slate-400 dark:text-zinc-500'}>
                    {icons[cat.iconName]}
                  </span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Animated Interactive Visualization for Selected Skill Group */}
        <div className="mb-12 transition-all duration-300">
          {renderVisualization()}
        </div>

        {/* Detailed Competency Grid for Current Skill Group */}
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1017] p-6 sm:p-8">
          <div className="border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
            <span className="text-xs font-mono uppercase text-[#65a30d] dark:text-[#a3e635]">
              Competency Specification
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {currentCat.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
              {currentCat.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCat.skills.map((skill, idx) => (
              <div
                key={idx}
                className="group rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] p-4 transition-all hover:border-slate-300 dark:hover:border-white/15"
              >
                <div className="text-[11px] font-mono text-[#65a30d] dark:text-[#a3e635] font-semibold mb-1">
                  0{idx + 1}. SPECIFICATION
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#65a30d] dark:group-hover:text-[#a3e635] transition-colors">
                  {skill.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-300">
                  {skill.description}
                </p>
                {skill.detail && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-white/5 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                    <span className="text-slate-400 dark:text-zinc-500">Operation: </span>
                    {skill.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
