import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio, ADMIN_CREDENTIALS } from '../context/PortfolioContext';

const AdminPanel = () => {
  const {
    isAdminOpen,
    closeAdmin,
    isAuthenticated,
    login,
    logout,
    personalInfo,
    heroContent,
    statsData,
    aboutContent,
    skillsContent,
    technicalSkills,
    projects,
    educationData,
    certificatesData,
    updateData,
    resetToDefaults,
    exportBackup,
    importBackup,
  } = usePortfolio();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('identity');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Local form buffer for editing
  const [formData, setFormData] = useState({
    personalInfo: { ...personalInfo },
    heroContent: { ...heroContent },
    statsData: JSON.parse(JSON.stringify(statsData)),
    aboutContent: { ...aboutContent },
    skillsContent: JSON.parse(JSON.stringify(skillsContent)),
    projects: JSON.parse(JSON.stringify(projects)),
    educationData: JSON.parse(JSON.stringify(educationData)),
    certificatesData: JSON.parse(JSON.stringify(certificatesData)),
  });

  // Sync buffer when portfolio data updates
  useEffect(() => {
    setFormData({
      personalInfo: { ...personalInfo },
      heroContent: { ...heroContent },
      statsData: JSON.parse(JSON.stringify(statsData)),
      aboutContent: { ...aboutContent },
      skillsContent: JSON.parse(JSON.stringify(skillsContent)),
      projects: JSON.parse(JSON.stringify(projects)),
      educationData: JSON.parse(JSON.stringify(educationData)),
      certificatesData: JSON.parse(JSON.stringify(certificatesData)),
    });
  }, [personalInfo, heroContent, statsData, aboutContent, skillsContent, projects, educationData, certificatesData]);

  // Handle Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(username, password);
    if (res.success) {
      setLoginError('');
      setUsername('');
      setPassword('');
      showToast('Welcome back, Yash! Logged in as Admin.');
    } else {
      setLoginError(res.message);
    }
  };

  // Save changes to PortfolioContext and localStorage
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    updateData({
      personalInfo: formData.personalInfo,
      heroContent: formData.heroContent,
      statsData: formData.statsData,
      aboutContent: formData.aboutContent,
      skillsContent: formData.skillsContent,
      projects: formData.projects,
      educationData: formData.educationData,
      certificatesData: formData.certificatesData,
    });
    showToast('Changes saved successfully! Your portfolio is updated.');
  };

  // Handle Reset to Default
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all portfolio data to original default values? This cannot be undone.')) {
      resetToDefaults();
      showToast('Portfolio has been reset to original default data.');
    }
  };

  // Handle Backup Import
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const success = importBackup(content);
        if (success) {
          showToast('Backup restored successfully!');
        } else {
          alert('Invalid backup JSON file.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isAdminOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Toast Notification */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[100000] bg-[#f50604] text-white px-5 py-3 rounded-xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <span>✓</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}

        {/* LOGIN VIEW */}
        {!isAuthenticated ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0d0101] border border-white/15 rounded-3xl p-8 shadow-[0_20px_60px_rgba(245,6,4,0.3)] relative text-left"
          >
            <button
              onClick={closeAdmin}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-[#f50604] text-white/70 hover:text-white flex items-center justify-center transition-all"
              aria-label="Close Admin Login"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#f50604]/20 border border-[#f50604]/50 flex items-center justify-center text-xl text-[#f50604]">
                ⚙️
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-heading">
                  Yash Portfolio Admin
                </h3>
                <p className="text-white/50 text-xs font-mono">
                  Static Client Control Panel
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#f50604] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#f50604] focus:outline-none transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="text-red-400 text-xs font-mono bg-red-950/50 border border-red-800 p-2.5 rounded-lg">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#f50604] hover:bg-[#eb0803] text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,6,4,0.4)] mt-2"
              >
                Sign In to Admin Panel →
              </button>
            </form>
          </motion.div>
        ) : (
          /* DASHBOARD VIEW */
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-6xl max-h-[92vh] bg-[#0c0101] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
          >
            {/* Top Bar */}
            <div className="p-5 md:px-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f50604] text-white flex items-center justify-center font-bold text-lg font-mono">
                  Y.
                </div>
                <div>
                  <h2 className="text-lg font-black text-white font-heading flex items-center gap-2">
                    <span>Portfolio Admin Panel</span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">
                      Live
                    </span>
                  </h2>
                  <p className="text-white/50 text-[11px] font-mono">
                    All edits save automatically to browser storage without touching code.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-4 py-2 rounded-full bg-[#f50604] hover:bg-[#eb0803] text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5"
                >
                  <span>💾</span>
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={closeAdmin}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white font-semibold font-mono text-xs uppercase tracking-wider transition-all"
                >
                  View Live Site
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 rounded-full bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 transition-colors"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sub-Header Tabs */}
            <div className="flex items-center gap-1.5 px-4 md:px-8 py-2.5 bg-black/60 border-b border-white/10 overflow-x-auto text-xs font-mono">
              {[
                { id: 'identity', label: '👤 Identity & Contact' },
                { id: 'hero', label: '🎬 Hero' },
                { id: 'stats', label: '📊 Stats & Scores' },
                { id: 'about', label: '📖 About & Bio' },
                { id: 'roadmap', label: '🛣️ Learning Roadmap' },
                { id: 'projects', label: '🚀 Projects' },
                { id: 'academics', label: '🎓 Academics' },
                { id: 'backup', label: '💾 Backup & Reset' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                    activeTab === tab.id
                      ? 'bg-[#f50604] text-white font-bold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

              {/* TAB 1: IDENTITY & CONTACT */}
              {activeTab === 'identity' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Personal Identity &amp; Contact</h3>
                    <p className="text-white/50 text-xs font-mono">Core profile metadata rendered across Navbar, Contact, and Schema.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.personalInfo.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, name: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Brand Name / Monogram</label>
                      <input
                        type="text"
                        value={formData.personalInfo.brandName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, brandName: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Primary Email</label>
                      <input
                        type="email"
                        value={formData.personalInfo.emails.primary}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: {
                              ...formData.personalInfo,
                              emails: { ...formData.personalInfo.emails, primary: e.target.value },
                            },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={formData.personalInfo.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, phone: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">University</label>
                      <input
                        type="text"
                        value={formData.personalInfo.university}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, university: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Current Semester</label>
                      <input
                        type="text"
                        value={formData.personalInfo.semester}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, semester: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-white/70 mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.personalInfo.location}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, location: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO */}
              {activeTab === 'hero' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Hero Section</h3>
                    <p className="text-white/50 text-xs font-mono">Main welcoming headline, subtitle, and primary call-to-actions.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Hero Greeting</label>
                      <input
                        type="text"
                        value={formData.heroContent.greeting}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            heroContent: { ...formData.heroContent, greeting: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Hero Subtitle</label>
                      <textarea
                        rows={3}
                        value={formData.heroContent.subtitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            heroContent: { ...formData.heroContent, subtitle: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">Primary CTA Button</label>
                        <input
                          type="text"
                          value={formData.heroContent.ctaPrimary.text}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              heroContent: {
                                ...formData.heroContent,
                                ctaPrimary: { ...formData.heroContent.ctaPrimary, text: e.target.value },
                              },
                            })
                          }
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">Secondary CTA Button</label>
                        <input
                          type="text"
                          value={formData.heroContent.ctaSecondary.text}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              heroContent: {
                                ...formData.heroContent,
                                ctaSecondary: { ...formData.heroContent.ctaSecondary, text: e.target.value },
                              },
                            })
                          }
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: STATS & SCORES */}
              {activeTab === 'stats' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Hero Metric Cards</h3>
                    <p className="text-white/50 text-xs font-mono">The 4 verified floating cards displayed on the Hero screen.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.statsData.map((stat, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                        <div className="text-xs font-mono text-[#f50604] font-bold uppercase">
                          Card #{idx + 1}
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-white/60 mb-1">Metric Number / Value</label>
                          <input
                            type="text"
                            value={stat.num}
                            onChange={(e) => {
                              const updated = [...formData.statsData];
                              updated[idx].num = e.target.value;
                              setFormData({ ...formData, statsData: updated });
                            }}
                            className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white font-bold text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-white/60 mb-1">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...formData.statsData];
                              updated[idx].label = e.target.value;
                              setFormData({ ...formData, statsData: updated });
                            }}
                            className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-white/60 mb-1">Description Subtext</label>
                          <input
                            type="text"
                            value={stat.desc}
                            onChange={(e) => {
                              const updated = [...formData.statsData];
                              updated[idx].desc = e.target.value;
                              setFormData({ ...formData, statsData: updated });
                            }}
                            className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white/70 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: ABOUT */}
              {activeTab === 'about' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">About Section</h3>
                    <p className="text-white/50 text-xs font-mono">Personal background narrative displayed alongside the swinging lanyard badge.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Section Heading</label>
                      <input
                        type="text"
                        value={formData.aboutContent.heading}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aboutContent: { ...formData.aboutContent, heading: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:border-[#f50604] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Biography Paragraph (HTML allowed)</label>
                      <textarea
                        rows={6}
                        value={formData.aboutContent.bio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aboutContent: { ...formData.aboutContent, bio: e.target.value },
                          })
                        }
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm font-sans focus:border-[#f50604] focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ROADMAP */}
              {activeTab === 'roadmap' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Learning Roadmap Cards</h3>
                    <p className="text-white/50 text-xs font-mono">The 6 sequential tag cards connected along the animated winding SVG path.</p>
                  </div>

                  <div className="space-y-4">
                    {formData.skillsContent.cards.map((card, idx) => (
                      <div key={card.number} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-serif italic text-[#f50604] font-bold">
                            Stage {card.number}
                          </span>
                          <input
                            type="text"
                            value={card.status}
                            placeholder="e.g. Core Focus"
                            onChange={(e) => {
                              const updated = [...formData.skillsContent.cards];
                              updated[idx].status = e.target.value;
                              setFormData({
                                ...formData,
                                skillsContent: { ...formData.skillsContent, cards: updated },
                              });
                            }}
                            className="bg-black/50 border border-white/15 rounded-lg px-2.5 py-1 text-white text-[11px] font-mono text-right w-36"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-white/60 mb-1">Stage Title</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const updated = [...formData.skillsContent.cards];
                              updated[idx].title = e.target.value;
                              setFormData({
                                ...formData,
                                skillsContent: { ...formData.skillsContent, cards: updated },
                              });
                            }}
                            className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white font-bold text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-white/60 mb-1">Summary Description</label>
                          <textarea
                            rows={2}
                            value={card.text}
                            onChange={(e) => {
                              const updated = [...formData.skillsContent.cards];
                              updated[idx].text = e.target.value;
                              setFormData({
                                ...formData,
                                skillsContent: { ...formData.skillsContent, cards: updated },
                              });
                            }}
                            className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white/80 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Projects in Development</h3>
                    <p className="text-white/50 text-xs font-mono">Bento grid cards and detailed case study modal contents.</p>
                  </div>

                  <div className="space-y-5">
                    {formData.projects.map((proj, idx) => (
                      <div key={proj.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-xs font-mono font-bold text-[#f50604]">
                            Project #{proj.number} · {proj.id}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">
                            {proj.visualType}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-white/60 mb-1">Title</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-white/60 mb-1">Badge Tag</label>
                            <input
                              type="text"
                              value={proj.badge || ''}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[idx].badge = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-white/60 mb-1">Category</label>
                            <input
                              type="text"
                              value={proj.category}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[idx].category = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-white/60 mb-1">Duration / Timeline</label>
                            <input
                              type="text"
                              value={proj.duration}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[idx].duration = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-white/60 mb-1">Card Description</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[idx].description = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white/80 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: ACADEMICS */}
              {activeTab === 'academics' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Academic Track &amp; Education</h3>
                    <p className="text-white/50 text-xs font-mono">B.Tech curriculum at JECRC and secondary school performance.</p>
                  </div>

                  <div className="space-y-4">
                    {formData.educationData.map((edu, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-white/60 mb-1">Degree / Level</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                const updated = [...formData.educationData];
                                updated[idx].degree = e.target.value;
                                setFormData({ ...formData, educationData: updated });
                              }}
                              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white font-bold text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-white/60 mb-1">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => {
                                const updated = [...formData.educationData];
                                updated[idx].institution = e.target.value;
                                setFormData({ ...formData, educationData: updated });
                              }}
                              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-white/60 mb-1">Grade / Score</label>
                            <input
                              type="text"
                              value={edu.grade}
                              onChange={(e) => {
                                const updated = [...formData.educationData];
                                updated[idx].grade = e.target.value;
                                setFormData({ ...formData, educationData: updated });
                              }}
                              className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-mono text-emerald-400"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: BACKUP & EXPORT */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white font-heading">Data Management &amp; Backups</h3>
                    <p className="text-white/50 text-xs font-mono">Export your configuration, import a previous backup, or reset to original settings.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="text-2xl mb-2">📥</div>
                        <h4 className="text-sm font-bold text-white mb-1">Export Backup</h4>
                        <p className="text-white/60 text-xs leading-relaxed mb-4">
                          Download a complete JSON backup file containing all your customized settings.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={exportBackup}
                        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase transition-colors"
                      >
                        Download Backup
                      </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="text-2xl mb-2">📤</div>
                        <h4 className="text-sm font-bold text-white mb-1">Import Backup</h4>
                        <p className="text-white/60 text-xs leading-relaxed mb-4">
                          Restore your portfolio configuration from a previously saved JSON backup file.
                        </p>
                      </div>
                      <label className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase transition-colors text-center cursor-pointer block">
                        <span>Upload JSON</span>
                        <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                      </label>
                    </div>

                    <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="text-2xl mb-2">🔄</div>
                        <h4 className="text-sm font-bold text-red-400 mb-1">Factory Reset</h4>
                        <p className="text-white/60 text-xs leading-relaxed mb-4">
                          Reset all content back to the verified default portfolio configuration.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full py-2.5 rounded-xl bg-red-900/60 hover:bg-[#f50604] text-white font-mono text-xs font-bold uppercase transition-colors"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Action Footer */}
            <div className="p-4 px-6 md:px-8 border-t border-white/10 bg-black/60 flex items-center justify-between">
              <span className="text-xs font-mono text-white/50">
                Logged in as <strong>{ADMIN_CREDENTIALS.username}</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={closeAdmin}
                  className="px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 text-xs font-mono transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-6 py-2 rounded-full bg-[#f50604] hover:bg-[#eb0803] text-white font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,6,4,0.4)]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
