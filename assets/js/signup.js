(function(){

  (function initRoleToggle(){
    const btns = document.querySelectorAll('.s-role-btn');
    if(!btns.length) return;
    btns.forEach(btn => {
      btn.addEventListener('click', ()=>{
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  })();

  (function initStrengthMeter(){
    const pw = document.querySelector('#s-password');
    const meter = document.querySelector('#s-strength');
    if(!pw||!meter) return;

    pw.addEventListener('input', ()=>{
      const v = pw.value;
      let level = 0;
      if(v.length>0) level = 1;
      if(v.length>=8) level = 2;
      if(v.length>=8 && /[A-Z]/.test(v)) level = 3;
      if(v.length>=10 && /[A-Z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v)) level = 4;

      meter.className = 's-strength' + (
        level===0 ? '' :
        level===1 ? ' is-weak' :
        level===2 ? ' is-fair' :
        level===3 ? ' is-good' : ' is-strong'
      );
    });
  })();

  (function initPasswordMatch(){
    const pw = document.querySelector('#s-password');
    const cf = document.querySelector('#s-confirm');
    const msg = document.querySelector('#s-match');
    if(!pw||!cf||!msg) return;

    function check(){
      if(!cf.value){
        msg.className = 's-match'; msg.textContent = '';
        return;
      }
      const match = pw.value === cf.value;
      msg.className = 's-match ' + (match ? 'is-match' : 'is-nomatch');
      msg.textContent = match ? '✓ Match' : '✗ No match';
    }
    pw.addEventListener('input', check);
    cf.addEventListener('input', check);
  })();

  (function initSplitFields(){
    document.querySelectorAll('.s-input').forEach(el=>{
      const check = ()=> el.classList.toggle('is-filled', el.value.trim()!=='');
      el.addEventListener('input', check);
      check();
    });
  })();

  function sShowError(id, msg){
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = msg;
    el.classList.toggle('is-visible', !!msg);
  }

  function sClearErrors(){
    ['s-error-name','s-error-email','s-error-password','s-error-confirm'].forEach(id=>sShowError(id,''));
    document.querySelectorAll('.s-input').forEach(el=>el.classList.remove('is-error'));
  }

  function sValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function sValidName(v){ return /^[A-Za-z\s]+$/.test(v); }

  (function initSubmit(){
    const form = document.querySelector('.s-form');
    if(!form) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault(); sClearErrors();
      const name  = document.querySelector('#s-name').value.trim();
      const email = document.querySelector('#s-email').value.trim();
      const pw    = document.querySelector('#s-password').value;
      const cf    = document.querySelector('#s-confirm').value;
      const terms = document.querySelector('#s-terms').checked;
      const role  = document.querySelector('.s-role-btn.is-active').dataset.role;
      let ok = true;
      if(!name){ sShowError('s-error-name','Name is required.'); document.querySelector('#s-name').classList.add('is-error'); ok=false; }
      else if(!sValidName(name)){ sShowError('s-error-name','Only letters and spaces allowed.'); document.querySelector('#s-name').classList.add('is-error'); ok=false; }
      if(!sValidEmail(email)){ sShowError('s-error-email','Please enter a valid email address.'); document.querySelector('#s-email').classList.add('is-error'); ok=false; }
      if(pw.length<8){ sShowError('s-error-password','At least 8 characters required.'); document.querySelector('#s-password').classList.add('is-error'); ok=false; }
      if(pw!==cf){ sShowError('s-error-confirm','Passwords do not match.'); document.querySelector('#s-confirm').classList.add('is-error'); ok=false; }
      if(!terms){ sShowError('s-error-confirm','You must agree to the terms.'); ok=false; }
      if(!ok) return;
      localStorage.setItem('stacklyAuth', JSON.stringify({
        name, email, role, loggedIn: true
      }));
      window.location.href = role === 'admin' ? 'dashboard-admin.html' : 'dashboard-client.html';
    });
  })();

})();
