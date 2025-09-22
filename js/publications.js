async function getData(){
  try{ const r=await fetch('data/scholar.json',{cache:'no-cache'}); if(!r.ok) throw 0; return await r.json(); }
  catch{ return null; }
}
function years(pubs){ return [...new Set(pubs.map(p=>p.year).filter(Boolean))].sort((a,b)=>b-a); }

function render(list){
  const el = document.getElementById('pub-list');
  el.innerHTML = list.map(p => `
    <div class="pub-item">
      <div class="pub-title">${p.title || 'Untitled'}</div>
      <div class="pub-meta">${p.authors || ''} · ${p.venue || ''} · ${p.year || ''} · <span class="badge">${p.type || 'Other'}</span></div>
      <div class="pub-actions">
        ${p.link ? `<a class="btn" href="${p.link}" target="_blank" rel="noopener">Publisher</a>` : ''}
        ${typeof p.citedBy === 'number' ? `<span class="badge">Cited by ${p.citedBy}</span>` : ''}
      </div>
    </div>
  `).join('');
}

(function init(){
  let pubs = [];
  let currentCat = "All";

  const upd = document.getElementById('pub-updated');
  const search = document.getElementById('search');
  const yearFilter = document.getElementById('yearFilter');
  const sortBy = document.getElementById('sortBy');
  const tabs = document.getElementById('catTabs');

  function apply(){
    const q = (search.value || '').toLowerCase();
    const y = yearFilter.value;
    const s = sortBy.value;

    let list = pubs.filter(p => {
      const text = [p.title, p.authors, p.venue, p.type].join(' ').toLowerCase();
      const okQ = !q || text.includes(q);
      const okY = !y || (String(p.year||'') === y);
      const okC = currentCat === "All" || (p.type === currentCat);
      return okQ && okY && okC;
    });

    if (s === 'year') list.sort((a,b)=>(b.year||0)-(a.year||0));
    if (s === 'citations') list.sort((a,b)=>(b.citedBy||0)-(a.citedBy||0));
    if (s === 'title') list.sort((a,b)=>String(a.title||'').localeCompare(String(b.title||'')));

    render(list);
  }

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('button.tab'); if (!btn) return;
    [...tabs.querySelectorAll('.tab')].forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.getAttribute('data-cat');
    apply();
  });

  getData().then(data => {
    if (!data || !Array.isArray(data.publications)) {
      document.getElementById('pub-list').innerHTML = '<div class="card">Publications will appear after the first Scholar sync.</div>';
      if (upd) upd.textContent = '';
      return;
    }
    pubs = data.publications;
    if (upd && data.metrics) upd.textContent = 'Updated: ' + (data.metrics.lastUpdated || '');

    years(pubs).forEach(y => {
      const opt = document.createElement('option');
      opt.value = y; opt.textContent = y;
      yearFilter.appendChild(opt);
    });

    search.addEventListener('input', apply);
    yearFilter.addEventListener('change', apply);
    sortBy.addEventListener('change', apply);

    apply();
  });
})();
