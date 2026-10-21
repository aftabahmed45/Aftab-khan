import React, { useState, useEffect } from 'react';
import { ContactInfo } from '../types/portfolio';
import { X, Save, RefreshCw, Check } from 'lucide-react';

interface EditDetailsModalProps {
  isOpen: boolean;
  contactInfo: ContactInfo;
  onSave: (updated: ContactInfo) => void;
  onClose: () => void;
}

export const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  isOpen,
  contactInfo,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<ContactInfo>(contactInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(contactInfo);
  }, [contactInfo]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1017] p-6 shadow-2xl text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold">Customize Portfolio Details</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Update editable contact links and professional titles.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs font-mono">
          <div>
            <label className="block text-slate-600 dark:text-zinc-400 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-zinc-400 mb-1">Professional Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-zinc-400 mb-1">Organization</label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-zinc-400 mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-zinc-400 mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-zinc-400 mb-1">GitHub URL (Optional)</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/40 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-900 text-white dark:bg-[#a3e635] dark:text-black font-semibold hover:bg-slate-800 dark:hover:bg-[#bef264] transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
