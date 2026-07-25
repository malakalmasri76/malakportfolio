import SectionHead from './SectionHead'
import './Skills.css'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 16 L6.5 20 L8.5 13 L3 9 L10 9 Z" />
  </svg>
)

export default function Skills({ t }) {
  const categories = [
    { title: t.skills.catLangTools, items: ['HTML5', 'CSS3', 'JavaScript (ES6+)'], variant: '' },
    { title: t.skills.catFrameworks, items: ['React', 'React Hooks'], variant: 'lav' },
    {
      title: t.skills.catUI,
      items: ['Responsive Design', 'Flexbox', 'CSS Grid', 'Component-Based Architecture'],
      variant: ''
    },
    { title: t.skills.catVersion, items: ['Git', 'GitHub'], variant: 'lav' }
  ]

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHead eyebrow={t.skills.eyebrow} title={t.skills.title} desc={t.skills.desc} />

        <div className="skills-grid">
          {categories.map((cat) => (
            <div className="skill-card" key={cat.title}>
              <h3>{cat.title}</h3>
              <div className="pill-row">
                {cat.items.map((item) => (
                  <span className={`pill ${cat.variant}`} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="soft-skills">
          {t.skills.soft.map((s) => (
            <div className="soft-pill" key={s}>
              <CheckIcon /> {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
