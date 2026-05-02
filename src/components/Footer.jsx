import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

const links = {
  Services: ['Web Development', 'Mobile Apps', 'Custom Software', 'AI Automation'],
  Company: ['About Us', 'Our Process', 'Projects', 'Contact'],
  Connect: ['hello@arkengine.com', 'WhatsApp Us'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="pt-16 pb-8 px-6 md:px-12 lg:px-20"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
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
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="section-label mb-5">{category}</div>
              <div className="space-y-3">
                {items.map(item => (
                  <a
                    key={item}
                    href={category === 'Connect' ? (item.includes('@') ? `mailto:${item}` : '#contact') : '#'}
                    className="block text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'var(--accent)' + '12', border: '1px solid var(--accent)' + '30' }}
        >
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}>
              Ready to build something?
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Let's talk about your project — no commitment required.
            </div>
          </div>
          <a href="#contact" className="btn-primary text-xs flex items-center gap-1.5 whitespace-nowrap">
            Start a Project <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
            © {year} ArkEngine. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono' }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
