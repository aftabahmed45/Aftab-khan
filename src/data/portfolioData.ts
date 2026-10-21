import { Project, ExperienceItem, SkillCategory, ContactInfo } from '../types/portfolio';

export const initialContactInfo: ContactInfo = {
  name: 'Aftab Ahmed',
  title: 'Telecommunications Engineer',
  organization: 'Huawei Pakistan',
  location: 'Pakistan',
  education: "Bachelor's in Telecommunications Engineering, University of Engineering and Technology (UET) Mardan",
  email: 'aftabahmedmp456@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/aftab-ahmed-telecom',
  githubUrl: '',
  isAvailableForOpportunities: true,
  availabilityLabel: 'Open to Technical Discussions & Opportunities',
};

export const experiences: ExperienceItem[] = [
  {
    id: 'huawei',
    organization: 'Huawei Pakistan',
    role: 'Site Engineer / Project Specialist',
    period: 'Current Role',
    location: 'Pakistan',
    status: 'current',
    projectContext: 'Jazz Telecom Infrastructure Projects',
    focus: 'Microwave transmission, site deployment, network troubleshooting, integration coordination, site acceptance, and technical documentation.',
    bulletPoints: [
      'Executes end-to-end microwave link installation, physical alignment, and commissioning across Huawei RTN platforms.',
      'Performs Receive Signal Level (RSL) optimization, Line of Sight (LOS) verification, and cross-polarization discrimination (XPD) checks.',
      'Configures IDU (Indoor Units) and ODU (Outdoor Units) using Huawei WebLCT and network management utilities.',
      'Coordinates with Network Operations Center (NOC) teams for DCN routing, cutovers, and alarm rectification.',
      'Supervises site surveys, structural mounts, cable routing, and completes standardized ISDP site acceptance documentation.'
    ],
    technologies: ['Huawei RTN 905/950/980', 'WebLCT', 'ISDP Platform', 'ODU / IDU', 'RSL & LOS Alignment', 'DCN / ECRF']
  },
  {
    id: 'turnotech',
    organization: 'Turnotech',
    role: 'Telecom & Networking Engineer',
    period: 'Previous Professional Experience',
    location: 'Pakistan',
    status: 'previous',
    projectContext: 'Telecommunications & Network Engineering Projects',
    focus: 'Networking and telecom project support across field infrastructure and deployment activities.',
    bulletPoints: [
      'Assisted field operations teams in telecom network rollouts and equipment staging.',
      'Conducted preliminary site surveys, RF cabling inspections, and network equipment verifications.',
      'Supported transmission testing and baseline network quality reporting.'
    ],
    technologies: ['Telecom Field Operations', 'Network Equipment Staging', 'RF Cabling', 'Site Surveys']
  },
  {
    id: 'ntc',
    organization: 'National Telecommunication Corporation (NTC)',
    role: 'Telecommunications Engineering Intern',
    period: 'Internship',
    location: 'Pakistan',
    status: 'internship',
    projectContext: 'Public Sector Telecom Infrastructure',
    focus: 'Telecommunications and networking exposure across switching, transmission, and operational protocols.',
    bulletPoints: [
      'Gained practical insight into national-scale telecom backbones, exchange switching, and routing systems.',
      'Observed NOC surveillance workflows, fault detection methods, and transmission redundancy protocols.',
      'Studied structured enterprise data network configurations and carrier-grade infrastructure.'
    ],
    technologies: ['Carrier-Grade Networks', 'Telecom Switching', 'NOC Surveillance', 'Transmission Backbones']
  },
  {
    id: 'ptcl',
    organization: 'Pakistan Telecommunication Company Limited (PTCL)',
    role: 'Network Operations Intern',
    period: 'Internship',
    location: 'Pakistan',
    status: 'internship',
    projectContext: 'Optical Fiber & Broadband Operations',
    focus: 'Network support and optical-fiber-related operational exposure.',
    bulletPoints: [
      'Studied optical distribution networks (ODN), fiber splicing, and OTDR attenuation testing procedures.',
      'Assisted technical teams in understanding fiber-to-the-node (FTTN) and copper/fiber aggregation nodes.',
      'Learned standard operational procedures for physical layer maintenance and customer broadband access loops.'
    ],
    technologies: ['Optical Fiber Transmission', 'OTDR Testing', 'ODN Architecture', 'Physical Layer Troubleshooting']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'microwave',
    title: 'Microwave Transmission',
    subtitle: 'Point-to-point wireless transmission platforms & radio link commissioning',
    iconName: 'Radio',
    skills: [
      {
        name: 'Huawei RTN 905 / 950 / 980',
        description: 'Multi-service microwave transmission systems, hybrid TDM/packet transport, and nodal link configurations.',
        detail: 'Hardware provisioning, board slot assignment (IF, control, power, and interface boards), and firmware management.'
      },
      {
        name: 'Link Installation & Antenna Alignment',
        description: 'Parabolic dish antenna mounting, fine azimuth and elevation panning to achieve target RSL.',
        detail: 'Precision mechanical alignment, polarization setting (V/H), and beamwidth calibration.'
      },
      {
        name: 'ODU, IDU & IF Cable Subsystems',
        description: 'Physical connection and weatherproofing of Outdoor Units, coaxial Intermediate Frequency cables, and grounding.',
        detail: 'IF cable crimping, connector weather-sealing, attenuation checks, and surge arrestor validation.'
      },
      {
        name: 'RSL & LOS Troubleshooting',
        description: 'Analyzing Fresnel zone clearance, multipath reflections, weather fade margins, and link budgeting.',
        detail: 'Diagnostic verification between calculated nominal RSL and real-time monitored RSL values.'
      },
      {
        name: 'WebLCT Configuration',
        description: 'Huawei Local Craft Terminal for NE element management, link parameter provisioning, and alarm diagnostics.',
        detail: 'Service creation, port attributes, modulation scheme setup (QPSK up to 4096QAM), and loopback testing.'
      }
    ]
  },
  {
    id: 'operations',
    title: 'Telecom Operations',
    subtitle: 'Field execution, link maintenance & operational workflow governance',
    iconName: 'Activity',
    skills: [
      {
        name: 'Network Troubleshooting',
        description: 'Isolating transmission failures, bit error rate (BER) spikes, and radio degradation in live production loops.',
        detail: 'Systematic fault isolation from physical layer to transport protocol alarms.'
      },
      {
        name: 'NOC Coordination & Cutovers',
        description: 'Real-time synchronization with centralized Network Operations Center during maintenance windows.',
        detail: 'Traffic rerouting confirmation, alarm clearing, and operational handoff protocols.'
      },
      {
        name: 'MW Link Upgrades & Capacity Expansion',
        description: 'Implementing carrier aggregation, XPIC (Cross-Polarization Interference Cancellation), and bandwidth expansion.',
        detail: 'Transceiver upgrades, 1+0 to 1+1 / 2+0 configuration transitions, and license activations.'
      },
      {
        name: 'DCN & ECRF Activities',
        description: 'Data Communication Network IP planning, subnet management, and Engineering Change Request Forms (ECRF).',
        detail: 'NE gateway routing, in-band/out-band management configuration, and formal change execution.'
      },
      {
        name: 'ISDP Documentation & Site Acceptance',
        description: 'Rigorous digital logging on Huawei Integrated Service Delivery Platform (ISDP) for QA compliance.',
        detail: 'Photo-documented inspection points, PAT (Provisional Acceptance Test) checklists, and punch-list resolution.'
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Field',
    subtitle: 'Tower rigging, radio unit integration & cabling physical deployment',
    iconName: 'Cpu',
    skills: [
      {
        name: 'Telecom Site Deployment',
        description: 'Physical coordination of greenfield and rooftop base transceiver stations (BTS).',
        detail: 'Tower space verification, structural load considerations, and site staging workflows.'
      },
      {
        name: 'Antenna Azimuth & Sector Orientation',
        description: 'Setting precise tilt (mechanical/electrical) and compass bearings according to RF engineering design.',
        detail: 'Compass/inclinometer calibration to eliminate inter-sector interference and optimize cell coverage.'
      },
      {
        name: 'RRU & Baseband Installation',
        description: 'Mounting Remote Radio Units on tower legs and interfacing with Baseband Units (BBU).',
        detail: 'DC power feed distribution, CPRI/eCPRI optical fiber jumper routing, and lightning protection.'
      },
      {
        name: 'Fiber & Power Cable Routing',
        description: 'Structured ladder routing, grounding bar bonding, and cable clamp installation.',
        detail: 'Adherence to minimum bending radii for optical fibers and industrial safety standards.'
      },
      {
        name: 'Site Survey & Technical Reporting',
        description: 'Comprehensive physical asset audits, line-of-sight path visual surveys, and site readiness reports.',
        detail: 'Pre-installation feasibility reviews and post-installation snag list documentation.'
      }
    ]
  },
  {
    id: 'research',
    title: 'Research & Simulation',
    subtitle: 'Electromagnetic simulation, inductive coupling & wireless power transfer',
    iconName: 'Layers',
    skills: [
      {
        name: 'Wireless Power Transfer (WPT)',
        description: 'Near-field magnetic resonance and inductive power delivery principles for specialized environments.',
        detail: 'Theoretical formulation of mutual inductance, quality factor (Q), and link efficiency optimization.'
      },
      {
        name: 'Inductive Coupling Design',
        description: 'Transmitter (Tx) and receiver (Rx) planar coil geometry optimization for biological tissue compatibility.',
        detail: 'Coil pitch, turn count, ferrite shield integration, and misalignment tolerance analysis.'
      },
      {
        name: 'Implantable Neurostimulator Applications',
        description: 'Academic design constraints for powering miniature deep brain / spinal cord stimulator implants.',
        detail: 'SAR compliance, thermal dissipation constraints, and sub-MHz frequency band selection.'
      },
      {
        name: 'Ansys HFSS & Maxwell',
        description: 'Finite element method (FEM) modeling of electromagnetic field distributions and magnetic vector potentials.',
        detail: 'Parametric sweep simulations, coupling coefficient (k) calculation, and eddy current loss evaluation.'
      }
    ]
  }
];

export const featuredProjects: Project[] = [
  {
    id: 'wpt-neurostimulator',
    number: '01',
    category: 'Academic Research · Final Year Project',
    title: 'Wireless Power Transfer for Implantable Neurostimulators',
    tagline: 'Low-frequency inductive coupling architecture designed for miniature medical implants with biological safety constraints.',
    description: 'Academic engineering research conducted at UET Mardan exploring low-frequency (sub-MHz) inductive wireless power transmission to reliably power deep-tissue implantable neurostimulators without percutaneous wiring.',
    technicalContext: 'Implantable neurostimulators require continuous or periodic recharging without causing localized tissue heating or requiring invasive battery replacement surgery. This project formulated transmitter-receiver planar spiral coil geometries operating at low frequency to minimize electromagnetic tissue absorption (Specific Absorption Rate - SAR) while preserving coupling efficiency across biological media.',
    academicNote: 'Academic research project at University of Engineering and Technology, Mardan. Conceptual design and simulation model — not claimed as clinical validation.',
    keyCompetencies: [
      'Near-field magnetic resonance',
      'Mutual inductance modeling',
      'Planar spiral coil optimization',
      'Low-frequency tissue penetration',
      'Resonant tank circuit tuning'
    ],
    equipmentAndTools: [
      'Ansys Maxwell / HFSS (Simulation concepts)',
      'Analytical MATLAB coil models',
      'LCR meter & impedance analysis',
      'Ferrite shield substrate design'
    ],
    schematicType: 'inductive-wpt',
    highlights: [
      'Formulated dual-resonance series-parallel compensation topology for stable power delivery under varying load impedances.',
      'Evaluated spatial misalignment effects (axial separation vs angular tilt) between external transmitter and subcutaneous receiver.',
      'Derived coil dimension ratios maximizing coupling coefficient k while keeping implant diameter compact.'
    ]
  },
  {
    id: 'microwave-link-operations',
    number: '02',
    category: 'Field Operations · Professional Experience',
    title: 'Microwave Transmission & Link Operations',
    tagline: 'Precision alignment, hardware commissioning, and operational troubleshooting on carrier-grade Huawei RTN networks.',
    description: 'Extensive hands-on field engineering across Huawei RTN microwave transmission platforms supporting the Jazz mobile network infrastructure. Encompasses link alignment, hardware integration, and proactive troubleshooting.',
    technicalContext: 'In mobile backhaul and access networks, microwave links deliver high-capacity, low-latency connectivity between cell towers and aggregation hubs. Work requires precise mathematical path alignment, verifying Fresnel zone clearance, commissioning IDU/ODU transceivers, and diagnosing link fading or interference.',
    keyCompetencies: [
      'Huawei RTN 905/950/980 Commissioning',
      'Antenna Pan & Tilt Alignment to Target RSL',
      'LOS Clearance & Fresnel Zone Validation',
      'WebLCT Configuration & Alarm Diagnostics',
      'NOC Cutover Coordination & DCN Routing'
    ],
    equipmentAndTools: [
      'Huawei WebLCT (Local Craft Terminal)',
      'Digital Multimeter & Spectrum Monitor',
      'ODU / IDU Transceiver Hardware',
      'Precision Inclinometer & Compass',
      'Coaxial & Optical Test Sets'
    ],
    schematicType: 'microwave-link',
    highlights: [
      'Maintained link availability across critical transmission paths by tuning RSL within ±1.5 dBm of planned engineering targets.',
      'Resolved complex degradation cases involving multipath reflections, connector moisture ingress, and ODU frequency misalignment.',
      'Executed capacity expansions and modulation upgrades transitioning links to adaptive modulation (AMR).'
    ]
  },
  {
    id: 'site-deployment-acceptance',
    number: '03',
    category: 'Telecom Infrastructure · Project Delivery',
    title: 'Telecom Site Deployment & Acceptance',
    tagline: 'End-to-end site survey coordination, hardware QA, cable routing, and ISDP digital verification for commercial rollout.',
    description: 'Systematic execution of site deployment and acceptance testing protocols for cellular telecom infrastructure, bridging physical tower rigging with stringent client quality standards.',
    technicalContext: 'Base station rollouts require synchronized coordination between structural civil works, RF hardware installation (antennas, RRUs, BBUs), DC power feeds, grounding grids, and documentation for client acceptance.',
    keyCompetencies: [
      'ISDP Digital Delivery Documentation',
      'Sector Azimuth & Electrical/Mechanical Tilt Verification',
      'RRU & BBU Jumper Interconnection',
      'Fiber CPRI Route Quality Audits',
      'Provisional Acceptance Testing (PAT)'
    ],
    equipmentAndTools: [
      'Huawei ISDP Mobile & Cloud System',
      'Optical Power Meter & Fiber Scope',
      'Grounding Earth Resistance Tester',
      'RF Torque Wrenches & Seal Kits',
      'Safety Harness & Rigging Protocols'
    ],
    schematicType: 'site-deployment',
    highlights: [
      'Streamlined site acceptance handovers by eliminating snag items prior to formal client quality audits.',
      'Verified physical adherence to RF planning azimuths and tilt specifications across 3-sector cell deployments.',
      'Ensured waterproof integrity and lightning arrestor grounding for all outdoor feeder and fiber routing runs.'
    ]
  }
];
