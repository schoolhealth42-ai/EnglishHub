'use strict';
/* =========================================================
   English Hub — podcasts, channels, radio & conversation
   ========================================================= */
const NATIVE = typeof window.Android !== 'undefined';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const pad = n => String(n).padStart(2, '0');
const dkey = (d = new Date()) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const fmtTime = s => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ':' + pad(m) : m) + ':' + pad(x); };
const fmtDate = d => { const t = new Date(d); return isNaN(t) ? '' : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
const rand = a => a[Math.floor(Math.random() * a.length)];
const dayIndex = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);

const P_ = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  pod: '<circle cx="12" cy="11" r="3"/><path d="M8.5 16.5a6 6 0 1 1 7 0M6 19.5a9.5 9.5 0 1 1 12 0"/><path d="M12 14v8"/>',
  tv: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  gear: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  play: '<path d="M7 4l13 8-13 8z" fill="currentColor"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>',
  back: '<path d="M9 18l6-6-6-6"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  speaker: '<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  ext: '<path d="M14 3h7v7M10 14L21 3M21 14v7H3V3h7"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
  rew: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  fwd: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
  radio: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>',
  shadow: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  swap: '<path d="M7 16V4M3 8l4-4 4 4M17 8v12M21 16l-4 4-4-4"/>'
};
const ic = n => `<svg viewBox="0 0 24 24">${P_[n] || ''}</svg>`;

/* ---------------- State ---------------- */
const DEF_SET = {
  theme: 'auto', accent: '#6366f1', fontScale: 1, showAr: true,
  level: 'all', goal: 15,
  ttsAccent: 'en-US', ttsRate: 0.9, ttsPitch: 1, srLang: 'en-US',
  speed: 1, skip: 15, autoNext: true, bgPlay: true, keepScreen: false, subtitles: true, dataSaver: false,
  reminder: false, remTime: '20:00'
};
let S = loadState();
function loadState() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem('eh') || '{}') || {}; } catch (e) { s = {}; }
  const base = { set: {}, pods: [], chans: [], radios: [], hidden: {}, favs: {}, pos: {}, done: {}, stats: {}, words: [], spoken: 0, recent: [], cache: {} };
  s = Object.assign(base, s);
  s.set = Object.assign({}, DEF_SET, s.set);
  s.cache = Object.assign({ feeds: {}, art: {}, ytid: {}, radio: {}, titles: {} }, s.cache);
  return s;
}
let saveTimer;
function save(now) {
  clearTimeout(saveTimer);
  const doSave = () => {
    try { localStorage.setItem('eh', JSON.stringify(S)); }
    catch (e) { // storage full: trim positions
      const k = Object.keys(S.pos); k.slice(0, Math.floor(k.length / 2)).forEach(x => delete S.pos[x]);
      try { localStorage.setItem('eh', JSON.stringify(S)); } catch (e2) { }
    }
  };
  if (now) doSave(); else saveTimer = setTimeout(doSave, 400);
}

/* ---------------- Native bridge ---------------- */
let seq = 0;
const waits = {};
window.__nf = (id, status, body) => {
  const w = waits[id]; if (!w) return; delete waits[id];
  if (status >= 200 && status < 400) w.res(body); else w.rej(new Error('HTTP ' + status));
};
function getText(url, max = 3000000, timeout = 30000) {
  if (NATIVE) {
    return new Promise((res, rej) => {
      const id = 'f' + (++seq);
      waits[id] = { res, rej };
      Android.fetch(id, url, max);
      setTimeout(() => { if (waits[id]) { delete waits[id]; rej(new Error('timeout')); } }, timeout);
    });
  }
  return fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); });
}
const getJSON = (url, max) => getText(url, max).then(t => JSON.parse(t));

const ttsWaits = {};
window.__ttsDone = id => { const f = ttsWaits[id]; if (f) { delete ttsWaits[id]; f(); } };
function speak(text, opt = {}) {
  const s = S.set;
  const rate = opt.rate || s.ttsRate, pitch = opt.pitch || s.ttsPitch;
  return new Promise(res => {
    const id = 't' + (++seq);
    const guard = setTimeout(() => { delete ttsWaits[id]; res(); }, 4000 + text.length * 110 / rate);
    ttsWaits[id] = () => { clearTimeout(guard); res(); };
    if (NATIVE) { Android.speak(text, s.ttsAccent, rate, pitch, id); return; }
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = s.ttsAccent; u.rate = rate; u.pitch = pitch;
      u.onend = u.onerror = () => window.__ttsDone(id);
      speechSynthesis.speak(u);
    } else window.__ttsDone(id);
  });
}
function stopSpeak() { if (NATIVE) Android.stopSpeak(); else if ('speechSynthesis' in window) speechSynthesis.cancel(); }

const srWaits = {};
window.__sr = (id, ok, text, alts) => { const f = srWaits[id]; if (f) { delete srWaits[id]; f({ ok, text, alts: alts || [] }); } };
function listen() {
  const lang = S.set.srLang;
  return new Promise(res => {
    const id = 's' + (++seq);
    srWaits[id] = res;
    if (NATIVE) { Android.listen(id, lang); return; }
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (R) {
      const r = new R(); r.lang = lang; r.maxAlternatives = 5;
      r.onresult = e => { const a = Array.from(e.results[0]).map(x => x.transcript); window.__sr(id, true, a[0], a); };
      r.onerror = () => window.__sr(id, false, '', []);
      r.start();
    } else {
      const t = prompt('وضع المعاينة: اكتب الجملة التي نطقتها');
      window.__sr(id, !!t, t || '', t ? [t] : []);
    }
  });
}
function openUrl(u) { if (NATIVE) Android.openExternal(u); else window.open(u, '_blank'); }
function copyText(t) { if (NATIVE) Android.copy(t); else { navigator.clipboard?.writeText(t); toast('تم النسخ'); } }
function shareText(t) { if (NATIVE) Android.share(t); else copyText(t); }
let toastT;
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400); }

/* ---------------- Theme ---------------- */
const ACCENTS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];
const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null;
function curTheme() { const t = S.set.theme; return t === 'auto' ? (mq && mq.matches ? 'light' : 'dark') : t; }
function applyTheme() {
  const r = document.documentElement;
  r.dataset.theme = curTheme();
  r.style.setProperty('--accent', S.set.accent);
  r.style.fontSize = (16 * S.set.fontScale) + 'px';
  document.body.classList.toggle('saver', S.set.dataSaver);
  $('#btnTheme').innerHTML = ic(curTheme() === 'dark' ? 'sun' : 'moon');
  if (NATIVE) { const bg = getComputedStyle(r).getPropertyValue('--bg').trim(); Android.setBars(bg || '#0f172a'); }
}
if (mq && mq.addEventListener) mq.addEventListener('change', () => S.set.theme === 'auto' && applyTheme());

/* ---------------- Navigation ---------------- */
const TABS = [['home', 'الرئيسية', 'home'], ['pods', 'بودكاست', 'pod'], ['chans', 'قنوات', 'tv'], ['talk', 'محادثة', 'chat'], ['more', 'الإعدادات', 'gear']];
let tab = 'home';
function go(t) {
  tab = t;
  $('#nav').innerHTML = TABS.map(([k, l, i]) => `<button data-tab="${k}" class="${k === t ? 'on' : ''}">${ic(i)}<span>${l}</span></button>`).join('');
  const v = $('#view'); v.onclick = null; v.innerHTML = ''; v.scrollTop = 0;
  ({ home: renderHome, pods: renderPods, chans: renderChans, talk: renderTalk, more: renderMore })[t](v);
}
const stack = [];
function openPage(title, build, opts = {}) {
  const el = document.createElement('div');
  el.className = 'page';
  el.innerHTML = `<header><button class="icon-btn" data-back>${ic('back')}</button><h2>${esc(title)}</h2><div class="row hact"></div></header><div class="pbody"></div>`;
  $('#pages').appendChild(el);
  const p = { el, body: $('.pbody', el), head: $('.hact', el), titleEl: $('h2', el), onClose: opts.onClose, alive: true };
  stack.push(p);
  $('[data-back]', el).onclick = () => closePage();
  build(p.body, p);
  return p;
}
function closePage() {
  const p = stack.pop(); if (!p) return;
  p.alive = false;
  try { p.onClose && p.onClose(); } catch (e) { }
  p.el.remove();
}
window.__back = () => {
  if (stack.length) { closePage(); return true; }
  if (tab !== 'home') { go('home'); return true; }
  return false;
};
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tab]'); if (t) { while (stack.length) closePage(); go(t.dataset.tab); return; }
  const x = e.target.closest('[data-ext]'); if (x) { e.preventDefault(); openUrl(x.dataset.ext); return; }
  const s = e.target.closest('[data-say]'); if (s) { e.stopPropagation(); speak(s.dataset.say); }
});

/* ---------------- Stats ---------------- */
function addSecs(n) { const k = dkey(); S.stats[k] = (S.stats[k] || 0) + n; save(); }
const minsToday = () => Math.floor((S.stats[dkey()] || 0) / 60);
function streak() {
  let n = 0; const d = new Date();
  if ((S.stats[dkey(d)] || 0) < 60) d.setDate(d.getDate() - 1);
  while ((S.stats[dkey(d)] || 0) >= 60) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
const totalMins = () => Math.floor(Object.values(S.stats).reduce((a, b) => a + b, 0) / 60);

/* ---------------- Text helpers ---------------- */
const decEl = document.createElement('textarea');
function decode(s) { decEl.innerHTML = s; return decEl.value; }
function stripCdata(s) { return (s || '').replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1'); }
function htmlToText(h) {
  h = (h || '').replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|h\d)>/gi, '\n').replace(/<li>/gi, '• ').replace(/<[^>]+>/g, '');
  return decode(h).replace(/\n{3,}/g, '\n\n').trim();
}
function linkify(t) { return esc(t).replace(/https?:\/\/[^\s<]+[^\s<.,;:)'"!?]/g, u => `<a href="#" data-ext="${u}">${u}</a>`); }
function tag(b, name) {
  const m = b.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + name + '>', 'i'));
  return m ? stripCdata(m[1]).trim() : '';
}
function attr(b, name, at) {
  const m = b.match(new RegExp('<' + name + '\\b[^>]*\\b' + at + '="([^"]+)"', 'i'));
  return m ? decode(m[1]) : '';
}
function parseDur(d) {
  if (!d) return 0; if (/^\d+$/.test(d)) return +d;
  return d.split(':').reduce((a, b) => a * 60 + (+b || 0), 0);
}
function img(src, cls, fallback) {
  if (!src || S.set.dataSaver) return `<div class="${cls}">${fallback}</div>`;
  return `<img class="${cls}" src="${esc(src)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<div class=&quot;${cls}&quot;>${fallback}</div>'">`;
}
const levelBadge = l => l ? `<span class="badge ${l}">${DATA.levels[l] || l}</span>` : '';
const spinner = () => '<div class="spinner"></div>';

/* =========================================================
   PODCASTS
   ========================================================= */
const feedMem = {};
const allPods = (incHidden) => DATA.podcasts.concat(S.pods).filter(p => incHidden || !S.hidden[p.id]);

async function resolveFeed(p) {
  if (p.feed) return p.feed;
  if (S.cache.feeds[p.id]) return S.cache.feeds[p.id];
  let r;
  if (p.itunes) {
    try { const j = await getJSON(`https://itunes.apple.com/lookup?id=${p.itunes}&entity=podcast`); r = j.results && j.results[0]; } catch (e) { }
  }
  if ((!r || !r.feedUrl) && p.term) {
    const j = await getJSON(`https://itunes.apple.com/search?media=podcast&entity=podcast&limit=3&term=${encodeURIComponent(p.term)}`);
    r = (j.results || []).find(x => x.feedUrl);
  }
  if (!r || !r.feedUrl) throw new Error('no feed');
  S.cache.feeds[p.id] = r.feedUrl;
  if (r.artworkUrl600 && !S.cache.art[p.id]) S.cache.art[p.id] = r.artworkUrl600;
  save();
  return r.feedUrl;
}

function parseFeed(xml) {
  const head = xml.split(/<item[\s>]/i)[0];
  const art = attr(head, 'itunes:image', 'href') || tag(tag(head, 'image'), 'url');
  const title = decode(tag(head, 'title'));
  const eps = [];
  const re = /<item[\s>][\s\S]*?<\/item>/gi;
  let m;
  while ((m = re.exec(xml)) && eps.length < 150) {
    const b = m[0];
    const url = attr(b, 'enclosure', 'url');
    if (!url) continue;
    const desc = tag(b, 'description') || tag(b, 'itunes:summary') || tag(b, 'content:encoded');
    eps.push({
      url, title: decode(tag(b, 'title')) || 'Episode', date: tag(b, 'pubDate'),
      dur: parseDur(tag(b, 'itunes:duration')), desc: htmlToText(desc), img: attr(b, 'itunes:image', 'href'),
      link: tag(b, 'link')
    });
  }
  return { art, title, eps };
}

async function loadFeed(p, force) {
  const mem = feedMem[p.id];
  if (!force && mem && Date.now() - mem.t < 20 * 60000) return mem;
  const url = await resolveFeed(p);
  const xml = await getText(url, 2500000);
  const f = parseFeed(xml);
  if (!f.eps.length && p.feed == null) { delete S.cache.feeds[p.id]; }
  f.t = Date.now();
  feedMem[p.id] = f;
  if (f.art && !S.cache.art[p.id]) { S.cache.art[p.id] = f.art; save(); }
  return f;
}

// fetch cover art lazily (small requests only)
const artQ = []; let artBusy = 0;
function ensureArt(p) {
  if (S.cache.art[p.id] || S.set.dataSaver || artQ.includes(p)) return;
  artQ.push(p); pumpArt();
}
async function pumpArt() {
  while (artBusy < 2 && artQ.length) {
    const p = artQ.shift(); artBusy++;
    (async () => {
      try {
        if (p.feed && !p.itunes) {
          const head = await getText(p.feed, 60000);
          const a = attr(head, 'itunes:image', 'href') || tag(tag(head, 'image'), 'url');
          if (a) S.cache.art[p.id] = a;
        } else await resolveFeed(p);
        save();
        const el = document.querySelector(`[data-art="${p.id}"]`);
        if (el && S.cache.art[p.id]) el.outerHTML = img(S.cache.art[p.id], 'cover', '🎙️');
      } catch (e) { }
      artBusy--; pumpArt();
    })();
  }
}

let podLevel = null;
function levelChips(cur, onPick) {
  const lv = [['all', 'الكل'], ['beginner', 'مبتدئ'], ['intermediate', 'متوسط'], ['advanced', 'متقدم'], ['fav', '★ المفضلة']];
  const d = document.createElement('div'); d.className = 'chips';
  d.innerHTML = lv.map(([k, l]) => `<button class="chip ${k === cur ? 'on' : ''}" data-lv="${k}">${l}</button>`).join('');
  d.onclick = e => { const b = e.target.closest('[data-lv]'); if (b) onPick(b.dataset.lv); };
  return d;
}
function renderPods(v) {
  if (podLevel == null) podLevel = S.set.level;
  v.innerHTML = `<div class="section"><h2>بودكاست تعلّم الإنجليزية</h2><button class="more" id="addPod">+ إضافة</button></div>`;
  v.appendChild(levelChips(podLevel, lv => { podLevel = lv; go('pods'); }));
  const list = allPods().filter(p => podLevel === 'all' || (podLevel === 'fav' ? S.favs[p.id] : p.level === podLevel));
  const g = document.createElement('div'); g.className = 'grid';
  g.innerHTML = list.map(p => `
    <button class="mcard" data-pod="${esc(p.id)}">
      ${S.cache.art[p.id] ? img(S.cache.art[p.id], 'cover', '🎙️') : `<div class="cover" data-art="${esc(p.id)}">🎙️</div>`}
      <div class="body"><div class="n en">${esc(p.name)}</div><div class="b en">${esc(p.by || '')}</div>
      ${levelBadge(p.level)} ${p.accent ? `<span class="badge">${esc(p.accent)}</span>` : ''} ${S.favs[p.id] ? '<span class="badge">★</span>' : ''}</div>
    </button>`).join('') || '';
  v.appendChild(g);
  if (!list.length) v.insertAdjacentHTML('beforeend', `<div class="empty">لا توجد عناصر هنا بعد.</div>`);
  g.onclick = e => { const b = e.target.closest('[data-pod]'); if (b) openPodcast(allPods(true).find(p => p.id === b.dataset.pod)); };
  $('#addPod').onclick = () => managePods();
  list.forEach(ensureArt);
}

function episodeItem(ep, i) {
  const pos = S.pos[ep.url], done = S.done[ep.url];
  const pct = pos && ep.dur ? Math.min(100, pos.t / ep.dur * 100) : (pos && pos.d ? Math.min(100, pos.t / pos.d * 100) : 0);
  const playing = P.cur && P.cur.url === ep.url && !A.paused;
  return `<button class="item ${done ? 'done' : ''}" data-ep="${i}">
    <div class="info"><div class="t en">${esc(ep.title)}</div>
    <div class="s">${fmtDate(ep.date)}${ep.dur ? ' • ' + fmtTime(ep.dur) : ''}${done ? ' • ✓ تم الاستماع' : ''}</div>
    ${pct > 1 && !done ? `<div class="prog"><i style="width:${pct}%"></i></div>` : ''}</div>
    <span class="act">${ic(playing ? 'pause' : 'play')}</span></button>`;
}

function openPodcast(p) {
  openPage(p.name, async (body, pg) => {
    pg.head.innerHTML = `<button class="icon-btn" id="pfav">${ic('heart')}</button><button class="icon-btn" id="pref">${ic('refresh')}</button>`;
    const favBtn = $('#pfav', pg.el);
    const paintFav = () => { favBtn.style.color = S.favs[p.id] ? 'var(--bad)' : ''; $('svg', favBtn).style.fill = S.favs[p.id] ? 'currentColor' : 'none'; };
    paintFav();
    favBtn.onclick = () => { S.favs[p.id] = !S.favs[p.id]; if (!S.favs[p.id]) delete S.favs[p.id]; save(); paintFav(); toast(S.favs[p.id] ? 'أضيف للمفضلة' : 'أزيل من المفضلة'); };
    const load = async force => {
      body.innerHTML = `<div class="card row" style="margin-bottom:12px">${img(S.cache.art[p.id], 'thumb', '🎙️')}
        <div class="info" style="flex:1"><b class="en">${esc(p.name)}</b><div class="small muted">${esc(p.desc || '')}</div>
        <div style="margin-top:6px">${levelBadge(p.level)} ${p.accent ? `<span class="badge">${esc(p.accent)}</span>` : ''}</div></div></div>
        <div class="row" style="justify-content:space-between;margin-bottom:8px"><b>الحلقات</b>
        <div class="seg" id="order"><button data-o="new" class="on">الأحدث</button><button data-o="old">الأقدم</button><button data-o="new2">غير المسموعة</button></div></div>
        <div id="eps">${spinner()}</div>`;
      $('.thumb', body).style.cssText = 'width:72px;height:72px';
      try {
        const f = await loadFeed(p, force);
        if (!pg.alive) return;
        let order = 'new';
        const draw = () => {
          let eps = f.eps.map((e, i) => [e, i]);
          if (order === 'old') eps.reverse();
          if (order === 'new2') eps = eps.filter(([e]) => !S.done[e.url]);
          $('#eps', body).innerHTML = eps.length ? `<div class="list">${eps.map(([e, i]) => episodeItem(e, i)).join('')}</div>` : '<div class="empty">لا توجد حلقات.</div>';
        };
        draw();
        $('#order', body).onclick = e => { const b = e.target.closest('[data-o]'); if (!b) return; order = b.dataset.o; $$('#order button', body).forEach(x => x.classList.toggle('on', x === b)); draw(); };
        $('#eps', body).onclick = e => {
          const b = e.target.closest('[data-ep]'); if (!b) return;
          const i = +b.dataset.ep, ep = f.eps[i];
          if (P.cur && P.cur.url === ep.url) { if (e.target.closest('.act')) togglePlay(); else openPlayer(); return; }
          const q = f.eps.map(x => ({ ...x, podId: p.id, podName: p.name, img: x.img || f.art || S.cache.art[p.id] }));
          playItem(q[i], q, i);
          setTimeout(draw, 300);
          if (!e.target.closest('.act')) openPlayer();
        };
        pg.refresh = draw;
      } catch (err) {
        $('#eps', body).innerHTML = `<div class="empty">تعذّر تحميل الحلقات. تحقق من الاتصال.<br><br><button class="btn sm" id="retry">إعادة المحاولة</button></div>`;
        $('#retry', body).onclick = () => { delete S.cache.feeds[p.id]; load(true); };
      }
    };
    $('#pref', pg.el).onclick = () => load(true);
    load(false);
  });
}

/* =========================================================
   AUDIO PLAYER
   ========================================================= */
const A = new Audio();
A.preload = 'metadata';
const P = { cur: null, queue: [], idx: 0, a: null, b: null, sleepAt: 0, sleepEnd: false, shadow: 0, shAcc: 0, shPaused: false, lastT: 0, lastSave: 0, page: null };
const SPEEDS = [0.5, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];

function playItem(item, queue, idx) {
  P.cur = item; P.queue = queue || [item]; P.idx = idx || 0; P.a = P.b = null; P.shAcc = 0; P.shPaused = false;
  A.src = item.url;
  A.playbackRate = item.live ? 1 : S.set.speed;
  const pos = S.pos[item.url];
  if (!item.live && pos && pos.t > 5 && !S.done[item.url]) {
    A.addEventListener('loadedmetadata', function f() { A.removeEventListener('loadedmetadata', f); try { A.currentTime = pos.t; } catch (e) { } });
  }
  A.play().catch(() => toast('تعذّر التشغيل — جرّب مرة أخرى'));
  S.recent = [{ ...item, desc: (item.desc || '').slice(0, 400) }].concat(S.recent.filter(r => r.url !== item.url)).slice(0, 8);
  save();
  paintMini();
}
function togglePlay() { if (!P.cur) return; if (A.paused) { P.shPaused = false; A.play().catch(() => { }); } else A.pause(); }
function stopPlayer() {
  A.pause(); A.removeAttribute('src'); A.load(); P.cur = null;
  if (NATIVE) Android.mediaStop();
  paintMini();
}
window.__mediaCmd = c => { if (c === 'toggle') togglePlay(); else if (c === 'pause') A.pause(); };

function notifyNative() {
  if (!NATIVE || !P.cur) return;
  Android.media(!A.paused, P.cur.title || '', P.cur.podName || P.cur.sub || '', !!S.set.bgPlay);
  Android.keepScreenOn(!A.paused && S.set.keepScreen);
}
A.addEventListener('play', () => { P.lastT = A.currentTime; notifyNative(); paintMini(); paintPlayer(); refreshOpenLists(); });
A.addEventListener('pause', () => { notifyNative(); paintMini(); paintPlayer(); savePos(); refreshOpenLists(); });
A.addEventListener('error', () => { if (P.cur) toast('تعذّر تشغيل الملف الصوتي'); });
A.addEventListener('ended', () => {
  if (!P.cur) return;
  S.done[P.cur.url] = 1; delete S.pos[P.cur.url]; save();
  if (P.sleepEnd) { P.sleepEnd = false; toast('مؤقت النوم: تم الإيقاف'); paintMini(); return; }
  if (S.set.autoNext && !P.cur.live) {
    // queue is newest-first, so "next" = older episode is idx+1; prefer the next unplayed one
    for (let i = P.idx + 1; i < P.queue.length; i++) if (!S.done[P.queue[i].url]) { playItem(P.queue[i], P.queue, i); return; }
  }
  paintMini(); paintPlayer();
});
A.addEventListener('timeupdate', () => {
  if (!P.cur) return;
  const t = A.currentTime, d = t - P.lastT; P.lastT = t;
  if (!A.paused && d > 0 && d < 2.5) {
    P._acc = (P._acc || 0) + d / (A.playbackRate || 1);
    if (P._acc >= 5) { addSecs(Math.round(P._acc)); P._acc = 0; }
    // A-B loop
    if (P.a != null && P.b != null && t >= P.b) { A.currentTime = P.a; P.lastT = P.a; }
    // shadowing pauses
    if (P.shadow && !P.cur.live) {
      P.shAcc += d;
      if (P.shAcc >= P.shadow) {
        P.shAcc = 0; P.shPaused = true; A.pause();
        setTimeout(() => { if (P.shPaused && P.cur) { P.shPaused = false; A.play().catch(() => { }); } }, P.shadow * 1100 / (A.playbackRate || 1));
      }
    }
  }
  if (P.sleepAt && Date.now() >= P.sleepAt) { P.sleepAt = 0; A.pause(); toast('مؤقت النوم: تم الإيقاف'); }
  if (Date.now() - P.lastSave > 5000) savePos();
  const bar = $('#mini .bar'); if (bar && A.duration && isFinite(A.duration)) bar.style.width = (t / A.duration * 100) + '%';
  paintPlayer(true);
});
function savePos() {
  P.lastSave = Date.now();
  if (!P.cur || P.cur.live || !A.currentTime) return;
  const d = isFinite(A.duration) ? A.duration : 0;
  if (d && A.currentTime > d * 0.95) { S.done[P.cur.url] = 1; delete S.pos[P.cur.url]; }
  else S.pos[P.cur.url] = { t: Math.floor(A.currentTime), d: Math.floor(d) };
  save();
}
function refreshOpenLists() { stack.forEach(p => p.refresh && p.refresh()); }

function paintMini() {
  const m = $('#mini');
  if (!P.cur) { m.classList.add('hidden'); document.body.classList.remove('has-mini'); return; }
  m.classList.remove('hidden'); document.body.classList.add('has-mini');
  m.innerHTML = `${img(P.cur.img, 'art', P.cur.live ? '📻' : '🎙️')}
    <div class="meta" id="miniOpen"><div class="t en">${P.cur.live ? '<span class="live-dot"></span>' : ''}${esc(P.cur.title)}</div><div class="s en">${esc(P.cur.podName || P.cur.sub || '')}</div></div>
    <button class="play-btn" id="miniPlay">${ic(A.paused ? 'play' : 'pause')}</button>
    <button class="icon-btn" id="miniClose" style="background:none">${ic('close')}</button><div class="bar"></div>`;
  $('#miniOpen').onclick = openPlayer;
  $('#miniPlay').onclick = togglePlay;
  $('#miniClose').onclick = stopPlayer;
}

function openPlayer() {
  if (!P.cur) return;
  if (P.page && P.page.alive) return;
  P.page = openPage('يعمل الآن', (body, pg) => {
    const c = P.cur;
    pg.head.innerHTML = `<button class="icon-btn" id="pshare">${ic('share')}</button>`;
    $('#pshare', pg.el).onclick = () => shareText(`${c.title}\n${c.podName || ''}\n${c.link || c.url}`);
    body.innerHTML = `<div class="player">
      ${img(c.img, 'big-art', c.live ? '📻' : '🎙️')}
      <div class="pt en">${c.live ? '<span class="live-dot"></span>' : ''}${esc(c.title)}</div>
      <div class="muted small en">${esc(c.podName || c.sub || '')}</div>
      ${c.live ? '<div class="badge" style="color:var(--bad)">بث مباشر</div>' : `
      <div class="seek"><input type="range" id="pseek" min="0" max="100" step="1" value="0"><div class="times"><span id="pcur">0:00</span><span id="pdur">0:00</span></div></div>`}
      <div class="ctrls">
        ${c.live ? '' : `<button class="sk" id="prew">${ic('rew')}<small>${S.set.skip}</small></button>`}
        <button class="play-btn" id="pplay">${ic(A.paused ? 'play' : 'pause')}</button>
        ${c.live ? '' : `<button class="sk" id="pfwd">${ic('fwd')}<small>${S.set.skip}</small></button>`}
      </div>
      <div class="tools">
        ${c.live ? '' : `<button class="tool" id="tspeed">${ic('clock')} <span>السرعة ${A.playbackRate}x</span></button>
        <button class="tool" id="tab">${ic('repeat')} <span>تكرار A-B</span></button>
        <button class="tool" id="tshadow">${ic('shadow')} <span>وضع الظل</span></button>`}
        <button class="tool" id="tsleep">${ic('moon')} <span>مؤقت النوم</span></button>
        ${c.live ? '' : `<button class="tool" id="tdone">${ic('check')} <span>${S.done[c.url] ? 'مسموعة' : 'تعليم كمسموعة'}</span></button>`}
      </div>
      <div id="phelp" class="small muted"></div>
      ${c.desc ? `<div class="desc">${linkify(c.desc)}</div>` : ''}
      ${c.link ? `<button class="btn ghost sm" data-ext="${esc(c.link)}">${ic('ext')} صفحة الحلقة (النص الكامل)</button>` : ''}
    </div>`;
    $('#pplay', body).onclick = togglePlay;
    if (!c.live) {
      const seek = $('#pseek', body);
      let dragging = false;
      seek.addEventListener('input', () => { dragging = true; $('#pcur', body).textContent = fmtTime(seek.value); });
      seek.addEventListener('change', () => { A.currentTime = +seek.value; P.lastT = A.currentTime; dragging = false; });
      pg.isDragging = () => dragging;
      $('#prew', body).onclick = () => { A.currentTime = Math.max(0, A.currentTime - S.set.skip); P.lastT = A.currentTime; };
      $('#pfwd', body).onclick = () => { A.currentTime = Math.min(A.duration || 1e9, A.currentTime + S.set.skip); P.lastT = A.currentTime; };
      $('#tspeed', body).onclick = e => {
        const i = SPEEDS.indexOf(A.playbackRate); const n = SPEEDS[(i + 1) % SPEEDS.length];
        A.playbackRate = n; e.currentTarget.querySelector('span').textContent = `السرعة ${n}x`;
      };
      $('#tab', body).onclick = e => {
        const b = e.currentTarget, h = $('#phelp', body);
        if (P.a == null) { P.a = A.currentTime; b.classList.add('on'); b.querySelector('span').textContent = 'حدد B'; h.textContent = 'تم تحديد البداية A عند ' + fmtTime(P.a) + ' — اضغط مرة أخرى لتحديد النهاية B'; }
        else if (P.b == null) { P.b = Math.max(A.currentTime, P.a + 1); b.querySelector('span').textContent = 'إلغاء التكرار'; h.textContent = `يتكرر المقطع ${fmtTime(P.a)} ← ${fmtTime(P.b)}`; A.currentTime = P.a; }
        else { P.a = P.b = null; b.classList.remove('on'); b.querySelector('span').textContent = 'تكرار A-B'; h.textContent = ''; }
      };
      $('#tshadow', body).onclick = e => {
        const opts = [0, 5, 8, 12]; const i = opts.indexOf(P.shadow); P.shadow = opts[(i + 1) % opts.length]; P.shAcc = 0;
        const b = e.currentTarget; b.classList.toggle('on', !!P.shadow);
        b.querySelector('span').textContent = P.shadow ? `الظل: كل ${P.shadow} ث` : 'وضع الظل';
        $('#phelp', body).textContent = P.shadow ? `يتوقف التشغيل كل ${P.shadow} ثوانٍ لتكرر ما سمعته بصوتك، ثم يكمل تلقائياً.` : '';
      };
      $('#tdone', body).onclick = e => {
        if (S.done[c.url]) delete S.done[c.url]; else S.done[c.url] = 1;
        save(); e.currentTarget.querySelector('span').textContent = S.done[c.url] ? 'مسموعة' : 'تعليم كمسموعة'; refreshOpenLists();
      };
      if (P.a != null) $('#tab', body).classList.add('on');
      if (P.shadow) $('#tshadow', body).classList.add('on');
    }
    $('#tsleep', body).onclick = e => {
      const opts = [[0, 'إيقاف المؤقت'], [15, '15 دقيقة'], [30, '30 دقيقة'], [45, '45 دقيقة'], [60, 'ساعة'], [-1, 'نهاية الحلقة']];
      P._sl = ((P._sl || 0) + 1) % opts.length;
      const [m, l] = opts[P._sl];
      P.sleepAt = m > 0 ? Date.now() + m * 60000 : 0; P.sleepEnd = m === -1;
      e.currentTarget.classList.toggle('on', m !== 0);
      e.currentTarget.querySelector('span').textContent = m ? 'النوم: ' + l : 'مؤقت النوم';
      toast(m ? 'مؤقت النوم: ' + l : 'تم إلغاء مؤقت النوم');
    };
    paintPlayer();
  }, { onClose: () => { P.page = null; } });
}
function paintPlayer(timeOnly) {
  const pg = P.page; if (!pg || !pg.alive || !P.cur) return;
  const b = pg.body;
  if (!timeOnly) { const pp = $('#pplay', b); if (pp) pp.innerHTML = ic(A.paused ? 'play' : 'pause'); }
  const seek = $('#pseek', b);
  if (seek && !(pg.isDragging && pg.isDragging())) {
    const d = isFinite(A.duration) ? A.duration : (P.cur.dur || 0);
    seek.max = Math.max(1, Math.floor(d)); seek.value = Math.floor(A.currentTime);
    $('#pcur', b).textContent = fmtTime(A.currentTime); $('#pdur', b).textContent = fmtTime(d);
  }
}

/* =========================================================
   YOUTUBE CHANNELS + RADIO
   ========================================================= */
const allChans = inc => DATA.channels.map(c => ({ ...c, key: c.id || c.handle })).concat(S.chans).filter(c => inc || !S.hidden['yt:' + c.key]);
let chanTab = 'yt', chanLevel = null;

async function channelId(c) {
  if (c.id) return c.id;
  const h = c.handle;
  if (S.cache.ytid[h]) return S.cache.ytid[h];
  const html = await getText('https://www.youtube.com/' + h.replace(/^\/?/, ''), 1500000);
  const m = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/) || html.match(/"(?:externalId|channelId|browseId)":"(UC[\w-]{22})"/) || html.match(/channel\/(UC[\w-]{22})/);
  if (!m) throw new Error('not found');
  S.cache.ytid[h] = m[1]; save();
  return m[1];
}
async function ytFeed(c) {
  const id = await channelId(c);
  const k = 'yt_' + id;
  if (feedMem[k] && Date.now() - feedMem[k].t < 20 * 60000) return feedMem[k];
  const xml = await getText('https://www.youtube.com/feeds/videos.xml?channel_id=' + id, 800000);
  const title = decode(tag(xml.split('<entry>')[0], 'title'));
  const vids = [];
  const re = /<entry>[\s\S]*?<\/entry>/g; let m;
  while ((m = re.exec(xml))) {
    const b = m[0];
    const vid = tag(b, 'yt:videoId'); if (!vid) continue;
    vids.push({ vid, title: decode(tag(b, 'title')), date: tag(b, 'published'), desc: decode(tag(b, 'media:description')), views: attr(b, 'media:statistics', 'views') });
  }
  const f = { t: Date.now(), id, title, vids };
  feedMem[k] = f;
  if (vids[0] && !S.cache.art['yt:' + c.key]) { S.cache.art['yt:' + c.key] = `https://i.ytimg.com/vi/${vids[0].vid}/mqdefault.jpg`; save(); }
  return f;
}
const ytThumb = v => `https://i.ytimg.com/vi/${v}/mqdefault.jpg`;

function renderChans(v) {
  if (chanLevel == null) chanLevel = S.set.level;
  v.innerHTML = `<div class="tabs2"><button data-ct="yt" class="${chanTab === 'yt' ? 'on' : ''}">📺 قنوات يوتيوب</button><button data-ct="radio" class="${chanTab === 'radio' ? 'on' : ''}">📻 راديو مباشر</button></div><div id="cbody"></div>`;
  $('.tabs2', v).onclick = e => { const b = e.target.closest('[data-ct]'); if (b) { chanTab = b.dataset.ct; go('chans'); } };
  const cb = $('#cbody', v);
  if (chanTab === 'radio') return renderRadio(cb);
  cb.innerHTML = `<div class="section"><h2>قنوات تعليم الإنجليزية</h2><button class="more" id="addCh">+ إضافة قناة</button></div>`;
  cb.appendChild(levelChips(chanLevel, lv => { chanLevel = lv; go('chans'); }));
  const list = allChans().filter(c => chanLevel === 'all' || (chanLevel === 'fav' ? S.favs['yt:' + c.key] : c.level === chanLevel));
  const g = document.createElement('div'); g.className = 'grid';
  g.innerHTML = list.map(c => `<button class="mcard chan-card" data-ch="${esc(c.key)}">
    ${img(S.cache.art['yt:' + c.key], 'cover', '▶️')}
    <div class="body"><div class="n en">${esc(c.name)}</div><div class="b">${esc(c.desc || '')}</div>${levelBadge(c.level)} ${c.accent ? `<span class="badge">${esc(c.accent)}</span>` : ''}</div></button>`).join('');
  cb.appendChild(g);
  if (!list.length) cb.insertAdjacentHTML('beforeend', `<div class="empty">لا توجد قنوات هنا.</div>`);
  g.onclick = e => { const b = e.target.closest('[data-ch]'); if (b) openChannel(allChans(true).find(c => c.key === b.dataset.ch)); };
  $('#addCh').onclick = () => manageChans();
}

function openChannel(c) {
  openPage(c.name, (body, pg) => {
    pg.head.innerHTML = `<button class="icon-btn" id="cfav">${ic('heart')}</button><button class="icon-btn" id="cyt">${ic('ext')}</button>`;
    const fk = 'yt:' + c.key, fb = $('#cfav', pg.el);
    const paint = () => { fb.style.color = S.favs[fk] ? 'var(--bad)' : ''; $('svg', fb).style.fill = S.favs[fk] ? 'currentColor' : 'none'; };
    paint();
    fb.onclick = () => { if (S.favs[fk]) delete S.favs[fk]; else S.favs[fk] = 1; save(); paint(); };
    const ytUrl = c.id ? 'https://www.youtube.com/channel/' + c.id : 'https://www.youtube.com/' + c.handle;
    $('#cyt', pg.el).onclick = () => openUrl(ytUrl);
    body.innerHTML = `<div class="small muted" style="margin-bottom:10px">${esc(c.desc || '')}</div><div id="vids">${spinner()}</div>`;
    ytFeed(c).then(f => {
      if (!pg.alive) return;
      $('#vids', body).innerHTML = f.vids.length ? `<div class="list">${f.vids.map((v, i) => `
        <button class="item" data-v="${i}">${img(ytThumb(v.vid), 'thumb wide', '▶️')}
        <div class="info"><div class="t en">${esc(v.title)}</div><div class="s">${fmtDate(v.date)}${v.views ? ' • ' + (+v.views).toLocaleString('en') + ' views' : ''}</div></div></button>`).join('')}</div>
        <button class="btn ghost block" style="margin-top:12px" data-ext="${esc(ytUrl + '/videos')}">${ic('ext')} كل فيديوهات القناة على يوتيوب</button>` : '<div class="empty">لا توجد فيديوهات.</div>';
      $('#vids', body).onclick = e => { const b = e.target.closest('[data-v]'); if (b) openVideo(f.vids[+b.dataset.v], c); };
    }).catch(() => {
      if (!pg.alive) return;
      $('#vids', body).innerHTML = `<div class="empty">تعذّر جلب أحدث الفيديوهات الآن.<br><br><button class="btn sm" data-ext="${esc(ytUrl)}">${ic('ext')} افتح القناة في يوتيوب</button></div>`;
    });
  });
}

function openVideo(v, c) {
  const wasPlaying = P.cur && !A.paused;
  if (wasPlaying) A.pause();
  let timer;
  openPage(c ? c.name : 'فيديو', (body, pg) => {
    const params = `playsinline=1&rel=0&modestbranding=1&hl=en${S.set.subtitles ? '&cc_load_policy=1&cc_lang_pref=en' : ''}`;
    const watchUrl = 'https://www.youtube.com/watch?v=' + v.vid;
    pg.head.innerHTML = `<button class="icon-btn" id="vshare">${ic('share')}</button>`;
    $('#vshare', pg.el).onclick = () => shareText(v.title + '\n' + watchUrl);
    body.innerHTML = `<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.vid)}?${params}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
      <h3 class="en" style="margin:12px 0 4px;font-size:1rem">${esc(v.title)}</h3>
      <div class="small muted">${fmtDate(v.date)}</div>
      <div class="row" style="gap:8px;margin:12px 0;flex-wrap:wrap">
        <button class="btn sm" data-ext="${watchUrl}">${ic('ext')} فتح في تطبيق يوتيوب</button>
        <button class="btn ghost sm" id="vyg">${ic('search')} ابحث عن كلمة في YouGlish</button>
      </div>
      <div class="small muted" style="margin-bottom:8px">💡 إذا لم يعمل الفيديو داخل التطبيق اضغط "فتح في تطبيق يوتيوب". فعّل الترجمة الإنجليزية (CC) لربط الصوت بالكلمات.</div>
      ${v.desc ? `<div class="desc">${linkify(v.desc)}</div>` : ''}`;
    $('#vyg', body).onclick = () => { const w = prompt('اكتب الكلمة أو العبارة:'); if (w) openUrl('https://youglish.com/pronounce/' + encodeURIComponent(w) + '/english'); };
    timer = setInterval(() => { if (document.visibilityState === 'visible') addSecs(10); }, 10000);
  }, { onClose: () => clearInterval(timer) });
}

/* ---- Radio (radio-browser.info, community directory) ---- */
const RB = ['https://de1.api.radio-browser.info', 'https://fi1.api.radio-browser.info', 'https://de2.api.radio-browser.info', 'https://nl1.api.radio-browser.info'];
async function rbGet(path) {
  let err;
  for (const h of RB) { try { return JSON.parse(await getText(h + path, 2000000, 15000)); } catch (e) { err = e; } }
  throw err;
}
const pickStation = arr => (arr || []).filter(s => s.url_resolved).sort((a, b) => (/\.m3u8|\.pls|\.m3u$/i.test(a.url_resolved) - /\.m3u8|\.pls|\.m3u$/i.test(b.url_resolved)) || (b.clickcount - a.clickcount))[0];
const allRadios = inc => DATA.radios.concat(S.radios).filter(r => inc || !S.hidden['r:' + r.id]);
async function resolveRadio(r) {
  if (r.url) return r;
  const c = S.cache.radio[r.id];
  if (c && Date.now() - c.t < 7 * 864e5) return c;
  const arr = await rbGet(`/json/stations/search?name=${encodeURIComponent(r.q)}&limit=15&hidebroken=true&order=clickcount&reverse=true`);
  const s = pickStation(arr);
  if (!s) throw new Error('none');
  const out = { url: s.url_resolved, img: s.favicon, sub: [s.country, s.codec, s.bitrate ? s.bitrate + 'kbps' : ''].filter(Boolean).join(' • '), t: Date.now() };
  S.cache.radio[r.id] = out; save();
  return out;
}
async function playRadio(r) {
  toast('جاري الاتصال بالإذاعة…');
  try {
    const s = await resolveRadio(r);
    playItem({ live: true, url: s.url, title: r.name, sub: s.sub || r.desc, img: s.img || r.img, podName: s.sub || 'بث مباشر' });
  } catch (e) { delete S.cache.radio[r.id]; toast('تعذّر تشغيل هذه الإذاعة حالياً'); }
}
function renderRadio(cb) {
  cb.innerHTML = `<div class="small muted" style="margin:6px 0 10px">استمع لإذاعات ناطقة بالإنجليزية لتعويد أذنك على السرعة الطبيعية واللكنات المختلفة.</div>
    <div class="list" id="rl">${allRadios().map(r => `<button class="item" data-r="${esc(r.id)}">
      ${img(S.cache.radio[r.id] && S.cache.radio[r.id].img, 'thumb', '📻')}
      <div class="info"><div class="t en">${esc(r.name)}</div><div class="s">${esc(r.desc || '')}</div></div><span class="act">${ic('play')}</span></button>`).join('')}</div>
    <div class="section"><h2>ابحث عن إذاعة</h2></div>
    <div class="search"><input id="rq" placeholder="مثال: BBC, NPR, talk, news" class="en"><button class="btn" id="rgo">${ic('search')}</button></div>
    <div id="rres"></div>`;
  $('#rl', cb).onclick = e => { const b = e.target.closest('[data-r]'); if (b) playRadio(allRadios(true).find(r => r.id === b.dataset.r)); };
  const doSearch = async () => {
    const q = $('#rq', cb).value.trim(); if (!q) return;
    const out = $('#rres', cb); out.innerHTML = spinner();
    try {
      const arr = await rbGet(`/json/stations/search?name=${encodeURIComponent(q)}&language=english&limit=25&hidebroken=true&order=clickcount&reverse=true`);
      const list = arr.filter(s => s.url_resolved);
      out.innerHTML = list.length ? `<div class="list">${list.map((s, i) => `<div class="item">
        ${img(s.favicon, 'thumb', '📻')}<div class="info"><div class="t en">${esc(s.name)}</div><div class="s">${esc([s.country, s.tags && s.tags.split(',').slice(0, 3).join(', ')].filter(Boolean).join(' • '))}</div></div>
        <button class="act" data-rp="${i}">${ic('play')}</button><button class="act" data-ra="${i}">${ic('plus')}</button></div>`).join('')}</div>` : '<div class="empty">لا نتائج.</div>';
      out.onclick = e => {
        const p = e.target.closest('[data-rp]'), a = e.target.closest('[data-ra]');
        if (p) { const st = list[+p.dataset.rp]; playItem({ live: true, url: st.url_resolved, title: st.name, img: st.favicon, podName: st.country || 'بث مباشر' }); }
        if (a) {
          const st = list[+a.dataset.ra];
          const id = 'rc_' + st.stationuuid;
          if (!S.radios.find(r => r.id === id)) { S.radios.push({ id, name: st.name, url: st.url_resolved, img: st.favicon, desc: st.country || '' }); save(); toast('أضيفت الإذاعة'); renderRadio(cb); }
          else toast('موجودة مسبقاً');
        }
      };
    } catch (e) { out.innerHTML = '<div class="empty">تعذّر البحث الآن.</div>'; }
  };
  $('#rgo', cb).onclick = doSearch;
  $('#rq', cb).onkeydown = e => { if (e.key === 'Enter') doSearch(); };
}

/* =========================================================
   CONVERSATION & PRACTICE
   ========================================================= */
const QUESTIONS = [
  'Tell me about yourself.', 'What do you usually do on weekends?', 'What is your favorite food and why?', 'Describe your hometown.',
  'What did you do yesterday?', 'What are your plans for next year?', 'Who is the most important person in your life?',
  'What kind of music do you like?', 'Describe your perfect holiday.', 'What is the best book or film you have seen recently?',
  'Why are you learning English?', 'What would you do if you won a million dollars?', 'Describe a typical day at work or school.',
  'What is a skill you would like to learn?', 'Do you prefer the city or the countryside? Why?', 'What makes a good friend?',
  'Talk about a memorable trip you took.', 'How has technology changed your life?', 'What is your favorite season and why?',
  'If you could live in any country, where would it be?', 'What is the most difficult thing about learning English for you?',
  'Describe your best friend.', 'What do you think about social media?', 'What did you want to be when you were a child?',
  'How do you usually relax after a long day?'
];

function renderTalk(v) {
  const due = dueWords().length;
  const tiles = [
    ['dlg', '🎭', 'حوارات ولعب أدوار', `${DATA.dialogues.length} موقف يومي`],
    ['free', '🗣️', 'محادثة حرّة', 'أجب عن أسئلة بصوتك'],
    ['phr', '💬', 'عبارات المحادثة', 'عبارات جاهزة للاستخدام'],
    ['pron', '🎯', 'تدريب النطق', 'قيّم نطقك كلمة بكلمة'],
    ['dict', '📖', 'القاموس', 'معنى ونطق وأمثلة'],
    ['tr', '🌐', 'الترجمة', 'إنجليزي ⇄ عربي'],
    ['cards', '🃏', 'بطاقات كلماتي', due ? `${due} للمراجعة اليوم` : `${S.words.length} كلمة محفوظة`],
    ['links', '🔗', 'روابط مفيدة', 'مواقع وتطبيقات للتعلّم']
  ];
  v.innerHTML = `<div class="card" style="margin:6px 0 4px"><div class="row"><div style="font-size:2rem">🗣️</div><div><b>تدرّب على الكلام كل يوم</b>
    <div class="small muted">نطقت ${S.spoken} جملة حتى الآن. الهدف: أن تتكلم لا أن تحفظ فقط!</div></div></div></div>
    <div class="grid" style="margin-top:12px">${tiles.map(([k, i, t, s]) => `<button class="card" data-t="${k}" style="text-align:right"><div style="font-size:1.8rem">${i}</div><b>${t}</b><div class="small muted">${s}</div></button>`).join('')}</div>`;
  $('.grid', v).onclick = e => { const b = e.target.closest('[data-t]'); if (b) openTool(b.dataset.t); };
}
function openTool(k) {
  ({ dlg: openDialogues, free: openFreeTalk, phr: openPhrases, pron: () => openPron(), dict: () => openDict(), tr: openTranslate, cards: openCards, links: openLinks })[k]();
}

/* ---- scoring ---- */
function expand(s) {
  return s.toLowerCase().replace(/[’‘]/g, "'")
    .replace(/\bwon't\b/g, 'will not').replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bshan't\b/g, 'shall not')
    .replace(/n't\b/g, ' not').replace(/'re\b/g, ' are').replace(/'m\b/g, ' am').replace(/'ve\b/g, ' have').replace(/'ll\b/g, ' will').replace(/'d\b/g, ' would')
    .replace(/\b(it|that|what|there|here|he|she|who|where|how|let)'s\b/g, (m, a) => a === 'let' ? 'let us' : a + ' is')
    .replace(/'s\b/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const toks = s => { const e = expand(s); return e ? e.split(' ') : []; };
function lcsMatch(a, b) {
  const n = a.length, m = b.length, dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array(n).fill(false); let i = 0, j = 0;
  while (i < n && j < m) { if (a[i] === b[j]) { hit[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  return hit;
}
function scoreSpeech(target, saidList) {
  const words = target.split(/\s+/).filter(Boolean);
  const per = words.map(w => toks(w));
  const flat = []; per.forEach((t, wi) => t.forEach(x => flat.push(wi)));
  const tflat = per.flat();
  let best = { pct: -1 };
  for (const said of saidList.length ? saidList : ['']) {
    const hit = lcsMatch(tflat, toks(said));
    const ok = words.map((w, wi) => { const idx = flat.map((f, k) => f === wi ? k : -1).filter(k => k >= 0); return idx.length === 0 || idx.every(k => hit[k]); });
    const pct = tflat.length ? Math.round(hit.filter(Boolean).length / tflat.length * 100) : 0;
    if (pct > best.pct) best = { pct, ok, said };
  }
  best.html = words.map((w, i) => `<span class="${best.ok[i] ? 'w-ok' : 'w-miss'}">${esc(w)}</span>`).join(' ');
  return best;
}
const scoreBadge = p => `<span class="score ${p >= 85 ? 'good' : p >= 60 ? 'mid' : 'low'}">${p}% ${p >= 85 ? 'ممتاز 🎉' : p >= 60 ? 'جيد 👍' : 'حاول مرة أخرى'}</span>`;
async function practiceSentence(target) {
  const r = await listen();
  if (!r.ok) { toast(r.text === 'NO_ENGINE' ? 'لا يوجد محرك تعرّف صوتي — ثبّت تطبيق Google' : 'لم يتم التقاط صوت'); return null; }
  S.spoken++; addSecs(5); save();
  return scoreSpeech(target, r.alts.length ? r.alts : [r.text]);
}

/* ---- dialogues ---- */
function openDialogues() {
  openPage('حوارات ولعب أدوار', body => {
    let lv = 'all';
    const draw = () => {
      body.innerHTML = '';
      body.appendChild(levelChips(lv, x => { lv = x === 'fav' ? 'all' : x; draw(); }));
      const l = DATA.dialogues.filter(d => lv === 'all' || d.level === lv);
      body.insertAdjacentHTML('beforeend', `<div class="list">${l.map(d => `<button class="item" data-d="${d.id}"><div class="thumb">${d.icon}</div>
        <div class="info"><div class="t en">${esc(d.title)}</div><div class="s">${esc(d.ar)} • ${d.lines.length} جمل</div></div>${levelBadge(d.level)}</button>`).join('')}</div>`);
      $('.list', body).onclick = e => { const b = e.target.closest('[data-d]'); if (b) openDialogue(DATA.dialogues.find(d => d.id === b.dataset.d)); };
    };
    draw();
  });
}
function openDialogue(d) {
  openPage(d.title, (body, pg) => {
    let showAr = S.set.showAr, run = 0;
    const roleName = r => d.roles[r === 'A' ? 0 : 1];
    const pitchOf = r => r === 'A' ? S.set.ttsPitch : Math.min(2, S.set.ttsPitch * 1.25);
    body.innerHTML = `<div class="card" style="margin-bottom:10px"><div class="small muted">${esc(d.ar)}</div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px">
        <button class="btn sm" id="dall">${ic('speaker')} استمع للحوار</button>
        <button class="btn ghost sm" id="drA">🎭 أنا ${esc(d.roles[0])}</button>
        <button class="btn ghost sm" id="drB">🎭 أنا ${esc(d.roles[1])}</button>
        <button class="btn ghost sm" id="dar">ع ${showAr ? 'إخفاء' : 'إظهار'} الترجمة</button>
      </div><div id="dmsg" class="small muted" style="margin-top:8px">اضغط على أي جملة لسماعها. في وضع لعب الأدوار ينطق التطبيق الشخصية الأخرى وتنطق أنت دورك.</div></div>
      <div class="chat" id="dchat">${d.lines.map(([r, en, ar], i) => `<div class="bubble ${r === 'A' ? 'a' : 'b'}" data-i="${i}">
        <button class="spk" data-l="${i}">${ic('speaker')}</button><div class="who">${esc(roleName(r))}</div>
        <div class="en">${esc(en)}</div><div class="ar ${showAr ? '' : 'hidden'}">${esc(ar)}</div><div class="res"></div></div>`).join('')}</div>
      <div id="dturn"></div>`;
    const chat = $('#dchat', body);
    const bub = i => $(`[data-i="${i}"]`, chat);
    const hl = i => { $$('.bubble', chat).forEach(b => b.classList.remove('active')); if (i >= 0) { bub(i).classList.add('active'); bub(i).scrollIntoView({ behavior: 'smooth', block: 'center' }); } };
    chat.onclick = e => { const b = e.target.closest('.bubble'); if (!b || run) return; const i = +b.dataset.i; hl(i); speak(d.lines[i][1], { pitch: pitchOf(d.lines[i][0]) }); };
    $('#dar', body).onclick = e => { showAr = !showAr; $$('.ar', chat).forEach(x => x.classList.toggle('hidden', !showAr)); e.currentTarget.textContent = `ع ${showAr ? 'إخفاء' : 'إظهار'} الترجمة`; };
    $('#dall', body).onclick = async () => {
      const my = ++run;
      for (let i = 0; i < d.lines.length; i++) { if (run !== my || !pg.alive) return; hl(i); await speak(d.lines[i][1], { pitch: pitchOf(d.lines[i][0]) }); await sleep(350); }
      run = 0; hl(-1); addSecs(20);
    };
    const roleplay = async role => {
      stopSpeak(); const my = ++run; let total = 0, n = 0;
      $$('.res', chat).forEach(x => x.innerHTML = '');
      const turn = $('#dturn', body);
      for (let i = 0; i < d.lines.length; i++) {
        if (run !== my || !pg.alive) return;
        const [r, en] = d.lines[i]; hl(i);
        if (r !== role) { await speak(en, { pitch: pitchOf(r) }); await sleep(300); continue; }
        const res = await new Promise(done => {
          turn.innerHTML = `<div class="card" style="text-align:center;margin-top:12px"><b>دورك الآن 🎤</b><div class="en" style="margin:6px 0">${esc(en)}</div>
            <button class="mic" id="tmic">${ic('mic')}</button><div class="row" style="justify-content:center;gap:8px">
            <button class="btn ghost sm" id="thear">${ic('speaker')} استمع أولاً</button><button class="btn ghost sm" id="tskip">تخطّي</button></div></div>`;
          turn.scrollIntoView({ behavior: 'smooth', block: 'end' });
          $('#thear', turn).onclick = () => speak(en, { rate: S.set.ttsRate * 0.85 });
          $('#tskip', turn).onclick = () => done(null);
          $('#tmic', turn).onclick = async () => { const s = await practiceSentence(en); if (s) done(s); };
        });
        if (run !== my || !pg.alive) return;
        if (res) { total += res.pct; n++; $('.res', bub(i)).innerHTML = `<div class="small en">${res.html}</div>${scoreBadge(res.pct)}`; $('.en', bub(i)).classList.add('hidden'); }
        turn.innerHTML = ''; await sleep(500);
      }
      run = 0; hl(-1); addSecs(30);
      $('#dturn', body).innerHTML = `<div class="card" style="text-align:center;margin-top:12px"><div style="font-size:2rem">🏁</div><b>أحسنت! انتهى الحوار</b>
        ${n ? `<div style="margin-top:6px">متوسط دقة نطقك: ${scoreBadge(Math.round(total / n))}</div>` : ''}<button class="btn sm" style="margin-top:10px" id="again">أعد المحاولة</button></div>`;
      $$('.bubble .en', chat).forEach(x => x.classList.remove('hidden'));
      $('#again', body).onclick = () => roleplay(role);
    };
    $('#drA', body).onclick = () => roleplay('A');
    $('#drB', body).onclick = () => roleplay('B');
    pg.onClose = () => { run = 0; stopSpeak(); };
  });
}

/* ---- free talk ---- */
function openFreeTalk() {
  openPage('محادثة حرّة', (body, pg) => {
    let q = rand(QUESTIONS);
    const draw = () => {
      body.innerHTML = `<div class="card" style="text-align:center"><div class="small muted">السؤال</div>
        <div class="en" style="font-size:1.25rem;font-weight:800;margin:8px 0;text-align:center">${esc(q)}</div>
        <div class="row" style="justify-content:center;gap:8px"><button class="btn ghost sm" data-say="${esc(q)}">${ic('speaker')} استمع</button><button class="btn ghost sm" id="fnext">سؤال آخر ↻</button></div>
        <button class="mic" id="fmic">${ic('mic')}</button><div class="small muted">اضغط وأجب بجملتين أو ثلاث. لا تقلق من الأخطاء!</div></div>
        <div id="fans" class="list" style="margin-top:12px"></div>
        <div class="card small muted" style="margin-top:12px">💡 للمحادثة مع أشخاص حقيقيين جرّب Tandem أو HelloTalk من قسم "روابط مفيدة".</div>`;
      $('#fnext', body).onclick = () => { q = rand(QUESTIONS); draw(); speak(q); };
      $('#fmic', body).onclick = async () => {
        const r = await listen();
        if (!r.ok) { toast('لم يتم التقاط صوت'); return; }
        S.spoken++; addSecs(15); save();
        const words = toks(r.text).length;
        $('#fans', body).insertAdjacentHTML('afterbegin', `<div class="card"><div class="small muted">إجابتك (${words} كلمة)</div>
          <div class="en" style="margin:4px 0">${esc(r.text)}</div><div class="row" style="gap:6px">
          <button class="btn ghost sm" data-say="${esc(r.text)}">${ic('speaker')} اسمعها بنطق صحيح</button>
          <button class="btn ghost sm" data-tr="${esc(r.text)}">🌐 ترجم</button></div>
          <div class="small" style="margin-top:6px">${words < 6 ? '👉 حاول أن تطيل إجابتك: أضف سبباً أو مثالاً (because…, for example…).' : words < 15 ? '👍 جيد! جرّب ربط الأفكار بـ and, but, so.' : '🌟 رائع! إجابة مفصّلة.'}</div></div>`);
      };
      $('#fans', body).onclick = e => { const t = e.target.closest('[data-tr]'); if (t) openTranslate(t.dataset.tr); };
    };
    draw();
    setTimeout(() => pg.alive && speak(q), 400);
    pg.onClose = stopSpeak;
  });
}

/* ---- phrases ---- */
function openPhrases() {
  openPage('عبارات المحادثة', body => {
    let ci = 0;
    const draw = () => {
      const c = DATA.phrases[ci];
      body.innerHTML = `<div class="chips">${DATA.phrases.map((p, i) => `<button class="chip ${i === ci ? 'on' : ''}" data-c="${i}">${p.icon} ${p.cat}</button>`).join('')}</div>
        <div class="list">${c.items.map(([en, ar], i) => `<div class="phrase"><div class="txt"><div class="en">${esc(en)}</div><div class="ar ${S.set.showAr ? '' : 'hidden'}">${esc(ar)}</div><div class="r"></div></div>
          <button class="act" data-say="${esc(en)}">${ic('speaker')}</button><button class="act" data-m="${i}">${ic('mic')}</button><button class="act" data-s="${i}">${ic('star')}</button></div>`).join('')}</div>`;
      $('.chips', body).onclick = e => { const b = e.target.closest('[data-c]'); if (b) { ci = +b.dataset.c; draw(); } };
      $('.list', body).onclick = async e => {
        const m = e.target.closest('[data-m]'), s = e.target.closest('[data-s]');
        if (m) { const [en] = c.items[+m.dataset.m]; const r = await practiceSentence(en); if (r) m.closest('.phrase').querySelector('.r').innerHTML = `<div class="small en">${r.html}</div>${scoreBadge(r.pct)}`; }
        if (s) { const [en, ar] = c.items[+s.dataset.s]; addWord(en, ar, ''); }
      };
    };
    draw();
  }, { onClose: stopSpeak });
}

/* ---- pronunciation ---- */
function allSentences() { return DATA.dialogues.flatMap(d => d.lines.map(l => l[1])).concat(DATA.phrases.flatMap(p => p.items.map(i => i[0]))).filter(s => !s.includes('...')); }
function openPron(text) {
  openPage('تدريب النطق', body => {
    let t = text || rand(allSentences());
    body.innerHTML = `<div class="card"><div class="small muted" style="margin-bottom:6px">اكتب أي جملة أو اختر جملة عشوائية:</div>
      <textarea id="ptxt" rows="3" class="en">${esc(t)}</textarea>
      <div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn ghost sm" id="pn">${ic('speaker')} عادي</button><button class="btn ghost sm" id="ps">🐢 بطيء</button><button class="btn ghost sm" id="pr">↻ جملة أخرى</button><button class="btn ghost sm" id="pyg">YouGlish</button></div>
      <button class="mic" id="pmic">${ic('mic')}</button><div class="small muted" style="text-align:center">اضغط الميكروفون وانطق الجملة</div></div>
      <div id="phist" class="list" style="margin-top:12px"></div>`;
    const txt = () => $('#ptxt', body).value.trim();
    $('#pn', body).onclick = () => speak(txt());
    $('#ps', body).onclick = () => speak(txt(), { rate: Math.max(0.4, S.set.ttsRate * 0.6) });
    $('#pr', body).onclick = () => { $('#ptxt', body).value = rand(allSentences()); };
    $('#pyg', body).onclick = () => openUrl('https://youglish.com/pronounce/' + encodeURIComponent(txt()) + '/english');
    $('#pmic', body).onclick = async () => {
      const target = txt(); if (!target) return;
      const r = await practiceSentence(target); if (!r) return;
      $('#phist', body).insertAdjacentHTML('afterbegin', `<div class="card"><div class="en">${r.html}</div>
        <div class="small muted en" style="margin-top:4px">سمعتُ: "${esc(r.said)}"</div>${scoreBadge(r.pct)}
        ${r.pct < 85 ? '<div class="small muted" style="margin-top:4px">الكلمات باللون الأحمر لم تُلتقط بشكل صحيح — استمع لها وكرّر.</div>' : ''}</div>`);
    };
  }, { onClose: stopSpeak });
}

/* ---- dictionary ---- */
function openDict(word) {
  openPage('القاموس', body => {
    body.innerHTML = `<div class="search"><input id="dq" class="en" placeholder="Type an English word…" value="${esc(word || '')}" autocomplete="off" autocapitalize="off"><button class="btn" id="dgo">${ic('search')}</button></div><div id="dres"><div class="empty">ابحث عن أي كلمة إنجليزية لمعرفة معناها ونطقها وأمثلة عليها مع الترجمة العربية.</div></div>`;
    const go_ = async () => {
      const w = $('#dq', body).value.trim().toLowerCase(); if (!w) return;
      const out = $('#dres', body); out.innerHTML = spinner();
      const [def, ar] = await Promise.allSettled([getJSON('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(w)), translate(w, 'en|ar')]);
      const arTxt = ar.status === 'fulfilled' ? ar.value : '';
      if (def.status !== 'fulfilled' || !Array.isArray(def.value)) {
        out.innerHTML = `<div class="card"><b class="en">${esc(w)}</b> <button class="act" data-say="${esc(w)}">${ic('speaker')}</button>${arTxt ? `<div style="margin-top:6px">${esc(arTxt)}</div>` : ''}<div class="small muted" style="margin-top:6px">لم يُعثر على تعريف إنجليزي مفصّل لهذه الكلمة.</div>
          <button class="btn sm" style="margin-top:10px" id="dadd">${ic('star')} أضف لبطاقاتي</button></div>`;
        $('#dadd', out).onclick = () => addWord(w, arTxt, '');
        return;
      }
      const e0 = def.value[0];
      const ph = e0.phonetic || (e0.phonetics || []).map(p => p.text).find(Boolean) || '';
      const audio = (e0.phonetics || []).map(p => p.audio).find(Boolean);
      let firstEx = '';
      const meanings = def.value.flatMap(e => e.meanings || []).slice(0, 4).map(m => {
        const defs = m.definitions.slice(0, 3).map(d => { if (!firstEx && d.example) firstEx = d.example; return `<div class="def en">${esc(d.definition)}${d.example ? `<div class="muted small">“${esc(d.example)}” <button data-say="${esc(d.example)}" style="vertical-align:middle">${ic('speaker')}</button></div>` : ''}</div>`; }).join('');
        const syn = (m.synonyms || []).slice(0, 6);
        return `<div style="margin-top:12px"><span class="badge">${esc(m.partOfSpeech)}</span>${defs}${syn.length ? `<div class="small muted en">Synonyms: ${syn.map(s => `<a href="#" data-w="${esc(s)}">${esc(s)}</a>`).join(', ')}</div>` : ''}</div>`;
      }).join('');
      out.innerHTML = `<div class="card"><div class="row"><div style="flex:1"><div class="en" style="font-size:1.6rem;font-weight:800">${esc(e0.word)}</div><div class="muted en">${esc(ph)}</div></div>
        ${audio ? `<button class="act" id="daud">🔈</button>` : ''}<button class="act" data-say="${esc(e0.word)}">${ic('speaker')}</button></div>
        ${arTxt ? `<div style="margin-top:8px;font-size:1.1rem">🇸🇦 ${esc(arTxt)}</div>` : ''}
        <div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn sm" id="dadd">${ic('star')} أضف لبطاقاتي</button><button class="btn ghost sm" id="dpr">🎯 تدرّب على نطقها</button>
        <button class="btn ghost sm" data-ext="https://youglish.com/pronounce/${encodeURIComponent(e0.word)}/english">YouGlish</button></div>${meanings}</div>`;
      if (audio) $('#daud', out).onclick = () => { const a = new Audio(audio); a.play().catch(() => speak(e0.word)); };
      $('#dadd', out).onclick = () => addWord(e0.word, arTxt, firstEx);
      $('#dpr', out).onclick = () => openPron(e0.word);
      out.onclick = e => { const s = e.target.closest('[data-w]'); if (s) { e.preventDefault(); $('#dq', body).value = s.dataset.w; go_(); } };
    };
    $('#dgo', body).onclick = go_;
    $('#dq', body).onkeydown = e => { if (e.key === 'Enter') go_(); };
    if (word) go_(); else setTimeout(() => $('#dq', body).focus(), 300);
  });
}

/* ---- translate (MyMemory free API) ---- */
async function translate(text, pair) {
  const j = await getJSON(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 480))}&langpair=${encodeURIComponent(pair)}`);
  const t = j && j.responseData && j.responseData.translatedText;
  if (!t || /MYMEMORY WARNING|QUERY LENGTH/i.test(t)) throw new Error('tr');
  return decode(t);
}
function openTranslate(pre) {
  openPage('الترجمة', body => {
    let dir = pre && /[؀-ۿ]/.test(pre) ? 'ar|en' : 'en|ar';
    body.innerHTML = `<div class="row" style="justify-content:space-between;margin-bottom:8px"><b id="tlab"></b><button class="btn ghost sm" id="tswap">${ic('swap')} عكس الاتجاه</button></div>
      <textarea id="tin" rows="4" placeholder="اكتب النص هنا…">${esc(pre || '')}</textarea>
      <div class="row" style="gap:8px;margin-top:8px"><button class="btn" id="tgo">ترجم</button><button class="btn ghost" id="tmic">${ic('mic')} تحدّث</button></div>
      <div id="tout" style="margin-top:12px"></div><div class="small muted" style="margin-top:10px">الترجمة الآلية عبر خدمة MyMemory المجانية وقد لا تكون دقيقة دائماً.</div>`;
    const lab = () => { $('#tlab', body).textContent = dir === 'en|ar' ? 'English ← العربية' : 'العربية ← English'; $('#tin', body).dir = dir === 'en|ar' ? 'ltr' : 'rtl'; };
    lab();
    $('#tswap', body).onclick = () => { dir = dir === 'en|ar' ? 'ar|en' : 'en|ar'; lab(); };
    $('#tmic', body).onclick = async () => { if (dir !== 'en|ar') { dir = 'en|ar'; lab(); } const r = await listen(); if (r.ok) { $('#tin', body).value = r.text; run(); } };
    const run = async () => {
      const t = $('#tin', body).value.trim(); if (!t) return;
      const o = $('#tout', body); o.innerHTML = spinner();
      try {
        const r = await translate(t, dir);
        const en = dir === 'ar|en' ? r : t;
        o.innerHTML = `<div class="card"><div style="font-size:1.1rem" class="${dir === 'ar|en' ? 'en' : ''}">${esc(r)}</div><div class="row" style="gap:6px;margin-top:10px">
          <button class="btn ghost sm" data-say="${esc(en)}">${ic('speaker')} انطق الإنجليزية</button><button class="btn ghost sm" id="tcp">${ic('copy')} نسخ</button>
          ${toks(en).length <= 3 ? `<button class="btn ghost sm" id="tadd">${ic('star')} أضف لبطاقاتي</button>` : ''}</div></div>`;
        $('#tcp', o).onclick = () => copyText(r);
        const a = $('#tadd', o); if (a) a.onclick = () => addWord(en, dir === 'en|ar' ? r : t, '');
      } catch (e) { o.innerHTML = '<div class="empty">تعذّرت الترجمة الآن. حاول لاحقاً.</div>'; }
    };
    $('#tgo', body).onclick = run;
    if (pre) run();
  });
}

/* ---- flashcards (Leitner) ---- */
const BOX_DAYS = [0, 1, 2, 4, 7, 15, 30];
function addWord(w, ar, ex) {
  w = (w || '').trim(); if (!w) return;
  if (S.words.find(x => x.w.toLowerCase() === w.toLowerCase())) { toast('الكلمة موجودة في بطاقاتك'); return; }
  S.words.unshift({ w, ar: ar || '', ex: ex || '', box: 1, due: dkey() }); save(); toast('أضيفت إلى بطاقاتك ⭐');
}
const dueWords = () => S.words.filter(x => x.due <= dkey());
function openCards() {
  openPage('بطاقات كلماتي', body => {
    let mode = 'review';
    const draw = () => {
      const due = dueWords();
      body.innerHTML = `<div class="tabs2"><button data-m="review" class="${mode === 'review' ? 'on' : ''}">مراجعة (${due.length})</button><button data-m="all" class="${mode === 'all' ? 'on' : ''}">كل الكلمات (${S.words.length})</button></div><div id="cb"></div>`;
      $('.tabs2', body).onclick = e => { const b = e.target.closest('[data-m]'); if (b) { mode = b.dataset.m; draw(); } };
      const cb = $('#cb', body);
      if (mode === 'review') {
        if (!due.length) { cb.innerHTML = `<div class="empty">🎉 لا توجد كلمات للمراجعة الآن.<br><br>أضف كلمات من القاموس أو العبارات أو "كلمة اليوم" بالضغط على ⭐</div>`; return; }
        const c = due[0];
        cb.innerHTML = `<div class="card fcard" id="fc"><div class="small muted">اضغط على البطاقة لإظهار المعنى</div><div class="w en" style="text-align:center">${esc(c.w)}</div>
          <button class="btn ghost sm" data-say="${esc(c.w)}">${ic('speaker')}</button><div id="back" class="hidden"><div style="font-size:1.2rem;margin-top:6px">${esc(c.ar || '—')}</div>${c.ex ? `<div class="small muted en" style="text-align:center;margin-top:6px">${esc(c.ex)}</div>` : ''}</div></div>
          <div class="row hidden" id="ans" style="gap:10px;margin-top:12px"><button class="btn danger block" id="no">لم أعرفها</button><button class="btn block" style="background:var(--ok)" id="yes">عرفتها ✓</button></div>
          <div class="small muted" style="text-align:center;margin-top:10px">الصندوق ${c.box} من 6 — كلما عرفتها تتباعد مراجعتها.</div>`;
        $('#fc', cb).onclick = e => { if (e.target.closest('[data-say]')) return; $('#back', cb).classList.remove('hidden'); $('#ans', cb).classList.remove('hidden'); };
        const next = ok => { c.box = ok ? Math.min(6, c.box + 1) : 1; const d = new Date(); d.setDate(d.getDate() + (ok ? BOX_DAYS[c.box] : 0) + (ok ? 0 : 0)); c.due = ok ? dkey(d) : dkey(new Date(Date.now() + 864e5)); save(); addSecs(3); draw(); };
        $('#no', cb).onclick = () => next(false);
        $('#yes', cb).onclick = () => next(true);
        setTimeout(() => speak(c.w), 250);
      } else {
        cb.innerHTML = `<div class="card" style="margin-bottom:10px"><div class="row" style="gap:6px"><input id="nw" class="en" placeholder="word"><input id="na" placeholder="المعنى"></div>
          <button class="btn sm block" style="margin-top:8px" id="nadd">${ic('plus')} إضافة كلمة</button></div>
          <div class="list">${S.words.map((x, i) => `<div class="phrase"><div class="txt"><div class="en">${esc(x.w)}</div><div class="ar">${esc(x.ar)}</div></div><span class="badge">${x.box}</span>
          <button class="act" data-say="${esc(x.w)}">${ic('speaker')}</button><button class="act" data-del="${i}">${ic('trash')}</button></div>`).join('') || '<div class="empty">لا توجد كلمات بعد.</div>'}</div>`;
        $('#nadd', cb).onclick = () => { addWord($('#nw', cb).value, $('#na', cb).value, ''); draw(); };
        cb.onclick = e => { const d = e.target.closest('[data-del]'); if (d && confirm('حذف الكلمة؟')) { S.words.splice(+d.dataset.del, 1); save(); draw(); } };
      }
    };
    draw();
  });
}

/* ---- links ---- */
function openLinks() {
  openPage('روابط مفيدة', body => {
    body.innerHTML = DATA.links.map(g => `<div class="set-group">${g.group}</div><div class="set">${g.items.map(([n, u, d]) => `
      <button class="srow" data-ext="${esc(u)}"><span class="ic">🔗</span><span class="lbl"><span class="en" style="text-align:right;display:block">${esc(n)}</span><small>${esc(d)}</small></span>${ic('ext')}</button>`).join('')}</div>`).join('');
  });
}

/* =========================================================
   HOME
   ========================================================= */
function renderHome(v) {
  const h = new Date().getHours();
  const greet = h < 12 ? 'صباح الخير ☀️' : h < 18 ? 'مساء الخير 🌤️' : 'مساء الخير 🌙';
  const mins = minsToday(), goal = S.set.goal, pct = Math.min(1, mins / goal);
  const C = 2 * Math.PI * 27;
  const w = DATA.words[dayIndex() % DATA.words.length];
  const tip = DATA.tips[dayIndex() % DATA.tips.length];
  const dlg = DATA.dialogues[dayIndex() % DATA.dialogues.length];
  const due = dueWords().length;
  v.innerHTML = `
  <div class="hero">
    <svg class="ring" viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="27"/><circle class="fg" cx="32" cy="32" r="27" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>
    <div class="ring-txt">${Math.round(pct * 100)}%</div>
    <h3>${greet}</h3><div style="opacity:.9;font-size:.85rem">${mins >= goal ? 'حققت هدف اليوم! 🎉' : `باقٍ ${goal - mins} دقيقة لهدفك اليومي`}</div>
    <div class="stats"><div class="stat"><b>${mins}</b><span>دقيقة اليوم</span></div><div class="stat"><b>${streak()}🔥</b><span>أيام متتالية</span></div><div class="stat"><b>${S.words.length}</b><span>كلمة محفوظة</span></div></div>
  </div>
  <div class="section"><h2>وصول سريع</h2></div>
  <div class="quick">
    <button data-q="pods"><span class="qi">🎙️</span>بودكاست</button><button data-q="chans"><span class="qi">📺</span>قنوات</button>
    <button data-q="radio"><span class="qi">📻</span>راديو</button><button data-q="dlg"><span class="qi">🎭</span>حوارات</button>
    <button data-q="pron"><span class="qi">🎯</span>النطق</button><button data-q="dict"><span class="qi">📖</span>القاموس</button>
    <button data-q="cards"><span class="qi">🃏</span>بطاقاتي${due ? ` (${due})` : ''}</button><button data-q="free"><span class="qi">🗣️</span>تحدّث</button>
  </div>
  ${S.recent.length ? `<div class="section"><h2>تابع الاستماع</h2></div><div class="list" id="recent">${S.recent.slice(0, 3).map((r, i) => {
    const pos = S.pos[r.url]; const pc = pos && pos.d ? pos.t / pos.d * 100 : 0;
    return `<button class="item" data-rc="${i}">${img(r.img, 'thumb', r.live ? '📻' : '🎙️')}<div class="info"><div class="t en">${esc(r.title)}</div><div class="s en">${esc(r.podName || '')}</div>${pc > 1 && !S.done[r.url] ? `<div class="prog"><i style="width:${pc}%"></i></div>` : ''}</div><span class="act">${ic('play')}</span></button>`;
  }).join('')}</div>` : ''}
  <div class="section"><h2>كلمة اليوم</h2></div>
  <div class="card wod"><div class="row"><div style="flex:1"><div class="w en">${esc(w[0])}</div><div>${esc(w[1])}</div></div>
    <button class="act" data-say="${esc(w[0])}">${ic('speaker')}</button><button class="act" id="wstar">${ic('star')}</button><button class="act" id="wdict">${ic('book')}</button></div>
    <div class="en muted" style="margin-top:8px">${esc(w[2])} <button data-say="${esc(w[2])}" style="vertical-align:middle">${ic('speaker')}</button></div></div>
  <div class="section"><h2>حوار اليوم</h2></div>
  <button class="item" id="hdlg"><div class="thumb">${dlg.icon}</div><div class="info"><div class="t en">${esc(dlg.title)}</div><div class="s">${esc(dlg.ar)}</div></div>${levelBadge(dlg.level)}</button>
  <div class="section"><h2>نصيحة اليوم 💡</h2></div>
  <div class="card">${esc(tip)}</div>`;
  $('.quick', v).onclick = e => {
    const b = e.target.closest('[data-q]'); if (!b) return; const q = b.dataset.q;
    if (q === 'pods') go('pods'); else if (q === 'chans') { chanTab = 'yt'; go('chans'); } else if (q === 'radio') { chanTab = 'radio'; go('chans'); } else openTool(q);
  };
  const rc = $('#recent', v);
  if (rc) rc.onclick = e => { const b = e.target.closest('[data-rc]'); if (!b) return; const r = S.recent[+b.dataset.rc]; if (P.cur && P.cur.url === r.url) openPlayer(); else { playItem(r, [r], 0); openPlayer(); } };
  $('#wstar', v).onclick = () => addWord(w[0], w[1], w[2]);
  $('#wdict', v).onclick = () => openDict(w[0]);
  $('#hdlg', v).onclick = () => openDialogue(dlg);
}

/* =========================================================
   SETTINGS / MORE
   ========================================================= */
const swRow = (k, ic_, l, sub) => `<button class="srow" data-sw="${k}"><span class="ic">${ic_}</span><span class="lbl">${l}${sub ? `<small>${sub}</small>` : ''}</span><span class="switch ${S.set[k] ? 'on' : ''}"></span></button>`;
const segRow = (k, ic_, l, opts, sub) => `<div class="srow"><span class="ic">${ic_}</span><span class="lbl">${l}${sub ? `<small>${sub}</small>` : ''}</span><div class="seg" data-seg="${k}">${opts.map(([v, t]) => `<button data-v="${v}" class="${String(S.set[k]) === String(v) ? 'on' : ''}">${t}</button>`).join('')}</div></div>`;
const rangeRow = (k, ic_, l, min, max, step, fmt) => `<div class="srow"><span class="ic">${ic_}</span><span class="lbl">${l}<small data-rv="${k}">${fmt(S.set[k])}</small></span><input type="range" data-range="${k}" min="${min}" max="${max}" step="${step}" value="${S.set[k]}"></div>`;
const linkRow = (id, ic_, l, sub) => `<button class="srow" data-act="${id}"><span class="ic">${ic_}</span><span class="lbl">${l}${sub ? `<small>${sub}</small>` : ''}</span><span class="flip">${ic('back')}</span></button>`;

function renderMore(v) {
  const s = S.set;
  const fmtX = x => (+x).toFixed(2).replace(/0$/, '') + 'x';
  v.innerHTML = `
  <div class="set-group">المظهر</div><div class="set">
    ${segRow('theme', '🌓', 'السمة', [['auto', 'تلقائي'], ['dark', 'داكن'], ['light', 'فاتح']])}
    <div class="srow"><span class="ic">🎨</span><span class="lbl">اللون الرئيسي</span><div class="swatches">${ACCENTS.map(c => `<button class="sw ${s.accent === c ? 'on' : ''}" data-acc="${c}" style="background:${c}"></button>`).join('')}</div></div>
    ${rangeRow('fontScale', '🔠', 'حجم الخط', 0.85, 1.3, 0.05, x => Math.round(x * 100) + '%')}
    ${swRow('showAr', 'ع', 'إظهار الترجمة العربية', 'في الحوارات والعبارات')}
    ${swRow('dataSaver', '📉', 'توفير البيانات', 'إخفاء الصور والأغلفة')}
  </div>
  <div class="set-group">التعلّم</div><div class="set">
    ${segRow('level', '📶', 'مستواي', [['all', 'الكل'], ['beginner', 'مبتدئ'], ['intermediate', 'متوسط'], ['advanced', 'متقدم']], 'يُستخدم كفلتر افتراضي')}
    ${segRow('goal', '🎯', 'الهدف اليومي (دقيقة)', [[5, '5'], [10, '10'], [15, '15'], [30, '30'], [60, '60']])}
  </div>
  <div class="set-group">الصوت والنطق</div><div class="set">
    ${segRow('ttsAccent', '🗣️', 'لهجة النطق', [['en-US', '🇺🇸 US'], ['en-GB', '🇬🇧 UK'], ['en-AU', '🇦🇺 AU']])}
    ${rangeRow('ttsRate', '⏩', 'سرعة النطق', 0.4, 1.5, 0.05, fmtX)}
    ${rangeRow('ttsPitch', '🎵', 'طبقة الصوت', 0.6, 1.6, 0.05, fmtX)}
    ${segRow('srLang', '🎤', 'لغة التعرّف على صوتك', [['en-US', 'US'], ['en-GB', 'UK']])}
    ${linkRow('ttsTest', '🔊', 'تجربة الصوت')}
  </div>
  <div class="set-group">التشغيل</div><div class="set">
    <div class="srow"><span class="ic">⏱️</span><span class="lbl">السرعة الافتراضية</span><select data-sel="speed">${SPEEDS.map(x => `<option value="${x}" ${+s.speed === x ? 'selected' : ''}>${x}x</option>`).join('')}</select></div>
    ${segRow('skip', '↔️', 'مدة التقديم/الترجيع (ث)', [[10, '10'], [15, '15'], [30, '30']])}
    ${swRow('autoNext', '⏭️', 'تشغيل الحلقة التالية تلقائياً')}
    ${swRow('bgPlay', '🎧', 'التشغيل في الخلفية', 'يستمر الصوت مع إشعار للتحكم')}
    ${swRow('keepScreen', '💡', 'إبقاء الشاشة مضاءة أثناء التشغيل')}
    ${swRow('subtitles', '💬', 'ترجمة إنجليزية تلقائية للفيديو (CC)')}
  </div>
  <div class="set-group">التذكير اليومي</div><div class="set">
    ${swRow('reminder', '⏰', 'تذكير يومي بالدراسة')}
    <div class="srow"><span class="ic">🕗</span><span class="lbl">وقت التذكير</span><input type="time" id="remTime" value="${esc(s.remTime)}"></div>
    ${linkRow('remTest', '🔔', 'تجربة الإشعار')}
  </div>
  <div class="set-group">المحتوى</div><div class="set">
    ${linkRow('mPods', '🎙️', 'إدارة البودكاست', 'إضافة/إخفاء/بحث في آلاف البرامج')}
    ${linkRow('mChans', '📺', 'إدارة القنوات', 'أضف أي قناة يوتيوب')}
    ${linkRow('mRadio', '📻', 'إدارة الإذاعات')}
    ${linkRow('links', '🔗', 'روابط مفيدة', 'مواقع وتطبيقات مختارة')}
  </div>
  <div class="set-group">إحصائياتي</div><div class="set"><div class="srow"><span class="ic">📊</span><span class="lbl">إجمالي وقت التعلّم<small>${totalMins()} دقيقة • ${Object.keys(S.done).length} حلقة مكتملة • ${S.spoken} جملة منطوقة</small></span></div>
    <div class="srow" style="align-items:flex-end;gap:4px;height:90px" id="week"></div></div>
  <div class="set-group">البيانات</div><div class="set">
    ${linkRow('export', '📤', 'نسخ احتياطي', 'تصدير الإعدادات والكلمات والتقدّم')}
    ${linkRow('import', '📥', 'استعادة نسخة احتياطية')}
    ${linkRow('cache', '🧹', 'مسح الذاكرة المؤقتة', 'إعادة جلب الروابط والصور')}
    ${linkRow('reset', '♻️', 'إعادة ضبط كل شيء')}
  </div>
  <div class="set-group">عن التطبيق</div><div class="set"><div class="srow"><span class="ic">🎧</span><span class="lbl">English Hub ${NATIVE ? Android.version() : ''}<small>بودكاست وقنوات وإذاعات ومحادثة لتعلّم الإنجليزية. المحتوى مملوك لأصحابه ويُجلب من مصادره الرسمية.</small></span></div></div>
  <div style="height:20px"></div>`;

  // weekly chart
  const wk = $('#week', v); const days = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push([d, Math.floor((S.stats[dkey(d)] || 0) / 60)]); }
  const mx = Math.max(s.goal, ...days.map(x => x[1]));
  wk.innerHTML = days.map(([d, m]) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px"><span class="small muted">${m}</span><div style="width:70%;height:${Math.max(3, m / mx * 46)}px;background:${m >= s.goal ? 'var(--ok)' : 'var(--accent)'};border-radius:5px"></div><span class="small muted">${d.toLocaleDateString('ar', { weekday: 'narrow' })}</span></div>`).join('');

  v.onclick = e => {
    const sw = e.target.closest('[data-sw]');
    if (sw) {
      const k = sw.dataset.sw; s[k] = !s[k]; save(); $('.switch', sw).classList.toggle('on', s[k]);
      if (k === 'dataSaver') applyTheme();
      if (k === 'reminder') setReminder();
      if (k === 'bgPlay' || k === 'keepScreen') notifyNative();
      return;
    }
    const sg = e.target.closest('.seg[data-seg] button');
    if (sg) {
      const seg = sg.parentElement, k = seg.dataset.seg; const raw = sg.dataset.v;
      s[k] = isNaN(+raw) ? raw : +raw; save();
      $$('button', seg).forEach(b => b.classList.toggle('on', b === sg));
      if (k === 'theme') applyTheme();
      if (k === 'level') { podLevel = chanLevel = null; }
      if (k === 'ttsAccent') speak('Hello! This is my voice.');
      return;
    }
    const ac = e.target.closest('[data-acc]');
    if (ac) { s.accent = ac.dataset.acc; save(); applyTheme(); $$('.sw', v).forEach(x => x.classList.toggle('on', x === ac)); return; }
    const a = e.target.closest('[data-act]');
    if (a) moreAction(a.dataset.act);
  };
  $$('[data-range]', v).forEach(r => r.oninput = () => {
    const k = r.dataset.range; s[k] = +r.value; save();
    const lab = $(`[data-rv="${k}"]`, v); lab.textContent = k === 'fontScale' ? Math.round(s[k] * 100) + '%' : fmtX(s[k]);
    if (k === 'fontScale') applyTheme();
  });
  $('[data-sel="speed"]', v).onchange = e => { s.speed = +e.target.value; save(); if (P.cur && !P.cur.live) A.playbackRate = s.speed; };
  $('#remTime', v).onchange = e => { s.remTime = e.target.value || '20:00'; save(); setReminder(); };
}
function setReminder() {
  const s = S.set;
  if (!NATIVE) { toast('التذكير يعمل داخل تطبيق أندرويد'); return; }
  const [h, m] = (s.remTime || '20:00').split(':').map(Number);
  if (s.reminder && Android.needNotifPermission()) Android.requestNotifPermission();
  Android.setReminder(!!s.reminder, h || 0, m || 0);
  if (s.reminder) toast('سيصلك تذكير يومياً الساعة ' + s.remTime);
}
window.__notifPerm = ok => { if (!ok) toast('يجب السماح بالإشعارات ليعمل التذكير'); };

function moreAction(k) {
  switch (k) {
    case 'ttsTest': speak('Hello! I am your English practice partner. How are you today?'); break;
    case 'remTest': if (NATIVE) { if (Android.needNotifPermission()) Android.requestNotifPermission(); Android.testReminder(); } else toast('متاح في التطبيق فقط'); break;
    case 'mPods': managePods(); break;
    case 'mChans': manageChans(); break;
    case 'mRadio': manageRadios(); break;
    case 'links': openLinks(); break;
    case 'cache':
      S.cache = { feeds: {}, art: {}, ytid: {}, radio: {}, titles: {} };
      Object.keys(feedMem).forEach(x => delete feedMem[x]); save(true);
      if (NATIVE) Android.clearCache(); toast('تم مسح الذاكرة المؤقتة'); break;
    case 'export': {
      const data = JSON.stringify({ app: 'EnglishHub', v: 1, set: S.set, pods: S.pods, chans: S.chans, radios: S.radios, hidden: S.hidden, favs: S.favs, words: S.words, stats: S.stats, done: S.done, spoken: S.spoken });
      openPage('نسخ احتياطي', body => {
        body.innerHTML = `<div class="small muted">انسخ هذا النص واحفظه في مكان آمن (ملاحظات، بريد…). يمكنك استعادته لاحقاً من "استعادة نسخة احتياطية".</div>
          <textarea rows="10" class="en" style="margin-top:10px;font-size:.75rem" readonly>${esc(data)}</textarea>
          <div class="row" style="gap:8px;margin-top:10px"><button class="btn" id="bc">${ic('copy')} نسخ</button><button class="btn ghost" id="bs">${ic('share')} مشاركة</button></div>`;
        $('#bc', body).onclick = () => copyText(data);
        $('#bs', body).onclick = () => shareText(data);
      });
      break;
    }
    case 'import':
      openPage('استعادة نسخة احتياطية', body => {
        body.innerHTML = `<textarea rows="10" id="imp" class="en" placeholder="ألصق النسخة الاحتياطية هنا"></textarea><button class="btn block" style="margin-top:10px" id="ido">استعادة</button>`;
        $('#ido', body).onclick = () => {
          try {
            const d = JSON.parse($('#imp', body).value);
            if (d.app !== 'EnglishHub') throw 0;
            ['pods', 'chans', 'radios', 'hidden', 'favs', 'words', 'stats', 'done'].forEach(k => { if (d[k]) S[k] = d[k]; });
            if (d.set) S.set = Object.assign({}, DEF_SET, d.set);
            if (d.spoken) S.spoken = d.spoken;
            save(true); applyTheme(); toast('تمت الاستعادة ✓'); closePage(); go('more');
          } catch (e) { toast('النص غير صالح'); }
        };
      });
      break;
    case 'reset':
      if (confirm('سيتم حذف كل الإعدادات والكلمات والتقدّم. متابعة؟')) { localStorage.removeItem('eh'); S = loadState(); stopPlayer(); applyTheme(); go('home'); toast('تمت إعادة الضبط'); }
      break;
  }
}

/* ---- manage podcasts ---- */
function managePods() {
  openPage('إدارة البودكاست', body => {
    const draw = () => {
      body.innerHTML = `<div class="card"><b>ابحث في دليل البودكاست العالمي</b><div class="small muted">مثال: English conversation, IELTS, grammar, stories</div>
        <div class="search" style="margin-top:8px"><input id="pq" class="en" placeholder="Search podcasts…"><button class="btn" id="pgo">${ic('search')}</button></div><div id="pres"></div></div>
        <div class="card" style="margin-top:10px"><b>أو أضف رابط RSS مباشرة</b><div class="search" style="margin-top:8px"><input id="prss" class="en" placeholder="https://…/feed.xml"><button class="btn" id="padd">${ic('plus')}</button></div></div>
        <div class="set-group">البرامج الحالية (أطفئ لإخفاء البرنامج)</div>
        <div class="set">${allPods(true).map(p => `<div class="srow"><span class="lbl en" style="text-align:right">${esc(p.name)}<small>${esc(p.by || '')}</small></span>
          ${p.custom ? `<button class="act" data-del="${esc(p.id)}">${ic('trash')}</button>` : ''}<button class="switch ${S.hidden[p.id] ? '' : 'on'}" data-hide="${esc(p.id)}"></button></div>`).join('')}</div>
        <button class="btn ghost block" style="margin-top:12px" id="prestore">إظهار كل البرامج الافتراضية</button>`;
      const doSearch = async () => {
        const q = $('#pq', body).value.trim(); if (!q) return;
        const out = $('#pres', body); out.innerHTML = spinner();
        try {
          const j = await getJSON(`https://itunes.apple.com/search?media=podcast&entity=podcast&limit=20&term=${encodeURIComponent(q)}`);
          const r = (j.results || []).filter(x => x.feedUrl);
          out.innerHTML = r.length ? `<div class="list" style="margin-top:8px">${r.map((x, i) => `<div class="item">${img(x.artworkUrl100, 'thumb', '🎙️')}<div class="info"><div class="t en">${esc(x.collectionName)}</div><div class="s en">${esc(x.artistName)}</div></div><button class="act" data-a="${i}">${ic('plus')}</button></div>`).join('')}</div>` : '<div class="empty">لا نتائج.</div>';
          out.onclick = e => {
            const b = e.target.closest('[data-a]'); if (!b) return; const x = r[+b.dataset.a];
            const id = 'it_' + x.collectionId;
            if (allPods(true).some(p => p.id === id || p.feed === x.feedUrl)) { toast('موجود مسبقاً'); return; }
            S.pods.push({ id, custom: 1, name: x.collectionName, by: x.artistName, feed: x.feedUrl, level: '', desc: x.primaryGenreName || '' });
            S.cache.art[id] = x.artworkUrl600 || x.artworkUrl100; save(); toast('تمت الإضافة ✓'); b.innerHTML = ic('check');
          };
        } catch (e) { out.innerHTML = '<div class="empty">تعذّر البحث الآن.</div>'; }
      };
      $('#pgo', body).onclick = doSearch;
      $('#pq', body).onkeydown = e => { if (e.key === 'Enter') doSearch(); };
      $('#padd', body).onclick = async () => {
        const u = $('#prss', body).value.trim(); if (!/^https?:\/\//.test(u)) { toast('أدخل رابطاً صحيحاً'); return; }
        toast('جاري التحقق…');
        try {
          const f = parseFeed(await getText(u, 2500000));
          if (!f.eps.length) throw 0;
          const id = 'rss_' + Date.now();
          S.pods.push({ id, custom: 1, name: f.title || u, by: '', feed: u, level: '', desc: '' });
          if (f.art) S.cache.art[id] = f.art; save(); toast('تمت الإضافة ✓'); draw();
        } catch (e) { toast('الرابط لا يحتوي على بودكاست صالح'); }
      };
      body.querySelector('.set').onclick = e => {
        const h = e.target.closest('[data-hide]'), d = e.target.closest('[data-del]');
        if (h) { const id = h.dataset.hide; if (S.hidden[id]) delete S.hidden[id]; else S.hidden[id] = 1; save(); h.classList.toggle('on', !S.hidden[id]); }
        if (d && confirm('حذف هذا البرنامج؟')) { S.pods = S.pods.filter(p => p.id !== d.dataset.del); save(); draw(); }
      };
      $('#prestore', body).onclick = () => { Object.keys(S.hidden).filter(k => !k.includes(':')).forEach(k => delete S.hidden[k]); save(); draw(); };
    };
    draw();
  }, { onClose: () => tab === 'pods' && go('pods') });
}

/* ---- manage channels ---- */
function parseChannelInput(s) {
  s = s.trim();
  let m = s.match(/(UC[\w-]{22})/); if (m) return { id: m[1] };
  m = s.match(/@([\w.\-]+)/); if (m) return { handle: '@' + m[1] };
  m = s.match(/youtube\.com\/(?:c|user)\/([\w.\-]+)/); if (m) return { handle: (s.includes('/user/') ? 'user/' : 'c/') + m[1] };
  if (/^[\w.\-]+$/.test(s)) return { handle: '@' + s };
  return null;
}
function manageChans() {
  openPage('إدارة القنوات', body => {
    const draw = () => {
      body.innerHTML = `<div class="card"><b>أضف قناة يوتيوب</b><div class="small muted">ألصق رابط القناة أو اسمها مثل <span class="kbd">@bbclearningenglish</span></div>
        <div class="search" style="margin-top:8px"><input id="cin" class="en" placeholder="@channel or https://youtube.com/@…"><button class="btn" id="cadd">${ic('plus')}</button></div>
        <div class="seg" id="clv" style="margin-top:6px"><button data-v="beginner">مبتدئ</button><button data-v="intermediate" class="on">متوسط</button><button data-v="advanced">متقدم</button></div></div>
        <div class="set-group">القنوات (أطفئ للإخفاء)</div>
        <div class="set">${allChans(true).map(c => `<div class="srow"><span class="lbl en" style="text-align:right">${esc(c.name)}<small>${esc(c.handle || c.id)}</small></span>
          ${c.custom ? `<button class="act" data-del="${esc(c.key)}">${ic('trash')}</button>` : ''}<button class="switch ${S.hidden['yt:' + c.key] ? '' : 'on'}" data-hide="${esc(c.key)}"></button></div>`).join('')}</div>`;
      let lv = 'intermediate';
      $('#clv', body).onclick = e => { const b = e.target.closest('[data-v]'); if (b) { lv = b.dataset.v; $$('#clv button', body).forEach(x => x.classList.toggle('on', x === b)); } };
      $('#cadd', body).onclick = async () => {
        const p = parseChannelInput($('#cin', body).value);
        if (!p) { toast('صيغة غير معروفة'); return; }
        const key = p.id || p.handle;
        if (allChans(true).some(c => c.key === key || c.id === p.id)) { toast('القناة موجودة مسبقاً'); return; }
        toast('جاري التحقق من القناة…');
        try {
          const c = { id: p.id || '', handle: p.handle || '', key, custom: 1, level: lv, name: key, desc: '' };
          const f = await ytFeed(c);
          c.id = f.id; c.name = f.title || key;
          S.chans.push(c); save(); toast('تمت إضافة ' + c.name + ' ✓'); draw();
        } catch (e) { toast('تعذّر العثور على القناة'); }
      };
      body.querySelector('.set').onclick = e => {
        const h = e.target.closest('[data-hide]'), d = e.target.closest('[data-del]');
        if (h) { const k = 'yt:' + h.dataset.hide; if (S.hidden[k]) delete S.hidden[k]; else S.hidden[k] = 1; save(); h.classList.toggle('on', !S.hidden[k]); }
        if (d && confirm('حذف القناة؟')) { S.chans = S.chans.filter(c => c.key !== d.dataset.del); save(); draw(); }
      };
    };
    draw();
  }, { onClose: () => tab === 'chans' && go('chans') });
}
function manageRadios() {
  openPage('إدارة الإذاعات', body => {
    const draw = () => {
      body.innerHTML = `<div class="small muted" style="margin-bottom:8px">للبحث عن إذاعات جديدة وإضافتها افتح تبويب "قنوات" ← "راديو مباشر" واستخدم البحث ثم اضغط +</div>
        <div class="set">${allRadios(true).map(r => `<div class="srow"><span class="lbl en" style="text-align:right">${esc(r.name)}<small>${esc(r.desc || '')}</small></span>
        ${r.url ? `<button class="act" data-del="${esc(r.id)}">${ic('trash')}</button>` : ''}<button class="switch ${S.hidden['r:' + r.id] ? '' : 'on'}" data-hide="${esc(r.id)}"></button></div>`).join('')}</div>`;
      body.querySelector('.set').onclick = e => {
        const h = e.target.closest('[data-hide]'), d = e.target.closest('[data-del]');
        if (h) { const k = 'r:' + h.dataset.hide; if (S.hidden[k]) delete S.hidden[k]; else S.hidden[k] = 1; save(); h.classList.toggle('on', !S.hidden[k]); }
        if (d && confirm('حذف الإذاعة؟')) { S.radios = S.radios.filter(r => r.id !== d.dataset.del); save(); draw(); }
      };
    };
    draw();
  });
}

/* =========================================================
   INIT
   ========================================================= */
function init() {
  applyTheme();
  $('#btnDict').innerHTML = ic('book');
  $('#btnDict').onclick = () => openDict();
  $('#btnTheme').onclick = () => { S.set.theme = curTheme() === 'dark' ? 'light' : 'dark'; save(); applyTheme(); if (tab === 'more') go('more'); };
  go('home');
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { savePos(); save(true); } });
  window.addEventListener('pagehide', () => save(true));
}
init();
