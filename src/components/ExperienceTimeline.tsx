import React from 'react';
import { experiences } from '../data/portfolioData';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#08090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635]">
            Career Path & Field Deployments
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Professional Experience Timeline
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            A chronological track of hands-on telecommunications engineering, project delivery for tier-1 telecom operators, and technical internships.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-zinc-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp) => {
            const isCurrent = exp.status === 'current';
            const isInternship = exp.status === 'internship';

            return (
              <div key={exp.id} className="relative group">
                {/* Node indicator on vertical line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
                    isCurrent
                      ? 'border-[#a3e635] bg-slate-900 dark:bg-black text-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.3)]'
                      : isInternship
                      ? 'border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-400 dark:text-zinc-500'
                      : 'border-slate-400 dark:border-zinc-500 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      isCurrent ? 'bg-[#a3e635]' : 'bg-slate-400 dark:bg-zinc-600'
                    }`}
                  />
                </div>

                {/* Content Card */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-[#0d1017] p-6 transition-all hover:border-slate-300 dark:hover:border-white/20">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {exp.organization}
                        </h3>
                        {isCurrent && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#a3e635]/15 text-[#65a30d] dark:text-[#a3e635] font-semibold">
                            Current Role
                          </span>
                        )}
                        {isInternship && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                            Internship
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-slate-700 dark:text-zinc-300 mt-1">
                        {exp.role}
                      </div>
                      {exp.projectContext && (
                        <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-0.5">
                          Project: {exp.projectContext}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end text-xs font-mono text-slate-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 dark:text-zinc-500">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Focus & Scope */}
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                    <strong className="text-slate-900 dark:text-white font-medium">Core Focus: </strong>
                    {exp.focus}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                    {exp.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#65a30d] dark:text-[#a3e635] mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies Used */}
                  <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
                    <span className="text-slate-400 dark:text-zinc-500 text-[11px]">Key Systems:</span>
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="inline-flex items-center">
                        <span className="text-slate-700 dark:text-zinc-300">{tech}</span>
                        {i < exp.technologies.length - 1 && (
                          <span className="mx-1.5 text-slate-300 dark:text-zinc-700">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
