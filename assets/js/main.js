/* =========================================================
   STACKLY BUSINESS — main.js
   Shared across all pages: header scroll state, hamburger
   menu toggle, active nav-link highlighting.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Hamburger / mobile menu ---------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const body = document.body;

  function openMenu(){
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileOverlay.classList.add('is-open');
    body.classList.add('menu-open');
  }
  function closeMenu(){
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileOverlay.classList.remove('is-open');
    body.classList.remove('menu-open');
  }

  const mobileClose = document.getElementById('mobile-close');

  if(hamburger && mobileMenu && mobileOverlay){
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    mobileOverlay.addEventListener('click', closeMenu);
    if(mobileClose) mobileClose.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-nav-link, .mobile-actions a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
    });
  }

  /* ---------------- Sticky header background on scroll ---------------- */
  const header = document.getElementById('site-header');
  if(header){
    let lastState = false;
    function handleHeaderScroll(){
      const scrolled = window.scrollY > 20;
      if(scrolled !== lastState){
        header.classList.toggle('is-scrolled', scrolled);
        lastState = scrolled;
      }
    }
    let ticking = false;
    window.addEventListener('scroll', () => {
      if(!ticking){
        requestAnimationFrame(() => { handleHeaderScroll(); ticking = false; });
        ticking = true;
      }
    });
    handleHeaderScroll();
  }

  /* ---------------- Active nav link (based on current page) ---------------- */
  const currentPage = document.body.dataset.page;
  if(currentPage){
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      if(link.dataset.nav === currentPage){
        link.classList.add('is-active');
      }
    });
  }

  /* ---------------- Footer stagger entrance (GSAP) ---------------- */
  if(typeof gsap !== 'undefined'){
    const footerCols = document.querySelectorAll('.site-footer .footer-col');
    const footerBottom = document.querySelector('.site-footer .footer-bottom');
    if(footerCols.length){
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: .7 },
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
      tl.from(footerCols, { opacity: 0, y: 30, stagger: .1 });
      if(footerBottom) tl.from(footerBottom, { opacity: 0, y: 16 }, '-=.15');
    }
  }

});