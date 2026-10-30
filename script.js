// ---- Birthday moment: midnight at the start of Oct 31, 2026 (local time) ----
const TARGET = new Date(2026,9,31,0,0,0);
const $=id=>document.getElementById(id);
function tick(){
  let d=TARGET-new Date();
  if(d<=0){$('cd').style.display='none';$('hint').textContent='El naharda 3eid miladak! 🎂🎉';return true}
  const p=n=>String(n).padStart(2,'0');
  $('h').textContent=p(Math.floor(d/36e5));$('m').textContent=p(Math.floor(d/6e4)%60);$('s').textContent=p(Math.floor(d/1e3)%60);
  return false;
}
tick();setInterval(tick,1000);
$('open').onclick=()=>{$('intro').classList.add('gone');boom()};

// ---- Photos: tap a frame to pick a photo (saved on this device), or drop photo1.jpg..photo6.jpg next to this file ----
document.querySelectorAll('.ph').forEach(el=>{
  const k=el.dataset.k;
  el.innerHTML='<div class="add"><i>＋</i>Edghat w dif el sora</div><input type="file" accept="image/*">';
  const set=src=>{let i=el.querySelector('img');if(!i){i=new Image();el.prepend(i)}i.src=src;el.classList.add('has')};
  let saved=null;try{saved=localStorage.getItem(k)}catch(e){}
  if(saved)set(saved);
  else{const t=new Image();t.onload=()=>set(el.dataset.f);t.src=el.dataset.f}
  el.querySelector('input').onchange=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=()=>{const im=new Image();im.onload=()=>{
      const s=Math.min(1,1100/Math.max(im.width,im.height)),c=document.createElement('canvas');
      c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);
      const u=c.toDataURL('image/jpeg',.82);set(u);try{localStorage.setItem(k,u)}catch(e){}
    };im.src=r.result};r.readAsDataURL(f);
  };
});

// ---- scroll reveal ----
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in')}),{threshold:.15});
document.querySelectorAll('.fade').forEach(e=>io.observe(e));

// ---- confetti ----
const cv=$('conf'),cx=cv.getContext('2d');let P=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
function boom(){
  const cols=['#ffc94d','#ff6b9d','#6bd6ff','#9bff8a','#c79bff'];
  for(let i=0;i<160;i++)P.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*16,vy:Math.random()*-15-3,g:.35,s:Math.random()*8+4,c:cols[i%5],r:Math.random()*6,l:1});
  if(!run){run=true;loop()}
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=.2;p.l-=.006;cx.save();cx.globalAlpha=Math.max(p.l,0);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);cx.restore()});
  P=P.filter(p=>p.l>0&&p.y<innerHeight+40);
  if(P.length)requestAnimationFrame(loop);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}