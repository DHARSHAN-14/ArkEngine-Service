import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Mail, Send, ArrowRight } from 'lucide-react'

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
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, var(--glow) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
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
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="heading-lg mb-6"
            >
              Have an idea? Let's turn it into
              <span className="italic" style={{ color: 'var(--accent)' }}> a working system.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="body-text mb-10"
            >
              Tell us what you're building and we'll get back to you with a clear, honest
              assessment of how we can help — and what it would realistically take.
            </motion.p>

            {/* Contact options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20project%20idea%20I'd%20like%20to%20discuss%20with%20ArkEngine."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group"
                style={{ border: '1.5px solid var(--border)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#25d366'
                  e.currentTarget.style.background = '#25d36610'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: '#25d36618' }}
                >
                  <MessageCircle size={18} style={{ color: '#25d366' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    WhatsApp — Quick chat
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Fastest way to reach us
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-secondary)', marginLeft: 'auto' }} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="mailto:hello@arkengine.com"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group"
                style={{ border: '1.5px solid var(--border)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--glow)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--accent)' + '18' }}
                >
                  <Mail size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    hello@arkengine.com
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    We reply within 24 hours
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-secondary)', marginLeft: 'auto' }} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="card-glass p-8"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@yourcompany.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    PROJECT TYPE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedType(t)}
                        className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                        style={{
                          border: `1.5px solid ${selectedType === t ? 'var(--accent)' : 'var(--border)'}`,
                          background: selectedType === t ? 'var(--accent)' + '15' : 'transparent',
                          color: selectedType === t ? 'var(--accent)' : 'var(--text-secondary)',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    TELL US ABOUT YOUR PROJECT
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="What are you trying to build? What problem does it solve?"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                >
                  Send Message
                  <Send size={14} />
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                  No spam. Just an honest reply within 24 hours.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: '#4a8a5e18', border: '1px solid #4a8a5e40' }}
                >
                  <Send size={22} style={{ color: '#4a8a5e' }} />
                </div>
                <h3 className="heading-lg text-xl mb-3">Message sent!</h3>
                <p className="body-text text-sm">
                  We'll get back to you within 24 hours. Looking forward to hearing more.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
