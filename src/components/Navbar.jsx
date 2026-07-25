import { useEffect, useState } from 'react'
import { Sun, Moon, Languages, Menu, X } from 'lucide-react'
import logo from '../assets/malak-logo.png'
import './Navbar.css'

export default function Navbar({ t, lang, toggleLang, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll() // set correct state immediately (e.g. on page reload mid-scroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact }
  ]

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="wrap">
        <div className="logo">
          {/* sizing now lives in Navbar.css (.nav-logo-img) so it can
              shrink responsively on mobile — an inline style can't be
              overridden by a media query */}
          <img src={logo} alt="Malak Almasri Logo" className="nav-logo-img" />
        </div>

        <div className={`navlinks ${menuOpen ? 'mobile-open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <button className="icon-btn lang-btn" onClick={toggleLang} aria-label="Toggle language">
            <Languages size={16} />
            <span>{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>
          <button className="icon-btn square" id="themeToggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="menu-btn" aria-label="menu" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  )
}