# Malak Almasri — Portfolio (React)

Front-end developer portfolio built with **React + Vite**, featuring:

- 🌐 Arabic / English language toggle (auto RTL/LTR switching)
- 🌙 Light / Dark mode toggle (remembers your choice + respects system preference)
- ✨ Scroll-reveal animations, animated section-title underline
- 📱 Fully responsive layout

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

The optimized site will be generated in the `dist/` folder — ready to deploy to Vercel, Netlify, or any static host.

## Project structure

```
src/
  components/     → Navbar, Hero, Skills, Projects, Education, Contact, Footer
  data/content.js → all Arabic/English text + project data (edit this to update content)
  hooks/useReveal.js → scroll-reveal animation hook
  index.css       → design tokens (colors, spacing) + all styles
  App.jsx         → wires language/theme state together
```

## Customizing

- **Text & projects**: edit `src/data/content.js`
- **Colors**: edit the CSS variables at the top of `src/index.css` (`:root` for light mode, `:root[data-theme="dark"]` for dark mode)
- **Contact links**: edit `src/components/Contact.jsx`
