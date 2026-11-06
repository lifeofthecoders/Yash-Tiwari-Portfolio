import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

// Technology Icon Helper
const TechIcon = ({ name }) => {
  switch (name) {
    case 'Python Basics':
      return (
        <div className="w-8 h-8 bg-[#08233a] border border-[#38bdf8] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#38bdf8] select-none shrink-0 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
          Py
        </div>
      );
    case 'Programming Fundamentals':
    case 'Problem Solving':
      return (
        <div className="w-8 h-8 bg-[#250505] border border-[#f50604] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#f50604] select-none shrink-0 shadow-[0_0_10px_rgba(245,6,4,0.25)]">
          &lt;/&gt;
        </div>
      );
    case 'Algorithms & Data Structures':
      return (
        <div className="w-8 h-8 bg-[#221002] border border-[#f97316] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#f97316] select-none shrink-0">
          DSA
        </div>
      );
    case 'AI Fundamentals':
    case 'Introduction to Machine Learning':
      return (
        <div className="w-8 h-8 bg-[#001c2b] border border-[#00d8ff] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#00d8ff] select-none shrink-0 shadow-[0_0_10px_rgba(0,216,255,0.25)]">
          AI
        </div>
      );
    case 'Data Science Concepts':
    case 'Data Analysis Principles':
      return (
        <div className="w-8 h-8 bg-[#180a29] border border-[#a855f7] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#a855f7] select-none shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.25)]">
          DS
        </div>
      );
    case 'HTML5 & Semantic Markup':
      return (
        <div className="w-8 h-8 bg-[#2b0c03] border border-[#e34f26] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#e34f26] select-none shrink-0">
          H5
        </div>
      );
    case 'CSS3 & Modern Styling':
      return (
        <div className="w-8 h-8 bg-[#001b33] border border-[#264de4] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#264de4] select-none shrink-0">
          CSS
        </div>
      );
    case 'Web Development Fundamentals':
    case 'Frontend Development Concepts':
      return (
        <div className="w-8 h-8 bg-[#00222a] border border-[#06b6d4] rounded-md flex items-center justify-center font-mono font-black text-[10px] text-[#06b6d4] select-none shrink-0">
          WEB
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 bg-zinc-800 rounded-md flex items-center justify-center font-mono font-bold text-[10px] text-[#f50604] shrink-0 border border-white/10">
          ✦
        </div>
      );
  }
};

// Status Badge Styling Helper
const getStatusBadge = (status) => {
  switch (status) {
    case 'Active Focus':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Foundational':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'In Progress':
    case 'Active Learning':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'Exploring':
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    case 'Proven':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    default:
      return 'bg-white/10 text-white/80 border-white/15';
  }
};

const SkillNode = ({ name, status, tag }) => (
  <div className="mb-5 flex flex-col group p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors">
    <div className="flex justify-between items-center mb-1.5">
      <div className="flex items-center gap-3">
        <TechIcon name={name} />
        <div>
          <span className="text-white text-sm font-semibold tracking-wide block">{name}</span>
          {tag && <span className="text-white/40 text-[10px] font-mono">{tag}</span>}
        </div>
      </div>
      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(status)}`}>
        {status}
      </span>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
      <div className="h-full bg-gradient-to-r from-[#f50604] to-[#ff4d4d] rounded-full w-full opacity-60 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

const SkillCard = ({ category, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.01] hover:border-[#f50604]/40 hover:shadow-[0_20px_50px_rgba(245,6,4,0.15)] transition-all duration-500"
  >
    <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
      <h3 className="text-white text-base md:text-lg font-black tracking-tight uppercase font-heading">
        {category.title}
      </h3>
      <span className="w-2 h-2 rounded-full bg-[#f50604]"></span>
    </div>
    <div>
      {category.skills.map((skill) => (
        <SkillNode key={skill.name} name={skill.name} status={skill.status} tag={skill.tag} />
      ))}
    </div>
  </div>
);

const TechnicalSkills = () => {
  const { technicalSkills } = usePortfolio();

  return (
    <section id="skills" className="bg-[#0a0101] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Background visual red glow elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#f50604]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#eb0803]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm uppercase tracking-widest font-mono">
            ⚙️ TECHNICAL &amp; COMPUTATIONAL STACK
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase font-heading">
            Foundations &amp; Focus
            <span className="font-editorial text-[#f50604] lowercase font-normal tracking-normal text-3xl md:text-4xl block mt-1">
              built with intent &amp; academic rigor
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Curated technical competencies, computer science fundamentals, and academic coursework across AI, data science, and programming.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {technicalSkills.categories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
