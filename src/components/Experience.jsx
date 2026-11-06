import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const CertificateModal = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 w-full h-full z-50 bg-black/90 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-8 shadow-[0_20px_60px_rgba(245,6,4,0.3)] text-left"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#f50604] transition-colors"
        aria-label="Close Credential Details"
      >
        ✕
      </button>

      <div className="text-4xl mb-4 p-3 bg-[#f50604]/10 rounded-2xl inline-block border border-[#f50604]/30">
        {cert.icon}
      </div>

      <span className="text-xs font-mono text-[#f50604] uppercase font-bold tracking-wider block mb-1">
        {cert.issuer} · {cert.category}
      </span>

      <h3 className="text-2xl font-black text-white font-heading mb-2">
        {cert.title}
      </h3>

      <p className="text-white/70 text-sm leading-relaxed mb-6">
        {cert.description}
      </p>

      <div className="border-t border-white/10 pt-4">
        <span className="text-xs font-mono text-white/50 block mb-2 uppercase">Competencies &amp; Syllabi Covered:</span>
        <div className="flex flex-wrap gap-2">
          {cert.skills.map((skill) => (
            <span key={skill} className="px-2.5 py-1 text-xs font-mono text-white bg-white/10 rounded-full border border-white/10">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Experience = () => {
  const { educationData, certificatesData } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  const currentProgram = educationData[0] || {};
  const pastEducation = educationData.slice(1);

  return (
    <section id="experience" className="bg-[#0e0202] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-white/10">
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#f50604]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-20 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm uppercase font-mono tracking-widest">
            📈 ACADEMIC JOURNEY &amp; CREDENTIALS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-heading">
            Academic Track
            <span className="font-editorial text-[#f50604] lowercase font-normal tracking-normal text-3xl md:text-5xl block mt-1">
              foundations in Artificial Intelligence &amp; Data Science
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed mt-3">
            Pursuing a B.Tech in Artificial Intelligence &amp; Data Science at JECRC University backed by distinguished secondary school academic records.
          </p>
        </div>

        {/* Current University Program Card */}
        {currentProgram.degree && (
          <div
            data-aos="fade-up"
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 mb-16 hover:border-[#f50604]/40 transition-all duration-500 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-xs font-mono text-[#f50604] font-bold uppercase tracking-widest block mb-1">
                  Undergraduate Engineering Program
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white font-heading">
                  {currentProgram.degree}
                </h3>
                <div className="flex items-center gap-3 text-sm font-mono text-white/70 mt-1">
                  <span className="text-white font-bold">{currentProgram.institution}</span>
                  <span>•</span>
                  <span>{currentProgram.location}</span>
                </div>
              </div>
              <div className="flex flex-col md:items-end">
                <span className="px-4 py-1.5 rounded-full bg-[#f50604]/20 border border-[#f50604]/40 text-[#ff4d4d] font-mono text-xs font-bold uppercase tracking-wider">
                  {currentProgram.year}
                </span>
                <span className="text-xs font-mono text-emerald-400 mt-1 font-bold">
                  {currentProgram.grade}
                </span>
              </div>
            </div>

            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
              {currentProgram.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 bg-black/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[#f50604] font-bold text-base mt-0.5">▪</span>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Developing foundational mastery of programming logic, control structures, and computational thinking in Python.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[#f50604] font-bold text-base mt-0.5">▪</span>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Exploring introductory principles of artificial intelligence, intelligent systems, and machine learning architectures.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[#f50604] font-bold text-base mt-0.5">▪</span>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Learning core computer science foundations, algorithms, data structures, and computer organization.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[#f50604] font-bold text-base mt-0.5">▪</span>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Practicing disciplined problem solving, mathematical foundations, and exploring frontend web technologies.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {["Artificial Intelligence", "Data Science", "Python", "Algorithms", "Programming Logic", "Computer Science", "Web Development"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-mono font-bold text-white/70 bg-white/5 rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div data-aos="fade-right" className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <span className="text-2xl">🎓</span>
              <h3 className="text-xl font-black text-white uppercase font-heading tracking-tight">
                Academic Background
              </h3>
            </div>

            <div className="space-y-6">
              {pastEducation.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-[#f50604] pl-4">
                  <span className="text-xs font-mono text-[#f50604] font-bold">{edu.year}</span>
                  <h4 className="text-base font-bold text-white font-heading mt-0.5">{edu.degree}</h4>
                  <p className="text-xs text-white/70 font-mono mt-0.5">{edu.institution}, {edu.location}</p>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{edu.description}</p>
                  <span className="inline-block text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mt-2 font-bold">
                    {edu.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div data-aos="fade-left" className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <h3 className="text-xl font-black text-white uppercase font-heading tracking-tight">
                  Credentials in Progress
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">Click to expand</span>
            </div>

            <div className="space-y-4">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-black/40 border border-white/10 rounded-2xl p-4 hover:border-[#f50604] hover:scale-[1.02] cursor-pointer transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                      {cert.icon}
                    </span>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white group-hover:text-[#f50604] transition-colors font-heading">
                        {cert.title}
                      </h4>
                      <span className="text-xs text-white/50 font-mono">{cert.issuer} · {cert.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                    View Details →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
