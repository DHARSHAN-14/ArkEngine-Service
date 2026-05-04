import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

/* ─── Subtle Ambient Glow (Light Mode) ───
   Ultra-subtle, slow-moving golden gradient orbs.
   Premium = restraint. Barely visible but adds warmth and life.
   CSS-only — no canvas needed.
*/
function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 transition-opacity duration-1000">
      {/* Primary warm orb — right side */}
      <motion.div
        animate={{
          x: [0, 30, -15, 20, 0],
          y: [0, -20, 15, -10, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        style={{
          width: 600,
          height: 600,
          top: '5%',
          right: '0%',
          background: 'radial-gradient(circle, rgba(195, 145, 55, 0.15) 0%, rgba(195, 145, 55, 0.04) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary orb — center-left, cooler gold */}
      <motion.div
        animate={{
          x: [0, -20, 12, -8, 0],
          y: [0, 15, -10, 18, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute"
        style={{
          width: 500,
          height: 500,
          bottom: '5%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(180, 130, 45, 0.1) 0%, rgba(180, 130, 45, 0.03) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
        }}
      />

      {/* Tertiary accent — small, warm highlight */}
      <motion.div
        animate={{
          x: [0, 15, -10, 5, 0],
          y: [0, -12, 8, -15, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        className="absolute"
        style={{
          width: 350,
          height: 350,
          top: '35%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(200, 155, 60, 0.12) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
        }}
      />
    </div>
  )
}

/* ─── Network Canvas (Dark Mode) ─── */
function DarkCanvas({ mouseX, mouseY, containerRef }) {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const animRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })

  const initNodes = useCallback((w, h) => {
    const nodes = []
    const count = Math.min(Math.floor((w * h) / 12000), 60)
    nodes.push({ x: w * 0.5, y: h * 0.5, baseX: w * 0.5, baseY: h * 0.5, radius: 4, vx: 0, vy: 0, isHub: true, phase: 0 })
    ;[{ x: w * 0.22, y: h * 0.22 }, { x: w * 0.78, y: h * 0.18 }, { x: w * 0.2, y: h * 0.78 }, { x: w * 0.8, y: h * 0.76 }]
      .forEach(a => nodes.push({ x: a.x, y: a.y, baseX: a.x, baseY: a.y, radius: 3, vx: 0, vy: 0, isAnchor: true, phase: Math.random() * Math.PI * 2 }))
    for (let i = nodes.length; i < count; i++) {
      const x = Math.random() * w, y = Math.random() * h
      nodes.push({ x, y, baseX: x, baseY: y, radius: 1.2 + Math.random() * 1.3, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, phase: Math.random() * Math.PI * 2 })
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
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodesRef.current = initNodes(w, h)
    }
    resize()
    window.addEventListener('resize', resize)
    const unsub1 = mouseX.on('change', v => { if (containerRef.current) { const r = containerRef.current.getBoundingClientRect(); mousePos.current.x = v + r.width / 2 } })
    const unsub2 = mouseY.on('change', v => { if (containerRef.current) { const r = containerRef.current.getBoundingClientRect(); mousePos.current.y = v + r.height / 2 } })
    let isDark = document.documentElement.classList.contains('dark')
    const obs = new MutationObserver(() => { isDark = document.documentElement.classList.contains('dark') })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let time = 0
    const CONN = Math.min(w * 0.22, 180), MR = 160
    const animate = () => {
      time += 0.008; ctx.clearRect(0, 0, w, h)
      if (!isDark) { animRef.current = requestAnimationFrame(animate); return }
      const nodes = nodesRef.current, mx = mousePos.current.x, my = mousePos.current.y
      const R = 220, G = 150, B = 80
      for (const n of nodes) {
        if (n.isHub) { n.x = n.baseX + Math.sin(time * 0.5) * 3; n.y = n.baseY + Math.cos(time * 0.4) * 3; continue }
        n.x = n.baseX + Math.sin(time + n.phase) * 6 + n.vx * 30; n.y = n.baseY + Math.cos(time * 0.8 + n.phase) * 5 + n.vy * 30
        const dx = n.x - mx, dy = n.y - my, d = Math.sqrt(dx * dx + dy * dy)
        if (d < MR && d > 0) { const f = (1 - d / MR) * 12; n.x += (dx / d) * f; n.y += (dy / d) * f }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy)
        const max = (a.isHub || a.isAnchor || b.isHub || b.isAnchor) ? CONN * 1.6 : CONN
        if (d < max) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(${R},${G},${B},${(1 - d / max) * (a.isHub || b.isHub ? 0.35 : 0.18)})`; ctx.lineWidth = (a.isHub || b.isHub) ? 1.5 : 0.8; ctx.stroke() }
      }
      for (const n of nodes) {
        const dx = n.x - mx, dy = n.y - my, md = Math.sqrt(dx * dx + dy * dy), near = md < MR
        if (n.isHub) {
          ctx.beginPath(); ctx.arc(n.x, n.y, 36, 0, Math.PI * 2); const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 36); g.addColorStop(0, `rgba(${R},${G},${B},0.18)`); g.addColorStop(1, 'transparent'); ctx.fillStyle = g; ctx.fill()
          ctx.beginPath(); ctx.arc(n.x, n.y, 20, 0, Math.PI * 2); const cg = ctx.createRadialGradient(n.x - 4, n.y - 4, 0, n.x, n.y, 20); cg.addColorStop(0, 'rgba(230,160,90,0.95)'); cg.addColorStop(1, 'rgba(200,120,50,0.9)'); ctx.fillStyle = cg; ctx.fill()
          ctx.fillStyle = '#fff'; ctx.font = 'bold 17px "Playfair Display",serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('A', n.x, n.y + 1)
          ctx.beginPath(); ctx.arc(n.x, n.y, 34 + Math.sin(time) * 2, 0, Math.PI * 2); ctx.strokeStyle = `rgba(${R},${G},${B},0.2)`; ctx.lineWidth = 1; ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([])
          ctx.beginPath(); ctx.arc(n.x, n.y, 50 + Math.cos(time * 0.7) * 3, 0, Math.PI * 2); ctx.strokeStyle = `rgba(${R},${G},${B},0.08)`; ctx.lineWidth = 0.5; ctx.stroke()
        } else if (n.isAnchor) {
          const gl = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16); gl.addColorStop(0, `rgba(${R},${G},${B},${near ? 0.28 : 0.14})`); gl.addColorStop(1, 'transparent'); ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2); ctx.fillStyle = gl; ctx.fill()
          ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2); ctx.fillStyle = `rgba(${R},${G},${B},${near ? 0.8 : 0.55})`; ctx.fill()
        } else {
          ctx.beginPath(); ctx.arc(n.x, n.y, n.radius * (near ? 1.3 : 1), 0, Math.PI * 2); ctx.fillStyle = `rgba(${R},${G},${B},${(near ? 0.55 : 0.3) + Math.sin(time * 2 + n.phase) * 0.1})`; ctx.fill()
        }
      }
      const hub = nodes[0]
      for (let i = 1; i <= 4; i++) { const a = nodes[i]; if (!a) continue; const p = ((time * 0.4 + i * 0.25) % 1); ctx.beginPath(); ctx.arc(hub.x + (a.x - hub.x) * p, hub.y + (a.y - hub.y) * p, 2.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(${R},${G},${B},${0.6 - Math.abs(p - 0.5) * 0.9})`; ctx.fill() }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); unsub1(); unsub2(); obs.disconnect() }
  }, [mouseX, mouseY, containerRef, initNodes])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

/* ─── Hero Section ─── */
export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25, mass: 1 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25, mass: 1 })

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

  const tv = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.14, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } }),
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: 68 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--hero-gradient)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 50%, var(--glow-strong) 0%, transparent 60%)', opacity: 0.5 }} />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-15" />

      {/* Light: Subtle ambient glow | Dark: Network constellation */}
      <AmbientGlow />
      <div className="absolute inset-0 overflow-hidden">
        <DarkCanvas mouseX={springX} mouseY={springY} containerRef={containerRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }} />

      <motion.div className="absolute pointer-events-none hidden lg:block" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, var(--glow-strong) 0%, var(--glow) 40%, transparent 65%)',
        x: useTransform(springX, [-400, 400], [-25, 25]), y: useTransform(springY, [-400, 400], [-25, 25]),
        top: '10%', right: '-2%', filter: 'blur(45px)', opacity: 0.4,
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-20 relative z-10">
        <div className="max-w-2xl">
          <motion.div custom={0} variants={tv} initial="hidden" animate="visible" className="inline-flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ background: 'var(--glow)', border: '1px solid var(--border-strong)', color: 'var(--accent)', fontFamily: 'DM Mono' }}>
              <Zap size={11} />
              AI-powered software studio for modern businesses
            </div>
          </motion.div>

          <motion.h1 custom={1} variants={tv} initial="hidden" animate="visible" className="heading-xl mb-6 text-balance">
            Build smarter software{' '}
            <span className="italic" style={{ color: 'var(--accent)' }}>with a team</span>
            <br className="hidden sm:block" />
            {' '}that thinks beyond code.
          </motion.h1>

          <motion.p custom={2} variants={tv} initial="hidden" animate="visible" className="body-text mb-10 max-w-lg">
            ArkEngine helps businesses turn ideas into scalable websites, apps, AI tools,
            and custom software systems — with clarity, speed, and care.
          </motion.p>

          <motion.div custom={3} variants={tv} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary flex items-center gap-2 group">
              Start a Project <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#projects" className="btn-secondary flex items-center gap-2">View Our Work</a>
          </motion.div>

          <motion.div custom={4} variants={tv} initial="hidden" animate="visible" className="flex gap-10 mt-14 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
            {[{ n: '9', label: 'Person team' }, { n: '40+', label: 'Projects built' }, { n: '5', label: 'Core services' }].map((s) => (
              <div key={s.label} className="group cursor-default">
                <div className="text-2xl font-bold transition-colors duration-300 group-hover:text-[var(--accent-warm)]" style={{ fontFamily: 'Playfair Display', color: 'var(--accent)' }}>{s.n}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>
    </section>
  )
}
