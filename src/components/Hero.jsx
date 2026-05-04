import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Globe, Smartphone, Cpu, Bot, ChevronRight } from 'lucide-react'

/* ─── Service panel data ─── */
const floatingPanels = [
  {
    id: 'ai',
    icon: Bot,
    label: 'AI Automation',
    sub: 'Intelligent workflows',
    color: '#b8651a',
    // Position as % of the right-half container
    px: 12,
    py: 10,
    delay: 0,
  },
  {
    id: 'web',
    icon: Globe,
    label: 'Web Systems',
    sub: 'Fast & scalable',
    color: '#4a8a5e',
    px: 72,
    py: 8,
    delay: 0.15,
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile Apps',
    sub: 'iOS & Android',
    color: '#8b7355',
    px: 8,
    py: 72,
    delay: 0.3,
  },
  {
    id: 'software',
    icon: Cpu,
    label: 'Custom Software',
    sub: 'Built for your ops',
    color: '#5a6e8a',
    px: 68,
    py: 70,
    delay: 0.45,
  },
]

/* ─── Interactive Network Canvas ───
   Draws a mesh of connected nodes that responds to mouse.
   Represents the "interconnected engineering thinking" of ArkEngine.
*/
function NetworkCanvas({ mouseX, mouseY, containerRef }) {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const animRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const isDarkRef = useRef(false)

  // Generate nodes once on mount
  const initNodes = useCallback((w, h) => {
    const nodes = []
    const count = Math.min(Math.floor((w * h) / 12000), 60) // scale with canvas size, cap at 60

    // Create a central hub node
    nodes.push({
      x: w * 0.5,
      y: h * 0.5,
      baseX: w * 0.5,
      baseY: h * 0.5,
      radius: 4,
      vx: 0,
      vy: 0,
      isHub: true,
      phase: 0,
    })

    // Create service anchor nodes — at approximate panel positions
    const anchors = [
      { x: w * 0.2, y: h * 0.22 },
      { x: w * 0.8, y: h * 0.18 },
      { x: w * 0.18, y: h * 0.78 },
      { x: w * 0.78, y: h * 0.76 },
    ]
    anchors.forEach((a) => {
      nodes.push({
        x: a.x,
        y: a.y,
        baseX: a.x,
        baseY: a.y,
        radius: 3,
        vx: 0,
        vy: 0,
        isAnchor: true,
        phase: Math.random() * Math.PI * 2,
      })
    })

    // Fill remaining nodes randomly
    for (let i = nodes.length; i < count; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: 1.2 + Math.random() * 1.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodesRef.current = initNodes(w, h)
    }

    resize()
    window.addEventListener('resize', resize)

    // Track mouse position relative to canvas
    const unsub1 = mouseX.on('change', (v) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mousePos.current.x = v + rect.width / 2
      }
    })
    const unsub2 = mouseY.on('change', (v) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mousePos.current.y = v + rect.height / 2
      }
    })

    // Detect dark mode
    const checkDark = () => {
      isDarkRef.current = document.documentElement.classList.contains('dark')
    }
    checkDark()
    const darkObserver = new MutationObserver(checkDark)
    darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let time = 0
    const CONNECTION_DIST = Math.min(w * 0.22, 180) // responsive connection distance
    const MOUSE_RADIUS = 160

    const animate = () => {
      time += 0.008
      ctx.clearRect(0, 0, w, h)

      const nodes = nodesRef.current
      const dark = isDarkRef.current
      const mx = mousePos.current.x
      const my = mousePos.current.y

      // Accent color
      const accentR = dark ? 212 : 184
      const accentG = dark ? 135 : 101
      const accentB = dark ? 74 : 26

      // Update node positions — gentle floating + mouse attraction
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (n.isHub) {
          // Hub stays centered but breathes
          n.x = n.baseX + Math.sin(time * 0.5) * 3
          n.y = n.baseY + Math.cos(time * 0.4) * 3
          continue
        }
        // Gentle float
        n.x = n.baseX + Math.sin(time + n.phase) * 6 + n.vx * 30
        n.y = n.baseY + Math.cos(time * 0.8 + n.phase) * 5 + n.vy * 30

        // Mouse interaction — gentle push away from cursor
        const dx = n.x - mx
        const dy = n.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 12
          n.x += (dx / dist) * force
          n.y += (dy / dist) * force
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Use wider range for hub/anchor connections
          const maxDist = (a.isHub || a.isAnchor || b.isHub || b.isAnchor)
            ? CONNECTION_DIST * 1.6
            : CONNECTION_DIST

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (a.isHub || b.isHub ? 0.25 : 0.12)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${alpha})`
            ctx.lineWidth = (a.isHub || b.isHub) ? 1.2 : 0.6
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = n.x - mx
        const dy = n.y - my
        const mouseDist = Math.sqrt(dx * dx + dy * dy)
        const isNearMouse = mouseDist < MOUSE_RADIUS

        if (n.isHub) {
          // Central hub — branded "A" marker
          // Glow
          ctx.beginPath()
          ctx.arc(n.x, n.y, 28, 0, Math.PI * 2)
          const hubGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 28)
          hubGlow.addColorStop(0, `rgba(${accentR}, ${accentG}, ${accentB}, 0.12)`)
          hubGlow.addColorStop(1, 'transparent')
          ctx.fillStyle = hubGlow
          ctx.fill()

          // Core circle
          ctx.beginPath()
          ctx.arc(n.x, n.y, 18, 0, Math.PI * 2)
          const hubGrad = ctx.createRadialGradient(n.x - 4, n.y - 4, 0, n.x, n.y, 18)
          hubGrad.addColorStop(0, `rgba(${accentR + 30}, ${accentG + 30}, ${accentB + 30}, 0.95)`)
          hubGrad.addColorStop(1, `rgba(${accentR}, ${accentG}, ${accentB}, 0.85)`)
          ctx.fillStyle = hubGrad
          ctx.fill()

          // "A" letter
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 16px "Playfair Display", serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('A', n.x, n.y + 1)

          // Orbit ring
          ctx.beginPath()
          ctx.arc(n.x, n.y, 32 + Math.sin(time) * 2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.15)`
          ctx.lineWidth = 1
          ctx.setLineDash([4, 6])
          ctx.stroke()
          ctx.setLineDash([])
        } else if (n.isAnchor) {
          // Anchor nodes — slightly larger, subtle glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12)
          glow.addColorStop(0, `rgba(${accentR}, ${accentG}, ${accentB}, ${isNearMouse ? 0.2 : 0.08})`)
          glow.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(n.x, n.y, 12, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()

          ctx.beginPath()
          ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${isNearMouse ? 0.7 : 0.4})`
          ctx.fill()
        } else {
          // Regular nodes — small dots
          const baseAlpha = isNearMouse ? 0.5 : 0.2
          const pulseAlpha = baseAlpha + Math.sin(time * 2 + n.phase) * 0.08
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${pulseAlpha})`
          ctx.fill()
        }
      }

      // Draw data pulse along hub connections (animated particles traveling on lines)
      const hubNode = nodes[0]
      for (let i = 1; i <= 4; i++) {
        const anchor = nodes[i]
        if (!anchor) continue
        const progress = ((time * 0.4 + i * 0.25) % 1)
        const px = hubNode.x + (anchor.x - hubNode.x) * progress
        const py = hubNode.y + (anchor.y - hubNode.y) * progress

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${0.5 - Math.abs(progress - 0.5) * 0.8})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      unsub1()
      unsub2()
      darkObserver.disconnect()
    }
  }, [mouseX, mouseY, containerRef, initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}

/* ─── Floating Panel ─── */
function FloatingPanel({ panel, mouseX, mouseY }) {
  const [hovered, setHovered] = useState(false)
  const Icon = panel.icon

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
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--hero-gradient)' }}
      />

      {/* Secondary warm wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 50%, var(--glow-strong) 0%, transparent 60%)',
          opacity: 0.5,
        }}
      />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />

      {/* ★ Interactive Network Canvas — replaces the orb, covers entire hero */}
      <div className="absolute inset-0 overflow-hidden">
        <NetworkCanvas mouseX={springX} mouseY={springY} containerRef={containerRef} />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
      />

      {/* Mouse-following warm light */}
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, var(--glow-strong) 0%, var(--glow) 40%, transparent 65%)',
          x: useTransform(springX, [-400, 400], [-25, 25]),
          y: useTransform(springY, [-400, 400], [-25, 25]),
          top: '10%',
          right: '-2%',
          filter: 'blur(45px)',
          opacity: 0.6,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center py-20 relative z-10">
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

        {/* Right — floating panels positioned over the network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="order-1 lg:order-2 relative"
          style={{ minHeight: 440 }}
        >
          {/* Floating panels — positioned at network anchor points */}
          {floatingPanels.map((panel) => (
            <div
              key={panel.id}
              className="absolute hidden sm:block"
              style={{
                left: `${panel.px}%`,
                top: `${panel.py}%`,
              }}
            >
              <FloatingPanel panel={panel} mouseX={springX} mouseY={springY} />
            </div>
          ))}

          {/* Mobile: show panels as a compact grid */}
          <div className="sm:hidden grid grid-cols-2 gap-2 px-2 py-8">
            {floatingPanels.map((panel) => {
              const Icon = panel.icon
              return (
                <motion.div
                  key={panel.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: panel.delay + 1.2, duration: 0.5 }}
                  className="card-glass px-3 py-2.5 flex items-center gap-2"
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
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 hidden sm:flex"
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--forest)' }} />
            <span
              className="text-[10px] whitespace-nowrap"
              style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}
            >
              ArkEngine Network — Active
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
