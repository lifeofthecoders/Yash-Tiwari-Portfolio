# Yash Tiwari — Premium Portfolio & Page-Wise Content Manager

A production-grade, cinematic portfolio designed for **Yash Tiwari**, B.Tech student in **Artificial Intelligence & Data Science** at **JECRC University**. Built with React 19, Vite, Tailwind CSS v4, and Framer Motion, featuring a page-wise content manager for editing the portfolio copy, cards, tags, nested project details, academic records, navigation, contact labels and calls to action.

---

## 🚀 Key Highlights

- **Visual Theme & Aesthetic**: High-contrast, studio-grade crimson (`#f50604`), deep dark canvas (`#0a0101`, `#0d0101`), clean typography (`Space Grotesk`, `Playfair Display`, `Inter`, `Alex Brush`).
- **100% Verified Profile**: Accurate academic representation (JECRC University 1st semester, Class 12: 88%, Class 10: 91% at Rajesh Public School) without exaggerated enterprise claims.
- **Cinematic Hero**: Autoplay video background with custom playback & mute controls, responsive headline, floating verified metric cards, and downloadable resume.
- **Interactive Lanyard ID Badge**: 3D drop-bounce swinging physics animation in the About section holding Yash's illustrated portrait.
- **Interactive Cursor Canvas**: Hardware-accelerated 2D canvas with mouse-following crimson sparks and radial spotlight (disabled automatically on touch screens).
- **Editable Learning Roadmap**: Winding SVG animated dashed line that traces scroll progress and highlights repeatable tag cards.
- **Building Next Bento Grid**: Project roadmap showcase with high-tech conceptual UI visualizers and interactive case study modals.
- **Page-Wise Content Manager**: Edit headings, subtitles, body copy, CTAs, tags, projects, academic records, skills, strengths, roadmap cards, navigation, metadata and nested details. Add/remove repeatable cards and custom fields. Blank content values are omitted from the public page.
- **Browser Storage**: Saved edits persist in the current browser origin using `localStorage`; this starter does not yet use a shared backend database or server-side CRM.

---

## ⚙️ Client Admin Panel Guide (Non-Tech Friendly)

The portfolio content can be edited from the built-in panel without changing source code. Saved edits are local to the browser and website origin where they are made; visitors on other browsers do not automatically receive those edits.

### 🔑 Authentication
- The current starter still uses browser-side credentials (`admin` / `yash@admin2026`) in client JavaScript. This is not secure authentication; do not use it to protect private information or sensitive admin operations.

### 🚪 How to Open the Admin Panel
1. **Footer Button**: Scroll to the footer and click the **`⚙️`** icon next to the "Get in Touch" button.
2. **Keyboard Shortcut**: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac) anywhere on the website.
3. **URL Hash**: Add `#admin` to the end of the website URL (e.g., `http://localhost:5173/#admin`).

### 📝 What You Can Edit
- **Profile & Navigation**: Site title/SEO metadata, identity, brand labels, contact details, social profiles and navigation items.
- **Home / Hero**: Greeting, every heading line, subtitle, video/poster URL, playback labels, statistics and all CTA text/URLs.
- **About**: Badge, heading, biography, image URL/alt text, fact cards and focus tags.
- **Roadmap**: Heading, description, status pills, unlimited timeline cards and closing tagline.
- **Skills & Strengths**: Section headings, skill categories, individual skill labels/status/tags/custom icons and personal-strength cards.
- **Projects**: Add/remove project cards, technology tags, image URLs, per-card CTA labels/URLs, visualizer tiles and nested case-study fields/contribution lists.
- **Academics & Credentials**: Select the current program, add/remove academic records, edit all institution/term/degree/grade/details and credential cards/competency tags.
- **Contact & Footer**: Form placeholders, consent text, submit/success/error messages, contact labels, footer taglines, links and copyright.
- **All Content**: Inspect and edit every saved data group, add custom fields, and clear defaults. Empty content fields are hidden by the updated public components.
- **Backup**: Export/import all editable content as JSON or reset to the bundled starting content.

### ⚠️ Current CMS Limitations
- `localStorage` is browser-specific. Edits do not sync to other visitors/devices and do not update the GitHub source or Vercel deployment. A shared Supabase/Firebase/API database and server-side authentication are required for a multi-user production CMS.
- Media fields accept URLs/paths. To add a new asset, place it in `public/` and enter its public path (for example `/images/profile.webp`); the panel does not upload files to a storage service.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) & [AOS](https://michalsnik.github.io/aos/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Canvas FX**: Native HTML5 2D Canvas with velocity particle physics
- **Contact Form**: Direct email fallback & [EmailJS](https://www.emailjs.com/) support
- **Fonts**: Space Grotesk, Playfair Display, Inter, Alex Brush (Google Fonts)

---

## 📁 Project Structure

```text
├── public/
│   ├── favicon.svg                # Monogram brand icon
│   ├── Yash_Tiwari_Resume.pdf     # Yash's actual resume
│   ├── images/yash-poster.png     # Poster fallback image
│   └── videos/yash-hero.mp4       # Hero background video
├── src/
│   ├── assets/                    # Bundled media assets
│   ├── components/
│   │   ├── About.jsx              # Lanyard badge & bio
│   │   ├── AdminPanel.jsx         # Client static admin dashboard
│   │   ├── Contact.jsx            # Parallax contact section
│   │   ├── Experience.jsx         # Academic journey & credentials
│   │   ├── Footer.jsx             # Brand footer & admin link
│   │   ├── Hero.jsx               # Video hero & floating stats
│   │   ├── InteractiveCanvas.jsx  # Particle cursor spotlight
│   │   ├── Navbar.jsx             # Responsive glassmorphic navigation
│   │   ├── Preloader.jsx          # Water-fill brand splash screen
│   │   ├── Projects.jsx           # Bento grid & case study modals
│   │   ├── Services.jsx           # 6-step winding roadmap
│   │   ├── SoftSkills.jsx         # Core cognitive strengths
│   │   └── TechnicalSkills.jsx    # Categorized skill clusters
│   ├── context/
│   │   └── PortfolioContext.jsx   # State & localStorage management
│   ├── data/
│   │   └── portfolioData.js       # Centralized default data
│   ├── App.jsx                    # Application root orchestrator
│   ├── index.css                  # Global Tailwind styles & fonts
│   └── main.jsx                   # React DOM entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/lifeofthecoders/yash-tiwari-portfolio.git

# Navigate to the folder
cd yash-tiwari-portfolio

# Install dependencies
npm install

# Start the local development server
npm run dev
```

### Building for Production
```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 📄 License

This project is created for **Yash Tiwari**. All personal rights reserved.
