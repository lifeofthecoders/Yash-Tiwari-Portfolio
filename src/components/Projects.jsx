import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { hasContent, contentItems, additionalTextFields } from '../utils/content';
import EditableExtras from './EditableExtras';

// The preview keeps the original dark visual language while every caption is editable in the CMS.
const ProjectVisual = ({ project }) => {
  const visual = project.visualContent || {};
  const items = contentItems(visual.items).filter((item) => hasContent(item.label) || hasContent(item.value) || hasContent(item.detail));
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1a0303] via-[#0d0101] to-black p-5 md:p-6 flex flex-col justify-between select-none opacity-85 group-hover:opacity-100 transition-opacity duration-700">
      {(hasContent(visual.heading) || hasContent(visual.badge)) && <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-3 h-3 rounded-full bg-[#f50604] animate-pulse shrink-0"></span>
          {hasContent(visual.heading) && <span className="text-xs font-mono text-white/90 font-bold uppercase tracking-wider">{visual.heading}</span>}
        </div>
        {hasContent(visual.badge) && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70 shrink-0">{visual.badge}</span>}
      </div>}
      {items.length > 0 && <div className={`my-auto grid grid-cols-1 ${items.length === 2 ? 'sm:grid-cols-2' : items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-3 py-4`}>
        {items.map((item, index) => <div key={`${item.label || 'visual'}-${index}`} className="bg-white/5 border border-white/10 rounded-xl p-3 min-w-0">
          {hasContent(item.label) && <span className="text-[10px] text-white/50 block font-mono">{item.label}</span>}
          {hasContent(item.value) && <span className="text-sm md:text-base font-bold text-white font-heading block break-words">{item.value}</span>}
          {hasContent(item.detail) && <span className="text-[9px] text-emerald-400 block mt-0.5">{item.detail}</span>}
          <EditableExtras data={item} knownKeys={['label', 'value', 'detail']} className="flex flex-col gap-1 mt-1 text-[9px] text-white/50 font-mono" />
        </div>)}
      </div>}
      <EditableExtras data={visual} knownKeys={['heading', 'badge', 'footerLeft', 'footerRight', 'items']} className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-white/60 font-mono" />
      {(hasContent(visual.footerLeft) || hasContent(visual.footerRight)) && <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-white/40">
        {hasContent(visual.footerLeft) && <span>{visual.footerLeft}</span>}
        {hasContent(visual.footerRight) && <span className="text-[#ff4d4d] font-bold">{visual.footerRight}</span>}
      </div>}
    </div>
  );
};

const ProjectCard = ({ project, onClick, content }) => {
  const tags = contentItems(project.techTags).filter(hasContent);
  const extraFields = additionalTextFields(project, ['id', 'number', 'badge', 'title', 'category', 'client', 'duration', 'description', 'techTags', 'imageUrl', 'isFlagship', 'accentColor', 'visualType', 'visualContent', 'caseStudy', 'ctaLabel', 'ctaHref']);
  const cardCta = Object.prototype.hasOwnProperty.call(project, 'ctaLabel') ? project.ctaLabel : content?.cardCta;
  const hasCardContent = [project.title, project.badge, project.category, project.client, project.duration, project.description].some(hasContent) || tags.length > 0 || extraFields.length > 0 || contentItems(project.visualContent?.items).length > 0;
  if (!hasCardContent) return null;
  return (
    <div className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#f50604]/50 hover:shadow-[0_20px_50px_rgba(245,6,4,0.25)] transition-all duration-500 bg-[#0d0101] flex flex-col justify-between ${project.isFlagship ? 'col-span-1 md:col-span-2 lg:col-span-3 min-h-[380px] md:min-h-[440px]' : 'col-span-1 min-h-[340px]'}`} onClick={() => onClick(project)}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {hasContent(project.imageUrl) ? <img src={project.imageUrl} alt={project.title || ''} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-95" loading="lazy" /> : <ProjectVisual project={project} />}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25 group-hover:via-black/50 transition-all duration-500 z-10" />
      <div className="relative z-20 p-6 flex justify-between items-start gap-2">
        {hasContent(project.number) && <span className="text-[10px] font-mono text-white/70 bg-black/60 border border-white/10 rounded-full px-2 py-1">{project.number}</span>}
        {hasContent(project.badge) ? <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white bg-[#f50604] px-3.5 py-1.5 rounded-full border border-red-400/30 shadow-lg font-mono">{project.badge}</span> : <span />}
        {hasContent(project.duration) && <span className="text-[11px] font-mono text-white/70 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">{project.duration}</span>}
      </div>
      <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end">
        {(hasContent(project.category) || hasContent(project.client)) && <div className="flex items-center gap-3 mb-2 flex-wrap">
          {hasContent(project.category) && <span className="text-xs md:text-sm font-mono text-[#f50604] font-bold">{project.category}</span>}
          {hasContent(project.client) && <span className="text-white/40 text-xs font-mono">{hasContent(project.category) ? '• ' : ''}{project.client}</span>}
        </div>}
        {hasContent(project.title) && <h3 className="text-white text-2xl md:text-3xl font-black mb-3 tracking-tight font-heading group-hover:text-[#f50604] transition-colors duration-300">{project.title}</h3>}
        {hasContent(project.description) && <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-4 max-w-2xl opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">{project.description}</p>}
        {extraFields.length > 0 && <div className="relative z-20 px-6 md:px-8 pb-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-white/70">{extraFields.map((field) => <span key={field.key}><strong className="text-white">{field.label}:</strong> {field.value}</span>)}</div>}
        {(tags.length > 0 || hasContent(cardCta)) && <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-3">
          <div className="flex flex-wrap gap-2">{tags.map((tag, index) => <span key={`${tag}-${index}`} className="px-2.5 py-1 text-[10px] font-bold text-white/80 bg-white/5 rounded-full border border-white/10 font-mono">{tag}</span>)}</div>
          {hasContent(cardCta) && (hasContent(project.ctaHref) ? <a href={project.ctaHref} onClick={(event) => event.stopPropagation()} target={/^https?:\/\//i.test(project.ctaHref) ? '_blank' : undefined} rel={/^https?:\/\//i.test(project.ctaHref) ? 'noreferrer' : undefined} className="text-xs font-bold text-white group-hover:text-[#f50604] transition-colors flex items-center gap-1 font-mono uppercase tracking-wider shrink-0 ml-3">{cardCta}</a> : <span className="text-xs font-bold text-white group-hover:text-[#f50604] transition-colors flex items-center gap-1 font-mono uppercase tracking-wider shrink-0 ml-3">{cardCta}</span>)}
        </div>}
      </div>
    </div>
  );
};

// Full Interactive Case Study / Roadmap Modal
const CaseStudyModal = ({ project, onClose, content }) => {
  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const caseStudy = project.caseStudy || {};
  const projectExtras = additionalTextFields(project, ['id', 'number', 'badge', 'title', 'category', 'client', 'duration', 'description', 'techTags', 'imageUrl', 'isFlagship', 'accentColor', 'visualType', 'visualContent', 'caseStudy', 'ctaLabel', 'ctaHref']);
  const caseStudyExtras = additionalTextFields(caseStudy, ['role', 'problem', 'contributions', 'impact']);
  const contributions = contentItems(caseStudy.contributions).filter(hasContent);
  const tags = contentItems(project.techTags).filter(hasContent);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 w-full h-full z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl p-6 md:p-10 shadow-[0_30px_80px_rgba(245,6,4,0.4)] my-auto text-left" onClick={(event) => event.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#f50604] transition-all duration-300" aria-label={content?.modalCloseAriaLabel || undefined}>✕</button>
        <div className="mb-6 border-b border-white/10 pb-6 pr-12">
          {(hasContent(content?.modalEyebrow) || hasContent(project.category)) && <div className="flex items-center gap-2 text-xs font-mono text-[#f50604] font-bold uppercase tracking-wider mb-2 flex-wrap">
            {hasContent(content?.modalEyebrow) && <span>{content.modalEyebrow}</span>}{hasContent(project.category) && <><span>•</span><span>{project.category}</span></>}
          </div>}
          {hasContent(project.title) && <h2 className="text-2xl md:text-4xl font-black text-white font-heading tracking-tight">{project.title}</h2>}
          {(hasContent(project.client) || hasContent(caseStudy.role) || hasContent(project.duration)) && <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mt-3">
            {hasContent(project.client) && <span>{hasContent(content?.contextLabel) && <>{content.contextLabel}: </>}<strong className="text-white">{project.client}</strong></span>}
            {hasContent(caseStudy.role) && <span>{hasContent(content?.roleLabel) && <>{content.roleLabel}: </>}<strong className="text-white">{caseStudy.role}</strong></span>}
            {hasContent(project.duration) && <span>{hasContent(content?.timelineLabel) && <>{content.timelineLabel}: </>}<strong className="text-white">{project.duration}</strong></span>}
          </div>}
        </div>
        {(projectExtras.length > 0 || caseStudyExtras.length > 0) && <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70 font-mono mb-6">{projectExtras.map((field) => <span key={`project-${field.key}`}><strong className="text-white">{field.label}:</strong> {field.value}</span>)}{caseStudyExtras.map((field) => <span key={`case-${field.key}`}><strong className="text-white">{field.label}:</strong> {field.value}</span>)}</div>}
        <div className="space-y-6 text-white/80 text-sm md:text-base leading-relaxed">
          {hasContent(caseStudy.problem) && <div>
            {hasContent(content?.problemHeading) && <h4 className="text-white font-bold text-base font-heading mb-2 uppercase tracking-wide flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#f50604]"></span>{content.problemHeading}</h4>}
            <p className="text-white/70 bg-white/5 border border-white/10 p-4 rounded-xl leading-relaxed">{caseStudy.problem}</p>
          </div>}
          {contributions.length > 0 && <div>
            {hasContent(content?.contributionsHeading) && <h4 className="text-white font-bold text-base font-heading mb-2 uppercase tracking-wide flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#f50604]"></span>{content.contributionsHeading}</h4>}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">{contributions.map((item, index) => <li key={index} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-start gap-2.5 text-xs md:text-sm text-white/80"><span className="text-[#f50604] font-bold">✓</span><span>{item}</span></li>)}</ul>
          </div>}
          {hasContent(caseStudy.impact) && <div>
            {hasContent(content?.impactHeading) && <h4 className="text-white font-bold text-base font-heading mb-2 uppercase tracking-wide flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#f50604]"></span>{content.impactHeading}</h4>}
            <div className="bg-[#f50604]/10 border border-[#f50604]/30 p-4 rounded-xl text-white font-medium flex items-center justify-between gap-3"><span>{caseStudy.impact}</span>{hasContent(content?.milestoneTag) && <span className="text-xs font-mono text-[#ff4d4d] font-bold px-3 py-1 bg-black/40 rounded-full border border-red-500/30 shrink-0">{content.milestoneTag}</span>}</div>
          </div>}
          {(tags.length > 0 || hasContent(content?.closeLabel)) && <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">{tags.map((tag, index) => <span key={`${tag}-${index}`} className="px-3 py-1 text-xs font-mono font-bold text-white bg-white/10 rounded-full border border-white/15">{tag}</span>)}</div>
            {hasContent(content?.closeLabel) && <button onClick={onClose} className="px-6 py-2 rounded-full bg-[#f50604] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#eb0803] transition-colors font-mono">{content.closeLabel}</button>}
          </div>}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { projects, projectsContent } = usePortfolio();
  const visibleProjects = contentItems(projects).filter((project) => [project.title, project.badge, project.category, project.client, project.duration, project.description].some(hasContent) || contentItems(project.techTags).some(hasContent) || hasContent(project.visualContent) || hasContent(project.caseStudy) || additionalTextFields(project, ['id', 'number', 'badge', 'title', 'category', 'client', 'duration', 'description', 'techTags', 'imageUrl', 'isFlagship', 'accentColor', 'visualType', 'visualContent', 'caseStudy', 'ctaLabel', 'ctaHref']).length > 0);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="bg-[#0a0101] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f50604]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#eb0803]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          {hasContent(projectsContent?.sectionBadge) && <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm uppercase font-mono tracking-widest">{projectsContent.sectionBadge}</div>}
          {(hasContent(projectsContent?.heading) || hasContent(projectsContent?.accentLine)) && <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight uppercase font-heading">
            {hasContent(projectsContent?.heading) && projectsContent.heading}
            {hasContent(projectsContent?.accentLine) && <span className="font-editorial text-[#f50604] lowercase font-normal tracking-normal text-3xl md:text-5xl block mt-1">{projectsContent.accentLine}</span>}
          </h2>}
          {hasContent(projectsContent?.description) && <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">{projectsContent.description}</p>}
          <EditableExtras data={projectsContent} knownKeys={['sectionBadge', 'heading', 'accentLine', 'description', 'cardCta', 'modalEyebrow', 'contextLabel', 'roleLabel', 'timelineLabel', 'problemHeading', 'contributionsHeading', 'impactHeading', 'milestoneTag', 'closeLabel', 'modalCloseAriaLabel']} className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] font-mono text-white/50 mt-3" />
        </div>
        {visibleProjects.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleProjects.map((project, index) => <ProjectCard key={project.id || `${project.title || 'project'}-${index}`} project={project} content={projectsContent} onClick={(selected) => setSelectedProject(selected)} />)}
        </div>}
      </div>
      <AnimatePresence>{selectedProject && <CaseStudyModal project={selectedProject} content={projectsContent} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </section>
  );
};

export default Projects;
