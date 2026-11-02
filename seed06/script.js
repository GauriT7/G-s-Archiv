const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const menu=$('#indexToggle'),panel=$('#threadDrawer'),scrim=$('#drawerScrim'),close=$('#drawerClose'),floating=$('#floatingRoute');
function openMenu(){panel?.classList.add('open');scrim?.classList.add('show');panel?.removeAttribute('hidden');panel?.setAttribute('aria-hidden','false');menu?.setAttribute('aria-expanded','true')}
function closeMenu(){panel?.classList.remove('open');scrim?.classList.remove('show');panel?.setAttribute('aria-hidden','true');menu?.setAttribute('aria-expanded','false')}
menu?.addEventListener('click',openMenu);floating?.addEventListener('click',openMenu);close?.addEventListener('click',closeMenu);scrim?.addEventListener('click',closeMenu);
$$('.drawer-links a').forEach(a=>a.addEventListener('click',closeMenu));
$$('[data-target]').forEach(el=>el.addEventListener('click',()=>{const target=$('#'+el.dataset.target);target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});closeMenu()}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.1});$$('.reveal').forEach(el=>io.observe(el))}else $$('.reveal').forEach(el=>el.classList.add('in-view'));
const progress=$('#progressBar');function updateProgress(){if(!progress)return;const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=(total>0?scrollY/total*100:0)+'%'}document.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const cursor=$('#cursorPigment');if(cursor&&!reduce&&matchMedia('(pointer:fine)').matches){document.addEventListener('pointermove',e=>{cursor.style.opacity='.45';cursor.style.left=(e.clientX-6)+'px';cursor.style.top=(e.clientY-6)+'px'});document.addEventListener('pointerleave',()=>cursor.style.opacity='0')}
