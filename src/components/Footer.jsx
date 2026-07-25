import logo from '../assets/malak-logo.png'
import './Footer.css'

export default function Footer({ t }) {
  return (
    <footer>
      <div className="logo">
        <img src={logo} alt="Malak Almasri Logo" className="footer-logo-img" />
      </div>
      <div>{t.footer.rights}</div>
    </footer>
  )
}