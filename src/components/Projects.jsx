import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bot, LayoutDashboard, CalendarDays, ArrowUpRight, ChevronDown } from 'lucide-react'

const projects = [
  {
    id: 'ai-support',
    icon: Bot,
    type: 'AI Solution',
    name: 'AI Customer Support Assistant',
    tag: 'Healthcare SaaS',
    color: '#7a5ea0',
    problem: 'A healthcare software company was overwhelmed with repetitive support tickets — 80% were FAQ-type questions that drained the support team\'s time.',
    solution: 'We built a context-aware AI assistant trained on their product documentation and FAQ database, integrated directly into their support portal.',
    outcome: '62% reduction in support ticket volume in the first month. Support team now handles only complex, high-value customer interactions.',
    tech: ['OpenAI API', 'Node.js', 'React', 'PostgreSQL'],
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    type: 'Custom Software',
    name: 'Business Management Dashboard',
    tag: 'Logistics Company',
    color: '#4a8a5e',
    problem: 'A logistics firm was running operations across Excel sheets, WhatsApp, and three disconnected software tools — causing errors and delays.',
    solution: 'We built a unified management dashboard covering orders, fleet tracking, staff assignments, invoicing, and reporting in one system.',
    outcome: 'Operations team saved 3+ hours per day. Order accuracy improved significantly. Management had real-time visibility for the first time.',
    tech: ['React', 'Node.js', 'Prisma', 'PostgreSQL', 'WebSocket'],
  },
  {
    id: 'booking',
    icon: CalendarDays,
    type: 'Web + Mobile',
    name: 'Custom Booking Platform',
    tag: 'Service Business',
    color: '#b8651a',
    problem: 'A multi-location service company was managing bookings manually through phone calls and a basic form — causing double-bookings and missed appointments.',
    solution: 'We designed and built a full booking platform with real-time availability, automatic reminders, staff assignment, and a mobile app for field teams.',
    outcome: 'No-show rate dropped by 40%. Revenue increased due to better slot utilization. Staff loved the mobile app for managing their schedules.',
    tech: ['React Native', 'Next.js', 'Supabase', 'Twilio', 'Stripe'],
  },
]

function ProjectCard({ project, index, inView }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      className="card-glass overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: expanded ? `${project.color}40` : hovered ? `${project.color}25` : undefined,
      }}
    >
      {/* Card header */}
      <div className="p-7">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: `${project.color}14`,
                border: `1px solid ${project.color}30`,
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Icon size={18} style={{ color: project.color }} />
            </div>
            <div>
              <div
                className="text-[11px] mb-0.5 font-medium"
                style={{ color: project.color, fontFamily: 'DM Mono' }}
              >
                {project.type}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {project.tag}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mt-1"
          >
            <ChevronDown size={16} style={{ color: expanded ? project.color : 'var(--text-secondary)' }} />
          </motion.div>
        </div>

        <h3
          className="font-bold text-lg mb-3 transition-colors duration-300"
          style={{
            fontFamily: 'Playfair Display',
            color: hovered ? 'var(--accent)' : 'var(--text-primary)',
          }}
        >
          {project.name}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {project.problem.slice(0, 110)}...
        </p>
      </div>

      {/* Expanded section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-7 pb-7 pt-3"
              style={{ borderTop: `1px solid ${project.color}18` }}
            >
              <div className="space-y-5">
                <div>
                  <div className="text-[11px] font-semibold mb-2 uppercase tracking-wider" style={{ color: project.color, fontFamily: 'DM Mono' }}>
                    The Problem
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.problem}
                  </p>
                </div>
                <div>
                  <div className="text-[11px] font-semibold mb-2 uppercase tracking-wider" style={{ color: project.color, fontFamily: 'DM Mono' }}>
                    What We Built
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.solution}
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `${project.color}08`,
                    borderLeft: `3px solid ${project.color}`,
                  }}
                >
                  <div className="text-[11px] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: project.color, fontFamily: 'DM Mono' }}>
                    Outcome
                  </div>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
                    {project.outcome}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                      style={{
                        background: 'var(--glow)',
                        color: 'var(--text-secondary)',
                        fontFamily: 'DM Mono',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section-pad relative">
      {/* Subtle warm gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 20%, var(--glow) 0%, transparent 50%)' }}
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
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="heading-lg mb-5"
          >
            Problems solved,
            <span className="italic" style={{ color: 'var(--accent)' }}> systems built.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65 }}
            className="body-text"
          >
            Click any project to see the full story — problem, solution, and results.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.55 }}
          className="mt-12 text-center"
        >
          <a href="#contact" className="btn-secondary inline-flex items-center gap-2 group">
            Discuss your project
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
