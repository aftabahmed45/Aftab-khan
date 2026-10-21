import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenEditModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEditModal }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#08090d]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 text-slate-900 dark:text-white"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black font-bold font-mono text-xs tracking-wider transition-transform group-hover:scale-105">
            AA
          </div>
          <span className="font-bold tracking-tight text-base sm:text-lg">
            Aftab Ahmed
          </span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-950 dark:hover:text-[#a3e635]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Dark Mode Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[#a3e635] transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
            )}
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black hover:bg-slate-800 dark:hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-md px-6 py-5 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-800 dark:text-zinc-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-[#65a30d] dark:hover:text-[#a3e635]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black font-semibold text-sm"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
