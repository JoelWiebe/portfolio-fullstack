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
  ArrowRight
} from 'lucide-react';

// --- Fallback Data ---
// Used if the Laravel API is unreachable or during initial static deployment.

const FALLBACK_PROJECTS = [
  {
    id: 14,
    title: "Crowd Tutor: First Light",
    categories: ["Full Stack Ed-Tech", "AI & Analytics"],
    role: "Founder & Lead Developer",
    summary: "Gamified 2D learning environment built with Flutter, Bonfire, and Firebase.",
    description: "Serving as Executive Director and Lead Developer for the Crowd Tutor Foundation. I am building 'First Light', a 2D RPG learning environment. The frontend is built with Flutter and the Bonfire engine for performant 2D rendering. The backend utilizes a serverless architecture with Node.js, Google Cloud Functions, and Firestore to manage real-time student progress and game state.",
    tags: ["Flutter", "Bonfire 2D", "Firebase", "Cloud Functions", "Node.js", "Game Dev"]
  },
  {
    id: 5,
    title: "Adaptive AI & The MMMAAP Model",
    categories: ["AI & Analytics", "Research & Pedagogy"],
    role: "Founder & Lead Developer",
    summary: "Pedagogical AI platform implementing the MMMAAP instructional framework.",
    description: "Developed for the Crowd Tutor Foundation, this project implements the MMMAAP model (Multi-modal, Multi-agent, Adaptive, Affective, Personalized) to support individuals in identifying values and developing value-aligned expertise. The system uses AI to generate content and adapt pathways based on learner affect and choice, distinct from my qualitative research tools.",
    tags: ["Startup", "Adaptive Learning", "AI", "Pedagogy", "MMMAAP Framework"]
  },
  {
    id: 1,
    title: "SCORE & CK Board",
    categories: ["Full Stack Ed-Tech"],
    role: "Full Stack Developer (Encore Lab)",
    summary: "Real-time orchestration environment using Angular, Node.js, Redis & WebSockets.",
    description: "Collaborated with the Encore Lab at OISE to support the full stack development of CK Board and SCORE (Open Source). The platform uses a scalable architecture featuring an Angular frontend and a Node.js backend. We implemented Redis for high-speed state management and WebSockets for real-time collaboration across the 'CK Monitor' (teacher dashboard) and 'CK Canvas' (student workspace). Data persistence is handled via MongoDB to support large-scale classroom analytics.",
    tags: ["Angular", "Node.js", "Redis", "WebSockets", "MongoDB", "Real-time", "Open Source"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/encorelab/ck-board" }
    ]
  },
  {
    id: 3,
    title: "Scalable Qualitative Research with LLMs",
    categories: ["AI & Analytics", "Research & Pedagogy"],
    role: "AI Tool Developer",
    summary: "Open source Human-in-the-loop tools for extraction, emotion analysis, and thematic coding.",
    description: "Leveraged Large Language Models (LLMs) to build open-source tools for scalable qualitative research. This suite includes a 'Human-in-the-loop' system for emotion analysis, large-scale thematic analysis workflows, and full-text data extraction for scoping reviews. These tools allow researchers to process vast datasets with the nuance of human coding but the speed of AI.",
    tags: ["LLMs", "Python", "AI", "Qualitative Research", "Data Extraction", "Open Source"],
    links: [
      { label: "AI Data Extractor", url: "https://github.com/JoelWiebe/AI-Data-Extractor" },
      { label: "AI Emotion Analyzer", url: "https://github.com/JoelWiebe/AI-Emotion-Analyzer" },
      { label: "AI Theme Analyzer", url: "https://github.com/JoelWiebe/ai-theme-analyzer" }
    ]
  },
  {
    id: 13,
    title: "AI Document Structure Converter",
    categories: ["AI & Analytics"],
    role: "Developer",
    summary: "Python tool leveraging AI to convert PDFs into structured DOCX files.",
    description: "Developed 'ai-pdf2docx', a specialized Python tool designed to convert PDF documents into editable DOCX formats while preserving complex layouts and structure better than traditional tools. This project leverages AI models to interpret visual document elements, making it particularly useful for researchers extracting data from complex academic papers.",
    tags: ["Python", "AI", "Document Processing", "Automation", "Open Source"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/JoelWiebe/ai-pdf2docx" }
    ]
  },
  {
    id: 4,
    title: "WISE Project (Berkeley Collab)",
    categories: ["Full Stack Ed-Tech", "Research & Pedagogy"],
    role: "Collaborator & Developer",
    summary: "Forked and enhanced the WISE learning environment for international research.",
    description: "Collaborated for several years with developers of the Web-based Inquiry Science Environment (WISE) project at UC Berkeley. Forked the codebase (Java/Spring, Angular) to introduce custom features for research studies in China, Europe, and Canada. Work included using LLMs for limited Knowledge Integration (KI) assessment and deploying containerized environments using Docker.",
    tags: ["Open Source", "Java/Spring", "Angular", "Docker", "International Collaboration"]
  },
  {
    id: 7,
    title: "ICAP Analytics & Co-design",
    categories: ["Research & Pedagogy", "AI & Analytics"],
    role: "Researcher & Co-designer",
    summary: "Learning analytics and orchestration tools for Math classrooms.",
    description: "Led a multi-year co-design project with a Grade 6 math teacher to integrate Social Emotional Learning (SEL) and ICAP (Interactive, Constructive, Active, Passive) reflections. Developed custom scripting and orchestration software that visualized student self-reports, graphed scored results, and supported goal setting. The system adaptively assigned script roles based on real-time analytics.",
    tags: ["Learning Analytics", "Co-design", "Mathematics Ed", "ICAP Framework", "Visualization"]
  },
  {
    id: 9,
    title: "Knowledge Building in China",
    categories: ["Research & Pedagogy", "AI & Analytics"],
    role: "Coordinator & Researcher",
    summary: "Coordinated Knowledge Forum server installations and analytics-supported inquiry.",
    description: "Brought Knowledge Building pedagogy to classrooms in China by coordinating Knowledge Forum (KF) server installations. Conducted research using learning analytics to support knowledge building discourse. During the pandemic, designed interactive activities for hundreds of students focusing on shared problem-solving hints.",
    tags: ["Knowledge Forum", "Analytics", "Remote Learning", "Pedagogy"]
  },
  {
    id: 15,
    title: "Anytime, Anywhere Knowledge Building",
    categories: ["Research & Pedagogy"],
    role: "MA Researcher",
    summary: "Master's thesis on extending student inquiry beyond the classroom.",
    description: "Conducted MA research focusing on the concept of 'anytime, anywhere' knowledge building. Designed interventions to extend student inquiry with technology beyond synchronous dialogue, across extended periods of time, and between asynchronous and synchronous forms. This work laid the theoretical groundwork for later technical orchestration systems.",
    tags: ["Knowledge Building", "MA Thesis", "Asynchronous Learning", "Design Research"]
  },
  {
    id: 2,
    title: "ISLS Proceedings Repository",
    categories: ["Full Stack Ed-Tech"],
    role: "Technical Manager & Developer",
    summary: "Serverless academic workflow tools deployed on Google Cloud Run.",
    description: "Managed the online Repository for the International Society of the Learning Sciences (ISLS). Engineered a suite of support tools including automated DSpace import generation and DOI metadata registration. Created a full-stack application deployed on Google Cloud Run (serverless containers) to validate complex academic paper formatting, significantly expediting the creation of proceedings front/back matter.",
    tags: ["Google Cloud Run", "Python", "Serverless", "Docker", "Automation", "Metadata"]
  },
  {
    id: 12,
    title: "Truth: The News Annotator",
    categories: ["Full Stack Ed-Tech"],
    role: "Lead Designer & Prototyper",
    summary: "Mobile app prototype for crowdsourced news vetting.",
    description: "Designed and prototyped a mobile application to combat fake news through collective annotation. The tool provides a framework for students and news enthusiasts to crowdsource dissections of articles based on fact-checking, source reliability, and author bias. This project focused on UI/UX design for 'just-in-time' media literacy instruction.",
    tags: ["Mobile Dev", "UI/UX", "Prototyping", "Media Literacy"]
  },
  {
    id: 11,
    title: "Future Cities, Future Us",
    categories: ["Public & Community"],
    role: "Technical Partner",
    summary: "Digital/Physical display collaboration with Evergreen Brickworks and 1UP youth.",
    description: "Partnered with Evergreen Brickworks, Urban Minds, and 1UP Toronto to build a youth-led interactive experience. Facilitated the creation of a digital and physical display for the Future Cities Canada Summit. The project involved capturing youth ideas for sustainable urban futures and visualizing them to engage professionals and community visitors.",
    tags: ["Community Engagement", "Digital Display", "Visualization", "Partnership"]
  },
  {
    id: 6,
    title: "Remote Nursing Education & Robotics",
    categories: ["Ed-Tech Support"],
    role: "E-Learning Specialist & Admin",
    summary: "Supported telepresence robotics and digital OSCE examinations.",
    description: "Hired by the University of Saskatchewan to transform nursing education. Implemented telepresence robotics for teaching nurses in remote areas and digitized OSCE examinations. Managed electronic exams via ExamSoft, developed a custom bookings tool using Nintex in SharePoint, and served as administrator for SharePoint, Blackboard, and the College of Nursing website.",
    tags: ["SharePoint", "Telepresence", "LMS Admin", "Nintex", "Robotics"]
  },
  {
    id: 8,
    title: "Surface & Robotics Integration",
    categories: ["HCI & Robotics"],
    role: "HCI Developer",
    summary: "WPF desktop and Surface app development for controlling industrial inspection robots.",
    description: "Performed integration of a Windows Presentation Foundation (WPF) desktop app (C#) and a C++ touch application for the Microsoft Surface table. Developed a 3D orientation representation interface for controlling Inuktun's SP90 inspection robot, facilitating use by energy companies.",
    tags: ["C#", "C++", "WPF", "HCI", "Industrial Robotics"]
  },
  {
    id: 10,
    title: "Autonomous Agents & Telepresence",
    categories: ["HCI & Robotics"],
    role: "Robotics Researcher",
    summary: "Contributed to Nao and Darwin robot development for international competition.",
    description: "Member of the HCI Lab at the University of Manitoba contributing to a telepresence robotics research paper using the Nao robot. Also developed code for a Darwin robot for the Autonomous Agents Lab, competing in an international Marathon competition.",
    tags: ["Robotics", "Nao", "Autonomous Agents", "HCI"]
  }
];

const CATEGORIES = ["All", "Full Stack Ed-Tech", "AI & Analytics", "Research & Pedagogy", "HCI & Robotics", "Public & Community"];

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
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Key Repositories</h3>
              <div className="flex flex-col gap-2">
                {project.links.map(link => (
                  <a 
                    key={link.url} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" /> {link.label} <ExternalLink className="w-3 h-3" />
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

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Backend Connection Effect (Graceful Fallback)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (error) {
        // Silent fail to fallback data - Website still works!
        console.log('API unavailable, using static data.');
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
            <span className="font-bold text-xl tracking-tight text-slate-900">Joel Wiebe</span>
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
              Product-Minded Technical Lead
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
              Technical <span className="text-indigo-600">Product Leadership</span> with <span className="text-indigo-600">Full Stack</span> Execution.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              I combine the strategic vision of a Product Manager with the execution speed of an AI-augmented Full Stack Developer. I engineer scalable ed-tech systems, lead technical teams, and automate complex research workflows.
            </p>
            
            {/* Primary Actions */}
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="#portfolio" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-500/30">
                View Selected Works
              </a>
            </div>

            {/* Text Link to Full Site */}
            <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition-all group">
              Looking for publications? Visit full academic archive at JoelWiebe.ca <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats/Skills Strip */}
      <div className="border-y border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Full Stack", sub: "Angular, Node, React" },
              { label: "Cloud & Dev", sub: "Cloud Run, Redis" },
              { label: "AI Integration", sub: "LLM Pairing, Python" },
              { label: "Product Lead", sub: "Strategy, Co-design" }
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
              From founding non-profits to engineering university research platforms.
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
              <h2 className="text-3xl font-bold text-white mb-6">The Product-Minded Lead</h2>
              <p className="text-indigo-100 leading-relaxed mb-6">
                I approach development differently. By leveraging LLMs as pair-programming partners, I operate with the velocity of a full team. This allows me to function as a <strong>Product-Minded Technical Lead</strong> who is not afraid to get deep into the code.
              </p>
              <p className="text-indigo-100 leading-relaxed mb-8">
                Whether I am acting as the Executive Director for Crowd Tutor or developing orchestrations for OISE, my focus is on <strong>delivery</strong>—bridging the gap between stakeholder needs and deployed, scalable software.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-indigo-700/50">
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold">
                     <Rocket className="w-5 h-5" /> High Velocity
                   </div>
                   <p className="text-sm text-indigo-200">Accelerating delivery through AI-augmented workflows.</p>
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold">
                     <Users className="w-5 h-5" /> Product & People
                   </div>
                   <p className="text-sm text-indigo-200">Leading teams and coordinating stakeholders with technical clarity.</p>
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
                    <p className="font-bold text-slate-900">PhD (Candidate)</p>
                    <p className="text-sm text-indigo-600 font-medium">OISE, University of Toronto</p>
                    <p className="text-xs text-slate-500 mt-1">Curriculum Studies & Teacher Development (Knowledge Media Design)</p>
                  </div>
                  
                  <div className="w-full h-px bg-slate-200"></div>

                  <div>
                    <p className="font-bold text-slate-900">Master of Arts</p>
                    <p className="text-sm text-indigo-600 font-medium">OISE, University of Toronto</p>
                    <p className="text-xs text-slate-500 mt-1">Knowledge Media Design</p>
                  </div>

                  <div className="w-full h-px bg-slate-200"></div>

                  <div>
                    <p className="font-bold text-slate-900">BSc Computer Science</p>
                    <p className="text-sm text-indigo-600 font-medium">University of Manitoba</p>
                    <p className="text-xs text-slate-500 mt-1">First Class Honours, Co-op Option</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] bg-slate-200 px-2 py-1 rounded text-slate-600">AI</span>
                      <span className="text-[10px] bg-slate-200 px-2 py-1 rounded text-slate-600">Software Eng</span>
                    </div>
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
            <a href="mailto:joel.wiebe@example.com" className="p-4 bg-white rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all">
              <Globe className="w-6 h-6" />
            </a>
          </div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Joel Wiebe. Built with React, Tailwind CSS & Laravel.
          </p>
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
