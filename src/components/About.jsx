import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Code2, Users, Star } from 'lucide-react'

const values = [
  { icon: Heart, label: 'We care about your outcome, not just the deliverable.' },
  { icon: Code2, label: 'We write code that\'s clean, documented, and maintainable.' },
  { icon: Users, label: 'We keep communication simple, honest, and direct.' },
  { icon: Star, label: 'We hold ourselves to a high standard — always.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="heading-lg mb-6"
            >
              9 people.
              <span className="italic" style={{ color: 'var(--accent)' }}> Serious work.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="space-y-4"
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
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <div
              className="card-glass p-8 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
              />

              <div className="section-label mb-6">How we think</div>

              <div className="space-y-5">
                {values.map((v, i) => {
                  const Icon = v.icon
                  return (
                    <motion.div
                      key={v.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'var(--accent)' + '15', border: '1px solid var(--accent)' + '30' }}
                      >
                        <Icon size={14} style={{ color: 'var(--accent)' }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {v.label}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Team tag */}
              <div
                className="mt-8 pt-6 flex items-center gap-3"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs text-white font-bold"
                      style={{
                        background: ['#b8651a', '#4a8a5e', '#5a6e8a', '#7a5ea0', '#8b7355'][i],
                        borderColor: 'var(--bg-secondary)',
                      }}
                    >
                      {['A', 'R', 'K', 'E', 'N'][i]}
                    </div>
                  ))}
                  <div
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'var(--border)',
                      borderColor: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    +4
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    9-member core team
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
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
