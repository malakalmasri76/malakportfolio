import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { content } from './data/content'


export default function App() {
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState(() => localStorage.getItem('malak-lang') || 'en')
  const [theme, setTheme] = useState(() => localStorage.getItem('malak-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('malak-lang', lang)
  }, [lang])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('malak-theme', theme)
  }, [theme])

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'))
  const toggleTheme = () => setTheme((th) => (th === 'light' ? 'dark' : 'light'))

  const t = content[lang]

  return (
    <>
    {loading && <Preloader onFinish={() => setLoading(false)} />}
      <Navbar t={t} lang={lang} toggleLang={toggleLang} theme={theme} toggleTheme={toggleTheme} />
      <Hero t={t} />
      <Skills t={t} />
      <Projects t={t} lang={lang} />
      <Education t={t} />
      <Contact t={t} />
      <Footer t={t} />
     
    </>
  )
}
