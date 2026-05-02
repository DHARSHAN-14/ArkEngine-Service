import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, MapPin, Hammer, TestTube, Rocket, LifeBuoy } from 'lucide-react'

const steps = [
  {
    n: '01',
    icon: Search,
    title: 'Understand',
    desc: 'We dig into your business, your users, and your goals before writing a single line of code.',
    color: '#b8651a',
  },
  {
    n: '02',
    icon: MapPin,
    title: 'Plan',
    desc: 'Architecture, scope, timeline, and tech stack — all defined clearly so there are no surprises.',
    color: '#4a8a5e',
  },
  {
    n: '03',
    icon: Hammer,
    title: 'Build',
    desc: 'Development in focused sprints. You see progress regularly — no black-box shipping.',
    color: '#5a6e8a',
  },
  {
    n: '04',
    icon: TestTube,
    title: 'Test',
    desc: 'Thorough QA across devices, edge cases, and real user flows before anything goes live.',
    color: '#7a5ea0',
  },
  {
    n: '05',
    icon: Rocket,
    title: 'Launch',
    desc: 'Smooth deployment, handoff documentation, and go-live support from our side.',
    color: '#8b7355',
  },
  {
    n: '06',
    icon: LifeBuoy,
    title: 'Support',
    desc: 'Post-launch monitoring, bug fixes, and continued development as your business grows.',
    color: '#5a8a7a',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-4"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            A clear process from
            <span className="italic" style={{ color: 'var(--accent)' }}> idea to live system.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="body-text"
          >
            No guesswork, no surprises — you know exactly where we are at every stage.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.55, ease: 'easeOut' }}
                className="card-glass p-6 group cursor-default relative overflow-hidden"
              >
                {/* Step number — background */}
                <div
                  className="absolute right-4 top-4 font-bold opacity-[0.06] select-none"
                  style={{
                    fontFamily: 'Playfair Display',
                    fontSize: 64,
                    color: step.color,
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: step.color + '18', border: `1px solid ${step.color}30` }}
                >
                  <Icon size={18} style={{ color: step.color }} />
                </div>

                {/* Number label */}
                <div
                  className="text-xs mb-2 font-medium"
                  style={{ color: step.color, fontFamily: 'DM Mono' }}
                >
                  Step {step.n}
                </div>

                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>

                {/* Connector dot */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute bottom-0 right-0 w-px"
                    style={{
                      height: 24,
                      background: `linear-gradient(to bottom, ${step.color}40, transparent)`,
                      display: 'none', // decorative only on desktop
                    }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Pipeline connector line (desktop) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1, ease: 'easeInOut' }}
          className="hidden lg:block mt-10 mx-auto"
          style={{
            height: 2,
            maxWidth: 600,
            background: 'linear-gradient(to right, var(--accent), #4a8a5e, #5a6e8a, #7a5ea0)',
            borderRadius: 2,
            transformOrigin: 'left',
            opacity: 0.4,
          }}
        />
      </div>
    </section>
  )
}
