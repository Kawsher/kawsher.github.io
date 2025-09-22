
// footer year
(function(){ const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear(); })();

// header opacity on scroll
(function(){
  const header = document.querySelector('header.site-header');
  if(!header) return;
  function onScroll(){ if(window.scrollY>10) header.classList.add('scrolled'); else header.classList.remove('scrolled'); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
})();

// fetch scholar metrics + featured pubs on home
async function fetchScholar(){
  try{ const r=await fetch('data/scholar.json',{cache:'no-cache'}); if(!r.ok) throw 0; return await r.json(); }catch{return null;}
}
function animateCount(el,to){ if(!el) return;
  const d=1200, s=0, t0=performance.now();
  function tick(t){ const p=Math.min(1,(t-t0)/d), e=1-Math.pow(1-p,3);
    el.textContent=Math.floor(s+(to-s)*e).toLocaleString(); if(p<1) requestAnimationFrame(tick); }
  requestAnimationFrame(tick);
}
(async function initHome(){
  const data = await fetchScholar();
  const c=document.getElementById('kpi-citations'), h=document.getElementById('kpi-hindex'), i=document.getElementById('kpi-i10');
  const upd=document.getElementById('metrics-updated');
  if(data && data.metrics){
    animateCount(c, data.metrics.citations||0);
    animateCount(h, data.metrics.hindex||0);
    animateCount(i, data.metrics.i10||0);
    if(upd) upd.textContent='Updated: '+(data.metrics.lastUpdated||'');
  }else{
    if(upd) upd.textContent='Scholar data will appear after the first sync.';
  }
  const fp=document.getElementById('featured-pubs');
  if(fp && data && Array.isArray(data.publications)){
    const pubs=[...data.publications].sort((a,b)=>(b.year||0)-(a.year||0)).slice(0,3);
    fp.innerHTML=pubs.map(p=>`
      <div class="pub-item">
        <div class="pub-title">${p.title||'Untitled'}</div>
        <div class="pub-meta">${p.authors||''} · ${p.venue||''} · ${p.year||''}</div>
        <div class="pub-actions">
          ${p.link?`<a class="btn" href="${p.link}" target="_blank" rel="noopener">Publisher</a>`:''}
          ${typeof p.citedBy==='number'?`<span class="badge">Cited by ${p.citedBy}</span>`:''}
        </div>
      </div>
    `).join('');
  }
})();
