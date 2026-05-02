import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bot, LayoutDashboard, CalendarDays, ArrowUpRight, X } from 'lucide-react'

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
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      className="card-glass overflow-hidden group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      style={{ borderColor: expanded ? project.color + '50' : undefined }}
    >
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: project.color + '18', border: `1px solid ${project.color}40` }}
            >
              <Icon size={18} style={{ color: project.color }} />
            </div>
            <div>
              <div
                className="text-xs mb-0.5"
                style={{ color: project.color, fontFamily: 'DM Mono' }}
              >
                {project.type}
              </div>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.tag}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUpRight size={16} style={{ color: 'var(--text-secondary)' }} />
          </motion.div>
        </div>

        <h3
          className="font-bold text-lg mb-3 group-hover:text-[var(--accent)] transition-colors duration-200"
          style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}
        >
          {project.name}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {project.problem.slice(0, 100)}...
        </p>
      </div>

      {/* Expanded section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-6 pb-6 pt-2 border-t"
              style={{ borderColor: project.color + '25' }}
            >
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold mb-1.5" style={{ color: project.color, fontFamily: 'DM Mono' }}>
                    THE PROBLEM
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.problem}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1.5" style={{ color: project.color, fontFamily: 'DM Mono' }}>
                    WHAT WE BUILT
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.solution}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{ background: project.color + '10', borderLeft: `3px solid ${project.color}` }}
                >
                  <div className="text-xs font-semibold mb-1" style={{ color: project.color, fontFamily: 'DM Mono' }}>
                    OUTCOME
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {project.outcome}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: 'var(--border)',
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
    <section id="projects" className="section-pad">
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
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            Problems solved,
            <span className="italic" style={{ color: 'var(--accent)' }}> systems built.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
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
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a href="#contact" className="btn-secondary inline-flex items-center gap-2">
            Discuss your project <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
