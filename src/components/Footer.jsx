import { Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react'

const links = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'Mobile Apps', href: '#services' },
    { label: 'Custom Software', href: '#services' },
    { label: 'AI Automation', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  Connect: [
    { label: 'hello@arkengine.com', href: 'mailto:hello@arkengine.com' },
    { label: 'WhatsApp Us', href: '#contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="pt-20 pb-8 px-6 md:px-12 lg:px-20 relative"
      style={{ borderTop: '1px solid var(--border-strong)', background: 'var(--bg-tertiary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent)', boxShadow: 'var(--shadow-sm)' }}
              >
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display' }}>A</span>
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}>
                Ark<span style={{ color: 'var(--accent)' }}>Engine</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              AI-powered software studio building serious digital systems for modern businesses.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    background: 'var(--card-bg)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="section-label mb-6">{category}</div>
              <div className="space-y-3.5">
                {items.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-sm transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="rounded-2xl p-7 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: 'var(--glow)',
            border: '1px solid var(--border-strong)',
          }}
        >
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}>
              Ready to build something?
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Let's talk about your project — no commitment required.
            </div>
          </div>
          <a href="#contact" className="btn-primary text-xs flex items-center gap-2 whitespace-nowrap group">
            Start a Project
            <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
            © {year} ArkEngine. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--forest)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
