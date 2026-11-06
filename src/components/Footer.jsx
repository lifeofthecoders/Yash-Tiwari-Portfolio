import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { personalInfo, footerContent, openAdmin } = usePortfolio();

  return (
    <footer className="bg-[#0b0101] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-white/10">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1.5">
          {footerContent.taglines.map((line, i) => (
            <p key={i} className="text-white/80">{line}</p>
          ))}
        </div>
        
        <div className="flex flex-col gap-1.5 md:items-center">
          <p className="text-white font-bold">{footerContent.credential}</p>
          <a href="#projects" className="underline hover:text-[#f50604] transition-colors mt-1 underline-offset-4 decoration-1">
            Explore Project Roadmap
          </a>
        </div>
        
        <div className="flex flex-col gap-1.5 md:items-end">
          <p className="text-emerald-400 font-bold">Open to Learning &amp; Projects</p>
          <p className="text-white/60">Alwar · Rajasthan · Remote</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Brand Text */}
      <div className="w-full flex justify-center items-center py-16 md:py-24 overflow-hidden">
        <h2 className="text-[20vw] md:text-[18vw] leading-none font-sans font-black tracking-tighter lowercase select-none text-[#1b0303] hover:text-[#f50604]/20 transition-colors duration-700 w-full text-center">
          {personalInfo.brandName.toLowerCase()}
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-4">
          <a href="#top" className="underline hover:text-[#f50604] transition-colors underline-offset-4 decoration-1 font-bold">
            Back to Top ↑
          </a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            {footerContent.copyright}
          </p>
        </div>
        
        <div className="flex flex-col gap-3 md:items-center">
          <a href={`mailto:${personalInfo.emails.primary}`} className="underline hover:text-[#f50604] transition-colors underline-offset-4 decoration-1 lowercase">
            {personalInfo.emails.primary}
          </a>
          {/* Phone */}
          <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-white/70 hover:text-[#f50604] transition-colors">
            {personalInfo.phone}
          </a>
        </div>
        
        <div className="flex flex-col gap-2.5 md:items-end">
          <div className="flex items-center gap-2">
            <a 
              href="#contact"
              className="px-6 py-2 rounded-full border border-white/30 text-white font-bold hover:bg-[#f50604] hover:border-[#f50604] transition-all duration-300 tracking-wider text-center uppercase"
            >
              Get In Touch
            </a>
            {/* Discreet Admin Portal Access Button */}
            <button
              onClick={openAdmin}
              className="p-2 rounded-full border border-white/15 text-white/40 hover:text-[#f50604] hover:border-[#f50604]/50 transition-all text-xs"
              title="Client Admin Panel (Ctrl+Shift+A)"
              aria-label="Admin Access"
            >
              ⚙️
            </button>
          </div>
          <p className="text-white/50">B.Tech AI &amp; Data Science Student</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
