/* =========================================================
   STACKLY BUSINESS — blog.js
   Page-specific: reveal animations, topic pills, newsletter
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- GSAP ScrollTrigger reveals ---------------- */
  if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined'){
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.reveal').forEach(el => {
      const dir = el.dataset.reveal || 'up';
      const dist = dir === 'up' ? 36 : dir === 'left' ? -50 : dir === 'right' ? 50 : 0;
      const scale = dir === 'scale' ? .93 : 1;

      gsap.fromTo(el, {
        opacity: 0,
        y: dir === 'up' ? 36 : dir === 'scale' ? 0 : 0,
        x: dir === 'left' ? -50 : dir === 'right' ? 50 : 0,
        scale: scale
      }, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: .8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* ---------- stagger cards in the grid ---------- */
    const gridCards = document.querySelectorAll('.b-grid .b-card');
    if(gridCards.length){
      gsap.fromTo(gridCards, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .1,
        scrollTrigger: {
          trigger: '.b-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    /* ---------- stagger editor picks ---------- */
    const picks = document.querySelectorAll('.b-picks-grid .b-pick');
    if(picks.length){
      gsap.fromTo(picks, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: .6, ease: 'power3.out', stagger: .12,
        scrollTrigger: {
          trigger: '.b-picks-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    /* ---------- long reads stagger ---------- */
    const longreads = document.querySelectorAll('.b-longread');
    if(longreads.length){
      gsap.fromTo(longreads, { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: .5, ease: 'power2.out', stagger: .08,
        scrollTrigger: {
          trigger: '.b-longreads-list',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  /* ---------------- Topic pill interaction ---------------- */
  const topics = document.querySelectorAll('.b-topic');
  topics.forEach(topic => {
    topic.addEventListener('click', () => {
      topics.forEach(t => t.style.borderColor = 'var(--line)');
      topic.style.borderColor = 'var(--topic-clr, var(--teal-deep))';
    });
  });

  /* ---------------- Newsletter validation ---------------- */
  (function(){
    const nForm = document.querySelector('.b-newsletter-form');
    const nInput = document.querySelector('.b-newsletter-input');
    const nMsg = document.getElementById('b-newsletter-msg');
    if(!nForm||!nInput||!nMsg) return;

    function nValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    nForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      nMsg.className = 'b-newsletter-msg';
      nInput.classList.remove('is-error');
      const v = nInput.value.trim();
      if(!v){ nMsg.textContent='Please enter your email address.'; nMsg.className='b-newsletter-msg is-error'; nInput.classList.add('is-error'); return; }
      if(!nValidEmail(v)){ nMsg.textContent='Please enter a valid email address.'; nMsg.className='b-newsletter-msg is-error'; nInput.classList.add('is-error'); return; }
      nMsg.textContent='✓ Subscribed! Check your inbox.'; nMsg.className='b-newsletter-msg is-success';
      nInput.value='';
      setTimeout(()=>{ nMsg.className='b-newsletter-msg'; nMsg.textContent=''; }, 3000);
    });
  })();

  /* ---------------- Newsletter smooth scroll ---------------- */
  document.querySelectorAll('a[href^="#newsletter"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector('.b-newsletter-section');
      if(target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const input = target.querySelector('.b-newsletter-input');
          if(input) input.focus();
        }, 600);
      }
    });
  });

});
