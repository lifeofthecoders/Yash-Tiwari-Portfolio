import React from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
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

function App() {
  return (
    <PortfolioProvider>
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
      <AdminPanel />
    </PortfolioProvider>
  )
}

export default App
