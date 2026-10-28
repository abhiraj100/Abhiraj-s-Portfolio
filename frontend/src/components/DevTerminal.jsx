import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

export default function DevTerminal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: "🚀 Welcome to Abhiraj's Interactive Dev Console [v2.2.0]" },
    { type: 'system', text: "Type 'help' to see available commands or 'skills', 'projects', 'health'." },
  ]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setCommandIndex(-1);

    const newHistory = [...history, { type: 'prompt', text: `$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    switch (lower) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • help           - Show this help manual
  • about          - Learn about Abhiraj Yadav & engineering background
  • skills         - Display full technical stack & toolkit
  • projects       - List flagship AI & Full-Stack software projects
  • experience     - View career timeline & engineering roles
  • certs          - Show degrees, certifications & academic honors
  • health         - Ping live MERN backend API for real-time status
  • contact        - Get email, LinkedIn, and GitHub links
  • sudo hire      - Fast-track recruiter action
  • clear          - Clear terminal history
  • exit           - Close the terminal`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `Abhiraj Yadav | Full Stack Software Engineer & AI Builder
Based in India · Open to global opportunities & relocation
Education: MCA from VIT Bhopal (8.50 / 10 CGPA) | BCA (72.25%)
Focus: React, Next.js, Node.js, Express, .NET 8, MongoDB, Azure, OpenAI & RAG Pipelines.
Mission: Turning complex ideas into resilient, production-grade systems with effortless UX.`,
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Tech Stack Breakdown:
[AI & GenAI]   : OpenAI API, Azure OpenAI, RAG, Vector Search, LangChain, Embeddings
[Full Stack]   : React, Next.js, Node.js, Express.js, ASP.NET Core, .NET 8, Tailwind CSS, REST
[Data & Cloud] : MongoDB, PostgreSQL, SQL Server, Redis, Azure, Docker, GitHub Actions CI/CD
[Languages]    : JavaScript, TypeScript, C#, Python, SQL, Java`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Featured Engineering Work:
1. DevPilot AI     - Developer-first AI workspace with RAG code indexing (React, Node, MongoDB)
2. FloCard         - Blockchain professional identity platform (.NET 8, SQL Server, Docker)
3. SkillTrack      - AI-ready SaaS learning platform with role-based auth (MERN, JWT, OpenAI)
4. Fennex Safety   - Enterprise intelligence workflow (SPFx, .NET Core, Azure AI Search)
5. EventWithYadavs - Community event management platform (React, Node, MongoDB, SMTP)
6. QuickCart       - Scalable modern e-commerce platform (Next.js, Node, MongoDB, Stripe)`,
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          text: `Career Timeline:
• 366Pi Technology (Jun 2026 — Present): Software Engineer · Full-Stack, .NET & AI
• Stocai 109 Technology (Mar 2025 — Apr 2026): Software Developer Engineer
• Affy Cloud IT Solutions (Nov 2024 — Jan 2025): Software Developer Intern
• Codes For Tomorrow (Sep 2024 — Nov 2024): React.js Developer Intern`,
        });
        break;

      case 'certs':
      case 'certifications':
        newHistory.push({
          type: 'output',
          text: `Degrees & Credentials:
• MCA - Vellore Institute of Technology, Bhopal (8.50 / 10 CGPA, 2023-2025)
• BCA - Nilamber-Pitamber University (72.25%, 2019-2022)
• ADCA - Advanced Diploma in Computer Application (Completed 2019)
• Enterprise Systems, RAG Pipelines, Azure AI & Full Stack Architecture Specializations`,
        });
        break;

      case 'health':
        newHistory.push({ type: 'output', text: '📡 Pinging MERN backend at /api/health...' });
        setHistory(newHistory);
        try {
          const apiUrl = import.meta.env.VITE_API_URL || '';
          const res = await fetch(`${apiUrl}/api/health`);
          const data = await res.json();
          setHistory((prev) => [
            ...prev,
            {
              type: 'success',
              text: `✔ Backend Status: ${data.status.toUpperCase()}
• Service: ${data.service}
• Database: ${data.database?.state} (Connected: ${data.database?.connected})
• Mailer Configured: ${data.mailer?.configured} (${data.mailer?.service})
• Uptime: ${data.uptime}`,
            },
          ]);
        } catch (err) {
          setHistory((prev) => [
            ...prev,
            {
              type: 'error',
              text: `✖ Could not reach backend: ${err.message}. Ensure backend is running on port 5001.`,
            },
          ]);
        }
        return;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Contact Abhiraj:
• Email: abhirajyadav303@gmail.com
• LinkedIn: https://www.linkedin.com/in/abhiraj-yadav-86a232215/
• GitHub: https://github.com/abhiraj100
• Portfolio Form: Scroll down to #contact to send a direct message!`,
        });
        break;

      case 'sudo hire':
      case 'hire':
        newHistory.push({
          type: 'success',
          text: `🎉 EXCELLENT DECISION!
Authorization granted. Abhiraj is ready to engineer high-impact products for your team.
Send an email directly to abhirajyadav303@gmail.com to start the conversation!`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `command not found: "${trimmed}". Type 'help' to view valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = commandIndex === -1 ? commandHistory.length - 1 : Math.max(0, commandIndex - 1);
      setCommandIndex(nextIdx);
      setInput(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex === -1) return;
      const nextIdx = commandIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setCommandIndex(-1);
        setInput('');
      } else {
        setCommandIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6">
      <div
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#070b19] shadow-2xl transition-all duration-300 ${
          isMaximized ? 'h-[94vh] w-[96vw]' : 'h-[540px] w-full max-w-3xl'
        }`}
      >
        {/* Title Bar */}
        <div className="flex h-11 items-center justify-between border-b border-white/10 bg-slate-950/80 px-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer hover:opacity-100" onClick={onClose} />
            <span
              className="h-3 w-3 rounded-full bg-yellow-500/80 cursor-pointer hover:opacity-100"
              onClick={() => setHistory([])}
              title="Clear history"
            />
            <span
              className="h-3 w-3 rounded-full bg-emerald-500/80 cursor-pointer hover:opacity-100"
              onClick={() => setIsMaximized(!isMaximized)}
              title="Maximize/Restore"
            />
            <div className="ml-3 flex items-center gap-2 text-xs font-mono font-medium text-slate-400">
              <TerminalIcon size={14} className="text-cyan-300" />
              <span>abhiraj@portfolio: ~ (bash)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="rounded p-1 hover:bg-white/10 hover:text-white"
              title="Toggle size"
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={onClose}
              className="rounded p-1 hover:bg-white/10 hover:text-white"
              title="Close terminal"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-slate-200 sm:text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div
              key={i}
              className={`mb-2 whitespace-pre-wrap ${
                line.type === 'system'
                  ? 'text-cyan-300'
                  : line.type === 'prompt'
                  ? 'text-emerald-400 font-semibold'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : line.type === 'success'
                  ? 'text-cyan-200 font-bold'
                  : 'text-slate-300'
              }`}
            >
              {line.text}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">abhiraj@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 outline-none border-none p-0 focus:ring-0"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Quick Shortcut Footer */}
        <div className="border-t border-white/5 bg-slate-950/60 px-4 py-2 text-[11px] font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>Quick actions:</span>
          <div className="flex flex-wrap gap-1.5">
            {['help', 'skills', 'projects', 'health', 'sudo hire', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="rounded bg-white/5 px-2 py-0.5 text-slate-400 hover:bg-cyan-400/20 hover:text-cyan-300 transition"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
