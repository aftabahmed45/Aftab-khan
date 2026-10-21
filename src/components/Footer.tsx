import React from 'react';
import { ArrowUp, Linkedin, Github, Mail } from 'lucide-react';
import { ContactInfo } from '../types/portfolio';

interface FooterProps {
  contactInfo: ContactInfo;
}

export const Footer: React.FC<FooterProps> = ({ contactInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-[#06070a] py-14 text-slate-600 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-slate-200 dark:border-white/10 pb-10">
          {/* Identity lockup */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black font-bold font-mono text-sm tracking-wider">
              AA
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                {contactInfo.name}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                {contactInfo.title} · {contactInfo.organization}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium">
            <a href="#work" className="hover:text-slate-950 dark:hover:text-[#a3e635] transition-colors">
              Work
            </a>
            <a href="#expertise" className="hover:text-slate-950 dark:hover:text-[#a3e635] transition-colors">
              Expertise
            </a>
            <a href="#about" className="hover:text-slate-950 dark:hover:text-[#a3e635] transition-colors">
              About
            </a>
            <a href="#research" className="hover:text-slate-950 dark:hover:text-[#a3e635] transition-colors">
              Research
            </a>
            <a href="#contact" className="hover:text-slate-950 dark:hover:text-[#a3e635] transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions & Profiles */}
          <div className="flex items-center gap-3">
            <a
              href={contactInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {contactInfo.githubUrl && (
              <a
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-zinc-500">
          <div>
            © {currentYear} {contactInfo.name}. All rights reserved.
          </div>
          <div className="italic text-slate-600 dark:text-zinc-400">
            Engineered with curiosity and precision.
          </div>
        </div>
      </div>
    </footer>
  );
};
