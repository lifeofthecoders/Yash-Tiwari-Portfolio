import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const SoftSkillCard = ({ skill, index }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={index * 80}
    className="bg-[#f8f8f8] border border-gray-200 rounded-3xl p-6 hover:scale-[1.03] hover:bg-white hover:border-[#f50604]/40 hover:shadow-[0_20px_45px_rgba(245,6,4,0.1)] transition-all duration-500 group flex flex-col items-center text-center justify-between min-h-[220px]"
  >
    <div className="flex flex-col items-center w-full">
      <div className="text-3xl mb-4 p-3 bg-gray-100 rounded-2xl group-hover:bg-[#f50604]/10 group-hover:scale-110 transition-all duration-300">
        {skill.icon}
      </div>
      <h3 className="text-gray-900 text-base md:text-lg font-black tracking-tight mb-2 uppercase font-heading">
        {skill.name}
      </h3>
      <p className="text-gray-600 text-xs md:text-sm font-medium leading-relaxed">
        {skill.desc}
      </p>
    </div>
  </div>
);

const SoftSkills = () => {
  const { softSkillsList } = usePortfolio();

  return (
    <section className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:60px_60px]">
      
      {/* Top paper divider */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-10 transform -translate-y-[1px] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-[#0e0202]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-700 font-bold mb-6 shadow-sm bg-white uppercase font-mono tracking-wider">
            ⚡ CORE COGNITIVE &amp; TECHNICAL STRENGTHS
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight mb-4 uppercase font-heading">
            Personal Strengths
            <span className="font-editorial text-[#f50604] lowercase font-normal tracking-normal text-3xl md:text-4xl block mt-1">
              curiosity, consistency &amp; analytical rigor
            </span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Essential cognitive strengths and self-directed disciplines developed through academic dedication and continuous study.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkillsList.map((skill, index) => (
            <SoftSkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;
