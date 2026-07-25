import { useState, useEffect } from 'react'
import logo from '../assets/malak-logo2.png'
import './Preloader.css'

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setHide(true)
            setTimeout(() => onFinish && onFinish(), 600)
          }, 300)
          return 100
        }
        return prev + Math.floor(Math.random() * 8) + 4
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div className={`preloader ${hide ? 'preloader-hide' : ''}`}>
      <div className="preloader-center">
        <img src={logo} alt="Malak Almasri" className="preloader-logo" />
      </div>

      <div className="preloader-bottom">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
        <span className="progress-text">{Math.min(progress, 100)}%</span>
      </div>
    </div>
  )
}