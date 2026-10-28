import { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
  Download,
  ExternalLink,
  Code2,
  Cloud,
  BrainCircuit,
  Server,
  Sparkles,
  Send,
  CheckCircle2,
  Layers3,
  GraduationCap,
  Loader2,
  AlertCircle,
  RotateCcw,
  Terminal,
  Search,
  Copy,
  Check,
  Quote,
  Cpu,
  Activity,
  ChevronRight,
  SlidersHorizontal,
  Bot,
  GitCommit,
  GitBranch,
} from 'lucide-react';

import resumePDF from './assets/Abhiraj_Resume.pdf';
import profile from './assets/profile.jpeg';
import QuickCart from './assets/QuickCart.png';
import HealthHive from './assets/HealthHive.png';
import SnapStock from './assets/SnapStock.png';
import TaskFlow from './assets/TaskFlow.png';
import CountryInfoApp from './assets/CountryInfoApp.png';
import EventWithYadavs from './assets/EventWithYadavs.png';
import DevTerminal from './components/DevTerminal';
import AIChatModal from './components/AIChatModal';
import ProjectModal from './components/ProjectModal';

const socials = {
  github: 'https://github.com/abhiraj100',
  linkedin: 'https://www.linkedin.com/in/abhiraj-yadav-86a232215/',
  email: 'mailto:abhirajyadav303@gmail.com',
  rawEmail: 'abhirajyadav303@gmail.com',
};

const projectImages = {
  'DevPilot AI': SnapStock,
  'FloCard': QuickCart,
  'SkillTrack': TaskFlow,
  'Fennex Safety': HealthHive,
  'QuickCart': QuickCart,
  'EventWithYadavs': EventWithYadavs,
  'Country Info': CountryInfoApp,
};

const defaultSkills = {
  'AI & GenAI': ['OpenAI API', 'Azure OpenAI', 'LLM Integration', 'RAG', 'Embeddings', 'Vector Search', 'LangChain', 'AI Agents', 'Prompt Engineering'],
  'Full Stack': ['React', 'Next.js', 'Node.js', 'Express.js', 'ASP.NET Core', '.NET 8', 'REST APIs', 'Tailwind CSS', 'SPFx'],
  'Data & Cloud': ['MongoDB', 'PostgreSQL', 'SQL Server', 'Redis', 'Power BI', 'Azure', 'AWS', 'Docker', 'GitHub Actions', 'CI/CD'],
  'Languages': ['C#', 'JavaScript', 'TypeScript', 'Java', 'Python', 'SQL'],
};

const defaultExperience = [
  {
    company: '366Pi Technology Private Limited',
    role: 'Software Engineer',
    date: 'Jun 2026 — Present',
    location: 'Ranchi, Jharkhand',
    text: 'Building production software across modern full-stack, Microsoft and AI-enabled workflows, with a focus on reliable APIs, responsive interfaces and business automation.',
    highlights: ['Architecting scalable micro-services with Node.js & .NET 8', 'Designing AI document intelligence pipelines with Azure AI', 'Collaborating across Dockerized CI/CD automated deployments'],
  },
  {
    company: 'Stocai 109 Technology Private Limited',
    role: 'Software Developer Engineer',
    date: 'Mar 2025 — Apr 2026',
    location: 'Remote · Pune',
    text: 'Delivered full-stack product features, optimized frontend performance and collaborated across design, backend and deployment workflows.',
    highlights: ['Boosted Core Web Vitals score by 35% via intelligent code splitting', 'Engineered resilient RESTful endpoints with MERN architecture', 'Implemented responsive real-time client state management'],
  },
  {
    company: 'Affy Cloud IT Solutions',
    role: 'Software Developer Intern',
    date: 'Nov 2024 — Jan 2025',
    location: 'Remote · Bhopal',
    text: 'Developed responsive React interfaces, API integrations and real-time product experiences while following collaborative engineering practices.',
    highlights: ['Engineered modular reusable UI components', 'Integrated OAuth 2.0 & JWT secure authentication', 'Participated in code reviews and test coverage improvements'],
  },
  {
    company: 'Codes For Tomorrow',
    role: 'React.js Developer Intern',
    date: 'Sep 2024 — Nov 2024',
    location: 'Indore, Madhya Pradesh',
    text: 'Built interactive React features, improved API-driven experiences and participated in code reviews and product delivery.',
    highlights: ['Integrated complex third-party RESTful APIs', 'Built dynamic telemetry dashboards and data charts', 'Optimized rendering bottlenecks across key user journeys'],
  },
];

const defaultProjects = [
  {
    title: 'DevPilot AI',
    tag: 'AI Engineering Platform',
    category: 'AI & GenAI',
    desc: 'A developer-first AI workspace concept for connecting repositories, indexing code, asking natural-language questions and generating engineering insights with RAG.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'RAG', 'Vector Search'],
    featured: true,
    githubUrl: 'https://github.com/abhiraj100',
    liveUrl: 'https://github.com/abhiraj100',
    metrics: 'Semantic search across 50k+ code tokens',
  },
  {
    title: 'FloCard',
    tag: 'Digital Identity · .NET',
    category: 'Full Stack / .NET',
    desc: 'Blockchain-enabled professional identity platform with profile management, organization association, QR credential sharing and tamper-evident verification.',
    stack: ['React', 'ASP.NET Core', 'SQL Server', 'Blockchain', 'Docker'],
    featured: false,
    githubUrl: 'https://github.com/abhiraj100',
    liveUrl: 'https://github.com/abhiraj100',
    metrics: 'Cryptographic QR verification pipeline',
  },
  {
    title: 'SkillTrack',
    tag: 'Learning SaaS · MERN',
    category: 'MERN / React',
    desc: 'AI-ready learning and career platform with role-based authentication, course discovery, enrollment, progress tracking and quizzes.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OpenAI'],
    featured: false,
    githubUrl: 'https://github.com/abhiraj100',
    liveUrl: 'https://github.com/abhiraj100',
    metrics: 'Role-based access & modular curriculum',
  },
  {
    title: 'Fennex Safety',
    tag: 'Enterprise · AI Search',
    category: 'AI & GenAI',
    desc: 'Safety solution workflows combining SPFx, ASP.NET Core, SQL Server, Azure OpenAI and Azure AI Search for secure document intelligence.',
    stack: ['SPFx', 'React', 'ASP.NET Core', 'Azure AI', 'SQL Server'],
    featured: false,
    githubUrl: 'https://github.com/abhiraj100',
    liveUrl: 'https://github.com/abhiraj100',
    metrics: 'Sub-second document intelligence lookup',
  },
  {
    title: 'QuickCart',
    tag: 'E-Commerce',
    category: 'MERN / React',
    desc: 'Modern commerce experience with product discovery, cart workflows, authentication, orders and scalable API architecture.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    featured: false,
    githubUrl: 'https://github.com/abhiraj100',
    liveUrl: 'https://github.com/abhiraj100',
    metrics: 'Full Stripe checkout & inventory pipeline',
  },
  {
    title: 'EventWithYadavs',
    tag: 'Community Platform',
    category: 'Full Stack / .NET',
    desc: 'High-engagement community event platform featuring RSVP registrations, QR badge check-in, dynamic agenda scheduling, and real-time attendee management.',
    stack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Nodemailer'],
    featured: false,
    githubUrl: 'https://github.com/abhiraj100',
    liveUrl: 'https://github.com/abhiraj100',
    metrics: 'Automated QR pass dispatch via SMTP',
  },
  {
    title: 'Country Info',
    tag: 'API Product',
    category: 'Cloud & APIs',
    desc: 'Fast, responsive country information experience built around clean API consumption, search and adaptive UI patterns.',
    stack: ['React', 'REST API', 'JavaScript', 'CSS'],
    featured: false,
    githubUrl: 'https://github.com/abhiraj100',
    liveUrl: 'https://github.com/abhiraj100',
    metrics: 'Fuzzy search & real-time currency conversion',
  },
];

const engineeringPrinciples = [
  {
    icon: Layers3,
    title: 'Scalable System Architecture',
    desc: 'Designing clean modular architectures, repository design patterns, and strict RESTful API contracts that scale effortlessly without technical debt.',
  },
  {
    icon: BrainCircuit,
    title: 'Generative AI & RAG Engineering',
    desc: 'Building intelligent systems using vector embeddings, semantic search, prompt orchestration, and context chunking with OpenAI and Azure AI.',
  },
  {
    icon: Server,
    title: 'High-Throughput Data & Caching',
    desc: 'Optimizing database schemas across MongoDB, SQL Server, and Redis caching layers for high concurrent throughput and data integrity.',
  },
  {
    icon: Cloud,
    title: 'Automated DevOps & CI/CD',
    desc: 'Containerizing services with Docker, deploying to Azure/AWS clouds, and establishing zero-downtime GitHub Actions deployment workflows.',
  },
];

const educationList = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Vellore Institute of Technology (VIT), Bhopal',
    period: '2023 — 2025',
    score: '8.50 / 10 CGPA',
    badge: 'Postgraduate Degree',
    highlight: 'Advanced Software Engineering, Cloud Systems, and AI Architectures.',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Nilamber-Pitamber University, Jharkhand',
    period: '2019 — 2022',
    score: '72.25%',
    badge: 'Undergraduate Degree',
    highlight: 'Data Structures, Algorithms, Computer Networks, and Database Management.',
  },
  {
    degree: 'Advanced Diploma in Computer Application (ADCA)',
    institution: 'National Institute of Technical Studies',
    period: 'Completed 2019',
    score: 'Grade A',
    badge: 'Diploma',
    highlight: 'Core programming logic, system design fundamentals, and web technologies.',
  },
];

const defaultTestimonials = [
  {
    name: 'Priyansh Sharma',
    role: 'Lead Architect',
    company: 'Enterprise Solutions',
    text: 'Abhiraj possesses an exceptional ability to grasp complex architectures quickly. His work on .NET Core backends, RAG pipelines, and React interfaces consistently met high standards of performance and clean code.',
    avatar: 'PS',
  },
  {
    name: 'Sneha Mukherjee',
    role: 'Senior Full Stack Engineer',
    company: 'FinTech Systems',
    text: 'Working with Abhiraj was a breeze. He communicates proactively, debugs problems at their root cause, and writes maintainable, resilient REST APIs that are a pleasure to integrate with.',
    avatar: 'SM',
  },
  {
    name: 'Rohan Verma',
    role: 'Engineering Manager',
    company: 'Cloud Innovations',
    text: 'Abhiraj stands out for his product intuition. He doesn’t just code specifications—he anticipates edge cases, optimizes database queries, and crafts intuitive user journeys.',
    avatar: 'RV',
  },
];

const languagesData = [
  { name: 'JavaScript & TypeScript', percent: 45, color: '#22d3ee' },
  { name: 'C# / ASP.NET Core', percent: 25, color: '#818cf8' },
  { name: 'Python (AI & RAG)', percent: 18, color: '#f0abfc' },
  { name: 'SQL & Database Modeling', percent: 12, color: '#34d399' },
];

const categories = ['All', 'AI & GenAI', 'Full Stack / .NET', 'MERN / React', 'Cloud & APIs'];

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.28em] text-cyan-300">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight sm:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-slate-400 sm:text-lg">{desc}</p>}
    </div>
  );
}

function Pill({ children, onClick, active }) {
  return (
    <span
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition cursor-pointer ${
        active
          ? 'border-cyan-400 bg-cyan-400/20 text-cyan-200'
          : 'border-white/10 bg-white/[.04] text-slate-300 hover:border-cyan-400/40 hover:text-white'
      }`}
    >
      {children}
    </span>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const [projectsList, setProjectsList] = useState(defaultProjects);
  const [skillsList, setSkillsList] = useState(defaultSkills);
  const [expList, setExpList] = useState(defaultExperience);
  const [certList, setCertList] = useState(educationList);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ online: false, ping: null });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll spy & progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55%' }
    );
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Ping backend API & hydrate data
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const startTime = performance.now();

    fetch(`${apiUrl}/api/health`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.status === 'healthy') {
          const latency = Math.round(performance.now() - startTime);
          setBackendStatus({ online: true, ping: latency });
        }
      })
      .catch(() => setBackendStatus({ online: false, ping: null }));

    fetch(`${apiUrl}/api/projects`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setProjectsList(res.data);
        }
      })
      .catch(() => {});

    fetch(`${apiUrl}/api/skills`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.data && Array.isArray(res.data)) {
          const formatted = {};
          res.data.forEach((s) => {
            formatted[s.category] = s.items;
          });
          setSkillsList(formatted);
        }
      })
      .catch(() => {});

    fetch(`${apiUrl}/api/experience`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setExpList(res.data);
        }
      })
      .catch(() => {});

    fetch(`${apiUrl}/api/certifications`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setCertList(res.data);
        }
      })
      .catch(() => {});

    fetch(`${apiUrl}/api/stats`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.testimonials) {
          setTestimonials(res.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(socials.rawEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter projects by category and search term
  const filteredProjects = projectsList.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category === selectedCategory ||
      (selectedCategory === 'AI & GenAI' && p.tag.toLowerCase().includes('ai')) ||
      (selectedCategory === 'Full Stack / .NET' && (p.tag.includes('.NET') || p.tag.includes('Community'))) ||
      (selectedCategory === 'MERN / React' && (p.tag.includes('MERN') || p.tag.includes('Commerce')));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      (p.stack && p.stack.some((s) => s.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  const nav = ['home', 'about', 'principles', 'experience', 'projects', 'skills', 'velocity', 'education', 'contact'];

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      {/* Top scroll progress indicator */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="noise" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[8%] top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-[5%] top-[25%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[150px]" />
        <div className="absolute left-[20%] bottom-[10%] h-[350px] w-[350px] rounded-full bg-fuchsia-500/5 blur-[140px]" />
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {copied && (
          <Motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-cyan-400/30 bg-slate-900/95 px-5 py-3.5 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-400/20 text-cyan-300">
              <Check size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Email copied to clipboard!</p>
              <p className="text-xs text-slate-400">{socials.rawEmail}</p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Developer Terminal Modal */}
      <DevTerminal isOpen={showTerminal} onClose={() => setShowTerminal(false)} />

      {/* Interactive AI Chat Copilot Modal */}
      <AIChatModal isOpen={showAIChat} onClose={() => setShowAIChat(false)} />

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        image={selectedProject ? projectImages[selectedProject.title] || selectedProject.image || QuickCart : QuickCart}
      />

      {/* Floating Ask AI Button in bottom right */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setShowAIChat(true)}
          className="group flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-slate-900/90 px-4 py-2.5 shadow-2xl backdrop-blur-xl transition hover:scale-105 hover:border-cyan-300 hover:bg-slate-900"
        >
          <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 text-slate-950 shadow-md">
            <Sparkles size={14} className="group-hover:rotate-12 transition" />
          </div>
          <span className="text-xs font-bold text-white">Ask AI Copilot</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="flex items-center gap-2.5 font-black tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 via-indigo-400 to-indigo-600 text-slate-950 shadow-lg shadow-cyan-500/20">
              AY
            </span>
            <span className="hidden sm:block text-lg">
              Abhiraj<span className="text-cyan-300">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex">
            {nav.map((n) => (
              <a
                key={n}
                href={'#' + n}
                className={`text-sm capitalize transition ${
                  active === n ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {n}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Live Backend Diagnostic Status */}
            <div
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-slate-300 sm:flex cursor-pointer hover:border-cyan-400/30 transition"
              onClick={() => setShowTerminal(true)}
              title={backendStatus.online ? `Connected (${backendStatus.ping}ms). Click to open terminal.` : 'Backend API offline'}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  backendStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="font-mono text-[11px]">
                {backendStatus.online ? `API: Online (${backendStatus.ping}ms)` : 'API: Ready'}
              </span>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={() => setShowAIChat(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 transition hover:bg-indigo-500/20 hover:scale-[1.02]"
              title="Chat with AI Copilot"
            >
              <Bot size={14} className="text-indigo-300" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* Dev Terminal Launcher */}
            <button
              onClick={() => setShowTerminal(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-400/20 hover:scale-[1.02]"
              title="Open interactive terminal console"
            >
              <Terminal size={14} className="text-cyan-300" />
              <span className="hidden sm:inline">Terminal</span>
            </button>

            {/* GitHub & LinkedIn icons */}
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white md:block"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white md:block"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="#contact"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:block shadow-md"
            >
              Let's talk
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenu(!menu)}
              className="rounded-xl border border-white/10 p-2 lg:hidden text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menu && (
          <div className="border-t border-white/5 bg-[#070b1a]/95 backdrop-blur-2xl p-4 lg:hidden">
            <div className="grid grid-cols-2 gap-1 mb-4">
              {nav.map((n) => (
                <a
                  onClick={() => setMenu(false)}
                  key={n}
                  href={'#' + n}
                  className="block rounded-xl px-4 py-2.5 capitalize text-slate-300 hover:bg-white/5"
                >
                  {n}
                </a>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMenu(false);
                    setShowAIChat(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-200"
                >
                  <Bot size={13} /> AI Copilot
                </button>
                <button
                  onClick={() => {
                    setMenu(false);
                    setShowTerminal(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200"
                >
                  <Terminal size={13} /> Terminal
                </button>
              </div>
              <div className="flex gap-2">
                <a href={socials.github} target="_blank" rel="noreferrer" className="p-2 text-slate-300">
                  <Github size={18} />
                </a>
                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-300">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="grid-bg relative flex min-h-screen items-center px-5 pb-16 pt-28 sm:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <Motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200 shadow-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" /> Available for software engineering opportunities
              </Motion.div>

              <Motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="max-w-4xl text-5xl font-black leading-[.96] tracking-[-.04em] sm:text-7xl lg:text-[84px]"
              >
                Building <span className="gradient-text">digital products</span> that feel effortless.
              </Motion.h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Full Stack Software Engineer specializing in <span className="text-slate-200 font-semibold">React, Node.js, .NET 8, MongoDB</span> and <span className="text-cyan-300 font-semibold">Generative AI / RAG pipelines</span>. I turn complex architectural challenges into clean, fast, and high-impact digital experiences.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 shadow-lg"
                >
                  Explore work <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href={resumePDF}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  <Download size={17} /> Resume
                </a>
                <button
                  onClick={() => setShowAIChat(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-5 py-3 font-semibold text-indigo-200 hover:bg-indigo-500/20 transition"
                >
                  <Bot size={17} className="text-indigo-300" /> Ask AI Copilot
                </button>
                <button
                  onClick={() => setShowTerminal(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-200 hover:bg-cyan-400/20 transition"
                >
                  <Terminal size={17} className="text-cyan-300" /> Terminal
                </button>
              </div>

              {/* Technology badges */}
              <div className="mt-10 flex flex-wrap gap-2">
                <Pill>React 19</Pill>
                <Pill>Node.js</Pill>
                <Pill>Express</Pill>
                <Pill>MongoDB</Pill>
                <Pill>.NET 8</Pill>
                <Pill>Generative AI / RAG</Pill>
                <Pill>Azure AI Search</Pill>
                <Pill>Docker</Pill>
              </div>

              {/* Quick Impact Stats */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
                <div>
                  <p className="text-2xl font-black text-white sm:text-3xl">4+</p>
                  <p className="mt-1 text-xs text-slate-400 font-medium">Industry Roles</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-cyan-300 sm:text-3xl">15+</p>
                  <p className="mt-1 text-xs text-slate-400 font-medium">Projects Built</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-indigo-300 sm:text-3xl">8.50</p>
                  <p className="mt-1 text-xs text-slate-400 font-medium">MCA CGPA (VIT)</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-300 sm:text-3xl">&lt;50ms</p>
                  <p className="mt-1 text-xs text-slate-400 font-medium">API Latency Target</p>
                </div>
              </div>
            </div>

            {/* Profile Hero Card */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-cyan-400/20 via-indigo-500/10 to-fuchsia-400/20 blur-2xl" />
              <div className="glass glow relative overflow-hidden rounded-[34px] p-3">
                <div className="relative overflow-hidden rounded-[26px] bg-slate-950">
                  <img
                    src={profile}
                    alt="Abhiraj Yadav"
                    className="aspect-[4/5] w-full object-cover object-top opacity-90 transition duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6 pt-24">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xl font-black text-white">Abhiraj Yadav</p>
                        <p className="mt-1 text-sm text-cyan-300 font-medium">Software Engineer · AI Builder</p>
                        <p className="mt-0.5 text-xs text-slate-400">VIT Bhopal · MCA 2025</p>
                      </div>
                      <div className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10">
                        <Sparkles size={19} className="text-cyan-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Engineering Badge */}
              <div className="absolute -right-4 top-12 hidden rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Code2 size={19} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Specialization</p>
                    <p className="text-sm font-bold text-white">Full Stack + AI</p>
                  </div>
                </div>
              </div>

              {/* Floating Backend Status Badge */}
              <div className="absolute -left-4 bottom-14 hidden rounded-2xl border border-white/10 bg-slate-950/90 p-3.5 shadow-2xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <p className="text-[11px] text-slate-500 font-mono">MERN Backend</p>
                    <p className="text-xs font-bold text-slate-200">Express &bull; Nodemailer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="01 · About"
              title="Engineering with product thinking."
              desc="I work at the intersection of performant user interfaces, resilient API contracts, database architecture, and intelligent GenAI systems."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="glass rounded-3xl p-7 lg:col-span-2">
                <div className="flex flex-col gap-7 sm:flex-row">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-cyan-300">
                    <Layers3 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">From idea &rarr; architecture &rarr; shipped product.</h3>
                    <p className="mt-4 leading-7 text-slate-400">
                      With experience across production engineering at 366Pi Technology and fast-paced developer internships, I approach development pragmatically: understand user requirements deeply, design a maintainable system with clear boundaries, ship iteratively, and verify reliability with automated tests and telemetry.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Pill>Clean Architecture</Pill>
                      <Pill>Micro-Monoliths</Pill>
                      <Pill>RESTful API Design</Pill>
                      <Pill>RAG & Embeddings</Pill>
                      <Pill>Relational & Document DBs</Pill>
                      <Pill>CI/CD Pipelines</Pill>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-3xl p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <MapPin className="text-cyan-300" size={24} />
                    <button
                      onClick={copyEmailToClipboard}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition"
                      title="Copy email"
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Location</p>
                  <p className="mt-1 text-lg font-bold text-white">India &bull; Open to relocation</p>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Direct Email</p>
                  <a
                    href={socials.email}
                    className="mt-1 block break-all text-sm font-semibold text-cyan-300 hover:underline"
                  >
                    abhirajyadav303@gmail.com
                  </a>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>VIT Bhopal University</span>
                  <span className="font-bold text-cyan-300">MCA 2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW I BUILD / ARCHITECTURE PRINCIPLES */}
        <section id="principles" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="02 · Engineering Blueprint"
              title="How I build reliable software."
              desc="Principles guiding my approach to full-stack system architecture, code health, and AI delivery."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {engineeringPrinciples.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="glass-card rounded-3xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 mb-5">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
                    </div>
                  </Motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="03 · Career Experience"
              title="Shipping software in the real world."
              desc="Proven track record across full-stack engineering, production API delivery, and AI workflows."
            />
            <div className="relative ml-2 border-l border-white/10 pl-7 sm:ml-6 sm:pl-10">
              {expList.map((e, index) => (
                <Motion.article
                  key={e.company + index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative mb-12 last:mb-0"
                >
                  <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan-300 bg-[#050816] sm:-left-[45px]" />
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="text-xl font-bold text-white">{e.role}</h3>
                      <p className="mt-1 font-semibold text-cyan-300">{e.company}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-semibold text-slate-300">{e.date}</p>
                      <p className="mt-1 text-xs text-slate-500">{e.location}</p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-3xl leading-7 text-slate-400">{e.text}</p>

                  {e.highlights && e.highlights.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {e.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <ChevronRight size={14} className="shrink-0 text-cyan-400 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION WITH FILTER & SEARCH */}
        <section id="projects" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-10">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.28em] text-cyan-300">04 · Selected Work</p>
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Projects built to solve, not just impress.</h2>
                <p className="mt-4 max-w-2xl text-slate-400 sm:text-lg">
                  Explore full-stack applications, enterprise integrations, and generative AI systems. Click any project to open an in-depth case study.
                </p>
              </div>

              {/* Real-time Search input */}
              <div className="relative w-full max-w-xs">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search project or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-2">
                <SlidersHorizontal size={14} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                      : 'border border-white/10 bg-white/[.04] text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto text-xs text-slate-500 font-mono">
                Showing {filteredProjects.length} of {projectsList.length}
              </span>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p) => {
                const img = projectImages[p.title] || p.image || QuickCart;
                return (
                  <Motion.article
                    key={p.title}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedProject(p)}
                    className={`group glass overflow-hidden rounded-3xl flex flex-col justify-between cursor-pointer ${
                      p.featured ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    <div>
                      <div className="relative overflow-hidden bg-slate-900">
                        <img
                          src={img}
                          alt={p.title}
                          className="h-56 w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur">
                          {p.tag}
                        </span>
                        {p.metrics && (
                          <span className="absolute right-4 top-4 rounded-full border border-cyan-400/30 bg-cyan-950/70 px-3 py-1 text-[11px] font-mono text-cyan-200 backdrop-blur">
                            {p.metrics}
                          </span>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                            {p.title}
                          </h3>
                          <span className="text-xs text-cyan-300 font-semibold group-hover:underline flex items-center gap-1">
                            Details <ArrowUpRight size={14} />
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{p.desc}</p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.stack &&
                          p.stack.map((x) => (
                            <Pill
                              key={x}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery(x);
                              }}
                            >
                              {x}
                            </Pill>
                          ))}
                      </div>

                      <div className="flex items-center gap-3 border-t border-white/10 pt-4 text-xs font-semibold">
                        <a
                          href={p.githubUrl || socials.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition"
                        >
                          <Github size={14} /> Repository
                        </a>
                        <a
                          href={p.liveUrl || socials.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition ml-auto"
                        >
                          <ExternalLink size={14} /> Live View
                        </a>
                      </div>
                    </div>
                  </Motion.article>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="glass rounded-3xl p-12 text-center text-slate-400">
                <Search size={36} className="mx-auto mb-3 text-slate-500" />
                <p className="text-lg font-semibold text-white">No projects found</p>
                <p className="mt-1 text-sm">Try clearing your search query or switching categories.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* TECHNICAL TOOLKIT SECTION */}
        <section id="skills" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="05 · Technical Toolkit"
              title="A modern full-stack & AI arsenal."
              desc="Languages, frameworks, data stores, and cloud services used in production. Click any skill to filter projects."
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {Object.entries(skillsList).map(([name, list], index) => {
                const icons = [BrainCircuit, Code2, Cloud, Server];
                const Icon = icons[index % icons.length];
                return (
                  <div key={name} className="glass rounded-3xl p-7">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/[.05] text-cyan-300">
                        <Icon size={21} />
                      </div>
                      <h3 className="text-lg font-bold text-white">{name}</h3>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {list.map((x) => (
                        <button
                          key={x}
                          onClick={() => {
                            setSearchQuery(x);
                            const projSec = document.getElementById('projects');
                            projSec?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm text-slate-300 hover:border-cyan-400/50 hover:text-cyan-200 transition"
                          title={`Click to filter projects using ${x}`}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CODE VELOCITY & PROBLEM SOLVING METRICS */}
        <section id="velocity" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="06 · Code Velocity & Problem Solving"
              title="Engineering depth & consistency."
              desc="Language distribution, open-source commits, and algorithmic problem-solving milestones."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Language Distribution Bar Card */}
              <div className="glass rounded-3xl p-7 lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <Activity size={21} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Codebase Distribution</h3>
                      <p className="text-xs text-slate-400 font-mono">Languages across production & open-source projects</p>
                    </div>
                  </div>

                  {/* Segmented Progress Bar */}
                  <div className="h-4 w-full rounded-full bg-slate-900 overflow-hidden flex mb-6">
                    {languagesData.map((lang) => (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                        className="h-full transition-all duration-500 hover:opacity-85"
                        title={`${lang.name}: ${lang.percent}%`}
                      />
                    ))}
                  </div>

                  {/* Language Legend */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {languagesData.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-2.5">
                        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                        <div>
                          <p className="text-xs font-semibold text-slate-200">{lang.name}</p>
                          <p className="text-xs text-slate-400 font-mono">{lang.percent}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <GitCommit size={15} className="text-cyan-300" /> 300+ Verified GitHub Commits
                  </span>
                  <span className="flex items-center gap-2">
                    <GitBranch size={15} className="text-indigo-300" /> 15+ Active Repositories
                  </span>
                </div>
              </div>

              {/* Algorithmic Problem Solving Card */}
              <div className="glass rounded-3xl p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/10 text-indigo-300">
                      <Cpu size={21} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Data Structures</h3>
                      <p className="text-xs text-slate-400 font-mono">Algorithmic Problem Solving</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-300">350+ Problems Solved</span>
                        <span className="text-cyan-300 font-mono">LeetCode & DSA</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-300">Trees, Graphs & DP</span>
                        <span className="text-indigo-300 font-mono">High Proficiency</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-indigo-400 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-300">Clean Code & Complexity</span>
                        <span className="text-emerald-300 font-mono">O(1) / O(log n)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
                  <p>Focused on writing readable, optimal, and edge-case-safe code.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PEER ENDORSEMENTS & RECOMMENDATIONS */}
        <section id="recommendations" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="07 · Peer Endorsements"
              title="Feedback from engineers & leads."
              desc="What mentors, architects, and engineering peers say about collaborating with Abhiraj."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, idx) => (
                <div key={idx} className="glass-card rounded-3xl p-7 flex flex-col justify-between">
                  <div>
                    <Quote className="text-cyan-400/40 mb-4" size={28} />
                    <p className="text-sm leading-relaxed text-slate-300 italic">"{t.text}"</p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 font-bold text-cyan-300 text-xs">
                      {t.avatar || 'AY'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role} &bull; {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS SECTION */}
        <section id="education" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="08 · Education & Honors"
              title="Academic foundation & certifications."
              desc="Formal computer science education and verified specialized engineering credentials."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {certList.map((e, index) => (
                <div key={index} className="glass-card rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <GraduationCap className="text-cyan-300" size={24} />
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-cyan-200">
                        {e.badge || 'Degree'}
                      </span>
                    </div>
                    <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
                      {e.period || e.date}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">{e.degree || e.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{e.institution || e.issuer}</p>
                    {e.highlight && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-400">{e.highlight}</p>
                    )}
                  </div>
                  {e.score && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Performance / Grade:</span>
                      <span className="font-bold text-cyan-300">{e.score}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-indigo-500/10 to-fuchsia-500/10 p-6 sm:p-10 lg:p-14">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.28em] text-cyan-300">09 · Contact</p>
                  <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                    Let's build something <span className="gradient-text">useful.</span>
                  </h2>
                  <p className="mt-5 max-w-lg leading-7 text-slate-400">
                    Have an open engineering position, consulting challenge, or interesting product idea? Send a message below. All messages are stored in MongoDB and instantly dispatched to my email with an automated confirmation delivered to yours.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <a
                        href={socials.email}
                        className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-cyan-300"
                      >
                        <Mail size={18} /> abhirajyadav303@gmail.com
                      </a>
                      <button
                        onClick={copyEmailToClipboard}
                        className="rounded-lg p-1 text-slate-500 hover:text-cyan-300 hover:bg-white/5 transition"
                        title="Copy email address"
                      >
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-cyan-300"
                    >
                      <Linkedin size={18} /> LinkedIn Profile <ExternalLink size={13} />
                    </a>
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-cyan-300"
                    >
                      <Github size={18} /> GitHub Repositories <ExternalLink size={13} />
                    </a>
                  </div>

                  {/* AI & Terminal Quick Actions */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowAIChat(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-2.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/20 transition"
                    >
                      <Bot size={15} /> Chat with AI Copilot
                    </button>
                    <button
                      onClick={() => setShowTerminal(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-400/20 transition"
                    >
                      <Terminal size={15} /> Launch Terminal
                    </button>
                  </div>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row items-center">
          <p>© {new Date().getFullYear()} Abhiraj Yadav. Engineered with React 19, Tailwind CSS & a MERN Backend.</p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setShowAIChat(true)}
              className="inline-flex items-center gap-1 text-xs text-indigo-300 hover:underline transition"
            >
              <Bot size={14} /> AI Copilot
            </button>
            <button
              onClick={() => setShowTerminal(true)}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition"
            >
              <Terminal size={14} /> Console
            </button>
            <a href="#home" className="hover:text-white transition">
              Back to top ↑
            </a>
            <a href={resumePDF} download className="hover:text-white transition">
              Resume PDF
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [status, setStatus] = useState({ loading: false, ok: false, message: '', error: '' });

  const resetForm = () => {
    setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
    setStatus({ loading: false, ok: false, message: '', error: '' });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ loading: false, ok: false, message: '', error: 'Please complete all required fields.' });
      return;
    }

    setStatus({ loading: true, ok: false, message: '', error: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Unable to submit message.');
      }

      setStatus({
        loading: false,
        ok: true,
        message: data.message || 'Your message has been sent successfully!',
        error: '',
      });
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        message: '',
        error: err.message || 'Could not reach backend service. Please check your network.',
      });
    }
  };

  if (status.ok) {
    return (
      <div className="glass flex flex-col items-center justify-center rounded-3xl p-8 text-center sm:p-12">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-400 mb-2">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-white">Message Delivered!</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">{status.message}</p>
        <p className="mt-2 text-xs text-slate-500">
          A confirmation copy has been queued for your inbox, and I will be in touch shortly.
        </p>
        <button
          onClick={resetForm}
          className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <RotateCcw size={16} /> Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-5 sm:p-7">
      {/* Bot honeypot protection */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name *">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email *">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field label="Subject">
        <input
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Project / opportunity inquiry"
        />
      </Field>

      <Field label="Message *">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me a little about your project, timeline, or engineering role..."
        />
      </Field>

      {status.error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-3.5 text-sm text-red-300">
          <AlertCircle size={18} className="shrink-0" />
          <span>{status.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status.loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300 hover:scale-[1.01] disabled:cursor-wait disabled:opacity-60 shadow-lg"
      >
        {status.loading ? (
          <>
            <Loader2 size={18} className="animate-spin text-slate-950" /> Sending message...
          </>
        ) : (
          <>
            <Send size={17} /> Send message
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="mb-4 block text-sm font-semibold text-slate-300">
      {label}
      <div className="mt-2">{children}</div>
      <style>{`
        input, textarea {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(2, 6, 23, 0.55);
          padding: 12px 14px;
          color: #f8fafc;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        input:focus, textarea:focus {
          border-color: rgba(34, 211, 238, 0.5);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.12);
        }
        textarea {
          resize: vertical;
        }
      `}</style>
    </label>
  );
}

export default App;
