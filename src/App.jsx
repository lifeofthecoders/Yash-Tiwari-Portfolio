import React from 'react'
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'
import Preloader from './components/Preloader'
import InteractiveCanvas from './components/InteractiveCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechnicalSkills from './components/TechnicalSkills'
import Services from './components/Services'
import Projects from './components/Projects'
import Experience from './components/Experience'
import SoftSkills from './components/SoftSkills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'

function PortfolioApp() {
  const { isAdminOpen } = usePortfolio()

  // The admin is a dedicated full-page screen. The public portfolio is not
  // mounted behind it, so the CMS never appears as a modal or pop-up.
  if (isAdminOpen) return <AdminPanel />

  return (
    <>
      <Preloader />
      <InteractiveCanvas />
      <Navbar />
      <Hero />
      <About />
      <TechnicalSkills />
      <Services />
      <Projects />
      <Experience />
      <SoftSkills />
      <Contact />
      <Footer />
    </>
  )
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  )
}

export default App
