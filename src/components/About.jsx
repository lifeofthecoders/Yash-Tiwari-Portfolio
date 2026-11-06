import React from 'react';
import stackImage from '../assets/about/yash-avatar.png';
import { usePortfolio } from '../context/PortfolioContext';

// Technology Badges with crisp SVG styling tailored for Yash
const PythonIcon = () => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#08233a] border-2 border-[#38bdf8] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:scale-110 transition-transform duration-300">
      <span className="text-[#38bdf8] text-2xl md:text-3xl font-black font-mono select-none">Py</span>
    </div>
    <span className="text-xs font-bold text-white/90 uppercase tracking-wider font-mono">Python</span>
  </div>
);

const LogicIcon = () => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#252000] border-2 border-[#f7df1e] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(247,223,30,0.3)] group-hover:scale-110 transition-transform duration-300">
      <span className="text-[#f7df1e] text-2xl md:text-3xl font-black font-mono select-none">&lt;/&gt;</span>
    </div>
    <span className="text-xs font-bold text-white/90 uppercase tracking-wider font-mono">Logic &amp; CS</span>
  </div>
);

const WebIcon = () => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2b0c03] border-2 border-[#e34f26] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(227,79,38,0.3)] group-hover:scale-110 transition-transform duration-300">
      <span className="text-[#e34f26] text-xl md:text-2xl font-black font-mono select-none">Web</span>
    </div>
    <span className="text-xs font-bold text-white/90 uppercase tracking-wider font-mono">HTML / CSS</span>
  </div>
);

const DataIcon = () => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#001c2b] border-2 border-[#00d8ff] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,216,255,0.3)] group-hover:scale-110 transition-transform duration-300">
      <span className="text-[#00d8ff] text-2xl md:text-3xl font-black font-mono select-none">AI+DS</span>
    </div>
    <span className="text-xs font-bold text-white/90 uppercase tracking-wider font-mono">Data Science</span>
  </div>
);

const About = () => {
  const { aboutContent, personalInfo } = usePortfolio();

  return (
    <section id="about" className="bg-[#f50604] pt-28 md:pt-24 pb-44 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        {/* Left Side: ID Badge with Swinging Drop-Bounce Animation */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-8 md:mt-0">
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            {/* Lanyard strap */}
            <div className="absolute -top-24 md:-top-36 left-1/2 w-2.5 md:w-3.5 h-28 md:h-44 bg-black transform -translate-x-1/2 shadow-inner z-0"></div>
            {/* Lanyard metal clip */}
            <div className="absolute -top-4 md:-top-6 left-1/2 w-4 md:w-6 h-8 md:h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"></div>

            {/* Badge Card */}
            <div className="bg-gray-950 w-full max-w-[230px] xs:max-w-[250px] md:max-w-[290px] rounded-2xl p-3.5 shadow-[0_25px_50px_rgba(0,0,0,0.5)] relative z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500 border border-white/10">
              {/* Lanyard Cutout Slot */}
              <div className="absolute -top-2.5 md:-top-3.5 left-1/2 w-12 md:w-16 h-4 md:h-6 bg-gray-950 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-6 h-1.5 bg-black/40 rounded-full shadow-inner"></div>
              </div>
              {/* Image Container */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                <img
                  src={stackImage}
                  alt="Yash Tiwari — AI & Data Science Student"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Badge Bottom Metadata */}
              <div className="mt-3 text-center">
                <div className="text-white text-xs font-bold uppercase tracking-wider font-mono">
                  {personalInfo.name}
                </div>
                <div className="text-red-400 text-[10px] font-mono mt-0.5">
                  {personalInfo.shortTitle || "AI & Data Science"} · {personalInfo.university.split(',')[0]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Info Content */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">
          
          <div className="inline-block px-3.5 py-1 rounded-full bg-black/30 border border-white/20 text-xs uppercase tracking-widest font-mono font-bold mb-4">
            About {personalInfo.firstName}
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight font-heading">
            {aboutContent.heading}
            <span className="block font-cursive text-black text-3xl md:text-5xl font-normal tracking-normal mt-1">
              curiosity meets discipline.
            </span>
          </h2>

          <p
            className="text-base md:text-lg font-medium mb-10 leading-relaxed max-w-3xl text-red-50/95"
            dangerouslySetInnerHTML={{ __html: aboutContent.bio }}
          />

          {/* Quick Metrics Tagline */}
          <div className="p-4 rounded-xl bg-black/20 border border-white/15 max-w-2xl mb-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-white font-bold block text-sm">University &amp; Term</span>
              <span className="text-white/80">{personalInfo.university} · {personalInfo.semester}</span>
            </div>
            <div>
              <span className="text-white font-bold block text-sm">Degree Program</span>
              <span className="text-white/80">B.Tech in AI &amp; Data Science</span>
            </div>
            <div>
              <span className="text-white font-bold block text-sm">High School Record</span>
              <span className="text-white/80">88% (12th) · 91% (10th)</span>
            </div>
          </div>

          {/* Horizontal Skills Badges Row */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-6">
            <div data-aos="zoom-in" data-aos-delay="300" className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl">
              <PythonIcon />
            </div>
            <div data-aos="zoom-in" data-aos-delay="400" className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl">
              <LogicIcon />
            </div>
            <div data-aos="zoom-in" data-aos-delay="500" className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl">
              <WebIcon />
            </div>
            <div data-aos="zoom-in" data-aos-delay="600" className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl">
              <DataIcon />
            </div>
          </div>

        </div>
      </div>

      {/* Torn paper divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-[#0a0101]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Decorative pulse stars from reference */}
      <div className="absolute top-10 right-10 md:right-20 text-black opacity-20 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-black opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default About;
