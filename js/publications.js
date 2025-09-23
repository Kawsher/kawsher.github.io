async function getData() {
  try {
    const r = await fetch("data/scholar.json", { cache: "no-cache" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch {
    return null;
  }
}

function years(pubs) {
  return [...new Set(pubs.map(x => x.year).filter(Boolean))].sort((a, b) => b - a);
}

function render(list){
  const el = document.getElementById('pub-list');
  el.innerHTML = list.map(p => `
    <div class='pub-item'>
      <div class='pub-title'>${p.title || 'Untitled'}</div>
      <div class='pub-meta'>${p.authors || ''} · ${p.venue || ''} · ${p.year || ''}</div>
      <div class='pub-actions'>
        ${p.link ? `<a class='badge pub-link' href='${p.link}' target='_blank' rel='noopener'>Read Paper</a>` : ''}
        ${typeof p.citedBy === 'number' ? `<span class='badge'>Cited by ${p.citedBy}</span>` : ''}
      </div>

    </div>
  `).join('');
}

(async function () {
  const data = await getData();
  const upd = document.getElementById("pub-updated");
  const search = document.getElementById("search");
  const year = document.getElementById("yearFilter");
  const sort = document.getElementById("sortBy");

  if (!data || !Array.isArray(data.publications)) {
    document.getElementById("pub-list").innerHTML =
      '<div class="card">Publications will appear after the first Scholar sync.</div>';
    if (upd) upd.textContent = "";
    return;
  }

  let pubs = data.publications;

  if (upd && data.metrics) {
    upd.textContent = "Updated: " + (data.metrics.lastUpdated || "");
  }

  years(pubs).forEach(y => {
    const o = document.createElement("option");
    o.value = y;
    o.textContent = y;
    year.appendChild(o);
  });

  function apply() {
    const q = (search.value || "").toLowerCase();
    const yf = year.value;
    const s = sort.value;

    let list = pubs.filter(p => {
      const text = [p.title, p.authors, p.venue].join(" ").toLowerCase();
      const okQ = !q || text.includes(q);
      const okY = !yf || String(p.year || "") === yf;
      return okQ && okY;
    });

    if (s === "year") list.sort((a, b) => (b.year || 0) - (a.year || 0));
    if (s === "citations") list.sort((a, b) => (b.citedBy || 0) - (a.citedBy || 0));
    if (s === "title")
      list.sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));

    render(list);
  }

  search.addEventListener("input", apply);
  year.addEventListener("change", apply);
  sort.addEventListener("change", apply);
  apply();
})();
