import React, { createContext, useContext, useState, useEffect } from 'react';
import * as initialData from '../data/portfolioData';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'yash_portfolio_data_v2';
const LEGACY_STORAGE_KEY = 'yash_portfolio_data_v1';
const AUTH_KEY = 'yash_admin_authenticated';

// Static client-side credentials are retained for backwards compatibility only.
// They are not secure for a public production admin system; use server auth before storing sensitive data.
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'yash@admin2026',
};

export const CONTENT_KEYS = [
  'siteMeta',
  'personalInfo',
  'socialLinks',
  'navigationContent',
  'heroContent',
  'statsData',
  'aboutContent',
  'skillsContent',
  'technicalSkills',
  'softSkillsContent',
  'softSkillsList',
  'projectsContent',
  'projects',
  'educationContent',
  'educationData',
  'certificatesData',
  'contactContent',
  'footerContent',
  'emailjsConfig',
];

const buildDefaults = () => Object.fromEntries(
  CONTENT_KEYS.filter((key) => initialData[key] !== undefined).map((key) => [key, initialData[key]])
);

const mergeDefaults = (defaults, saved) => {
  if (Array.isArray(defaults)) return Array.isArray(saved) ? saved : defaults;
  if (defaults && typeof defaults === 'object') {
    const source = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
    const merged = Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [key, mergeDefaults(value, source[key])])
    );
    // Preserve administrator-added custom fields that do not exist in the starter schema.
    Object.entries(source).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(defaults, key)) merged[key] = value;
    });
    return merged;
  }
  return saved === undefined ? defaults : saved;
};

const loadInitialData = () => {
  const defaults = buildDefaults();
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    return saved ? mergeDefaults(defaults, JSON.parse(saved)) : defaults;
  } catch (error) {
    console.error('Failed to load portfolio data from localStorage:', error);
    return defaults;
  }
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(loadInitialData);
  const [isAdminOpen, setIsAdminOpen] = useState(() => window.location.hash === '#admin');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') setIsAdminOpen(true);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        setIsAdminOpen((previous) => !previous);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const meta = data.siteMeta || {};
    const setMeta = (selector, attribute, value, content) => {
      let element = document.head.querySelector(selector);
      if (!element && content) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      if (element) {
        if (content) element.setAttribute('content', content);
        else element.removeAttribute('content');
      }
    };

    if (meta.title?.trim()) document.title = meta.title.trim();
    else if (meta.title === '') document.title = '';
    setMeta('meta[name="description"]', 'name', 'description', meta.description || '');
    setMeta('meta[name="keywords"]', 'name', 'keywords', meta.keywords || '');
    setMeta('meta[name="theme-color"]', 'name', 'theme-color', meta.themeColor || '');
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.ogTitle || '');
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.ogDescription || '');
    setMeta('meta[property="og:image"]', 'property', 'og:image', meta.ogImageUrl || '');
    let favicon = document.head.querySelector('link[rel="icon"]');
    if (meta.faviconUrl) {
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = meta.faviconUrl;
    } else if (favicon) {
      favicon.removeAttribute('href');
    }
  }, [data.siteMeta]);

  const updateData = (updater) => {
    setData((previous) => {
      const updated = typeof updater === 'function' ? updater(previous) : { ...previous, ...updater };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save portfolio data:', error);
      }
      return updated;
    });
  };

  const resetToDefaults = () => {
    const defaults = buildDefaults();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setData(defaults);
  };

  const login = (username, password) => {
    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const exportBackup = () => {
    const jsonString = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const anchor = document.createElement('a');
    anchor.setAttribute('href', jsonString);
    anchor.setAttribute('download', `portfolio-content-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const importBackup = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      updateData((previous) => mergeDefaults(previous, parsed));
      return true;
    } catch (error) {
      console.error('Failed to import backup:', error);
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
            history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
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
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
