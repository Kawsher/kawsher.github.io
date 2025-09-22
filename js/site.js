
// footer year
(function(){ const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear(); })();
// header opacity on scroll
(function(){ const h=document.querySelector('header.site-header'); if(!h) return; function s(){ if(window.scrollY>10) h.classList.add('scrolled'); else h.classList.remove('scrolled'); } s(); window.addEventListener('scroll', s, {passive:true}); })();
// scholar helpers
async function fetchScholar(){ try{ const r=await fetch('data/scholar.json',{cache:'no-cache'}); if(!r.ok) throw 0; return await r.json(); }catch{return null;} }
function animateCount(el,to){ if(!el) return; const d=1200,s=0,t0=performance.now(); function t(ti){ const p=Math.min(1,(ti-t0)/d),e=1-Math.pow(1-p,3); el.textContent=Math.floor(s+(to-s)*e).toLocaleString(); if(p<1) requestAnimationFrame(t);} requestAnimationFrame(t); }
// attach on home
(async function(){ const data=await fetchScholar(); const c=document.getElementById('kpi-citations'), h=document.getElementById('kpi-hindex'), i=document.getElementById('kpi-i10'), p=document.getElementById('kpi-pubs'); const upd=document.getElementById('metrics-updated');
  if(data && (data.metrics || data.publications)){ if(c) animateCount(c, data.metrics? (data.metrics.citations||0) : 0); if(h) animateCount(h, data.metrics? (data.metrics.hindex||0) : 0); if(i) animateCount(i, data.metrics? (data.metrics.i10||0) : 0); if(p) animateCount(p, Array.isArray(data.publications)? data.publications.length : 0); if(upd) upd.textContent='Updated: '+((data.metrics&&data.metrics.lastUpdated)||''); } else { if(upd) upd.textContent='Scholar data will appear after the first sync.'; }
  const fp=document.getElementById('featured-pubs'); if(fp && data && Array.isArray(data.publications)){ const pubs=[...data.publications].sort((a,b)=>(b.year||0)-(a.year||0)).slice(0,3); fp.innerHTML=pubs.map(p=>`<div class='pub-item'><div class='pub-title'>${p.title||'Untitled'}</div><div class='pub-meta'>${p.authors||''} · ${p.venue||''} · ${p.year||''}</div><div class='pub-actions'>${p.link?`<a class='btn' href='${p.link}' target='_blank' rel='noopener'>Publisher</a>`:''}${typeof p.citedBy==='number'?`<span class='badge'>Cited by ${p.citedBy}</span>`:''}</div></div>`).join(''); } })();
