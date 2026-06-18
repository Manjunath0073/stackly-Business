/* ===================================================================
   STACKLY BUSINESS — home.js
   Home page interactions + GSAP-powered animation.
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const hasGSAP = typeof window.gsap !== 'undefined';
  if(hasGSAP && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------- Rotating word in hero title ---------------- */
  const rotatingEl = document.getElementById('rotating-word');
  if(rotatingEl){
    const words = ['outcomes', 'results', 'impact', 'growth', 'success'];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % words.length;
      rotatingEl.style.opacity = '0';
      rotatingEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        rotatingEl.textContent = words[idx];
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
      }, 200);
    }, 3000);
  }

  /* ---------------- Hero entrance ---------------- */
  if(hasGSAP){
    gsap.timeline()
      .from('.hero-badge', { opacity:0, y:16, duration:.6, ease:'power2.out' })
      .from('.hero-title', { opacity:0, y:24, duration:.7, ease:'power2.out' }, '-=.3')
      .from('.hero-sub', { opacity:0, y:18, duration:.6, ease:'power2.out' }, '-=.4')
      .from('.hero-cta', { opacity:0, y:18, duration:.6, ease:'power2.out' }, '-=.4')
      .from('.hero-trustline', { opacity:0, y:12, duration:.5, ease:'power2.out' }, '-=.3')
      .from('.hero-visual', { opacity:0, scale:.92, duration:.8, ease:'power3.out' }, '-=.9');
  }

  /* ---------------- Scroll reveals for .reveal elements ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if(hasGSAP && window.ScrollTrigger){
    revealEls.forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => el.classList.add('is-visible')
      });
    });
  } else if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold:.15 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------- Animated stat / metric counters ---------------- */
  function animateCounter(el){
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1.4;
    if(hasGSAP){
      gsap.to(el, {
        textContent: target,
        duration,
        ease:'power2.out',
        snap:{ textContent: 1 },
        onUpdate(){ el.textContent = Math.round(this.targets()[0].textContent) + suffix; },
        onComplete(){ el.textContent = target + suffix; }
      });
    } else {
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / (duration*1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }
  const counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ animateCounter(entry.target); counterObs.unobserve(entry.target); }
      });
    }, { threshold:.5 });
    counters.forEach(el => counterObs.observe(el));
  }

  /* ---------------- Services card entrance ---------------- */
  const serviceCards = document.querySelectorAll('.service-card');
  if(hasGSAP && window.ScrollTrigger){
    gsap.from(serviceCards, {
      opacity:0,
      y:40,
      duration:.7,
      ease:'power2.out',
      stagger:.15,
      scrollTrigger:{
        trigger:'.services-grid',
        start:'top 80%',
        once:true
      }
    });
  }

  /* ---------------- Results tabs ---------------- */
  const resultsTabs = document.querySelectorAll('.results-tab');
  const resultsPanels = document.querySelectorAll('.results-panel');
  resultsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      resultsTabs.forEach(t => t.classList.toggle('is-active', t === tab));
      resultsPanels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === target));
    });
  });

  /* ---------------- Testimonial rotator ---------------- */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let activeSlide = 0;
  let rotateTimer;

  function showSlide(index){
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    activeSlide = index;
  }
  function nextSlide(){
    showSlide((activeSlide + 1) % slides.length);
  }
  function startRotation(){
    rotateTimer = setInterval(nextSlide, 5500);
  }
  if(slides.length){
    showSlide(0);
    startRotation();
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(rotateTimer);
        showSlide(i);
        startRotation();
      });
    });
  }

  /* ---------------- Industry rail: drag-to-scroll on desktop ---------------- */
  const rail = document.querySelector('.industry-rail');
  if(rail){
    let isDown = false, startX, scrollLeft;
    rail.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
      rail.style.cursor = 'grabbing';
    });
    ['mouseleave','mouseup'].forEach(evt => rail.addEventListener(evt, () => {
      isDown = false;
      rail.style.cursor = 'grab';
    }));
    rail.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      const walk = (x - startX) * 1.2;
      rail.scrollLeft = scrollLeft - walk;
    });
  }

});