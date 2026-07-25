import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHead from './SectionHead'
import { sanityClient, urlFor } from '../lib/sanityClient'
import './Projects.css'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
)

// GROQ query — pulls every "project" document, newest last.
// Matches the Sanity schema fields: title, category, description, image, github, demo
const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt asc){
  _id,
  title,
  category,
  description,
  image,
  github,
  demo
}`

export default function Projects({ t, lang }) {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const scrollRef = useRef(null)

  const scrollByCard = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('.project-card')?.offsetWidth || 340
    const gap = 28
    el.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' })
  }

  useEffect(() => {
    let cancelled = false

    sanityClient
      .fetch(PROJECTS_QUERY)
      .then((data) => {
        if (cancelled) return
        setProjects(data)
        setStatus('ready')
      })
      .catch((err) => {
        console.error('Failed to load projects from Sanity:', err)
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const demoLabel = lang === 'ar' ? 'عرض تجريبي' : 'Live Demo'
  const loadingLabel = lang === 'ar' ? 'جاري تحميل المشاريع…' : 'Loading projects…'
  const errorLabel =
    lang === 'ar'
      ? 'تعذّر تحميل المشاريع حالياً. حاولي لاحقاً.'
      : "Couldn't load projects right now. Please try again later."
  const emptyLabel = lang === 'ar' ? 'لا توجد مشاريع منشورة بعد.' : 'No projects published yet.'

  return (
    <section className="section" id="projects" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <SectionHead eyebrow={t.projects.eyebrow} title={t.projects.title} desc={t.projects.desc} />

        {status === 'loading' && <p className="projects-status">{loadingLabel}</p>}
        {status === 'error' && <p className="projects-status projects-status-error">{errorLabel}</p>}
        {status === 'ready' && projects.length === 0 && <p className="projects-status">{emptyLabel}</p>}

        {status === 'ready' && projects.length > 0 && (
          <div className="projects-scroll-wrap">
            <button className="scroll-arrow left" onClick={() => scrollByCard(-1)} aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>

            <div className="projects-grid" ref={scrollRef}>
              {projects.map((p) => (
                <div className="project-card" key={p._id}>
                  <div
                    className="project-visual"
                    style={
                      p.image
                        ? {
                            backgroundImage: `url(${urlFor(p.image).width(700).height(460).fit('crop').url()})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }
                        : { background: 'linear-gradient(135deg,var(--rose) 0%, var(--lavender) 100%)' }
                    }
                  />
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    {p.category && <span className="tag-float">{p.category}</span>}
                    {p.description && <p>{p.description}</p>}
                    <div className="project-links-row">
                      {p.github && (
                        <a className="project-link" href={p.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon />
                          {t.projects.viewGithub}
                        </a>
                      )}
                      {p.demo && (
                        <a className="project-link" href={p.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalIcon />
                          {demoLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="scroll-arrow right" onClick={() => scrollByCard(1)} aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}