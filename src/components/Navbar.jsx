
import React, { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { hasContent, contentItems } from '../utils/content';

const Navbar = () => {
  const {
    personalInfo,
    navigationContent,
    socialLinks,
    openAdmin,
  } = usePortfolio();

  const email =
    personalInfo?.emails?.primary ||
    (socialLinks?.email || '').replace(/^mailto:/, '');

  const emailHref =
    navigationContent?.emailHref ||
    (hasContent(email) ? `mailto:${email}` : '');

  const navLinks = contentItems(navigationContent?.links).filter(
    (link) => hasContent(link.name) && hasContent(link.href)
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always open the Admin Panel from the top.
  const handleAdminOpen = useCallback(() => {
    setIsOpen(false);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    if (typeof openAdmin === 'function') {
      openAdmin();
    }
  }, [openAdmin]);

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
          {hasContent(personalInfo?.brandName) &&
            (hasContent(navigationContent?.brandHref) ? (
              <a
                href={navigationContent.brandHref}
                className="text-white text-2xl font-black tracking-tight whitespace-nowrap group"
              >
                {personalInfo.brandName}
                {hasContent(personalInfo?.brandSuffix) && (
                  <span className="text-[#f50604] group-hover:text-white transition-colors duration-300">
                    {personalInfo.brandSuffix}
                  </span>
                )}
              </a>
            ) : (
              <span className="text-white text-2xl font-black tracking-tight whitespace-nowrap">
                {personalInfo.brandName}
                {hasContent(personalInfo?.brandSuffix) && (
                  <span className="text-[#f50604]">
                    {personalInfo.brandSuffix}
                  </span>
                )}
              </span>
            ))}
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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f50604] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Side: CTAs */}
        <div className="hidden md:flex items-center gap-3">

          {hasContent(email) && hasContent(emailHref) && (
            <a
              href={emailHref}
              className="p-2 text-white/70 hover:text-[#f50604] hover:scale-110 transition-all duration-300"
              aria-label={navigationContent?.emailAriaLabel || 'Email'}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          )}

          {hasContent(navigationContent?.contactLabel) &&
            hasContent(navigationContent?.contactHref) && (
              <a
                href={navigationContent.contactHref}
                className="px-5 py-2 text-sm rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-md shadow-sm"
              >
                {navigationContent.contactLabel}
              </a>
            )}

          {/* Admin Settings Button */}
          {typeof openAdmin === 'function' && (
            <button
              type="button"
              onClick={handleAdminOpen}
              title="Open Admin Panel"
              aria-label="Open Admin Panel"
              className="p-2 text-white/60 hover:text-[#f50604] hover:scale-110 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.7 2.94-.08-.02a1.7 1.7 0 00-1.76.68l-.04.07h-3.4l-.04-.07a1.7 1.7 0 00-1.76-.68l-.08.02-1.7-2.94.06-.06A1.7 1.7 0 009.6 15l-.08-.04v-3.4l.08-.04a1.7 1.7 0 00-.34-1.88l-.06-.06 1.7-2.94.08.02a1.7 1.7 0 001.76-.68l.04-.07h3.4l.04.07a1.7 1.7 0 001.76.68l.08-.02 1.7 2.94-.06.06A1.7 1.7 0 0019.4 11.5l.08.04v3.4l-.08.06z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">

          {/* Mobile Admin Settings */}
          {typeof openAdmin === 'function' && (
            <button
              type="button"
              onClick={handleAdminOpen}
              title="Open Admin Panel"
              aria-label="Open Admin Panel"
              className="text-white p-2 hover:text-black transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.4 15l-1.7 2.94-1.14-.26-1.16.67L14.9 19.5h-3.4l-.5-1.15-1.16-.67-1.14.26L7 15l.78-.88v-1.34L7 12l1.7-2.94 1.14.26L11 8.65l.5-1.15h3.4l.5 1.15 1.16.67 1.14-.26L19.4 12l-.78.88v1.34l.78.78z"
                />
              </svg>
            </button>
          )}

          {/* Mobile Hamburger Menu */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
            aria-label={
              navigationContent?.toggleMenuAriaLabel ||
              (isOpen ? 'Close menu' : 'Open menu')
            }
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'max-h-[460px] py-6 opacity-100 bg-[#f50604] shadow-2xl'
            : 'max-h-0 opacity-0 bg-transparent'
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

            {hasContent(navigationContent?.contactMobileLabel) &&
              hasContent(navigationContent?.contactMobileHref) && (
                <a
                  href={navigationContent.contactMobileHref}
                  onClick={() => setIsOpen(false)}
                  className="inline-block px-6 py-3 rounded-full bg-white text-[#f50604] font-black hover:bg-black hover:text-white transition-colors w-full text-center shadow-lg text-sm uppercase tracking-wider"
                >
                  {navigationContent.contactMobileLabel}
                </a>
              )}

            {hasContent(personalInfo?.resumeUrl) &&
              hasContent(navigationContent?.resumeLabel) && (
                <a
                  href={personalInfo.resumeUrl}
                  download
                  onClick={() => setIsOpen(false)}
                  className="inline-block px-6 py-2.5 rounded-full border border-white text-white font-bold hover:bg-white/20 transition-colors w-full text-center text-sm"
                >
                  {navigationContent.resumeLabel}
                </a>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
