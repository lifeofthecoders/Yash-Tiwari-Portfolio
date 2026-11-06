import React, { createContext, useContext, useState, useEffect } from 'react';
import * as initialData from '../data/portfolioData';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'yash_portfolio_data_v1';
const AUTH_KEY = 'yash_admin_authenticated';

// Static authentication credentials
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'yash@admin2026',
};

export const PortfolioProvider = ({ children }) => {
  // Load saved state from localStorage or fallback to initial portfolioData
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage:', e);
    }
    return {
      personalInfo: initialData.personalInfo,
      heroContent: initialData.heroContent,
      statsData: initialData.statsData,
      aboutContent: initialData.aboutContent,
      skillsContent: initialData.skillsContent,
      technicalSkills: initialData.technicalSkills,
      softSkillsList: initialData.softSkillsList,
      projects: initialData.projects,
      educationData: initialData.educationData,
      certificatesData: initialData.certificatesData,
      footerContent: initialData.footerContent,
      socialLinks: initialData.socialLinks,
    };
  });

  // Admin Modal & Authentication State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  // Check URL hash (#admin) on load and listen for hash changes
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard shortcut: Ctrl + Shift + A to open Admin Panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save changes to state & localStorage
  const updateData = (updater) => {
    setData((prev) => {
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return updated;
    });
  };

  // Reset to original default portfolioData
  const resetToDefaults = () => {
    const defaults = {
      personalInfo: initialData.personalInfo,
      heroContent: initialData.heroContent,
      statsData: initialData.statsData,
      aboutContent: initialData.aboutContent,
      skillsContent: initialData.skillsContent,
      technicalSkills: initialData.technicalSkills,
      softSkillsList: initialData.softSkillsList,
      projects: initialData.projects,
      educationData: initialData.educationData,
      certificatesData: initialData.certificatesData,
      footerContent: initialData.footerContent,
      socialLinks: initialData.socialLinks,
    };
    localStorage.removeItem(STORAGE_KEY);
    setData(defaults);
  };

  // Admin login handler
  const login = (username, password) => {
    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  // Admin logout handler
  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // Export current configuration as JSON download
  const exportBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `yash_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const importBackup = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      updateData(parsed);
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        ...data,
        updateData,
        resetToDefaults,
        exportBackup,
        importBackup,
        isAdminOpen,
        setIsAdminOpen,
        openAdmin: () => setIsAdminOpen(true),
        closeAdmin: () => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', ' ');
          }
        },
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
