import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { initialContactInfo } from './data/portfolioData';
import { ContactInfo } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ResearchSection } from './components/ResearchSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EditDetailsModal } from './components/EditDetailsModal';

export default function App() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aftab_contact_info');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved contact info', e);
        }
      }
    }
    return initialContactInfo;
  });

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleSaveContactInfo = (updated: ContactInfo) => {
    setContactInfo(updated);
    localStorage.setItem('aftab_contact_info', JSON.stringify(updated));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#08090c] text-slate-900 dark:text-zinc-100 selection:bg-[#a3e635] selection:text-black font-sans transition-colors duration-200">
        {/* Navigation Bar */}
        <Navbar onOpenEditModal={() => setEditModalOpen(true)} />

        <main>
          {/* Hero Section */}
          <HeroSection
            contactInfo={contactInfo}
            onOpenEditModal={() => setEditModalOpen(true)}
          />

          {/* Featured Projects Section */}
          <ProjectsSection />

          {/* Technical Expertise with Animated Visualizations */}
          <ExpertiseSection />

          {/* About Section */}
          <AboutSection />

          {/* Experience Timeline */}
          <ExperienceTimeline />

          {/* Dedicated Research Section */}
          <ResearchSection />

          {/* Contact Section */}
          <ContactSection
            contactInfo={contactInfo}
            onOpenEditModal={() => setEditModalOpen(true)}
          />
        </main>

        {/* Footer */}
        <Footer contactInfo={contactInfo} />

        {/* Edit Details Modal */}
        <EditDetailsModal
          isOpen={editModalOpen}
          contactInfo={contactInfo}
          onSave={handleSaveContactInfo}
          onClose={() => setEditModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
