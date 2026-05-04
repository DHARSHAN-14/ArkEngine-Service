import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

/* ─── Animated Workspace Illustration (Light Mode) ───
   Professional geometric SVG with continuous motion.
   Abstract tech workspace — no stick figures, purely geometric.
   Hidden in dark mode.
*/
function EngineerIllustration() {
  const c = 'var(--accent)'
  const cl = 'var(--accent-light)'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full flex items-center justify-center dark:opacity-0 transition-opacity duration-700"
    >
      <svg viewBox="0 0 420 400" fill="none" className="w-full max-w-md" style={{ overflow: 'visible' }}>

        {/* Subtle grid lines behind everything */}
        {[130, 160, 190, 220].map((y) => (
          <line key={`h${y}`} x1="80" y1={y} x2="310" y2={y} stroke={c} strokeWidth="0.3" opacity="0.06" strokeDasharray="2 6" />
        ))}
        {[120, 160, 200, 240, 280].map((x) => (
          <line key={`v${x}`} x1={x} y1="90" x2={x} y2="250" stroke={c} strokeWidth="0.3" opacity="0.06" strokeDasharray="2 6" />
        ))}

        {/* ── Monitor ── */}
        <rect x="95" y="100" width="200" height="140" rx="10" stroke={c} strokeWidth="1.5" opacity="0.7" />
        <rect x="95" y="100" width="200" height="14" rx="10" stroke={c} strokeWidth="1" opacity="0.3" />
        {/* Screen dots */}
        <circle cx="110" cy="107" r="2" fill={c} opacity="0.3" />
        <circle cx="118" cy="107" r="2" fill={c} opacity="0.3" />
        <circle cx="126" cy="107" r="2" fill={c} opacity="0.3" />
        {/* Stand */}
        <line x1="195" y1="240" x2="195" y2="265" stroke={c} strokeWidth="1.5" opacity="0.5" />
        <line x1="160" y1="265" x2="230" y2="265" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* ── Code lines on screen (animated pulse) ── */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={`code-${i}`}
            x={115 + (i % 2) * 12}
            y={125 + i * 16}
            width={60 + ((i * 37) % 50)}
            height={4}
            rx={2}
            fill={c}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}

        {/* ── Code brackets < > (animated) ── */}
        <motion.g
          animate={{ x: [0, 3, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M230 140 L220 155 L230 170" stroke={cl} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <path d="M260 140 L270 155 L260 170" stroke={cl} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <line x1="240" y1="170" x2="250" y2="140" stroke={cl} strokeWidth="1" opacity="0.35" />
        </motion.g>

        {/* ── Floating hexagon — top right (slow rotate) ── */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '340px 70px' }}
        >
          <polygon points="340,48 358,59 358,81 340,92 322,81 322,59" stroke={c} strokeWidth="1" fill="none" opacity="0.3" />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '340px 70px' }}
        >
          <polygon points="340,56 351,62 351,78 340,84 329,78 329,62" stroke={c} strokeWidth="0.8" fill="none" opacity="0.2" />
        </motion.g>

        {/* ── Floating hexagon — left side ── */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 180px' }}
        >
          <polygon points="50,162 64,171 64,189 50,198 36,189 36,171" stroke={c} strokeWidth="1" fill="none" opacity="0.25" />
        </motion.g>

        {/* ── Orbiting dot around monitor ── */}
        <motion.circle
          r="3" fill={c} opacity="0.4"
          animate={{ cx: [95, 295, 295, 95, 95], cy: [170, 170, 240, 240, 170] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Floating circles — decorative ── */}
        <motion.circle cx="360" cy="180" r="5" stroke={c} strokeWidth="1" fill="none"
          animate={{ y: [0, -8, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="370" cy="220" r="3" stroke={c} strokeWidth="0.8" fill="none"
          animate={{ y: [0, -6, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* ── Connection lines (dashed, pulsing) ── */}
        <motion.line x1="295" y1="140" x2="322" y2="80" stroke={c} strokeWidth="0.6" strokeDasharray="4 4"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.line x1="95" y1="190" x2="64" y2="180" stroke={c} strokeWidth="0.6" strokeDasharray="4 4"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* ── Floating terminal window — bottom-right ── */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <rect x="310" y="250" width="80" height="55" rx="6" stroke={c} strokeWidth="1" opacity="0.25" />
          <line x1="310" y1="262" x2="390" y2="262" stroke={c} strokeWidth="0.5" opacity="0.15" />
          <motion.rect x="318" y="270" width="35" height="3" rx="1.5" fill={c}
            animate={{ width: [35, 50, 35], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <rect x="318" y="280" width="45" height="3" rx="1.5" fill={c} opacity="0.08" />
          <rect x="318" y="290" width="30" height="3" rx="1.5" fill={c} opacity="0.08" />
        </motion.g>

        {/* ── Floating card — top-left ── */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="30" y="60" width="70" height="50" rx="6" stroke={c} strokeWidth="1" opacity="0.2" />
          <rect x="38" y="72" width="30" height="3" rx="1.5" fill={c} opacity="0.12" />
          <rect x="38" y="80" width="50" height="3" rx="1.5" fill={c} opacity="0.08" />
          <rect x="38" y="88" width="40" height="3" rx="1.5" fill={c} opacity="0.08" />
        </motion.g>
        <motion.line x1="100" y1="85" x2="95" y2="110" stroke={c} strokeWidth="0.6" strokeDasharray="3 3"
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Pulsing center dot ── */}
        <motion.circle cx="195" cy="175" r="4" fill={c}
          animate={{ r: [4, 8, 4], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Orbiting dots around hexagon ── */}
        <motion.circle r="2" fill={c} opacity="0.3"
          animate={{ cx: [340, 358, 340, 322, 340], cy: [48, 70, 92, 70, 48] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </motion.div>
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

      {/* Dark mode: Network constellation */}
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

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20 relative z-10">
        {/* Left — copy */}
        <div className="order-2 lg:order-1">
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

        {/* Right — Animated workspace illustration (light mode only) */}
        <div className="order-1 lg:order-2 hidden lg:flex items-center justify-center" style={{ minHeight: 400 }}>
          <EngineerIllustration />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>
    </section>
  )
}
