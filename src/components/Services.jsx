import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const TagCard = ({ number, title, status, text, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;
    
    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div 
      ref={ref}
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-84 rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 z-10 ${className} ${
        isActive ? 'bg-[#f50604] border-red-500 shadow-[0_20px_50px_rgba(245,6,4,0.4)]' : 'bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* Hole punch */}
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
      </div>
      
      {/* Inner container */}
      <div className={`w-full h-full rounded-[1.5rem] mt-8 p-6 sm:p-7 flex flex-col min-h-[220px] transition-colors duration-700 ${
        isActive ? 'bg-red-900/60 text-white' : 'bg-[#f7f7f7] text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xl font-bold font-serif italic transition-colors duration-700 ${
            isActive ? 'text-red-200' : 'text-[#f50604]'
          }`}>{number}</span>
          {status && (
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-gray-700'
            }`}>
              {status}
            </span>
          )}
        </div>
        
        <h3 className={`text-xl font-black mb-3 tracking-tight font-heading transition-colors duration-700 ${
          isActive ? 'text-white' : 'text-gray-900'
        }`}>{title}</h3>
        
        <p className={`text-xs md:text-sm leading-relaxed font-medium transition-colors duration-700 ${
          isActive ? 'text-red-100' : 'text-gray-600'
        }`}>
          {text}
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  const { skillsContent } = usePortfolio();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // 6-Step timeline path coordinates
  const pathD = "M 700,100 C 450,200 200,280 300,420 C 400,560 750,540 700,740 C 650,920 200,900 300,1080 C 400,1240 720,1260 680,1420 C 620,1580 250,1600 320,1740 C 380,1860 500,1880 500,1920";

  return (
    <section 
      id="process"
      ref={containerRef}
      className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto relative md:h-[2000px]">
        
        {/* Header Content */}
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-700 font-bold mb-6 shadow-sm bg-white uppercase font-mono tracking-wider">
            {skillsContent.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-[1.1] mb-6 tracking-tight font-heading relative">
            {skillsContent.heading}
            <svg className="absolute -bottom-10 right-10 w-12 h-12 text-[#f50604]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            {skillsContent.description}
          </p>
        </div>

        {/* Desktop SVG Animated Dashed Line */}
        <svg 
          className="hidden md:block absolute top-0 left-0 w-full h-[1950px] pointer-events-none z-0" 
          viewBox="0 0 1000 1950" 
          preserveAspectRatio="none"
        >
          <path 
            d={pathD} 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="2" 
            strokeDasharray="8 10" 
          />

          <mask id="path-mask">
            <motion.path 
              d={pathD} 
              fill="none" 
              stroke="white" 
              strokeWidth="20" 
              style={{ pathLength }}
            />
          </mask>

          <path 
            d={pathD} 
            fill="none" 
            stroke="#f50604" 
            strokeWidth="3" 
            strokeDasharray="8 10" 
            mask="url(#path-mask)"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Mobile Animated Vertical Dashed Line */}
        <svg 
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" 
          viewBox="0 0 4 100" 
          preserveAspectRatio="none"
        >
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            vectorEffect="non-scaling-stroke"
          />
          <mask id="path-mask-mobile">
            <motion.path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="white" 
              strokeWidth="4" 
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="#f50604" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            mask="url(#path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Cards Container */}
        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          {skillsContent.cards.map((card, index) => {
            const positions = [
              "md:absolute md:top-[10px] md:right-[5%] lg:right-[8%] rotate-2 md:rotate-6",
              "md:absolute md:top-[340px] md:left-[5%] lg:left-[8%] -rotate-2 md:-rotate-6",
              "md:absolute md:top-[680px] md:right-[5%] lg:right-[12%] rotate-1 md:rotate-3",
              "md:absolute md:top-[1020px] md:left-[5%] lg:left-[12%] -rotate-1 md:-rotate-3",
              "md:absolute md:top-[1360px] md:right-[8%] lg:right-[10%] rotate-2 md:rotate-4",
              "md:absolute md:top-[1680px] md:left-[8%] lg:left-[10%] -rotate-2 md:-rotate-4",
            ];
            const aosTypes = ["fade-left", "fade-right", "fade-left", "fade-right", "fade-left", "fade-right"];
            const aosDelays = ["100", "200", "300", "400", "500", "600"];

            return (
              <TagCard 
                key={card.number}
                number={card.number}
                title={card.title}
                status={card.status}
                text={card.text}
                className={positions[index]}
                aosType={aosTypes[index]}
                aosDelay={aosDelays[index]}
                pathLength={pathLength}
                containerRef={containerRef}
              />
            );
          })}

          <div 
            data-aos="fade-in" 
            data-aos-delay="700"
            className="hidden md:block absolute top-[1930px] left-[38%] font-cursive text-4xl text-[#f50604] rotate-3 font-bold"
          >
            {skillsContent.endText}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
