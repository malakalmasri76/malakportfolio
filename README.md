# Malak Almasri — Front-End Developer Portfolio

A personal portfolio site built with **React + Vite**, showcasing projects, skills, and
education for a front-end developer. Designed with a soft rose/lavender aesthetic,
full Arabic/English support, and live project data pulled from **Sanity**.

## ✨ Features

- 🌐 **Arabic / English toggle** — switches all text instantly and flips the whole
  layout between RTL and LTR automatically
- 🌙 **Light / Dark mode** — remembers your choice (`localStorage`) and respects the
  visitor's system preference on first visit
- 🧭 **Floating navbar** — flat and invisible at the top of the page, becomes a
  rounded floating pill with a blurred background once you scroll
- 📱 **Mobile menu** — a frosted-glass dropdown card with bold uppercase links and a
  direction-aware dot indicator (right side in Arabic, left side in English)
- 🗂️ **Live projects from Sanity** — the Projects section fetches data directly from
  a Sanity dataset (title, category, description, image, GitHub link, live demo
  link) instead of hardcoded content, with loading/error/empty states
- 🖱️ **Horizontal project scroll** — projects scroll sideways with snap alignment,
  a hidden scrollbar, and small arrow buttons to navigate
- ✨ Scroll-reveal animations and an animated underline on section titles
- 📐 Fully responsive across desktop, tablet, and mobile

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal (usually `http://localhost:5173`).

## 🏗️ Build for production

```bash
npm run build
```

The optimized site is generated in `dist/` — ready to deploy to Vercel, Netlify, or
any static host.

## 📁 Project structure

```
src/
  components/
    Navbar.jsx / Navbar.css       → floating pill nav, language + theme toggles, mobile menu
    Hero.jsx / Hero.css           → intro section, profile photo, decorative blobs
    Skills.jsx / Skills.css       → technical + soft skills
    Projects.jsx / Projects.css   → live projects fetched from Sanity, horizontal scroll
    Education.jsx / Education.css → degree + institution
    Contact.jsx / Contact.css     → email, WhatsApp, GitHub, location
    Footer.jsx / Footer.css       → logo + copyright
    SectionHead.jsx               → reusable section title with animated underline
    Preloader.jsx / Preloader.css → loading screen shown before the site mounts
  data/
    content.js                    → all bilingual (ar/en) text used across the site
  lib/
    sanityClient.js                → Sanity client + image URL helper
  hooks/
    useReveal.js                   → scroll-reveal animation hook
  assets/                         → logo(s) and profile photo
  index.css                       → design tokens (colors, spacing) + global styles
  App.jsx                         → wires language/theme state and renders all sections
```

## 🎨 Customizing

- **Text (both languages)** → edit `src/data/content.js`
- **Colors** → edit the CSS variables at the top of `src/index.css`
  (`:root` = light mode, `:root[data-theme="dark"]` = dark mode)
- **Contact links** → edit `src/components/Contact.jsx`
- **Logo / profile photo** → replace the files in `src/assets/`

## 🗄️ Projects data (Sanity)

Projects are managed in Sanity, not hardcoded. The connection lives in
`src/lib/sanityClient.js`:

```js
export const sanityClient = createClient({
  projectId: 'mdvzdco5',
  dataset: 'production', // ⚠️ update if your dataset has a different name
  apiVersion: '2024-01-01',
  useCdn: true
})
```

Each project document uses this schema (`project` document type):

| Field         | Type   | Notes                                  |
|---------------|--------|-----------------------------------------|
| `title`       | string | Project name                            |
| `category`    | string | Short tag shown under the title         |
| `description` | text   | Short project summary                   |
| `image`       | image  | Cover image, cropped to 700×460         |
| `github`      | url    | GitHub repo link (optional)             |
| `demo`        | url    | Live demo link (optional)               |

If no projects are published yet, the site shows a friendly empty-state message
instead of a blank section.

## 🛠️ Built with

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Sanity](https://www.sanity.io/) — headless CMS for project data
- [lucide-react](https://lucide.dev/) — icons
- Google Fonts: Cormorant Garamond, Cairo, Jost, DM Mono