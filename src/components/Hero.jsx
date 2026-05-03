import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Globe, Smartphone, Cpu, Bot, ChevronRight } from 'lucide-react'

const floatingPanels = [
  {
    id: 'ai',
    icon: Bot,
    label: 'AI Automation',
    sub: 'Intelligent workflows',
    color: '#b8651a',
    // Positioned relative to the orb center — optimized for various screen sizes
    angle: 225, // degrees from center
    distance: 52, // % from center
    delay: 0,
  },
  {
    id: 'web',
    icon: Globe,
    label: 'Web Systems',
    sub: 'Fast & scalable',
    color: '#4a8a5e',
    angle: 315,
    distance: 55,
    delay: 0.15,
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile Apps',
    sub: 'iOS & Android',
    color: '#8b7355',
    angle: 150,
    distance: 54,
    delay: 0.3,
  },
  {
    id: 'software',
    icon: Cpu,
    label: 'Custom Software',
    sub: 'Built for your ops',
    color: '#5a6e8a',
    angle: 30,
    distance: 56,
    delay: 0.45,
  },
]

/* ─── Floating Panel ─── */
function FloatingPanel({ panel, mouseX, mouseY }) {
  const [hovered, setHovered] = useState(false)
  const Icon = panel.icon

  // Parallax effect — panels follow mouse gently
  const panelX = useTransform(mouseX, [-400, 400], [-6, 6])
  const panelY = useTransform(mouseY, [-400, 400], [-6, 6])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: panel.delay + 1.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ x: panelX, y: panelY }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
          scale: hovered ? 1.05 : 1,
        }}
        transition={{
          y: { duration: 3.5 + panel.delay * 2, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.25, ease: 'easeOut' },
        }}
        className="card-glass px-4 py-3 flex items-center gap-3 cursor-default select-none"
        style={{
          minWidth: 168,
          boxShadow: hovered
            ? `0 8px 32px ${panel.color}20, 0 0 20px ${panel.color}15`
            : 'var(--shadow-sm)',
          borderColor: hovered ? `${panel.color}50` : undefined,
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{
            background: `${panel.color}14`,
            border: `1px solid ${panel.color}28`,
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <Icon size={14} style={{ color: panel.color }} />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}>
            {panel.label}
          </div>
          <div className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
            {panel.sub}
          </div>
        </div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
          transition={{ duration: 0.2 }}
          className="ml-auto flex-shrink-0"
        >
          <ChevronRight size={12} style={{ color: panel.color }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── System Core Orb ─── */
function SystemOrb({ mouseX, mouseY }) {
  const orbX = useTransform(mouseX, [-400, 400], [-10, 10])
  const orbY = useTransform(mouseY, [-400, 400], [-10, 10])

  return (
    <motion.div
      style={{ x: orbX, y: orbY }}
      className="relative flex items-center justify-center"
    >
      {/* Ambient glow — large and soft */}
      <div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, var(--glow-strong) 0%, var(--glow) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Outer dashed ring */}
      <div
        className="absolute rounded-full orb-ring"
        style={{
          width: 200,
          height: 200,
          border: '1px dashed var(--border)',
        }}
      >
        {/* Orbiting dot */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--glow-strong)' }}
        />
      </div>

      {/* Inner solid ring */}
      <div
        className="absolute rounded-full orb-ring-reverse"
        style={{
          width: 140,
          height: 140,
          border: '1px solid var(--border)',
        }}
      >
        <div
          className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--accent-light)' }}
        />
        <div
          className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--forest)' }}
        />
      </div>

      {/* Core orb — with refined gradient */}
      <div
        className="orb-core relative w-[88px] h-[88px] rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 30%, var(--accent-light) 0%, var(--accent) 50%, #6a3510 100%)',
          boxShadow: '0 0 48px var(--glow-strong), 0 0 80px var(--glow), inset 0 2px 4px rgba(255,255,255,0.2)',
        }}
      >
        <span
          className="text-white font-bold text-2xl relative z-10"
          style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
        >
          A
        </span>
        {/* Specular highlight */}
        <div
          className="absolute top-2.5 left-4 w-5 h-2.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.22)', filter: 'blur(2px)' }}
        />
      </div>

      {/* Orbiting status dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: i === 1 ? 'var(--forest)' : 'var(--accent)',
            top: '50%',
            left: '50%',
            marginLeft: -3,
            marginTop: -3,
            boxShadow: `0 0 6px ${i === 1 ? 'var(--forest)' : 'var(--accent)'}40`,
          }}
          animate={{
            x: Math.cos((i * 2 * Math.PI) / 3) * 105,
            y: Math.sin((i * 2 * Math.PI) / 3) * 105,
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            opacity: { duration: 2.5, repeat: Infinity, delay: i * 0.8 },
            scale: { duration: 2.5, repeat: Infinity, delay: i * 0.8 },
            x: { duration: 0 },
            y: { duration: 0 },
          }}
        />
      ))}
    </motion.div>
  )
}

/* ─── Hero Section ─── */
export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 50, damping: 25, mass: 1 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  // Compute panel positions using angle + distance
  const panelPositions = useMemo(() =>
    floatingPanels.map(p => {
      const rad = (p.angle * Math.PI) / 180
      return {
        ...p,
        posX: `calc(50% + ${Math.cos(rad) * p.distance}% - 84px)`,
        posY: `calc(50% + ${Math.sin(rad) * p.distance}% - 24px)`,
      }
    }), [])

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.14, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 68 }}
    >
      {/* Background radial gradient — uses theme-aware gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--hero-gradient)' }}
      />

      {/* Secondary warm wash — adds depth in light mode */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 50%, var(--glow-strong) 0%, transparent 60%)',
          opacity: 0.5,
        }}
      />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-50" />

      {/* Bottom fade — smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
      />

      {/* Mouse-following warm light — more visible */}
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: 550,
          height: 550,
          background: 'radial-gradient(circle, var(--glow-strong) 0%, var(--glow) 40%, transparent 65%)',
          x: useTransform(springX, [-400, 400], [-25, 25]),
          y: useTransform(springY, [-400, 400], [-25, 25]),
          top: '10%',
          right: '-2%',
          filter: 'blur(45px)',
          opacity: 0.75,
        }}
      />

      {/* Secondary ambient blob — left side */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, rgba(74, 138, 94, 0.06) 0%, transparent 70%)`,
          bottom: '20%',
          left: '5%',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center py-20">
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
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: 'var(--glow)',
                border: '1px solid var(--border-strong)',
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
            <br className="hidden sm:block" />
            {' '}that thinks beyond code.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="body-text mb-10 max-w-lg"
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
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="btn-primary flex items-center gap-2 group">
              Start a Project
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#projects" className="btn-secondary flex items-center gap-2">
              View Our Work
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-10 mt-14 pt-8"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {[
              { n: '9', label: 'Person team' },
              { n: '40+', label: 'Projects built' },
              { n: '5', label: 'Core services' },
            ].map((s) => (
              <div key={s.label} className="group cursor-default">
                <div
                  className="text-2xl font-bold transition-colors duration-300 group-hover:text-[var(--accent-warm)]"
                  style={{ fontFamily: 'Playfair Display', color: 'var(--accent)' }}
                >
                  {s.n}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — interactive orb + floating panels */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="order-1 lg:order-2 relative flex items-center justify-center"
          style={{ minHeight: 440 }}
        >
          {/* System Core */}
          <SystemOrb mouseX={springX} mouseY={springY} />

          {/* Floating panels — positioned by angle + distance */}
          {panelPositions.map((panel) => (
            <div
              key={panel.id}
              className="absolute hidden sm:block"
              style={{ left: panel.posX, top: panel.posY }}
            >
              <FloatingPanel panel={panel} mouseX={springX} mouseY={springY} />
            </div>
          ))}

          {/* Mobile: show panels as a row below the orb */}
          <div className="absolute bottom-0 left-0 right-0 sm:hidden flex flex-wrap justify-center gap-2 px-2">
            {floatingPanels.map((panel) => {
              const Icon = panel.icon
              return (
                <motion.div
                  key={panel.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: panel.delay + 1.2, duration: 0.5 }}
                  className="card-glass px-3 py-2 flex items-center gap-2"
                >
                  <Icon size={12} style={{ color: panel.color }} />
                  <span className="text-[10px] font-medium" style={{ color: 'var(--text-primary)' }}>{panel.label}</span>
                </motion.div>
              )
            })}
          </div>

          {/* System status label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute -bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:mb-0 mb-[-40px]"
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--forest)' }} />
            <span
              className="text-[10px] whitespace-nowrap"
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
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
