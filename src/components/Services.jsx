import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Globe, Smartphone, Cpu, Bot, ArrowUpRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web Development',
    short: 'Websites that convert.',
    desc: 'We build fast, modern websites that represent your business clearly and convert visitors into customers.',
    benefit: 'Your business online, looking its best.',
    points: ['Custom design, no templates', 'Fast loading & SEO ready', 'Mobile-first, fully responsive', 'CMS integration available'],
    color: '#4a8a5e',
    tag: 'Websites & Web Apps',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    short: 'Apps your users love.',
    desc: 'We design and build mobile apps that are smooth, reliable, and easy for your users to love.',
    benefit: 'Reach your users wherever they are.',
    points: ['iOS & Android coverage', 'Native-feel performance', 'Offline capability', 'Seamless backend integration'],
    color: '#b8651a',
    tag: 'iOS & Android',
  },
  {
    id: 'custom',
    icon: Cpu,
    title: 'Custom Software Systems',
    short: 'Software built for how you work.',
    desc: 'We create internal tools, dashboards, portals, and systems that match exactly how your business works.',
    benefit: 'Stop workarounding off-the-shelf software.',
    points: ['Internal tools & dashboards', 'ERP / CRM systems', 'Custom portals', 'API integrations'],
    color: '#5a6e8a',
    tag: 'Business Systems',
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Solutions & Automation',
    short: 'Work smarter, not harder.',
    desc: 'We use AI to reduce repetitive work, improve decisions, and create smarter digital workflows.',
    benefit: 'Let your team focus on what matters.',
    points: ['AI chatbots & assistants', 'Document processing', 'Business process automation', 'Data insights & analytics'],
    color: '#7a5ea0',
    tag: 'AI & Automation',
  },
]

export default function Services() {
  const [active, setActive] = useState('web')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const activeService = services.find(s => s.id === active)

  return (
    <section id="services" className="section-pad relative">
      {/* Subtle warm gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 20% 0%, var(--glow) 0%, transparent 50%)' }}
      />
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="max-w-2xl mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-4"
          >
            What We Build
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="heading-lg mb-5"
          >
            Engineering services that
            <span className="italic" style={{ color: 'var(--accent)' }}> actually move businesses.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65 }}
            className="body-text"
          >
            From idea to deployed product — we cover the full stack.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Tab list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {services.map((s, i) => {
              const Icon = s.icon
              const isActive = active === s.id
              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => setActive(s.id)}
                  className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden"
                  style={{
                    background: isActive ? `${s.color}0e` : 'transparent',
                    border: `1px solid ${isActive ? s.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${s.color}12` : 'none',
                  }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="service-indicator"
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                      style={{ background: s.color }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? `${s.color}20` : 'var(--glow)',
                      border: `1px solid ${isActive ? s.color + '40' : 'var(--border)'}`,
                    }}
                  >
                    <Icon size={17} style={{ color: isActive ? s.color : 'var(--text-secondary)' }} />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-sm font-semibold transition-colors duration-200"
                      style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: 'DM Sans' }}
                    >
                      {s.title}
                    </div>
                    <div
                      className="text-[11px] mt-0.5 truncate"
                      style={{ color: isActive ? s.color : 'var(--text-secondary)', fontFamily: 'DM Mono', opacity: 0.8 }}
                    >
                      {s.tag}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-auto flex-shrink-0"
                    >
                      <ArrowUpRight size={14} style={{ color: s.color }} />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="card-glass p-8 lg:p-10 h-full"
                style={{ borderColor: `${activeService.color}25` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-7">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${activeService.color}14`, border: `1px solid ${activeService.color}30` }}
                  >
                    {(() => {
                      const Icon = activeService.icon
                      return <Icon size={22} style={{ color: activeService.color }} />
                    })()}
                  </div>
                  <div>
                    <div className="section-label mb-1.5" style={{ color: activeService.color }}>
                      {activeService.tag}
                    </div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}>
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="body-text text-sm leading-relaxed mb-7">
                  {activeService.desc}
                </p>

                {/* Client benefit — accent callout */}
                <div
                  className="px-5 py-4 rounded-xl mb-7 text-sm font-medium italic"
                  style={{
                    background: `${activeService.color}08`,
                    borderLeft: `3px solid ${activeService.color}`,
                    color: 'var(--text-primary)',
                  }}
                >
                  "{activeService.benefit}"
                </div>

                {/* Feature points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeService.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-3">
                      <CheckCircle2 size={15} style={{ color: activeService.color, flexShrink: 0 }} />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{pt}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-9 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group"
                  style={{ color: activeService.color }}
                >
                  Start this project
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
