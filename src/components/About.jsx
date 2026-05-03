import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Code2, Users, Star } from 'lucide-react'

const values = [
  { icon: Heart, label: 'We care about your outcome, not just the deliverable.', color: '#b8651a' },
  { icon: Code2, label: 'We write code that\'s clean, documented, and maintainable.', color: '#4a8a5e' },
  { icon: Users, label: 'We keep communication simple, honest, and direct.', color: '#5a6e8a' },
  { icon: Star, label: 'We hold ourselves to a high standard — always.', color: '#8b7355' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-pad relative" style={{ background: 'var(--bg-secondary)' }}>
      {/* Top gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--section-gradient)' }}
      />
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label mb-4"
            >
              About ArkEngine
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65 }}
              className="heading-lg mb-7"
            >
              9 people.
              <span className="italic" style={{ color: 'var(--accent)' }}> Serious work.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.65 }}
              className="space-y-5"
            >
              <p className="body-text">
                ArkEngine is a small, deliberately-sized AI engineering studio. We didn't grow big on purpose —
                because we believe that a focused team of experienced engineers produces better work than a large
                agency with layers of management.
              </p>
              <p className="body-text">
                We are a small team, so every project gets real attention. We care about understanding
                the problem before writing code, and we build systems that are useful, scalable, and maintainable.
              </p>
              <p className="body-text">
                We've worked with startups, mid-sized businesses, and enterprises — and we treat each project
                with the same level of care: think first, build right, ship confidently.
              </p>
            </motion.div>
          </div>

          {/* Right — values panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="card-glass p-8 lg:p-10 relative overflow-hidden">
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, var(--glow-strong) 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
              />

              <div className="section-label mb-7 relative z-10">How we think</div>

              <div className="space-y-6 relative z-10">
                {values.map((v, i) => {
                  const Icon = v.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.55 }}
                      className="flex items-start gap-4 group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${v.color}14`,
                          border: `1px solid ${v.color}28`,
                        }}
                      >
                        <Icon size={15} style={{ color: v.color }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {v.label}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Team avatars */}
              <div
                className="mt-9 pt-7 flex items-center gap-4 relative z-10"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs text-white font-bold transition-transform duration-200 hover:scale-110 hover:z-10"
                      style={{
                        background: ['#b8651a', '#4a8a5e', '#5a6e8a', '#7a5ea0', '#8b7355'][i],
                        borderColor: 'var(--card-bg-solid)',
                      }}
                    >
                      {['A', 'R', 'K', 'E', 'N'][i]}
                    </div>
                  ))}
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[11px] font-bold"
                    style={{
                      background: 'var(--glow)',
                      borderColor: 'var(--card-bg-solid)',
                      color: 'var(--text-secondary)',
                      border: '2px solid var(--card-bg-solid)',
                    }}
                  >
                    +4
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    9-member core team
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                    Based in India, serving globally
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
