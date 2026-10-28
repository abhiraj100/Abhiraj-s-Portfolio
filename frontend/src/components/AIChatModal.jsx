import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';

export default function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Hi there! I'm Abhiraj's Portfolio AI Copilot. Ask me anything about his full-stack engineering background, AI & RAG projects like DevPilot AI, or his availability for open roles!",
      suggestions: [
        'What are his core skills?',
        'Tell me about DevPilot AI',
        'Is Abhiraj available for hire?',
        'Where did he study?',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Chat service unavailable');

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: data.reply,
          suggestions: data.suggestions || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `I'm having trouble connecting to the backend right now (${err.message}). You can always email Abhiraj directly at abhirajyadav303@gmail.com!`,
          suggestions: ['How to contact Abhiraj?'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="relative flex flex-col w-full sm:w-[420px] h-[600px] max-h-[90vh] bg-[#070b1a] border border-cyan-400/25 sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-slate-950 shadow-md shadow-cyan-400/20">
              <Sparkles size={19} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Abhiraj AI Copilot
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-slate-400">GenAI & Portfolio Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                  <Bot size={15} />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl p-3.5 whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium shadow-md'
                    : 'bg-slate-900/90 border border-white/10 text-slate-200'
                }`}
              >
                {m.text}

                {/* Suggestions Chips */}
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                    {m.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-[11px] font-medium text-cyan-300 hover:bg-cyan-400/15 transition text-left"
                      >
                        <span>{sug}</span>
                        <ArrowRight size={10} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {m.sender === 'user' && (
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-slate-200">
                  <User size={15} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-cyan-300 text-xs">
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking & formulating response...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-white/10 bg-slate-950/70 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Abhiraj's stack, projects, roles..."
            className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-slate-950 disabled:opacity-40 hover:bg-cyan-300 transition shrink-0"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
