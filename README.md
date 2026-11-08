<div align="center">

# Yash Tiwari - Portfolio

### A cinematic personal portfolio with a Supabase-powered content management system.

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-Visit%20Website-f50604?style=for-the-badge&logo=vercel&logoColor=white)](https://yash-tiwari-portfolio.vercel.app/)
[![React](https://img.shields.io/badge/React-19-20232a?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-CMS-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)

**Designed and developed by [Sumit Panchal](https://github.com/lifeofthecoders) for client Yash Tiwari.**

[Overview](#-overview) · [Features](#-highlights) · [Technology](#-technology-stack) · [Setup](#-getting-started) · [CMS](#-supabase-cms) · [Deployment](#-deployment) · [Ownership](#-authorship--ownership)

</div>

---

## 🎯 Overview

This project is a cinematic, responsive portfolio created for **Yash Tiwari**, a B.Tech student in **Artificial Intelligence & Data Science at JECRC University**. It brings together a custom React interface, motion-led interactions, project and academic showcases, and a page-wise content manager.

The content manager is powered by **Supabase Auth and PostgreSQL**. Administrators can edit portfolio content, save private drafts, and explicitly publish approved changes to the public website.

> **Project roles:** Sumit Panchal is the developer and owner of the custom project implementation. Yash Tiwari is the client and the subject of the portfolio. Client-specific content and supplied materials remain attributable to their respective rights holders.

## ✨ Highlights

| Area | What it provides |
|---|---|
| Visual identity | Deep dark surfaces, a crimson accent palette, responsive layouts, and custom typography |
| Hero | Video background, playback and mute controls, headline, highlight cards, and resume link |
| About | Profile presentation with an animated lanyard-style ID badge |
| Interactive canvas | Native HTML canvas cursor effects with touch-device handling |
| Roadmap | Scroll-responsive SVG path and animated timeline cards |
| Projects | Bento-style project presentation and case-study details |
| Content manager | Page-wise editing for copy, links, CTAs, tags, cards, academic details, and nested content |
| Cloud CMS | Supabase authentication, admin allowlist, protected drafts, and separate public content |
| Publishing workflow | Save Draft privately, review, then publish explicitly |
| Backup | JSON export and import for portfolio content |

## 🧰 Technology Stack

### Application

- **React 19** - Component-based user interface.
- **Vite 8** - Development server and production build tooling.
- **JavaScript** - Application logic.
- **Tailwind CSS v4** - Utility-first styling.
- **PostCSS** - CSS processing.

### Motion and visuals

- **Framer Motion** - Component and interaction animations.
- **AOS** - Scroll-triggered animation support.
- **HTML5 Canvas** - Cursor effects and particle visuals.
- **SVG** - Animated roadmap path and vector graphics.

### Backend services and utilities

- **Supabase Auth** - Administrator authentication and session management.
- **Supabase PostgreSQL** - Draft and published portfolio content.
- **Row Level Security (RLS)** - Database-level access control.
- **Supabase JavaScript client** - Frontend connection to Supabase.
- **EmailJS / email fallback** - Contact form integration, where configured.
- **Lucide React** - Icon library.

### Typography

The interface uses the project's configured fonts, including **Space Grotesk, Playfair Display, Inter, and Alex Brush**, where available.

## 📁 Project Structure

The following tree shows the main application and CMS files. Individual assets and components may evolve as the project is maintained.

```text
yash-tiwari-portfolio/
├── public/
│   ├── favicon.svg
│   ├── Yash_Tiwari_Resume.pdf
│   ├── images/
│   │   └── yash-poster.png
│   └── videos/
│       └── yash-hero.mp4
├── src/
│   ├── assets/                      # Bundled media and visual assets
│   ├── components/
│   │   ├── admin/
│   │   │   └── DynamicContentEditor.jsx
│   │   ├── About.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── InteractiveCanvas.jsx
│   │   ├── Navbar.jsx
│   │   ├── Preloader.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   ├── SoftSkills.jsx
│   │   └── TechnicalSkills.jsx
│   ├── context/
│   │   └── PortfolioContext.jsx     # State, Auth, draft and publish logic
│   ├── data/
│   │   └── portfolioData.js         # Bundled default content
│   ├── lib/
│   │   └── supabase.js              # Supabase client configuration
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   └── secure-cms-migration.sql     # CMS schema, RLS and publish function
├── .env.example                     # Safe environment-variable template
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- **Node.js:** `20.19+` or `22.12+` (use a supported LTS release).
- **npm:** Included with Node.js.
- **Git:** Required to clone the repository.

### 1. Clone the repository

```bash
git clone https://github.com/lifeofthecoders/Yash-Tiwari-Portfolio.git
cd yash-tiwari-portfolio
```

### 2. Install dependencies

```bash
npm ci
```

Use `npm install` only when you intentionally need to regenerate or update the lockfile.

### 3. Configure local environment variables

Create a file named `.env.local` in the project root, alongside `package.json`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Use the **base Supabase Project URL**. It should end in `.supabase.co`; do not append `/rest/v1/`.

Use the Supabase **publishable key** beginning with `sb_publishable_...`, or a legacy `anon` key if that is what the project uses. The application intentionally reads this value from `VITE_SUPABASE_ANON_KEY`; keep the variable name exactly as shown.

> **Security:** Vite exposes variables prefixed with `VITE_` to browser code. Only use a Supabase publishable/anon key here. Never put an `sb_secret_...` key, `service_role` key, database password, or other privileged secret in `.env.local` or any frontend source file.

The repository's `.gitignore` excludes `.env` and `.env.*` files while allowing `.env.example`. Keep real values in `.env.local` and never commit that file.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal (normally `http://localhost:5173`). To open the administrator route, append `#admin` to the URL.

### 5. Build and preview

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`.

## 🔐 Supabase CMS

The CMS uses Supabase Auth and database authorization. The React source does **not** contain a default administrator username or password.

### Database model

| Database object | Purpose | Access model |
|---|---|---|
| `portfolio_admins` | UUID allowlist of administrators | An authenticated user can read their own allowlist row; administration is restricted |
| `portfolio_content` | Private draft content | RLS restricts access to allowlisted administrators |
| `portfolio_public_content` | Published portfolio content | Public read; modifications restricted to allowlisted administrators |
| `public.publish_portfolio_content()` | Copies the saved `main` draft into the public content table | Internal admin allowlist check; execution granted to `authenticated`, revoked from `PUBLIC` and `anon` |

### First-time setup for a new Supabase project

1. Create a Supabase project.
2. Create the administrator account under **Authentication → Users**.
3. Copy the administrator's user UUID and add that UUID to `public.portfolio_admins`.
4. Review and run `supabase/secure-cms-migration.sql` in the Supabase SQL Editor.
5. Verify the tables, RLS policies, and publish function.
6. Configure the frontend environment variables described above.

**Existing production database:** The migration and policy checks have already been run and verified for the current `yash-tiwari-portfolio` Supabase project. Do not rerun migration SQL on that existing production database unless you have reviewed the script and intentionally plan to apply it again. Take a database backup before schema or policy changes.

### Open the Admin Panel

- Use the portfolio's footer admin/settings control, where available; or
- Navigate to `/#admin` on the local or deployed website.

Sign in using the email and password of the Supabase Auth user whose UUID is present in `portfolio_admins`. There is **no default password** in `AdminPanel.jsx`.

The current Admin Panel does not include a self-service **Forgot Password** control. If the password is forgotten, reset it through the Supabase Authentication administration tools. Do not rely on browser autofill as the source of truth for credentials.

### Edit, save, and publish

1. Sign in to the Admin Panel.
2. Select a page-wise tab: Profile & Navigation, Home / Hero, About, Roadmap, Skills & Strengths, Projects, Academics & Credentials, Contact, Footer, or All Content.
3. Edit the required values, cards, links, tags, or nested content.
4. Click **Save Draft**. Changes are stored privately in `portfolio_content`.
5. Review the draft, then click **Publish Changes** and confirm in the in-app dialog.
6. The publish function copies the draft into `portfolio_public_content`, where public visitors can read it.

**Saving is not publishing.** Draft changes remain private until the administrator explicitly publishes them.

### Backup and earlier browser content

The Backup tab supports JSON export and import. An imported backup is saved as a private draft; publish it separately when ready.

The earlier starter version used browser `localStorage`. Those old browser-specific edits do not automatically migrate to Supabase or sync across devices. If an export from the old Admin Panel is available, import it through the Backup tab and verify the result before publishing.

### Media and file uploads

The content manager edits media URL/path fields; it does not currently provide a full Supabase Storage upload workflow. To use a file stored with the website, add it to the appropriate project asset folder and enter its public path (for example, `/images/profile.webp`).

## 🚀 Deployment on Vercel

This is a **Vite + React single-page application** and can be deployed through Vercel.

1. Push the project to the connected GitHub repository.
2. Open the existing Vercel project and go to **Settings → Environment Variables**.
3. Add the following variables:

   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | Base Supabase Project URL, without `/rest/v1/` |
   | `VITE_SUPABASE_ANON_KEY` | Supabase publishable key (`sb_publishable_...`) or legacy anon key |

4. Select the required environments: **Production**, **Preview**, and/or **Development**.
5. In Vercel, use the **Config** type for these `VITE_` values because they are intentionally exposed to the browser. Do not add a Supabase secret or service-role key.
6. Save the variables and redeploy so the new build receives them.
7. Verify the live website, admin login, draft saving, and publishing workflow.

A custom Vercel environment is not required for the standard Production, Preview, or Development setup.

**Current live portfolio:** [yash-tiwari-portfolio.vercel.app](https://yash-tiwari-portfolio.vercel.app/)

## 🧭 Content and Code Reference

| Area | Main file / location |
|---|---|
| Default portfolio content | `src/data/portfolioData.js` |
| Admin interface and publishing controls | `src/components/AdminPanel.jsx` |
| Portfolio state, authentication, drafts, and publishing | `src/context/PortfolioContext.jsx` |
| Supabase client and environment variables | `src/lib/supabase.js` |
| Database schema, RLS, and publish function | `supabase/secure-cms-migration.sql` |
| Global styles and fonts | `src/index.css` |
| Application composition and entry point | `src/App.jsx`, `src/main.jsx` |
| Public media | `public/`, `src/assets/` |

## 🛡️ Security Notes

- Keep `.env.local` out of Git. Confirm with `git check-ignore -v .env.local`.
- Use only the Supabase publishable/anon key in frontend configuration.
- Never expose a Supabase secret/service-role key in Vite variables or client-side code.
- Keep RLS enabled and review policies before changing database access.
- Keep the publish function's internal administrator allowlist check and its restricted execution grants.
- Use a unique, strong administrator password and rotate it if it has been exposed.
- Do not commit credentials, private tokens, or unredacted environment files.

## 🧑‍💻 Authorship & Ownership

This portfolio was **designed and developed by Sumit Panchal for client Yash Tiwari**.

Sumit Panchal is the author and owner of the **custom project implementation**, including the project-specific source code, application architecture, custom UI, page composition, authored animations, and Supabase CMS integration, subject to any separate written agreement between the parties.

Yash Tiwari is the client and the subject of the portfolio. His name, likeness, personal profile information, resume, certificates, and client-provided materials are not represented as Sumit Panchal's personal information or achievements. Those client-specific materials remain attributable to the client or their respective rights holders.

The custom implementation is not intended to be a copied or rebranded version of another GitHub repository or account. Third-party frameworks, packages, fonts, icons, and other resources remain the property of their respective authors and are used under their applicable licenses. No ownership of third-party trademarks, libraries, or client-provided materials is claimed by the project author.

## 📜 License

**All rights reserved for the custom project work authored by Sumit Panchal**, subject to any separate written agreement with the client. No permission is granted to copy, redistribute, modify, or commercially reuse the custom source code, design implementation, or project-specific materials without prior written permission from the applicable rights holder. Third-party dependencies and assets remain subject to their own license terms. Client-specific materials remain subject to the rights of the client or their respective owners.

## 📬 Project Details

- **Project:** Yash Tiwari - Premium Portfolio
- **Client / portfolio subject:** Yash Tiwari
- **Developer / owner of custom implementation:** Sumit Panchal
- **GitHub:** [lifeofthecoders/yash-tiwari-portfolio](https://github.com/lifeofthecoders/Yash-Tiwari-Portfolio)
- **Live website:** [yash-tiwari-portfolio.vercel.app](https://yash-tiwari-portfolio.vercel.app/)

For project implementation, maintenance, or collaboration enquiries, use the contact details maintained by the repository owner.

---

<div align="center">

**Developed by Sumit Panchal for Yash Tiwari.**

**PRECISION. QUALITY. TRUST. DELIVERED.**

© 2026 Sumit Panchal. All rights reserved for the custom project work, subject to the notices above.

</div>
