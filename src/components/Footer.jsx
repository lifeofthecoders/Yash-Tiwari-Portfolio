import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { hasContent, contentItems } from '../utils/content';
import EditableExtras from './EditableExtras';

const Footer = () => {
  const { personalInfo, footerContent, socialLinks, openAdmin } = usePortfolio();
  const taglines = contentItems(footerContent?.taglines).filter(hasContent);
  const email = personalInfo?.emails?.primary || String(socialLinks?.email || '').replace(/^mailto:/, '');
  const phone = personalInfo?.phone || String(socialLinks?.phone || '').replace(/^tel:/, '');

  return (
    <footer className="bg-[#0b0101] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-white/10">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1.5">
          <EditableExtras data={footerContent} knownKeys={['projectLinkLabel', 'projectLinkHref', 'backToTopHref', 'contactButtonHref', 'availabilityLabel', 'locationLabel', 'backToTopLabel', 'contactButtonLabel', 'bottomRoleLabel', 'taglines', 'credential', 'copyright', 'yearText', 'linkedinLabel', 'githubLabel', 'adminButtonTitle', 'adminButtonAriaLabel']} className="flex flex-col gap-1 text-white/70" />
          {taglines.map((line, i) => <p key={i} className="text-white/80">{line}</p>)}
        </div>
        
        <div className="flex flex-col gap-1.5 md:items-center">
          {hasContent(footerContent?.credential) && <p className="text-white font-bold">{footerContent.credential}</p>}
          {hasContent(footerContent?.projectLinkLabel) && hasContent(footerContent?.projectLinkHref) && <a href={footerContent.projectLinkHref} className="underline hover:text-[#f50604] transition-colors mt-1 underline-offset-4 decoration-1">{footerContent.projectLinkLabel}</a>}
        </div>
        
        <div className="flex flex-col gap-1.5 md:items-end">
          {hasContent(footerContent?.availabilityLabel) && <p className="text-emerald-400 font-bold">{footerContent.availabilityLabel}</p>}
          {hasContent(footerContent?.locationLabel) && <p className="text-white/60">{footerContent.locationLabel}</p>}
          {hasContent(footerContent?.yearText) && <p>{footerContent.yearText}</p>}
        </div>
      </div>

      {/* Middle Huge Brand Text */}
      <div className="w-full flex justify-center items-center py-16 md:py-24 overflow-hidden">
        {hasContent(personalInfo?.brandName) && <h2 className="text-[20vw] md:text-[18vw] leading-none font-sans font-black tracking-tighter lowercase select-none text-[#1b0303] hover:text-[#f50604]/20 transition-colors duration-700 w-full text-center">{personalInfo.brandName.toLowerCase()}</h2>}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-4">
          {hasContent(footerContent?.backToTopLabel) && hasContent(footerContent?.backToTopHref) && <a href={footerContent.backToTopHref} className="underline hover:text-[#f50604] transition-colors underline-offset-4 decoration-1 font-bold">{footerContent.backToTopLabel}</a>}
          {hasContent(footerContent?.copyright) && <p className="text-white/60 font-mono text-[9px] md:text-[10px]">{footerContent.copyright}</p>}
        </div>
        
        <div className="flex flex-col gap-3 md:items-center">
          {hasContent(email) && <a href={`mailto:${email}`} className="underline hover:text-[#f50604] transition-colors underline-offset-4 decoration-1 lowercase">{email}</a>}
          {hasContent(phone) && <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-white/70 hover:text-[#f50604] transition-colors">{phone}</a>}
          {hasContent(socialLinks?.linkedin) && hasContent(footerContent?.linkedinLabel) && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#f50604] transition-colors">{footerContent.linkedinLabel}</a>}
          {hasContent(socialLinks?.github) && hasContent(footerContent?.githubLabel) && <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#f50604] transition-colors">{footerContent.githubLabel}</a>}
          <EditableExtras data={socialLinks} knownKeys={['linkedin', 'github', 'email', 'phone']} className="flex flex-col gap-1 text-white/60" />
        </div>
        
        <div className="flex flex-col gap-2.5 md:items-end">
          <div className="flex items-center gap-2">
            {hasContent(footerContent?.contactButtonLabel) && hasContent(footerContent?.contactButtonHref) && <a href={footerContent.contactButtonHref} className="px-6 py-2 rounded-full border border-white/30 text-white font-bold hover:bg-[#f50604] hover:border-[#f50604] transition-all duration-300 tracking-wider text-center uppercase">{footerContent.contactButtonLabel}</a>}
            {/* Discreet Admin Portal Access Button */}
            <button
              onClick={openAdmin}
              className="p-2 rounded-full border border-white/15 text-white/40 hover:text-[#f50604] hover:border-[#f50604]/50 transition-all text-xs"
              title={footerContent?.adminButtonTitle || undefined}
              aria-label={footerContent?.adminButtonAriaLabel || undefined}
            >
              ⚙️
            </button>
          </div>
          {hasContent(footerContent?.bottomRoleLabel) && <p className="text-white/50">{footerContent.bottomRoleLabel}</p>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
