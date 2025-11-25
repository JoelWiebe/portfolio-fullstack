import React, { useState, useEffect } from 'react';
import { 
  Code, 
  BookOpen, 
  Cpu, 
  Brain, 
  Github, 
  Globe, 
  Linkedin, 
  Mail, 
  X, 
  ExternalLink, 
  Menu,
  Smartphone,
  Users,
  GraduationCap,
  Rocket,
  ArrowRight,
  Database,
  Server,
  ChevronRight
} from 'lucide-react';

// --- Latest Resume Data ---
const PROJECTS = [
  {
    id: 1,
    title: "AI Theme Analyser & HitL Tools",
    categories: ["AI & Analytics", "Research & Pedagogy"],
    role: "Lead Developer",
    summary: "Human-in-the-Loop tools for qualitative research using Vertex AI.",
    description: "Developed 'Human-in-the-Loop' (HitL) tools for qualitative research. Created a Thematic Analysis engine that performs coding, theme generation, magnitude coding, cross-case reporting, and automated theme map visualization. Published methodology in ICLS proceedings. Integrated Gemini/Vertex AI to enable educators to synthesize and manipulate text artifacts.",
    tags: ["Python", "Vertex AI", "LLMs", "HitL Workflows", "Qualitative Analysis"],
    links: [
      { label: "AI Theme Analyzer", url: "https://github.com/JoelWiebe/ai-theme-analyzer" }
    ]
  },
  {
    id: 2,
    title: "Personal Portfolio Infrastructure",
    categories: ["Full Stack Ed-Tech", "Cloud & DevOps"],
    role: "Architect",
    summary: "High-availability portfolio on OCI using Laravel and MySQL.",
    description: "Architected a personal portfolio using Laravel and MySQL hosted on Oracle Cloud Infrastructure (OCI). Demonstrates high-fidelity implementation of OWASP security controls, AODA-compliant accessible design, and performant CSS/JS animations, utilizing Eloquent ORM for robust data modeling.",
    tags: ["Laravel", "MySQL", "OCI", "Nginx", "AODA", "OWASP"]
  },
  {
    id: 3,
    title: "Crowd Tutor: Knowledge Worlds (In-Progress)",
    categories: ["Full Stack Ed-Tech", "AI & Analytics"],
    role: "Founding Director & Lead Developer",
    summary: "Scalable adaptive learning platform using Flutter and Generative AI.",
    description: "Founded a tech initiative for youth upskilling. Architecting a scalable adaptive learning platform using Flutter, Firebase, and Generative AI to gamify interest exploration and social learning. The system implements the MMMAAP instructional model (Multi-modal, Multi-agent, Adaptive, Affective, Personalized).",
    tags: ["Flutter", "Firebase", "Generative AI", "Bonfire 2D", "Mobile"],
    links: [
      { label: "crowdtutor.org", url: "https://crowdtutor.org" }
    ]
  },
  {
    id: 4,
    title: "CK Board & SCORE Platform",
    categories: ["Full Stack Ed-Tech", "Cloud & DevOps"],
    role: "Full Stack Developer & Researcher",
    summary: "Real-time orchestration on Azure PaaS with Node.js and WebSockets.",
    description: "Architected the CK Board and SCORE Authoring platforms on Azure PaaS. Utilized Angular, Node.js, and FabricJS for the frontend canvases. Implemented Redis and WebSockets to power 'RoomCast,' enabling real-time distribution and synchronization of artifacts across student devices in high-availability educational settings.",
    tags: ["Angular", "Node.js", "Azure PaaS", "Redis", "WebSockets", "FabricJS", "MongoDB"]
  },
  {
    id: 5,
    title: "ISLS Technical Infrastructure",
    categories: ["Cloud & DevOps", "Full Stack Ed-Tech"],
    role: "Technical Lead, Publications",
    summary: "Automation pipelines for proceedings and DSpace repositories.",
    description: "Global Technical Leadership for the International Society of the Learning Sciences. Engineered Python automation pipelines to process proceedings metadata, generate import packages for DSpace, and execute automated DOI registration via CrossRef. Developed a full-stack validation tool using Docker, Flask, and Jinja2 on Google Cloud.",
    tags: ["Python", "DSpace", "Docker", "Flask", "Google Cloud", "CrossRef"]
  },
  {
    id: 6,
    title: "WISE Project (Berkeley Collab)",
    categories: ["Full Stack Ed-Tech"],
    role: "Collaborator & Developer",
    summary: "Extended Java Spring/Angular codebase for international research.",
    description: "Forked and extended a complex Java Spring/Angular codebase to support international research. Deployed containerized environments using Docker and explored new applications of LLMs for knowledge integration guidance and assessment.",
    tags: ["Java Spring", "Angular", "Docker", "LLMs", "Research"]
  },
  {
    id: 7,
    title: "ECE Data Visualization",
    categories: ["AI & Analytics", "Consulting"],
    role: "Technical Data Consultant",
    summary: "Automated assessment reporting workflow for Govt. of Nova Scotia.",
    description: "Designed a Python-based data curation and visualization workflow for Mount Saint Vincent University and the Government of Nova Scotia. The system generates automated assessment reports for Early Childhood Education Centers, supporting government quality assurance teams.",
    tags: ["Python", "Data Visualization", "Consulting", "Automation"]
  },
  {
    id: 8,
    title: "Robot Control Interface",
    categories: ["HCI & Robotics"],
    role: "Robotics & Interface Developer",
    summary: "C#/WPF application for Microsoft Surface to control inspection robots.",
    description: "Designed a full-stack C#/WPF application for the Microsoft Surface tablet to control Inuktun inspection robot cameras and configurations. Implemented 3D animations to visualize robot body orientation and camera views in real-time. Also engineered a microcontroller system for a Nao humanoid robot.",
    tags: ["C#", "WPF", "Robotics", "Microsoft Surface", "3D Animation", "Nao"]
  },
  {
    id: 9,
    title: "College of Nursing Operations",
    categories: ["Ed-Tech Support"],
    role: "Project Manager & Dev",
    summary: "Managed SharePoint workflows and institutional PHP website.",
    description: "Co-administered the College’s institutional PHP website and managed complex internal workflows using SharePoint (room bookings, document management). Sustained the technical use of ExamSoft and facilitated the adoption of electronic grading for OSCEs.",
    tags: ["PHP", "SharePoint", "ExamSoft", "LMS", "Operations"]
  },
  {
    id: 10,
    title: "Geomax Enterprise Mobile",
    categories: ["Full Stack Ed-Tech", "Legacy Systems"],
    role: "Wireless Application Developer",
    summary: "Java Server Pages (JSP) application with Hibernate ORM.",
    description: "Designed and deployed a Java Server Pages (JSP) application utilizing Servlets, JavaBeans, and Hibernate ORM for efficient MySQL data management. Implemented interactive front-ends using JavaScript and jQuery that integrated with server-side logic for push notifications.",
    tags: ["Java", "JSP", "Hibernate ORM", "MySQL", "jQuery", "Enterprise"]
  }
];

const CATEGORIES = ["All", "Full Stack Ed-Tech", "AI & Analytics", "Cloud & DevOps", "HCI & Robotics", "Research & Pedagogy"];

// --- Components ---

const Badge = ({ children, className = "" }) => (
  <span className={`px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
    {children}
  </span>
);

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
        
        <div className="p-8">
          <div className="mb-6">
            <div className="flex gap-2 mb-2 flex-wrap">
              {project.categories.map(cat => (
                 <span key={cat} className="text-indigo-600 font-semibold tracking-wider text-sm uppercase block">
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{project.title}</h2>
            <p className="text-lg text-slate-600 font-medium">{project.role}</p>
          </div>

          <div className="prose prose-slate max-w-none mb-8 text-slate-700 leading-relaxed">
            <p>{project.description}</p>
          </div>
          
          {/* Links Section */}
          {project.links && project.links.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Key Repositories & Links</h3>
              <div className="flex flex-col gap-2">
                {project.links.map(link => (
                  <a 
                    key={link.url} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    {link.url.includes("github") ? <Github className="w-4 h-4" /> : <Globe className="w-4 h-4" />} 
                    {link.label} 
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Technologies & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Badge key={tag} className="bg-indigo-50 text-indigo-700 border-indigo-100">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  const mainCat = project.categories[0];
  return (
    <div 
      onClick={() => onClick(project)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
            {mainCat.includes("Robotics") ? <Cpu className="w-6 h-6 text-indigo-600" /> :
             mainCat.includes("AI") ? <Brain className="w-6 h-6 text-indigo-600" /> :
             mainCat.includes("Research") ? <BookOpen className="w-6 h-6 text-indigo-600" /> :
             mainCat.includes("Public") ? <Users className="w-6 h-6 text-indigo-600" /> :
             mainCat.includes("Mobile") ? <Smartphone className="w-6 h-6 text-indigo-600" /> :
             mainCat.includes("Cloud") ? <Server className="w-6 h-6 text-indigo-600" /> :
             <Code className="w-6 h-6 text-indigo-600" />}
          </div>
          <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-indigo-600 font-medium mb-3">{project.role}</p>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
          {project.summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs text-slate-400 px-1 py-1">+ {project.tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ href, children }) => (
  <a 
    href={href}
    className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
  >
    {children}
  </a>
);

const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  // Initialize with Data (No API Call needed for Single-File Version)
  const [projects, setProjects] = useState(PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Optional: If you still want to TRY fetching API but fallback gracefully
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setProjects(data);
        }
      } catch (error) {
        // API not found, using static PROJECTS list
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.categories.includes(activeFilter));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">J</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Joel P. Wiebe</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#portfolio">Portfolio</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            
            <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Visit JoelWiebe.ca <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-lg">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold">Visit JoelWiebe.ca</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-100/50 skew-x-12 transform translate-x-1/2 -z-10"></div>
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-start max-w-3xl animate-slideUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Full Stack Developer | Technical Lead | AI Specialist
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
              Bridging <span className="text-indigo-600">Learning Sciences</span> and <span className="text-indigo-600">Software Engineering</span>.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              With 8+ years of experience, I architect high-availability educational technologies and AI-augmented workflows. From complex backend systems to Azure PaaS, my work is technically rigorous and pedagogically grounded.
            </p>
            
            {/* Primary Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#portfolio" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2">
                View Selected Works <ChevronRight className="w-4 h-4" />
              </a>
              
              <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                Visit Full Academic Profile <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Skills Strip */}
      <div className="border-y border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Full Stack", sub: "Laravel, Node, Angular" },
              { label: "Cloud & DevOps", sub: "OCI, Azure, Docker" },
              { label: "AI & Automation", sub: "Vertex AI, Python, Node.js" },
              { label: "Enterprise", sub: "SharePoint, DSpace" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-bold text-lg text-slate-900">{stat.label}</span>
                <span className="text-sm text-slate-500">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A curated selection of projects spanning 8 years of software engineering, educational research, and robotics integration.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === cat 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* About / Context Section */}
      <section id="about" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Bio Column */}
            <div className="md:col-span-2 bg-indigo-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-6">Technical Leadership</h2>
              <p className="text-indigo-100 leading-relaxed mb-6">
                I possess a unique dual background: <strong>Computer Science (B.Sc.)</strong> and <strong>Learning Sciences (PhD Candidate)</strong>. This allows me to build software that is not only technically robust but also pedagogically effective.
              </p>
              <p className="text-indigo-100 leading-relaxed mb-8">
                My experience spans the entire stack: from complex backend systems and Robotics control interfaces to modern Cloud Architectures and AI Automation. I have a proven track record of adhering to AODA and OWASP standards within university contexts.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-indigo-700/50">
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold">
                     <Rocket className="w-5 h-5" /> Systems Architecture
                   </div>
                   <p className="text-sm text-indigo-200">Designing scalable, high-availability systems on OCI and Azure.</p>
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold">
                     <Users className="w-5 h-5" /> Team Leadership
                   </div>
                   <p className="text-sm text-indigo-200">Leading technical strategy and automating workflows for global organizations.</p>
                 </div>
              </div>
            </div>

            {/* Education Column */}
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Education</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="font-bold text-slate-900">Ph.D. Candidate</p>
                    <p className="text-sm text-indigo-600 font-medium">OISE, University of Toronto</p>
                    <p className="text-xs text-slate-500 mt-1">Curriculum & Pedagogy (Expected 2027)</p>
                  </div>
                  
                  <div className="w-full h-px bg-slate-200"></div>

                  <div>
                    <p className="font-bold text-slate-900">Master of Arts</p>
                    <p className="text-sm text-indigo-600 font-medium">OISE, University of Toronto</p>
                    <p className="text-xs text-slate-500 mt-1">Curriculum & Pedagogy (2019)</p>
                  </div>

                  <div className="w-full h-px bg-slate-200"></div>

                  <div>
                    <p className="font-bold text-slate-900">Honours B.Sc., Computer Science</p>
                    <p className="text-sm text-indigo-600 font-medium">University of Toronto</p>
                    <p className="text-xs text-slate-500 mt-1">AI, Software Engineering, Web-based Systems (2015)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Get In Touch</h2>
          <div className="flex justify-center gap-6 mb-12">
            <a href="mailto:me@joelwiebe.ca" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all border border-slate-200 text-slate-700 font-medium">
              <Mail className="w-5 h-5" /> me@joelwiebe.ca
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
               <Database className="w-4 h-4 text-indigo-500" />
               <span>Built with <strong>Laravel 10</strong> & <strong>React 18</strong></span>
            </div>
            <p>© {new Date().getFullYear()} Joel P. Wiebe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
