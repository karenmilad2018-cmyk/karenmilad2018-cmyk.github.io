(function(){
var D=window.D||{T:{en:{}}},L='en',$=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var TZ=(function(){try{var p=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',timeZoneName:'shortOffset'}).formatToParts(new Date());var z=p.filter(function(x){return x.type==='timeZoneName'})[0];return z?z.value:'GMT+2'}catch(e){return 'GMT+2'}})();
function T(k){var t=D.T[L]||{};var v=t[k]!=null?t[k]:(D.T.en||{})[k];return v==null?'':String(v).replace(/\{tz\}/g,TZ)}
window.KT=T;
/* ---------- prices hidden for visitors in Egypt (by device time zone); Karen sees them after opening the site once with ?me=1 ---------- */
var NP=false;try{NP=Intl.DateTimeFormat().resolvedOptions().timeZone==='Africa/Cairo'}catch(e){}
try{var q=location.search;if(/[?&]me=1\b/.test(q))localStorage.setItem('km_me','1');if(/[?&]me=0\b/.test(q))localStorage.removeItem('km_me');if(localStorage.getItem('km_me')==='1')NP=false}catch(e){}
(function(){var A={en:'Ask for a price',ar:'اطلب السعر',de:'Preis anfragen',es:'Pide el precio'};D.T=D.T||{};for(var l in A){D.T[l]=D.T[l]||{};D.T[l].askP=A[l]}})();
function noPrice(){if(!NP)return;document.documentElement.classList.add('np');
 $$('b,span,small,em').forEach(function(el){if(el.children.length)return;var t=(el.textContent||'').trim();if(/^\$\s?[\d,.]+/.test(t)){el.setAttribute('data-t','askP');el.textContent=T('askP')}});
 $$('a[href*="mail.google.com"]').forEach(function(a){a.href=a.href.replace(/%20%C2%B7%20%24\d+/g,'').replace(/Fixed%20price%3A%20%24\d+/g,'Please%20send%20me%20the%20price.')});}
window.KNoPrice=noPrice;

function pick(){var l=null;try{l=localStorage.getItem('k3-lang')}catch(e){}var q=/[?&]lang=(en|ar|de|es)/.exec(location.search);if(q)l=q[1];
 if(!l){var n=(navigator.languages||[navigator.language||'en']).map(function(x){return (x||'').slice(0,2)});for(var i=0;i<n.length;i++){if(['en','ar','de','es'].indexOf(n[i])>=0){l=n[i];break}}}return l||'en'}
function apply(l){L=l;var h=document.documentElement;h.lang=l;h.dir=l==='ar'?'rtl':'ltr';
 $$('[data-t]').forEach(function(x){var v=T(x.getAttribute('data-t'));if(v){if(x.hasAttribute('data-n'))v=v.replace('{n}',x.getAttribute('data-n'));x.textContent=v}});
 $$('[data-ta]').forEach(function(x){x.setAttribute('aria-label',T(x.getAttribute('data-ta')))});
 var s=$('#lg');if(s)s.value=l;document.dispatchEvent(new Event('k3lang'));splitWords()}
function splitWords(){$$('.split').forEach(function(el){$$('[data-t]',el).concat(el.hasAttribute('data-t')?[el]:[]).forEach(function(x){var txt=x.textContent;x.innerHTML='';txt.split(/(\s+)/).forEach(function(w,i){if(/^\s+$/.test(w)){x.appendChild(document.createTextNode(w));return}var s=document.createElement('span');s.className='wd';s.style.transitionDelay=(i*0.045)+'s';s.textContent=w;x.appendChild(s)})})})}
window.KL=function(){return L};
document.addEventListener('DOMContentLoaded',function(){
 apply(pick());
 var lg=$('#lg');if(lg)lg.addEventListener('change',function(){try{localStorage.setItem('k3-lang',lg.value)}catch(e){}apply(lg.value)});
 var mn=$('.mn');if(mn)mn.addEventListener('click',function(){var n=$('.nav');n.classList.toggle('open');mn.setAttribute('aria-expanded',n.classList.contains('open'))});
 noPrice();
 // online status (my hours 9-23 in my time zone)
 var h=+new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',hour:'numeric',hour12:false}).format(new Date())%24;
 if(!(h>=9&&h<23))$$('.st').forEach(function(s){s.classList.add('off');var b=$('b',s),p=$('span',s);b.setAttribute('data-t','off');p.setAttribute('data-t','back');b.textContent=T('off');p.textContent=T('back')});
 // reveal
 var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.18,rootMargin:'0px 0px -6% 0px'}):null;
 $$('.rv,.split,.hws,.pst,.draw,.obs').forEach(function(x){io?io.observe(x):x.classList.add('in')});
 // scroll-driven 3D
 var stk=$('.stk'),srv=$$('.srv img');
 function onS(){var vh=innerHeight;if(stk){var r=stk.parentNode.getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh-r.top)/(vh*0.9)));stk.style.setProperty('--rx',(26-26*p).toFixed(2)+'deg');stk.style.setProperty('--sc',(.9+.1*p).toFixed(3));stk.style.setProperty('--sp',(1-.35*p).toFixed(3))}
  srv.forEach(function(im){var r=im.getBoundingClientRect(),c=(r.top+r.height/2-vh/2)/vh;im.style.setProperty('--rx2',(c*10).toFixed(2)+'deg')})}
 if(stk||srv.length){addEventListener('scroll',function(){requestAnimationFrame(onS)},{passive:true});onS()}
 // before/after
 $$('.ba').forEach(function(w){var r=$('input',w);function s(){w.style.setProperty('--x',r.value+'%')}r.addEventListener('input',s);s()});
 // lightbox
 var lb=document.createElement('div');lb.id='lbx';lb.innerHTML='<img alt="">';document.body.appendChild(lb);lb.addEventListener('click',function(){lb.classList.remove('on')});
 $$('a.lb').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();$('img',lb).src=a.getAttribute('href');lb.classList.add('on')})});
 chooser();deck();brand();stage();tabs();toast(h>=9&&h<23);tipv();
});
// ---------- delivery date (starts at 9:00 my time if sent outside my hours), shown in visitor's own time ----------
function deliveryDate(hours){var now=new Date(),h=+new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',hour:'numeric',hour12:false}).format(now)%24,start=now;
 if(!(h>=9&&h<23)){var add=h>=23?(24-h+9):(9-h);start=new Date(now.getTime()+add*3600e3);start.setMinutes(0,0,0)}
 var t=new Date(start.getTime()+hours*3600e3);var loc={en:'en-GB',ar:'ar-u-nu-latn',de:'de-DE',es:'es-ES'}[L]||'en-GB';
 try{return new Intl.DateTimeFormat(loc,{weekday:'long',day:'numeric',month:'long',hour:'numeric',minute:'2-digit'}).format(t)}catch(e){return t.toString()}}
window.KDel=deliveryDate;
function mailHref(svcKey,j){var x=D.SV[svcKey];var body='Service: '+D.T.en['psn_'+svcKey]+'\nPackage: '+D.T.en['tier'+j]+' ('+D.T.en['psz_'+svcKey+j]+')\n'+(NP?'Please send me the price.':'Fixed price: $'+x.p[j])+'\n\nMy file is attached.';
 return D.GM+'&su='+encodeURIComponent('Order: '+D.T.en['psn_'+svcKey]+' · $'+x.p[j])+'&body='+encodeURIComponent(body)}
window.KMail=mailHref;
// ---------- chooser ----------
function chooser(){var root=$('#chooser');if(!root)return;var k=root.getAttribute('data-k')||'pitch',j=1;
 function draw(){$$('.op',root).forEach(function(b){b.classList.toggle('on',b.getAttribute('data-k')===k)});
  var x=D.SV[k];$$('.tier',root).forEach(function(b,i){b.classList.toggle('on',i===j);var s=$('small',b);s.setAttribute('data-t','psz_'+k+i);s.textContent=T('psz_'+k+i)});
  var R=$('#res');$('.rn',R).setAttribute('data-t','psn_'+k);$('.rn',R).textContent=T('psn_'+k);
  $('.sz',R).textContent=T('tier'+j)+' · '+T('psz_'+k+j);$('s',R).textContent='$'+x.m[j];$('.pb',R).textContent='$'+x.p[j];$('.sv',R).textContent=T('save')+' '+Math.round((1-x.p[j]/x.m[j])*100)+'%';
  $('.dd',R).textContent=deliveryDate(x.d[j]==='d2'?48:24);$('.dl2',R).textContent=T('psl_'+k+j);
  $('#rMail').href=mailHref(k,j);noPrice();$('#rSee').href=D.PRE+'s/'+k+'.html'}
 $$('.op',root).forEach(function(b){b.addEventListener('click',function(){k=b.getAttribute('data-k');draw()})});
 $$('.tier',root).forEach(function(b,i){b.addEventListener('click',function(){j=i;draw()})});
 document.addEventListener('k3lang',draw);draw()}
// ---------- tabs ----------
function tabs(){$$('.tabs').forEach(function(tb){var bs=$$('.tab',tb);bs.forEach(function(b){b.addEventListener('click',function(){go(b.getAttribute('data-p'))})});
 function go(p){bs.forEach(function(x){x.classList.toggle('on',x.getAttribute('data-p')===p)});$$('.tpn').forEach(function(x){x.classList.toggle('on',x.id===p)});document.dispatchEvent(new Event('k3tab'))}
 window.KTab=go})}
// ---------- deck check ----------
var SAFE=['arial','calibri','calibri light','cambria','times new roman','segoe ui','segoe ui light','segoe ui semibold','tahoma','verdana','georgia','trebuchet ms','courier new','aptos','aptos display','arial black','impact','consolas','symbol','wingdings','century gothic','gill sans mt','franklin gothic medium','garamond','book antiqua','palatino linotype','lucida sans unicode','arial narrow','corbel','candara','constantia','sakkal majalla','traditional arabic','simplified arabic','arabic typesetting'];
function deck(){var f=$('#dzf'),z=$('#dz'),R=$('#rep');if(!f)return;var last=null;
 function sp(k){return '<span data-t="'+k+'">'+T(k)+'</span>'}
 function lib(cb){if(window.JSZip)return cb();var s=document.createElement('script');s.src=D.PRE+'assets/jszip.min.js';s.onload=cb;document.head.appendChild(s)}
 function err(){R.innerHTML='<p style="color:#FF9DA0;font-weight:800">'+sp('dcE')+'</p>'}
 function run(file){if(!file||!/\.pptx$/i.test(file.name))return err();R.innerHTML='<p style="font-weight:800">'+sp('dcW')+'</p>';
  lib(function(){JSZip.loadAsync(file).then(function(zp){var names=Object.keys(zp.files);
   var sl=names.filter(function(n){return /^ppt\/slides\/slide\d+\.xml$/.test(n)}).sort(function(a,b){return +a.match(/\d+/)[0]- +b.match(/\d+/)[0]});
   var rels=names.filter(function(n){return /^ppt\/slides\/_rels\/slide\d+\.xml\.rels$/.test(n)});
   var media=names.filter(function(n){return /^ppt\/media\//.test(n)}).map(function(n){var d=zp.files[n]._data;return d&&d.uncompressedSize||0});
   var notes=names.some(function(n){return /^ppt\/notesSlides\//.test(n)});
   var g=function(n){return zp.file(n)?zp.file(n).async('string'):Promise.resolve('')};
   return Promise.all([Promise.all(sl.map(g)),Promise.all(rels.map(g)),g('ppt/presentation.xml'),g('ppt/theme/theme1.xml')]).then(function(r){return {xs:r[0],rs:r[1],pres:r[2],theme:r[3],media:media,notes:notes}})}).then(function(o){
   var words=0,small=0,bul=0,nt=0,hid=0,fonts={},cols={},paras={},xs=o.xs;
   xs.forEach(function(x,si){var t=(x.match(/<a:t>[^<]*<\/a:t>/g)||[]).map(function(s){return s.replace(/<[^>]+>/g,'')}).join(' ');
    if(t.split(/\s+/).filter(Boolean).length>70)words++;
    if((x.match(/<a:rPr[^>]*\ssz="(\d+)"/g)||[]).some(function(s){return +/sz="(\d+)"/.exec(s)[1]<1600}))small++;
    var ps=(x.match(/<a:p>[\s\S]*?<\/a:p>/g)||[]).filter(function(p){return /<a:t>[^<]+<\/a:t>/.test(p)});if(ps.length>7)bul++;
    ps.forEach(function(p){var s=(p.match(/<a:t>[^<]*<\/a:t>/g)||[]).map(function(q){return q.replace(/<[^>]+>/g,'')}).join('').trim().toLowerCase();if(s.split(/\s+/).length>=8){paras[s]=paras[s]||{};paras[s][si]=1}});
    if(!/<p:ph[^>]*type="(title|ctrTitle)"/.test(x))nt++;
    if(/<p:sld[^>]*\sshow="0"/.test(x))hid++;
    (x.match(/typeface="([^"]+)"/g)||[]).forEach(function(s){var n=/"([^"]+)"/.exec(s)[1];if(n[0]!=='+')fonts[n]=1});
    (x.match(/srgbClr val="([0-9A-Fa-f]{6})"/g)||[]).forEach(function(s){var c=s.slice(-7,-1).toUpperCase();cols[c]=(cols[c]||0)+1})});
   (o.theme.match(/<a:(latin) typeface="([^"]+)"/g)||[]).slice(0,2).forEach(function(s){var n=/typeface="([^"]+)"/.exec(s)[1];if(n)fonts[n]=1});
   (o.theme.match(/<a:accent\d>[\s\S]*?srgbClr val="([0-9A-Fa-f]{6})"/g)||[]).forEach(function(s){var c=s.slice(-7,-1).toUpperCase();cols[c]=(cols[c]||0)+3});
   var emb=(o.pres.match(/<p:embeddedFont>[\s\S]*?typeface="([^"]+)"/g)||[]).map(function(s){return /typeface="([^"]+)"/.exec(s)[1].toLowerCase()});
   var fl=Object.keys(fonts),notEmb=fl.filter(function(n){return SAFE.indexOf(n.toLowerCase())<0&&emb.indexOf(n.toLowerCase())<0});
   var linked=o.rs.reduce(function(a,r){return a+((r.match(/<Relationship[^>]*(video|audio|media)[^>]*TargetMode="External"/g)||[]).length+(r.match(/<Relationship[^>]*TargetMode="External"[^>]*(video|audio|media)/g)||[]).length)},0);
   var sz=/sldSz cx="(\d+)" cy="(\d+)"/.exec(o.pres),r43=sz&&(+sz[1]/+sz[2])<1.5;
   var mb=Math.round(file.size/1048576*10)/10,heavy=o.media.filter(function(b){return b>2*1048576}).length;
   var rep=Object.keys(paras).filter(function(k){return Object.keys(paras[k]).length>1}).length;
   var colKeys=Object.keys(cols).filter(function(c){return c!=='FFFFFF'&&c!=='000000'}).sort(function(a,b){return cols[b]-cols[a]});
   var G=[['g_fail',[[notEmb.length,'i_emb'],[linked,'i_lnk'],[mb>40?mb:0,'i_big'],[heavy,'i_img'],[r43?1:0,'i_43']]],
          ['g_read',[[words,'i_wd'],[small,'i_sm'],[bul,'i_bl'],[fl.length>2?fl.length:0,'i_ft'],[colKeys.length>8?colKeys.length:0,'i_cl']]],
          ['g_pol',[[nt,'i_nt'],[hid,'i_hd'],[rep,'i_rp'],[o.notes?0:1,'i_nn']]]];
   var pen={i_emb:12,i_lnk:12,i_big:6,i_img:4,i_43:6,i_wd:8,i_sm:6,i_bl:5,i_ft:6,i_cl:4,i_nt:4,i_hd:2,i_rp:4,i_nn:3},score=100,cnt=0;
   G.forEach(function(g){g[1].forEach(function(it){if(it[0]>0){score-=pen[it[1]];cnt++}})});score=Math.max(20,score);
   var col=score>=80?'#2BD46B':score>=60?'#E3B04B':'#E5484D';
   var h='<div class="rph"><div class="ring" style="--v:'+score+';--c:'+col+'"><span>'+score+'</span></div><div><b>'+sp('dcSc')+' '+score+'/100</b><small>'+xs.length+' '+sp('dcSl')+' · '+file.name.replace(/[<>&"]/g,'')+'</small></div></div>';
   G.forEach(function(g){var its=g[1].filter(function(it){return it[0]>0});if(!its.length)return;h+='<div class="grp"><b>'+sp(g[0])+'</b>';
    its.forEach(function(it){var key=it[1],n=it[0];h+='<div class="it"><i>!</i><div><b><span data-t="'+key+'" data-n="'+n+'">'+T(key).replace('{n}',n)+'</span></b><span data-t="'+key+'T">'+T(key+'T')+'</span><em>'+sp('fix')+' <span data-t="'+key+'F">'+T(key+'F')+'</span></em></div></div>'});h+='</div>'});
   if(!cnt)h+='<div class="it"><i style="background:#22A35A">✓</i><div><b>'+sp('dcGood')+'</b></div></div>';
   if(colKeys.length)h+='<div class="grp"><b>'+sp('dcPal')+'</b><div class="pal">'+colKeys.slice(0,10).map(function(c){return '<i title="#'+c+'" style="background:#'+c+'"></i>'}).join('')+'</div>'+(document.getElementById('bc1')?'<p style="margin:10px 0 0"><button type="button" class="linkbtn" id="usePal">'+sp('dcUse')+'</button></p>':'')+'</div>';
   if(fl.length)h+='<div class="grp"><b>'+sp('dcFn')+'</b><div class="fnl">'+fl.slice(0,10).map(function(n){return '<span class="'+(notEmb.indexOf(n)>=0?'bad':'')+'">'+n.replace(/[<>&]/g,'')+'</span>'}).join('')+'</div></div>';
   if(cnt)h+='<div class="rcta"><small><span data-t="psn_format">'+T('psn_format')+'</span> · <span data-t="from">'+T('from')+'</span> $'+D.SV.format.p[0]+'</small><a class="btn pri" href="'+D.PRE+'s/format.html">'+sp('dcCta')+'</a></div>';
   R.innerHTML=h;last=colKeys;var u=$('#usePal');if(u)u.addEventListener('click',function(){if(window.KBrand)window.KBrand(colKeys);if(window.KTab)window.KTab('t2')})}).catch(err)})}
 f.addEventListener('change',function(){run(f.files[0])});
 ['dragenter','dragover'].forEach(function(ev){z.addEventListener(ev,function(e){e.preventDefault();z.classList.add('ov')})});
 ['dragleave','drop'].forEach(function(ev){z.addEventListener(ev,function(e){e.preventDefault();z.classList.remove('ov')})});
 z.addEventListener('drop',function(e){run(e.dataTransfer.files[0])})}
// ---------- brand preview ----------
var FONTS=['Manrope','Playfair Display','Poppins','Lora','Montserrat','Inter','Cairo','Tajawal'],fontsLoaded=false;
function loadFonts(){if(fontsLoaded)return;fontsLoaded=true;var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@500;700;800&family=Lora:wght@700&family=Montserrat:wght@500;700;800&family=Inter:wght@500;700;800&family=Cairo:wght@500;700;800&family=Tajawal:wght@500;700;800&display=swap';document.head.appendChild(l)}
function brand(){var w=$('#brandW');if(!w)return;var c1=$('#bc1'),c2=$('#bc2'),c3=$('#bc3'),f1=$('#bf1'),f2=$('#bf2'),lg=$('#blg');
 [f1,f2].forEach(function(s,i){FONTS.forEach(function(n){var o=document.createElement('option');o.value=n;o.textContent=n;s.appendChild(o)});s.value=i?'Manrope':'Playfair Display'});
 function upd(){var st=w.style;st.setProperty('--b1',c1.value);st.setProperty('--b2',c2.value);st.setProperty('--b3',c3.value);st.setProperty('--f1',"'"+f1.value+"',serif");st.setProperty('--f2',"'"+f2.value+"',sans-serif");fit();document.dispatchEvent(new Event('k3brand'))}
 [c1,c2,c3,f1,f2].forEach(function(x){x.addEventListener('input',function(){loadFonts();upd()})});
 lg.addEventListener('change',function(){var file=lg.files[0];if(!file)return;var url=URL.createObjectURL(file);var im=new Image();im.onload=function(){
   $$('.bsl .lgo').forEach(function(b){b.innerHTML='<img alt="" src="'+url+'">'});
   try{var cv=document.createElement('canvas');cv.width=cv.height=64;var cx=cv.getContext('2d');cx.drawImage(im,0,0,64,64);var d=cx.getImageData(0,0,64,64).data,b={};
    for(var i=0;i<d.length;i+=4){if(d[i+3]<128)continue;var r=d[i],g=d[i+1],bl=d[i+2],mx=Math.max(r,g,bl),mn=Math.min(r,g,bl);if(mx>235&&mn>235)continue;if(mx<20)continue;var key=[r>>4,g>>4,bl>>4].join(',');b[key]=(b[key]||0)+1+(mx-mn)/40}
    var top=Object.keys(b).sort(function(x,y){return b[y]-b[x]}).map(function(k){return '#'+k.split(',').map(function(v){return ((+v<<4)+8).toString(16).padStart(2,'0')}).join('')});
    if(top[0])c1.value=top[0];var acc=top.filter(function(c){return c!==top[0]})[0];if(acc)c2.value=acc;upd()}catch(e){}};im.src=url});
 window.KBrand=function(cs){var dk=cs.slice().sort(function(a,b){return lum(a)-lum(b)});if(dk[0])c1.value='#'+dk[0];var ac=cs.filter(function(c){return c!==dk[0]})[0];if(ac)c2.value='#'+ac;upd()};
 function lum(h){var n=parseInt(h,16);return ((n>>16)&255)*.3+((n>>8)&255)*.59+(n&255)*.11}
 var ms=$('#brandMail');if(ms)ms.addEventListener('click',function(){ms.href=D.GM+'&su='+encodeURIComponent('My brand look')+'&body='+encodeURIComponent('Colours: '+c1.value+', '+c2.value+', '+c3.value+'\nFonts: '+f1.value+' / '+f2.value+'\n\nMy file is attached.')});
 function fit(){$$('.svw').forEach(function(v){var s=v.querySelector('.bsl');if(s)s.style.transform='scale('+(v.clientWidth/1600)+')'})}
 addEventListener('resize',fit);document.addEventListener('k3tab',function(){setTimeout(fit,30)});upd()}
// ---------- stage (homography) ----------
function homo(w,h,p){var s=[[0,0],[w,0],[w,h],[0,h]],A=[],B=[];for(var i=0;i<4;i++){var x=s[i][0],y=s[i][1],u=p[i][0],v=p[i][1];A.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
 for(var c=0;c<8;c++){var m=c;for(var r=c+1;r<8;r++)if(Math.abs(A[r][c])>Math.abs(A[m][c]))m=r;var t=A[c];A[c]=A[m];A[m]=t;t=B[c];B[c]=B[m];B[m]=t;for(r=0;r<8;r++){if(r===c)continue;var f=A[r][c]/A[c][c];for(var k=c;k<8;k++)A[r][k]-=f*A[c][k];B[r]-=f*B[c]}}
 var X=B.map(function(b,i){return b/A[i][i]});return 'matrix3d('+[X[0],X[3],0,X[6],X[1],X[4],0,X[7],0,0,1,0,X[2],X[5],0,1].join(',')+')'}
function tipv(){$$('.tv').forEach(function(v){var ss=$$('.tvs',v),bs=$$('.tvb b',v),i=0,run=false,paused=false,t0=0,left=7000,tm;
 function go(n){i=n%ss.length;ss.forEach(function(s,j){s.classList.toggle('on',j===i)});bs.forEach(function(b,j){b.style.transition='none';b.style.width=j<i?'100%':'0%'});void v.offsetWidth;left=7000;play()}
 function play(){var b=bs[i];b.style.transition='width '+left+'ms linear';b.style.width='100%';t0=Date.now();clearTimeout(tm);tm=setTimeout(function(){go(i+1)},left)}
 function pause(){clearTimeout(tm);left=Math.max(300,left-(Date.now()-t0));var b=bs[i],w=getComputedStyle(b).width;b.style.transition='none';b.style.width=w}
 $('.tvp',v).addEventListener('click',function(){paused=!paused;v.classList.toggle('pz',paused);paused?pause():play()});
 $('.tvc',v).addEventListener('click',function(){if(!paused)go(i+1)});
 var io2='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!run){run=true;go(0)}})},{threshold:.4}):null;io2?io2.observe(v):go(0)})}
function toast(on){if(!D.RV||!D.RV.length)return;try{if(sessionStorage.getItem('k3-ts')==='x')return}catch(e){}
 var el=document.createElement('div');el.className='ts';el.setAttribute('role','status');el.setAttribute('aria-live','polite');document.body.appendChild(el);
 var i=0,ri=0,tm;function esc(x){return String(x).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function card(){var showOn=on&&i%2===0;i++;
  if(showOn)return '<img src="'+D.PRE+'assets/karen.jpg" alt=""><i class="dot"></i><div><b>Karen · '+esc(T('on'))+'</b><span>'+esc(T('reply'))+'</span></div>';
  var r=D.RV[ri++%D.RV.length],q=r[3].length>92?r[3].slice(0,90).replace(/\s+\S*$/,'').replace(/[\s.,;:!]+$/,'')+'…':r[3];
  return '<span class="av">'+esc(r[0][0].toUpperCase())+'</span><div><b dir="ltr">'+esc(r[0])+(r[1]?' · '+esc(r[1]):'')+' <em>★★★★★</em></b><span dir="ltr">“'+esc(q)+'”</span><small>'+esc(r[2])+'</small></div>'}
 function show(){el.innerHTML=card()+'<button type="button" class="x" aria-label="close">×</button>';el.querySelector('.x').onclick=function(){el.classList.remove('in');clearTimeout(tm);try{sessionStorage.setItem('k3-ts','x')}catch(e){}};
  requestAnimationFrame(function(){el.classList.add('in')});tm=setTimeout(function(){el.classList.remove('in');tm=setTimeout(show,9000)},6500)}
 tm=setTimeout(show,5000)}
function stage(){$$('.stgw').forEach(function(W){var vs=$$('.vn',W),scn=$('.scn',W),call=$('.vc',W),src=W.getAttribute('data-src');
 function content(){if(src)return '<img alt="" src="'+src+'" style="width:100%;height:100%;object-fit:cover">';var bw=$('#brandW'),b=$('#brandW .svw');return b?'<div style="'+(bw.getAttribute('style')||'')+';position:absolute;inset:0">'+b.innerHTML+'</div>':''}
 function fill(box){var k=box.clientWidth/1600;box.innerHTML='<div style="width:1600px;height:900px;transform:scale('+k+');transform-origin:0 0;position:relative"><div class="svw" style="width:1600px;height:900px;border-radius:0;box-shadow:none">'+content()+'</div></div><i class="glare"></i>';var b=box.querySelector('.bsl');if(b)b.style.transform='none'}
 function place(){var v=W.getAttribute('data-v')||'conf';if(v==='call'){scn.style.display='none';call.style.display='block';var m=$('.main',call);m.innerHTML='<div class="svw" style="box-shadow:none;border-radius:10px">'+content()+'</div>';fitIn(m);return}
  scn.style.display='block';call.style.display='none';scn.setAttribute('data-v',v);fill($('.scrn',scn));setTimeout(function(){fill($('.scrn',scn))},780)}
 function fitIn(m){var b=m.querySelector('.bsl');if(b)b.style.transform='scale('+(m.clientWidth/1600)+')'}
 vs.forEach(function(b){b.addEventListener('click',function(){vs.forEach(function(x){x.classList.toggle('on',x===b)});W.setAttribute('data-v',b.getAttribute('data-v'));place()})});
 if('ResizeObserver' in window)new ResizeObserver(function(){if(scn.style.display!=='none')fill($('.scrn',scn))}).observe($('.scrn',scn));
 addEventListener('resize',place);document.addEventListener('k3brand',place);document.addEventListener('k3tab',function(){setTimeout(place,40)});document.addEventListener('k3lang',function(){setTimeout(place,40)});place()})}
})();
