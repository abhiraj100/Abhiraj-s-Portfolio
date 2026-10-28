import { X, ExternalLink, Github, CheckCircle2, Cpu, Layers } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose, image }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] bg-[#070b1a] border border-cyan-400/30 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Image */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-900 shrink-0">
          <img src={image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a] via-[#070b1a]/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black/90 transition backdrop-blur"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-200 backdrop-blur">
              {project.tag || project.category}
            </span>
            <h2 className="text-2xl font-black text-white mt-2">{project.title}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-sm leading-relaxed">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300 font-mono mb-2">
              System Overview & Problem Solved
            </h3>
            <p className="text-slate-300 leading-7">{project.desc}</p>
          </div>

          {project.metrics && (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 flex items-center gap-3">
              <Cpu size={20} className="text-cyan-300 shrink-0" />
              <div>
                <p className="text-xs font-mono font-semibold text-cyan-200">Key Engineering Metric</p>
                <p className="text-sm font-bold text-white">{project.metrics}</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300 font-mono mb-3">
              Technical Stack & Modules
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack &&
                project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-3">
              Core Architectural Highlights
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Engineered with strict separation of concerns and modular service boundaries.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Optimized database queries and payload serialization for sub-100ms response latencies.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Container-ready architecture tested with automated workflows and CI/CD pipelines.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-slate-950/70 flex items-center justify-between gap-3">
          <a
            href={project.githubUrl || 'https://github.com/abhiraj100'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition"
          >
            <Github size={16} /> View Repository
          </a>
          <a
            href={project.liveUrl || 'https://github.com/abhiraj100'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20"
          >
            <ExternalLink size={16} /> Live Preview
          </a>
        </div>
      </div>
    </div>
  );
}
