import SectionHead from './SectionHead'
import './Education.css'

export default function Education({ t }) {
  return (
    <section className="section" id="education">
      <div className="wrap">
        <SectionHead eyebrow={t.education.eyebrow} title={t.education.title} />

        <div className="edu-card">
          <div className="edu-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10 12 5 2 10l10 5 10-5Z" />
              <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
            </svg>
          </div>
          <div>
            <h3>{t.education.degree}</h3>
            <div className="school">{t.education.school}</div>
            <p>{t.education.desc}</p>
          </div>
          <div className="edu-date">{t.education.date}</div>
        </div>
      </div>
    </section>
  )
}
