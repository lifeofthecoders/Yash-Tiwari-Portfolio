import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

// Custom Context-Specific Visual Representations for Yash's Technical Areas
const ProjectVisual = ({ type }) => {
  switch (type) {
    case 'algorithmic':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#1a0303] via-[#0d0101] to-black p-6 flex flex-col justify-between select-none opacity-85 group-hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f50604] animate-pulse"></span>
              <span className="text-xs font-mono text-white/90 font-bold uppercase tracking-wider">Algorithm &amp; Logic Suite</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">Python · DSA</span>
          </div>
          <div className="my-auto grid grid-cols-3 gap-3 py-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-[10px] text-white/50 block font-mono">Core Paradigms</span>
              <span className="text-base font-bold text-white font-heading">Search &amp; Sort</span>
              <span className="text-[9px] text-emerald-400 block mt-0.5">O(n log n)</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-[10px] text-white/50 block font-mono">Recursion Depth</span>
              <span className="text-base font-bold text-[#f50604] font-heading">Optimized</span>
              <span className="text-[9px] text-white/60 block mt-0.5">Memoization</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="text-[10px] text-white/50 block font-mono">Test Coverage</span>
              <span className="text-base font-bold text-white font-heading">Pass 100%</span>
              <span className="text-[9px] text-emerald-400 block mt-0.5">Verified Logic</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
            <span>Clean Code Architecture</span>
            <span>•</span>
            <span>Computational Thinking</span>
          </div>
        </div>
      );

    case 'web':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#180202] via-[#0a0101] to-black p-5 flex flex-col justify-between select-none opacity-85 group-hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-mono text-white/90 font-bold">Responsive Web Architecture</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f50604]/20 text-[#ff4d4d]">HTML5 · CSS3 · JS</span>
          </div>
          <div className="my-auto space-y-2 py-2">
            <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
            <div className="h-2 bg-white/10 rounded-full w-full"></div>
            <div className="h-2 bg-[#f50604]/40 rounded-full w-1/2"></div>
            <div className="flex gap-2 pt-2">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                <span className="text-xs font-bold text-white block">Flex &amp; Grid</span>
                <span className="text-[9px] text-white/50 font-mono">Fluid Viewports</span>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                <span className="text-xs font-bold text-[#f50604] block">Zero Overflow</span>
                <span className="text-[9px] text-white/50 font-mono">Clean DOM</span>
              </div>
            </div>
          </div>
          <span className="text-[9px] font-mono text-white/40">Tested on Mobile, Tablet &amp; Desktop</span>
        </div>
      );

    case 'data':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#160202] via-[#090101] to-black p-5 flex flex-col justify-between select-none opacity-85 group-hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-mono text-white/90 font-bold">Data Analytics &amp; EDA</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">Python · Pandas</span>
          </div>
          <div className="my-auto py-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/50 font-mono block">Data Pipeline</span>
                <span className="text-xs font-bold text-white">Statistical Distributions</span>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">Mean &amp; Variance</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-[10px] text-white/70 font-mono">
                ✓ Outlier Detection
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-[10px] text-white/70 font-mono">
                ✓ Visual Histograms
              </div>
            </div>
          </div>
          <span className="text-[9px] font-mono text-white/40">Exploratory Data Analysis Roadmap</span>
        </div>
      );

    case 'ai':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#150202] via-[#080101] to-black p-5 flex flex-col justify-between select-none opacity-85 group-hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-mono text-white/90 font-bold">Intelligent Agent Design</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Heuristic Search</span>
          </div>
          <div className="my-auto py-2 space-y-2">
            <div className="flex items-center justify-between bg-white/5 border border-white/10 p-2 rounded-lg">
              <span className="text-[11px] text-white font-medium">State-Space Search</span>
              <span className="text-[11px] text-[#f50604] font-bold">A* Heuristics</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 p-2 rounded-lg">
              <span className="text-[11px] text-white font-medium">Decision Tree Nodes</span>
              <span className="text-[11px] text-emerald-400 font-bold">Optimal Branch</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 p-2 rounded-lg">
              <span className="text-[11px] text-white font-medium">Knowledge Base</span>
              <span className="text-[11px] text-white font-bold">Stateful</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-white/40">B.Tech AI Specialization Core</span>
        </div>
      );

    case 'ml':
    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#200303] via-[#0d0101] to-black p-6 flex flex-col justify-between select-none opacity-85 group-hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f50604]"></span>
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                Machine Learning Predictive Modeling Lab
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
              Supervised Learning
            </span>
          </div>
          <div className="my-auto grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">📐</div>
              <span className="text-xs font-bold text-white block">Linear Regr.</span>
              <span className="text-[10px] text-white/50 font-mono">Gradient Descent</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">🌲</div>
              <span className="text-xs font-bold text-white block">Classifiers</span>
              <span className="text-[10px] text-white/50 font-mono">Random Forests</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">📊</div>
              <span className="text-xs font-bold text-white block">Evaluation</span>
              <span className="text-[10px] text-white/50 font-mono">Precision &amp; Recall</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">🔬</div>
              <span className="text-xs font-bold text-white block">Validation</span>
              <span className="text-[10px] text-white/50 font-mono">k-Fold Splits</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
            <span>B.Tech AI &amp; Data Science Research Trajectory</span>
            <span className="text-[#f50604] font-bold">Planned Implementation</span>
          </div>
        </div>
      );
  }
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#f50604]/50 hover:shadow-[0_20px_50px_rgba(245,6,4,0.25)] transition-all duration-500 bg-[#0d0101] flex flex-col justify-between ${
        project.isFlagship
          ? 'col-span-1 md:col-span-2 lg:col-span-3 min-h-[380px] md:min-h-[440px]'
          : 'col-span-1 min-h-[340px]'
      }`}
      onClick={() => onClick(project)}
    >
      {/* Background Project Image / Conceptual Visualization */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-95"
            loading="lazy"
          />
        ) : (
          <ProjectVisual type={project.visualType} />
        )}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25 group-hover:via-black/50 transition-all duration-500 z-10" />

      {/* Top Badge */}
      <div className="relative z-20 p-6 flex justify-between items-start">
        {project.badge ? (
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white bg-[#f50604] px-3.5 py-1.5 rounded-full border border-red-400/30 shadow-lg font-mono">
            {project.badge}
          </span>
        ) : (
          <span></span>
        )}
        <span className="text-[11px] font-mono text-white/70 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
          {project.duration}
        </span>
      </div>

      {/* Bottom Details Container */}
      <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs md:text-sm font-mono text-[#f50604] font-bold">
            {project.category}
          </span>
          <span className="text-white/40 text-xs font-mono">• {project.client}</span>
        </div>

        <h3 className="text-white text-2xl md:text-3xl font-black mb-3 tracking-tight font-heading group-hover:text-[#f50604] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-4 max-w-2xl opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-bold text-white/80 bg-white/5 rounded-full border border-white/10 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs font-bold text-white group-hover:text-[#f50604] transition-colors flex items-center gap-1 font-mono uppercase tracking-wider shrink-0 ml-3">
            Explore Overview →
          </span>
        </div>
      </div>
    </div>
  );
};

// Full Interactive Case Study / Roadmap Modal
const CaseStudyModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const { caseStudy } = project;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl p-6 md:p-10 shadow-[0_30px_80px_rgba(245,6,4,0.4)] my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#f50604] transition-all duration-300"
          aria-label="Close Project Modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 border-b border-white/10 pb-6 pr-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#f50604] font-bold uppercase tracking-wider mb-2">
            <span>Project Roadmap &amp; Architecture</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white font-heading tracking-tight">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mt-3">
            <span>Context: <strong className="text-white">{project.client}</strong></span>
            <span>Role: <strong className="text-white">{caseStudy.role}</strong></span>
            <span>Timeline: <strong className="text-white">{project.duration}</strong></span>
          </div>
        </div>

        <div className="space-y-6 text-white/80 text-sm md:text-base leading-relaxed">
          <div>
            <h4 className="text-white font-bold text-base font-heading mb-2 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f50604]"></span>
              Technical Problem &amp; Learning Motivation
            </h4>
            <p className="text-white/70 bg-white/5 border border-white/10 p-4 rounded-xl leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-base font-heading mb-2 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f50604]"></span>
              Planned Architecture &amp; Key Exercises
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseStudy.contributions.map((item, idx) => (
                <li key={idx} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-start gap-2.5 text-xs md:text-sm text-white/80">
                  <span className="text-[#f50604] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base font-heading mb-2 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f50604]"></span>
              Target Technical Outcome &amp; Academic Value
            </h4>
            <div className="bg-[#f50604]/10 border border-[#f50604]/30 p-4 rounded-xl text-white font-medium flex items-center justify-between">
              <span>{caseStudy.impact}</span>
              <span className="text-xs font-mono text-[#ff4d4d] font-bold px-3 py-1 bg-black/40 rounded-full border border-red-500/30 shrink-0 ml-4">
                B.Tech AI Milestone
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.techTags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-mono font-bold text-white bg-white/10 rounded-full border border-white/15">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#f50604] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#eb0803] transition-colors font-mono"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="bg-[#0a0101] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f50604]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#eb0803]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm uppercase font-mono tracking-widest">
            🚀 BUILDING NEXT · TECHNICAL ROADMAP
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight uppercase font-heading">
            Projects in Development
            <span className="font-editorial text-[#f50604] lowercase font-normal tracking-normal text-3xl md:text-5xl block mt-1">
              from foundational logic to intelligent systems
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Currently developing core programming and computer science competencies with practical technical projects planned throughout the B.Tech AI &amp; Data Science curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
