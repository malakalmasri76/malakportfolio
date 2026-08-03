import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHead from './SectionHead'
import { sanityClient, urlFor } from '../lib/sanityClient'
import './Projects.css'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

// GROQ query — pulls every "project" document, oldest first.
// `status` is optional — only add it to your schema if you want the badge.
const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt asc){
  _id,
  title,
  category,
  description,
  image,
  github,
  demo,
  status
}`

export default function Projects({ t, lang }) {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [current, setCurrent] = useState(0)

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

  // Supports either a `tags` array field, or the existing single
  // `category` string split by comma.
  const getTags = (p) => {
    if (Array.isArray(p.tags) && p.tags.length) return p.tags
    if (p.category) return p.category.split(',').map((s) => s.trim()).filter(Boolean)
    return []
  }

  const goPrev = () => setCurrent((i) => (i - 1 + projects.length) % projects.length)
  const goNext = () => setCurrent((i) => (i + 1) % projects.length)

  const p = projects[current]

  return (
    <section className="section" id="projects" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <SectionHead eyebrow={t.projects.eyebrow} title={t.projects.title} desc={t.projects.desc} />

        {status === 'loading' && <p className="projects-status">{loadingLabel}</p>}
        {status === 'error' && <p className="projects-status projects-status-error">{errorLabel}</p>}
        {status === 'ready' && projects.length === 0 && <p className="projects-status">{emptyLabel}</p>}

        {status === 'ready' && projects.length > 0 && (
          <div className="projects-carousel">
            <button className="carousel-arrow left" onClick={goPrev} aria-label="Previous project">
              <ChevronLeft size={20} />
            </button>

            <div className="project-row" key={p._id}>
              <div className="project-visual">
                {p.status && <span className="status-badge">{p.status}</span>}
                <div
                  className="project-visual-img"
                  style={
                    p.image
                      ? {
                          backgroundImage: `url(${urlFor(p.image).width(1000).fit('max').url()})`
                        }
                      : { background: 'linear-gradient(135deg,var(--rose) 0%, var(--lavender) 100%)' }
                  }
                />
              </div>

              <div className="project-info">
                <h3>{p.title}</h3>
                {getTags(p).length > 0 && (
                  <div className="tags-row">
                    {getTags(p).map((tag) => (
                      <span className="tag-float" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
                {p.description && <p>{p.description}</p>}
                <div className="project-links-row">
                  {p.github && (
                    <a className="project-link-primary" href={p.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon />
                      {t.projects.viewGithub}
                    </a>
                  )}
                  {p.demo && (
                    <a className="project-link-secondary" href={p.demo} target="_blank" rel="noopener noreferrer">
                      {demoLabel}
                      <span className="arrow">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <button className="carousel-arrow right" onClick={goNext} aria-label="Next project">
              <ChevronRight size={20} />
            </button>

            <div className="carousel-dots">
              {projects.map((proj, i) => (
                <button
                  key={proj._id}
                  className={`carousel-dot${i === current ? ' is-active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}