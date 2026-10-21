import React, { useState } from 'react';
import { ContactInfo } from '../types/portfolio';
import { Mail, Copy, Check, Send, Linkedin, Github, MapPin, Building2, ExternalLink, Settings } from 'lucide-react';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  onOpenEditModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo, onOpenEditModal }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in your name, email, and message.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    formData.subject || 'Engineering Discussion with Aftab Ahmed'
  )}&body=${encodeURIComponent(
    `Hello Aftab,\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
  )}`;

  return (
    <section id="contact" className="py-20 lg:py-28 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#08090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Telecommunication Channels */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#65a30d] dark:text-[#a3e635]">
              Get in Touch
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Have a technical challenge in mind?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-300">
              Let's connect to discuss telecommunications, network engineering, microwave transmission, and opportunities to build reliable infrastructure.
            </p>

            {/* Email Contact Card with 1-Click Copy */}
            <div className="mt-8 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0d1017] p-5 shadow-sm">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-zinc-400 mb-2">
                Primary Contact Address
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-[#65a30d] dark:hover:text-[#a3e635] transition-colors break-all"
                >
                  {contactInfo.email}
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black text-xs font-semibold hover:bg-slate-800 dark:hover:bg-[#bef264] transition-colors"
                  >
                    <span>Compose</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Profiles & Location */}
            <div className="mt-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-zinc-400">
                  <Linkedin className="h-4 w-4 text-[#0077b5]" />
                  <span>LinkedIn Profile</span>
                </div>
                <a
                  href={contactInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 dark:text-[#a3e635] hover:underline flex items-center gap-1"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {contactInfo.githubUrl ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 text-slate-600 dark:text-zinc-400">
                    <Github className="h-4 w-4 text-slate-800 dark:text-white" />
                    <span>GitHub Profile</span>
                  </div>
                  <a
                    href={contactInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-900 dark:text-[#a3e635] hover:underline flex items-center gap-1"
                  >
                    <span>View GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ) : null}

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-zinc-400">
                  <Building2 className="h-4 w-4 text-[#65a30d] dark:text-[#a3e635]" />
                  <span>Current Affiliation</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">Huawei Pakistan</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-zinc-400">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  <span>Deployment Base</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">Pakistan</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-500">
              <span>Have updated profile links or contact info?</span>
              <button
                onClick={onOpenEditModal}
                className="flex items-center gap-1 text-[#65a30d] dark:text-[#a3e635] hover:underline cursor-pointer"
              >
                <Settings className="h-3 w-3" />
                <span>Customize Details</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#0d1017] p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Send a Direct Message
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                Messages directly open in your email client or can be copied with one click.
              </p>

              {formSubmitted ? (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-slate-900 dark:text-white">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 mb-3">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold">Message Prepared</h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-md mx-auto">
                    To send this message directly to Aftab Ahmed, click below to open your preferred mail client.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#a3e635] text-black font-semibold text-xs hover:bg-[#bef264] transition-all"
                    >
                      <span>Open in Mail App</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2 text-xs font-mono text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                    >
                      Edit Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {formError && (
                    <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-500 font-mono">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-zinc-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tariq Khan"
                        className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-zinc-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. tariq@telecom.org"
                        className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-zinc-300 mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Microwave Transmission Project Consultation"
                      className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-zinc-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, telecom infrastructure scope, or engineering topic..."
                      className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/30 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
                      Direct delivery to {contactInfo.email}
                    </span>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black font-semibold text-xs hover:bg-slate-800 dark:hover:bg-[#bef264] transition-all cursor-pointer shadow-sm"
                    >
                      <span>Prepare Message</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
