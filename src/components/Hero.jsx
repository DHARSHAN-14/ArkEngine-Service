import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

/* ─── Network Canvas (Dark Mode Only) ───
   Interconnected constellation of nodes — visible only in dark mode.
   The canvas checks isDark on every frame and skips drawing in light mode.
*/
function NetworkCanvas({ mouseX, mouseY, containerRef }) {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const animRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const isDarkRef = useRef(false)

  const initNodes = useCallback((w, h) => {
    const nodes = []
    const count = Math.min(Math.floor((w * h) / 12000), 60)

    // Central hub
    nodes.push({
      x: w * 0.5, y: h * 0.5,
      baseX: w * 0.5, baseY: h * 0.5,
      radius: 4, vx: 0, vy: 0, isHub: true, phase: 0,
    })

    // Anchor nodes — 4 cardinal points
    const anchors = [
      { x: w * 0.22, y: h * 0.22 },
      { x: w * 0.78, y: h * 0.18 },
      { x: w * 0.2, y: h * 0.78 },
      { x: w * 0.8, y: h * 0.76 },
    ]
    anchors.forEach((a) => {
      nodes.push({
        x: a.x, y: a.y, baseX: a.x, baseY: a.y,
        radius: 3, vx: 0, vy: 0, isAnchor: true, phase: Math.random() * Math.PI * 2,
      })
    })

    for (let i = nodes.length; i < count; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      nodes.push({
        x, y, baseX: x, baseY: y,
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

    const checkDark = () => {
      isDarkRef.current = document.documentElement.classList.contains('dark')
    }
    checkDark()
    const darkObserver = new MutationObserver(checkDark)
    darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let time = 0
    const CONNECTION_DIST = Math.min(w * 0.22, 180)
    const MOUSE_RADIUS = 160

    const animate = () => {
      time += 0.008
      ctx.clearRect(0, 0, w, h)

      // Only draw in dark mode
      if (!isDarkRef.current) {
        animRef.current = requestAnimationFrame(animate)
        return
      }

      const nodes = nodesRef.current
      const mx = mousePos.current.x
      const my = mousePos.current.y
      const aR = 220, aG = 150, aB = 80

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (n.isHub) {
          n.x = n.baseX + Math.sin(time * 0.5) * 3
          n.y = n.baseY + Math.cos(time * 0.4) * 3
          continue
        }
        n.x = n.baseX + Math.sin(time + n.phase) * 6 + n.vx * 30
        n.y = n.baseY + Math.cos(time * 0.8 + n.phase) * 5 + n.vy * 30
        const dx = n.x - mx, dy = n.y - my
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
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = (a.isHub || a.isAnchor || b.isHub || b.isAnchor) ? CONNECTION_DIST * 1.6 : CONNECTION_DIST
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (a.isHub || b.isHub ? 0.35 : 0.18)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${aR}, ${aG}, ${aB}, ${alpha})`
            ctx.lineWidth = (a.isHub || b.isHub) ? 1.5 : 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = n.x - mx, dy = n.y - my
        const mouseDist = Math.sqrt(dx * dx + dy * dy)
        const near = mouseDist < MOUSE_RADIUS

        if (n.isHub) {
          // Glow
          ctx.beginPath()
          ctx.arc(n.x, n.y, 36, 0, Math.PI * 2)
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 36)
          g.addColorStop(0, `rgba(${aR}, ${aG}, ${aB}, 0.18)`)
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.fill()
          // Core
          ctx.beginPath()
          ctx.arc(n.x, n.y, 20, 0, Math.PI * 2)
          const cg = ctx.createRadialGradient(n.x - 4, n.y - 4, 0, n.x, n.y, 20)
          cg.addColorStop(0, 'rgba(230, 160, 90, 0.95)')
          cg.addColorStop(1, 'rgba(200, 120, 50, 0.9)')
          ctx.fillStyle = cg
          ctx.fill()
          // "A"
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 17px "Playfair Display", serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('A', n.x, n.y + 1)
          // Orbit
          ctx.beginPath()
          ctx.arc(n.x, n.y, 34 + Math.sin(time) * 2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${aR}, ${aG}, ${aB}, 0.2)`
          ctx.lineWidth = 1
          ctx.setLineDash([4, 6])
          ctx.stroke()
          ctx.setLineDash([])
          ctx.beginPath()
          ctx.arc(n.x, n.y, 50 + Math.cos(time * 0.7) * 3, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${aR}, ${aG}, ${aB}, 0.08)`
          ctx.lineWidth = 0.5
          ctx.stroke()
        } else if (n.isAnchor) {
          const gl = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16)
          gl.addColorStop(0, `rgba(${aR}, ${aG}, ${aB}, ${near ? 0.28 : 0.14})`)
          gl.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(n.x, n.y, 16, 0, Math.PI * 2)
          ctx.fillStyle = gl
          ctx.fill()
          ctx.beginPath()
          ctx.arc(n.x, n.y, 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${aR}, ${aG}, ${aB}, ${near ? 0.8 : 0.55})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(n.x, n.y, 8, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${aR}, ${aG}, ${aB}, 0.12)`
          ctx.lineWidth = 0.5
          ctx.stroke()
        } else {
          const baseA = near ? 0.55 : 0.3
          const pulseA = baseA + Math.sin(time * 2 + n.phase) * 0.1
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius * (near ? 1.3 : 1), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${aR}, ${aG}, ${aB}, ${pulseA})`
          ctx.fill()
        }
      }

      // Data pulses
      const hub = nodes[0]
      for (let i = 1; i <= 4; i++) {
        const anc = nodes[i]
        if (!anc) continue
        const prog = ((time * 0.4 + i * 0.25) % 1)
        const px = hub.x + (anc.x - hub.x) * prog
        const py = hub.y + (anc.y - hub.y) * prog
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${aR}, ${aG}, ${aB}, ${0.6 - Math.abs(prog - 0.5) * 0.9})`
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
      style={{ opacity: 1 }}
    />
  )
}

/* ─── Flowing Gradient Blobs (Light Mode Only) ───
   Elegant, slowly morphing abstract shapes — premium and non-techy.
   Uses CSS animations for silky performance.
*/
function LightModeBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 transition-opacity duration-700">
      {/* Primary blob — large warm copper */}
      <motion.div
        animate={{
          x: [0, 40, -20, 30, 0],
          y: [0, -30, 20, -10, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        style={{
          width: 500,
          height: 500,
          top: '5%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(195, 140, 50, 0.22) 0%, rgba(195, 140, 50, 0.08) 40%, transparent 65%)',
          borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary blob — soft green-gold */}
      <motion.div
        animate={{
          x: [0, -30, 20, -15, 0],
          y: [0, 25, -15, 30, 0],
          scale: [1, 0.95, 1.08, 1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute"
        style={{
          width: 420,
          height: 420,
          bottom: '10%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(90, 140, 80, 0.14) 0%, rgba(90, 140, 80, 0.05) 40%, transparent 65%)',
          borderRadius: '55% 45% 50% 50% / 45% 55% 45% 55%',
          filter: 'blur(50px)',
        }}
      />

      {/* Tertiary blob — warm amber highlight */}
      <motion.div
        animate={{
          x: [0, 20, -30, 10, 0],
          y: [0, -20, 10, -25, 0],
          scale: [1, 1.05, 0.98, 1.03, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute"
        style={{
          width: 350,
          height: 350,
          top: '30%',
          right: '25%',
          background: 'radial-gradient(circle, rgba(185, 120, 40, 0.18) 0%, rgba(185, 120, 40, 0.06) 45%, transparent 65%)',
          borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
          filter: 'blur(35px)',
        }}
      />

      {/* Small floating accent circle */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute hidden lg:block"
        style={{
          width: 12,
          height: 12,
          top: '25%',
          right: '20%',
          background: 'var(--accent)',
          borderRadius: '50%',
          opacity: 0.3,
        }}
      />

      {/* Thin decorative ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute hidden lg:block"
        style={{
          width: 280,
          height: 280,
          top: '20%',
          right: '18%',
          border: '1px solid rgba(185, 120, 40, 0.1)',
          borderRadius: '50%',
        }}
      />

      {/* Second decorative ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute hidden lg:block"
        style={{
          width: 180,
          height: 180,
          top: '32%',
          right: '25%',
          border: '1px dashed rgba(185, 120, 40, 0.08)',
          borderRadius: '50%',
        }}
      />
    </div>
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
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--hero-gradient)' }}
      />

      {/* Secondary wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 50%, var(--glow-strong) 0%, transparent 60%)',
          opacity: 0.5,
        }}
      />

      {/* Dot grid — very subtle */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-15" />

      {/* ★ Light Mode: Flowing gradient blobs */}
      <LightModeBlobs />

      {/* ★ Dark Mode: Network constellation canvas */}
      <div className="absolute inset-0 overflow-hidden">
        <NetworkCanvas mouseX={springX} mouseY={springY} containerRef={containerRef} />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
      />

      {/* Mouse-following warm light (dark mode emphasis) */}
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
          opacity: 0.4,
        }}
      />

      {/* Content — single column, centered */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-20 relative z-10">
        <div className="max-w-2xl">
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
