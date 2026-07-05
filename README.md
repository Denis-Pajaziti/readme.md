# Denis Pajaziti - Portfolio

Personal portfolio: a single-page, WebGL-animated site. Static files only -
**no build step**, deployable straight to GitHub Pages.

## Tech

| Layer | Library |
|---|---|
| 3D hero scene (particle galaxy, wireframe meshes) | [three.js](https://threejs.org/) via ES module CDN |
| Scroll animations, pinned horizontal section, counters | [GSAP + ScrollTrigger](https://gsap.com/) |
| Smooth scrolling | [Lenis](https://lenis.darkroom.engineering/) |
| 3D tilt cards | [vanilla-tilt](https://micku7zu.github.io/vanilla-tilt.js/) |
| Tech logos | [Devicon](https://devicon.dev/) CDN |

Everything else is hand-written vanilla HTML/CSS/JS.

## Features

- WebGL particle galaxy with pointer parallax and floating wireframe meshes
- Preloader with animated counter
- Custom cursor (dot + trailing ring) and magnetic buttons
- Per-character split-text title animations
- Pinned **horizontal-scroll career timeline**
- Infinite tech-stack logo marquee
- Auto-typing terminal card
- 3D tilt project cards with glare
- Film grain overlay, scroll progress bar, smooth anchor scrolling
- Respects `prefers-reduced-motion`, responsive down to mobile

## Structure

```
├── index.html          # Markup, all content, CDN imports
├── css/
│   └── style.css       # Design tokens + all styles
└── js/
    ├── main.js         # Entry point, wires everything up
    ├── scene.js        # three.js hero scene
    ├── animations.js   # GSAP/Lenis: preloader, reveals, horizontal scroll
    ├── content.js      # Data-driven marquee, skill icons, terminal script
    ├── cursor.js       # Custom cursor + magnetic buttons
    └── typewriter.js   # Hero role typewriter
```

## Run locally

```bash
python -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000. A server is required (ES modules don't run from `file://`).

## Deploy (GitHub Pages)

1. Push to GitHub.
2. **Settings → Pages** → Source: `main` branch, root folder.
3. Done - served at `https://<username>.github.io/<repo>/`.

## License

MIT
