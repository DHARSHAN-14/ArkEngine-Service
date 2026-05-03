import { useRef, useState } from 'react'
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

function StepCard({ step, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Connector line to next card (visible on larger grids) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-8 -right-3 w-6 h-px" style={{ background: `linear-gradient(90deg, ${step.color}40, transparent)` }} />
      )}

      <div
        className="card-glass p-7 cursor-default relative overflow-hidden h-full"
        style={{
          borderColor: hovered ? `${step.color}40` : undefined,
        }}
      >
        {/* Large step number — watermark */}
        <div
          className="absolute -right-1 -top-2 font-bold select-none pointer-events-none transition-opacity duration-500"
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 72,
            color: step.color,
            lineHeight: 1,
            opacity: hovered ? 0.1 : 0.04,
          }}
        >
          {step.n}
        </div>

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 relative z-10"
          style={{
            background: `${step.color}12`,
            border: `1px solid ${step.color}25`,
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            boxShadow: hovered ? `0 4px 16px ${step.color}18` : 'none',
          }}
        >
          <Icon size={18} style={{ color: step.color }} />
        </div>

        {/* Step label */}
        <div
          className="text-[11px] mb-2 font-medium relative z-10"
          style={{ color: step.color, fontFamily: 'DM Mono' }}
        >
          Step {step.n}
        </div>

        <h3
          className="font-bold text-base mb-2.5 relative z-10"
          style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display' }}
        >
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>
          {step.desc}
        </p>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(circle at 30% 80%, ${step.color}06, transparent 60%)`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="section-pad relative" style={{ background: 'var(--bg-secondary)' }}>
      {/* Top gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--section-gradient)' }}
      />
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

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
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="heading-lg mb-5"
          >
            A clear process from
            <span className="italic" style={{ color: 'var(--accent)' }}> idea to live system.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65 }}
            className="body-text"
          >
            No guesswork, no surprises — you know exactly where we are at every stage.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} inView={inView} />
          ))}
        </div>

        {/* Pipeline progress bar (desktop) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:block mt-12 mx-auto"
          style={{
            height: 2,
            maxWidth: 700,
            background: 'linear-gradient(to right, #b8651a, #4a8a5e, #5a6e8a, #7a5ea0, #8b7355, #5a8a7a)',
            borderRadius: 2,
            transformOrigin: 'left',
            opacity: 0.35,
          }}
        />

        {/* Pipeline dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="hidden lg:flex justify-between mt-3 mx-auto"
          style={{ maxWidth: 700 }}
        >
          {steps.map((step) => (
            <div
              key={step.n}
              className="w-2 h-2 rounded-full"
              style={{ background: step.color, opacity: 0.5 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
