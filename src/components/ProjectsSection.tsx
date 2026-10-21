import React, { useState } from 'react';
import { featuredProjects } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { Radio, ArrowUpRight, Cpu, Layers, Activity } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const icons: Record<string, React.ReactNode> = {
    'microwave-link': <Radio className="h-5 w-5 text-[#65a30d] dark:text-[#a3e635]" />,
    'inductive-wpt': <Layers className="h-5 w-5 text-[#65a30d] dark:text-[#a3e635]" />,
    'site-deployment': <Cpu className="h-5 w-5 text-[#65a30d] dark:text-[#a3e635]" />,
  };

  return (
    <section id="work" className="py-20 lg:py-28 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#08090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635]">
              Featured Engineering Engagements
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Selected Projects & Research
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
              Real telecom site deployment, Huawei microwave link operations, and academic research in low-frequency biomedical wireless power delivery.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
            Click any project to inspect interactive technical schematics
          </div>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#0c1017] p-7 transition-all duration-300 hover:border-slate-300 dark:hover:border-[#a3e635]/40 hover:-translate-y-1 shadow-sm cursor-pointer"
            >
              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-extrabold text-slate-400 dark:text-zinc-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/80 dark:bg-white/5 group-hover:bg-[#a3e635] group-hover:text-black transition-all">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#65a30d] dark:group-hover:text-[#a3e635] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Key competency chips */}
                <div className="mt-5 space-y-1.5 font-mono text-xs text-slate-500 dark:text-zinc-400">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                    Applied Competencies
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.keyCompetencies.slice(0, 3).map((comp, i) => (
                      <span
                        key={i}
                        className="rounded border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-700 dark:text-zinc-300"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                  {icons[project.schematicType]}
                  Interactive Model
                </span>
                <span className="font-semibold text-slate-900 dark:text-[#a3e635] group-hover:underline">
                  Inspect Schematic & Architecture ›
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal with Interactive Schematics */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
