
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as initialData from '../data/portfolioData';
import { supabase, supabaseConfigured } from '../lib/supabase';

const PortfolioContext = createContext(null);
const CONTENT_ROW_ID = 'main';

export const CONTENT_KEYS = [
  'siteMeta', 'personalInfo', 'socialLinks', 'navigationContent', 'heroContent',
  'statsData', 'aboutContent', 'skillsContent', 'technicalSkills',
  'softSkillsContent', 'softSkillsList', 'projectsContent', 'projects',
  'educationContent', 'educationData', 'certificatesData', 'contactContent',
  'footerContent', 'emailjsConfig',
];

const buildDefaults = () => Object.fromEntries(
  CONTENT_KEYS
    .filter((key) => initialData[key] !== undefined)
    .map((key) => [key, initialData[key]])
);

const mergeDefaults = (defaults, saved) => {
  if (Array.isArray(defaults)) return Array.isArray(saved) ? saved : defaults;

  if (defaults && typeof defaults === 'object') {
    const source = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
    const merged = Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [
        key,
        mergeDefaults(value, source[key]),
      ])
    );

    Object.entries(source).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
        merged[key] = value;
      }
    });

    return merged;
  }

  return saved === undefined ? defaults : saved;
};

const isAdminRoute = () =>
  typeof window !== 'undefined' &&
  window.location.hash.toLowerCase() === '#admin';

const getFrontendUrl = () =>
  window.location.pathname + window.location.search;

const getAdminUrl = () =>
  `${window.location.pathname}${window.location.search}#admin`;

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(buildDefaults);
  const [isAdminOpen, setIsAdminOpen] = useState(isAdminRoute);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [contentLoading, setContentLoading] = useState(true);

  // --------------------------------------------------
  // ADMIN ROUTING
  // --------------------------------------------------

  const openAdmin = () => {
    if (!isAdminRoute()) {
      window.history.pushState(
        { admin: true },
        '',
        getAdminUrl()
      );
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    if (isAdminRoute()) {
      window.history.replaceState(
        { admin: false },
        '',
        getFrontendUrl()
      );
    }

    setIsAdminOpen(false);
  };

  const setAdminOpen = (nextValue) => {
    const next =
      typeof nextValue === 'function'
        ? nextValue(isAdminOpen)
        : nextValue;

    if (next) {
      openAdmin();
    } else {
      closeAdmin();
    }
  };

  useEffect(() => {
    const syncRoute = () => {
      setIsAdminOpen(isAdminRoute());
    };

    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);

    syncRoute();

    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  // Always open the full-page Admin Panel at the top.
  useEffect(() => {
    if (!isAdminOpen) return undefined;

    const scroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scroll();

    const frame = requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll);
    });

    return () => cancelAnimationFrame(frame);
  }, [isAdminOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === 'a'
      ) {
        event.preventDefault();

        if (isAdminRoute()) {
          closeAdmin();
        } else {
          openAdmin();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // --------------------------------------------------
  // ADMIN AUTHORIZATION
  // --------------------------------------------------

  const checkAdmin = async (user) => {
    if (!user || !supabase) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUserEmail('');
      return false;
    }

    setIsAuthenticated(true);
    setUserEmail(user.email || '');

    const { data: adminRow, error } = await supabase
      .from('portfolio_admins')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Admin authorization check failed:', error);

      setIsAdmin(false);

      setAuthError(
        'Could not verify administrator access. Check the Supabase administrator table and RLS policies.'
      );

      return false;
    }

    const allowed = Boolean(adminRow);

    setIsAdmin(allowed);

    setAuthError(
      allowed
        ? ''
        : 'This account is not registered as a portfolio administrator.'
    );

    return allowed;
  };

  // --------------------------------------------------
  // LOAD PUBLICLY PUBLISHED CONTENT
  // --------------------------------------------------

  const loadPublishedContent = async () => {
    if (!supabaseConfigured) {
      setContentLoading(false);
      return;
    }

    const { data: row, error } = await supabase
      .from('portfolio_public_content')
      .select('content')
      .eq('id', CONTENT_ROW_ID)
      .maybeSingle();

    if (error) {
      console.error(
        'Could not load published portfolio content:',
        error
      );
    } else if (row?.content) {
      setData(
        mergeDefaults(buildDefaults(), row.content)
      );
    }

    setContentLoading(false);
  };

  // --------------------------------------------------
  // LOAD PRIVATE ADMIN DRAFT
  // --------------------------------------------------

  const loadDraft = async () => {
    if (!isAuthenticated || !isAdmin || !supabase) {
      throw new Error(
        'Administrator authorization is required to load draft content.'
      );
    }

    const { data: row, error } = await supabase
      .from('portfolio_content')
      .select('content')
      .eq('id', CONTENT_ROW_ID)
      .maybeSingle();

    if (error) throw error;

    const draft =
      row?.content && Object.keys(row.content).length > 0
        ? mergeDefaults(buildDefaults(), row.content)
        : buildDefaults();

    return draft;
  };

  // --------------------------------------------------
  // SAVE PRIVATE DRAFT
  // --------------------------------------------------

  const saveDraft = async (nextContent) => {
    if (!isAuthenticated || !isAdmin || !supabase) {
      throw new Error(
        'Administrator authorization is required to save a draft.'
      );
    }

    const { error } = await supabase
      .from('portfolio_content')
      .upsert(
        {
          id: CONTENT_ROW_ID,
          content: nextContent,
          is_published: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) throw error;

    return true;
  };

  // --------------------------------------------------
  // PUBLISH CONTENT
  // --------------------------------------------------

  const publishDraft = async (nextContent) => {
    await saveDraft(nextContent);

    const { error } = await supabase.rpc(
      'publish_portfolio_content'
    );

    if (error) throw error;

    setData(
      mergeDefaults(buildDefaults(), nextContent)
    );

    return true;
  };

  // --------------------------------------------------
  // RESTORE SUPABASE SESSION
  // --------------------------------------------------

  useEffect(() => {
    if (!supabaseConfigured) {
      setAuthError(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.'
      );

      setAuthLoading(false);
      setContentLoading(false);

      return undefined;
    }

    let mounted = true;

    const initialize = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(
          'Could not restore Supabase session:',
          error
        );
      }

      if (mounted) {
        await checkAdmin(session?.user ?? null);
        await loadPublishedContent();
        setAuthLoading(false);
      }
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setTimeout(async () => {
          if (!mounted) return;

          await checkAdmin(session?.user ?? null);
        }, 0);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // --------------------------------------------------
  // DYNAMIC SEO AND FAVICON
  // --------------------------------------------------

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

    if (meta.title?.trim()) {
      document.title = meta.title.trim();
    }

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

    let favicon = document.head.querySelector(
      'link[rel="icon"]'
    );

    if (meta.faviconUrl) {
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }

      favicon.href = meta.faviconUrl;
    }
  }, [data.siteMeta]);

  // --------------------------------------------------
  // SUPABASE LOGIN
  // --------------------------------------------------

  const login = async (email, password) => {
    if (!supabaseConfigured) {
      return {
        success: false,
        message: 'Supabase is not configured.',
      };
    }

    setAuthError('');

    const {
      data: result,
      error,
    } = await supabase.auth.signInWithPassword({
      email: String(email || '').trim(),
      password: String(password || ''),
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const allowed = await checkAdmin(result.user);

    if (!allowed) {
      await supabase.auth.signOut();

      setIsAuthenticated(false);
      setIsAdmin(false);

      return {
        success: false,
        message:
          'This account is authenticated but is not on the administrator allowlist.',
      };
    }

    return { success: true };
  };

  // --------------------------------------------------
  // SUPABASE LOGOUT
  // --------------------------------------------------

  const logout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase logout failed:', error);
      }
    }

    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserEmail('');
  };

  // Backwards-compatible alias.
  // Updates are now saved as private drafts.
  const updateData = saveDraft;

  const resetToDefaults = () =>
    saveDraft(buildDefaults());

  // --------------------------------------------------
  // EXPORT BACKUP
  // --------------------------------------------------

  const exportBackup = () => {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;

    anchor.download =
      `portfolio-content-backup-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  // --------------------------------------------------
  // IMPORT BACKUP
  // --------------------------------------------------

  const importBackup = async (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);

      const merged = mergeDefaults(
        buildDefaults(),
        parsed
      );

      await saveDraft(merged);

      return {
        success: true,
        content: merged,
      };
    } catch (error) {
      console.error(
        'Failed to import portfolio backup:',
        error
      );

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <PortfolioContext.Provider
      value={{
        ...data,

        updateData,
        saveDraft,
        loadDraft,
        publishDraft,

        resetToDefaults,

        exportBackup,
        importBackup,

        isAdminOpen,
        setIsAdminOpen: setAdminOpen,

        openAdmin,
        closeAdmin,

        isAuthenticated,
        isAdmin,
        userEmail,

        authLoading,
        authError,
        contentLoading,

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
