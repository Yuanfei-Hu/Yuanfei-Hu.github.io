(() => {
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const content = window.SITE_CONTENT || { brainRegions: {}, projects: {}, gallery: [] };

  $('#year') && ($('#year').textContent = new Date().getFullYear());
  const header = $('[data-header]');
  addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 28), { passive: true });
  const toggle = $('.nav-toggle');
  const nav = $('#site-nav');
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('open', !open); });
  $$('#site-nav a').forEach(a => a.addEventListener('click', () => { nav?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }));

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(items => items.forEach(i => { if (i.isIntersecting) { i.target.classList.add('revealed'); observer.unobserve(i.target); } }), { threshold: .12 });
    $$('[data-reveal]').forEach(el => observer.observe(el));
  } else { $$('[data-reveal]').forEach(el => el.classList.add('revealed')); }

  function fitCanvas(canvas, height) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width), h = height || Math.max(1, rect.height);
    if (canvas.width !== Math.round(w*dpr) || canvas.height !== Math.round(h*dpr)) { canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr); }
    const ctx = canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); return { ctx, w, h, dpr };
  }

  function initBrain() {
    const canvas = $('#brain-canvas'); if (!canvas) return;
    const keys = Object.keys(content.brainRegions); const navButtons = $$('[data-brain-region]'); const card = $('#brain-card');
    let active = 'memory', angle = -.3, drag = false, px = 0, manualUntil = 0;
    const nodes = [];
    // Two overlapping ellipsoidal lobes make a recognizable cerebral silhouette in projection.
    let seed = 7219; const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let hemi of [-1,1]) for (let i=0;i<155;i++) {
      const u=(rand()-.5)*Math.PI*.95, v=(rand()-.5)*Math.PI;
      const bulge=.86+.14*Math.sin(v*3+u*2);
      nodes.push({x:hemi*(.14+Math.abs(Math.cos(u)*Math.cos(v))*.68)*bulge,y:Math.sin(u)*.84,z:Math.sin(v)*Math.cos(u)*.8,hemi,pulse:rand()*9});
    }
    const edges=[];
    for(let i=0;i<nodes.length;i++){ const near=[]; for(let j=0;j<nodes.length;j++){if(i===j||nodes[i].hemi!==nodes[j].hemi)continue; const a=nodes[i],b=nodes[j],d=(a.x-b.x)**2+(a.y-b.y)**2+(a.z-b.z)**2;if(d<.085)near.push([d,j]);} near.sort((a,b)=>a[0]-b[0]);near.slice(0,2).forEach(n=>{if(n[1]>i)edges.push([i,n[1]])}); }
    function select(key, navigate=false){ if(!content.brainRegions[key]) return; active=key; navButtons.forEach(b=>b.classList.toggle('active',b.dataset.brainRegion===key)); const d=content.brainRegions[key]; if(card){card.style.opacity='0';card.style.transform='translateY(6px)';setTimeout(()=>{ $('.brain-card-index',card).textContent=d.index;$('.brain-card-system',card).textContent=d.system;$('.brain-card-copy',card).textContent=d.copy;const a=$('.brain-card-link',card);a.firstChild.textContent=d.action+' ';a.href=d.href;card.style.opacity='1';card.style.transform='none';},120);} if(navigate) location.href=d.href; }
    navButtons.forEach(b=>{b.addEventListener('mouseenter',()=>select(b.dataset.brainRegion));b.addEventListener('focus',()=>select(b.dataset.brainRegion));b.addEventListener('click',()=>select(b.dataset.brainRegion,true));});
    function hitRegion(e){const r=canvas.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width,ny=(e.clientY-r.top)/r.height;let best=null,bd=.15;for(const k of keys){const d=content.brainRegions[k],dist=Math.hypot(nx-d.x,ny-d.y);if(dist<bd){bd=dist;best=k}}return best}
    let downX=0;canvas.addEventListener('pointerdown',e=>{drag=true;px=downX=e.clientX;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointermove',e=>{if(drag){angle+=(e.clientX-px)*.008;px=e.clientX;manualUntil=performance.now()+2500;return;}const best=hitRegion(e);if(best)select(best)});
    canvas.addEventListener('click',e=>{if(Math.abs(e.clientX-downX)<8){const best=hitRegion(e);select(best||active,true)}});
    function draw(t){const {ctx,w,h}=fitCanvas(canvas);ctx.clearRect(0,0,w,h);if(!reduceMotion&&t>manualUntil)angle+=.00016*Math.min(32,t-(draw.last||t));draw.last=t;const scale=Math.min(w,h)*.43,cx=w*.51,cy=h*.49;const projected=nodes.map(n=>{const ca=Math.cos(angle),sa=Math.sin(angle);const x=n.x*ca-n.z*sa,z=n.x*sa+n.z*ca;return{x:cx+x*scale,y:cy+n.y*scale*.9,z,n};});ctx.lineWidth=.7;edges.forEach(([a,b])=>{const p=projected[a],q=projected[b],alpha=.08+.22*((p.z+q.z+2)/4);ctx.strokeStyle=`rgba(150,190,226,${alpha})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()});projected.sort((a,b)=>a.z-b.z).forEach(p=>{const glow=(Math.sin(t*.0015+p.n.pulse)+1)/2;ctx.fillStyle=`rgba(${active==='visual'||active==='motor'?'198,64,67':'218,234,247'},${.16+.42*Math.max(0,p.z)*glow})`;ctx.beginPath();ctx.arc(p.x,p.y,.65+glow*.85,0,Math.PI*2);ctx.fill()});const d=content.brainRegions[active],ax=w*d.x,ay=h*d.y;const pulse=reduceMotion?1:.75+.25*Math.sin(t*.004);ctx.strokeStyle=d.color;ctx.lineWidth=1;ctx.beginPath();ctx.arc(ax,ay,12*pulse,0,Math.PI*2);ctx.stroke();ctx.fillStyle=d.color;ctx.beginPath();ctx.arc(ax,ay,3.5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(ax+12,ay);ctx.lineTo(Math.min(w-120,ax+68),ay);ctx.stroke();requestAnimationFrame(draw)} select(active);requestAnimationFrame(draw);
  }

  function initField(){const canvas=$('#field-canvas');if(!canvas)return;let center=3.2,target=3.2,paused=false,last=0;const twoPi=Math.PI*2;function circ(a){return Math.atan2(Math.sin(a),Math.cos(a))}function perturb(e){const r=canvas.getBoundingClientRect();target=((e.clientX-r.left)/r.width)*twoPi;center=circ(center+(target-center)*.28);if(center<0)center+=twoPi}canvas.addEventListener('pointermove',e=>{if(e.pointerType==='mouse')perturb(e)});canvas.addEventListener('pointerdown',perturb);$('#field-toggle')?.addEventListener('click',e=>{paused=!paused;e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.innerHTML=paused?'<span class="control-icon">▶</span> Resume':'<span class="control-icon">Ⅱ</span> Pause'});$('#field-reset')?.addEventListener('click',()=>{center=target=3.2});function draw(t){const {ctx,w,h}=fitCanvas(canvas);const dt=Math.min(.05,(t-last)/1000||.016);last=t;if(!paused&&!reduceMotion){const delta=circ(target-center);center=(center+delta*dt*.7+twoPi)%twoPi;target=(target+dt*.08)%twoPi;}ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=1;for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,h*i/5);ctx.lineTo(w,h*i/5);ctx.stroke()}const grad=ctx.createLinearGradient(0,0,w,0);grad.addColorStop(0,'#5b82aa');grad.addColorStop(.55,'#ef6c2f');grad.addColorStop(1,'#5b82aa');ctx.strokeStyle=grad;ctx.lineWidth=2.5;ctx.beginPath();for(let i=0;i<=220;i++){const th=i/220*twoPi;const dist=circ(th-center);const activity=.07+.85*Math.exp(-(dist*dist)/(.54));const y=h-(activity*h*.84)-14;const x=i/220*w;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();const fill=ctx.createLinearGradient(0,0,0,h);fill.addColorStop(0,'rgba(239,108,47,.18)');fill.addColorStop(1,'rgba(18,63,122,.01)');ctx.fillStyle=fill;ctx.fill();const x=center/twoPi*w;ctx.fillStyle='#ef6c2f';ctx.beginPath();ctx.arc(x,h*.12,3,0,twoPi);ctx.fill();requestAnimationFrame(draw)}requestAnimationFrame(draw)}

  function drawManifold(){const canvas=$('#manifold-canvas');if(!canvas)return;function frame(t){const {ctx,w,h}=fitCanvas(canvas);ctx.clearRect(0,0,w,h);const cx=w*.5,cy=h*.52,r=Math.min(w,h)*.27;ctx.strokeStyle='rgba(155,184,214,.28)';ctx.lineWidth=1;for(let k=0;k<5;k++){ctx.beginPath();ctx.ellipse(cx,cy,r*(1+k*.16),r*(.3+k*.07),-.2,0,Math.PI*2);ctx.stroke()}for(let i=0;i<65;i++){const a=i/65*Math.PI*2;const rr=r*(.92+.14*Math.sin(i*4.9));const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.35;ctx.fillStyle=`rgba(155,190,225,${.18+.28*(Math.sin(i+t*.001)+1)/2})`;ctx.beginPath();ctx.arc(x,y,1.4,0,7);ctx.fill()}[-.7,.55].forEach((a,j)=>{const pulse=reduceMotion?1:1+.08*Math.sin(t*.003+j);const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.35;const g=ctx.createRadialGradient(x,y,0,x,y,36*pulse);g.addColorStop(0,j?'rgba(239,108,47,.9)':'rgba(118,170,222,.9)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,38*pulse,0,7);ctx.fill()});requestAnimationFrame(frame)}requestAnimationFrame(frame)}

  function drawPhase(){const canvas=$('#phase-canvas');if(!canvas)return;const paths=[];let seed=91;const rand=()=> (seed=(seed*48271)%2147483647)/2147483647;for(let k=0;k<34;k++){let x=.12+rand()*.15,y=.22+rand()*.1;const p=[];for(let i=0;i<40;i++){x+=.016+rand()*.009;y+=(rand()-.47)*.035+(x>.55?.008:0);p.push([x,y])}paths.push(p)}function frame(t){const{ctx,w,h}=fitCanvas(canvas);ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(116,151,187,.23)';ctx.lineWidth=1;paths.forEach((p,k)=>{ctx.beginPath();p.forEach(([x,y],i)=>{const wobble=reduceMotion?0:Math.sin(t*.0008+k)*.004;const xx=x*w,yy=(y+wobble)*h;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)});ctx.stroke()});ctx.strokeStyle='#ef6c2f';ctx.lineWidth=1.7;const p=paths[7];ctx.beginPath();p.forEach(([x,y],i)=>i?ctx.lineTo(x*w,y*h):ctx.moveTo(x*w,y*h));ctx.stroke();requestAnimationFrame(frame)}requestAnimationFrame(frame)}

  function initDialogs(){const dialog=$('#project-dialog'),box=$('#dialog-content');if(!dialog||!box)return;$$('[data-open-project]').forEach(b=>b.addEventListener('click',()=>{const p=content.projects[b.dataset.openProject];if(!p)return;box.innerHTML=`<article class="dialog-body"><p class="eyebrow">${p.label}</p><h2 id="dialog-title">${p.title}</h2><p class="dialog-question">${p.question}</p><div class="dialog-columns"><div><h3>My contribution</h3><ul>${p.contribution.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>Methods</h3><p>${p.methods}</p><h3>Interpretive boundary</h3><p>${p.note}</p></div></div></article>`;dialog.showModal()}));$('.dialog-close',dialog)?.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})}

  function initGallery(){const gallery=$('#photo-gallery'),empty=$('.gallery-empty'),lightbox=$('#lightbox');if(!gallery)return;const photos=content.gallery||[];if(!photos.length)return;empty?.remove();photos.forEach((p,i)=>{const b=document.createElement('button');b.className='photo-item';b.type='button';b.innerHTML=`<img src="${p.src}" alt="${p.alt}" loading="lazy"><span>${p.location||'Untitled'} · ${p.year||''}</span>`;b.addEventListener('click',()=>{const img=$('img',lightbox),cap=$('figcaption',lightbox);img.src=p.src;img.alt=p.alt;cap.textContent=[p.location,p.year,p.caption,p.camera].filter(Boolean).join(' · ');lightbox.showModal()});gallery.appendChild(b)});$('.dialog-close',lightbox)?.addEventListener('click',()=>lightbox.close());lightbox?.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()})}

  initBrain(); initField(); drawManifold(); drawPhase(); initDialogs(); initGallery();
})();
