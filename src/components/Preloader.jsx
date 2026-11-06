import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const Preloader = () => {
  const { personalInfo } = usePortfolio();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#f50604] z-[100000] flex items-center justify-center"
        >
          {/* Logo Container */}
          <motion.div
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative text-5xl md:text-7xl font-black tracking-tighter"
          >
            {/* Background text (empty state) */}
            <div className="text-red-950/40 select-none">
              {personalInfo.brandName}<span className="text-red-950/40">.</span>
            </div>

            {/* Foreground text (water fill state) */}
            <motion.div
              className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap select-none"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
            >
              {personalInfo.brandName}<span className="text-black">.</span>
            </motion.div>
          </motion.div>

          {/* Subtle bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-12 text-center text-xs font-mono uppercase tracking-widest text-white/90"
          >
            {personalInfo.shortTitle || "AI & Data Science Student"} · {personalInfo.university.split(',')[0]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
