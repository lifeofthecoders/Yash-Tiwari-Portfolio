
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import * as initialData from '../data/portfolioData';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'yash_portfolio_data_v2';
const LEGACY_STORAGE_KEY = 'yash_portfolio_data_v1';
const AUTH_KEY = 'yash_admin_authenticated';

// IMPORTANT:
// These credentials are currently frontend-side credentials.
// Replace the values with your new credentials before deployment.
// For real production security, use server-side authentication.
export const ADMIN_CREDENTIALS = {
  username: 'Admin',
  password: 'Yashtiwari@Admin2026',
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

// --------------------------------------------------
// DEFAULT DATA
// --------------------------------------------------

const buildDefaults = () =>
  Object.fromEntries(
    CONTENT_KEYS
      .filter((key) => initialData[key] !== undefined)
      .map((key) => [key, initialData[key]])
  );

// --------------------------------------------------
// MERGE SAVED DATA WITH DEFAULT DATA
// --------------------------------------------------

const mergeDefaults = (defaults, saved) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(saved) ? saved : defaults;
  }

  if (defaults && typeof defaults === 'object') {
    const source =
      saved &&
        typeof saved === 'object' &&
        !Array.isArray(saved)
        ? saved
        : {};

    const merged = Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [
        key,
        mergeDefaults(value, source[key]),
      ])
    );

    // Preserve administrator-created custom fields.
    Object.entries(source).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
        merged[key] = value;
      }
    });

    return merged;
  }

  return saved === undefined ? defaults : saved;
};

// --------------------------------------------------
// LOAD INITIAL PORTFOLIO DATA
// --------------------------------------------------

const loadInitialData = () => {
  const defaults = buildDefaults();

  try {
    const saved =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem(LEGACY_STORAGE_KEY);

    return saved
      ? mergeDefaults(defaults, JSON.parse(saved))
      : defaults;
  } catch (error) {
    console.error(
      'Failed to load portfolio data from localStorage:',
      error
    );

    return defaults;
  }
};

// --------------------------------------------------
// ADMIN ROUTE HELPERS
// --------------------------------------------------

const isAdminRoute = () => {
  if (typeof window === 'undefined') return false;

  return window.location.hash.toLowerCase() === '#admin';
};

const getFrontendUrl = () => {
  return (
    window.location.pathname +
    window.location.search
  );
};

const getAdminUrl = () => {
  return (
    window.location.pathname +
    window.location.search +
    '#admin'
  );
};

// --------------------------------------------------
// PORTFOLIO PROVIDER
// --------------------------------------------------

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(loadInitialData);

  // Restore Admin Panel directly from the browser URL.
  // This works after normal refresh and hard refresh.
  const [isAdminOpen, setIsAdminOpen] = useState(
    () => isAdminRoute()
  );

  // sessionStorage survives refreshes in the same browser tab.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch (error) {
      console.error('Unable to restore admin session:', error);
      return false;
    }
  });

  // ------------------------------------------------
  // OPEN ADMIN PANEL
  // ------------------------------------------------

  const openAdmin = () => {
    if (typeof window !== 'undefined') {
      if (!isAdminRoute()) {
        window.history.pushState(
          { admin: true },
          '',
          getAdminUrl()
        );
      }

      // Reset the browser scroll immediately.
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }

    setIsAdminOpen(true);

    // Reset again after the Admin Panel starts rendering.
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  };

  // Always open the full-page Admin Panel at the top.
  useEffect(() => {
    if (!isAdminOpen) return;

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    const firstFrame = requestAnimationFrame(() => {
      scrollToTop();

      requestAnimationFrame(scrollToTop);
    });

    return () => {
      cancelAnimationFrame(firstFrame);
    };
  }, [isAdminOpen]);

  // ------------------------------------------------
  // CLOSE ADMIN PANEL
  // ------------------------------------------------

  const closeAdmin = () => {
    if (typeof window !== 'undefined') {
      if (isAdminRoute()) {
        window.history.replaceState(
          { admin: false },
          '',
          getFrontendUrl()
        );
      }
    }

    setIsAdminOpen(false);
  };

  // ------------------------------------------------
  // ROUTE-AWARE ADMIN STATE
  // ------------------------------------------------

  // Supports existing components that call setIsAdminOpen().
  // Every state change also synchronizes the URL.
  const setAdminOpen = (nextValue) => {
    const nextState =
      typeof nextValue === 'function'
        ? nextValue(isAdminOpen)
        : nextValue;

    if (nextState) {
      openAdmin();
    } else {
      closeAdmin();
    }
  };

  // ------------------------------------------------
  // KEEP ADMIN ROUTE SYNCHRONIZED
  // ------------------------------------------------

  useEffect(() => {
    const syncAdminRoute = () => {
      setIsAdminOpen(isAdminRoute());
    };

    // Check URL on application initialization.
    syncAdminRoute();

    // Support normal hash navigation.
    window.addEventListener(
      'hashchange',
      syncAdminRoute
    );

    // Support browser back and forward navigation.
    window.addEventListener(
      'popstate',
      syncAdminRoute
    );

    return () => {
      window.removeEventListener(
        'hashchange',
        syncAdminRoute
      );

      window.removeEventListener(
        'popstate',
        syncAdminRoute
      );
    };
  }, []);

  // ------------------------------------------------
  // ADMIN KEYBOARD SHORTCUT
  // Ctrl + Shift + A
  // ------------------------------------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isAdminShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === 'a';

      if (!isAdminShortcut) return;

      event.preventDefault();

      if (isAdminRoute()) {
        closeAdmin();
      } else {
        openAdmin();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, []);

  // ------------------------------------------------
  // DYNAMIC SEO AND FAVICON
  // ------------------------------------------------

  useEffect(() => {
    const meta = data.siteMeta || {};

    const setMeta = (
      selector,
      attribute,
      value,
      content
    ) => {
      let element = document.head.querySelector(selector);

      if (!element && content) {
        element = document.createElement('meta');

        element.setAttribute(attribute, value);

        document.head.appendChild(element);
      }

      if (element) {
        if (content) {
          element.setAttribute('content', content);
        } else {
          element.removeAttribute('content');
        }
      }
    };

    // Page title.
    if (meta.title?.trim()) {
      document.title = meta.title.trim();
    } else if (meta.title === '') {
      document.title = '';
    }

    // SEO metadata.
    setMeta(
      'meta[name="description"]',
      'name',
      'description',
      meta.description || ''
    );

    setMeta(
      'meta[name="keywords"]',
      'name',
      'keywords',
      meta.keywords || ''
    );

    setMeta(
      'meta[name="theme-color"]',
      'name',
      'theme-color',
      meta.themeColor || ''
    );

    // Open Graph metadata.
    setMeta(
      'meta[property="og:title"]',
      'property',
      'og:title',
      meta.ogTitle || ''
    );

    setMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      meta.ogDescription || ''
    );

    setMeta(
      'meta[property="og:image"]',
      'property',
      'og:image',
      meta.ogImageUrl || ''
    );

    // Favicon.
    let favicon =
      document.head.querySelector('link[rel="icon"]');

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

  // ------------------------------------------------
  // UPDATE PORTFOLIO CONTENT
  // ------------------------------------------------

  const updateData = (updater) => {
    setData((previous) => {
      const updated =
        typeof updater === 'function'
          ? updater(previous)
          : {
            ...previous,
            ...updater,
          };

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.error(
          'Failed to save portfolio data:',
          error
        );
      }

      return updated;
    });
  };

  // ------------------------------------------------
  // RESET PORTFOLIO CONTENT
  // ------------------------------------------------

  const resetToDefaults = () => {
    const defaults = buildDefaults();

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);

    setData(defaults);
  };

  // ------------------------------------------------
  // ADMIN LOGIN
  // ------------------------------------------------

  const login = (username, password) => {
    const normalizedUsername =
      String(username || '').trim();

    const suppliedPassword =
      String(password || '');

    if (
      normalizedUsername === ADMIN_CREDENTIALS.username &&
      suppliedPassword === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);

      try {
        sessionStorage.setItem(
          AUTH_KEY,
          'true'
        );
      } catch (error) {
        console.error(
          'Unable to save admin session:',
          error
        );
      }

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: 'Invalid username or password',
    };
  };

  // ------------------------------------------------
  // ADMIN LOGOUT
  // ------------------------------------------------

  const logout = () => {
    setIsAuthenticated(false);

    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error(
        'Unable to clear admin session:',
        error
      );
    }
  };

  // ------------------------------------------------
  // EXPORT BACKUP
  // ------------------------------------------------

  const exportBackup = () => {
    const jsonString =
      `data:application/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`;

    const anchor = document.createElement('a');

    anchor.setAttribute('href', jsonString);

    anchor.setAttribute(
      'download',
      `portfolio-content-backup-${new Date()
        .toISOString()
        .slice(0, 10)}.json`
    );

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();
  };

  // ------------------------------------------------
  // IMPORT BACKUP
  // ------------------------------------------------

  const importBackup = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);

      updateData((previous) =>
        mergeDefaults(previous, parsed)
      );

      return true;
    } catch (error) {
      console.error(
        'Failed to import backup:',
        error
      );

      return false;
    }
  };

  // ------------------------------------------------
  // PROVIDER
  // ------------------------------------------------

  return (
    <PortfolioContext.Provider
      value={{
        ...data,

        updateData,
        resetToDefaults,

        exportBackup,
        importBackup,

        isAdminOpen,

        // Route-aware setter, not the raw React setter.
        setIsAdminOpen: setAdminOpen,

        openAdmin,
        closeAdmin,

        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// --------------------------------------------------
// CUSTOM HOOK
// --------------------------------------------------

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      'usePortfolio must be used within a PortfolioProvider'
    );
  }

  return context;
};
