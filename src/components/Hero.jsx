import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

/* ─── Animated Workspace Illustration (Light Mode) ───
   Professional geometric SVG with continuous motion.
   Bigger, brighter, with gear, coffee, phone, cloud icons.
   Hidden in dark mode.
*/
function EngineerIllustration() {
  const c = 'var(--accent)'
  const cl = 'var(--accent-light)'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full flex items-center justify-center dark:opacity-0 transition-opacity duration-700"
    >
      <svg viewBox="0 0 500 480" fill="none" className="w-full max-w-xl" style={{ overflow: 'visible' }}>

        {/* ── Background grid ── */}
        {[120, 160, 200, 240, 280, 320].map((y) => (
          <line key={`h${y}`} x1="40" y1={y} x2="460" y2={y} stroke={c} strokeWidth="0.4" opacity="0.08" strokeDasharray="2 8" />
        ))}
        {[80, 140, 200, 260, 320, 380, 440].map((x) => (
          <line key={`v${x}`} x1={x} y1="80" x2={x} y2="360" stroke={c} strokeWidth="0.4" opacity="0.08" strokeDasharray="2 8" />
        ))}

        {/* ══════ MONITOR ══════ */}
        <rect x="100" y="110" width="240" height="165" rx="12" stroke={c} strokeWidth="2" opacity="0.8" />
        {/* Title bar */}
        <rect x="100" y="110" width="240" height="18" rx="12" stroke={c} strokeWidth="1.2" opacity="0.4" />
        <circle cx="116" cy="119" r="3" fill={c} opacity="0.5" />
        <circle cx="126" cy="119" r="3" fill={c} opacity="0.35" />
        <circle cx="136" cy="119" r="3" fill={c} opacity="0.25" />
        {/* Stand */}
        <line x1="220" y1="275" x2="220" y2="305" stroke={c} strokeWidth="2" opacity="0.6" />
        <path d="M180 305 Q220 312 260 305" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none" />

        {/* ── Code lines on screen ── */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.rect
            key={`code-${i}`}
            x={120 + (i % 3) * 10}
            y={140 + i * 17}
            width={55 + ((i * 41) % 65)}
            height={5}
            rx={2.5}
            fill={c}
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
          />
        ))}

        {/* ── Code brackets </> ── */}
        <motion.g
          animate={{ x: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M260 150 L248 170 L260 190" stroke={cl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <path d="M295 150 L307 170 L295 190" stroke={cl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <line x1="272" y1="192" x2="283" y2="148" stroke={cl} strokeWidth="1.5" opacity="0.4" />
        </motion.g>

        {/* ══════ GEAR / SETTINGS ══════ */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '420px 120px' }}
        >
          <circle cx="420" cy="120" r="20" stroke={c} strokeWidth="1.5" fill="none" opacity="0.55" />
          <circle cx="420" cy="120" r="8" stroke={c} strokeWidth="1.5" fill="none" opacity="0.45" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            return (
              <line
                key={angle}
                x1={420 + Math.cos(rad) * 17}
                y1={120 + Math.sin(rad) * 17}
                x2={420 + Math.cos(rad) * 25}
                y2={120 + Math.sin(rad) * 25}
                stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.5"
              />
            )
          })}
        </motion.g>

        {/* ══════ COFFEE MUG ══════ */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <rect x="380" y="310" width="32" height="30" rx="5" stroke={c} strokeWidth="1.5" opacity="0.6" />
          <path d="M412 318 Q422 318 422 328 Q422 338 412 338" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" fill="none" />
          {/* Steam */}
          <motion.path d="M390 306 Q392 296 389 288" stroke={cl} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" fill="none"
            animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path d="M400 304 Q402 294 399 286" stroke={cl} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" fill="none"
            animate={{ opacity: [0.15, 0.45, 0.15], y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </motion.g>

        {/* ══════ MOBILE PHONE ══════ */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <rect x="395" y="195" width="40" height="70" rx="8" stroke={c} strokeWidth="1.5" opacity="0.5" />
          {/* Screen content */}
          <rect x="402" y="212" width="26" height="4" rx="2" fill={c} opacity="0.25" />
          <rect x="402" y="220" width="18" height="4" rx="2" fill={c} opacity="0.18" />
          <rect x="402" y="228" width="22" height="4" rx="2" fill={c} opacity="0.15" />
          {/* Home indicator */}
          <line x1="410" y1="255" x2="425" y2="255" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </motion.g>

        {/* ══════ CLOUD ══════ */}
        <motion.g
          animate={{ x: [0, 6, 0], y: [0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M80 80 Q80 60 100 60 Q105 45 125 50 Q140 40 155 55 Q170 50 170 65 Q185 65 185 80 Q185 95 170 95 L95 95 Q80 95 80 80Z"
            stroke={c} strokeWidth="1.5" fill="none" opacity="0.4" />
          {/* Upload arrow */}
          <line x1="132" y1="88" x2="132" y2="70" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
          <path d="M126 76 L132 68 L138 76" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3" />
        </motion.g>

        {/* ══════ FLOATING HEXAGONS ══════ */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '55px 230px' }}
        >
          <polygon points="55,208 73,221 73,245 55,258 37,245 37,221" stroke={c} strokeWidth="1.2" fill="none" opacity="0.4" />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '55px 230px' }}
        >
          <polygon points="55,216 65,222 65,240 55,246 45,240 45,222" stroke={c} strokeWidth="0.8" fill="none" opacity="0.25" />
        </motion.g>

        {/* ══════ LIGHTBULB ══════ */}
        <motion.g
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="460" cy="380" r="14" stroke={c} strokeWidth="1.5" fill="none" opacity="0.45" />
          <line x1="454" y1="394" x2="466" y2="394" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
          <line x1="455" y1="398" x2="465" y2="398" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.25" />
          {/* Rays */}
          <line x1="460" y1="360" x2="460" y2="352" stroke={cl} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <line x1="478" y1="370" x2="484" y2="364" stroke={cl} strokeWidth="1" strokeLinecap="round" opacity="0.25" />
          <line x1="442" y1="370" x2="436" y2="364" stroke={cl} strokeWidth="1" strokeLinecap="round" opacity="0.25" />
          <line x1="480" y1="385" x2="486" y2="385" stroke={cl} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
          <line x1="440" y1="385" x2="434" y2="385" stroke={cl} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
        </motion.g>

        {/* ══════ CURSOR ARROW ══════ */}
        <motion.g
          animate={{ x: [0, 8, 3, 0], y: [0, 5, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M300 320 L300 345 L308 338 L316 352 L320 350 L312 336 L322 335Z"
            stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.5" />
        </motion.g>

        {/* ══════ TERMINAL WINDOW ══════ */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <rect x="55" y="330" width="100" height="65" rx="8" stroke={c} strokeWidth="1.2" opacity="0.45" />
          <line x1="55" y1="345" x2="155" y2="345" stroke={c} strokeWidth="0.8" opacity="0.25" />
          <circle cx="67" cy="338" r="2" fill={c} opacity="0.35" />
          <circle cx="75" cy="338" r="2" fill={c} opacity="0.25" />
          <circle cx="83" cy="338" r="2" fill={c} opacity="0.18" />
          {/* Terminal lines */}
          <motion.rect x="65" y="355" width="40" height="4" rx="2" fill={c}
            animate={{ width: [40, 65, 40], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <rect x="65" y="365" width="55" height="4" rx="2" fill={c} opacity="0.15" />
          <rect x="65" y="375" width="35" height="4" rx="2" fill={c} opacity="0.12" />
        </motion.g>

        {/* ══════ UI CARD — top-left ══════ */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="30" y="110" width="55" height="70" rx="8" stroke={c} strokeWidth="1.2" opacity="0.4" />
          {/* Avatar circle */}
          <circle cx="57" cy="130" r="8" stroke={c} strokeWidth="1" opacity="0.3" />
          <rect x="38" y="145" width="35" height="3" rx="1.5" fill={c} opacity="0.2" />
          <rect x="38" y="153" width="25" height="3" rx="1.5" fill={c} opacity="0.15" />
          <rect x="38" y="161" width="40" height="3" rx="1.5" fill={c} opacity="0.12" />
        </motion.g>

        {/* ══════ CONNECTION LINES ══════ */}
        <motion.line x1="340" y1="170" x2="395" y2="140" stroke={c} strokeWidth="0.8" strokeDasharray="4 4"
          animate={{ opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.line x1="100" y1="200" x2="73" y2="225" stroke={c} strokeWidth="0.8" strokeDasharray="4 4"
          animate={{ opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.line x1="340" y1="250" x2="395" y2="230" stroke={c} strokeWidth="0.6" strokeDasharray="3 5"
          animate={{ opacity: [0.08, 0.22, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.line x1="85" y1="180" x2="100" y2="155" stroke={c} strokeWidth="0.6" strokeDasharray="3 5"
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* ══════ ORBITING DOTS ══════ */}
        <motion.circle r="3.5" fill={c}
          animate={{ cx: [100, 340, 340, 100, 100], cy: [180, 180, 275, 275, 180] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          opacity="0.5"
        />
        <motion.circle r="2.5" fill={c} opacity="0.35"
          animate={{ cx: [420, 435, 420, 405, 420], cy: [100, 120, 140, 120, 100] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* ══════ DECORATIVE DOTS ══════ */}
        <motion.circle cx="470" cy="250" r="3" fill={c}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="25" cy="300" r="2.5" fill={c}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.circle cx="250" cy="430" r="2" fill={c}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
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
          continue
        } else if (n.isAnchor) {
          const gl = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16); gl.addColorStop(0, `rgba(${R},${G},${B},${near ? 0.28 : 0.14})`); gl.addColorStop(1, 'transparent'); ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2); ctx.fillStyle = gl; ctx.fill()
          ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2); ctx.fillStyle = `rgba(${R},${G},${B},${near ? 0.8 : 0.55})`; ctx.fill()
        } else {
          ctx.beginPath(); ctx.arc(n.x, n.y, n.radius * (near ? 1.3 : 1), 0, Math.PI * 2); ctx.fillStyle = `rgba(${R},${G},${B},${(near ? 0.55 : 0.3) + Math.sin(time * 2 + n.phase) * 0.1})`; ctx.fill()
        }
      }
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
    <section ref={containerRef} className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden" style={{ paddingTop: 68 }}>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid lg:grid-cols-2 gap-8 lg:gap-8 items-center py-12 sm:py-16 md:py-20 relative z-10">
        {/* Left — copy */}
        <div className="order-1 lg:order-1">
          <motion.div custom={0} variants={tv} initial="hidden" animate="visible" className="inline-flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-medium" style={{ background: 'var(--glow)', border: '1px solid var(--border-strong)', color: 'var(--accent)', fontFamily: 'DM Mono' }}>
              <Zap size={11} className="shrink-0" />
              <span className="whitespace-nowrap">AI-powered software studio for modern businesses</span>
            </div>
          </motion.div>

          <motion.h1 custom={1} variants={tv} initial="hidden" animate="visible" className="heading-xl mb-4 sm:mb-6 text-balance">
            Build smarter software{' '}
            <span className="italic" style={{ color: 'var(--accent)' }}>with a team</span>
            <br className="hidden sm:block" />
            {' '}that thinks beyond code.
          </motion.h1>

          <motion.p custom={2} variants={tv} initial="hidden" animate="visible" className="body-text mb-8 sm:mb-10 max-w-lg">
            ArkEngine helps businesses turn ideas into scalable websites, apps, AI tools,
            and custom software systems — with clarity, speed, and care.
          </motion.p>

          <motion.div custom={3} variants={tv} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#contact" className="btn-primary flex items-center justify-center gap-2 group">
              Start a Project <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#projects" className="btn-secondary flex items-center justify-center gap-2">View Our Work</a>
          </motion.div>

          <motion.div custom={4} variants={tv} initial="hidden" animate="visible" className="flex gap-6 sm:gap-10 mt-10 sm:mt-14 pt-6 sm:pt-8" style={{ borderTop: '1px solid var(--border)' }}>
            {[{ n: '9', label: 'Person team' }, { n: '40+', label: 'Projects built' }, { n: '5', label: 'Core services' }].map((s) => (
              <div key={s.label} className="group cursor-default">
                <div className="text-xl sm:text-2xl font-bold transition-colors duration-300 group-hover:text-[var(--accent-warm)]" style={{ fontFamily: 'Playfair Display', color: 'var(--accent)' }}>{s.n}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Animated workspace illustration (light mode only) */}
        <div className="order-2 lg:order-2 hidden lg:flex items-center justify-center" style={{ minHeight: 400 }}>
          <EngineerIllustration />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex">
        <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>
    </section>
  )
}
