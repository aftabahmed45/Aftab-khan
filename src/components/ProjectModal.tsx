import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, CheckCircle2, Wrench, FileText, ExternalLink } from 'lucide-react';
import { MicrowaveLinkSchematic } from './schematics/MicrowaveLinkSchematic';
import { InductiveWptSchematic } from './schematics/InductiveWptSchematic';
import { SiteDeploymentSchematic } from './schematics/SiteDeploymentSchematic';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderSchematic = () => {
    switch (project.schematicType) {
      case 'microwave-link':
        return <MicrowaveLinkSchematic />;
      case 'inductive-wpt':
        return <InductiveWptSchematic />;
      case 'site-deployment':
        return <SiteDeploymentSchematic />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1017] p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#65a30d] dark:text-[#a3e635]">
              <span>PROJECT {project.number}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mt-1 text-slate-900 dark:text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Academic Note banner if present */}
        {project.academicNote && (
          <div className="mt-4 rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-xs text-blue-900 dark:text-blue-200 font-mono">
            <strong>Research Disclosure: </strong>
            {project.academicNote}
          </div>
        )}

        {/* Interactive Schematic Section */}
        <div className="mt-6">
          <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase mb-2">
            Technical Architecture & Interactive Model
          </div>
          {renderSchematic()}
        </div>

        {/* In-depth Context & Highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-[#65a30d] dark:text-[#a3e635]" />
              Engineering Overview & Context
            </h4>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-zinc-300">
              {project.technicalContext}
            </p>

            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm mt-5">
              <CheckCircle2 className="h-4 w-4 text-[#65a30d] dark:text-[#a3e635]" />
              Key Project Highlights
            </h4>
            <ul className="mt-2 space-y-2 text-slate-600 dark:text-zinc-300">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#65a30d] dark:text-[#a3e635] font-bold">›</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
              <Wrench className="h-4 w-4 text-[#65a30d] dark:text-[#a3e635]" />
              Equipment & Analytical Tools
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-xs">
              {project.equipmentAndTools.map((tool, i) => (
                <span
                  key={i}
                  className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-2.5 py-1 text-slate-700 dark:text-zinc-300"
                >
                  {tool}
                </span>
              ))}
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm mt-5">
              <CheckCircle2 className="h-4 w-4 text-[#65a30d] dark:text-[#a3e635]" />
              Core Competencies Applied
            </h4>
            <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-zinc-300 font-mono text-xs">
              {project.keyCompetencies.map((comp, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65a30d] dark:bg-[#a3e635]" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black hover:bg-slate-800 dark:hover:bg-[#bef264] transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
