import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { emailjsConfig } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const Contact = () => {
  const { personalInfo } = usePortfolio();
  const ref = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');

    const form = formRef.current;
    const firstName = form.querySelector('#firstName')?.value || '';
    const lastName = form.querySelector('#lastName')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const isConfigured = 
      emailjsConfig.serviceId && 
      emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      emailjsConfig.templateId && 
      emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      emailjsConfig.publicKey && 
      emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

    if (!isConfigured) {
      const mailtoLink = `mailto:${personalInfo.emails.primary}?subject=Portfolio Contact from ${firstName} ${lastName}&body=${encodeURIComponent(`From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`)}`;
      window.open(mailtoLink, '_blank');
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0a0101] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-white/90 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="bg-[#f50604] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-90 font-mono">
                Get In Touch
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-heading mt-1">
                Let's connect &amp; collaborate
              </h2>
            </div>
            <a 
              href={`mailto:${personalInfo.emails.primary}`}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-white/15 hover:bg-white hover:text-[#f50604] border border-white/20 px-4 py-2.5 rounded-full transition-all duration-300 font-mono"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{personalInfo.emails.primary}</span>
            </a>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-14 w-full">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full">
              <div className="flex-1 flex flex-col gap-8">
                <div className="relative">
                  <input 
                    type="text" 
                    id="firstName" 
                    name="first_name"
                    placeholder="First Name" 
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-base md:text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    id="lastName" 
                    name="last_name"
                    placeholder="Last Name" 
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-base md:text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="user_email"
                    placeholder="Your Email" 
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-base md:text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium rounded-none"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    name="message"
                    placeholder="Type your message, project idea, or inquiry here..." 
                    required
                    className="w-full h-full min-h-[140px] bg-transparent border-b border-white/40 pb-3 text-base md:text-lg focus:outline-none focus:border-white transition-colors placeholder-white/80 font-medium resize-none rounded-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-2">
              <div className="flex-1 flex items-start gap-4 text-xs md:text-sm font-medium text-white/90">
                <input 
                  type="checkbox" 
                  id="permission" 
                  defaultChecked
                  className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-white focus:ring-white focus:ring-offset-0 cursor-pointer" 
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[320px] leading-snug">
                  I give permission to contact me regarding student opportunities, learning collaborations, and technical projects.
                </label>
              </div>

              <div className="flex-1 flex flex-col gap-6 text-xs text-white/80 font-medium">
                <p className="leading-relaxed font-mono">
                  Location: <strong className="text-white">{personalInfo.location}</strong> · Phone: <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="underline hover:text-white font-bold">{personalInfo.phone}</a>
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="leading-relaxed">
                    Direct Email: <a href={`mailto:${personalInfo.emails.primary}`} className="underline hover:text-white font-bold">{personalInfo.emails.primary}</a>
                  </p>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className={`px-8 py-3.5 rounded-full border border-white/50 text-white font-bold flex items-center justify-center gap-3 transition-all duration-300 group whitespace-nowrap self-start sm:self-auto uppercase tracking-wider text-xs font-mono ${
                      status === 'sending' 
                        ? 'opacity-50 cursor-not-allowed bg-white/10' 
                        : status === 'success'
                        ? 'bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]'
                        : status === 'error'
                        ? 'bg-red-950 border-red-800 text-white'
                        : 'hover:bg-white hover:text-[#f50604] hover:shadow-lg'
                    }`}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : status === 'success' ? (
                      <span>Message Sent ✓</span>
                    ) : status === 'error' ? (
                      <span>Failed — Try Again</span>
                    ) : 'Send Message'}
                    
                    {status === 'idle' && (
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
