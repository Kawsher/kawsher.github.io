// build.js — renders JS-driven content into static HTML so pages work without JavaScript.
// Usage: node build.js
// Reads site-data.js, runs each page's inline script with a DOM stub, and injects
// the rendered HTML into the empty containers. The live JS then re-renders identically.

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const dataSrc = fs.readFileSync(path.join(dir, 'site-data.js'), 'utf8');
const SITE_DATA = new Function(dataSrc + '\nreturn SITE_DATA;')();

const pages = ['index.html', 'research.html', 'publications.html', 'teaching.html', 'lab.html', 'news.html', 'contact.html'];

function makeDocument(captured) {
  const els = {};
  function el(id) {
    if (!els[id]) {
      const store = { _html: null, _text: null, _href: null };
      els[id] = {
        set innerHTML(v) { store._html = v; },
        get innerHTML() { return store._html; },
        set textContent(v) { store._text = v; },
        get textContent() { return store._text; },
        set href(v) { store._href = v; },
        get href() { return store._href; },
        addEventListener() {},
        classList: { toggle() {}, add() {}, remove() {} },
        style: {},
        dataset: {},
        _store: store,
      };
    }
    return els[id];
  }
  return {
    getElementById: el,
    querySelectorAll: () => [],
    _els: els,
  };
}

function replaceInner(html, id, content) {
  const openRe = new RegExp('<([a-zA-Z0-9]+)((?:[^>"\']|"[^"]*"|\'[^\']*\')*\\bid="' + id + '"(?:[^>"\']|"[^"]*"|\'[^\']*\')*)>');
  const m = openRe.exec(html);
  if (!m) return null;
  const tag = m[1];
  const start = m.index + m[0].length;
  const tagRe = new RegExp('</?' + tag + '(?=[\\s>])', 'g');
  tagRe.lastIndex = start;
  let depth = 1, mm;
  while ((mm = tagRe.exec(html)) !== null) {
    if (mm[0][1] === '/') depth--; else depth++;
    if (depth === 0) {
      return html.slice(0, start) + content + html.slice(mm.index);
    }
  }
  return null;
}

for (const page of pages) {
  const file = path.join(dir, page);
  let html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  if (!scripts.length) { console.log(page, ': no inline script, skipped'); continue; }
  const code = scripts[scripts.length - 1];

  const document = makeDocument();
  const window = { addEventListener() {} };
  new Function('document', 'window', 'SITE_DATA', code)(document, window, SITE_DATA);

  let injected = 0, hrefs = 0;
  for (const [id, element] of Object.entries(document._els)) {
    const store = element._store;
    let content = store._html;
    if (content == null && store._text != null) {
      content = store._text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    if (content != null) {
      const next = replaceInner(html, id, content);
      if (next !== null) { html = next; injected++; }
      else console.log(page + ': WARNING container not found for #' + id);
    }
    if (store._href != null && store._href !== '#') {
      const re = new RegExp('(id="' + id + '"[^>]*?href=)"#"');
      if (re.test(html)) { html = html.replace(re, '$1"' + store._href + '"'); hrefs++; }
    }
  }
  fs.writeFileSync(file, html);
  console.log(page + ': injected ' + injected + ' containers, fixed ' + hrefs + ' hrefs');
}
console.log('done');
