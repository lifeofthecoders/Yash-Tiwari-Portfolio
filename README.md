# Yash Tiwari — Premium Portfolio & Supabase Content Manager

A cinematic, responsive portfolio created for **Yash Tiwari**, a B.Tech student in **Artificial Intelligence & Data Science** at **JECRC University**. The project combines a custom React interface, motion-led interactions, portfolio sections, and a page-wise content management panel backed by Supabase.

**Designed and developed by Sumit Panchal for client Yash Tiwari.** Sumit Panchal is the author and owner of the project's custom source code, architecture, visual implementation, and CMS integration, subject to any separate written agreement between the parties. Yash Tiwari's name, likeness, personal profile information, resume, certificates, and client-provided materials are used for the commissioned portfolio and are not represented as Sumit Panchal's personal information or achievements.

---

## 🚀 Key Features

- **Cinematic visual design:** A high-contrast crimson palette (`#f50604`) with a deep dark canvas, responsive layouts, and custom typography.
- **Hero experience:** Video background with playback and mute controls, responsive headline, highlight cards, and a downloadable resume.
- **Interactive About section:** Animated lanyard-style ID badge and profile presentation.
- **Interactive cursor canvas:** Native HTML5 canvas effects with touch-device handling.
- **Animated roadmap:** Scroll-responsive SVG path and timeline cards.
- **Projects showcase:** Bento-style project cards, visual elements, and case-study details.
- **Page-wise content manager:** Edit headings, copy, links, CTAs, tags, projects, academic records, navigation, metadata, and nested content without editing source files.
- **Supabase Cloud CMS:** Email/password authentication, administrator allowlist, protected draft content, and explicit publishing to a separate public content table.
- **Draft and publish workflow:** `Save Draft` stores private changes; `Publish Changes` makes the saved content available to public visitors.
- **JSON backups:** Export and import portfolio content from the Backup tab.
- **Responsive and animated UI:** Designed for desktop, tablet, and mobile layouts.

## 🧰 Technology Stack

### Application

- **React 19** — Component-based user interface.
- **Vite 8** — Development server and production build tooling.
- **JavaScript** — Application logic.
- **Tailwind CSS v4** — Utility-first styling.
- **PostCSS** — CSS processing.

### Animation and visual experience

- **Framer Motion** — Component and interaction animations.
- **AOS** — Scroll-triggered animation support.
- **Native HTML5 Canvas** — Cursor effects and particle visuals.
- **SVG** — Animated roadmap path and vector graphics.

### Services and utilities

- **Supabase JavaScript client** — Authentication and database access.
- **Supabase Auth** — Administrator sign-in and sessions.
- **Supabase PostgreSQL with Row Level Security (RLS)** — Private drafts and public published content.
- **EmailJS / email fallback** — Contact form integration, where configured.
- **Lucide React** — Icon library.

### Typography

The interface uses the project's configured fonts, including Space Grotesk, Playfair Display, Inter, and Alex Brush where available.

---

## 🗂️ Project Structure

The main application and CMS files are organized as follows:

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
│   │   └── PortfolioContext.jsx     # Portfolio state and Supabase CMS logic
│   ├── data/
│   │   └── portfolioData.js         # Bundled default portfolio content
│   ├── lib/
│   │   └── supabase.js              # Supabase client configuration
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   └── secure-cms-migration.sql     # Supabase CMS schema, RLS, and publish function
├── .env.local                       # Local secrets/configuration (not committed)
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

> The tree highlights the main application and CMS paths. Individual component or asset files may vary as the project evolves.

---

## ⚙️ Getting Started Locally

### Prerequisites

- **Node.js:** Use Node.js `20.19+` or `22.12+` (a supported current LTS release is recommended).
- **npm:** Installed with Node.js.
- **Git:** Required to clone and pull the repository.

### 1. Clone the repository

```bash
git clone https://github.com/lifeofthecoders/Yash-Tiwari-Portfolio.git
```

### 2. Navigate into the project

```bash
cd yash-tiwari-portfolio
```

### 3. Install dependencies

```bash
npm ci
```

If you intentionally do not have a lockfile, use `npm install` instead.

### 4. Configure Supabase locally

Create a `.env.local` file in the project root, alongside `package.json`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Use:

- The **Project URL** from Supabase. It should end in `.supabase.co`; do not append `/rest/v1/`.
- The **Publishable key** beginning with `sb_publishable_...` (or a legacy `anon` key, if that is what the project uses).

The application currently reads the publishable/anon key through the variable name `VITE_SUPABASE_ANON_KEY`. Keep that variable name exactly as shown.

**Never put a Supabase `sb_secret_...` key, `service_role` key, database password, or other privileged secret in a Vite environment variable.** Variables prefixed with `VITE_` are exposed to browser code. Use only the public publishable/anon key and rely on RLS for authorization.

The repository's `.gitignore` excludes `.env` and `.env.*` files while allowing `.env.example`. Keep real values in `.env.local`; do not commit that file.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in the terminal (normally `http://localhost:5173`). To open the admin route, append `#admin` to the URL.

### 6. Build and preview

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`.

---

## 🔐 Supabase CMS Setup and Administration

The CMS uses Supabase Auth and database authorization. It does not use a hardcoded username/password in the React source code.

### Database design

The CMS uses three main tables:

- **`portfolio_admins`** — UUID allowlist of users permitted to administer the portfolio.
- **`portfolio_content`** — Private draft content. Access is restricted by RLS to allowlisted administrators.
- **`portfolio_public_content`** — Published content readable by public visitors; modifications are restricted to allowlisted administrators.

The database function **`public.publish_portfolio_content()`** copies the saved `main` draft into the public content table. The function checks the authenticated user's UUID against `portfolio_admins`. Execution is revoked from `PUBLIC` and `anon` and granted to `authenticated`; the function's internal allowlist check remains required.

### First-time Supabase setup

For a **new Supabase project**:

1. Create the Supabase project.
2. Create the administrator account under **Authentication → Users**.
3. Copy that user's UUID and insert the UUID into `public.portfolio_admins`.
4. Run `supabase/secure-cms-migration.sql` in the Supabase SQL Editor.
5. Verify the tables, RLS policies, and publish function before connecting the frontend.
6. Configure the local environment variables described above.

The migration and policy checks have already been run for the current `yash-tiwari-portfolio` Supabase project. Do not rerun migration SQL on the existing production database unless you have reviewed the script and intend to apply it again. Keep a database backup before schema or policy changes.

### Opening the Admin Panel

- Use the portfolio's footer admin/settings control, where available; or
- Navigate directly to `/#admin` on the local or deployed site.

Sign in with the email and password of the Supabase Auth user whose UUID is present in `portfolio_admins`. There is no default password stored in `AdminPanel.jsx`. If the password is forgotten, use the configured Supabase password-recovery flow or reset the account through the Supabase authentication administration tools.

### Editing and publishing content

1. Sign in to the Admin Panel.
2. Choose a page-wise tab (Profile & Navigation, Home / Hero, About, Roadmap, Skills & Strengths, Projects, Academics & Credentials, Contact, Footer, or All Content).
3. Edit the relevant values and nested content.
4. Click **Save Draft**. The changes remain private in `portfolio_content`.
5. Review the draft. Click **Publish Changes** and confirm in the in-app confirmation dialog.
6. The publish function copies the draft to `portfolio_public_content`; public visitors can then read the published content.

Saving a draft does not update the public portfolio. Publishing is a separate, explicit action.

### Backup and migration of older browser content

The Backup tab supports JSON export and import. An imported backup is saved as a private draft; publish it separately when ready.

The earlier starter version used browser `localStorage`. Those old browser-specific edits do not automatically migrate to Supabase. If an export from the old Admin Panel is available, import it using the Backup tab. Do not assume that old browser data has been transferred unless you have imported and verified it.

### Media and file uploads

The content manager edits media URL/path fields. It does not currently provide a full Supabase Storage upload workflow. For files stored in the site's `public/` folder, add the asset to the project and enter its public path (for example, `/images/profile.webp`).

---

## 🌐 Vercel Deployment

This project is a Vite-based React single-page application and is deployed through Vercel.

1. Push the project to the connected GitHub repository: `lifeofthecoders/yash-tiwari-portfolio`.
2. Open the existing Vercel project and go to **Settings → Environment Variables**.
3. Add the following variables:

   - `VITE_SUPABASE_URL` — the base Supabase Project URL, without `/rest/v1/`.
   - `VITE_SUPABASE_ANON_KEY` — the Supabase publishable key (`sb_publishable_...`) or legacy anon key.

4. Select the environments you use (Production, Preview, and/or Development).
5. Save the variables. In Vercel, choose the **Config** type for these `VITE_` values because they are intentionally available to the browser. Do not add a Supabase secret/service-role key.
6. Redeploy after changing environment variables so the new build receives them.
7. Open the deployed `/#admin` route and verify login, draft saving, and publishing.

Use the existing Vercel project; a separate custom Vercel environment is not required for ordinary Production, Preview, or Development configuration.

---

## 🧭 Content Reference

The main content and implementation locations are:

| Area | File / location |
|---|---|
| Default portfolio content | `src/data/portfolioData.js` |
| Admin UI and publishing controls | `src/components/AdminPanel.jsx` |
| Portfolio state, Auth, draft and publish flow | `src/context/PortfolioContext.jsx` |
| Supabase client and environment variables | `src/lib/supabase.js` |
| Supabase schema, RLS, and publish function | `supabase/secure-cms-migration.sql` |
| Global styles and fonts | `src/index.css` |
| App entry and composition | `src/App.jsx`, `src/main.jsx` |
| Public media | `public/` and `src/assets/` |

---

## 🤝 Project Authorship, Ownership, and Third-Party Notices

This portfolio was **designed and developed by Sumit Panchal for client Yash Tiwari**.

The project-specific source code, custom UI implementation, application architecture, page composition, animations authored for this project, and Supabase CMS integration are the work of **Sumit Panchal**, who retains ownership and rights to that custom work, subject to any separate written agreement.

The custom implementation is not intended to be a copied or rebranded version of another GitHub repository or account. Third-party frameworks, packages, fonts, icons, and tools are dependencies or resources used under their respective licenses; their authors retain their own rights. Any client-provided or client-specific material—including Yash Tiwari's name, likeness, personal details, resume, certificates, and profile content—remains attributable to the client or its respective rights holder.

No ownership of third-party trademarks, packages, or client-provided personal materials is claimed by the project author.

## 📜 License

**All rights reserved for the custom project work authored by Sumit Panchal.** No permission is granted to copy, redistribute, modify, or commercially reuse the custom source code, design implementation, or project-specific materials without prior written permission from the rights holder. Third-party dependencies and assets remain subject to their own license terms. Client-specific materials remain subject to the rights of the client or their respective owners.

---

## 📫 Project and Client

- **Project:** Yash Tiwari — Premium Portfolio
- **Client:** Yash Tiwari
- **Developer and owner of custom project implementation:** Sumit Panchal
- **GitHub repository:** https://github.com/lifeofthecoders/Yash-Tiwari-Portfolio
- **Vercel deployment:** https://yash-tiwari-portfolio.vercel.app/

For project implementation, maintenance, or collaboration enquiries, contact the developer through the contact details maintained by the repository owner.

---

**Developed by Sumit Panchal for Yash Tiwari.**

© 2026 Sumit Panchal. All rights reserved for the custom project work, subject to the notices above.
