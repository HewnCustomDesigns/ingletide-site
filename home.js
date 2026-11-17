const A = {"logo": "/img/icon-512.png", "fire": {"logs": "/img/fire/logs.png", "back": "/img/fire/back.png", "front": "/img/fire/front.png", "core": "/img/fire/core.png"}};
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = id => document.getElementById(id);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = t => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

document.querySelectorAll('img.logo').forEach(i => i.src = A.logo);
// Official store badges (Google Play, App Store), one size
document.querySelectorAll('[data-stores]').forEach(el => {
  el.innerHTML = '<a class="store" href="https://play.google.com/store/apps/details?id=com.hewncustomdesigns.hearth"><img src="/img/badges/google-play.png" alt="Get it on Google Play" width="564" height="168"></a>' +
                 '<a class="store" href="https://apps.apple.com/app/id6834680745"><img src="/img/badges/app-store.svg" alt="Download on the App Store" width="120" height="40"></a>';
});

/* Hero phone fire (stage: campfire) */
(function () {
  const el = document.createElement('div'); el.className = 'fire'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="glow"></div>';
  [['logs', A.fire.logs], ['back', A.fire.back], ['front', A.fire.front], ['core', A.fire.core]].forEach(([c, s]) => { const i = document.createElement('img'); i.src = s; i.alt = ''; i.className = c; el.appendChild(i); });
  if ($('phone-slot')) $('phone-slot').appendChild(el);
})();

/* The photo being taken: lunch on a wooden table, seen from above */
const PHOTO = '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="lt" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#FFE1A1" stop-opacity=".35"/><stop offset="1" stop-color="#120D0B" stop-opacity=".55"/></radialGradient></defs>' +
  '<rect width="400" height="300" fill="#7D5440"/>' +
  [30, 75, 120, 165, 210, 255].map(y => '<rect x="0" y="' + y + '" width="400" height="2" fill="#6B4632" opacity=".7"/>').join('') +
  '<circle cx="150" cy="150" r="70" fill="#F5EEE4"/><circle cx="150" cy="150" r="54" fill="#E8D2B0"/>' +
  '<path d="M112 150 q38 -40 76 0 q-38 30 -76 0z" fill="#C8742A"/><circle cx="135" cy="140" r="7" fill="#6E8B3D"/><circle cx="160" cy="160" r="6" fill="#6E8B3D"/><circle cx="168" cy="138" r="5" fill="#B5432B"/>' +
  '<circle cx="290" cy="95" r="42" fill="#F5EEE4"/><circle cx="290" cy="95" r="30" fill="#8C3B23"/><circle cx="282" cy="88" r="5" fill="#E8D2B0" opacity=".7"/>' +
  '<rect x="270" y="190" width="70" height="44" rx="8" fill="#E8D2B0"/><rect x="278" y="198" width="54" height="28" rx="5" fill="#C8742A" opacity=".8"/>' +
  '<circle cx="62" cy="62" r="20" fill="#F5EEE4"/><circle cx="62" cy="62" r="13" fill="#6B4632"/><path d="M80 58 q12 4 0 10" stroke="#F5EEE4" stroke-width="5" fill="none"/>' +
  '<circle cx="66" cy="238" r="20" fill="#F5EEE4"/><circle cx="66" cy="238" r="13" fill="#6B4632"/>' +
  '<rect x="214" y="40" width="10" height="70" rx="5" fill="#B9A99A" transform="rotate(20 219 75)"/>' +
  '<rect width="400" height="300" fill="url(#lt)"/></svg>';
document.querySelectorAll('[data-photo]').forEach(el => el.innerHTML = PHOTO);

/* ---- The gathering: one film in three chapters, one per section ----
   Section 1 loops coffee for two (with a call in the middle).
   Section 2 plays on from there: a double date, then stops.
   Section 3 plays on: game night, then Sunday dinner, then stops.
   Scrolling back jumps to the end of that section's chapter. */
const gather = $('gather'), tbl = $('tbl'), occ = $('occasion');
const PEOPLE = [
  ['Maya', 'M', '#F2A541'], ['Jordan', 'J', '#E8843C'], ['Sam', 'S', '#FFE1A1'], ['Alex', 'A', '#E8D2B0'],
  ['Rosa', 'R', '#E8843C'], ['Lee', 'L', '#F2A541'], ['Dad', 'D', '#E8D2B0'], ['Nana', 'N', '#FFE1A1'],
  ['Theo', 'T', '#F2A541'], ['Ivy', 'I', '#E8843C']
];
const people = PEOPLE.map(([name, ini, c], k) => {
  const el = document.createElement('div'); el.className = 'person'; el.style.setProperty('--c', c);
  el.style.setProperty('--fd', (5 + (k * 7) % 4) + 's'); el.style.setProperty('--fdel', (-(k * 1.3) % 5) + 's');
  el.innerHTML = '<div class="in">' + ini + '</div><div class="nm">' + name + '</div>';
  el.style.opacity = 0;
  const ph = document.createElement('div'); ph.className = 'ph'; ph.style.opacity = 0;
  gather.appendChild(el); gather.appendChild(ph);
  return { el, ph, shown: false, down: false, seat: null };
});
const tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = 'Phone unlocked'; tag.style.opacity = 0; gather.appendChild(tag);

// Each gathering has its own table in its own part of the scene, with the name above it
const STEPS = [
  { name: 'Coffee for two', n: 2, size: 15, t: { x: 34, y: 44, w: 21, h: 21, r: '50%' }, label: [34, 18],
    seats: [[13, 44], [55, 44]] },
  { name: 'Double date', n: 4, size: 14, t: { x: 62, y: 54, w: 30, h: 19, r: '4cqw' }, label: [62, 15],
    seats: [[50, 33], [74, 33], [50, 75], [74, 75]] },
  { name: 'Game night', n: 6, size: 13, t: { x: 44, y: 57, w: 30, h: 28, r: '3cqw' }, game: true, label: [44, 12],
    seats: [[32, 34], [56, 34], [18, 57], [70, 57], [32, 80], [56, 80]] },
  { name: 'Sunday dinner', n: 10, size: 11.5, t: { x: 50, y: 60, w: 76, h: 16, r: '3cqw' }, label: [50, 17],
    seats: [[20, 43], [35, 43], [50, 43], [65, 43], [80, 43], [20, 77], [35, 77], [50, 77], [65, 77], [80, 77]] }
];
// Where each person walks in from (and leaves to)
const ENTRY = [[-14, 44], [114, 44], [50, 116], [86, 116], [-14, 30], [114, 70], [-14, 86], [114, 22], [40, -14], [70, 116]];

let step = 0;
function setTable(st) {
  Object.assign(tbl.style, { left: st.t.x + '%', top: st.t.y + '%', width: st.t.w + '%', height: st.t.h + '%', borderRadius: st.t.r, opacity: 1 });
  tbl.classList.toggle('game', !!st.game);
  occ.style.left = st.label[0] + '%'; occ.style.top = st.label[1] + '%';
}
function phoneSpot(k) {
  const st = STEPS[step], p = people[k];
  const [sx, sy] = p.seat;
  if (p.down) return { x: lerp(sx, st.t.x, 0.74) + (k % 2 ? 1.2 : -1.2), y: lerp(sy, st.t.y, 0.7), r: 90 + (k % 3 - 1) * 6 };
  return { x: sx + (sx < st.t.x ? -9.5 : 9.5), y: sy + 1, r: 0 };
}
function placeAll() {
  const st = STEPS[step];
  people.forEach((p, k) => {
    if (!p.shown || !st.seats[k]) return;
    p.seat = st.seats[k];
    p.el.style.left = p.seat[0] + '%'; p.el.style.top = p.seat[1] + '%'; p.el.style.width = st.size + '%';
    const q = phoneSpot(k);
    p.ph.style.left = q.x + '%'; p.ph.style.top = q.y + '%'; p.ph.style.rotate = q.r + 'deg';
  });
}
function enter(k) {
  const p = people[k], st = STEPS[step];
  if (p.shown) return;
  p.shown = true; p.down = false; p.seat = st.seats[k];
  p.el.classList.remove('on', 'call'); p.ph.classList.remove('dark', 'ring');
  const [ex, ey] = ENTRY[k];
  [p.el, p.ph].forEach(e => e.style.transition = 'none');
  p.el.style.left = ex + '%'; p.el.style.top = ey + '%'; p.el.style.width = st.size + '%';
  p.ph.style.left = ex + '%'; p.ph.style.top = ey + '%'; p.ph.style.rotate = '0deg';
  void p.el.offsetWidth;
  [p.el, p.ph].forEach(e => e.style.transition = '');
  p.el.style.opacity = 1; p.ph.style.opacity = 1;
  placeAll();
}
function leave(k) {
  const p = people[k];
  if (!p.shown) return;
  p.shown = false; p.down = false;
  const [ex, ey] = ENTRY[k];
  p.el.style.left = ex + '%'; p.el.style.top = ey + '%'; p.el.style.opacity = 0;
  p.ph.style.left = ex + '%'; p.ph.style.top = ey + '%'; p.ph.style.opacity = 0;
  p.el.classList.remove('on', 'call'); p.ph.classList.remove('dark', 'ring');
}
function phoneDown(k) { const p = people[k]; p.down = true; p.ph.classList.add('dark'); p.el.classList.remove('call'); p.el.classList.add('on'); placeAll(); }
function phoneUp(k) { const p = people[k]; p.down = false; p.ph.classList.remove('dark'); p.el.classList.remove('on'); p.el.classList.add('call'); placeAll(); }
function label(st) {
  const b = $('occ-name');
  if (b.textContent === st.name) return;
  b.style.opacity = 0; b.style.translate = '0 -0.6em';
  gAt(220, () => {
    b.textContent = st.name;
    b.style.transition = 'none'; b.style.translate = '0 0.6em'; void b.offsetWidth; b.style.transition = '';
    b.style.opacity = 1; b.style.translate = '0 0';
  });
}
function goStep(i) { step = i; setTable(STEPS[i]); label(STEPS[i]); placeAll(); }

// The end of each chapter, as a state to jump to
function settle(i) {
  const n = STEPS[i].n;
  people.forEach((p, k) => { if (k >= n) leave(k); });
  goStep(i);
  tag.style.opacity = 0;
  people.forEach((p, k) => {
    if (k < n) { if (!p.shown) enter(k); p.down = true; p.ph.classList.add('dark'); p.el.classList.remove('call'); p.el.classList.add('on'); p.ph.classList.remove('ring'); }
    else leave(k);
  });
  placeAll();
}

let gTimers = [], chapter = -1;
function gAt(ms_, fn) { gTimers.push(setTimeout(fn, ms_)); }
function clearTimers() { gTimers.forEach(clearTimeout); gTimers = []; }
function gReset() {
  clearTimers(); step = 0; tag.style.opacity = 0; tbl.style.opacity = 0;
  people.forEach((p, k) => { p.shown = false; p.down = false; p.el.style.opacity = 0; p.ph.style.opacity = 0; p.el.classList.remove('on', 'call'); p.ph.classList.remove('dark', 'ring'); });
  gather.classList.remove('fadeout');
}

// Chapter 1: two people sit down and put their phones down (once), then one unlocks and locks again, on a loop
function unlockLoop(delay) {
  gAt(delay, () => { phoneUp(1);
    const s = people[1].seat; tag.style.left = s[0] + '%'; tag.style.top = (s[1] + 12) + '%'; tag.style.opacity = 1; });
  gAt(delay + 2400, () => { tag.style.opacity = 0; phoneDown(1); });
  gAt(delay + 4400, () => { if (chapter === 0) unlockLoop(0); });
}
function chapter1() {
  gReset(); goStep(0);
  gAt(300, () => enter(0)); gAt(550, () => enter(1));
  gAt(1900, () => phoneDown(0)); gAt(2300, () => phoneDown(1));
  unlockLoop(3800);
}
// Chapter 2: a double date
function chapter2() {
  clearTimers(); settle(0);
  gAt(500, () => goStep(1));
  gAt(800, () => enter(2)); gAt(1050, () => enter(3));
  gAt(2300, () => phoneDown(2)); gAt(2600, () => phoneDown(3));
}
// Chapter 3: game night, then Sunday dinner
function chapter3() {
  clearTimers(); settle(1);
  gAt(500, () => goStep(2));
  gAt(800, () => enter(4)); gAt(1050, () => enter(5));
  gAt(2200, () => phoneDown(4)); gAt(2500, () => phoneDown(5));
  gAt(4000, () => goStep(3));
  [6, 7, 8, 9].forEach((k, i) => gAt(4300 + i * 220, () => enter(k)));
  [6, 7, 8, 9].forEach((k, i) => gAt(5800 + i * 300, () => phoneDown(k)));
}
function setChapter(c) {
  if (c === chapter) return;
  const prev = chapter; chapter = c;
  if (c < 0) { gReset(); return; }
  if (reduce) { clearTimers(); gather.classList.remove('fadeout'); settle(c === 0 ? 0 : c === 1 ? 1 : 3); return; }
  if (c === 0) { if (prev > 0) { clearTimers(); settle(0); unlockLoop(1400); } else chapter1(); return; }
  gather.classList.remove('fadeout');
  if (c > prev) (c === 1 ? chapter2 : chapter3)();       // play forward from here
  else { clearTimers(); settle(1); }                     // scrolled back: the double date, already seated
}

/* ---- Season of evenings ---- */
const heat = $('heat'); const cells = [];
let seed = 11; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
const shades = ['#5a3f2a', 'var(--track)', '#c27c3a', 'var(--present)'];
for (let w = 0; w < 26 * 7; w++) {
  const i = document.createElement('i'); const r = rnd(); const weekend = (w % 7) >= 4;
  const lvl = r > (weekend ? 0.5 : 0.85) ? (r > 0.93 ? 3 : r > 0.8 ? 2 : r > 0.68 ? 1 : 0) : -1;
  heat.appendChild(i); cells.push({ i, lvl });
}

/* ---- Capturing a moment: a photo (one section), then a note (the next) ---- */
/* The photo-and-note phone: the rebuilt session page for a Sunday lunch, with the
   app's own dialogs and sheets on top (they're animated below). */
(function () {
  const I = APP_ICONS, av = APP_AV;
  const who = (l, n, p, t, w) => `<div class="who">${av(l, 48)}<div class="tx"><div class="top"><span>${n}</span><em><b>${p}</b> of ${t}</em></div><div class="bar"><b style="width:${w}%"></b></div></div></div>`;
  $('mph').innerHTML = `<div class="screen-slot" data-fit><div class="as ms" id="ms">${APP_STATUSBAR('3:41')}
    <div class="msc" id="msc">
      <div class="sm-head">${I.back('#F5EEE4')}<div class="tt"><b>Sunday lunch</b><span>Sunday, Nov 15 · 12:30 pm to 3:35 pm</span></div><span class="sh">${I.share('#F5EEE4')}</span></div>
      <div class="sm-card">${APP_FIRE(5)}<span class="num">3h 05m</span><span class="cap">present together, phones down</span><div class="bar"><b style="width:92%"></b></div><div class="leg"><span class="p">Present 3h 05m</span><span>Together 3h 20m</span></div></div>
      <div class="sec"><span class="lbl">Who was there</span>${who('M', 'Maya', '3h 05m', '3h 20m', 92)}${who('D', 'Dad', '2h 58m', '3h 20m', 89)}${who('N', 'Nana', '2h 41m', '3h 05m', 87)}</div>
      <div class="sec">
        <span class="lbl" id="m-photos-l" style="display:none">Photos</span><div class="photo sphoto" id="m-photo"></div>
        <span class="lbl" id="m-notes-l" style="display:none">Notes</span><div class="note snote" id="m-note"></div>
        <span class="lbl" id="m-your">Your moment</span>
        <div class="tiles"><div class="tile" id="t-photo">${I.camera('#F2A541')}Add a photo</div><div class="tile" id="t-note">${I.pencil('#F2A541')}Add a note</div></div>
        <div style="height:40px"></div>
      </div>
    </div>
    <div class="layer dialog" id="l-ask"><div class="dlg"><h4>Add a photo</h4><span id="o-take">Take a photo</span><span>Choose from your photos</span><span class="c">Cancel</span></div></div>
    <div class="layer vf" id="l-cam"><div class="view" data-photo></div><div class="shutter" id="o-shutter"></div></div>
    <div class="layer flash" id="l-flash"></div>
    <div class="layer pv" id="l-prev"><h4>Your photo</h4><div class="ph2" data-photo></div><div class="btn" id="o-use">Use this photo</div><div class="btn sec">Choose another</div></div>
    <div class="layer sheet" id="l-sheet"><div class="sh"><div class="row"><span class="cancel">Cancel</span><b>Your note</b><span class="save" id="o-save">Save</span></div><div class="input" id="typed"><span class="ph3">A few words to remember it by</span></div><div class="kb"></div></div></div>
    <div class="finger" id="finger"></div>
  </div></div>`;
  $('mph').querySelectorAll('[data-photo]').forEach(el => el.innerHTML = PHOTO);
  mountScreens($('mph'));
})();
// Scroll the session page so whatever was just added is in view
function scrollMoment(smooth) {
  const sc = $('msc');
  sc.style.scrollBehavior = smooth ? 'smooth' : 'auto';
  sc.scrollTop = sc.scrollHeight;
}

const ms = $('ms'), finger = $('finger');
const NOTE = 'Dad finally taught me his chili. Still won’t tell me the secret ingredient.';
let timers = [], mode = null;
function at(ms_, fn) { timers.push(setTimeout(fn, ms_)); }
function layer(id, on) { $(id).classList.toggle('on', on); }
function tapAt(id, when, after) {
  at(when, () => {
    const r = $(id).getBoundingClientRect(), s = ms.getBoundingClientRect();
    finger.style.left = ((r.left + r.width / 2 - s.left) / s.width * 100) + '%';
    finger.style.top = ((r.top + r.height / 2 - s.top) / s.height * 100) + '%';
    finger.classList.add('on');
  });
  at(when + 550, () => finger.classList.add('press'));
  at(when + 750, () => { finger.classList.remove('press'); after && after(); });
  at(when + 950, () => finger.classList.remove('on'));
}
function showPhoto(on) {
  $('m-photo').innerHTML = on ? PHOTO : ''; $('m-photo').classList.toggle('show', on);
  $('m-photos-l').style.display = on ? '' : 'none'; $('t-photo').style.display = on ? 'none' : '';
}
function showNote(on) {
  $('m-note').innerHTML = on ? '<div class="q">“' + NOTE + '”</div><div class="by">Maya</div>' : ''; $('m-note').classList.toggle('show', on);
  $('m-notes-l').style.display = on ? '' : 'none'; $('t-note').style.display = on ? 'none' : '';
  $('m-your').style.display = on && $('t-photo').style.display === 'none' ? 'none' : '';
}
function resetMoment(photo) {
  timers.forEach(clearTimeout); timers = [];
  ['l-ask', 'l-cam', 'l-flash', 'l-prev', 'l-sheet'].forEach(id => layer(id, false));
  finger.classList.remove('on', 'press');
  showPhoto(photo); showNote(false);
  const sc = $('msc'); sc.style.scrollBehavior = 'auto'; sc.scrollTop = 0;
  $('typed').innerHTML = '<span class="ph3">A few words to remember it by</span>';
}
function playPhoto() {
  resetMoment(false); mode = 'photo';
  tapAt('t-photo', 700, () => layer('l-ask', true));
  tapAt('o-take', 1900, () => { layer('l-ask', false); layer('l-cam', true); });
  tapAt('o-shutter', 3700, () => layer('l-flash', true));
  at(4600, () => { layer('l-flash', false); layer('l-cam', false); layer('l-prev', true); });
  tapAt('o-use', 5300, () => { layer('l-prev', false); showPhoto(true); scrollMoment(true); });
  at(9800, () => { if (mode === 'photo') playPhoto(); });
}
function playNote() {
  resetMoment(true); scrollMoment(false); mode = 'note';
  tapAt('t-note', 700, () => { layer('l-sheet', true); $('typed').innerHTML = '<span class="caret"></span>'; });
  const start = 1600;
  for (let i = 1; i <= NOTE.length; i++) at(start + i * 45, () => { $('typed').innerHTML = NOTE.slice(0, i) + '<span class="caret"></span>'; });
  const done = start + NOTE.length * 45 + 500;
  tapAt('o-save', done, () => { layer('l-sheet', false); showNote(true); scrollMoment(true); });
  at(done + 4500, () => { if (mode === 'note') playNote(); });
}
function stopMoment() { if (!mode) return; mode = null; resetMoment(false); }

/* ---- Render on scroll ---- */
const tall = matchMedia('(max-aspect-ratio: 1/1)');
const cards1 = [...document.querySelectorAll('#story1 .card')];
const cards2 = [...document.querySelectorAll('#story2 .card')];

// Pinned words: each drifts up and fades as you scroll on; the next rises into the same spot.
// The first arrives with its scene and the last leaves with it, at full strength.
function placeCards(cards, p, vh) {
  const n = cards.length, isTall = tall.matches;
  cards.forEach((c, i) => {
    let o, y;
    if (i === 0 && p < 0) { o = 1; y = -p * vh; }
    else if (i === n - 1 && p > n - 1) { o = 1; y = -(p - (n - 1)) * vh; }
    else { const d = p - i; o = clamp((0.5 - Math.abs(d)) / 0.16); y = -d * 180; }
    if (Math.abs(y) > vh * 1.2) o = 0;
    c.style.opacity = o;
    c.style.translate = isTall ? '0 ' + y + 'px' : '0 calc(-50% + ' + y + 'px)';
    c.style.visibility = o > 0.01 ? 'visible' : 'hidden';
  });
}

function render() {
  const vh = innerHeight;

  // The gathering: pinned for three sections, then it scrolls away whole
  const r1 = $('story1').getBoundingClientRect();
  const p1 = -r1.top / vh;                       // 0, 1, 2 while each section is in place
  const on1 = r1.bottom > 0 && r1.top < vh;
  setChapter(!on1 || p1 < -0.6 ? -1 : p1 < 0.5 ? 0 : p1 < 1.5 ? 1 : 2);
  placeCards(cards1, p1, vh);

  // The calendar: arrives, fills itself in, then its words fade as it scrolls on
  const rc = $('cal').getBoundingClientRect();
  $('cal-text').style.opacity = clamp(1 + rc.top / (0.4 * vh));
  if (rc.top < 0.3 * vh && rc.bottom > 0.5 * vh) { if (!heatStarted) startHeat(); }
  else if ((rc.bottom < 0 || rc.top > vh) && heatStarted) resetHeat();

  // The phone: pinned for the photo, then the note
  const r2 = $('story2').getBoundingClientRect();
  const p2 = -r2.top / vh;
  const on2 = r2.bottom > 0 && r2.top < vh;
  const want = !on2 || p2 < -0.5 ? null : p2 < 0.5 ? 'photo' : 'note';
  if (reduce) { if (want !== mode) { mode = want; resetMoment(!!want); if (want === 'note') showNote(true); } }
  else if (want !== mode) { if (!want) stopMoment(); else (want === 'photo' ? playPhoto : playNote)(); }
  placeCards(cards2, p2, vh);
}

// When scrolling stops between sections, ease to the nearest one so nothing rests half-faded
let idleT = 0;
function snapNearest() {
  const vh = innerHeight, y = scrollY;
  const top = id => $(id).getBoundingClientRect().top + y;
  const s1 = top('story1'), c = top('cal'), s2 = top('story2');
  const stops = [s1, s1 + vh, s1 + 2 * vh, c, s2, s2 + vh];
  if (y < stops[0] - 0.3 * vh || y > stops[stops.length - 1] + 0.15 * vh) return;
  // Go the way you were heading: once you've moved a little past a section, carry on to the next one
  const nudge = 0.12 * vh;
  let target;
  if (scrollDir > 0) target = stops.find(s => s >= y - nudge);
  else if (scrollDir < 0) target = [...stops].reverse().find(s => s <= y + nudge);
  if (target === undefined) { target = stops[0]; stops.forEach(s => { if (Math.abs(s - y) < Math.abs(target - y)) target = s; }); }
  if (Math.abs(target - y) > 2) { snapping = true; scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' }); }
}
let scrollDir = 0, lastY = scrollY, snapping = false;

/* ---- The season of evenings, as a one-off animation ---- */
let heatStarted = false, heatRaf = 0;
function paintHeat(fill) {
  const lit = Math.floor(fill * cells.length);
  cells.forEach((c, n2) => { const want = n2 < lit && c.lvl >= 0 ? shades[c.lvl] : ''; if (c.i.dataset.w !== want) { c.i.dataset.w = want; c.i.style.background = want || 'var(--border)'; } });
  $('c-hours').textContent = Math.round(38 * fill) + 'h';
  $('c-even').textContent = Math.round(21 * fill);
}
function startHeat() {
  heatStarted = true;
  if (reduce) { paintHeat(1); return; }
  const t0 = performance.now(), dur = 2000;
  cancelAnimationFrame(heatRaf);
  (function tick(now) {
    const f = clamp((now - t0) / dur);
    paintHeat(f);
    if (f < 1 && heatStarted) heatRaf = requestAnimationFrame(tick);
  })(t0);
}
function resetHeat() { heatStarted = false; cancelAnimationFrame(heatRaf); paintHeat(0); }

/* ---- The closing fan of app screens ---- */
(function () {
  const fan = $('fan');
  // The fire on the Home screen
  fan.querySelectorAll('[data-fire-slot]').forEach(slot => {
    const el = document.createElement('div'); el.className = 'fire'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="glow"></div>';
    [['logs', A.fire.logs], ['back', A.fire.back], ['front', A.fire.front], ['core', A.fire.core]].forEach(([c, s]) => { const i = document.createElement('img'); i.src = s; i.alt = ''; i.className = c; el.appendChild(i); });
    slot.appendChild(el);
  });
  // The heatmap on "You and Dad"
  const hm = $('fan-hm') || document.createElement('div'); let sd = 3;
  const r = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
  const sh = ['var(--border)', '#5a3f2a', 'var(--track)', '#c27c3a', 'var(--present)'];
  for (let i = 0; i < 84; i++) { const c = document.createElement('i'); const v = r(); const we = i % 7 >= 4; c.style.background = sh[v > (we ? 0.5 : 0.85) ? 1 + Math.floor(v * 3.99) % 4 : 0]; hm.appendChild(c); }
  // Fan out when it comes into view
  if (reduce || !('IntersectionObserver' in window)) { fan.classList.add('open'); return; }
  new IntersectionObserver((es, ob) => { es.forEach(e => { if (e.isIntersecting) { fan.classList.add('open'); ob.disconnect(); } }); }, { threshold: 0.35 }).observe(fan);
})();

let queued = false;
function schedule() { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; render(); }); } }
addEventListener('scroll', () => {
  schedule();
  const y = scrollY;
  if (!snapping && y !== lastY) scrollDir = y > lastY ? 1 : -1;   // our own easing doesn't change the direction
  lastY = y;
  clearTimeout(idleT);
  idleT = setTimeout(() => { if (snapping) { snapping = false; return; } snapNearest(); }, 180);
}, { passive: true });
addEventListener('resize', schedule);
render();
