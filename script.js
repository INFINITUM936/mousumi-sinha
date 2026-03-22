// ── cursor ──
const cur=document.getElementById('cursor');
document.addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';});

// ── twinkling stars ──
const sb=document.getElementById('stars');
const starColors=['#fce4ec','#e1d5f5','#d5ecf5','#fff5d5','#d5f5e8'];
for(let i=0;i<80;i++){
  const s=document.createElement('div');s.className='star';
  const sz=1+Math.random()*3;
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${sz}px;height:${sz}px;background:${starColors[Math.floor(Math.random()*starColors.length)]};animation-duration:${2+Math.random()*4}s;animation-delay:${-Math.random()*5}s;`;
  sb.appendChild(s);
}

// ── petals ──
const pColors=['#f9c0cb','#dbbfef','#ffd6a5','#b5ead7','#fde8ed','#c0e0ff'];
const pc=document.getElementById('petals');
for(let i=0;i<28;i++){
  const p=document.createElement('div');p.className='petal';
  const sz=10+Math.random()*14;
  p.style.cssText=`left:${Math.random()*100}%;width:${sz}px;height:${sz}px;background:${pColors[i%pColors.length]};opacity:.4;border-radius:${Math.random()>.5?'60% 40% 60% 40%':'50%'};animation-duration:${7+Math.random()*9}s;animation-delay:${-Math.random()*12}s;`;
  pc.appendChild(p);
}

// ── gallery ──
const gallery=document.getElementById('gallery');
const galleryPhotos=[
  'photos/photo_2026-03-19_22-13-05.jpg',
  'photos/photo_2026-03-19_22-13-54.jpg',
  'photos/photo_2026-03-19_22-20-06.jpg',
  'photos/photo_2026-03-19_22-20-07.jpg',
  'photos/photo_2026-03-19_22-20-08.jpg',
  'photos/photo_2026-03-19_22-30-15.jpg',
  'photos/photo_2026-03-19_22-30-16.jpg'
];
const lightbox=document.getElementById('lightbox');
const lightboxImg=lightbox.querySelector('.lightbox-img');

let lightboxScrollY=0;
function openLightbox(src,alt){
  lightboxScrollY=window.scrollY||document.documentElement.scrollTop||0;
  document.body.style.top=`-${lightboxScrollY}px`;
  document.body.classList.add('lightbox-open');
  lightboxImg.src=src;
  lightboxImg.alt=alt||'';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('lightbox-open');
  document.body.style.top='';
  window.scrollTo(0,lightboxScrollY);
  lightboxImg.removeAttribute('src');
  lightboxImg.alt='';
}

lightbox.addEventListener('click',e=>{
  if(e.target===lightbox||e.target.closest('.lightbox-close')) closeLightbox();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&lightbox.classList.contains('is-open')) closeLightbox();
});

galleryPhotos.forEach(src=>{
  const s=document.createElement('div');s.className='photo-slot has-photo';
  const img=document.createElement('img');img.src=src;img.alt='A favourite memory with Mousumi';
  img.loading='lazy';
  img.addEventListener('click',e=>{ e.stopPropagation(); openLightbox(src,img.alt); });
  s.appendChild(img);
  gallery.appendChild(s);
});

// ── blow candle ──
let candleBlown=false;
const wishes=['May all your dreams sparkle! ✨','Your wish is on its way! 🌟','The stars heard you! 💫','Magic is coming your way! 🌸'];
function blowCandle(){
  if(candleBlown)return;
  candleBlown=true;
  document.getElementById('flame').style.display='none';
  document.getElementById('flameGlow').style.display='none';
  document.getElementById('blowBtn').textContent='🕯️ Wish made!';
  document.getElementById('blowBtn').style.opacity='.6';
  document.getElementById('wishMsg').textContent=wishes[Math.floor(Math.random()*wishes.length)];
  for(let i=0;i<60;i++) spawnConf();
}

// ── confetti ──
const cColors=['#f9c0cb','#dbbfef','#ffd6a5','#b5ead7','#c0e0ff','#e8829a','#b07fd4','#f0c060'];
function spawnConf(){
  const c=document.createElement('div');c.className='conf';
  const sz=7+Math.random()*8;
  c.style.cssText=`left:${Math.random()*window.innerWidth}px;top:${Math.random()*window.innerHeight}px;width:${sz}px;height:${sz}px;background:${cColors[Math.floor(Math.random()*cColors.length)]};`;
  document.body.appendChild(c);
  setTimeout(()=>c.remove(),1500);
}

// Click anywhere for confetti (not on gallery thumbnails or lightbox)
document.addEventListener('click',e=>{
  if(e.target.closest('.lightbox')||e.target.closest('.photo-slot.has-photo'))return;
  for(let i=0;i<10;i++) spawnConf();
});

// ── CONFETTI BURST GAME ──
let burstCount=0;
function burstConfetti(){
  burstCount++;
  document.getElementById('burstCount').textContent=burstCount;
  for(let i=0;i<50;i++) spawnConf();
}

// ── scroll reveal ──
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('visible');
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));