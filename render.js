// ============================================================
// render.js
// Reads window.SITE_DATA (from site-data.js) and live Scholar
// data (from scholar-fetch.js via the "scholarLoaded" event)
// to build every section of the page.
// ============================================================

(function () {
  "use strict";

  const D = window.SITE_DATA;

  // ---- tiny helpers ----
  function el(id)    { return document.getElementById(id); }
  function esc(str)  { return String(str ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  // ---- NAV ----
  function renderNav() {
    const nameEl = el("nav-name-el");
    if (nameEl) nameEl.textContent = D.name;
  }

  // ---- HERO ----
  function renderHero() {
    el("hero-name").textContent = D.name;
    el("hero-meta").innerHTML =
      `<strong>${esc(D.title)}</strong><br>${esc(D.department)}<br>${esc(D.institution)}`;
    el("hero-bio").textContent   = D.bio;
    el("hero-avail").textContent = D.availability;
    el("hero-img").src           = D.photo;

    el("hero-ctas").innerHTML = `
      <a class="cta-btn primary" href="${D.links.cv}" target="_blank" rel="noopener">Download CV</a>
      <a class="cta-btn" href="${D.links.scholar}" target="_blank" rel="noopener">Google Scholar</a>
      <a class="cta-btn" href="#publications">Publications</a>
      <a class="cta-btn" href="#contact">Contact</a>
    `;

    const socialDefs = [
      { key: "scholar",      icon: "ti-brand-google",    label: "Scholar" },
      { key: "github",       icon: "ti-brand-github",    label: "GitHub" },
      { key: "linkedin",     icon: "ti-brand-linkedin",  label: "LinkedIn" },
      { key: "twitter",      icon: "ti-brand-twitter",   label: "Twitter/X" },
      { key: "facebook",     icon: "ti-brand-facebook",  label: "Facebook" },
      { key: "instagram",    icon: "ti-brand-instagram", label: "Instagram" },
      { key: "orcid",        icon: "ti-fingerprint",     label: "ORCID" },
      { key: "researchgate", icon: "ti-books",            label: "ResearchGate" }
    ];
    el("social-row").innerHTML = socialDefs
      .filter(s => D.links[s.key])
      .map(s => `<a class="social-link" href="${D.links[s.key]}" target="_blank" rel="noopener">
        <i class="ti ${s.icon}" aria-hidden="true"></i>${esc(s.label)}</a>`)
      .join("");
  }

  // ---- STATS (called again when Scholar data arrives) ----
  function renderStats(stats) {
    const data = stats || D.stats;
    const statsData = [
      { num: data.publications, label: "Publications" },
      { num: data.citations,    label: "Citations"    },
      { num: data.hIndex,       label: "h-index"      },
      { num: data.i10Index,     label: "i10-index"    }
    ];
    el("stat-strip").innerHTML = statsData
      .map(s => `<div class="stat-cell">
        <span class="stat-num">${s.num ?? "—"}</span>
        <span class="stat-label">${esc(s.label)}</span>
      </div>`)
      .join("");
  }

  // ---- NEWS ----
  function renderNews() {
    const tagClass = {
      paper: "paper", preprint: "preprint", award: "award",
      position: "position", milestone: "milestone", service: ""
    };
    el("news-list").innerHTML = D.news
      .map(n => `<div class="news-item">
        <span class="news-date">${esc(n.date)}</span>
        <span class="news-text">
          <span class="news-tag ${tagClass[n.tag] || ""}">${esc(n.tag)}</span>${esc(n.text)}
        </span>
      </div>`)
      .join("");
  }

  // ---- RESEARCH INTERESTS ----
  function renderInterests() {
    el("interests-grid").innerHTML = D.interests
      .map(r => `<div class="interest-cell">
        <div class="interest-icon"><i class="ti ${esc(r.icon)}" aria-hidden="true"></i></div>
        <div class="interest-label">${esc(r.label)}</div>
        <div class="interest-desc">${esc(r.desc)}</div>
      </div>`)
      .join("");
  }

  // ---- PUBLICATIONS ----
  let activeFilter = "all";
  let _pubs = D.publications; // updated when Scholar data arrives

  function renderPubs(filter) {
    const pubs = filter === "all" ? _pubs : _pubs.filter(p => p.type === filter);
    const badgeClass = { journal: "journal", conference: "conference", "under-review": "review", preprint: "preprint-badge" };
    const badgeLabel = { journal: "Journal", conference: "Conference", "under-review": "Under Review", preprint: "Preprint" };

    el("pub-list").innerHTML = pubs.length
      ? pubs.map(p => `<div class="pub-item">
          <div>
            <span class="pub-badge ${badgeClass[p.type] || ""}">${badgeLabel[p.type] || esc(p.type)}</span>
            <span class="pub-title">${p.link
              ? `<a href="${p.link}" target="_blank" rel="noopener">${esc(p.title)}</a>`
              : esc(p.title)}</span>
          </div>
          <div class="pub-authors">${esc(p.authors)}</div>
          <div class="pub-venue">${esc(p.venue)}${p.volume ? ", " + esc(p.volume) : ""}${p.pages ? ", " + esc(p.pages) : ""} · ${p.year ?? ""}${p.status ? " · " + esc(p.status) : ""}${(p.citations > 0) ? ` · <span class="pub-cited">Cited by ${p.citations}</span>` : ""}</div>
        </div>`).join("")
      : `<p style="color:var(--ink-faint);font-size:14px;padding:1rem 0;">No publications found for this filter.</p>`;
  }

  function renderPubFilter() {
    const pubTypes  = ["all", "journal", "conference", "under-review"];
    const pubLabels = { all: "All", journal: "Journals", conference: "Conferences", "under-review": "Under Review" };
    el("pub-filter").innerHTML = pubTypes
      .map(t => `<button class="filter-btn${t === activeFilter ? " active" : ""}" data-type="${t}">${pubLabels[t]}</button>`)
      .join("");

    el("pub-filter").addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeFilter = btn.dataset.type;
      document.querySelectorAll(".filter-btn").forEach(b =>
        b.classList.toggle("active", b.dataset.type === activeFilter));
      renderPubs(activeFilter);
    });

    renderPubs(activeFilter);
  }

  // ---- EXPERIENCE ----
  function renderExperience() {
    el("exp-list").innerHTML = D.experience.map(e => `<div class="timeline-item">
      <div class="timeline-period">${esc(e.period)}</div>
      <div>
        <div class="timeline-role">${esc(e.role)}</div>
        <div class="timeline-org">${esc(e.org)}</div>
        <div class="timeline-desc">${esc(e.desc)}</div>
      </div>
    </div>`).join("");
  }

  // ---- EDUCATION ----
  function renderEducation() {
    el("edu-list").innerHTML = D.education.map(e => `<div class="timeline-item">
      <div class="timeline-period">${esc(e.period)}</div>
      <div>
        <div class="timeline-role">${esc(e.degree)}</div>
        <div class="timeline-org">${esc(e.institution)}</div>
        <div class="timeline-gpa">GPA ${esc(e.gpa)}</div>
      </div>
    </div>`).join("");
  }

  // ---- AWARDS ----
  function renderAwards() {
    if (!el("awards-list") || !D.awards) return;
    el("awards-list").innerHTML = D.awards.map(a => `<div class="service-item">
      <div>
        <div class="service-role">${esc(a.title)}</div>
        <div class="service-org">${esc(a.org)}</div>
      </div>
      <div class="service-years">${esc(a.year)}</div>
    </div>`).join("");
  }

  // ---- LEADERSHIP ----
  function renderLeadership() {
    if (!el("leadership-list") || !D.leadership) return;
    el("leadership-list").innerHTML = D.leadership.map(l => `<div class="timeline-item">
      <div class="timeline-period">${esc(l.period)}</div>
      <div>
        <div class="timeline-role">${esc(l.role)}</div>
        <div class="timeline-org">${esc(l.org)}</div>
      </div>
    </div>`).join("");
  }

  // ---- SERVICE ----
  function renderService() {
    el("service-list").innerHTML = D.service.map(s => `<div class="service-item">
      <div>
        <div class="service-role">${esc(s.role)}</div>
        <div class="service-org">${esc(s.org)}</div>
      </div>
      <div class="service-years">${esc(s.years)}</div>
    </div>`).join("");
  }

  // ---- SKILLS ----
  function renderSkills() {
    el("skills-grid").innerHTML = D.skills.map(s => `<div class="skills-group">
      <div class="skills-cat">${esc(s.category)}</div>
      <div class="skill-tags">${s.items.map(i => `<span class="skill-tag">${esc(i)}</span>`).join("")}</div>
    </div>`).join("");
  }

  // ---- CONTACT ----
  function renderContact() {
    el("contact-grid").innerHTML = `
      <div>
        <div class="contact-field">
          <span class="contact-label">Email</span>
          <a href="mailto:${esc(D.email)}">${esc(D.email)}</a>
        </div>
        <div class="contact-field">
          <span class="contact-label">Phone</span>${esc(D.phone)}
        </div>
        <div class="contact-field">
          <span class="contact-label">Address</span>${esc(D.location)}
        </div>
        ${D.contactNote ? `<div class="contact-field" style="margin-top:1rem;font-style:italic;font-size:13px;">${esc(D.contactNote)}</div>` : ""}
      </div>
      <div>
        <div class="contact-field">
          <span class="contact-label">Google Scholar</span>
          <a href="${D.links.scholar}" target="_blank" rel="noopener">View profile</a>
        </div>
        <div class="contact-field">
          <span class="contact-label">ResearchGate</span>
          <a href="${D.links.researchgate}" target="_blank" rel="noopener">View profile</a>
        </div>
        <div class="contact-field">
          <span class="contact-label">ORCID</span>
          <a href="${D.links.orcid}" target="_blank" rel="noopener">0000-0002-4200-542X</a>
        </div>
        <div class="contact-field">
          <span class="contact-label">GitHub</span>
          <a href="${D.links.github}" target="_blank" rel="noopener">github.com/Kawsher</a>
        </div>
        <div class="contact-field">
          <span class="contact-label">LinkedIn</span>
          <a href="${D.links.linkedin}" target="_blank" rel="noopener">linkedin.com/in/kawsher-mahbub</a>
        </div>
      </div>
    `;
  }

  // ---- FOOTER ----
  function renderFooter() {
    el("footer-text").textContent = `© ${new Date().getFullYear()} ${D.name}`;
  }

  // ---- Bootstrap (runs immediately on DOMContentLoaded) ----
  function init() {
    renderNav();
    renderHero();
    renderStats();      // render with static fallback first (shows numbers instantly)
    renderNews();
    renderInterests();
    renderPubFilter();  // renders filter buttons + pubs from static data
    renderExperience();
    renderEducation();
    renderAwards();
    renderLeadership();
    renderService();
    renderSkills();
    renderContact();
    renderFooter();
  }

  // ---- When Scholar data arrives, update stats + pubs ----
  window.addEventListener("scholarLoaded", function (e) {
    const { stats, publications } = e.detail;
    if (stats)        renderStats(stats);
    if (publications && publications.length) {
      _pubs = publications;
      renderPubs(activeFilter);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
