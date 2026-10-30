/* Visitor guide: a "what do you need?" picker on the first visit, and a few gentle reminders
   that point to the Freelancer.com button. Works on every page, in 4 languages. */
(function () {
  'use strict';
  var FL = 'https://www.freelancer.com/u/Karenmilad2018';
  var pre = /\/services\//.test(location.pathname) ? '../' : '';
  var I = {
    en: { hi: 'Hi, I’m Karen', q: 'What do you need today?', sub: 'Tap one. I’ll show you samples and prices.', skip: 'I’ll look around myself', notSure: 'Not sure? Message me',
      o: ['Word & documents', 'Excel', 'PowerPoint', 'Quality & ISO', 'Kids & teachers', 'Website'],
      n: [['Message me free and safely', 'Tap here. Your chat stays on Freelancer.com.'], ['Send your file, get a quotation', 'A detailed PDF with the plan and the exact price.'], ['Questions before you start?', 'Ask me here, there is no charge to ask.']],
      ctx: 'Need “{t}”? Message me here', go: 'Message me', close: 'Close' },
    ar: { hi: 'أهلاً، أنا كارين', q: 'ماذا تحتاج اليوم؟', sub: 'اختر واحدة وسأعرض لك الأمثلة والأسعار.', skip: 'سأتصفح بنفسي', notSure: 'لست متأكداً؟ راسلني',
      o: ['Word والمستندات', 'Excel', 'PowerPoint', 'الجودة والأيزو', 'الأطفال والمعلمين', 'موقع إلكتروني'],
      n: [['راسلني مجاناً وبأمان', 'اضغط هنا، والمحادثة على Freelancer.com.'], ['أرسل ملفك واستلم عرض سعر', 'ملف PDF فيه الخطة والسعر الدقيق.'], ['عندك سؤال قبل البدء؟', 'اسألني هنا، السؤال مجاني.']],
      ctx: 'تحتاج «{t}»؟ راسلني هنا', go: 'راسلني', close: 'إغلاق' },
    de: { hi: 'Hallo, ich bin Karen', q: 'Was brauchen Sie heute?', sub: 'Tippen Sie auf eins. Ich zeige Ihnen Beispiele und Preise.', skip: 'Ich schaue mich selbst um', notSure: 'Unsicher? Schreiben Sie mir',
      o: ['Word & Dokumente', 'Excel', 'PowerPoint', 'Qualität & ISO', 'Kinder & Lehrkräfte', 'Website'],
      n: [['Schreiben Sie mir, kostenlos und sicher', 'Hier tippen. Der Chat läuft über Freelancer.com.'], ['Datei senden, Angebot erhalten', 'Ein PDF mit Plan und genauem Preis.'], ['Fragen vor dem Start?', 'Fragen Sie hier, Fragen kosten nichts.']],
      ctx: '„{t}“ gesucht? Schreiben Sie mir hier', go: 'Schreiben', close: 'Schließen' },
    es: { hi: 'Hola, soy Karen', q: '¿Qué necesitas hoy?', sub: 'Toca una opción y te muestro ejemplos y precios.', skip: 'Prefiero mirar por mi cuenta', notSure: '¿No estás seguro? Escríbeme',
      o: ['Word y documentos', 'Excel', 'PowerPoint', 'Calidad e ISO', 'Niños y docentes', 'Web'],
      n: [['Escríbeme gratis y seguro', 'Toca aquí. El chat es en Freelancer.com.'], ['Envía tu archivo, recibe un presupuesto', 'Un PDF con el plan y el precio exacto.'], ['¿Dudas antes de empezar?', 'Pregúntame aquí, preguntar no cuesta.']],
      ctx: '¿Necesitas «{t}»? Escríbeme aquí', go: 'Escribir', close: 'Cerrar' }
  };
  var GO = ['index.html#documents', 'excel.html', 'powerpoint.html', 'quality.html', 'index.html#design', 'websites.html'];
  var IC = ['<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/>',
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16M15 4v16"/>',
    '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7 12l3-3 3 2 4-4"/>',
    '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    '<circle cx="12" cy="8" r="4"/><path d="M5 21c1-4 4-6 7-6s6 2 7 6"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'];
  function lang() { var l = (document.documentElement.lang || 'en').slice(0, 2); return I[l] ? l : 'en'; }
  function T() { return I[lang()]; }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = '' +
    '.kg-ov{position:fixed;inset:0;z-index:300;background:rgba(9,17,29,.55);display:flex;align-items:flex-end;justify-content:center;padding:16px;font-family:Manrope,"IBM Plex Sans Arabic",system-ui,sans-serif;animation:kgIn .3s ease both}' +
    '@media (min-width:700px){.kg-ov{align-items:center}}' +
    '.kg-c{position:relative;width:100%;max-width:560px;background:#fff;color:#0E1A2B;border-radius:22px;padding:24px 22px 18px;box-shadow:0 30px 70px rgba(0,0,0,.35);animation:kgUp .45s cubic-bezier(.2,.9,.3,1.1) both}' +
    '.kg-top{display:flex;align-items:center;gap:12px;margin-bottom:6px}.kg-top img{width:46px;height:46px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 3px #F2C14E}' +
    '.kg-top small{display:block;color:#5E6470;font-weight:700;font-size:13px}.kg-top b{display:block;font-size:21px;line-height:1.2}' +
    '.kg-sub{margin:0 0 16px;color:#5E6470;font-size:14.5px}' +
    '.kg-g{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '.kg-g a{display:flex;align-items:center;gap:10px;border:1.5px solid #E2E8EC;border-radius:14px;padding:12px;font-weight:800;font-size:15px;color:#0E1A2B;text-decoration:none;opacity:0;animation:kgUp .35s ease both;transition:border-color .2s,transform .2s,background .2s}' +
    '.kg-g a:hover{border-color:#4FA9B8;background:#F3F7F8;transform:translateY(-2px)}' +
    '.kg-g i{flex-shrink:0;width:36px;height:36px;border-radius:10px;background:#0E1A2B;color:#F2C14E;display:flex;align-items:center;justify-content:center}' +
    '.kg-ns{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px;background:#2D5BE3;color:#fff;border-radius:14px;padding:13px;font-weight:800;text-decoration:none}' +
    '.kg-sk{display:block;margin:12px auto 0;border:0;background:none;color:#5E6470;font:600 14px inherit;text-decoration:underline;cursor:pointer}' +
    '.kg-x{position:absolute;top:10px;inset-inline-end:12px;border:0;background:none;font-size:24px;line-height:1;color:#8A93A0;cursor:pointer}' +
    '@keyframes kgIn{from{opacity:0}to{opacity:1}}@keyframes kgUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}' +
    '.kg-n{position:fixed;z-index:95;bottom:calc(92px + env(safe-area-inset-bottom,0px));inset-inline-end:18px;max-width:300px;background:#fff;color:#0E1A2B;border-radius:16px;padding:12px 38px 12px 14px;box-shadow:0 18px 40px rgba(14,26,43,.25);border:1px solid #E2E8EC;font-family:Manrope,"IBM Plex Sans Arabic",system-ui,sans-serif;cursor:pointer;animation:kgPop .45s cubic-bezier(.2,1.3,.4,1) both}' +
    'html[dir=rtl] .kg-n{padding:12px 14px 12px 38px}' +
    '.kg-n::after{content:"";position:absolute;bottom:-8px;inset-inline-end:26px;width:16px;height:16px;background:#fff;border-right:1px solid #E2E8EC;border-bottom:1px solid #E2E8EC;transform:rotate(45deg)}' +
    '.kg-n b{display:block;font-size:14.5px;line-height:1.3}.kg-n span{display:block;font-size:13px;color:#5E6470;margin-top:2px}' +
    '.kg-n button{position:absolute;top:6px;inset-inline-end:8px;border:0;background:none;font-size:18px;color:#8A93A0;cursor:pointer}' +
    '.kg-n.out{animation:kgOut .3s ease forwards}@keyframes kgPop{from{opacity:0;transform:translateY(12px) scale(.9)}to{opacity:1;transform:none}}@keyframes kgOut{to{opacity:0;transform:translateY(8px)}}' +
    '@media (max-width:640px){.kg-n{bottom:calc(86px + env(safe-area-inset-bottom,0px));inset-inline-end:14px;max-width:calc(100vw - 28px)}}' +
    '@media (prefers-reduced-motion:reduce){.kg-ov,.kg-c,.kg-g a,.kg-n{animation:none!important;opacity:1}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function busy() { return document.querySelector('.kg-ov,.md.on,[role=dialog][open],.kx-modal') !== null; }

  /* ---------- first visit: what do you need? ---------- */
  function guide() {
    if (ls('k-guide') || /[?&]noguide\b/.test(location.search)) return;
    if (/\/services\//.test(location.pathname) || /\/(excel|powerpoint|quality|websites)\.html$/.test(location.pathname)) { ls('k-guide', '1'); return; }  // they already chose
    ls('k-guide', '1');
    var t = T(), ov = document.createElement('div'); ov.className = 'kg-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    var opts = t.o.map(function (o, i) { return '<a href="' + pre + GO[i] + '" style="animation-delay:' + (0.15 + i * 0.06) + 's"><i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[i] + '</svg></i>' + esc(o) + '</a>'; }).join('');
    ov.innerHTML = '<div class="kg-c"><button type="button" class="kg-x" aria-label="' + esc(t.close) + '">×</button><div class="kg-top"><img src="' + pre + 'assets/karen.jpg" alt=""><div><small>' + esc(t.hi) + '</small><b>' + esc(t.q) + '</b></div></div><p class="kg-sub">' + esc(t.sub) + '</p><div class="kg-g">' + opts + '</div>' +
      '<a class="kg-ns" href="' + FL + '" target="_blank" rel="noopener">' + esc(t.notSure) + '</a><button type="button" class="kg-sk">' + esc(t.skip) + '</button></div>';
    function close() { ov.remove(); document.removeEventListener('keydown', key); }
    function key(e) { if (e.key === 'Escape') close(); }
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    ov.querySelector('.kg-x').onclick = close; ov.querySelector('.kg-sk').onclick = close;
    [].forEach.call(ov.querySelectorAll('.kg-g a'), function (a) { a.addEventListener('click', function () { setTimeout(close, 50); }); });
    document.addEventListener('keydown', key);
    document.body.appendChild(ov);
    var f = ov.querySelector('.kg-g a'); if (f) f.focus({ preventScroll: true });
  }

  /* ---------- gentle reminders next to the chat button ---------- */
  var shown = +(ss('k-nudge') || 0), timer;
  function title() {
    if (!/\/services\//.test(location.pathname)) return '';
    var h = document.querySelector('[data-l].on h1, h1'); return h ? h.textContent.trim().slice(0, 48) : '';
  }
  function nudge() {
    if (shown >= 3 || document.hidden) return schedule();
    if (busy() || document.querySelector('.kg-n')) return schedule();
    var t = T(), msg = t.n[shown % t.n.length], tt = title();
    if (shown === 0 && tt) msg = [t.ctx.replace('{t}', tt), t.n[0][1]];
    var n = document.createElement('div'); n.className = 'kg-n'; n.setAttribute('role', 'status'); n.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    n.innerHTML = '<b>' + esc(msg[0]) + '</b><span>' + esc(msg[1]) + '</span><button type="button" aria-label="' + esc(t.close) + '">×</button>';
    n.addEventListener('click', function (e) { if (e.target.tagName === 'BUTTON') { hide(); shown = 3; ss('k-nudge', 3); return; } window.open(FL, '_blank', 'noopener'); hide(); });
    function hide() { n.classList.add('out'); setTimeout(function () { n.remove(); }, 300); }
    document.body.appendChild(n);
    var fab = document.getElementById('k-fab'); if (fab && !reduce) { fab.classList.remove('pulse'); void fab.offsetWidth; fab.classList.add('pulse'); setTimeout(function () { fab.classList.remove('pulse'); }, 4500); }
    shown++; ss('k-nudge', shown);
    setTimeout(hide, 9000);
    schedule();
  }
  function schedule() { clearTimeout(timer); if (shown < 3) timer = setTimeout(nudge, shown === 0 ? 20000 : 70000); }

  function start() { setTimeout(guide, 900); schedule(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
