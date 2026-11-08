import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { hasContent, contentItems, additionalTextFields } from '../utils/content';
import EditableExtras from './EditableExtras';

const CertificateModal = ({ cert, onClose, content }) => (
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
        aria-label={content?.modalCloseLabel || undefined}
      >
        ✕
      </button>

      {hasContent(cert.imageUrl) ? <img src={cert.imageUrl} alt={cert.imageAlt || cert.title || ''} className="w-full max-h-64 object-contain rounded-2xl mb-4 border border-white/10 bg-black/30" /> : hasContent(cert.icon) && <div className="text-4xl mb-4 p-3 bg-[#f50604]/10 rounded-2xl inline-block border border-[#f50604]/30">{cert.icon}</div>}
      {(hasContent(cert.issuer) || hasContent(cert.category)) && <span className="text-xs font-mono text-[#f50604] uppercase font-bold tracking-wider block mb-1">{[cert.issuer, cert.category].filter(hasContent).join(' · ')}</span>}
      {hasContent(cert.title) && <h3 className="text-2xl font-black text-white font-heading mb-2">{cert.title}</h3>}
      {hasContent(cert.description) && <p className="text-white/70 text-sm leading-relaxed mb-6">{cert.description}</p>}
      {contentItems(cert.skills).filter(hasContent).length > 0 && <div className="border-t border-white/10 pt-4">
        {hasContent(content?.competenciesLabel) && <span className="text-xs font-mono text-white/50 block mb-2 uppercase">{content.competenciesLabel}</span>}
        <div className="flex flex-wrap gap-2">{contentItems(cert.skills).filter(hasContent).map((skill, index) => <span key={`${skill}-${index}`} className="px-2.5 py-1 text-xs font-mono text-white bg-white/10 rounded-full border border-white/10">{skill}</span>)}</div>
      </div>}
      <EditableExtras data={cert} knownKeys={['id', 'title', 'issuer', 'category', 'icon', 'imageUrl', 'imageAlt', 'description', 'skills']} className="flex flex-wrap gap-x-3 gap-y-1 mt-4 text-[10px] text-white/60 font-mono" labelClassName="text-white/80 font-bold" />
    </div>
  </motion.div>
);

const Experience = () => {
  const { educationData, certificatesData, educationContent } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  const records = contentItems(educationData).filter((record) => Object.entries(record || {}).some(([key, value]) => key !== 'isCurrent' && hasContent(value)));
  const certificates = contentItems(certificatesData).filter((cert) => [cert.title, cert.issuer, cert.category, cert.description, cert.icon, cert.imageUrl].some(hasContent) || contentItems(cert.skills).some(hasContent) || additionalTextFields(cert, ['id', 'title', 'issuer', 'category', 'icon', 'imageUrl', 'imageAlt', 'description', 'skills']).length > 0);
  const currentProgram = records.find((record) => record.isCurrent === true) || records[0] || null;
  const currentProgramExtras = currentProgram ? additionalTextFields(currentProgram, ['isCurrent', 'year', 'degree', 'institution', 'location', 'grade', 'category', 'description']) : [];
  const pastEducation = records.filter((record) => record !== currentProgram);

  return (
    <section id="experience" className="bg-[#0e0202] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-white/10">
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#f50604]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-20 text-center">
          {hasContent(educationContent?.sectionBadge) && <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm uppercase font-mono tracking-widest">{educationContent.sectionBadge}</div>}
          {(hasContent(educationContent?.heading) || hasContent(educationContent?.accentLine)) && <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-heading">{hasContent(educationContent?.heading) && educationContent.heading}{hasContent(educationContent?.accentLine) && <span className="font-editorial text-[#f50604] lowercase font-normal tracking-normal text-3xl md:text-5xl block mt-1">{educationContent.accentLine}</span>}</h2>}
          {hasContent(educationContent?.description) && <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed mt-3">{educationContent.description}</p>}
          <EditableExtras data={educationContent} knownKeys={['sectionBadge', 'heading', 'accentLine', 'description', 'currentProgramLabel', 'highlights', 'competencyTags', 'academicBackgroundTitle', 'credentialsTitle', 'expandHint', 'viewDetailsLabel', 'competenciesLabel', 'modalCloseLabel']} className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-white/50 font-mono mt-3" />
        </div>

        {/* Current University Program Card */}
        {currentProgram && (
          <div
            data-aos="fade-up"
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 mb-16 hover:border-[#f50604]/40 transition-all duration-500 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                {hasContent(educationContent?.currentProgramLabel) && <span className="text-xs font-mono text-[#f50604] font-bold uppercase tracking-widest block mb-1">{educationContent.currentProgramLabel}</span>}
                {hasContent(currentProgram.degree) && <h3 className="text-2xl md:text-3xl font-black text-white font-heading">{currentProgram.degree}</h3>}
                {(hasContent(currentProgram.institution) || hasContent(currentProgram.location) || hasContent(currentProgram.category)) && <div className="flex items-center gap-3 text-sm font-mono text-white/70 mt-1 flex-wrap">{hasContent(currentProgram.institution) && <span className="text-white font-bold">{currentProgram.institution}</span>}{hasContent(currentProgram.institution) && hasContent(currentProgram.location) && <span>•</span>}{hasContent(currentProgram.location) && <span>{currentProgram.location}</span>}{hasContent(currentProgram.category) && <span>{currentProgram.category}</span>}</div>}
              </div>
              <div className="flex flex-col md:items-end">
                {hasContent(currentProgram.year) && <span className="px-4 py-1.5 rounded-full bg-[#f50604]/20 border border-[#f50604]/40 text-[#ff4d4d] font-mono text-xs font-bold uppercase tracking-wider">{currentProgram.year}</span>}
                {hasContent(currentProgram.grade) && <span className="text-xs font-mono text-emerald-400 mt-1 font-bold">{currentProgram.grade}</span>}
              </div>
            </div>

            {currentProgramExtras.length > 0 && <EditableExtras data={currentProgram} knownKeys={['isCurrent', 'year', 'degree', 'institution', 'location', 'grade', 'category', 'description']} className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70 font-mono mb-5" labelClassName="text-white font-bold" />}
            {hasContent(currentProgram.description) && <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">{currentProgram.description}</p>}

            {contentItems(educationContent?.highlights).filter(hasContent).length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {contentItems(educationContent.highlights).filter(hasContent).map((highlight, index) => <div key={index} className="flex items-start gap-3 bg-black/30 border border-white/5 p-4 rounded-xl"><span className="text-[#f50604] font-bold text-base mt-0.5">▪</span><p className="text-xs md:text-sm text-white/80 leading-relaxed">{highlight}</p></div>)}
            </div>}

            {contentItems(educationContent?.competencyTags).filter(hasContent).length > 0 && <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {contentItems(educationContent.competencyTags).filter(hasContent).map((tag, index) => <span key={`${tag}-${index}`} className="px-3 py-1 text-xs font-mono font-bold text-white/70 bg-white/5 rounded-full border border-white/10">{tag}</span>)}
            </div>}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pastEducation.length > 0 && <div data-aos="fade-right" className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <span className="text-2xl">🎓</span>
              {hasContent(educationContent?.academicBackgroundTitle) && <h3 className="text-xl font-black text-white uppercase font-heading tracking-tight">{educationContent.academicBackgroundTitle}</h3>}
            </div>

            <div className="space-y-6">
              {pastEducation.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-[#f50604] pl-4">
                  {hasContent(edu.year) && <span className="text-xs font-mono text-[#f50604] font-bold">{edu.year}</span>}
                  {hasContent(edu.degree) && <h4 className="text-base font-bold text-white font-heading mt-0.5">{edu.degree}</h4>}
                  {[edu.institution, edu.location, edu.category].some(hasContent) && <p className="text-xs text-white/70 font-mono mt-0.5">{[edu.institution, edu.location, edu.category].filter(hasContent).join(', ')}</p>}
                  {hasContent(edu.description) && <p className="text-xs text-white/60 mt-1 leading-relaxed">{edu.description}</p>}
                  <EditableExtras data={edu} knownKeys={['isCurrent', 'year', 'degree', 'institution', 'location', 'grade', 'category', 'description']} className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/60 mt-1" labelClassName="text-white/80 font-bold" />
                  {hasContent(edu.grade) && <span className="inline-block text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mt-2 font-bold">{edu.grade}</span>}
                </div>
              ))}
            </div>
          </div>}

          {certificates.length > 0 && <div data-aos="fade-left" className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                {hasContent(educationContent?.credentialsTitle) && <h3 className="text-xl font-black text-white uppercase font-heading tracking-tight">{educationContent.credentialsTitle}</h3>}
              </div>
              {hasContent(educationContent?.expandHint) && <span className="text-xs font-mono text-white/40">{educationContent.expandHint}</span>}
            </div>

            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <div
                  key={cert.id || `${cert.title || 'credential'}-${index}`}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-black/40 border border-white/10 rounded-2xl p-4 hover:border-[#f50604] hover:scale-[1.02] cursor-pointer transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    {hasContent(cert.imageUrl) ? <img src={cert.imageUrl} alt={cert.imageAlt || cert.title || ''} className="w-12 h-12 object-cover rounded-xl border border-white/10" /> : hasContent(cert.icon) && <span className="text-2xl p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">{cert.icon}</span>}
                    <div>
                      {hasContent(cert.title) && <h4 className="text-sm md:text-base font-bold text-white group-hover:text-[#f50604] transition-colors font-heading">{cert.title}</h4>}
                      {[cert.issuer, cert.category].some(hasContent) && <span className="text-xs text-white/50 font-mono">{[cert.issuer, cert.category].filter(hasContent).join(' · ')}</span>}
                      <EditableExtras data={cert} knownKeys={['id', 'title', 'issuer', 'category', 'icon', 'imageUrl', 'imageAlt', 'description', 'skills']} className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-[9px] text-white/45 font-mono" />
                    </div>
                  </div>
                  {hasContent(educationContent?.viewDetailsLabel) && <span className="text-xs font-mono text-white/40 group-hover:text-white transition-colors">{educationContent.viewDetailsLabel}</span>}
                </div>
              ))}
            </div>
          </div>}
        </div>

      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} content={educationContent} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
