import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CONTENT_KEYS, usePortfolio, ADMIN_CREDENTIALS } from '../context/PortfolioContext';
import DynamicValueEditor from './admin/DynamicContentEditor';

const clone = (value) => JSON.parse(JSON.stringify(value ?? null));
const pickContent = (source) => Object.fromEntries(
  CONTENT_KEYS.filter((key) => source[key] !== undefined).map((key) => [key, clone(source[key])])
);

const PAGE_GROUPS = [
  { id: 'profile', label: '👤 Profile & Navigation', hint: 'Site SEO metadata, identity, contact coordinates, social profiles, brand destination and navigation CTA links.', keys: ['siteMeta', 'personalInfo', 'socialLinks', 'navigationContent'] },
  { id: 'home', label: '🏠 Home / Hero', hint: 'Hero headline, every CTA, video controls, highlights and metric cards.', keys: ['heroContent', 'statsData'] },
  { id: 'about', label: '📖 About', hint: 'About heading, bio, profile facts, image alternative text and focus tags.', keys: ['aboutContent'] },
  { id: 'roadmap', label: '🧭 Roadmap', hint: 'Section heading, subtitles, timeline cards, status tags and closing tagline.', keys: ['skillsContent'] },
  { id: 'skills', label: '🧩 Skills & Strengths', hint: 'Technical categories, skill tags, statuses, personal strengths and their descriptions.', keys: ['technicalSkills', 'softSkillsContent', 'softSkillsList'] },
  { id: 'projects', label: '🚀 Projects', hint: 'Project cards, card tags, details, case studies, CTA labels and nested technology lists.', keys: ['projectsContent', 'projects'] },
  { id: 'academics', label: '🎓 Academics & Credentials', hint: 'University program, term, highlights, academic records, competency tags and credential cards.', keys: ['educationContent', 'educationData', 'certificatesData'] },
  { id: 'contact', label: '✉️ Contact', hint: 'Contact heading, form labels, placeholders, CTA and EmailJS public configuration.', keys: ['contactContent', 'emailjsConfig'] },
  { id: 'footer', label: '🔻 Footer', hint: 'Footer taglines, credential text, links, availability, location and copyright.', keys: ['footerContent'] },
  { id: 'all', label: '🗂️ All Content', hint: 'Every field from every page in one editable content tree.', keys: CONTENT_KEYS },
];

const AdminPanel = () => {
  const portfolio = usePortfolio();
  const {
    isAdminOpen, closeAdmin, isAuthenticated, login, logout, updateData,
    resetToDefaults, exportBackup, importBackup,
  } = portfolio;

  const [formData, setFormData] = useState(() => pickContent(portfolio));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activePage, setActivePage] = useState('profile');
  const [toastMessage, setToastMessage] = useState('');

  const portfolioValues = CONTENT_KEYS.map((key) => portfolio[key]);
  useEffect(() => {
    setFormData(pickContent(portfolio));
    // A fixed CONTENT_KEYS list keeps this dependency list stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, portfolioValues);

  const activeGroup = useMemo(() => PAGE_GROUPS.find((group) => group.id === activePage) || PAGE_GROUPS[0], [activePage]);

  const showToast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 3200);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const result = login(username, password);
    if (result.success) {
      setLoginError('');
      setUsername('');
      setPassword('');
      showToast('Welcome. Content manager unlocked.');
    } else {
      setLoginError(result.message);
    }
  };

  const handleSaveAll = () => {
    updateData(formData);
    showToast('All page content saved. Empty content fields are hidden on the site.');
  };

  const handleReset = () => {
    if (window.confirm('Reset every portfolio field to the bundled starting content? This will overwrite current browser-saved edits.')) {
      resetToDefaults();
      showToast('Portfolio content reset.');
    }
  };

  const handleImportFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const content = loadEvent.target?.result;
      if (typeof content === 'string') {
        if (importBackup(content)) showToast('Content backup imported. Review and save if needed.');
        else window.alert('This backup file is not valid portfolio JSON.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const updateSection = (key, nextValue) => {
    setFormData((previous) => ({ ...previous, [key]: nextValue }));
  };

  if (!isAdminOpen) return null;

  return (
      <motion.main
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="min-h-screen w-full bg-[#0a0101] text-white flex flex-col overflow-x-hidden"
      >
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[100000] bg-[#f50604] text-white px-5 py-3 rounded-xl font-mono text-xs font-bold shadow-2xl border border-white/20">
            ✓ {toastMessage}
          </motion.div>
        )}

        {!isAuthenticated ? (
          <div className="min-h-screen w-full flex items-center justify-center px-5 py-12">
          <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-md bg-[#0d0101] border border-white/15 rounded-3xl p-8 shadow-[0_20px_60px_rgba(245,6,4,0.3)] relative text-left">
            <button onClick={closeAdmin} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-[#f50604] text-white/70 hover:text-white flex items-center justify-center transition-all" aria-label="Close Admin Login">✕</button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#f50604]/20 border border-[#f50604]/50 flex items-center justify-center text-xl text-[#f50604]">⚙️</div>
              <div>
                <h3 className="text-xl font-black text-white font-heading">Portfolio Content Manager</h3>
                <p className="text-white/50 text-xs font-mono">Page-wise content control</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">Username</label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" required className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#f50604] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#f50604] focus:outline-none pr-12" />
                  <button type="button" onClick={() => setShowPassword((previous) => !previous)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              {loginError && <div className="text-red-400 text-xs font-mono bg-red-950/50 border border-red-800 p-2.5 rounded-lg">{loginError}</div>}
              <button type="submit" className="w-full py-3 rounded-full bg-[#f50604] hover:bg-[#eb0803] text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,6,4,0.4)] mt-2">Sign In to Admin Panel →</button>
            </form>
            <p className="text-[10px] leading-relaxed text-amber-200/60 mt-5">Security note: this starter build still uses browser-side credentials. Do not use it to protect private or sensitive content until server-side authentication is configured.</p>
          </motion.div>
          </div>
        ) : (
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="min-h-screen w-full bg-[#0c0101] flex flex-col overflow-visible text-left">
            <div className="shrink-0 p-5 md:px-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f50604] text-white flex items-center justify-center font-bold text-lg font-mono">CMS</div>
                <div>
                  <h2 className="text-lg font-black text-white font-heading flex items-center gap-2">
                    <span>Portfolio Admin Panel</span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">Local Save</span>
                  </h2>
                  <p className="text-white/50 text-[11px] font-mono">Edit every page field, nested card, tag, label, link, media URL and CTA from one panel.</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button type="button" onClick={handleSaveAll} className="px-4 py-2 rounded-full bg-[#f50604] hover:bg-[#eb0803] text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5">💾 <span>Save Changes</span></button>
                <button type="button" onClick={closeAdmin} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white font-semibold font-mono text-xs uppercase tracking-wider transition-all">View Live Site</button>
                <button type="button" onClick={logout} className="p-2 rounded-full bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 transition-colors" title="Logout" aria-label="Logout">↪</button>
              </div>
            </div>

            <nav role="tablist" aria-label="Admin content sections" className="shrink-0 w-full flex flex-wrap items-center justify-start gap-1.5 px-4 md:px-8 py-3 bg-black/60 border-b border-white/10 text-[11px] sm:text-xs font-mono overflow-visible">
              {PAGE_GROUPS.map((page) => (
                <button key={page.id} role="tab" aria-selected={activePage === page.id} type="button" onClick={() => setActivePage(page.id)}
                  className={`shrink-0 min-h-9 px-3 py-2 rounded-lg whitespace-nowrap transition-colors font-medium leading-tight ${activePage === page.id ? 'bg-[#f50604] text-white font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                  {page.label}
                </button>
              ))}
              <button role="tab" aria-selected={activePage === 'backup'} type="button" onClick={() => setActivePage('backup')} className={`shrink-0 min-h-9 px-3 py-2 rounded-lg whitespace-nowrap transition-colors font-medium leading-tight ${activePage === 'backup' ? 'bg-[#f50604] text-white font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>💾 Backup</button>
            </nav>

            <div className="w-full flex-1 p-5 md:p-8 lg:px-10 space-y-5">
              {activePage === 'backup' ? (
                <div className="max-w-4xl space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Content Data &amp; Backups</h3>
                    <p className="text-white/50 text-xs font-mono">Export, import or reset all page content and nested card data.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4"><div><div className="text-2xl mb-2">📥</div><h4 className="text-sm font-bold text-white mb-1">Export Backup</h4><p className="text-white/60 text-xs leading-relaxed">Download every editable field as JSON.</p></div><button type="button" onClick={exportBackup} className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase transition-colors">Download Backup</button></div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4"><div><div className="text-2xl mb-2">📤</div><h4 className="text-sm font-bold text-white mb-1">Import Backup</h4><p className="text-white/60 text-xs leading-relaxed">Restore all editable content from JSON.</p></div><label className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase transition-colors text-center cursor-pointer block">Upload JSON<input type="file" accept=".json,application/json" onChange={handleImportFile} className="hidden" /></label></div>
                    <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-5 flex flex-col justify-between gap-4"><div><div className="text-2xl mb-2">🔄</div><h4 className="text-sm font-bold text-red-400 mb-1">Factory Reset</h4><p className="text-white/60 text-xs leading-relaxed">Restore all fields to the bundled starting content.</p></div><button type="button" onClick={handleReset} className="w-full py-2.5 rounded-xl bg-red-900/60 hover:bg-[#f50604] text-white font-mono text-xs font-bold uppercase transition-colors">Reset to Defaults</button></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">{activeGroup.label.replace(/^\S+\s/, '')} Content</h3>
                    <p className="text-white/50 text-xs font-mono mt-1">{activeGroup.hint}</p>
                    <p className="text-emerald-300/70 text-[10px] font-mono mt-2">Tip: blank fields are not rendered by the updated components. Use “Add Card / Item” for more projects, education records, tags or skills.</p>
                  </div>
                  <div className="space-y-5">
                    {activeGroup.keys.map((key) => (
                      <DynamicValueEditor key={key} name={key} value={formData[key]} path={[key]} onChange={(nextValue) => updateSection(key, nextValue)} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 p-4 px-6 md:px-8 border-t border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-white/50">Logged in as <strong>{ADMIN_CREDENTIALS.username}</strong> · {CONTENT_KEYS.length} content groups</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={closeAdmin} className="px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 text-xs font-mono transition-colors">Close</button>
                <button type="button" onClick={handleSaveAll} className="px-6 py-2 rounded-full bg-[#f50604] hover:bg-[#eb0803] text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,6,4,0.4)]">Save All Page Content</button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.main>
  );
};

export default AdminPanel;
