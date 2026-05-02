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
  const inView = useInView(ref, { once: true })
  const activeService = services.find(s => s.id === active)

  return (
    <section id="services" className="section-pad">
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
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            Engineering services that
            <span className="italic" style={{ color: 'var(--accent)' }}> actually move businesses.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => setActive(s.id)}
                  className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300"
                  style={{
                    background: isActive ? s.color + '12' : 'transparent',
                    border: `1px solid ${isActive ? s.color + '50' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 0 20px ${s.color}18` : 'none',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? s.color + '25' : 'var(--border)',
                      border: `1px solid ${isActive ? s.color + '50' : 'transparent'}`,
                    }}
                  >
                    <Icon size={16} style={{ color: isActive ? s.color : 'var(--text-secondary)' }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold transition-colors duration-200"
                      style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: 'DM Sans' }}
                    >
                      {s.title}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: isActive ? s.color : 'var(--text-secondary)', fontFamily: 'DM Mono', opacity: 0.8 }}
                    >
                      {s.tag}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="service-arrow"
                      className="ml-auto"
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="card-glass p-8 h-full"
                style={{ borderColor: activeService.color + '30' }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: activeService.color + '18', border: `1px solid ${activeService.color}40` }}
                  >
                    {(() => {
                      const Icon = activeService.icon
                      return <Icon size={22} style={{ color: activeService.color }} />
                    })()}
                  </div>
                  <div>
                    <div className="section-label mb-1" style={{ color: activeService.color }}>
                      {activeService.tag}
                    </div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}>
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="body-text mb-6 text-sm leading-relaxed">
                  {activeService.desc}
                </p>

                {/* Client benefit */}
                <div
                  className="px-4 py-3 rounded-xl mb-6 text-sm font-medium italic"
                  style={{
                    background: activeService.color + '10',
                    borderLeft: `3px solid ${activeService.color}`,
                    color: 'var(--text-primary)',
                  }}
                >
                  "{activeService.benefit}"
                </div>

                {/* Points */}
                <div className="grid grid-cols-2 gap-3">
                  {activeService.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} style={{ color: activeService.color, flexShrink: 0 }} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{pt}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition-all duration-200"
                  style={{ color: activeService.color }}
                  onMouseEnter={e => { e.currentTarget.style.gap = '10px' }}
                  onMouseLeave={e => { e.currentTarget.style.gap = '8px' }}
                >
                  Start this project <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
