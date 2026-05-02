import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'var(--bg-primary)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: 'var(--accent)' }}
            >
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>A</span>
            </div>
            <span className="font-semibold text-base tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
              Ark<span style={{ color: 'var(--accent)' }}>Engine</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-all duration-200 hover:opacity-100"
                style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </button>

            <a
              href="#contact"
              className="hidden md:block btn-primary text-xs px-5 py-2.5"
            >
              Start a Project
            </a>

            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 py-6 px-6"
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-primary text-center mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
