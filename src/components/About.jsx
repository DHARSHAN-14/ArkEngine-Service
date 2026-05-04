import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Code2, Users, Star, MapPin, Sparkles } from 'lucide-react'

const values = [
  { icon: Heart, label: 'Outcome-focused', desc: 'We care about your success, not just the deliverable.', color: '#b8651a' },
  { icon: Code2, label: 'Clean engineering', desc: 'Code that\'s documented, tested, and built to last.', color: '#4a8a5e' },
  { icon: Users, label: 'Direct communication', desc: 'Simple, honest, and transparent — always.', color: '#5a6e8a' },
  { icon: Star, label: 'High standards', desc: 'We hold ourselves to excellence on every project.', color: '#8b7355' },
]

const team = [
  { initial: 'A', name: 'Arun', role: 'Lead Engineer', color: '#b8651a' },
  { initial: 'R', name: 'Ravi', role: 'Full-Stack Dev', color: '#4a8a5e' },
  { initial: 'K', name: 'Karthik', role: 'AI/ML Engineer', color: '#5a6e8a' },
  { initial: 'E', name: 'Elango', role: 'Backend Dev', color: '#7a5ea0' },
  { initial: 'N', name: 'Nithya', role: 'UI/UX Designer', color: '#8b7355' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  })

  return (
    <section id="about" className="section-pad relative" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--section-gradient)' }} />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header — centered */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.p {...fadeUp(0)} className="section-label mb-4">About ArkEngine</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="heading-lg mb-5">
            5 people.
            <span className="italic" style={{ color: 'var(--accent)' }}> Serious work.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="body-text max-w-2xl mx-auto">
            A deliberately small AI engineering studio — because a focused team of experienced engineers
            produces better work than a large agency with layers of management.
          </motion.p>
        </div>

        {/* Team members — horizontal scroll on mobile, centered row on desktop */}
        <motion.div {...fadeUp(0.2)} className="mb-14 sm:mb-20">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 sm:pb-0 snap-x snap-mandatory sm:snap-none sm:justify-center scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.6 }}
                className="flex flex-col items-center gap-3 snap-center min-w-[100px] sm:min-w-0 group cursor-default"
              >
                {/* Avatar with ring */}
                <div className="relative">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)`,
                      boxShadow: `0 4px 15px ${member.color}30`,
                    }}
                  >
                    {member.initial}
                  </div>
                  {/* Decorative ring on hover */}
                  <div
                    className="absolute inset-0 rounded-full border-2 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-[1.15]"
                    style={{ borderColor: `${member.color}40` }}
                  />
                  {/* Online dot */}
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2"
                    style={{
                      background: '#4ade80',
                      borderColor: 'var(--bg-secondary)',
                    }}
                  />
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{member.name}</div>
                  <div className="text-[10px] sm:text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>{member.role}</div>
                </div>
              </motion.div>
            ))}

          </div>

          {/* Location badge */}
          <motion.div {...fadeUp(0.4)} className="flex justify-center mt-6 sm:mt-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{
                background: 'var(--glow)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontFamily: 'DM Mono',
              }}
            >
              <MapPin size={12} style={{ color: 'var(--accent)' }} />
              Based in India · Serving globally
            </div>
          </motion.div>
        </motion.div>

        {/* Values — 2x2 grid with creative cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div
                  className="relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 cursor-default group-hover:-translate-y-1"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {/* Accent line at top */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px transition-all duration-500 group-hover:left-0 group-hover:right-0"
                    style={{ background: `linear-gradient(90deg, transparent, ${v.color}60, transparent)` }}
                  />

                  {/* Glow on hover */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${v.color}12, transparent 70%)`,
                      transform: 'translate(30%, -30%)',
                    }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `${v.color}14`,
                        border: `1px solid ${v.color}25`,
                      }}
                    >
                      <Icon size={18} style={{ color: v.color }} />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold mb-1.5 transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                        {v.label}
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          {...fadeUp(0.7)}
          className="mt-12 sm:mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 cursor-default"
            style={{
              background: 'var(--glow)',
              border: '1px solid var(--border)',
            }}
          >
            <Sparkles size={16} style={{ color: 'var(--accent)' }} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Think first. Build right. <span className="font-semibold" style={{ color: 'var(--accent)' }}>Ship confidently.</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
