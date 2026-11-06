import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar = () => {
  const { personalInfo } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#top' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Roadmap', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'Academics', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isOpen
          ? 'bg-[#f50604] py-4 shadow-2xl'
          : isScrolled
          ? 'bg-black/80 backdrop-blur-md py-3.5 border-b border-white/10 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Left Side: Logo/Name */}
        <div className="flex items-center">
          <a href="#top" className="text-white text-2xl font-black tracking-tight whitespace-nowrap group">
            {personalInfo.brandName}
            <span className="text-[#f50604] group-hover:text-white transition-colors duration-300">.</span>
          </a>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium relative group transition-colors duration-300"
            >
              {link.name}
              {/* Smooth red hover underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f50604] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Side: CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`mailto:${personalInfo.emails.primary}`}
            className="p-2 text-white/70 hover:text-[#f50604] hover:scale-110 transition-all duration-300"
            aria-label="Direct Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-5 py-2 text-sm rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-md shadow-sm"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[460px] py-6 opacity-100 bg-[#f50604] shadow-2xl' : 'max-h-0 opacity-0 bg-transparent'
        }`}
      >
        <div className="flex flex-col px-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black font-bold text-lg border-b border-white/20 pb-2.5 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 pb-2 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-3 rounded-full bg-white text-[#f50604] font-black hover:bg-black hover:text-white transition-colors w-full text-center shadow-lg text-sm uppercase tracking-wider"
            >
              Get In Touch
            </a>
            <a
              href={personalInfo.resumeUrl}
              download
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-2.5 rounded-full border border-white text-white font-bold hover:bg-white/20 transition-colors w-full text-center text-sm"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
