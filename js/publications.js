/* =========================================================
   publications.js — Scholar-driven pub list with filters
========================================================= */

async function getData() {
  try {
    const r = await fetch("data/scholar.json", { cache: "no-cache" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch {
    return null;
  }
}

function getYears(pubs) {
  return [...new Set(pubs.map(x => x.year).filter(Boolean))].sort((a, b) => b - a);
}

function renderPubs(list) {
  const el = document.getElementById("pub-list");
  if (!list.length) {
    el.innerHTML = '<div class="pub-item" style="text-align:center;color:var(--text-muted);">No publications match your filters.</div>';
    return;
  }
  el.innerHTML = list.map(p => `
    <div class="pub-item">
      <div class="pub-title">${p.title || "Untitled"}</div>
      <div class="pub-meta">
        ${p.authors || ""} &middot; <em>${p.venue || ""}</em> &middot; ${p.year || ""}
      </div>
      <div class="pub-actions">
        ${p.link ? `<a class="btn-pub btn-pub-link" href="${p.link}" target="_blank" rel="noopener">📄 Read Paper</a>` : ""}
        ${typeof p.citedBy === "number" ? `<span class="btn-pub btn-pub-cite">Cited by ${p.citedBy}</span>` : ""}
      </div>
    </div>`).join("");
}

(async function () {
  const data = await getData();
  const updEl  = document.getElementById("pub-updated");
  const search = document.getElementById("search");
  const year   = document.getElementById("yearFilter");
  const sort   = document.getElementById("sortBy");
  const count  = document.getElementById("pub-count");

  if (!data || !Array.isArray(data.publications)) {
    document.getElementById("pub-list").innerHTML =
      '<div class="pub-item">Publications will appear after the first Scholar sync.</div>';
    if (updEl) updEl.textContent = "";
    return;
  }

  let pubs = data.publications;

  if (updEl && data.metrics) {
    updEl.textContent = "Last updated: " + (data.metrics.lastUpdated || "N/A");
  }

  // Populate year filter
  getYears(pubs).forEach(y => {
    const o = document.createElement("option");
    o.value = y; o.textContent = y;
    year.appendChild(o);
  });

  function apply() {
    const q  = (search.value || "").toLowerCase();
    const yf = year.value;
    const s  = sort.value;

    let list = pubs.filter(p => {
      const text = [p.title, p.authors, p.venue].join(" ").toLowerCase();
      return (!q || text.includes(q)) && (!yf || String(p.year || "") === yf);
    });

    if (s === "year")      list.sort((a, b) => (b.year || 0)    - (a.year || 0));
    if (s === "citations") list.sort((a, b) => (b.citedBy || 0) - (a.citedBy || 0));
    if (s === "title")     list.sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));

    if (count) count.textContent = `${list.length} publication${list.length !== 1 ? "s" : ""}`;
    renderPubs(list);
  }

  search.addEventListener("input", apply);
  year.addEventListener("change", apply);
  sort.addEventListener("change", apply);
  apply();
})();
