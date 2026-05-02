import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustSection from './components/TrustSection'
import Services from './components/Services'
import Process from './components/Process'
import Projects from './components/Projects'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('arkengine-theme') === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('arkengine-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('arkengine-theme', 'light')
    }
  }, [isDark])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <TrustSection />
      <Services />
      <Process />
      <Projects />
      <About />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
