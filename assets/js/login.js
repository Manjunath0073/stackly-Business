(function(){

  (function initRoleToggle(){
    const btns = document.querySelectorAll('.l-role-btn');
    if(!btns.length) return;
    btns.forEach(btn => {
      btn.addEventListener('click', ()=>{
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  })();

  ;(function initRotateOrb(){
    const orb = document.querySelector('.l-orb');
    if(!orb) return;
    let angle = 0;
    function frame(){
      angle += .12;
      orb.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
      requestAnimationFrame(frame);
    }
    frame();
  })();

  (function initPwToggle(){
    const toggle = document.querySelector('.l-pw-toggle');
    const input  = document.querySelector('#l-password');
    const open   = toggle?.querySelector('.l-eye--open');
    const closed = toggle?.querySelector('.l-eye--closed');
    if(!toggle||!input) return;

    let visible = false;
    toggle.addEventListener('click', ()=>{
      visible = !visible;
      input.type = visible ? 'text' : 'password';
      open.style.opacity  = visible ? '0' : '1';
      closed.style.opacity = visible ? '1' : '0';
    });
  })();

  (function initSplitFields(){
    document.querySelectorAll('.l-input').forEach(el=>{
      const check = ()=> el.classList.toggle('is-filled', el.value.trim()!=='');
      el.addEventListener('input', check);
      check();
    });
  })();

  function lShowError(id, msg){
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = msg;
    el.classList.toggle('is-visible', !!msg);
  }

  function lClearErrors(){
    ['l-error-email','l-error-password'].forEach(id=>lShowError(id,''));
    document.querySelectorAll('.l-input').forEach(el=>el.classList.remove('is-error'));
  }

  function lValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  (function initSubmit(){
    const form = document.querySelector('.l-form');
    if(!form) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault(); lClearErrors();
      const email = document.querySelector('#l-email').value.trim();
      const pw    = document.querySelector('#l-password').value;
      const role  = document.querySelector('.l-role-btn.is-active').dataset.role;
      let ok = true;
      if(!lValidEmail(email)){ lShowError('l-error-email','Please enter a valid email address.'); document.querySelector('#l-email').classList.add('is-error'); ok=false; }
      if(!pw){ lShowError('l-error-password','Password is required.'); document.querySelector('#l-password').classList.add('is-error'); ok=false; }
      else if(pw.length<8){ lShowError('l-error-password','Password must be at least 8 characters.'); document.querySelector('#l-password').classList.add('is-error'); ok=false; }
      if(!ok) return;
      localStorage.setItem('stacklyAuth', JSON.stringify({
        email, role, name: email.split('@')[0], loggedIn: true
      }));
      window.location.href = role === 'admin' ? 'dashboard-admin.html' : 'dashboard-client.html';
    });
  })();

})();
