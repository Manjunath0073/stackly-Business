/* =========================================================
   STACKLY BUSINESS — contact.js
   Page-specific: reveal animations, floating labels,
   FAQ accordion, smooth scroll.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- GSAP ScrollTrigger reveals ---------------- */
  if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined'){
    gsap.registerPlugin(ScrollTrigger);

    /* shared reveal elements */
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
        opacity: 1, y: 0, x: 0, scale: 1,
        duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });

    /* stagger office cards */
    const offices = document.querySelectorAll('.c-office');
    if(offices.length){
      gsap.fromTo(offices, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .15,
        scrollTrigger: { trigger: '.c-offices-grid', start: 'top 85%', toggleActions: 'play none none none' }
      });
    }

    /* stagger detail items */
    const details = document.querySelectorAll('.c-detail-item');
    if(details.length){
      gsap.fromTo(details, { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: .6, ease: 'power2.out', stagger: .12,
        scrollTrigger: { trigger: '.c-details-panel', start: 'top 85%', toggleActions: 'play none none none' }
      });
    }

    /* stagger FAQ items */
    const faqItems = document.querySelectorAll('.c-faq-item');
    if(faqItems.length){
      gsap.fromTo(faqItems, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: .5, ease: 'power2.out', stagger: .08,
        scrollTrigger: { trigger: '.c-faq-list', start: 'top 85%', toggleActions: 'play none none none' }
      });
    }
  }

  /* ---------------- Form validation ---------------- */
  const form = document.querySelector('.c-form');
  const success = document.getElementById('c-success');

  function cShowError(id, msg){
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = msg;
    el.classList.toggle('is-visible', !!msg);
  }

  function cClearErrors(){
    ['c-error-name','c-error-email','c-error-message'].forEach(id=>cShowError(id,''));
    document.querySelectorAll('.c-input').forEach(el=>el.classList.remove('is-error'));
    if(success) success.classList.remove('is-visible');
  }

  function cValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function cValidName(v){ return /^[A-Za-z\s]+$/.test(v); }

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault(); cClearErrors();
      const name    = document.querySelector('#c-name').value.trim();
      const email   = document.querySelector('#c-email').value.trim();
      const message = document.querySelector('#c-message').value.trim();
      let ok = true;
      if(!name){ cShowError('c-error-name','Name is required.'); document.querySelector('#c-name').classList.add('is-error'); ok=false; }
      else if(!cValidName(name)){ cShowError('c-error-name','Only letters and spaces allowed.'); document.querySelector('#c-name').classList.add('is-error'); ok=false; }
      if(!cValidEmail(email)){ cShowError('c-error-email','Please enter a valid email address.'); document.querySelector('#c-email').classList.add('is-error'); ok=false; }
      if(!message){ cShowError('c-error-message','Message cannot be empty.'); document.querySelector('#c-message').classList.add('is-error'); ok=false; }
      if(!ok) return;
      if(success) success.classList.add('is-visible');
      form.reset();
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.c-faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.c-faq-item');
      const isOpen = item.classList.contains('is-open');

      /* close all */
      document.querySelectorAll('.c-faq-item.is-open').forEach(el => {
        el.classList.remove('is-open');
        el.querySelector('.c-faq-q').setAttribute('aria-expanded', 'false');
      });

      /* open clicked if it was closed */
      if(!isOpen){
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------- Smooth scroll for anchor links ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if(targetId === '#') return;
      const target = document.querySelector(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
