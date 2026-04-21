# Md. Kawsher Mahbub — Academic Portfolio (Redesigned)

A modern, elegant CS faculty portfolio. Built from your existing code with all dynamic functionality preserved.

## Structure
```
portfolio/
├── index.html              ← Homepage (hero, news, research, pubs, skills)
├── research.html
├── publications.html       ← Scholar-synced, search/filter/sort intact
├── teaching.html           ← Course table layout
├── talks.html
├── students.html
├── service-awards.html
├── cv.html
├── contact.html
├── css/
│   └── site.css            ← Full design system
├── js/
│   ├── site.js             ← Scholar fetch, metrics animation, nav
│   └── publications.js     ← Full pub list logic (unchanged)
├── partials/
│   ├── header.html
│   └── footer.html
├── data/
│   └── scholar.json        ← Populated by GitHub Actions workflow
├── scripts/
│   └── fetch_scholar.py    ← Your existing Scholar scraper (unchanged)
├── assets/                 ← Your existing images/icons (copy from old repo)
├── sitemap.xml
└── robots.txt
```

## What Changed
- **New design system**: Navy/teal/gold palette, Playfair Display + Source Sans 3 fonts
- **News section**: Prominent dark-background news grid on homepage
- **Hero**: Full-width gradient with animated metric cards
- **Timeline layout**: Experience and Education side-by-side
- **Course table**: Proper `<table>` for teaching data
- **Back-to-top button**: Fixed position, smooth scroll
- **Mobile nav**: Hamburger menu for small screens
- **Fade-up animations**: IntersectionObserver-triggered entry animations

## What Was Preserved (Unchanged Logic)
- `fetchScholar()` and `animateCount()` in site.js
- `publications.js` — all search/filter/sort logic
- `injectPartial()` — header/footer injection system  
- `highlightNav()` — active nav detection
- `fetch_scholar.py` — Scholar scraper
- All Formspree contact form integration
- All social links and asset paths

## Setup
1. Copy your `assets/` folder from the old repo into this one
2. Run `python scripts/fetch_scholar.py` or trigger your GitHub Actions workflow
3. Deploy to GitHub Pages (Settings → Pages → main branch / root)

## Assets Needed
Copy these from your existing repo:
- `assets/image.jpg` (your headshot)
- `assets/favicon.png`
- `assets/CV_MdKawsherMahbub.pdf`
- All icon files (icon-orciid.svg, icons-google-scholar.png, etc.)
