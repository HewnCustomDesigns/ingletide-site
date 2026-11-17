/* App screens for the website: rebuilt at 390 px wide from the app's layout, colours and icons
   (see the app's src/ui and app/ folders), filled with sample data, and scaled to fit each slot.
   Usage: <div class="screen-slot" data-screen="home"></div>  (home, people, together, session, summary, share) */
(function () {
  const C = { bg: '#1A1311', present: '#F2A541', together: '#E8D2B0', text: '#F5EEE4', soft: '#D9CABB', muted: '#B9A99A' };
  const AV = { M: '#B9B4F0', J: '#8FD3CC', S: '#A9D3A0', A: '#F2C38B', D: '#F2C38B', N: '#E8A9A0', Y: '#F2C38B' };

  // The app's icons (src/ui/icons.tsx)
  const svg = (d, size, color, sw = 1.8, extra = '') => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const gearPath = (() => {
    const at = (r, deg) => { const a = deg * Math.PI / 180; return (12 + r * Math.cos(a)).toFixed(2) + ' ' + (12 + r * Math.sin(a)).toFixed(2); };
    let d = '';
    for (let i = 0; i < 8; i++) { const c = i * 45; d += (i ? 'L' : 'M') + at(7.4, c - 13) + ' L' + at(10, c - 8) + ' L' + at(10, c + 8) + ' L' + at(7.4, c + 13) + ' A7.4 7.4 0 0 1 ' + at(7.4, c + 32) + ' '; }
    return d + 'Z';
  })();
  const I = {
    gear: c => svg(`<path d="${gearPath}"/><circle cx="12" cy="12" r="3"/>`, 30, c, 1.7),
    home: c => svg(`<path d="M3.5 10.5L12 3.5l8.5 7"/><path d="M5.5 9v10.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9"/><path d="M12 11.5c1.2 1.6 2.2 2.6 2.2 4.2a2.2 2.2 0 0 1-4.4 0c0-1 .5-1.7 1.1-2.2.1.8.5 1.2 1.1 1.2-.3-1.1-.2-2.2 0-3.2z" fill="${c}" stroke-width="1"/>`, 28, c),
    people: c => svg('<circle cx="9" cy="8" r="3.4"/><path d="M2.8 20c0-3.5 2.8-6 6.2-6s6.2 2.5 6.2 6"/><path d="M15.5 4.9a3.4 3.4 0 0 1 0 6.3"/><path d="M17.5 14.3c2.2.7 3.7 2.9 3.7 5.7"/>', 28, c),
    moments: c => svg('<rect x="4" y="2.5" width="16" height="19" rx="2"/><rect x="6.8" y="5.3" width="10.4" height="10" rx="1"/><path d="M6.8 13l3-3 2.5 2.5 1.7-1.7 3.2 3.2"/>', 28, c),
    qr: (c, s = 24) => svg('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3M14 21h3M20 18v3"/>', s, c),
    invite: c => svg('<circle cx="9.5" cy="8" r="3.6"/><path d="M3 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M19 7v6M16 10h6"/>', 24, c, 1.9),
    search: c => svg('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>', 24, c),
    filter: c => svg('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>', 24, c),
    share: (c, s = 22) => svg('<path d="M12 15V3.5M8 7.5l4-4 4 4"/><path d="M8.5 10.5H6.5a1.5 1.5 0 0 0-1.5 1.5v7a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-2"/>', s, c),
    back: c => svg('<path d="M15 5l-7 7 7 7"/>', 24, c, 2),
    camera: c => svg('<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M8.5 6l1.5-2h4l1.5 2"/>', 26, c),
    pencil: c => svg('<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>', 24, c),
    lock: c => svg('<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 7.2-2.4"/>', 24, c),
    flame: c => `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 3c2 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 .3 2 1.3 3 2.5 3-.8-2.7-.5-5.4 0-8z" fill="${c}"/></svg>`
  };
  const statusBar = time => `<div class="sb"><span>${time}</span><span class="ic">
    <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="#F5EEE4"/><rect x="5" y="5" width="3" height="7" rx="1" fill="#F5EEE4"/><rect x="10" y="2.5" width="3" height="9.5" rx="1" fill="#F5EEE4"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#F5EEE4" opacity=".4"/></svg>
    <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 11.5l2.3-2.6a3.3 3.3 0 0 0-4.6 0z M3.7 6.6a6.8 6.8 0 0 1 9.6 0l-1.3 1.4a5 5 0 0 0-7 0z M1 3.8a10.6 10.6 0 0 1 15 0l-1.3 1.4a8.7 8.7 0 0 0-12.4 0z" fill="#F5EEE4"/></svg>
    <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="#F5EEE4" opacity=".5"/><rect x="2" y="2" width="16" height="9" rx="2" fill="#F5EEE4"/><rect x="24.5" y="4" width="2" height="5" rx="1" fill="#F5EEE4" opacity=".5"/></svg></span></div>`;
  const tabs = on => `<div class="tabs">${['home', 'people', 'moments'].map(t => `<div class="t ${t === on ? 'on' : ''}">${I[t](t === on ? C.present : C.muted)}<i></i></div>`).join('')}</div><div class="home-ind"></div>`;
  const av = (l, size, extra = '') => `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.42)}px;background:${AV[l] || '#F2C38B'};${extra}">${l}</span>`;
  const fire = (stage, cls = '') => {
    const p = stage === 3 ? '/img/fire/' : '/img/fire/s' + stage + '-';
    return `<div class="fire ${cls}"><div class="gl"></div><img src="${p}logs.png" alt=""><img src="${p}back.png" alt=""><img src="${p}front.png" alt=""><img src="${p}core.png" alt=""></div>`;
  };

  // Sample photos: drawn scenes, not anyone's real pictures
  const SCENE = {
    lunch: '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#7D5440"/>' + [30, 75, 120, 165, 210, 255].map(y => `<rect y="${y}" width="400" height="2" fill="#6B4632" opacity=".7"/>`).join('') + '<circle cx="150" cy="150" r="70" fill="#F5EEE4"/><circle cx="150" cy="150" r="54" fill="#E8D2B0"/><path d="M112 150q38-40 76 0q-38 30-76 0z" fill="#C8742A"/><circle cx="135" cy="140" r="7" fill="#6E8B3D"/><circle cx="160" cy="160" r="6" fill="#6E8B3D"/><circle cx="168" cy="138" r="5" fill="#B5432B"/><circle cx="290" cy="95" r="42" fill="#F5EEE4"/><circle cx="290" cy="95" r="30" fill="#8C3B23"/><circle cx="62" cy="62" r="20" fill="#F5EEE4"/><circle cx="62" cy="62" r="13" fill="#6B4632"/><circle cx="66" cy="238" r="20" fill="#F5EEE4"/><circle cx="66" cy="238" r="13" fill="#6B4632"/><rect x="270" y="190" width="70" height="44" rx="8" fill="#E8D2B0"/></svg>',
    game: '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#6B4632"/><rect x="95" y="45" width="210" height="210" rx="10" fill="#E8D2B0"/><g transform="translate(200 150)">' + [0, 60, 120, 180, 240, 300].map((a, i) => `<polygon points="0,-34 29,-17 29,17 0,34 -29,17 -29,-17" transform="rotate(${a}) translate(0 -58)" fill="${['#C8742A', '#6E8B3D', '#B5432B', '#E8843C', '#8C6A3D', '#F2A541'][i]}"/>`).join('') + '<polygon points="0,-34 29,-17 29,17 0,34 -29,17 -29,-17" fill="#B9A99A"/></g><rect x="320" y="70" width="40" height="40" rx="7" fill="#F5EEE4"/><circle cx="332" cy="82" r="4" fill="#1A1311"/><circle cx="348" cy="98" r="4" fill="#1A1311"/><rect x="30" y="200" width="44" height="62" rx="5" fill="#F5EEE4" transform="rotate(-12 52 231)"/><rect x="45" y="195" width="44" height="62" rx="5" fill="#8C3B23" transform="rotate(6 67 226)"/></svg>',
    movie: '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#120D0B"/><rect x="70" y="40" width="260" height="140" rx="6" fill="#3a6a8a"/><rect x="70" y="40" width="260" height="140" rx="6" fill="url(#mg)"/><defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F2A541" stop-opacity=".5"/><stop offset="1" stop-color="#1A1311" stop-opacity=".2"/></linearGradient></defs><ellipse cx="200" cy="300" rx="230" ry="80" fill="#261B17"/><circle cx="130" cy="225" r="26" fill="#1A1311"/><rect x="100" y="245" width="60" height="70" rx="26" fill="#1A1311"/><circle cx="200" cy="218" r="28" fill="#1A1311"/><rect x="168" y="240" width="64" height="70" rx="28" fill="#1A1311"/><circle cx="270" cy="225" r="25" fill="#1A1311"/><rect x="242" y="245" width="58" height="70" rx="25" fill="#1A1311"/><rect x="185" y="262" width="34" height="22" rx="4" fill="#E8843C"/></svg>',
    walk: '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#E8D2B0"/><rect y="170" width="400" height="130" fill="#8C6A3D"/><path d="M170 300 L215 170 L235 170 L300 300z" fill="#B9A99A"/>' + [[40, 120, '#C8742A'], [110, 100, '#E8843C'], [320, 110, '#B5432B'], [370, 130, '#F2A541'], [270, 125, '#C8742A']].map(([x, y, c]) => `<rect x="${x - 4}" y="${y}" width="8" height="70" fill="#6B4632"/><circle cx="${x}" cy="${y}" r="38" fill="${c}"/>`).join('') + [[60, 230], [140, 260], [330, 240], [250, 280], [95, 200]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="#C8742A"/>`).join('') + '</svg>'
  };

  const SCREENS = {
    home: () => `<div class="as">${statusBar('7:41')}
      <div class="home-head"><span class="greet">Good evening, Maya</span>${I.gear(C.soft)}</div>
      <div class="home-mid">
        ${fire(4, 'big').replace('class="fire big"', 'class="fire big" style="width:300px;margin-bottom:-14px"')}
        <div class="big-t">18h 40m together</div>
        <div class="month">this November</div>
        <div class="pline"><i></i>12h 15m of it with phones down</div>
        <div class="sharem">${I.share(C.muted, 18)}Share your November</div>
      </div>
      <div class="startbar"><div class="btn">Start together time</div></div>
      ${tabs('home')}</div>`,

    people: () => {
      const row = (l, name, pt, sub, goal) => `<div class="prow">${av(l, 52)}<div class="tx"><div class="top"><span class="nm">${name}</span><span class="pt">${pt}</span></div>${goal !== undefined ? `<div class="bar"><b style="width:${goal}%"></b></div>` : ''}<span class="sub">${sub}</span></div></div>`;
      return `<div class="as">${statusBar('7:41')}
        <div class="ph-head"><h1>Your people</h1><div class="btns"><span class="rb q">${I.qr(C.soft)}</span><span class="rb i">${I.invite('#1A1408')}</span></div></div>
        ${row('D', 'Dad', '3h 20m', 'Goal 5 hours a month', 66)}
        ${row('M', 'Maya', '6h 45m', '8h 10m together this month')}
        ${row('N', 'Nana', '1h 35m', 'Goal 2 hours a week', 79)}
        ${row('J', 'Jordan', '4h 05m', '5h 30m together this month')}
        ${row('S', 'Sam', '2h 50m', '3h 40m together this month')}
        ${row('A', 'Alex', '1h 10m', '1h 25m together this month')}
        ${tabs('people')}</div>`;
    },

    together: () => {
      const ev = (stage, title, who, meta, quote, photo) => `<div class="ev"><div class="fi"><img src="/img/fire/icon-${stage}.png" alt=""></div><div class="bd"><span class="tt">${title}</span><span class="meta"><span class="stack">${who.map(l => av(l, 26)).join('')}</span>${meta}</span>${quote ? `<span class="q">“${quote}”</span>` : ''}</div>${photo ? `<div class="th">${SCENE[photo]}</div>` : ''}</div>`;
      return `<div class="as">${statusBar('7:41')}
        <div class="tg-head"><h1>Together</h1><span class="ic">${I.search(C.soft)}${I.filter(C.soft)}</span></div>
        <div class="chips">${[['D', 'Dad'], ['M', 'Maya'], ['N', 'Nana'], ['J', 'Jordan']].map(([l, n]) => `<span class="chip">${av(l, 28)}${n}</span>`).join('')}</div>
        <div class="mhead"><b>November</b><span>18h 40m · 14 times</span></div>
        ${ev(5, 'Sunday lunch', ['D', 'N'], '15 Sun · 3h 05m · Bonfire', 'Dad finally taught me his chili.', 'lunch')}
        ${ev(5, 'Game night', ['M', 'J', 'S'], '13 Fri · 2h 14m · Bonfire', 'Jordan finally won Catan.', 'game')}
        ${ev(3, 'Coffee', ['M'], '11 Wed · 48m · Campfire')}
        ${ev(4, 'Movie night', ['J', 'S'], '8 Sun · 1h 52m · Hearth', '', 'movie')}
        ${ev(4, 'A walk', ['D'], '7 Sat · 1h 05m · Hearth', 'Leaves everywhere.', 'walk')}
        ${tabs('moments')}</div>`;
    },

    session: () => {
      const m = (l, name, st) => `<div class="m">${av(l, 48, `border:3px solid ${st === 'Present' ? C.present : C.together}`)}<span class="n">${name}</span><span class="st" style="color:${st === 'Present' ? C.present : C.together}">${st}</span></div>`;
      return `<div class="as deep">${statusBar('8:36')}
        <div class="ls-head"><span class="oc">GAME NIGHT</span><span class="lk">3 of 4 phones present</span></div>
        ${fire(4, 'ls-fire')}
        <div class="tm"><b>1:24:08</b><span>your present time</span></div>
        <div class="mem">${m('Y', 'You', 'Phone in hand')}${m('M', 'Maya', 'Present')}${m('J', 'Jordan', 'Present')}${m('S', 'Sam', 'Present')}</div>
        <div class="prompt">${I.lock(C.present)}<div><b>Present time paused</b><span>Lock your phone to rejoin. Your together time still counts.</span></div></div>
        <div class="ls-foot"><div class="btn out">${I.qr(C.together, 20)}Show join code</div><div class="btn out">End session</div></div></div>`;
    },

    summary: () => `<div class="as">${statusBar('9:53')}
      <div class="sm-head">${I.back(C.text)}<div class="tt"><b>Game night</b><span>Friday, Nov 13 · 7:12 pm to 9:52 pm</span></div><span class="sh">${I.share(C.text)}</span></div>
      <div class="sm-card">${fire(5)}<span class="num">2h 14m</span><span class="cap">present together, phones down</span><div class="bar"><b style="width:84%"></b></div><div class="leg"><span class="p">Present 2h 14m</span><span>Together 2h 40m</span></div></div>
      <div class="sec"><span class="lbl">Who was there</span>
        ${[['M', 'Maya', '2h 14m', '2h 40m', 84], ['J', 'Jordan', '2h 02m', '2h 40m', 76], ['S', 'Sam', '1h 31m', '2h 05m', 73]].map(([l, n, p, t, w]) => `<div class="who">${av(l, 48)}<div class="tx"><div class="top"><span>${n}</span><em><b>${p}</b> of ${t}</em></div><div class="bar"><b style="width:${w}%"></b></div></div></div>`).join('')}
      </div></div>`,

    share: () => `<div class="as deep">${statusBar('9:58')}
      <div class="sc"><span class="k">MY NOVEMBER</span><span class="h">12h</span><span class="l">with my phone down and<br>my people close.</span>
        <div class="st"><span>9 days together</span><span>Longest: 3h 05m</span></div>
        <div class="ft"><b>${I.flame(C.present)}Ingletide</b><span>What's your number?</span></div></div>
      <div class="sc-foot"><div class="btn">Share</div><div class="no">Not now</div></div></div>`
  };

  function fit(slot) {
    const as = slot.querySelector('.as');
    if (as) as.style.transform = 'scale(' + (slot.clientWidth / 390) + ')';
  }
  const ro = 'ResizeObserver' in window ? new ResizeObserver(es => es.forEach(e => fit(e.target))) : null;
  window.mountScreens = function (root) {
    (root || document).querySelectorAll('[data-fit]').forEach(slot => {
      if (slot.dataset.mounted) return;
      slot.dataset.mounted = '1'; fit(slot); if (ro) ro.observe(slot);
    });
    (root || document).querySelectorAll('[data-screen]').forEach(slot => {
      const make = SCREENS[slot.dataset.screen];
      if (!make || slot.dataset.mounted) return;
      slot.dataset.mounted = '1';
      slot.insertAdjacentHTML('afterbegin', make());
      fit(slot); if (ro) ro.observe(slot);
    });
  };
  window.APP_SCENES = SCENE;
  window.APP_ICONS = I;
  window.APP_FIRE = fire;
  window.APP_AV = av;
  window.APP_STATUSBAR = statusBar;
  mountScreens();
})();
