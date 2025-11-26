import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Code, 
  BookOpen, 
  Cpu, 
  Brain, 
  Github, 
  Globe, 
  Mail, 
  X, 
  ExternalLink, 
  Menu,
  Smartphone,
  Users,
  GraduationCap,
  Rocket,
  ChevronRight,
  Play,
  FileText,
  Search,
  Server,
  Database
} from 'lucide-react';

// --- Latest Resume Data ---
const PROJECTS = [
  {
    id: 1,
    title: "AI Theme Analyser",
    categories: ["AI & Analytics", "Research & Pedagogy"],
    role: "Lead Developer",
    summary: "Human-in-the-Loop tools for qualitative research using Vertex AI.",
    description: "Developed 'Human-in-the-Loop' (HitL) tools for qualitative research. Created a Thematic Analysis engine that performs coding, theme generation, magnitude coding, cross-case reporting, and automated theme map visualization. \n\nMethodology published in: Wiebe, J. P., Khan, R., Burns, S., & Slotta, J. D. (2025). Qualitative Research in the Age of LLMs: A Human-in-the-Loop Approach to Hybrid Thematic Analysis. ICLS 2025.",
    tags: ["Python", "Vertex AI", "LLMs", "HitL Workflows", "Qualitative Analysis"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/encorelab/ai-theme-analyser" },
      { label: "ICLS 2025 Publication", url: "https://doi.org/10.22318/icls2025.322165" }
    ]
  },
  {
    id: 11,
    title: "AI Emotion Analyzer",
    categories: ["AI & Analytics", "Research & Pedagogy"],
    role: "Developer",
    summary: "Scalable emotion identification tool for qualitative datasets.",
    description: "Built a specialized tool for extracting and classifying emotional markers within large textual datasets. This Human-in-the-Loop system allows researchers to validate AI-generated emotion codes.\n\nResearch Context: Yu, E., Burns, S., Wiebe J.P., Perlman, J., Chen I., Kahlon, K., Perlman, M. (Under Review). Parent Voices on the benefits and challenges of Canada’s new child care policy: An emotion analysis using a large language model.",
    tags: ["Python", "NLP", "Emotion Analysis", "Research Tool"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/JoelWiebe/AI-Emotion-Analyzer" }
    ]
  },
  {
    id: 12,
    title: "AI Data Extractor",
    categories: ["AI & Analytics", "Research & Pedagogy"],
    role: "Developer",
    summary: "Automated data extraction for scoping reviews.",
    description: "Developed a Python-based tool to automate the extraction of specific data points from full-text research papers. This tool supports scoping reviews by parsing PDFs and structuring unstructured academic text into analyzable formats.\n\nPublished Protocol: Yu, E., Burns, S., Wiebe, J. P., Schmeichel, A., & Perlman, M. (2025). Application of artificial intelligence in early childhood development: a scoping review protocol. BMJ Open.",
    tags: ["Python", "PDF Parsing", "Data Extraction", "Automation"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/JoelWiebe/AI-Data-Extractor" },
      { label: "BMJ Open Publication", url: "https://doi.org/10.1136/bmjopen-2025-106044" }
    ]
  },
  {
    id: 2,
    title: "Personal Portfolio Infrastructure (In-Progress)",
    categories: ["Full Stack Ed-Tech", "Cloud & DevOps"],
    role: "Architect",
    summary: "High-availability portfolio on OCI using Laravel and MySQL.",
    description: "Architected a personal portfolio using Laravel and MySQL hosted on Oracle Cloud Infrastructure (OCI). Demonstrates high-fidelity implementation of OWASP security controls, AODA-compliant accessible design, and performant CSS/JS animations, utilizing Eloquent ORM for robust data modeling.",
    tags: ["Laravel", "MySQL", "OCI", "Nginx", "AODA", "OWASP"]
  },
  {
    id: 3,
    title: "Crowd Tutor: Knowledge Worlds",
    categories: ["Full Stack Ed-Tech", "AI & Analytics", "Research & Pedagogy"],
    role: "Founding Director & Lead Developer",
    summary: "Scalable adaptive learning platform using Flutter and Generative AI.",
    description: "Founded a tech initiative for youth upskilling. Architecting a scalable adaptive learning platform using Flutter, Firebase, and Generative AI to gamify interest exploration and social learning. The system implements the MMMAAP instructional model (Multi-sensory, Motivational, Meaningful, Active, Applied, and Peer Learning).",
    tags: ["Flutter", "Firebase", "Generative AI", "Bonfire 2D", "Mobile"],
    links: [
      { label: "crowdtutor.org", url: "https://crowdtutor.org" }
    ]
  },
  {
    id: 4,
    title: "CK Board & SCORE Platform",
    categories: ["Full Stack Ed-Tech", "Cloud & DevOps", "Research & Pedagogy"],
    role: "Full Stack Developer & Researcher",
    summary: "Real-time orchestration on Azure PaaS with Node.js and WebSockets.",
    description: "Architected the CK Board and SCORE Authoring platforms on Azure PaaS. Utilized Angular, Node.js, and FabricJS for the frontend canvases. Implemented Redis and WebSockets to power 'RoomCast,' enabling real-time distribution and synchronization of artifacts across student devices in high-availability educational settings.",
    tags: ["Angular", "Node.js", "Azure PaaS", "Redis", "WebSockets", "FabricJS", "MongoDB"],
    links: [
      { label: "Watch Demo Video", url: "https://www.youtube.com/watch?v=t4aLSKlEc90" }
    ]
  },
  {
    id: 13,
    title: "TMU Rehearsals Platform",
    categories: ["Full Stack Ed-Tech", "Research & Pedagogy"],
    role: "Technical Consultant & Developer",
    summary: "Custom research platform for Toronto Metropolitan University.",
    description: "Consulted with faculty to identify platform needs for a specific research grant. Forked UC Berkeley's WISE project and rebranded it as 'Rehearsals'. Enabled experimental AI features and designed a custom data collection activity deployed to over 200 students, ensuring the platform met strict research objectives.",
    tags: ["Java Spring", "Angular", "Research Design", "AI Integration", "Consulting"]
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
    id: 14,
    title: "Darwin Robot (Autonomous Agents)",
    categories: ["HCI & Robotics"],
    role: "Robotics Developer",
    summary: "C++ Development for Darwin humanoid robot in FIRA HuroCup.",
    description: "Member of the Autonomous Agents Lab at the University of Manitoba. Developed C++ control software for the Darwin humanoid robot to compete in the FIRA HuroCup Marathon. Focused on computer vision integration and gait stability for autonomous navigation.",
    tags: ["C++", "Robotics", "Computer Vision", "Autonomous Agents", "Darwin-OP"]
  },
  {
    id: 15,
    title: "Nao Robot Telepresence",
    categories: ["HCI & Robotics", "Research & Pedagogy"],
    role: "HCI Researcher",
    summary: "Telepresence interface development leading to IEEE publication.",
    description: "Engineered a microcontroller system for a boom camera on a Nao humanoid robot. Conducted HCI research on telepresence interfaces, which led to a publication in the IEEE International Symposium on Robot and Human Interactive Communication (RO-MAN).",
    tags: ["Robotics", "HCI", "Nao", "Research", "IEEE"],
    links: [
      { label: "IEEE Publication", url: "https://ieeexplore.ieee.org/document/8172419" }
    ]
  },
  {
    id: 16,
    title: "Remote Nurse Training Robotics",
    categories: ["HCI & Robotics", "Research & Pedagogy", "Ed-Tech Support"],
    role: "Educational Technology Researcher",
    summary: "Supporting remote presence robotics for Northern Saskatchewan nursing education.",
    description: "Supported faculty at the University of Saskatchewan in using remote presence robotics to deliver nurse training to remote northern regions. Performed observations and engaged in dialogue with faculty to optimize the use of robotics for productive pedagogical dialogue and lab training.",
    tags: ["Telepresence", "Robotics", "Nursing Education", "Qualitative Observation", "Remote Learning"]
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
    description: "Designed a full-stack C#/WPF application for the Microsoft Surface tablet to control Inuktun inspection robot cameras and configurations. Implemented 3D animations to visualize robot body orientation and camera views in real-time.",
    tags: ["C#", "WPF", "Robotics", "Microsoft Surface", "3D Animation"]
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
  <span className={`px-3 py-1 text-sm font-medium rounded-full bg-slate-100 text-[#002A5C] border border-slate-200 ${className}`}>
    {children}
  </span>
);

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 transition-opacity animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10 bg-white"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
        
        <div className="p-8">
          <div className="mb-6">
            <div className="flex gap-2 mb-2 flex-wrap">
              {project.categories.map(cat => (
                 <span key={cat} className="text-[#002A5C] font-semibold tracking-wider text-sm uppercase block">
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{project.title}</h2>
            <p className="text-xl text-slate-700 font-medium">{project.role}</p>
          </div>

          <div className="prose prose-slate max-w-none mb-8 text-slate-700 text-base leading-relaxed whitespace-pre-line">
            <p>{project.description}</p>
          </div>
          
          {project.links && project.links.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide mb-3">Key Repositories & Links</h3>
              <div className="flex flex-col gap-2">
                {project.links.map(link => (
                  <a 
                    key={link.url} 
                    href={link.url} 
                    className="flex items-center gap-2 text-[#002A5C] hover:text-[#00204E] font-medium transition-colors text-base"
                  >
                    {link.url.includes("youtube") ? <Play className="w-4 h-4" /> :
                     link.url.includes("doi.org") || link.url.includes("ieeexplore") ? <FileText className="w-4 h-4" /> : 
                     link.url.includes("github") ? <Github className="w-4 h-4" /> : 
                     <Globe className="w-4 h-4" />} 
                    {link.label} 
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide mb-4">Technologies & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Badge key={tag} className="bg-slate-100 text-[#002A5C] border-slate-200">
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
      className="group bg-white rounded-xl border border-slate-200 hover:border-[#002A5C]/50 hover:shadow-lg hover:shadow-[#002A5C]/10 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
            {mainCat.includes("Robotics") ? <Cpu className="w-6 h-6 text-[#002A5C]" /> :
             mainCat.includes("AI") ? <Brain className="w-6 h-6 text-[#002A5C]" /> :
             mainCat.includes("Research") ? <BookOpen className="w-6 h-6 text-[#002A5C]" /> :
             mainCat.includes("Public") ? <Users className="w-6 h-6 text-[#002A5C]" /> :
             mainCat.includes("Mobile") ? <Smartphone className="w-6 h-6 text-[#002A5C]" /> :
             mainCat.includes("Cloud") ? <Server className="w-6 h-6 text-[#002A5C]" /> :
             <Code className="w-6 h-6 text-[#002A5C]" />}
          </div>
          <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-[#002A5C] transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#002A5C] transition-colors">
          {project.title}
        </h3>
        <p className="text-base text-[#002A5C] font-medium mb-3">{project.role}</p>
        
        <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow line-clamp-3">
          {project.summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-sm text-slate-500 px-1 py-1">+ {project.tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ href, children }) => (
  <a 
    href={href}
    className="text-base font-medium text-slate-700 transition-colors hover:text-[#002A5C]"
  >
    {children}
  </a>
);

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState(PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hook to detect if user prefers reduced motion (OS Level)
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // API logic (future proofing)
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeFilter === "All" || p.categories.includes(activeFilter);
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.summary.toLowerCase().includes(searchLower) ||
      p.tags.some(t => t.toLowerCase().includes(searchLower));
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#002A5C] selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#002A5C] rounded-lg flex items-center justify-center text-white font-bold">J</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Joel P. Wiebe</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#portfolio">Portfolio</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            
            <a href="https://joelwiebe.ca" className="flex items-center gap-1 text-base font-semibold text-[#002A5C] hover:text-[#00204E] transition-colors">
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
            <a href="https://joelwiebe.ca" className="text-[#002A5C] font-bold">Visit JoelWiebe.ca</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#002A5C]/5 skew-x-12 transform translate-x-1/2 -z-10"></div>
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-start max-w-3xl animate-slideUp">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#002A5C] text-base font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#002A5C] animate-pulse"></span>
              Full Stack Developer | Technical Lead | AI Specialist
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
              Bridging <span className="text-[#002A5C]">Learning Sciences</span> and <span className="text-[#002A5C]">Software Engineering</span>.
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed mb-10 max-w-2xl">
              With 8+ years of experience, I architect high-availability educational technologies and AI-augmented workflows. From complex backend systems to Azure PaaS, my work is technically rigorous and pedagogically grounded.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#portfolio" className="px-8 py-4 bg-[#002A5C] text-white rounded-xl font-semibold hover:bg-[#00204E] hover:scale-105 transition-all shadow-lg shadow-[#002A5C]/30 flex items-center gap-2">
                View Selected Works <ChevronRight className="w-4 h-4" />
              </a>
              
              <a href="https://joelwiebe.ca" className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-[#002A5C] hover:text-[#002A5C] transition-all shadow-sm hover:shadow-md flex items-center gap-2">
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
                <span className="text-base text-slate-600">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
            <p className="text-slate-700 text-lg max-w-2xl mx-auto">
              A curated selection of projects spanning 8 years of software engineering, educational research, and robotics integration.
            </p>
          </div>

          {/* Search Option */}
          <div className="max-w-xl mx-auto mb-8 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search projects by technology, title, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#002A5C] focus:ring-2 focus:ring-[#002A5C]/20 outline-none transition-all text-base shadow-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-all ${
                  activeFilter === cat 
                    ? 'bg-[#002A5C] text-white shadow-md' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Animated Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <motion.div
                    key={project.id}
                    layout 
                    // ANIMATION CONFIGURATION:
                    // Removed 'scale' property to reduce vestibular triggers (jolting/nausea).
                    // Slowed duration to 0.5s for a calmer effect.
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : 0.5, // 0 if user OS prefers reduced motion
                      ease: "easeInOut" 
                    }}
                  >
                    <ProjectCard 
                      project={project} 
                      onClick={setSelectedProject} 
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full text-center py-12 text-slate-500"
                >
                  No projects found matching your search.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* About / Context Section */}
      <section id="about" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 bg-[#002A5C] text-white rounded-3xl p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-6">Technical Leadership</h2>
              <p className="text-slate-100 leading-relaxed mb-6 text-lg">
                I possess a unique dual background: <strong>Computer Science (B.Sc.)</strong> and <strong>Learning Sciences (PhD Candidate)</strong>. This allows me to build software that is not only technically robust but also pedagogically effective.
              </p>
              <p className="text-slate-100 leading-relaxed mb-8 text-lg">
                My experience spans the entire stack: from complex backend systems and Robotics control interfaces to modern Cloud Architectures and AI Automation. I have a proven track record of adhering to AODA and OWASP standards within university contexts.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-[#00204E]/50">
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold text-lg">
                     <Rocket className="w-5 h-5" /> Systems Architecture
                   </div>
                   <p className="text-base text-slate-200">Designing scalable, high-availability systems on OCI and Azure.</p>
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold text-lg">
                     <Users className="w-5 h-5" /> Team Leadership
                   </div>
                   <p className="text-base text-slate-200">Leading technical strategy and automating workflows for global organizations.</p>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-200 rounded-lg text-[#002A5C]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Education</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="font-bold text-slate-900 text-lg">Ph.D. Candidate</p>
                    <p className="text-base text-[#002A5C] font-medium">OISE, University of Toronto</p>
                    <p className="text-sm text-slate-600 mt-1">Curriculum & Pedagogy (Expected 2027)</p>
                  </div>
                  
                  <div className="w-full h-px bg-slate-200"></div>

                  <div>
                    <p className="font-bold text-slate-900 text-lg">Master of Arts</p>
                    <p className="text-base text-[#002A5C] font-medium">OISE, University of Toronto</p>
                    <p className="text-sm text-slate-600 mt-1">Curriculum & Pedagogy (2019)</p>
                  </div>

                  <div className="w-full h-px bg-slate-200"></div>

                  <div>
                    <p className="font-bold text-slate-900 text-lg">Honours B.Sc., Computer Science</p>
                    <p className="text-base text-[#002A5C] font-medium">University of Toronto</p>
                    <p className="text-sm text-slate-600 mt-1">AI, Software Engineering, Web-based Systems (2015)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Site Map */}
      <footer id="contact" className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Get In Touch</h2>
          <div className="flex justify-center gap-6 mb-12">
            <a href="mailto:me@joelwiebe.ca" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md hover:text-[#002A5C] transition-all border border-slate-200 text-slate-700 font-medium text-lg">
              <Mail className="w-5 h-5" /> me@joelwiebe.ca
            </a>
          </div>

          <div className="mb-12 border-t border-slate-200 pt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Site Map</h3>
            <ul className="flex flex-wrap justify-center gap-6 text-slate-600">
              <li><a href="#about" className="hover:text-[#002A5C] underline">About & Education</a></li>
              <li><a href="#portfolio" className="hover:text-[#002A5C] underline">Project Portfolio</a></li>
              <li><a href="#contact" className="hover:text-[#002A5C] underline">Contact Information</a></li>
              <li><a href="https://joelwiebe.ca" className="hover:text-[#002A5C] underline">Academic Profile (External)</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-2 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
               <Database className="w-4 h-4 text-[#002A5C]" />
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

export default Portfolio;