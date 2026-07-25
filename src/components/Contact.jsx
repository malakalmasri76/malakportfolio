import './Contact.css'

const icons = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function Contact({ t }) {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact">
          <div className="blob"></div>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.desc}</p>

          <div className="contact-links">
            <a className="contact-item" href="mailto:malakalmasri76@gmail.com">
              <div className="ico">{icons.email}</div>
              <b>{t.contact.email}</b>
              <span>malakalmasri76@gmail.com</span>
            </a>
            <a className="contact-item" href="https://wa.me/972592281872" target="_blank" rel="noopener noreferrer">
              <div className="ico">{icons.whatsapp}</div>
              <b>{t.contact.whatsapp}</b>
              <span>+972-5922-81872</span>
            </a>
            <a className="contact-item" href="https://github.com/malakalmasri76" target="_blank" rel="noopener noreferrer">
              <div className="ico">{icons.github}</div>
              <b>{t.contact.github}</b>
              <span>malakalmasri76</span>
            </a>
            <div className="contact-item">
              <div className="ico">{icons.location}</div>
              <b>{t.contact.location}</b>
              <span>{t.contact.locationValue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
