import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Layers, BrainCircuit, Zap, PackageCheck, HeartHandshake } from 'lucide-react'

const trustPoints = [
  {
    icon: Users,
    title: 'Direct communication',
    desc: 'Small team means no account managers or middlemen. You talk to the people actually building your product.',
    color: '#b8651a',
  },
  {
    icon: Layers,
    title: 'Built for you, not templates',
    desc: 'Every system is custom-engineered from the ground up. No drag-and-drop, no page builders, no limitations.',
    color: '#4a8a5e',
  },
  {
    icon: BrainCircuit,
    title: 'AI-first thinking',
    desc: 'We embed intelligent automation into everything we build — not as a gimmick, but as a genuine force multiplier.',
    color: '#5a6e8a',
  },
  {
    icon: Zap,
    title: 'Fast and focused execution',
    desc: 'Small team size is our advantage. Fewer decisions, fewer delays, faster delivery without compromising quality.',
    color: '#8b7355',
  },
  {
    icon: PackageCheck,
    title: 'Product-minded approach',
    desc: 'We think like product owners, not contractors. We ask why before we ask how.',
    color: '#7a6a8e',
  },
  {
    icon: HeartHandshake,
    title: 'Support after launch',
    desc: 'We stay involved after delivery. Bug fixes, improvements, and ongoing support — you\'re not left alone.',
    color: '#5a8a7a',
  },
]

function TrustCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
      className="card-glass p-6 group cursor-default"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: item.color + '18', border: `1px solid ${item.color}30` }}
      >
        <Icon size={18} style={{ color: item.color }} />
      </div>
      <h3
        className="font-semibold text-sm mb-2"
        style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}
      >
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

export default function TrustSection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="section-label mb-4"
          >
            Why ArkEngine
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="heading-lg mb-4"
          >
            A small team with
            <span className="italic" style={{ color: 'var(--accent)' }}> serious capability.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="body-text"
          >
            We've deliberately stayed small so every client gets our genuine best — not a rushed junior dev project.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPoints.map((item, i) => (
            <TrustCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
