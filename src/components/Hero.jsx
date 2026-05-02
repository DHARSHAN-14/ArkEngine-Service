import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Globe, Smartphone, Cpu, Bot, ChevronRight } from 'lucide-react'

const floatingPanels = [
  {
    id: 'ai',
    icon: Bot,
    label: 'AI Automation',
    sub: 'Intelligent workflows',
    color: '#b8651a',
    x: '-55%',
    y: '-30%',
    delay: 0,
  },
  {
    id: 'web',
    icon: Globe,
    label: 'Web Systems',
    sub: 'Fast & scalable',
    color: '#4a8a5e',
    x: '48%',
    y: '-45%',
    delay: 0.15,
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile Apps',
    sub: 'iOS & Android',
    color: '#8b7355',
    x: '-60%',
    y: '35%',
    delay: 0.3,
  },
  {
    id: 'software',
    icon: Cpu,
    label: 'Custom Software',
    sub: 'Built for your ops',
    color: '#5a6e8a',
    x: '52%',
    y: '32%',
    delay: 0.45,
  },
]

function FloatingPanel({ panel, mouseX, mouseY }) {
  const [hovered, setHovered] = useState(false)
  const Icon = panel.icon

  const panelX = useTransform(mouseX, [-300, 300], [-8, 8])
  const panelY = useTransform(mouseY, [-300, 300], [-8, 8])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: panel.delay + 1, duration: 0.6, ease: 'easeOut' }}
      style={{ x: panelX, y: panelY }}
      className="absolute"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          y: [0, -6, 0],
          scale: hovered ? 1.06 : 1,
        }}
        transition={{
          y: { duration: 3 + panel.delay, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.2 },
        }}
        className="card-glass px-4 py-3 flex items-center gap-3 cursor-default"
        style={{
          minWidth: 160,
          boxShadow: hovered ? `0 0 28px ${panel.color}25` : undefined,
          borderColor: hovered ? panel.color + '60' : undefined,
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: panel.color + '18', border: `1px solid ${panel.color}30` }}
        >
          <Icon size={15} style={{ color: panel.color }} />
        </div>
        <div>
          <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}>
            {panel.label}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono', fontSize: 10 }}>
            {panel.sub}
          </div>
        </div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
          className="ml-auto"
        >
          <ChevronRight size={12} style={{ color: panel.color }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function SystemOrb({ mouseX, mouseY }) {
  const orbX = useTransform(mouseX, [-300, 300], [-12, 12])
  const orbY = useTransform(mouseY, [-300, 300], [-12, 12])

  return (
    <motion.div
      style={{ x: orbX, y: orbY }}
      className="relative flex items-center justify-center"
    >
      {/* Outer glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Outer rotating ring */}
      <div
        className="absolute rounded-full orb-ring"
        style={{
          width: 180,
          height: 180,
          border: '1px dashed var(--border)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: 'var(--accent)' }}
        />
      </div>

      {/* Inner rotating ring */}
      <div
        className="absolute rounded-full orb-ring-reverse"
        style={{
          width: 130,
          height: 130,
          border: '1px solid var(--border)',
        }}
      >
        <div
          className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--accent-light)' }}
        />
        <div
          className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full"
          style={{ background: '#4a8a5e' }}
        />
      </div>

      {/* Core orb */}
      <div
        className="orb-core relative w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, var(--accent-light), var(--accent) 60%, #7a3a0a)',
          boxShadow: '0 0 40px var(--glow), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <span
          className="text-white font-bold text-xl"
          style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
        >
          A
        </span>
        {/* Inner highlight */}
        <div
          className="absolute top-2 left-3 w-4 h-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.25)', filter: 'blur(2px)' }}
        />
      </div>

      {/* Status dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: 'var(--accent)',
            top: '50%',
            left: '50%',
            marginLeft: -3,
            marginTop: -3,
          }}
          animate={{
            x: Math.cos((i * 2 * Math.PI) / 3) * 95,
            y: Math.sin((i * 2 * Math.PI) / 3) * 95,
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity, delay: i * 0.7 },
            scale: { duration: 2, repeat: Infinity, delay: i * 0.7 },
            x: { duration: 0 },
            y: { duration: 0 },
          }}
        />
      ))}
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, var(--glow) 0%, transparent 60%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none opacity-50"
      />

      {/* Warm light blob */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
          x: useTransform(springX, [-300, 300], [-30, 30]),
          y: useTransform(springY, [-300, 300], [-30, 30]),
          top: '10%',
          right: '-5%',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20">
        {/* Left — copy */}
        <div className="order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-8"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'var(--accent)' + '14',
                border: '1px solid var(--accent)' + '30',
                color: 'var(--accent)',
                fontFamily: 'DM Mono',
              }}
            >
              <Zap size={11} />
              AI-powered software studio for modern businesses
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="heading-xl mb-6 text-balance"
          >
            Build smarter software{' '}
            <span className="italic" style={{ color: 'var(--accent)' }}>with a team</span>
            <br />
            that thinks beyond code.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="body-text mb-10 max-w-md"
          >
            ArkEngine helps businesses turn ideas into scalable websites, apps, AI tools,
            and custom software systems — with clarity, speed, and care.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-primary flex items-center gap-2">
              Start a Project
              <ArrowRight size={15} />
            </a>
            <a href="#projects" className="btn-secondary flex items-center gap-2">
              View Our Work
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-8 mt-12 pt-8"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {[
              { n: '9', label: 'Person team' },
              { n: '40+', label: 'Projects built' },
              { n: '5', label: 'Core services' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Playfair Display', color: 'var(--accent)' }}
                >
                  {s.n}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — interactive orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className="order-1 lg:order-2 relative flex items-center justify-center"
          style={{ minHeight: 420 }}
        >
          {/* System Core */}
          <SystemOrb mouseX={springX} mouseY={springY} />

          {/* Floating panels */}
          {floatingPanels.map((panel) => (
            <div
              key={panel.id}
              className="absolute"
              style={{ left: `calc(50% + ${panel.x})`, top: `calc(50% + ${panel.y})` }}
            >
              <FloatingPanel panel={panel} mouseX={springX} mouseY={springY} />
            </div>
          ))}

          {/* System status label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span
              className="text-xs"
              style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}
            >
              ArkEngine System — Online
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
