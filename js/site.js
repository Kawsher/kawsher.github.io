/* =========================================================
   site.js — Dynamic functionality (Scholar, nav, animations)
========================================================= */

// ── Scholar data fetch ──────────────────────────────────
async function fetchScholar() {
  try {
    const r = await fetch("data/scholar.json", { cache: "no-cache" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch {
    return null;
  }
}

// ── Animated counter ───────────────────────────────────
function animateCount(el, to) {
  if (!el) return;
  const duration = 1400;
  const t0 = performance.now();

  function tick(ti) {
    const p = Math.min(1, (ti - t0) / duration);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(to * ease).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── Render publication card ─────────────────────────────
function pubCard(p) {
  return `
    <div class="pub-item">
      <div class="pub-title">${p.title || "Untitled"}</div>
      <div class="pub-meta">${p.authors || ""} &middot; <em>${p.venue || ""}</em> &middot; ${p.year || ""}</div>
      <div class="pub-actions">
        ${p.link ? `<a class="btn-pub btn-pub-link" href="${p.link}" target="_blank" rel="noopener">📄 Read Paper</a>` : ""}
        ${typeof p.citedBy === "number" ? `<span class="btn-pub btn-pub-cite">Cited by ${p.citedBy}</span>` : ""}
      </div>
    </div>`;
}

// ── Attach metrics & featured pubs on Home ──────────────
(async function initHome() {
  const data = await fetchScholar();

  const kpiC   = document.getElementById("kpi-citations");
  const kpiH   = document.getElementById("kpi-hindex");
  const kpiI   = document.getElementById("kpi-i10");
  const kpiP   = document.getElementById("kpi-pubs");
  const updated = document.getElementById("metrics-updated");

  if (data) {
    const m = data.metrics || {};
    if (kpiC) animateCount(kpiC, m.citations || 0);
    if (kpiH) animateCount(kpiH, m.hindex    || 0);
    if (kpiI) animateCount(kpiI, m.i10       || 0);
    if (kpiP) animateCount(kpiP, Array.isArray(data.publications) ? data.publications.length : 0);
    if (updated) updated.textContent = "Scholar data updated: " + (m.lastUpdated || "N/A");
  } else {
    if (updated) updated.textContent = "Scholar data will appear after the first sync.";
  }

  // Featured publications (3 most recent)
  const fp = document.getElementById("featured-pubs");
  if (fp && data && Array.isArray(data.publications)) {
    const pubs = [...data.publications]
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, 3);
    fp.innerHTML = pubs.map(pubCard).join("") || "<p>No publications yet.</p>";
  }
})();

// ── Inject header / footer partials ────────────────────
async function injectPartial(id, url) {
  const host = document.getElementById(id);
  if (!host) return;
  try {
    const res = await fetch(url, { cache: "no-cache" });
    host.innerHTML = await res.text();
  } catch { /* static hosting — swallow */ }
}

function highlightNav() {
  const cur = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === cur) a.classList.add("active");
  });
}

(async function boot() {
  await Promise.all([
    injectPartial("header", "partials/header.html"),
    injectPartial("footer", "partials/footer.html"),
  ]);

  highlightNav();

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Scroll → header shadow
  const h = document.querySelector("header.site-header");
  if (h) {
    const onScroll = () => h.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Back-to-top button
  const btn = document.getElementById("back-top");
  if (btn) {
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 300);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Mobile nav toggle (injected from partial)
  const toggle = document.getElementById("navToggle");
  const menu   = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
  }
})();

// ── Fade-up observer ───────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationPlayState = "running";
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-up").forEach(el => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});
