# Daffa Bagus Maulana — Portfolio

<p align="center">
  <strong>One portfolio. Two ways to explore.</strong>
</p>

<p align="center">
  A personal portfolio with a classic, scannable experience and an interactive 2D world.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/KAPLAY-2D_Game-8B5CF6?style=flat" alt="KAPLAY" />
</p>

<p align="center">
  <a href="#portfolio-experiences">Experiences</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## About

This portfolio presents **Daffa Bagus Maulana**, an Informatics graduate interested in data analytics, machine learning, and software development.

Rather than choosing between a traditional portfolio and an interactive showcase, the site offers both. Visitors can quickly scan experience and projects on the classic page, or explore a pixel-art world and discover portfolio content by interacting with its locations.

---

## Portfolio Experiences

| Experience | Route | Description |
| --- | --- | --- |
| **Classic** | `/classic` | A responsive portfolio with sections for profile, experience, education, projects, skills, certifications, and contact. |
| **Play** | `/` (your domain) | The default experience: a side-scrolling, pixel-art portfolio where locations open experience, skills, and project details. |

Opening the domain root starts the interactive experience on compatible desktop devices. On smaller or touch-first devices, it automatically redirects to the classic page. You can also open `/classic` directly; `/play` is available as a direct route to the game.

### Game Controls

```text
← / → or A / D  Walk
E                Interact with a nearby location
```

The game also includes an optional ambient music toggle. Visitors can switch to the classic page at any time.

---

## Features

| Feature | Description |
| --- | --- |
| Two ways to explore | Choose a conventional portfolio or an interactive 2D world. |
| Responsive classic page | Browse career information on desktop and mobile layouts. |
| Experience details | Explore professional and organizational roles, with supporting photos and work samples. |
| Project showcase | Review project descriptions, technologies, outcomes, screenshots, and external links. |
| Interactive game | Walk through a pixel-art world and interact with portfolio locations. |
| Image galleries | Open project and experience images in lightboxes with navigation controls. |
| Contact and resume | Find contact links and download the latest CV from the portfolio. |
| Social sharing metadata | Page titles, descriptions, and Open Graph/Twitter preview metadata support link sharing. |

---

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Interactive world | KAPLAY |
| Icons | Iconify, Simple Icons |
| Deployment | Vercel-compatible Next.js application |

---

## Project Structure

```text
app/
├── classic/          # Classic portfolio route
├── play/             # Interactive game route
├── opengraph-image.tsx
├── layout.tsx        # Shared layout and site metadata
└── page.tsx           # Responsive home-route entry
components/            # Portfolio sections, modals, and game UI
content/
├── data.ts            # Profile, experience, projects, skills, and contact data
└── types.ts           # Content types
game/                  # Game world and KAPLAY setup
public/
├── assets/            # Pixel-art game assets
├── photos/            # Portfolio photos and project screenshots
├── logos/             # Organization and project logos
└── CV.pdf             # Downloadable resume
```

Most portfolio content is maintained in `content/data.ts`. Static images are stored under `public/` and referenced by their URL paths, such as `/photos/portrait.jpg`.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Run locally

```bash
# Clone the repository
git clone https://github.com/daffmaulana/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a compatible desktop browser to start the game. On smaller or touch-first devices, the root route redirects to `/classic`. Use `/classic` to open the standard page directly, or `/play` to open the game directly.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint. |
| `npx tsc --noEmit` | Check TypeScript types. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build locally. |

---

## Deployment

The project can be deployed to [Vercel](https://vercel.com/) by importing the GitHub repository and using the default Next.js build settings.

If the site uses a custom domain, set `PORTFOLIO_SITE_URL` to the canonical site origin (for example, `https://example.com`) in the deployment environment. This is used to generate absolute canonical and social metadata URLs. Vercel deployment URL variables are also supported.

---

<p align="center">
  <strong>Daffa Bagus Maulana</strong><br />
  Data · Machine Learning · Software Development
</p>
