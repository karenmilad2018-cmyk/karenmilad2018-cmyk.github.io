/* Karen site extras: WhatsApp button with online status, pop-ups, first-visit tips,
   seasonal banner and homepage animations.
   ===== EDIT HERE =====
   wa:   your WhatsApp number (country code, no + or spaces)
   email: your email for free-sample requests
   from / to: the hours you are usually online, Cairo time (24h clock). 9 and 23 = 9:00 AM to 11:00 PM
*/
window.KAREN = window.KAREN || { wa: '201207082281', email: 'karenmilad2018@gmail.com', from: 9, to: 23 };

/* Freelance-platform mode. Share  karenmilad.com/?via=freelancer  on Freelancer.com:
   WhatsApp and email disappear and every contact button opens your Freelancer profile instead.
   It stays on while the visitor browses the site (same tab). ?via=off turns it off. */
window.KAREN_PLATFORMS = {
  freelancer: { url: 'https://www.freelancer.com/u/Karenmilad2018', name: 'Freelancer', proof: { en: '5.0 ★', ar: '5.0 ★', de: '5.0 ★', es: '5.0 ★' } }
};
(function () {
  var v = null, m = /[?&]via=([a-z]+)/.exec(location.search || '');
  try {
    if (m && m[1] === 'off') sessionStorage.removeItem('k-via');
    else if (m && window.KAREN_PLATFORMS[m[1]]) sessionStorage.setItem('k-via', m[1]);
    v = sessionStorage.getItem('k-via');
  } catch (e) { v = m && window.KAREN_PLATFORMS[m[1]] ? m[1] : null; }
  // WhatsApp is switched off: every contact goes through Freelancer.com unless ?via=direct is used once in this tab
  try { if (/[?&]via=direct\b/.test(location.search)) sessionStorage.setItem('k-via', 'direct'); } catch (e) {}
  var direct = false; try { direct = sessionStorage.getItem('k-via') === 'direct'; } catch (e) {}
  window.KAREN_VIA = direct ? null : (v && window.KAREN_PLATFORMS[v] ? v : 'freelancer');
})();

/* Prices are hidden for visitors whose device is set to Egypt time (Africa/Cairo).
   Karen sees them anyway after opening the site once with ?owner=karen  (undo with ?owner=off). */
(function () {
  try {
    var q = location.search || '';
    if (/[?&]owner=karen\b/.test(q)) localStorage.setItem('k-owner', '1');
    if (/[?&]owner=off\b/.test(q)) localStorage.removeItem('k-owner');
  } catch (e) {}
  var own = false; try { own = localStorage.getItem('k-owner') === '1'; } catch (e) {}
  var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  window.KAREN_HIDE = !own && tz === 'Africa/Cairo';
})();

(function () {
  'use strict';
  var K = window.KAREN;
  var I = {
    en: {
      flB: 'Hire me on Freelancer.com',
      mail: 'Or request it by email', subj: 'Detailed quotation request',
      on: 'Online now', off: 'Back at {t}', fab: 'Chat on WhatsApp',
      wa: 'Hi Karen! I’d like a detailed quotation.',
      exitT: 'Before you go…', exitP: 'Send me your file now and get a detailed quotation within 12–24 hours. You pay nothing unless you’re happy.', exitB: 'Get my detailed quote on WhatsApp', no: 'No thanks', close: 'Close',
      toastT: 'Got your file ready?', toastP: 'Send it to me and I’ll reply with the exact price and a detailed quotation.', toastB: 'Send on WhatsApp',
      tips: [['Start here', 'Send your file on WhatsApp and get a detailed quotation. You pay nothing until you approve.'], ['Not sure which service?', 'Answer 3 quick questions here and you’ll see the right service and its price.'], ['Talk to me directly', 'This button opens WhatsApp. I reply myself, no bots.']],
      next: 'Next', done: 'Got it', skip: 'Skip', before: 'BEFORE', after: 'AFTER',
      typing: ['thesis formatting', 'PDF to PowerPoint', 'payroll sheet', 'ISO 9001:2015', 'kids worksheets', 'company profile', 'CV'],
      s: {
        newyear: ['New year, organised:', 'budgets, trackers and dashboards in Excel.', 'See Excel services'],
        easter: ['Easter season:', 'worship song and event slides for your church. Non-profits get 20% off.', 'See church slides'],
        thesis: ['Thesis season:', 'formatting to your university’s rules, plus defense slides. Students get 15% off.', 'Format my thesis'],
        summer: ['Finish your book this summer:', 'print-ready layout at your printer’s exact size.', 'See book services'],
        school: ['Back to school:', 'worksheets, lesson slides and gradebooks. Teachers get 15% off.', 'See teacher services'],
        iso: ['Year-end audit coming?', 'Get your SOPs, records and audit checklists ready in time.', 'ISO & quality'],
        bf: ['Black Friday:', 'order 2 or more services and get 15% off the total.', 'Find my services'],
        xmas: ['Christmas season:', 'slides, bulletins and certificates for your church. Non-profits get 20% off.', 'See church services']
      }
    },
    ar: {
      flB: 'تواصل معي على فريلانسر',
      mail: 'أو اطلبها عبر البريد الإلكتروني', subj: 'طلب عرض سعر مفصل',
      on: 'متاحة الآن', off: 'أعود الساعة {t}', fab: 'تواصل عبر واتساب',
      wa: 'مرحباً كارين! أريد عرض سعر مفصل لمشروعي.',
      exitT: 'قبل أن تغادر…', exitP: 'أرسل ملفك الآن واحصل على عرض سعر مفصل خلال ١٢–٢٤ ساعة. لن تدفع شيئاً إلا إذا كنت راضياً.', exitB: 'احصل على عرض السعر المفصل عبر واتساب', no: 'لا، شكراً', close: 'إغلاق',
      toastT: 'ملفك جاهز؟', toastP: 'أرسله لي وسأرد عليك بالسعر الدقيق وعرض سعر مفصل.', toastB: 'أرسل عبر واتساب',
      tips: [['ابدأ من هنا', 'أرسل ملفك عبر واتساب واحصل على عرض سعر مفصل. لا تدفع شيئاً قبل موافقتك.'], ['لست متأكداً من الخدمة؟', 'أجب عن ٣ أسئلة سريعة هنا وستظهر لك الخدمة المناسبة وسعرها.'], ['تواصل معي مباشرة', 'هذا الزر يفتح واتساب. أرد بنفسي، بدون ردود آلية.']],
      next: 'التالي', done: 'فهمت', skip: 'تخطي', before: 'قبل', after: 'بعد',
      typing: ['تنسيق رسالة ماجستير', 'تحويل PDF إلى باوربوينت', 'كشف مرتبات', 'ISO 9001:2015', 'أوراق عمل للأطفال', 'بروفايل شركة', 'سيرة ذاتية'],
      s: {
        newyear: ['سنة جديدة منظمة:', 'ميزانيات وملفات متابعة ولوحات بيانات في Excel.', 'خدمات Excel'],
        easter: ['موسم القيامة:', 'شرائح ترانيم وفعاليات لكنيستك. خصم ٢٠٪ للجهات غير الربحية.', 'شرائح الكنيسة'],
        thesis: ['موسم الرسائل:', 'تنسيق حسب قواعد جامعتك وعرض المناقشة. خصم ١٥٪ للطلاب.', 'نسّق رسالتي'],
        summer: ['أنهِ كتابك هذا الصيف:', 'ملف جاهز للطباعة بالمقاس الدقيق للمطبعة.', 'خدمات الكتب'],
        school: ['العودة للمدارس:', 'أوراق عمل وشرائح دروس وسجلات درجات. خصم ١٥٪ للمعلمين.', 'خدمات المعلمين'],
        iso: ['تدقيق نهاية السنة قريب؟', 'جهّز الإجراءات والسجلات وقوائم التدقيق في الوقت المناسب.', 'الجودة والأيزو'],
        bf: ['بلاك فرايداي:', 'اطلب خدمتين أو أكثر واحصل على خصم ١٥٪ على الإجمالي.', 'اعرف خدماتي'],
        xmas: ['موسم الميلاد:', 'شرائح ونشرات وشهادات لكنيستك. خصم ٢٠٪ للجهات غير الربحية.', 'خدمات الكنيسة']
      }
    },
    de: {
      flB: 'Auf Freelancer beauftragen',
      mail: 'Oder per E-Mail anfordern', subj: 'Anfrage: Detailliertes Angebot',
      on: 'Jetzt online', off: 'Zurück um {t}', fab: 'Per WhatsApp schreiben',
      wa: 'Hallo Karen! Ich hätte gern ein detailliertes Angebot.',
      exitT: 'Bevor Sie gehen…', exitP: 'Senden Sie mir jetzt Ihre Datei und erhalten Sie in 12–24 Stunden ein detailliertes Angebot. Sie zahlen nur, wenn Sie zufrieden sind.', exitB: 'detailliertes Angebot per WhatsApp', no: 'Nein, danke', close: 'Schließen',
      toastT: 'Datei bereit?', toastP: 'Senden Sie sie mir, und ich antworte mit dem genauen Preis und einem detaillierten Angebot.', toastB: 'Per WhatsApp senden',
      tips: [['Hier starten', 'Datei per WhatsApp senden und detailliertes Angebot erhalten. Sie zahlen erst nach Ihrer Freigabe.'], ['Welcher Service passt?', 'Beantworten Sie hier 3 kurze Fragen und sehen Sie den passenden Service mit Preis.'], ['Direkt mit mir sprechen', 'Dieser Button öffnet WhatsApp. Ich antworte selbst.']],
      next: 'Weiter', done: 'Verstanden', skip: 'Überspringen', before: 'VORHER', after: 'NACHHER',
      typing: ['Abschlussarbeit formatieren', 'PDF zu PowerPoint', 'Gehaltsabrechnung', 'ISO 9001:2015', 'Arbeitsblätter für Kinder', 'Firmenprofil', 'Lebenslauf'],
      s: {
        newyear: ['Neues Jahr, gut organisiert:', 'Budgets, Tracker und Dashboards in Excel.', 'Excel-Leistungen'],
        easter: ['Osterzeit:', 'Lied- und Veranstaltungsfolien für Ihre Gemeinde. Gemeinnützige erhalten 20 % Rabatt.', 'Kirchenfolien'],
        thesis: ['Abgabezeit:', 'Formatierung nach Ihren Uni-Regeln plus Verteidigungsfolien. Studierende erhalten 15 % Rabatt.', 'Arbeit formatieren'],
        summer: ['Diesen Sommer das Buch fertig:', 'druckfertiges Layout im exakten Format Ihrer Druckerei.', 'Buch-Leistungen'],
        school: ['Schulstart:', 'Arbeitsblätter, Unterrichtsfolien und Notenlisten. Lehrkräfte erhalten 15 % Rabatt.', 'Für Lehrkräfte'],
        iso: ['Audit zum Jahresende?', 'Bringen Sie SOPs, Nachweise und Audit-Checklisten rechtzeitig in Ordnung.', 'Qualität & ISO'],
        bf: ['Black Friday:', '2 oder mehr Leistungen bestellen und 15 % auf alles sparen.', 'Leistungen finden'],
        xmas: ['Weihnachtszeit:', 'Folien, Gemeindebriefe und Urkunden für Ihre Kirche. Gemeinnützige erhalten 20 % Rabatt.', 'Kirchen-Leistungen']
      }
    },
    es: {
      flB: 'Contrátame en Freelancer',
      mail: 'O pídela por email', subj: 'Solicitud de presupuesto detallado',
      on: 'En línea ahora', off: 'Vuelvo a las {t}', fab: 'Escríbeme por WhatsApp',
      wa: '¡Hola Karen! Quisiera un presupuesto detallado.',
      exitT: 'Antes de irte…', exitP: 'Envíame tu archivo ahora y recibe un presupuesto detallado en 12–24 horas. No pagas nada si no quedas contento.', exitB: 'Quiero mi presupuesto detallado por WhatsApp', no: 'No, gracias', close: 'Cerrar',
      toastT: '¿Tienes tu archivo listo?', toastP: 'Envíamelo y te respondo con el precio exacto y un presupuesto detallado.', toastB: 'Enviar por WhatsApp',
      tips: [['Empieza aquí', 'Envía tu archivo por WhatsApp y recibe un presupuesto detallado. No pagas nada hasta aprobar.'], ['¿No sabes qué servicio?', 'Responde 3 preguntas rápidas aquí y verás el servicio adecuado con su precio.'], ['Háblame directamente', 'Este botón abre WhatsApp. Respondo yo, sin bots.']],
      next: 'Siguiente', done: 'Entendido', skip: 'Omitir', before: 'ANTES', after: 'DESPUÉS',
      typing: ['formato de tesis', 'PDF a PowerPoint', 'hoja de nómina', 'ISO 9001:2015', 'fichas para niños', 'perfil de empresa', 'CV'],
      s: {
        newyear: ['Año nuevo, todo en orden:', 'presupuestos, controles y paneles en Excel.', 'Servicios de Excel'],
        easter: ['Semana Santa:', 'diapositivas de cantos y eventos para tu iglesia. 20 % de descuento para ONG.', 'Diapositivas de iglesia'],
        thesis: ['Temporada de tesis:', 'formato según las normas de tu universidad y diapositivas de defensa. 15 % para estudiantes.', 'Formatear mi tesis'],
        summer: ['Termina tu libro este verano:', 'maqueta lista para imprenta al tamaño exacto.', 'Servicios de libros'],
        school: ['Vuelta al cole:', 'fichas, diapositivas de clase y libros de notas. 15 % para docentes.', 'Para docentes'],
        iso: ['¿Auditoría a fin de año?', 'Ten listos a tiempo tus procedimientos, registros y listas de auditoría.', 'Calidad e ISO'],
        bf: ['Black Friday:', 'pide 2 o más servicios y obtén un 15 % de descuento en el total.', 'Encontrar servicios'],
        xmas: ['Temporada de Navidad:', 'diapositivas, boletines y certificados para tu iglesia. 20 % para ONG.', 'Servicios para iglesias']
      }
    }
  };
  var SEASON_GO = { newyear: 'excel', easter: 'ch_songs', thesis: 'thesis', summer: 'printbook', school: 'lessons', iso: 'quality.html', bf: '#k-wizard', xmas: 'ch_event' };

  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function lang() {
    var r = document.getElementById('root-deck') || document.querySelector('#app [lang]');
    var l = ((r && r.getAttribute('lang')) || document.documentElement.getAttribute('lang') || 'en').slice(0, 2);
    return I[l] ? l : 'en';
  }
  function T() { return I[lang()]; }
  function dir() { return lang() === 'ar' ? 'rtl' : 'ltr'; }
  var VIA = window.KAREN_VIA ? window.KAREN_PLATFORMS[window.KAREN_VIA] : null;
  function mailUrl(msg) { if (VIA) return VIA.url; return 'mailto:' + (K.email || 'karenmilad2018@gmail.com') + '?subject=' + encodeURIComponent(T().subj) + '&body=' + encodeURIComponent(msg || T().wa); }
  function waUrl(msg) { if (VIA) return VIA.url; return 'https://wa.me/' + K.wa + '?text=' + encodeURIComponent(msg || T().wa); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var isHome = function () { return !!document.getElementById('root-deck'); };
  var busy = false; // only one pop-up at a time

  function status() {
    var on = true, back = '';
    try {
      var now = new Date();
      var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
      var h = +p.filter(function (x) { return x.type === 'hour'; })[0].value, m = +p.filter(function (x) { return x.type === 'minute'; })[0].value;
      on = K.to > K.from ? (h >= K.from && h < K.to) : (h >= K.from || h < K.to);
      if (!on) { var d = ((K.from * 60 - (h * 60 + m)) + 1440) % 1440; back = new Date(now.getTime() + d * 60000).toLocaleTimeString(lang() === 'ar' ? 'ar-EG' : lang(), { hour: 'numeric', minute: '2-digit' }); }
    } catch (e) {}
    return { on: on, back: back };
  }

  /* ---------- styles ---------- */
  var css = '' +
    '.kx{font-family:Manrope,"IBM Plex Sans Arabic",system-ui,sans-serif;box-sizing:border-box}.kx *{box-sizing:border-box}' +
    '.kx[dir=rtl]{font-family:"IBM Plex Sans Arabic",Manrope,sans-serif}' +
    '#k-fab{position:fixed;z-index:85;bottom:calc(18px + env(safe-area-inset-bottom,0px));inset-inline-end:18px;display:flex;align-items:center;gap:10px;flex-direction:row-reverse;text-decoration:none}' +
    '#k-fab .b{width:60px;height:60px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.22);transition:transform .2s}' +
    '#k-fab:hover .b{transform:scale(1.07)}' +
    '#k-fab .l{background:#FFFFFF;color:#0E1A2B;border-radius:999px;padding:8px 14px;font-size:14px;font-weight:800;box-shadow:0 6px 18px rgba(14,26,43,.18);display:flex;align-items:center;gap:8px;white-space:nowrap}' +
    '#k-fab .d{width:9px;height:9px;border-radius:50%;background:#9AA8B5}#k-fab .d.on{background:#25D366}' +
    '#k-fab.pulse .b{animation:kxPulse 1.2s ease-out 3}@keyframes kxPulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.6),0 10px 24px rgba(0,0,0,.22)}100%{box-shadow:0 0 0 22px rgba(37,211,102,0),0 10px 24px rgba(0,0,0,.22)}}' +
    '@media (max-width:640px){#k-fab .l{display:none}#k-fab .b{width:56px;height:56px}}' +
    '.kx-ov{position:fixed;inset:0;z-index:120;background:rgba(9,17,29,.55);display:flex;align-items:center;justify-content:center;padding:18px;animation:kxFade .25s ease both}' +
    '@keyframes kxFade{from{opacity:0}to{opacity:1}}@keyframes kxUp{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}' +
    '.kx-modal{background:#FFFFFF;color:#0E1A2B;border-radius:18px;max-width:440px;width:100%;padding:28px;position:relative;animation:kxUp .35s cubic-bezier(.2,.8,.2,1) both;box-shadow:0 30px 70px rgba(0,0,0,.35);text-align:center}' +
    '.kx-modal h3{margin:6px 0 10px;font-size:24px;line-height:1.25}.kx-modal p{margin:0 0 20px;color:#3E4650;font-size:16px;line-height:1.6}' +
    '.kx-ic{width:64px;height:64px;border-radius:18px;background:#E7F6EC;display:inline-flex;align-items:center;justify-content:center}' +
    '.kx-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:#25D366;color:#0B2A17;text-decoration:none;font-weight:800;font-size:16px;border-radius:12px;padding:15px 18px;border:0;cursor:pointer;font-family:inherit}' +
    '.kx-mail{background:#FFFFFF;color:#0E1A2B;border:1.5px solid #CCD6DC;margin-top:10px;font-size:15px}.kx-toast a.kx-tm{background:none;color:#9FD8E1;padding:9px 4px;text-decoration:underline}' +
    '.kx-no{background:none;border:0;color:#5E6470;font:inherit;font-weight:700;font-size:14px;margin-top:10px;cursor:pointer;padding:8px}' +
    '.kx-x{position:absolute;top:10px;inset-inline-end:10px;width:38px;height:38px;border-radius:50%;border:0;background:#F3F6F7;color:#0E1A2B;font-size:20px;cursor:pointer;line-height:1}' +
    '.kx-toast{position:fixed;z-index:86;bottom:calc(18px + env(safe-area-inset-bottom,0px));inset-inline-start:18px;max-width:340px;background:#0E1A2B;color:#FFFFFF;border-radius:14px;padding:16px 16px 14px;box-shadow:0 16px 40px rgba(0,0,0,.3);animation:kxUp .4s cubic-bezier(.2,.8,.2,1) both}' +
    '.kx-toast strong{display:block;font-size:16px;margin-bottom:4px;padding-inline-end:26px}.kx-toast p{margin:0 0 12px;font-size:14px;color:#C9D6E2;line-height:1.5}' +
    '.kx-toast a{display:inline-flex;background:#25D366;color:#0B2A17;font-weight:800;font-size:14px;text-decoration:none;border-radius:8px;padding:9px 14px}' +
    '.kx-toast .kx-x{background:rgba(255,255,255,.1);color:#FFFFFF;width:30px;height:30px;font-size:16px;top:8px;inset-inline-end:8px}' +
    '@media (max-width:640px){.kx-toast{inset-inline-start:12px;inset-inline-end:84px;max-width:none}}' +
    '.kx-ring{position:fixed;z-index:110;border-radius:14px;box-shadow:0 0 0 4px #4FA9B8,0 0 0 9999px rgba(9,17,29,.55);pointer-events:none;transition:all .35s cubic-bezier(.2,.8,.2,1)}' +
    '.kx-tip{position:fixed;z-index:111;width:min(320px,calc(100vw - 32px));background:#FFFFFF;color:#0E1A2B;border-radius:14px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,.35);animation:kxUp .3s ease both}' +
    '.kx-tip strong{display:block;font-size:17px;margin-bottom:6px}.kx-tip p{margin:0 0 14px;font-size:15px;line-height:1.55;color:#3E4650}' +
    '.kx-tip .r{display:flex;align-items:center;justify-content:space-between;gap:10px}.kx-tip .n{font-size:13px;font-weight:700;color:#5E6470}' +
    '.kx-tip button{font:inherit;cursor:pointer;border-radius:8px;font-weight:800;font-size:14px;padding:9px 14px}.kx-tip .go{background:#0E1A2B;color:#FFFFFF;border:0}.kx-tip .sk{background:none;border:0;color:#5E6470}' +
    '.kx-season{background:linear-gradient(90deg,#0E1A2B,#1E4A5A);color:#FFFFFF;font-size:14.5px}' +
    '.kx-season .in{max-width:1240px;margin:0 auto;padding:9px 56px 9px 24px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px 14px;position:relative;text-align:center}' +
    '.kx-season[dir=rtl] .in{padding:9px 24px 9px 56px}' +
    '.kx-season a,.kx-season button.go{background:#4FA9B8;color:#0E1A2B;font:inherit;font-weight:800;font-size:13.5px;border:0;border-radius:999px;padding:6px 14px;text-decoration:none;cursor:pointer}' +
    '.kx-season .kx-x{background:rgba(255,255,255,.12);color:#FFFFFF;width:30px;height:30px;font-size:16px;top:50%;transform:translateY(-50%)}' +
    '@media (max-width:640px){.kx-season{font-size:13px}.kx-season .in{flex-wrap:nowrap;justify-content:flex-start;padding:7px 46px 7px 12px;text-align:start}.kx-season[dir=rtl] .in{padding:7px 12px 7px 46px}.kx-p{display:none}.kx-new{display:none !important}.kx-season a,.kx-season button.go{white-space:nowrap;padding:5px 10px;font-size:12.5px}}' +
    '.kx-season{background:linear-gradient(90deg,#2A2150,#0E1A2B 45%,#1E4A5A)}.kx-new{color:#F2C14E;font-size:16px;animation:kxSpin 3s linear infinite;display:inline-block}' +
    '@keyframes kxSpin{to{transform:rotate(360deg)}}.kx-fade{animation:kxFade .6s ease both}' +
    '.kx-promo{background:linear-gradient(150deg,#2A2150,#0E1A2B);border:1px solid rgba(255,255,255,.12)}.kx-promo a{background:#F2C14E !important;color:#0E1A2B !important}' +
    '.kx-mini{position:relative;height:74px;border-radius:10px;background:#FFFFFF;margin:24px 0 12px;overflow:hidden;padding:20px 10px 8px;display:flex;flex-direction:column;gap:6px}' +
    '.kx-mini i{position:absolute;top:7px;width:7px;height:7px;border-radius:50%;background:#E05A3A;left:8px}.kx-mini i+i{left:19px;background:#F2C14E}.kx-mini i+i+i{left:30px;background:#25D366}' +
    '.kx-mini b{height:16px;border-radius:5px;background:linear-gradient(90deg,#0E1A2B,#5B4B8A);width:0;animation:kxGrow 2.4s ease infinite}' +
    '.kx-mini u{height:6px;border-radius:3px;background:#DCE5E9;width:0;animation:kxGrow 2.4s ease .3s infinite}.kx-mini u+u{animation-delay:.6s}' +
    '@keyframes kxGrow{0%{width:0}50%,100%{width:85%}}';
  css += '#k-fab.kx-via .b{background:#2D5BE3}#k-fab.kx-via .l{background:#fff;color:#0E1A2B;font-weight:700}html.k-via .k-online,html.k-via [data-k-online]{display:none!important}html.k-via a[data-via] svg{display:none!important}html.k-via a[data-via].wa,html.k-via a[data-via][class*="wa"],html.k-via a[data-via].btn-wa,html.k-via a.k-via-btn{background:#2D5BE3!important;border-color:#2D5BE3!important;color:#fff!important;box-shadow:0 10px 24px rgba(45,91,227,.28)!important}';
  var st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);

  var WA_SVG = '<svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>';

  var VIA_SVG = '<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16M11 13v2h2v-2"/></svg>';
  /* ---------- WhatsApp button with online status ---------- */
  var fab, lastL = '';
  function drawFab() {
    if (!fab) { fab = document.createElement('a'); fab.id = 'k-fab'; fab.className = 'kx'; fab.target = '_blank'; fab.rel = 'noopener'; document.body.appendChild(fab); }
    var t = T(), s = status();
    fab.setAttribute('dir', dir()); fab.href = waUrl(); fab.setAttribute('aria-label', t.fab);
    if (VIA) { fab.classList.add('kx-via'); fab.setAttribute('aria-label', t.flB); fab.innerHTML = '<span class="b">' + VIA_SVG + '</span><span class="l">' + esc(t.flB) + ' · ' + esc(VIA.proof[lang()] || VIA.proof.en) + '</span>'; return; }
    fab.innerHTML = '<span class="b">' + WA_SVG + '</span><span class="l"><span class="d' + (s.on ? ' on' : '') + '"></span>' + esc(s.on ? t.on : t.off.replace('{t}', s.back)) + '</span>';
  }


  /* ---------- "What is Freelancer?" explainer next to the contact button ---------- */
  var FLI = {
    en: ['What is Freelancer.com?', 'Freelancer.com is a global platform where clients hire freelancers safely. You pay into a protected milestone, and the money is released to me only when you approve the work. My rating there: 5.0 ★.', 'Safe payment'],
    ar: ['ما هو فريلانسر؟', 'Freelancer.com منصة عالمية يتعامل فيها العملاء مع المستقلين بأمان. تدفع في دفعة محمية (Milestone)، ولا تصلني الفلوس إلا بعد موافقتك على الشغل. تقييمي هناك 5.0 ★.', 'دفع آمن'],
    de: ['Was ist Freelancer.com?', 'Freelancer.com ist eine weltweite Plattform, auf der Kunden Freelancer sicher beauftragen. Sie zahlen in einen geschützten Meilenstein, und ich erhalte das Geld erst, wenn Sie die Arbeit freigeben. Meine Bewertung dort: 5.0 ★.', 'Sichere Zahlung'],
    es: ['¿Qué es Freelancer.com?', 'Freelancer.com es una plataforma mundial donde los clientes contratan freelancers con seguridad. Pagas en un hito protegido y el dinero me llega solo cuando apruebas el trabajo. Mi valoración allí: 5.0 ★.', 'Pago seguro']
  };
  var SHIELD = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>';
  var fli;
  function drawFlInfo() {
    if (!VIA) return;
    var L = FLI[lang()] || FLI.en;
    if (!fli) {
      fli = document.createElement('div'); fli.id = 'k-fli'; fli.className = 'kx';
      document.body.appendChild(fli);
      fli.addEventListener('click', function (ev) { if (ev.target.closest('.q')) fli.classList.toggle('open'); if (ev.target.closest('.x')) fli.classList.remove('open'); });
    }
    fli.setAttribute('dir', dir());
    fli.innerHTML = '<button type="button" class="q">' + SHIELD + '<span>' + esc(L[2]) + ' · Freelancer.com</span><b>?</b></button><div class="card" role="note"><button type="button" class="x" aria-label="close">×</button><strong>' + SHIELD + esc(L[0]) + '</strong><p>' + esc(L[1]) + '</p></div>';
  }
  var css2 = '#k-fli{position:fixed;z-index:86;bottom:calc(88px + env(safe-area-inset-bottom,0px));inset-inline-end:18px;font-family:Manrope,"IBM Plex Sans Arabic",sans-serif}' +
    '#k-fli .q{display:flex;align-items:center;gap:7px;background:#fff;color:#1E3FA8;border:1.5px solid #C9D6F5;border-radius:999px;padding:6px 8px 6px 12px;font:800 12.5px Manrope,"IBM Plex Sans Arabic",sans-serif;cursor:pointer;box-shadow:0 6px 18px rgba(14,26,43,.15)}' +
    '#k-fli .q b{width:20px;height:20px;border-radius:50%;background:#2D5BE3;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px}' +
    '#k-fli .card{display:none;position:absolute;bottom:44px;inset-inline-end:0;width:300px;max-width:calc(100vw - 36px);background:#fff;color:#0E1A2B;border-radius:16px;padding:16px 16px 14px;box-shadow:0 24px 50px rgba(14,26,43,.25);border:1px solid #E2E8EC}' +
    '#k-fli.open .card{display:block}#k-fli .card strong{display:flex;align-items:center;gap:7px;font-size:15px;color:#1E3FA8;margin-bottom:6px}#k-fli .card p{margin:0;font-size:13.5px;line-height:1.55;color:#3E4650}' +
    '#k-fli .x{position:absolute;top:6px;inset-inline-end:8px;border:0;background:none;font-size:20px;cursor:pointer;color:#7A8290}' +
    '@media (max-width:640px){#k-fli{bottom:calc(84px + env(safe-area-inset-bottom,0px))}#k-fli .q span{display:none}}';
  var st2 = document.createElement('style'); st2.textContent = css2; (document.head || document.documentElement).appendChild(st2);

  /* ---------- exit-intent pop-up (desktop only) ---------- */
  function exitPopup() {
    if (busy || ss('k-exit') || (+ls('k-exit') || 0) > Date.now() - 3 * 864e5) return;
    busy = true; ss('k-exit', '1'); ls('k-exit', String(Date.now()));
    var t = T(), ov = document.createElement('div');
    ov.className = 'kx kx-ov'; ov.setAttribute('dir', dir());
    ov.innerHTML = '<div class="kx-modal" role="dialog" aria-modal="true" aria-label="' + esc(t.exitT) + '"><button type="button" class="kx-x" aria-label="' + esc(t.close) + '">×</button>' +
      '<span class="kx-ic"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1E7145" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/></svg></span>' +
      '<h3>' + esc(t.exitT) + '</h3><p>' + esc(t.exitP) + '</p><a class="kx-btn" target="_blank" rel="noopener" href="' + waUrl() + '">' + esc(VIA ? t.flB : t.exitB) + '</a>' + (VIA ? '' : '<a class="kx-btn kx-mail" href="' + mailUrl() + '">' + esc(t.mail) + '</a>') + '<button type="button" class="kx-no">' + esc(t.no) + '</button></div>';
    function close() { ov.remove(); busy = false; document.removeEventListener('keydown', key); }
    function key(e) { if (e.key === 'Escape') close(); }
    ov.addEventListener('click', function (e) { if (e.target === ov || e.target.closest('.kx-x,.kx-no,.kx-btn')) close(); });
    document.addEventListener('keydown', key);
    document.body.appendChild(ov);
    try { ov.querySelector('.kx-btn').focus(); } catch (e) {}
  }
  var t0 = Date.now();
  document.addEventListener('mouseout', function (e) {
    if (e.relatedTarget || e.clientY > 0) return;
    if (Date.now() - t0 < 8000) return;
    try { if (!window.matchMedia('(pointer:fine)').matches || window.innerWidth < 900) return; } catch (err) { return; }
    exitPopup();
  });

  /* ---------- service toast after 30s on a service ---------- */
  function svcTitle() {
    var dlg = document.querySelector('#app [role=dialog][aria-modal=true]');
    if (dlg) return dlg.getAttribute('aria-label') || '';
    var h = document.querySelector('[data-l].on h1') || document.querySelector('main h1');
    return h && document.querySelector('[data-l]') ? h.textContent.trim() : '';
  }
  var svcSec = 0;
  function toast(title) {
    if (busy || ss('k-toast')) return;
    ss('k-toast', '1');
    var t = T(), el = document.createElement('div');
    el.className = 'kx kx-toast'; el.setAttribute('dir', dir()); el.setAttribute('role', 'status');
    var msg = t.wa + (title ? '\n• ' + title : '');
    el.innerHTML = '<button type="button" class="kx-x" aria-label="' + esc(t.close) + '">×</button><strong>' + esc(t.toastT) + '</strong><p>' + esc(t.toastP) + '</p><a target="_blank" rel="noopener" href="' + waUrl(msg) + '">' + esc(VIA ? t.flB : t.toastB) + '</a>' + (VIA ? '' : ' <a class="kx-tm" href="' + mailUrl(msg) + '">' + esc(t.mail) + '</a>');
    el.querySelector('.kx-x').addEventListener('click', function () { el.remove(); });
    el.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { el.remove(); }); });
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 25000);
  }

  /* ---------- first-visit tips (homepage) ---------- */
  function tips() {
    if (ls('k-tips') || busy || !isHome()) return;
    if (window.scrollY > 200 || document.querySelector('#app [role=dialog]')) return;
    busy = true; ls('k-tips', '1');
    var t = T(), targets = ['#k-hero-cta', '#k-wizard .k-wz', '#k-fab .b'], i = 0, raf;
    var ring = document.createElement('div'); ring.className = 'kx-ring';
    var tip = document.createElement('div'); tip.className = 'kx kx-tip'; tip.setAttribute('dir', dir()); tip.setAttribute('role', 'dialog');
    document.body.appendChild(ring); document.body.appendChild(tip);
    function end() { cancelAnimationFrame(raf); ring.remove(); tip.remove(); busy = false; document.removeEventListener('keydown', key); }
    function key(e) { if (e.key === 'Escape') end(); }
    document.addEventListener('keydown', key);
    function place() {
      var el = document.querySelector(targets[i]); if (!el) return;
      var r = el.getBoundingClientRect(), pad = 8, vw = window.innerWidth, vh = window.innerHeight;
      ring.style.left = (r.left - pad) + 'px'; ring.style.top = (r.top - pad) + 'px'; ring.style.width = (r.width + pad * 2) + 'px'; ring.style.height = Math.min(r.height + pad * 2, vh) + 'px';
      var tw = tip.offsetWidth, th = tip.offsetHeight;
      var x = Math.max(16, Math.min(vw - tw - 16, r.left + r.width / 2 - tw / 2));
      var y = r.bottom + 16; if (y + th > vh - 10) y = r.top - th - 16; if (y < 10) y = Math.min(vh - th - 10, r.top + 20);
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
      raf = requestAnimationFrame(place);
    }
    function show() {
      var el = document.querySelector(targets[i]);
      if (!el) { i++; if (i < targets.length) return show(); return end(); }
      if (i === 1) { try { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); } catch (e) {} }
      var last = i === targets.length - 1;
      tip.innerHTML = '<strong>' + esc(t.tips[i][0]) + '</strong><p>' + esc(t.tips[i][1]) + '</p><div class="r"><span class="n">' + (i + 1) + ' / ' + targets.length + '</span><span>' + (last ? '' : '<button type="button" class="sk">' + esc(t.skip) + '</button>') + '<button type="button" class="go">' + esc(last ? t.done : t.next) + '</button></span></div>';
      tip.querySelector('.go').onclick = function () { i++; if (i >= targets.length) { end(); try { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); } catch (e) {} } else show(); };
      var sk = tip.querySelector('.sk'); if (sk) sk.onclick = end;
      try { tip.querySelector('.go').focus({ preventScroll: true }); } catch (e) {}
    }
    show(); place();
  }

  /* ---------- seasonal banner (homepage) ---------- */
  function seasonKey() {
    var d; try { var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', month: 'numeric', day: 'numeric' }).formatToParts(new Date()); d = { m: +p.filter(function (x) { return x.type === 'month'; })[0].value, d: +p.filter(function (x) { return x.type === 'day'; })[0].value }; } catch (e) { var n = new Date(); d = { m: n.getMonth() + 1, d: n.getDate() }; }
    var m = d.m;
    if (m <= 2) return 'newyear'; if (m <= 4) return 'easter'; if (m <= 6) return 'thesis'; if (m <= 8) return 'summer'; if (m === 9) return 'school';
    if (m === 10 || (m === 11 && d.d < 20)) return 'iso'; if (m === 11) return 'bf'; return 'xmas';
  }
  /* ---------- announcement bar (all pages): website ad + seasonal offer, rotating ---------- */
  var WEBAD = {
    en: { h: 'New: websites', p: 'Your own website, designed and coded by hand, ready in 3–5 days.', pr: ' From $250.', b: 'See websites', pt: 'Need a website?', pp: 'Designed and coded by hand, ready in 3–5 days. Each year you only pay for your domain.', pb: 'See examples' },
    ar: { h: 'جديد: المواقع الإلكترونية', p: 'موقعك الخاص بتصميم وبرمجة يدوية، جاهز خلال 3–5 أيام.', pr: ' من 250 دولاراً.', b: 'شاهد المواقع', pt: 'تحتاج موقعاً إلكترونياً؟', pp: 'تصميم وبرمجة يدوية، جاهز خلال 3–5 أيام. ولا تدفع سنوياً إلا ثمن الدومين.', pb: 'شاهد الأمثلة' },
    de: { h: 'Neu: Websites', p: 'Ihre eigene Website, von Hand gestaltet und programmiert, fertig in 3–5 Tagen.', pr: ' Ab 250 $.', b: 'Websites ansehen', pt: 'Sie brauchen eine Website?', pp: 'Von Hand gestaltet und programmiert, fertig in 3–5 Tagen. Jährlich zahlen Sie nur Ihre Domain.', pb: 'Beispiele ansehen' },
    es: { h: 'Nuevo: webs', p: 'Tu propia web, diseñada y programada a mano, lista en 3–5 días.', pr: ' Desde 250 $.', b: 'Ver webs', pt: '¿Necesitas una web?', pp: 'Diseñada y programada a mano, lista en 3–5 días. Al año solo pagas tu dominio.', pb: 'Ver ejemplos' }
  };
  function base() { return /\/services\//.test(location.pathname) ? '../' : ''; }
  function onWebPage() { return /websites\.html/.test(location.pathname); }
  var season, rotT, rotI = 0;
  function drawSeason() {
    if (onWebPage() || ss('k-bar-off')) { if (season) { season.remove(); season = null; } return; }
    var t = T(), w = WEBAD[lang()] || WEBAD.en, msgs = [];
    msgs.push({ h: w.h, p: w.p + (window.KAREN_HIDE ? '' : w.pr), b: '<a href="' + base() + 'websites.html">' + esc(w.b) + '</a>' });
    var key = seasonKey(), app = document.getElementById('app');
    if (isHome() && !ls('k-season-' + key + '-' + new Date().getFullYear())) {
      var x = t.s[key], go = SEASON_GO[key];
      msgs.push({ h: x[0], p: window.KAREN_HIDE ? x[1].replace(/[^.。]*\d+\s?%[^.]*\.?/g, '').trim() : x[1], go: go, b: go.indexOf('.html') !== -1 ? '<a href="' + go + '">' + esc(x[2]) + '</a>' : '<button type="button" class="go">' + esc(x[2]) + '</button>' });
    }
    if (!season) {
      season = document.createElement('div'); season.className = 'kx kx-season'; season.setAttribute('role', 'region');
      document.body.insertBefore(season, app || document.body.firstChild);
    }
    season.setAttribute('dir', dir());
    function show() {
      var m = msgs[rotI % msgs.length];
      season.innerHTML = '<div class="in kx-fade"><span class="kx-new">★</span><span><strong>' + esc(m.h) + '</strong><span class="kx-p"> ' + esc(m.p) + '</span></span>' + m.b + '<button type="button" class="kx-x" aria-label="' + esc(t.close) + '">×</button></div>';
      var b = season.querySelector('button.go');
      if (b) b.onclick = function () { if (m.go.charAt(0) === '#') { var el = document.querySelector(m.go); if (el) el.scrollIntoView({ behavior: 'smooth' }); } else if (window.__kOpen) window.__kOpen(m.go); };
      season.querySelector('.kx-x').onclick = function () { ss('k-bar-off', '1'); clearInterval(rotT); season.remove(); season = null; };
    }
    clearInterval(rotT); show();
    if (msgs.length > 1 && !reduce) rotT = setInterval(function () { if (!season) return clearInterval(rotT); rotI++; show(); }, 7000);
  }
  /* ---------- website promo card (once per visit) ---------- */
  function webPromo() {
    if (onWebPage() || busy || ss('k-promo') || document.querySelector('.kx-toast')) return;
    ss('k-promo', '1');
    var w = WEBAD[lang()] || WEBAD.en, t = T(), el = document.createElement('div');
    el.className = 'kx kx-toast kx-promo'; el.setAttribute('dir', dir()); el.setAttribute('role', 'status');
    el.innerHTML = '<button type="button" class="kx-x" aria-label="' + esc(t.close) + '">×</button><div class="kx-mini" aria-hidden="true"><i></i><i></i><i></i><b></b><u></u><u></u></div><strong>' + esc(w.pt) + '</strong><p>' + esc(w.pp) + '</p><a href="' + base() + 'websites.html">' + esc(w.pb) + ' →</a>';
    el.querySelector('.kx-x').addEventListener('click', function () { el.remove(); });
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 20000);
  }

  /* ---------- homepage animations ---------- */
  // two states for an abstract slide: [left, top, width, height, colour, rotate, opacity, radius]
  var SL = [
    [[5, 6, 62, 7, '#3B4A5E', -1.5, 1, 2], [6, 10, 44, 8, '#0E1A2B', 0, 1, 3]],
    [[44, 15, 48, 4, '#E05A3A', 2, 1, 2], [6, 22, 28, 3.5, '#4FA9B8', 0, 1, 3]],
    [[5, 24, 88, 3, '#9AA5B1', 0, 1, 2], [6, 64, 30, 3, '#B9C2CC', 0, 1, 3]],
    [[5, 30, 80, 3, '#9AA5B1', .5, 1, 2], [6, 70, 26, 3, '#B9C2CC', 0, 1, 3]],
    [[5, 36, 90, 3, '#9AA5B1', 0, 1, 2], [6, 76, 20, 3, '#B9C2CC', 0, 1, 3]],
    [[5, 42, 72, 3, '#9AA5B1', -.5, 1, 2], [6, 82, 0, 3, '#B9C2CC', 0, 0, 3]],
    [[5, 48, 86, 3, '#9AA5B1', 0, 1, 2], [6, 82, 0, 3, '#B9C2CC', 0, 0, 3]],
    [[5, 54, 60, 3, '#9AA5B1', 0, 1, 2], [6, 82, 0, 3, '#B9C2CC', 0, 0, 3]],
    [[8, 76, 2.5, 8, '#E05A3A', 0, 1, 1], [54, 50, 7, 30, '#0E1A2B', 0, 1, 3]],
    [[11, 72, 2.5, 12, '#F2C14E', 0, 1, 1], [64, 40, 7, 40, '#0E1A2B', 0, 1, 3]],
    [[14, 78, 2.5, 6, '#7A4FD1', 0, 1, 1], [74, 30, 7, 50, '#0E1A2B', 0, 1, 3]],
    [[17, 70, 2.5, 14, '#25D366', 0, 1, 1], [84, 18, 7, 62, '#4FA9B8', 0, 1, 3]],
    [[50, 90, 0, .8, '#CCD6DC', 0, 0, 0], [51, 80.6, 43, .8, '#CCD6DC', 0, 1, 0]],
    [[74, 62, 15, 26, '#7A4FD1', 14, .9, 50], [92, 8, 3, 5, '#4FA9B8', 0, 0, 50]],
    [[30, 66, 22, 18, '#F7E1DA', -4, 1, 4], [6, 33, 34, 24, 'transparent', 0, 1, 3]],
    [[88, 88, 6, 7, '#25D366', 0, 1, 50], [88, 9, 5, 6, '#4FA9B8', 0, 1, 50]]
  ];
  function elStyle(v) { return 'left:' + v[0] + '%;top:' + v[1] + '%;width:' + v[2] + '%;height:' + v[3] + '%;background:' + v[4] + ';transform:rotate(' + v[5] + 'deg);opacity:' + v[6] + ';border-radius:' + (v[7] === 50 ? '50%' : v[7] + 'px'); }
  function slideHTML(state, withTag) {
    var h = '';
    SL.forEach(function (e, i) {
      var inner = i === 14 ? '<span style="display:flex;width:100%;height:100%;align-items:center;font:800 ' + (state ? '13cqw' : '4cqw') + '/1 Manrope,sans-serif;color:' + (state ? '#0E1A2B' : '#A33C1E') + ';transition:all 1.1s cubic-bezier(.6,.05,.2,1);padding-inline-start:' + (state ? '0' : '6%') + '">+38%</span>' : '';
      h += '<span class="el" data-i="' + i + '" style="' + elStyle(e[state]) + '">' + inner + '</span>';
    });
    return h;
  }
  function setState(root, state) {
    var els = root.querySelectorAll('.el');
    for (var i = 0; i < els.length; i++) {
      var v = SL[i][state]; els[i].setAttribute('style', elStyle(v));
      if (i === 14) { var sp = els[i].firstChild; sp.style.fontSize = state ? '13cqw' : '4cqw'; sp.style.color = state ? '#0E1A2B' : '#A33C1E'; sp.style.paddingInlineStart = state ? '0' : '6%'; }
    }
    root.classList.toggle('clean', !!state);
    var tag = root.querySelector('.tag'); if (tag) tag.textContent = state ? '✓ ' + T().after : '✗ ' + T().before;
  }
  function initSlide() {
    var a = document.querySelector('.k-anim[data-keep]'); if (!a || a.__k) return; a.__k = 1;
    a.style.containerType = 'inline-size';
    a.innerHTML = slideHTML(0) + '<span class="tag"></span><svg class="cur" viewBox="0 0 24 24" style="left:70%;top:70%"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#0E1A2B" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    var cur = a.querySelector('.cur'), s = 0;
    if (reduce) { setState(a, 1); cur.style.display = 'none'; return; }
    setState(a, 0);
    function loop() {
      if (!document.body.contains(a)) return;
      s = 1 - s;
      cur.style.left = s ? '58%' : '72%'; cur.style.top = s ? '44%' : '66%';
      setTimeout(function () { setState(a, s); }, 350);
      setTimeout(loop, s ? 4200 : 2600);
    }
    setTimeout(loop, 1600);
  }
  function initBA() {
    var b = document.querySelector('.k-ba[data-keep]'); if (!b || b.__k) return; b.__k = 1;
    b.innerHTML = '<div class="pane before" style="background:#FFFFFF;container-type:inline-size">' + slideHTML(0) + '</div><div class="pane after" style="background:#FFFFFF;container-type:inline-size">' + slideHTML(1) + '</div><div class="handle"></div><div class="knob">‹ ›</div><input type="range" min="0" max="100" value="50" aria-label="Before / After">';
    var inp = b.querySelector('input'), after = b.querySelector('.after'), hd = b.querySelector('.handle'), kn = b.querySelector('.knob');
    function set(v) { after.style.clipPath = 'inset(0 0 0 ' + v + '%)'; hd.style.left = v + '%'; kn.style.left = v + '%'; }
    inp.addEventListener('input', function () { set(inp.value); b.__touched = 1; });
    set(50);
    if (reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; io.disconnect();
      var t0 = performance.now();
      (function step(t) { if (b.__touched) return; var p = Math.min(1, (t - t0) / 2600); var v = 50 + Math.sin(p * Math.PI * 2) * 32 * (1 - p * .2); set(p >= 1 ? 50 : v); inp.value = p >= 1 ? 50 : v; if (p < 1) requestAnimationFrame(step); })(t0);
    }, { threshold: .6 });
    io.observe(b);
  }
  function initXL() {
    var x = document.querySelector('.k-xl[data-keep]'); if (!x || x.__k) return; x.__k = 1;
    var L = lang(), mon = [];
    for (var i = 0; i < 5; i++) { try { mon.push(new Date(2026, i, 1).toLocaleString(L === 'ar' ? 'ar-EG' : L, { month: 'short' })); } catch (e) { mon.push(['Jan', 'Feb', 'Mar', 'Apr', 'May'][i]); } }
    var sales = [4200, 5100, 4800, 6300, 7100], cost = [2600, 2900, 3100, 3300, 3600];
    var g = '<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-bottom:1px solid #DCE5E9;background:#F7F9FA"><b style="color:#1E7145;font-style:italic">fx</b><span class="fx" style="font-family:ui-monospace,Menlo,monospace;color:#3E4650">=B2-C2</span></div>';
    g += '<div style="display:grid;grid-template-columns:22px 1.1fr 1fr 1fr 1fr;flex:1;font-size:11.5px">';
    var hd = ['', 'A', 'B', 'C', 'D'];
    hd.forEach(function (h) { g += '<span style="background:#EEF2F4;border-right:1px solid #DCE5E9;border-bottom:1px solid #DCE5E9;padding:4px;text-align:center;color:#5E6470">' + h + '</span>'; });
    g += '<span style="background:#EEF2F4;border-right:1px solid #DCE5E9;border-bottom:1px solid #DCE5E9;padding:4px;text-align:center;color:#5E6470">1</span>';
    ['', 'Sales', 'Cost', 'Profit'].forEach(function (h, k) { g += '<span style="border-right:1px solid #E7EDF0;border-bottom:1px solid #E7EDF0;padding:4px 6px;font-weight:800;background:#1E7145;color:#FFFFFF">' + (k === 0 ? '' : ['', 'Σ', '−', '='][k] + ' ') + '</span>'; });
    for (var r = 0; r < 5; r++) {
      g += '<span style="background:#EEF2F4;border-right:1px solid #DCE5E9;border-bottom:1px solid #DCE5E9;padding:4px;text-align:center;color:#5E6470">' + (r + 2) + '</span>';
      g += '<span style="border-right:1px solid #E7EDF0;border-bottom:1px solid #E7EDF0;padding:4px 6px;font-weight:700">' + mon[r] + '</span>';
      g += '<span class="c" data-v="' + sales[r] + '" style="border-right:1px solid #E7EDF0;border-bottom:1px solid #E7EDF0;padding:4px 6px;text-align:right"></span>';
      g += '<span class="c" data-v="' + cost[r] + '" style="border-right:1px solid #E7EDF0;border-bottom:1px solid #E7EDF0;padding:4px 6px;text-align:right"></span>';
      g += '<span class="c p" data-v="' + (sales[r] - cost[r]) + '" data-f="=B' + (r + 2) + '-C' + (r + 2) + '" style="border-right:1px solid #E7EDF0;border-bottom:1px solid #E7EDF0;padding:4px 6px;text-align:right;color:#1E7145;font-weight:800;transition:background .3s"></span>';
    }
    g += '<span style="background:#EEF2F4;border-right:1px solid #DCE5E9;padding:4px;text-align:center;color:#5E6470">7</span><span style="padding:4px 6px;font-weight:800">Σ</span>';
    g += '<span class="c t" data-v="' + sales.reduce(function (a, b) { return a + b; }) + '" data-f="=SUM(B2:B6)" style="padding:4px 6px;text-align:right;font-weight:800;border-top:2px solid #0E1A2B"></span>';
    g += '<span class="c t" data-v="' + cost.reduce(function (a, b) { return a + b; }) + '" data-f="=SUM(C2:C6)" style="padding:4px 6px;text-align:right;font-weight:800;border-top:2px solid #0E1A2B"></span>';
    g += '<span class="c t" data-v="' + (sales.reduce(function (a, b) { return a + b; }) - cost.reduce(function (a, b) { return a + b; })) + '" data-f="=SUM(D2:D6)" style="padding:4px 6px;text-align:right;font-weight:800;color:#1E7145;border-top:2px solid #0E1A2B"></span>';
    g += '</div><div class="ch" style="display:flex;align-items:flex-end;gap:8%;height:30%;padding:8px 12% 10px;border-top:1px solid #DCE5E9;background:#FBFCFD">';
    for (var k = 0; k < 5; k++) g += '<span class="bar" style="flex:1;height:0;background:' + (k === 4 ? '#4FA9B8' : '#1E7145') + ';border-radius:3px 3px 0 0;transition:height .6s cubic-bezier(.2,.8,.2,1)"></span>';
    g += '</div>';
    x.innerHTML = g;
    // header labels: keep them short and language-neutral
    var hs = x.querySelectorAll('div[style*="grid"] > span[style*="#1E7145;color:#FFFFFF"]');
    var lab = { en: ['Month', 'Sales', 'Cost', 'Profit'], ar: ['الشهر', 'مبيعات', 'تكلفة', 'ربح'], de: ['Monat', 'Umsatz', 'Kosten', 'Gewinn'], es: ['Mes', 'Ventas', 'Costo', 'Ganancia'] }[L];
    for (var q = 0; q < hs.length; q++) hs[q].textContent = lab[q];
    var cells = x.querySelectorAll('.c'), fx = x.querySelector('.fx'), bars = x.querySelectorAll('.bar');
    var maxP = Math.max.apply(null, sales.map(function (s, i) { return s - cost[i]; }));
    function fmt(v) { return Number(v).toLocaleString('en-US'); }
    function reset() { for (var i = 0; i < cells.length; i++) cells[i].textContent = ''; for (var j = 0; j < bars.length; j++) bars[j].style.height = '0'; fx.textContent = '=B2-C2'; }
    function full() { for (var i = 0; i < cells.length; i++) cells[i].textContent = fmt(cells[i].getAttribute('data-v')); for (var j = 0; j < bars.length; j++) bars[j].style.height = Math.round((sales[j] - cost[j]) / maxP * 100) + '%'; }
    if (reduce) { full(); return; }
    var order = [];
    for (var rr = 0; rr < 5; rr++) { order.push(rr * 3, rr * 3 + 1); }
    for (var pr = 0; pr < 5; pr++) order.push(pr * 3 + 2);
    order.push(15, 16, 17);
    function run() {
      if (!document.body.contains(x)) return;
      reset(); var n = 0;
      (function next() {
        if (n >= order.length) {
          for (var j = 0; j < bars.length; j++) (function (j) { setTimeout(function () { bars[j].style.height = Math.round((sales[j] - cost[j]) / maxP * 100) + '%'; }, j * 140); })(j);
          setTimeout(run, 5200); return;
        }
        var c = cells[order[n]], f = c.getAttribute('data-f');
        if (f) { fx.textContent = f; c.style.background = '#E3F4EA'; setTimeout(function () { c.style.background = ''; }, 380); }
        c.textContent = fmt(c.getAttribute('data-v'));
        n++; setTimeout(next, f ? 300 : 120);
      })();
    }
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); run(); } }, { threshold: .4 }); io.observe(x); } else run();
  }
  function initCounters() {
    var ns = document.querySelectorAll('.k-num[data-count]');
    if (!('IntersectionObserver' in window) || reduce) return;
    for (var i = 0; i < ns.length; i++) (function (n) {
      if (n.__k) return; n.__k = 1;
      var to = +n.getAttribute('data-count'), suf = n.getAttribute('data-suf') || '';
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return; io.disconnect();
        var t0 = performance.now();
        (function step(t) { var p = Math.min(1, (t - t0) / 1300); var e = 1 - Math.pow(1 - p, 3); n.textContent = Math.round(to * e) + (p >= 1 ? suf : ''); if (p < 1) requestAnimationFrame(step); })(t0);
      }, { threshold: .6 });
      io.observe(n);
    })(ns[i]);
  }
  // typing examples in the services search box
  var ty = { i: 0, c: 0, dir: 1, wait: 0 };
  function typing() {
    var inp = document.querySelector('#services input[type=search]');
    if (!inp || reduce) return;
    if (document.activeElement === inp || inp.value) return;
    var list = T().typing, w = list[ty.i % list.length];
    if (ty.wait > 0) { ty.wait--; }
    else if (ty.dir > 0) { ty.c++; if (ty.c >= w.length) { ty.dir = -1; ty.wait = 22; } }
    else { ty.c--; if (ty.c <= 0) { ty.dir = 1; ty.i++; ty.wait = 4; } }
    inp.setAttribute('placeholder', w.slice(0, ty.c) + (ty.wait > 0 && ty.dir < 0 ? '' : '|'));
  }

  window.__afterDraw = function () {
    try { if (window.KAREN_VIA && typeof sweep === 'function') setTimeout(sweep, 0); } catch (e) {}
    try { initSlide(); initBA(); initXL(); initCounters(); } catch (e) {}
    var L = lang(); if (L !== lastL && fab) { lastL = L; drawFab(); drawSeason(); }
  };

  var QT = { en: 'Ask for a quote', ar: 'اطلب عرض سعر', de: 'Angebot anfragen', es: 'Pide presupuesto' };
  function hideStaticPrices() {
    if (!window.KAREN_HIDE || isHome()) return;
    var b = document.querySelectorAll('.badges span[dir=ltr]'); for (var i = 0; i < b.length; i++) b[i].remove();
    var p = document.querySelectorAll('.pk b.p'); for (var j = 0; j < p.length; j++) { var bl = p[j].closest('[data-l]'); p[j].textContent = QT[(bl && bl.getAttribute('data-l')) || 'en'] || QT.en; p[j].removeAttribute('dir'); }
  }

  /* platform mode: rewrite every contact link and mention on the page */
  var FLW = [[/WhatsApp (?:or|and) (?:email|e-mail)/gi, 'Freelancer messages'], [/(?:email|e-mail) (?:or|and) WhatsApp/gi, 'Freelancer messages'],
    [/واتساب أو البريد(?: الإلكتروني)?/g, 'رسائل فريلانسر'], [/عبر واتساب/g, 'عبر فريلانسر'], [/واتساب/g, 'فريلانسر'],
    [/WhatsApp oder E-Mail/g, 'Freelancer-Nachrichten'], [/WhatsApp o (?:email|correo(?: electrónico)?)/g, 'mensajes de Freelancer'],
    [/WhatsApp/g, 'Freelancer'], [/karenmilad2018@gmail\.com/g, ''], [/\+?20 ?120 ?708 ?2281/g, '']];
  function sweep() {
    if (!VIA) return;
    var a = document.querySelectorAll('a[href]');
    for (var i = 0; i < a.length; i++) {
      var h = a[i].getAttribute('href') || '';
      if (/wa\.me|whatsapp\.com/.test(h) || (a[i].getAttribute('data-via') && h !== VIA.url)) { a[i].setAttribute('href', VIA.url); a[i].target = '_blank'; a[i].rel = 'noopener'; }
      if (a[i].getAttribute('href') === VIA.url && a[i].id !== 'k-fab' && !a[i].getAttribute('data-via')) {
        a[i].setAttribute('data-via', '1');
        var bg = getComputedStyle(a[i]).backgroundColor, mm = /rgba?\((\d+), (\d+), (\d+)/.exec(bg);
        if (mm && +mm[2] > 150 && +mm[2] > +mm[1] + 60 && +mm[2] > +mm[3] + 40) a[i].classList.add('k-via-btn');
      }
      else if (/^mailto:|fiverr\.com|khamsat|mostaql|peopleperhour|upwork/.test(h)) { if (a[i].style.display !== 'none') a[i].style.display = 'none'; }
    }
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) if (/WhatsApp|واتساب|karenmilad2018@|708 ?2281/.test(n.nodeValue) && !(n.parentNode && (/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName) || (n.parentNode.closest && n.parentNode.closest('[data-nosweep],[data-t=tp2d]'))))) list.push(n);
    list.forEach(function (n) { var v = n.nodeValue; FLW.forEach(function (r) { v = v.replace(r[0], r[1]); }); if (v !== n.nodeValue) n.nodeValue = v; });
  }
  function boot() {
    hideStaticPrices();
    if (VIA) { document.documentElement.classList.add('k-via'); sweep(); setInterval(sweep, 600); }
    lastL = lang();
    drawFab(); drawSeason(); drawFlInfo();
    window.__afterDraw();
    setTimeout(function () { if (fab && !reduce) { fab.classList.add('pulse'); setTimeout(function () { fab.classList.remove('pulse'); }, 4000); } }, 10000);
    if (!VIA) { setTimeout(tips, 2500); setTimeout(webPromo, 18000); }
    setInterval(typing, 90);
    // static pages: watch language changes made by their own switcher
    setInterval(function () { var L = lang(); if (L !== lastL) { lastL = L; drawFab(); drawSeason(); drawFlInfo(); } }, 800);
    // service toast: 30s on a service page or in the service view
    setInterval(function () {
      var title = svcTitle();
      if (title) { svcSec++; if (svcSec === 30) toast(title); } else svcSec = 0;
    }, 1000);
    // refresh online status every minute
    setInterval(drawFab, 60000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
