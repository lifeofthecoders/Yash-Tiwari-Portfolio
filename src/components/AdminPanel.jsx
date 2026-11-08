import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CONTENT_KEYS, usePortfolio } from '../context/PortfolioContext';
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
    isAdminOpen, closeAdmin, isAuthenticated, isAdmin, userEmail, authLoading,
    authError, login, logout, saveDraft, loadDraft, publishDraft,
    resetToDefaults, exportBackup, importBackup,
  } = portfolio;

  const [formData, setFormData] = useState(() => pickContent(portfolio));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activePage, setActivePage] = useState('profile');
  const [toastMessage, setToastMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);

  const activeGroup = useMemo(
    () => PAGE_GROUPS.find((group) => group.id === activePage) || PAGE_GROUPS[0],
    [activePage]
  );

  const showToast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 3200);
  };

  const loadAdminDraft = async () => {
    setDraftLoading(true);
    try {
      const draft = await loadDraft();
      setFormData(pickContent(draft));
      setDraftLoaded(true);
    } catch (error) {
      console.error('Could not load admin draft:', error);
      showToast(error.message || 'Could not load draft content.');
    } finally {
      setDraftLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isAdmin && !draftLoaded) loadAdminDraft();
  }, [isAuthenticated, isAdmin, draftLoaded]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setBusy(true);
    setLoginError('');
    try {
      const result = await login(email, password);
      if (result.success) {
        setEmail('');
        setPassword('');
        setDraftLoaded(false);
        showToast('Administrator authenticated securely.');
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      setLoginError(error.message || 'Sign-in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleSaveDraft = async () => {
    setBusy(true);
    try {
      await saveDraft(formData);
      showToast('Draft saved securely. It is not public until published.');
    } catch (error) {
      console.error('Draft save failed:', error);
      showToast(error.message || 'Could not save draft.');
    } finally {
      setBusy(false);
    }
  };

  const handlePublish = async () => {
    if (!window.confirm('Publish these changes to your public portfolio now?')) return;
    setBusy(true);
    try {
      await publishDraft(formData);
      showToast('Portfolio changes published successfully.');
    } catch (error) {
      console.error('Publish failed:', error);
      showToast(error.message || 'Could not publish content.');
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset the editable draft to the bundled starting content? The live published site will remain unchanged until you publish.')) return;
    setBusy(true);
    try {
      await resetToDefaults();
      const draft = await loadDraft();
      setFormData(pickContent(draft));
      showToast('Draft reset. Publish it when you are ready.');
    } catch (error) {
      showToast(error.message || 'Reset failed.');
    } finally {
      setBusy(false);
    }
  };

  const handleImportFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (loadEvent) => {
      const content = loadEvent.target?.result;
      if (typeof content === 'string') {
        setBusy(true);
        const result = await importBackup(content);
        setBusy(false);
        if (result.success) {
          setFormData(pickContent(result.content));
          showToast('Backup saved as a draft. Publish it when ready.');
        } else {
          window.alert(result.message || 'This backup file is not valid portfolio JSON.');
        }
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
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-[#0a0101] text-white flex flex-col overflow-x-hidden">
      {toastMessage && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 z-[100000] bg-[#f50604] text-white px-5 py-3 rounded-xl font-mono text-xs font-bold shadow-2xl border border-white/20">
          ✓ {toastMessage}
        </motion.div>
      )}

      {authLoading ? (
        <div className="min-h-screen flex items-center justify-center text-white/70 font-mono text-sm">Checking secure administrator session…</div>
      ) : (!isAuthenticated || !isAdmin) ? (
        <div className="min-h-screen w-full flex items-center justify-center px-5 py-12">
          <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-md bg-[#0d0101] border border-white/15 rounded-3xl p-8 shadow-[0_20px_60px_rgba(245,6,4,0.3)] relative text-left">
            <button onClick={closeAdmin} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-[#f50604] text-white/70 hover:text-white flex items-center justify-center transition-all" aria-label="Close Admin Login">✕</button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#f50604]/20 border border-[#f50604]/50 flex items-center justify-center text-xl text-[#f50604]">⚙️</div>
              <div>
                <h3 className="text-xl font-black text-white font-heading">Portfolio Content Manager</h3>
                <p className="text-white/50 text-xs font-mono">Secure administrator sign-in</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">Administrator email</label>
                <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your Supabase Auth email" required className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#f50604] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#f50604] focus:outline-none pr-12" />
                  <button type="button" onClick={() => setShowPassword((previous) => !previous)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              {(loginError || authError) && <div className="text-red-400 text-xs font-mono bg-red-950/50 border border-red-800 p-2.5 rounded-lg">{loginError || authError}</div>}
              <button type="submit" disabled={busy} className="w-full py-3 rounded-full bg-[#f50604] hover:bg-[#eb0803] disabled:opacity-50 text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,6,4,0.4)] mt-2">{busy ? 'Signing In…' : 'Sign In to Admin Panel →'}</button>
            </form>
            <p className="text-[10px] leading-relaxed text-white/45 mt-5">Access is verified against the administrator allowlist in Supabase. An authenticated account without administrator permission cannot edit content.</p>
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
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">Supabase Cloud</span>
                </h2>
                <p className="text-white/50 text-[11px] font-mono">Edit every page field, nested card, tag, label, link, media URL and CTA from one panel.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button type="button" disabled={busy || draftLoading} onClick={handleSaveDraft} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-lg">Save Draft</button>
              <button type="button" disabled={busy || draftLoading} onClick={handlePublish} className="px-4 py-2 rounded-full bg-[#f50604] hover:bg-[#eb0803] disabled:opacity-50 text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-lg">Publish Changes</button>
              <button type="button" onClick={closeAdmin} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white font-semibold font-mono text-xs uppercase tracking-wider transition-all">View Live Site</button>
              <button type="button" onClick={logout} className="px-3 py-2 rounded-full bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 transition-colors text-xs" title="Logout" aria-label="Logout">Logout ↪</button>
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

          {draftLoading && <div className="px-6 py-3 text-xs text-white/50 font-mono">Loading saved draft…</div>}

          <div className="w-full flex-1 p-5 md:p-8 lg:px-10 space-y-5">
            {activePage === 'backup' ? (
              <div className="max-w-4xl space-y-6">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white font-heading">Content Data &amp; Backups</h3>
                  <p className="text-white/50 text-xs font-mono">Export, import or reset all page content and nested card data.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4"><div><div className="text-2xl mb-2">📥</div><h4 className="text-sm font-bold text-white mb-1">Export Backup</h4><p className="text-white/60 text-xs leading-relaxed">Download every currently loaded portfolio field as JSON.</p></div><button type="button" onClick={exportBackup} className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase transition-colors">Download Backup</button></div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4"><div><div className="text-2xl mb-2">📤</div><h4 className="text-sm font-bold text-white mb-1">Import Backup</h4><p className="text-white/60 text-xs leading-relaxed">Import JSON as a private draft. Publish separately when ready.</p></div><label className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase transition-colors text-center cursor-pointer block">Upload JSON<input type="file" accept=".json,application/json" onChange={handleImportFile} className="hidden" /></label></div>
                  <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-5 flex flex-col justify-between gap-4"><div><div className="text-2xl mb-2">🔄</div><h4 className="text-sm font-bold text-red-400 mb-1">Reset Draft</h4><p className="text-white/60 text-xs leading-relaxed">Restore draft fields to bundled starting content. Live content stays unchanged until publishing.</p></div><button type="button" disabled={busy} onClick={handleReset} className="w-full py-2.5 rounded-xl bg-red-900/60 hover:bg-[#f50604] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase transition-colors">Reset Draft</button></div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white font-heading">{activeGroup.label.replace(/^\S+\s/, '')} Content</h3>
                  <p className="text-white/50 text-xs font-mono mt-1">{activeGroup.hint}</p>
                  <p className="text-emerald-300/70 text-[10px] font-mono mt-2">Blank fields are not rendered by the frontend. Save Draft keeps edits private; Publish Changes makes them visible on the live portfolio.</p>
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
            <span className="text-xs font-mono text-white/50">Securely signed in as <strong>{userEmail}</strong> · {CONTENT_KEYS.length} content groups</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={closeAdmin} className="px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 text-xs font-mono transition-colors">Close</button>
              <button type="button" disabled={busy || draftLoading} onClick={handleSaveDraft} className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white text-xs font-mono transition-colors">Save Draft</button>
              <button type="button" disabled={busy || draftLoading} onClick={handlePublish} className="px-6 py-2 rounded-full bg-[#f50604] hover:bg-[#eb0803] disabled:opacity-50 text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,6,4,0.4)]">Publish Changes</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  );
};

export default AdminPanel;
