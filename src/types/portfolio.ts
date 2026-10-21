export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technicalContext: string;
  keyCompetencies: string[];
  equipmentAndTools: string[];
  schematicType: 'microwave-link' | 'inductive-wpt' | 'site-deployment';
  academicNote?: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  status: 'current' | 'previous' | 'internship';
  projectContext?: string;
  focus: string;
  bulletPoints: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  skills: {
    name: string;
    description: string;
    detail?: string;
  }[];
}

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  organization: string;
  location: string;
  education: string;
  linkedinUrl: string;
  githubUrl: string;
  isAvailableForOpportunities: boolean;
  availabilityLabel: string;
}
