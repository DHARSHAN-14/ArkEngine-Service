import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Mail, Send, ArrowRight, CheckCircle2 } from 'lucide-react'

const projectTypes = [
  'Web Development',
  'Mobile App',
  'Custom Software',
  'AI / Automation',
  'Not sure yet',
]

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedType, setSelectedType] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, var(--glow-strong) 0%, transparent 65%)',
        }}
      />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label mb-4"
            >
              Start a Conversation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65 }}
              className="heading-lg mb-6"
            >
              Have an idea? Let's turn it into
              <span className="italic" style={{ color: 'var(--accent)' }}> a working system.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.65 }}
              className="body-text mb-10"
            >
              Tell us what you're building and we'll get back to you with a clear, honest
              assessment of how we can help — and what it would realistically take.
            </motion.p>

            {/* Contact options */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="space-y-4"
            >
              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20project%20idea%20I'd%20like%20to%20discuss%20with%20ArkEngine."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 group"
                style={{ border: '1.5px solid var(--border)', background: 'var(--card-bg)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#25d366'
                  e.currentTarget.style.background = '#25d36608'
                  e.currentTarget.style.boxShadow = '0 4px 20px #25d36612'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--card-bg)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#25d36614' }}
                >
                  <MessageCircle size={18} style={{ color: '#25d366' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    WhatsApp — Quick chat
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Fastest way to reach us
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-secondary)', marginLeft: 'auto' }} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Email */}
              <a
                href="mailto:hello@arkengine.com"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 group"
                style={{ border: '1.5px solid var(--border)', background: 'var(--card-bg)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--glow)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--card-bg)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--glow)' }}
                >
                  <Mail size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    hello@arkengine.com
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    We reply within 24 hours
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-secondary)', marginLeft: 'auto' }} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="card-glass p-8 lg:p-10"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-medium mb-2.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300"
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 3px var(--glow)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium mb-2.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@yourcompany.com"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300"
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 3px var(--glow)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium mb-2.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {projectTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedType(t)}
                        className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                        style={{
                          border: `1.5px solid ${selectedType === t ? 'var(--accent)' : 'var(--border)'}`,
                          background: selectedType === t ? 'var(--glow)' : 'transparent',
                          color: selectedType === t ? 'var(--accent)' : 'var(--text-secondary)',
                          boxShadow: selectedType === t ? 'var(--shadow-glow)' : 'none',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium mb-2.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    Tell Us About Your Project
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="What are you trying to build? What problem does it solve?"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 resize-none"
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 3px var(--glow)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-sm group"
                >
                  Send Message
                  <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                  No spam. Just an honest reply within 24 hours.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center py-16"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7"
                  style={{ background: '#4a8a5e14', border: '1px solid #4a8a5e30' }}
                >
                  <CheckCircle2 size={28} style={{ color: '#4a8a5e' }} />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}
                >
                  Message sent!
                </h3>
                <p className="body-text text-sm max-w-xs mx-auto">
                  We'll get back to you within 24 hours. Looking forward to hearing more about your project.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-medium transition-colors duration-200"
                  style={{ color: 'var(--accent)' }}
                >
                  Send another message →
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
