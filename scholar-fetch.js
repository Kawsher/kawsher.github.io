// ============================================================
// scholar-fetch.js
// Fetches live Google Scholar stats + publications for
// Md. Kawsher Mahbub and exposes them via window events.
//
// Strategy: Google Scholar blocks direct XHR. We use the
// allorigins.win CORS proxy to scrape the public profile page.
// If that fails, the page silently falls back to the static
// data in site-data.js. No API key required.
// ============================================================

(function () {
  "use strict";

  const SCHOLAR_ID  = "fQ_TTFsAAAAJ";
  const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&sortby=pubdate`;
  const PROXY       = `https://api.allorigins.win/get?url=${encodeURIComponent(SCHOLAR_URL)}`;

  // ---- helpers ----
  function parseStats(doc) {
    // The stats table has id="gsc_rsb_st"
    const rows = doc.querySelectorAll("#gsc_rsb_st tbody tr");
    const stats = {};
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length >= 2) {
        const label = cells[0].textContent.trim().toLowerCase();
        const val   = parseInt(cells[1].textContent.trim(), 10);
        if (!isNaN(val)) {
          if (label.includes("citations"))  stats.citations = val;
          if (label.includes("h-index"))    stats.hIndex    = val;
          if (label.includes("i10-index"))  stats.i10Index  = val;
        }
      }
    });
    return stats;
  }

  function parsePubs(doc) {
    const items = doc.querySelectorAll("#gsc_a_b .gsc_a_tr");
    const pubs  = [];
    items.forEach(row => {
      const titleEl   = row.querySelector(".gsc_a_at");
      const authsEl   = row.querySelector(".gsc_a_at + .gs_gray");
      const venueEl   = row.querySelector(".gs_gray:last-of-type");
      const yearEl    = row.querySelector(".gsc_a_y span");
      const citedEl   = row.querySelector(".gsc_a_c a");
      const linkEl    = row.querySelector(".gsc_a_at");

      if (!titleEl) return;

      const href  = linkEl ? linkEl.getAttribute("href") : "";
      const link  = href ? `https://scholar.google.com${href}` : "";
      const year  = yearEl  ? parseInt(yearEl.textContent.trim(), 10)  : null;
      const cited = citedEl ? parseInt(citedEl.textContent.trim(), 10) : 0;

      pubs.push({
        title:    titleEl.textContent.trim(),
        authors:  authsEl  ? authsEl.textContent.trim()  : "",
        venue:    venueEl  ? venueEl.textContent.trim()   : "",
        year:     isNaN(year) ? null : year,
        citations:isNaN(cited) ? 0 : cited,
        link:     link,
        // type is inferred below
        type:     inferType(venueEl ? venueEl.textContent.trim() : "")
      });
    });
    return pubs;
  }

  function inferType(venue) {
    const v = venue.toLowerCase();
    if (v.includes("arxiv") || v.includes("preprint")) return "preprint";
    // Conference signals
    if (v.match(/\b(conference|symposium|workshop|proceedings|cbms|iceeict|icsct|ictcs|tcce|rtip2r|aii)\b/))
      return "conference";
    return "journal";
  }

  function mergeUnderReview(scholarPubs, staticPubs) {
    // Under-review items live only in site-data.js — prepend them
    const ur = staticPubs.filter(p => p.type === "under-review");
    return [...ur, ...scholarPubs];
  }

  // ---- main fetch ----
  async function fetchScholar() {
    try {
      const res  = await fetch(PROXY, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // allorigins wraps the page HTML in json.contents
      const parser = new DOMParser();
      const doc    = parser.parseFromString(json.contents, "text/html");

      const stats = parseStats(doc);
      const pubs  = parsePubs(doc);

      // Merge under-review papers from static data
      const merged = mergeUnderReview(pubs, window.SITE_DATA.publications);

      // Count total including under-review
      const totalPubs = merged.length;

      // Dispatch event so render.js can update the UI
      window.dispatchEvent(new CustomEvent("scholarLoaded", {
        detail: {
          stats: {
            publications: totalPubs || window.SITE_DATA.stats.publications,
            citations:    stats.citations  ?? window.SITE_DATA.stats.citations,
            hIndex:       stats.hIndex     ?? window.SITE_DATA.stats.hIndex,
            i10Index:     stats.i10Index   ?? window.SITE_DATA.stats.i10Index
          },
          publications: merged.length > 0 ? merged : window.SITE_DATA.publications
        }
      }));

    } catch (err) {
      console.warn("[scholar-fetch] Falling back to static data:", err.message);
      // Fire event with static data so render.js still runs normally
      window.dispatchEvent(new CustomEvent("scholarLoaded", {
        detail: {
          stats:        window.SITE_DATA.stats,
          publications: window.SITE_DATA.publications
        }
      }));
    }
  }

  // Run after DOM + SITE_DATA are ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchScholar);
  } else {
    fetchScholar();
  }

})();
