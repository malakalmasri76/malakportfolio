import useReveal from '../hooks/useReveal'

export default function SectionHead({ eyebrow, title, desc }) {
  const [ref, inView] = useReveal()
  return (
    <div ref={ref} className={`section-head fade-up ${inView ? 'in-view' : ''}`}>
      <div className="mono">{eyebrow}</div>
      <h2>{title}</h2>
      <svg className="ribbon" width="220" height="20" viewBox="0 0 220 20">
        <path d="M2 14 Q 55 2, 110 14 T 218 10" />
      </svg>
      {desc && <p className="desc">{desc}</p>}
    </div>
  )
}
