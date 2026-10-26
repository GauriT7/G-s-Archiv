const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const menu=$('#menuToggle'),panel=$('#contentsPanel'),scrim=$('#panelScrim'),close=$('#closeContents');
function openMenu(){panel.classList.add('open');scrim.classList.add('show');panel.setAttribute('aria-hidden','false');menu?.setAttribute('aria-expanded','true')}
function closeMenu(){panel.classList.remove('open');scrim.classList.remove('show');panel.setAttribute('aria-hidden','true');menu?.setAttribute('aria-expanded','false')}
menu?.addEventListener('click',openMenu);close?.addEventListener('click',closeMenu);scrim?.addEventListener('click',closeMenu);$$('.contents-panel a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal,.period').forEach(el=>io.observe(el))}else $$('.reveal,.period').forEach(el=>el.classList.add('in-view'));
const track=$('#trackProgress');function updateTrack(){if(!track)return;const section=$('#timeline'),r=section.getBoundingClientRect(),vh=innerHeight;const total=section.offsetHeight;const passed=Math.min(total,Math.max(0,vh-r.top));track.style.height=(passed/total*100)+'%'}document.addEventListener('scroll',updateTrack,{passive:true});updateTrack();
const cursor=$('#cursorPigment');if(cursor&&!reduce&&matchMedia('(pointer:fine)').matches){let last=0;document.addEventListener('pointermove',e=>{cursor.style.opacity='.5';cursor.style.left=(e.clientX-6)+'px';cursor.style.top=(e.clientY-6)+'px';if(Date.now()-last>150){cursor.style.transform=`scale(${.7+Math.random()*.8})`;last=Date.now()}});document.addEventListener('pointerleave',()=>cursor.style.opacity='0')}
const pigments={
red:{name:'RED',small:'EARTH · IRON OXIDES',title:'Red: the earth, opened.',eyebrow:'01 / THE OLDEST COLOURS',body:'Red ochres are among the oldest pigments used by humans. Their colour comes largely from iron oxides in the earth: the same chemistry that stains rocks and soil. Ground into powder and mixed with a binder, earth becomes image. Red can signal blood, danger, life, power, protection or celebration, but its meaning depends on the people using it, and the moment in which it appears.',detail:'THE MATERIAL: iron-rich earth, ground and prepared. Not every red pigment is the same: vermilion, for example, is mercury sulfide, a different material with a different risk profile.',quote:'A colour begins as a substance before it becomes a symbol.',color:'#a52e2d',text:'#f6eddf'},
blue:{name:'BLUE',small:'LAPIS LAZULI · ULTRAMARINE',title:'Blue: a mountain, ground into light.',eyebrow:'02 / THE COST OF A COLOUR',body:'Natural ultramarine came from lapis lazuli, a vivid blue stone mined historically in what is now Afghanistan. Making the pigment meant crushing and carefully processing the stone to separate its blue particles, a labour-intensive process that made it extraordinarily expensive in parts of Europe. On some commissions, the use of ultramarine could be specified in the contract. A blue cloak could therefore signal devotion and the wealth of the person paying for the painting.',detail:'THE MATERIAL: lazurite-rich lapis lazuli, ground and refined. Synthetic ultramarine, developed in the nineteenth century, made this blue far more accessible.',quote:'Sometimes the colour is also a receipt: who could afford it, and why?',color:'#254c86',text:'#f6eddf'},
indigo:{name:'INDIGO',small:'PLANT DYE · TRADE · COLONIALISM',title:'Indigo: blue with a human cost.',eyebrow:'03 / INDIA IN THE COLOUR STORY',body:'Indigo is not a mineral pigment but a dye derived from plants. South Asia became a major centre of indigo production and trade. Under colonial rule, many cultivators faced coercive contracts and pressure to grow indigo rather than food crops; resistance helped culminate in the Indigo Revolt in Bengal in 1859–60. The blue cloth that moved through global markets carried a history of labour, land, profit and protest.',detail:'THE MATERIAL: plant-derived indigo compounds processed through fermentation and oxidation. It belongs to the story of textiles and dyeing as much as painting.',quote:'A colour can be beautiful in the finished object and brutal in the field.',color:'#344c83',text:'#f6eddf'},
yellow:{name:'YELLOW',small:'EARTH · PLANTS · METALS',title:'Yellow: sunlight, gold, uncertainty.',eyebrow:'04 / A COLOUR WITH MANY LIVES',body:'Yellow can suggest sunlight, harvest, sacred radiance, warning, sickness, wealth or betrayal; there is no universal dictionary for it. Artists used yellow earths, plant-derived lakes, lead compounds and other materials. Gold leaf could catch actual light instead of merely depicting it. The famous story of Indian yellow, often said to have been made from the urine of cattle fed mango leaves, is disputed, and its precise historical production remains uncertain. Even art history has legends that need checking.',detail:'THE MATERIAL: “yellow” names a family, not a single substance. Its chemistry and toxicity depend on the specific pigment.',quote:'Sometimes the most interesting story is the one we cannot confidently repeat.',color:'#d6a92e',text:'#28221f'},
green:{name:'GREEN',small:'COPPER · ARSENIC · BEAUTY',title:'Green: when brilliance came with a warning.',eyebrow:'05 / BEAUTY & TOXICOLOGY',body:'In the eighteenth and nineteenth centuries, vivid arsenic-containing greens, including Scheele’s green and emerald green, became fashionable in paint, wallpaper, textiles and household goods. They were brilliant, modern and hazardous. Popular stories linking particular greens to famous deaths are not always proven, but the health risks from arsenic pigments were real. It is a strange intersection with heavy-metal poisoning in FMT: a material can be an aesthetic breakthrough and a toxic exposure at once.',detail:'THE MATERIAL: several historic greens contained arsenic compounds. Never handle historical pigments casually; conservation is a specialist science.',quote:'The beautiful thing and the dangerous thing can be the very same thing.',color:'#49755c',text:'#f6eddf'},
white:{name:'WHITE',small:'LEAD WHITE · CHALK · LIGHT',title:'White: not the absence of a story.',eyebrow:'06 / THE WORKSHOP',body:'Lead white was prized for centuries for its opacity and handling qualities. But lead is toxic, and artists, assistants and pigment makers could be exposed during preparation and use. It is often repeated that painters routinely licked brushes to shape them; practices varied, and the historical details are not uniform enough for a neat universal claim. What we can say is that some materials carried risks their users did not fully understand.',detail:'THE MATERIAL: lead carbonate in traditional lead white; other whites include chalk and later synthetic compounds. Similar appearance, very different chemistry.',quote:'The workshop was a laboratory before it had the language of one.',color:'#ded8c9',text:'#28221f'},
black:{name:'BLACK',small:'CHARCOAL · SOOT · BONE BLACK',title:'Black: the colour that gives others room.',eyebrow:'07 / DEPTH & CONTRAST',body:'Black might come from charcoal, soot, bone black or other sources, each with its own texture and behaviour. It can define an edge, swallow a room, make a red glow, or give a face its weight. In a Baroque painting, darkness can become an active force; in a Rothko, a dark field can change the temperature of the whole canvas. Black is not one thing, either materially or emotionally.',detail:'THE MATERIAL: a family of carbon-rich pigments and other compounds, not one universal recipe.',quote:'Darkness in a painting is often doing more than sitting quietly in the background.',color:'#282528',text:'#f6eddf'}};
$$('.swatch').forEach(btn=>btn.addEventListener('click',()=>{const p=pigments[btn.dataset.pigment];if(!p)return;$$('.swatch').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',b===btn?'true':'false')});const display=$('#pigmentDisplay');display.dataset.pigment=btn.dataset.pigment;display.style.background=p.color;display.style.color=p.text;$('#pigmentBig').textContent=p.name;$('#pigmentSmall').textContent=p.small;$('#pigmentEyebrow').textContent=p.eyebrow;$('#pigmentTitle').textContent=p.title;$('#pigmentBody').textContent=p.body;$('#pigmentDetail').textContent=p.detail;$('#pigmentQuote').textContent=p.quote;$('#pigmentBig').style.animation='none';void $('#pigmentBig').offsetWidth;$('#pigmentBig').style.animation='wordrise .6s both'}));
const quiet=$('#stillnessButton'),message=$('#stillnessMessage');let quietTimer=null;quiet?.addEventListener('click',()=>{if(quietTimer){clearTimeout(quietTimer);quietTimer=null}let left=20;quiet.disabled=true;quiet.textContent='Stay here a little longer…';message.textContent='For twenty seconds, notice only the edges, the colours, and the space between them.';quietTimer=setInterval(()=>{left--;if(left<=0){clearInterval(quietTimer);quietTimer=null;quiet.disabled=false;quiet.textContent='Again, if you like ↗';message.textContent='That was it. Nothing to solve. You can go back to looking.'}},1000)});
const input=$('#artworkUpload'),grid=$('#artworkGrid');input?.addEventListener('change',()=>{[...input.files].forEach(file=>{if(!file.type.startsWith('image/'))return;const url=URL.createObjectURL(file),fig=document.createElement('figure'),img=document.createElement('img'),cap=document.createElement('figcaption');fig.className='artwork-item';img.src=url;img.alt=file.name;cap.textContent=file.name.replace(/\.[^.]+$/,'')+' · add year when publishing';fig.append(img,cap);grid.prepend(fig)});if(input.files.length)input.value=''});


/* Scratch away the first layer like a real pigment sample card. */
(() => {
  const canvas = $('#revealCanvas');
  const section = $('.paint-reveal');
  const skip = $('#revealSkip');
  const grainLayer = $('.grain');
  if (!canvas || !section) return;
  // Keep the opening's paint perfectly flat; bring the archive grain back afterward.
  if (grainLayer) grainLayer.style.opacity = '0';
  const context = canvas.getContext('2d');
  if (!context) { canvas.hidden = true; return; }

  let width = 0, height = 0, lastPoint = null, drawing = false;
  let travelled = 0, finished = false;
  const brushSize = () => Math.max(76, Math.min(124, width * 0.085));

  function drawBrush(cx, cy, scale) {
    context.save();
    context.translate(cx, cy);
    context.rotate(-0.62);
    context.scale(scale, scale);
    context.lineCap = 'round';
    context.fillStyle = '#f1dfc7';
    context.beginPath();
    context.moveTo(-2, -82);
    context.lineTo(2, -82);
    context.quadraticCurveTo(10, -82, 10, -74);
    context.lineTo(10, 18);
    context.quadraticCurveTo(10, 26, 2, 26);
    context.lineTo(-2, 26);
    context.quadraticCurveTo(-10, 26, -10, 18);
    context.lineTo(-10, -74);
    context.quadraticCurveTo(-10, -82, -2, -82);
    context.closePath();
    context.fill();
    context.fillStyle = '#c6a77a';
    context.fillRect(-12, 12, 24, 12);
    context.fillStyle = '#d6bfa0';
    context.beginPath();
    context.moveTo(-12, 24);
    context.quadraticCurveTo(-17, 47, -5, 61);
    context.quadraticCurveTo(0, 66, 5, 61);
    context.quadraticCurveTo(17, 47, 12, 24);
    context.closePath();
    context.fill();
    context.restore();
  }

  function paintSurface() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = '#76272f';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#f3ecdf';
    context.textAlign = 'left';
    context.font = '9px "DM Mono", monospace';
    context.letterSpacing = '1.5px';
    context.fillText('ARCHIVE GAURI', 30, 32);
    context.textAlign = 'right';
    context.fillText('SEED 05  /  ART · HISTORY · COLOUR', width - 30, 32);

    context.strokeStyle = 'rgba(243,236,223,.35)';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(30, 47);
    context.lineTo(width - 30, 47);
    context.stroke();

    const mobile = width < 600;
    const cx = width / 2;
    const cy = height / 2;
    drawBrush(cx, cy - (mobile ? 98 : 110), mobile ? .68 : .88);
    context.textAlign = 'center';
    context.fillStyle = '#f3ecdf';
    context.font = (mobile ? '500 19px' : '500 29px') + ' "DM Sans", Arial, sans-serif';
    context.letterSpacing = mobile ? '0px' : '.3px';
    context.fillText('MOVE AROUND TO', cx, cy + (mobile ? 3 : 10));
    context.fillText('REVEAL THE CONTENT', cx, cy + (mobile ? 31 : 49));
    context.fillStyle = '#dfc1ad';
    context.font = '9px "DM Mono", monospace';
    context.letterSpacing = '1.4px';
    context.fillText('RUB AWAY THE SURFACE · BEGIN ANYWHERE', cx, cy + (mobile ? 73 : 95));

    context.textAlign = 'left';
    context.fillStyle = '#f3ecdf';
    context.font = '8px "DM Mono", monospace';
    context.letterSpacing = '1px';
    context.fillText('A LITTLE FIELD GUIDE TO LOOKING', 30, height - 29);
    context.textAlign = 'right';
    context.fillText('MOVE · DISCOVER · LOOK AGAIN', width - 30, height - 29);
  }

  function finishReveal() {
    if (finished) return;
    finished = true;
    canvas.classList.add('reveal-finished');
    if (skip) skip.textContent = 'Surface lifted ✓';
    window.setTimeout(() => {
      canvas.hidden = true;
      if (grainLayer) grainLayer.style.opacity = '';
    }, 950);
  }

  function pointFrom(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function erase(point) {
    if (finished) return;
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = brushSize();
    context.beginPath();
    if (lastPoint) {
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(point.x, point.y);
      travelled += Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
    } else {
      context.moveTo(point.x, point.y);
      context.lineTo(point.x + .01, point.y + .01);
    }
    context.stroke();
    context.beginPath();
    context.arc(point.x, point.y, brushSize() / 2, 0, Math.PI * 2);
    context.fill();
    context.restore();
    lastPoint = point;
    if (travelled > width * 1.15) finishReveal();
  }

  canvas.addEventListener('pointerdown', event => {
    if (finished) return;
    drawing = true;
    lastPoint = null;
    canvas.setPointerCapture?.(event.pointerId);
    erase(pointFrom(event));
    if (event.pointerType === 'touch') event.preventDefault();
  });
  canvas.addEventListener('pointermove', event => {
    if (finished) return;
    if (event.pointerType === 'mouse' || drawing) erase(pointFrom(event));
  });
  const stopDrawing = event => {
    drawing = false;
    if (event?.pointerType === 'touch') lastPoint = null;
  };
  canvas.addEventListener('pointerup', stopDrawing);
  canvas.addEventListener('pointercancel', stopDrawing);
  canvas.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') lastPoint = null;
    drawing = false;
  });
  skip?.addEventListener('click', finishReveal);

  paintSurface();
  window.addEventListener('resize', () => {
    if (!finished) paintSurface();
  });
})();

/* A clicked colour travels from its source, through preparation, into an artwork. */
(() => {
  const stages = {
    red: ['Iron-rich earth', 'Ground into powder', 'Pigment + binder'],
    blue: ['Lapis lazuli · Afghanistan', 'Crushed and refined', 'Natural ultramarine'],
    indigo: ['Indigo-bearing plant', 'Fermented and oxidised', 'Blue textile dye'],
    yellow: ['Earth, plants or metals', 'Extracted or processed', 'One of many yellows'],
    green: ['Copper or arsenic compounds', 'Chemically prepared', 'Historic green pigment'],
    white: ['Lead compounds or chalk', 'Ground and mixed with binder', 'Opaque white paint'],
    black: ['Charcoal, soot or bone', 'Burnt or otherwise processed', 'Carbon-rich black']
  };
  const grainColours = {
    red: '#f1c7a8', blue: '#c6d4eb', indigo: '#d4d9f0', yellow: '#fff0ad',
    green: '#d4e1c8', white: '#fffaf0', black: '#b8aaa6'
  };
  const display = $('#pigmentDisplay');
  if (!display) return;
  $$('.swatch').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.pigment;
    const steps = stages[key];
    if (!steps) return;
    $('#processSource').textContent = steps[0];
    $('#processPrepare').textContent = steps[1];
    $('#processResult').textContent = steps[2];
    display.style.setProperty('--grain-color', grainColours[key] || '#f3ecdf');
    display.classList.remove('pigment-changing');
    void display.offsetWidth;
    display.classList.add('pigment-changing');
    window.setTimeout(() => display.classList.remove('pigment-changing'), 900);
  }));
})();

/* Entering the cave warms the wall; the torchlight follows the pointer. */
(() => {
  $$('.cave-scene').forEach(scene => {
    scene.addEventListener('pointermove', event => {
      const rect = scene.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
      scene.style.setProperty('--torch-x', x + '%');
      scene.style.setProperty('--torch-y', y + '%');
    });
  });
})();


// SEED 05 — tactile atlas interactions
$$('.postcard').forEach(card=>{const flip=()=>card.classList.toggle('flipped');card.addEventListener('click',flip);card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===card){e.preventDefault();flip()}})});
$$('.era-filter').forEach(btn=>btn.addEventListener('click',()=>{const chosen=btn.dataset.filter;$$('.era-filter').forEach(b=>b.classList.toggle('active',b===btn));$$('.period').forEach(card=>{const show=chosen==='all'||(card.dataset.themes||'').split(' ').includes(chosen);card.classList.toggle('filtered-out',!show)})}));
$$('.colour-note').forEach(btn=>btn.addEventListener('click',()=>btn.classList.toggle('open')));
const hue=$('#labHue'),light=$('#labLight'),grain=$('#labGrain'),specimen=$('#labSpecimen'),hueValue=$('#hueValue'),lightValue=$('#lightValue'),grainValue=$('#grainValue'),labName=$('#labName'),labDescription=$('#labDescription');
function updateLab(){if(!hue||!light||!grain||!specimen)return;const h=+hue.value,l=+light.value,g=+grain.value;specimen.style.setProperty('--lab-h',h);specimen.style.setProperty('--lab-l',l+'%');specimen.style.setProperty('--lab-g',g+'%');hueValue.textContent=h+'°';lightValue.textContent=l+'%';grainValue.textContent=g+'%';const names=[['red',0,18],['orange',18,48],['yellow',48,70],['green',70,165],['teal',165,195],['blue',195,250],['violet',250,290],['magenta',290,330],['red',330,360]];const name=(names.find(n=>h>=n[1]&&h<n[2])||names[0])[0];labName.textContent='A '+name+' not yet named.';labDescription.textContent='This digital specimen shifts in seconds. Historical pigment took matter, labour, technique and trade. Lightness changes its voice; texture makes it feel more like powder, stain or surface. The screen can imitate a colour, but it cannot reproduce the history of the material.'}
[hue,light,grain].forEach(el=>el?.addEventListener('input',updateLab));updateLab();

/* Connect timeline themes to the visible filter controls */
$$('.era-filter').forEach(btn=>btn.addEventListener('click',()=>{const chosen=btn.dataset.filter;$$('.era-filter').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});$$('.period').forEach(card=>{const themes=(card.dataset.themes||'').split(' ');card.classList.toggle('filtered-out',chosen!=='all'&&!themes.includes(chosen))})}));

