
import React, { useEffect } from 'react'
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

  // Always open the full-page Admin Panel from the top.
  useEffect(() => {
    if (!isAdminOpen) return

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })

    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })

    return () => cancelAnimationFrame(frame)
  }, [isAdminOpen])

  // The admin is a dedicated full-page screen.
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
