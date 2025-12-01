import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter, useInRouterContext } from 'react-router-dom';
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
  Database, 
  Check, 
  Lock 
} from 'lucide-react';

// --- Latest Resume Data ---
const FALLBACK_PROJECTS = []; // Define a fallback if API fails or is empty

const CATEGORIES = ["All", "Full Stack Ed-Tech", "AI & Analytics", "Cloud & DevOps", "HCI & Robotics", "Research & Pedagogy"];

// --- Components ---

import ProjectDetailModal from './ProjectDetailModal'; // Import the new modal component

const ProjectCard = ({ project, onClick }) => {
  const mainCat = project.categories[0];
  return (
    <button 
      type="button"
      onClick={() => onClick(project)}
      className="w-full text-left group bg-white rounded-xl border border-slate-400 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden focus:outline-none focus:ring-4 focus:ring-primary/50"
    >
      <div className="p-6 flex flex-col h-full w-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
            {mainCat.includes("Robotics") ? <Cpu className="w-6 h-6 text-primary" aria-hidden="true" /> :
             mainCat.includes("AI") ? <Brain className="w-6 h-6 text-[#002A5C]" aria-hidden="true" /> :
             mainCat.includes("Research") ? <BookOpen className="w-6 h-6 text-[#002A5C]" aria-hidden="true" /> :
             mainCat.includes("Public") ? <Users className="w-6 h-6 text-[#002A5C]" aria-hidden="true" /> :
             mainCat.includes("Mobile") ? <Smartphone className="w-6 h-6 text-[#002A5C]" aria-hidden="true" /> :
             mainCat.includes("Cloud") ? <Server className="w-6 h-6 text-[#002A5C]" aria-hidden="true" /> :
             <Code className="w-6 h-6 text-[#002A5C]" aria-hidden="true" />}
          </div>
          <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-[#002A5C] transition-colors" aria-hidden="true" />
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
            <span key={tag} className="text-base text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-base text-slate-600 px-1 py-1">+ {project.tags.length - 3}</span>
          )}
        </div>
      </div>
    </button>
  );
};

const NavLink = ({ href, children }) => {
  const isInternal = href.startsWith('/');
  const className = "text-lg font-medium text-slate-700 transition-colors hover:text-[#002A5C]";
  
  if (isInternal) {
    return <Link to={href} className={className}>{children}</Link>;
  }
  return <a href={href} className={className}>{children}</a>;
};

const PortfolioContent = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]); // Initialize as empty, will fetch from API
  const [selectedProject, setSelectedProject] = useState(null); // For the modal
  const [loadingProjects, setLoadingProjects] = useState(true); // New loading state
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchProjectsFromAPI = async () => {
      setLoadingProjects(true);
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          } else {
            // Fallback if API returns empty
            setProjects(FALLBACK_PROJECTS);
          }
        } else {
          // Fallback if API call fails
          setProjects(FALLBACK_PROJECTS);
        }
      } catch (error) {
        // Fallback to static PROJECTS
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjectsFromAPI();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const fetchProjectsOnFocus = () => {
        // Refetch projects when the window gains focus, e.g., returning from another tab
        fetch('/api/projects').then(res => res.json()).then(data => {
            if (data && data.length > 0) setProjects(data);
        }).catch(() => setProjects(FALLBACK_PROJECTS));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('focus', fetchProjectsOnFocus);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('focus', fetchProjectsOnFocus);
    };
  }, []);

  const handleCopyEmail = () => {
    const email = "me@joelwiebe.ca";
    const textArea = document.createElement("textarea");
    textArea.value = email;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if(successful) {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
  };

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
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-6 py-3 bg-[#002A5C] text-white font-bold rounded-lg shadow-xl"
      >
        Skip to main content
      </a>

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
            <Link to="/login" className="text-slate-400 hover:text-[#002A5C] transition-colors" title="Admin Access">
                <Lock className="w-4 h-4" />
            </Link>
            <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-lg font-semibold text-[#002A5C] hover:text-[#00204E] transition-colors">
              Visit JoelWiebe.ca <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-xl">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-slate-500">
                <Lock className="w-4 h-4" /> Admin Login
            </Link>
            <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="text-[#002A5C] font-bold">Visit JoelWiebe.ca</a>
          </div>
        </div>
      )}

      <main id="main-content">
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#002A5C]/5 skew-x-12 transform translate-x-1/2 -z-10"></div>
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-start max-w-3xl animate-slideUp">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#002A5C] text-lg font-medium mb-6">
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
                <a href="#portfolio" className="px-8 py-4 bg-[#002A5C] text-white rounded-xl font-semibold hover:bg-[#00204E] hover:scale-105 transition-all shadow-lg shadow-[#002A5C]/30 flex items-center gap-2 text-lg">
                  View Selected Works <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="https://joelwiebe.ca" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-[#002A5C] hover:text-[#002A5C] transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-lg">
                  Visit Full Academic Profile <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

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

        <section id="portfolio" className="py-24 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
              <p className="text-slate-700 text-xl max-w-2xl mx-auto">
                A curated selection of projects spanning 8 years of software engineering, educational research, and robotics integration.
              </p>
            </div>

            <div className="max-w-xl mx-auto mb-8 relative">
              <label htmlFor="project-search" className="sr-only">Search projects</label>
              <Search className="absolute left-4 top-3.5 h-6 w-6 text-slate-400" aria-hidden="true" />
              <input 
                id="project-search"
                type="text"
                placeholder="Search projects by technology, title, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-400 focus:border-[#002A5C] focus:ring-2 focus:ring-[#002A5C]/20 outline-none transition-all text-lg shadow-sm"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-all border ${
                    activeFilter === cat 
                      ? 'bg-[#002A5C] text-white shadow-md border-[#002A5C]' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: shouldReduceMotion ? 0 : 0.5, 
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
                    className="col-span-full text-center py-12 text-slate-600 text-lg"
                  >
                    No projects found matching your search.
                  </motion.div>
                )}
              </AnimatePresence>              
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-24 px-6 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }}></div>
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 bg-[#002A5C] text-white rounded-3xl p-8 md:p-12 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-6">Technical Leadership</h2>
                <p className="text-slate-100 leading-relaxed mb-6 text-xl">
                  I possess a unique dual background: <strong>Computer Science (B.Sc.)</strong> and <strong>Learning Sciences (PhD Candidate)</strong>. This allows me to build software that is not only technically robust but also pedagogically effective.
                </p>
                <p className="text-slate-100 leading-relaxed mb-8 text-xl">
                  My experience spans the entire stack: from complex backend systems and Robotics control interfaces to modern Cloud Architectures and AI Automation. I have a proven track record of adhering to AODA and OWASP standards within university contexts.
                </p>
                
                <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-[#00204E]/50">
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold text-lg">
                       <Rocket className="w-5 h-5" aria-hidden="true" /> Systems Architecture
                     </div>
                     <p className="text-base text-slate-200">Designing scalable, high-availability systems on OCI and Azure.</p>
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold text-lg">
                       <Users className="w-5 h-5" aria-hidden="true" /> Team Leadership
                     </div>
                     <p className="text-base text-slate-200">Leading technical strategy and automating workflows for global organizations.</p>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-200 rounded-lg text-[#002A5C]">
                      <GraduationCap className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Education</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Ph.D. Candidate</p>
                      <p className="text-base text-[#002A5C] font-medium">OISE, University of Toronto</p>
                      <p className="text-base text-slate-600 mt-1">Curriculum & Pedagogy (Expected 2027)</p>
                    </div>
                    
                    <div className="w-full h-px bg-slate-200"></div>

                    <div>
                      <p className="font-bold text-slate-900 text-lg">Master of Arts</p>
                      <p className="text-base text-[#002A5C] font-medium">OISE, University of Toronto</p>
                      <p className="text-base text-slate-600 mt-1">Curriculum & Pedagogy (2019)</p>
                    </div>

                    <div className="w-full h-px bg-slate-200"></div>

                    <div>
                      <p className="font-bold text-slate-900 text-lg">Honours B.Sc., Computer Science</p>
                      <p className="text-base text-[#002A5C] font-medium">University of Toronto</p>
                      <p className="text-base text-slate-600 mt-1">AI, Software Engineering, Web-based Systems (2015)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="bg-slate-50 py-16 px-6 border-t border-slate-200">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Get In Touch</h2>
            <div className="flex justify-center gap-6 mb-12">
              <button 
                onClick={handleCopyEmail}
                className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-slate-200 font-medium text-lg
                  ${emailCopied 
                    ? 'bg-green-100 text-green-700 border-green-200' 
                    : 'bg-white text-slate-700 hover:text-[#002A5C]'
                  }`}
                aria-live="polite"
              >
                {emailCopied ? <Check className="w-5 h-5" aria-hidden="true" /> : <Mail className="w-5 h-5" aria-hidden="true" />} 
                {emailCopied ? "Email Copied!" : "me@joelwiebe.ca"}
              </button>
            </div>

            <div className="mb-12 border-t border-slate-200 pt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Site Map</h3>
              <ul className="flex flex-wrap justify-center gap-6 text-slate-600">
                <li><a href="#about" className="text-base hover:text-[#002A5C] underline">About & Education</a></li>
                <li><a href="#portfolio" className="text-base hover:text-[#002A5C] underline">Project Portfolio</a></li>
                <li><a href="#contact" className="text-base hover:text-[#002A5C] underline">Contact Information</a></li>
                <li><a href="https://joelwiebe.ca" className="text-base hover:text-[#002A5C] underline">Academic Profile (External)</a></li>
                <li><a href="/sitemap.xml" className="text-base hover:text-[#002A5C] underline">XML Sitemap</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-2 text-slate-600 text-base">
              <div className="flex items-center gap-2">
                 <Database className="w-4 h-4 text-[#002A5C]" aria-hidden="true" />
                 <span>Built with <strong>Laravel 10</strong> & <strong>React 18</strong></span>
              </div>
              <p>© {new Date().getFullYear()} Joel P. Wiebe. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {selectedProject && ( // Use the new ProjectDetailModal
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
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

const Portfolio = () => {
    // Check if we are already inside a Router (like in the real App)
    let hasRouter = false;
    try {
        hasRouter = useInRouterContext();
    } catch (e) {
        hasRouter = false;
    }

    if (!hasRouter) {
        return (
            <BrowserRouter>
                <PortfolioContent />
            </BrowserRouter>
        );
    }

    return <PortfolioContent />;
};

export default Portfolio;