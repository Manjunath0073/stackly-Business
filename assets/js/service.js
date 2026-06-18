/* ===================================================================
   STACKLY BUSINESS — service.js
   Service page interactions + GSAP-powered animation.
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const hasGSAP = typeof window.gsap !== 'undefined';
  if(hasGSAP && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------- Hero entrance ---------------- */
  if(hasGSAP){
    gsap.timeline()
      .from('.svc-hero-badge', { opacity:0, y:16, duration:.5, ease:'power2.out' })
      .from('.svc-hero-title', { opacity:0, y:24, duration:.7, ease:'power2.out' }, '-=.3')
      .from('.svc-hero-sub', { opacity:0, y:18, duration:.6, ease:'power2.out' }, '-=.4')
      .from('.svc-hero-cta', { opacity:0, y:18, duration:.5, ease:'power2.out' }, '-=.4')
      .from('.svc-pillar', { opacity:0, y:20, duration:.5, ease:'power2.out', stagger:.1 }, '-=.3');
  }

  /* ---------------- Scroll reveals for sections ---------------- */
  const sections = [
    '.svc-strategy .svc-split-content',
    '.svc-strategy .svc-split-visual',
    '.svc-operations .svc-section-head',
    '.svc-compare-col',
    '.svc-technology .svc-split-content',
    '.svc-technology .svc-split-visual',
    '.svc-advisory .svc-section-head',
    '.svc-case-card',
    '.svc-steps',
    '.svc-cta-card'
  ];

  if(hasGSAP && window.ScrollTrigger){
    sections.forEach(sel => {
      const els = document.querySelectorAll(sel);
      els.forEach(el => {
        gsap.from(el, {
          opacity:0,
          y:30,
          duration:.6,
          ease:'power2.out',
          scrollTrigger:{
            trigger:el,
            start:'top 80%',
            once:true
          }
        });
      });
    });
  }

  /* ---------------- Counter animation ---------------- */
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
});
