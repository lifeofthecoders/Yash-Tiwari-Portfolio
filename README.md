# Yash Tiwari — Premium Portfolio & Static Admin Panel

A production-grade, cinematic portfolio designed for **Yash Tiwari**, B.Tech student in **Artificial Intelligence & Data Science** at **JECRC University**. Built with React 19, Vite, Tailwind CSS v4, and Framer Motion, featuring a database-free static Admin Panel for non-technical content management.

---

## 🚀 Key Highlights

- **Visual Theme & Aesthetic**: High-contrast, studio-grade crimson (`#f50604`), deep dark canvas (`#0a0101`, `#0d0101`), clean typography (`Space Grotesk`, `Playfair Display`, `Inter`, `Alex Brush`).
- **100% Verified Profile**: Accurate academic representation (JECRC University 1st semester, Class 12: 88%, Class 10: 91% at Rajesh Public School) without exaggerated enterprise claims.
- **Cinematic Hero**: Autoplay video background with custom playback & mute controls, responsive headline, floating verified metric cards, and downloadable resume.
- **Interactive Lanyard ID Badge**: 3D drop-bounce swinging physics animation in the About section holding Yash's illustrated portrait.
- **Interactive Cursor Canvas**: Hardware-accelerated 2D canvas with mouse-following crimson sparks and radial spotlight (disabled automatically on touch screens).
- **6-Stage Learning Roadmap**: Winding SVG animated dashed line that traces scroll progress and highlights active tag cards.
- **Building Next Bento Grid**: Project roadmap showcase with high-tech conceptual UI visualizers and interactive case study modals.
- **Database-Free Static Admin Panel**: Non-technical client dashboard with password protection, real-time `localStorage` persistence, backup export/import, and factory reset.

---

## ⚙️ Client Admin Panel Guide (Non-Tech Friendly)

Yash can customize his portfolio at any time without touching code, editing JSON, or needing a database.

### 🔑 Authentication
- Access credentials are provided privately to the client by the administrator.

### 🚪 How to Open the Admin Panel
1. **Footer Button**: Scroll to the footer and click the **`⚙️`** icon next to the "Get in Touch" button.
2. **Keyboard Shortcut**: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac) anywhere on the website.
3. **URL Hash**: Add `#admin` to the end of the website URL (e.g., `http://localhost:5173/#admin`).

### 📝 What You Can Edit
- **Identity & Contact**: Name, title, university, current semester, location, phone number, and email.
- **Hero**: Welcoming greeting, headline, subtitle, and CTA buttons.
- **Stats & Facts**: Semester count, Class 12th score, Class 10th score, and focus area.
- **About Me**: Biography description and headline.
- **Learning Roadmap**: All 6 sequential curriculum stages, status tags, and descriptions.
- **Projects**: Project titles, categories, duration, badges, descriptions, and case study details.
- **Academic Track**: Degrees, institutions, grades, and credentials in progress.
- **Data Backup & Reset**: Download a backup file (`.json`), upload a backup to restore, or click **Reset to Defaults** to restore the verified original data.

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
git clone https://github.com/lifeofthecoders/yash-portfolio.git

# Navigate to the folder
cd yash-portfolio

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
