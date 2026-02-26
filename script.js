/*
  script.js
  Handles surprise card, audio toggle, and floating hearts
*/

document.addEventListener('DOMContentLoaded', ()=>{
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseCard = document.getElementById('surpriseCard');
  const closeCard = document.getElementById('closeCard');
  const bgAudio = document.getElementById('bgAudio');
  const audioToggle = document.getElementById('audioToggle');
  const audioIcon = document.getElementById('audioIcon');
  const heartsContainer = document.getElementById('hearts');
  const overlay = document.getElementById('overlay');

  // Show surprise card with animation
  function openCard(){
    surpriseCard.classList.add('show');
    // gentle focus for a11y
    surpriseCard.setAttribute('aria-hidden','false');
    surpriseCard.querySelector('.close').focus();
  }

  // click handlers
  surpriseBtn.addEventListener('click', openCard);
  document.querySelectorAll('.symbol').forEach(el=>{
    el.addEventListener('click', openCard);
  });

  // overlay logic: first click anywhere hides it and triggers the card
  function revealPage(){
    if(overlay){
      overlay.classList.add('hidden');
      setTimeout(()=>overlay.remove(),600);
    }
    // do not open the card automatically, user can click the button or symbols
  }
  if(overlay){
    overlay.addEventListener('click', revealPage);
    overlay.addEventListener('keydown', e=>{
      if(e.key==='Enter' || e.key===' ') revealPage();
    });
  }

  closeCard.addEventListener('click', ()=>{
    surpriseCard.classList.remove('show');
    surpriseCard.setAttribute('aria-hidden','true');
    surpriseBtn.focus();
  });

  // Play/pause background audio
  audioToggle.addEventListener('click', ()=>{
    const playing = !bgAudio.paused;
    if(playing){
      bgAudio.pause();
      audioIcon.textContent = '▶️';
      audioToggle.setAttribute('aria-pressed','false');
    } else {
      bgAudio.play().catch(()=>{});
      audioIcon.textContent = '⏸️';
      audioToggle.setAttribute('aria-pressed','true');
    }
  });

  // Create floating hearts periodically
  const colors = ['#ffd6e8','#f6d6ff','#ffdbe6','#f8e6ff'];
  function createHeart(){
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = Math.random()*28 + 18; // px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random()*100}%`;
    heart.style.background = `radial-gradient(circle at 30% 30%, ${colors[Math.floor(Math.random()*colors.length)]}, rgba(255,255,255,0.6))`;
    heart.style.position = 'absolute';
    heart.style.bottom = '-40px';
    heart.style.borderRadius = '48% 52% 50% 50% / 40% 42% 58% 60%';
    heart.style.transform = `rotate(${Math.random()*30-15}deg)`;
    heart.style.opacity = '0';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '5';
    const duration = Math.random()*8 + 7; // seconds
    heart.style.animation = `floatUp ${duration}s linear forwards`;
    heartsContainer.appendChild(heart);
    // cleanup
    setTimeout(()=>heart.remove(), (duration+1)*1000);
  }

  // spawn hearts gently
  setInterval(createHeart, 800);

  // Small style injection for hearts (keeps css focused)
  const style = document.createElement('style');
  style.textContent = `
    .heart{box-shadow:0 6px 16px rgba(120,60,100,0.12)}
  `;
  document.head.appendChild(style);

  // small accessibility: close card on Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && surpriseCard.classList.contains('show')){
      surpriseCard.classList.remove('show');
      surpriseBtn.focus();
    }
  });
});
