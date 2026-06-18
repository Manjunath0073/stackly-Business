/* ===================================================================
   STACKLY BUSINESS — about.js
   About page: GSAP entrance animations, scroll reveals, counters.
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const hasGSAP = typeof window.gsap !== 'undefined';
  if(hasGSAP && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------- Hero entrance ---------------- */
  if(hasGSAP){
    gsap.timeline({ delay:.15 })
      .from('.about-hero-content .eyebrow', { opacity:0, y:16, duration:.5, ease:'power2.out' })
      .from('.about-hero-title', { opacity:0, y:28, duration:.7, ease:'power2.out' }, '-=.25')
      .from('.about-hero-sub', { opacity:0, y:20, duration:.6, ease:'power2.out' }, '-=.35')
      .from('.about-hero-cta', { opacity:0, y:18, duration:.5, ease:'power2.out' }, '-=.35')
      .from('.about-hero-visual', { opacity:0, scale:.88, duration:.9, ease:'power3.out' }, '-=.85');
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
    }, { threshold:.4 });
    counters.forEach(el => counterObs.observe(el));
  } else {
    counters.forEach(el => animateCounter(el));
  }

  /* ---------------- Milestone items staggered entrance ---------------- */
  if(hasGSAP){
    gsap.from('.milestone-item', {
      scrollTrigger:{
        trigger:'.origin-milestones',
        start:'top 80%',
        once:true
      },
      opacity:0,
      x:-30,
      duration:.6,
      stagger:.2,
      ease:'power2.out'
    });
  }

  /* ---------------- Belief cards stagger ---------------- */
  if(hasGSAP){
    gsap.from('.belief-card', {
      scrollTrigger:{
        trigger:'.beliefs-grid',
        start:'top 80%',
        once:true
      },
      opacity:0,
      y:30,
      duration:.6,
      stagger:.12,
      ease:'power2.out'
    });
  }

  /* ---------------- Team cards stagger ---------------- */
  if(hasGSAP){
    gsap.from('.team-card', {
      scrollTrigger:{
        trigger:'.team-grid',
        start:'top 80%',
        once:true
      },
      opacity:0,
      y:36,
      scale:.95,
      duration:.65,
      stagger:.13,
      ease:'power2.out'
    });
  }

  /* ---------------- Impact cards stagger ---------------- */
  if(hasGSAP){
    gsap.from('.impact-card', {
      scrollTrigger:{
        trigger:'.impact-grid',
        start:'top 80%',
        once:true
      },
      opacity:0,
      y:30,
      duration:.55,
      stagger:.1,
      ease:'power2.out'
    });
  }

  /* ---------------- Testimonial cards stagger ---------------- */
  if(hasGSAP){
    gsap.from('.about-testimonial-card', {
      scrollTrigger:{
        trigger:'.about-testimonial-grid',
        start:'top 80%',
        once:true
      },
      opacity:0,
      y:28,
      duration:.55,
      stagger:.15,
      ease:'power2.out'
    });
  }

  /* ---------------- Press cards stagger ---------------- */
  if(hasGSAP){
    gsap.from('.press-card', {
      scrollTrigger:{
        trigger:'.press-grid',
        start:'top 80%',
        once:true
      },
      opacity:0,
      y:24,
      duration:.5,
      stagger:.12,
      ease:'power2.out'
    });
  }

  /* ---------------- Community stat cards stagger ---------------- */
  if(hasGSAP){
    gsap.from('.community-stat-card', {
      scrollTrigger:{
        trigger:'.community-stats',
        start:'top 80%',
        once:true
      },
      opacity:0,
      x:30,
      duration:.5,
      stagger:.13,
      ease:'power2.out'
    });
  }

});
