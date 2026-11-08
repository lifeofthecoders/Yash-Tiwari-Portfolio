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
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  
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

  const handlePublish = () => {
    if (busy || draftLoading) return;
    setShowPublishConfirm(true);
  };

  const confirmPublish = async () => {
    if (busy) return;

    setBusy(true);
    try {
      await publishDraft(formData);
      setShowPublishConfirm(false);
      showToast('Portfolio changes published successfully.');
    } catch (error) {
      console.error('Publish failed:', error);
      setShowPublishConfirm(false);
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

      {showPublishConfirm && (
        <div
          className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !busy) {
              setShowPublishConfirm(false);
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="publish-modal-title"
            aria-describedby="publish-modal-description"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-500/30 bg-[#100505] shadow-[0_25px_100px_rgba(245,6,4,0.25)]"
          >
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f50604] to-transparent" />

            <div className="p-6 sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-2xl" aria-hidden="true">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">Publish Changes</h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-red-400/80">Portfolio Deployment</p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setShowPublishConfirm(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Close publish confirmation"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <h4 id="publish-modal-title" className="text-xl font-bold text-white">
                  Make your changes live?
                </h4>
                <p id="publish-modal-description" className="text-sm leading-relaxed text-white/55">
                  You're about to publish your latest portfolio content. The changes will become visible to visitors on your public portfolio.
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-950/30 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(245,6,4,0.8)]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-400">
                    Public Portfolio Update
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-white/45">
                  Your current editor content will be published. Make sure you've reviewed your changes before continuing.
                </p>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setShowPublishConfirm(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={confirmPublish}
                  className="flex-1 rounded-xl bg-[#f50604] py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(245,6,4,0.3)] transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? 'Publishing…' : 'Publish Now →'}
                </button>
              </div>

              <p className="mt-5 text-center font-mono text-[9px] text-white/25">
                SECURELY PUBLISHED THROUGH SUPABASE CLOUD
              </p>
            </div>
          </motion.div>
        </div>
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
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 pr-24 text-white text-sm focus:border-[#f50604] focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 text-[#f50604] hover:text-red-400 font-mono text-xs font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f50604] rounded-md"
                  >
                    {showPassword ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                          <path d="M16.68 16.68A10.94 10.94 0 0 1 12 17.5C5 17.5 1 12 1 12a17.3 17.3 0 0 1 4.12-4.58" />
                          <path d="M9.88 5.08A10.94 10.94 0 0 1 12 4.5c7 0 11 7.5 11 7.5a17.3 17.3 0 0 1-3.1 3.85" />
                          <path d="m2 2 20 20" />
                        </svg>
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>Show</span>
                      </>
                    )}
                  </button>
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
