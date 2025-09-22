
# Md. Kawsher Mahbub — Academic Portfolio (Fresh Start)

Responsive, soothing academic website with headshot slot on Home, consistent header/footer, and auto-updating Google Scholar metrics & publications. Deploy to **GitHub Pages** as `kawsher.github.io`.

## Deploy (fast)
1) Create a GitHub repo named **kawsher.github.io**.
2) Upload all files from this folder (or push via git).
3) In **Settings → Pages**, serve from **main** branch.

## Scholar Sync
- `.github/workflows/scholar.yml` runs on push and weekly.
- `scripts/fetch_scholar.py` (via `scholarly`) writes `data/scholar.json` with citations, h-index, i10, and publications.
- Home page shows animated counters; Publications page lists with filters.

## Headshot
Place your photo at: `assets/headshot.jpg` (square looks best).

## Icons
Do **not** embed icons in HTML; upload to `/assets/`:
- `icon-google-scholar.svg`, `icon-github.svg`, `icon-email.svg`, `icon-linkedin.svg`

## Local preview
```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Structure
/
  index.html
  research.html
  publications.html
  teaching.html
  talks.html
  students.html
  service-awards.html
  cv.html
  contact.html
  /assets/
  /css/site.css
  /js/site.js
  /js/publications.js
  /data/scholar.json
  /scripts/fetch_scholar.py
  /.github/workflows/scholar.yml
  robots.txt
  sitemap.xml
