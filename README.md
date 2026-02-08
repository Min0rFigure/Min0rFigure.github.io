# Min0rFigure.github.io

[![Deploy](https://github.com/Min0rFigure/Min0rFigure.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Min0rFigure/Min0rFigure.github.io/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Personal website and blog built with Gatsby, React, and Node.js. Deployed automatically to GitHub Pages.

🌐 **Live Site**: [min0rfigure.github.io](https://min0rfigure.github.io)

---

## Overview

| Section | Description |
|---------|-------------|
| `/blog` | Technical articles and tutorials |
| `/notes` | Personal thoughts and reflections |
| `/projects` | Project showcase |
| `/about` | Bio and contact information |

---

## Tech Stack

- **Framework**: [Gatsby](https://www.gatsbyjs.com/) v5 (React-based static site generator)
- **Styling**: PostCSS with dark mode support
- **Content**: Markdown with frontmatter
- **Search**: Local search via `gatsby-plugin-local-search`
- **Deployment**: GitHub Actions → GitHub Pages
- **Content Management**: Private git submodule

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Git with SSH key configured

### Installation

```bash
# Clone repository
git clone git@github.com:Min0rFigure/Min0rFigure.github.io.git
cd Min0rFigure.github.io

# Initialize content submodule
git submodule update --init --recursive

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:9000)
npm run develop

# Build for production
npm run build

# Preview production build locally
npm run serve
```

### Running in Background

```bash
# Option 1: nohup
nohup npm run serve -- --host 0.0.0.0 > server.log 2>&1 &

# Option 2: screen
screen -S server
npm run serve -- --host 0.0.0.0
# Detach: Ctrl+A, D | Reattach: screen -r server
```

---

## Architecture

```
├── content/                 # Git submodule (private repo)
│   ├── posts/              # Blog posts & notes (Markdown)
│   ├── pages/              # Static pages
│   └── images/             # Content images
├── src/
│   ├── components/         # React components
│   ├── pages/              # Route pages
│   ├── templates/          # Post/page templates
│   └── data/               # Static data (projects list)
├── static/                  # Static assets
└── .github/workflows/       # CI/CD pipelines
```

---

## Content Workflow

Content is managed in a **private repository** (`Min0rFigure-content`) linked as a git submodule.

### Publishing Flow

```
Edit content locally → Push to content repo → Auto-deploy triggered → Site updated
```

### Content Types

**Blog Post** — Technical article appearing in `/blog`
```markdown
---
title: "Article Title"
date: "2026-01-15"
slug: "article-slug"
tags: ["javascript", "tutorial"]
categories: ["Technical"]
template: "post"
thumbnail: "../images/thumbnail.png"
---
```

**Note** — Personal post appearing in `/notes`
```markdown
---
title: "Note Title"
date: "2026-01-15"
slug: "note-slug"
categories: ["Personal"]
template: "post"
---
```

**Page** — Static page (e.g., About)
```markdown
---
title: "Page Title"
slug: "page-slug"
template: "page"
---
```

---

## Deployment

Deployment is fully automated via GitHub Actions.

| Trigger | Action |
|---------|--------|
| Push to `master` | Build and deploy to GitHub Pages |
| Push to content repo | Triggers `repository_dispatch` → deploy |
| Manual | Run workflow from Actions tab |

### Required Secrets

| Secret | Repository | Purpose |
|--------|------------|---------|
| `CONTENT_REPO_DEPLOY_KEY` | Main | SSH key to clone private content |
| `MAIN_REPO_DISPATCH_TOKEN` | Content | PAT to trigger main repo workflow |

---

## Contributing

This is a personal website and not accepting contributions. Feel free to fork and adapt for your own use.

---

## Acknowledgments

Built on the foundation of [taniarascia.com](https://github.com/taniarascia/taniarascia.com) by Tania Rascia.

---

## License

This project is open source and available under the [MIT License](LICENSE).
