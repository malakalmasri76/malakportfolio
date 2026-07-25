import avatar from '../assets/avatar.png'
import './Hero.css'

export default function Hero({ t }) {
  return (
    <section className="hero" id="home">
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">
            <span className="dot"></span> {t.hero.eyebrow}
          </div>
          <h1 className="hero-name">
            {t.hero.name}
            <span className="accent">{t.hero.role}</span>
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="cta-row">
            <a href="#projects" className="btn btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#contact" className="btn btn-outline">
              {t.hero.ctaOutline}
            </a>
          </div>
          <div className="stats">
            <div className="stat">
              <b>3+</b>
              <span>{t.hero.statProjects}</span>
            </div>
            <div className="stat">
              <b>15+</b>
              <span>{t.hero.statGrad}</span>
            </div>
            <div className="stat">
              <b>90%</b>
              <span>{t.hero.statLang}</span>
            </div>
          </div>
        </div>

        <div className="mono-card">
          <div className="ring">
            {/* avatar-frame clips the image into a perfect circle regardless
                of any outer CSS conflicts (e.g. a global "img { height:auto }" rule) */}
            <div className="avatar-frame">
              <img src={avatar} alt={t.hero.name} className="avatar-photo" />
            </div>
            <div className="badge top">
              <span className="dotstatus"></span> {t.hero.badgeAvailable}
            </div>
            <div className="badge bottom">🎓 {t.hero.badgeDegree}</div>
          </div>
        </div>
      </div>
    </section>
  )
}