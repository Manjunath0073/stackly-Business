(function(){

  const auth = JSON.parse(localStorage.getItem('stacklyAuth'));
  if(!auth || !auth.loggedIn){
    window.location.href = 'login.html';
    return;
  }

  const expectedRole = document.body.dataset.role;
  if(auth.role !== expectedRole){
    window.location.href = auth.role === 'admin' ? 'dashboard-admin.html' : 'dashboard-client.html';
    return;
  }

  document.querySelector('.d-user-name').textContent = auth.name || auth.email.split('@')[0];
  document.querySelector('.d-user-role').textContent = auth.role;
  const initial = (auth.name || auth.email)[0].toUpperCase();
  document.querySelector('.d-user-avatar').textContent = initial;

  const today = new Date();
  document.querySelector('.d-topbar-date').textContent = today.toLocaleDateString('en-US', {
    weekday:'long', month:'long', day:'numeric', year:'numeric'
  });

  (function initMenu(){
    const btns = document.querySelectorAll('.d-nav-btn');
    const panels = document.querySelectorAll('.d-panel');
    const titleEl = document.getElementById('panel-title');
    const sidebar = document.querySelector('.d-sidebar');
    const hamburger = document.querySelector('.d-hamburger');
    btns.forEach(btn => {
      btn.addEventListener('click', ()=>{
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        panels.forEach(p => p.classList.remove('is-active'));
        const target = document.getElementById(btn.dataset.panel);
        if(target) target.classList.add('is-active');
        if(titleEl && btn.dataset.title) titleEl.textContent = btn.dataset.title;
        if(sidebar && window.innerWidth <= 768){
          sidebar.classList.remove('is-open');
          if(hamburger) hamburger.classList.remove('is-active');
        }
      });
    });
    if(hamburger){
      hamburger.addEventListener('click', ()=>{
        sidebar.classList.toggle('is-open');
        hamburger.classList.toggle('is-active');
      });
    }
    document.querySelectorAll('.d-sidebar-overlay').forEach(overlay => {
      overlay.addEventListener('click', ()=>{
        sidebar.classList.remove('is-open');
        if(hamburger) hamburger.classList.remove('is-active');
      });
    });
    document.querySelectorAll('.d-sidebar-close').forEach(btn => {
      btn.addEventListener('click', ()=>{
        sidebar.classList.remove('is-open');
        if(hamburger) hamburger.classList.remove('is-active');
      });
    });
  })();

  document.querySelector('.d-logout').addEventListener('click', ()=>{
    localStorage.removeItem('stacklyAuth');
    window.location.href = 'login.html';
  });

  if(typeof Chart !== 'undefined'){

    const role = document.body.dataset.role;

    if(role === 'client'){

      const lineCtx = document.getElementById('chart-line');
      if(lineCtx){
        new Chart(lineCtx, {
          type:'line',
          data:{
            labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets:[{
              label:'This Year',
              data:[28,35,32,40,48,52,58,62,55,68,72,78],
              borderColor:'#C8A96B',
              backgroundColor:'rgba(200,169,107,.08)',
              fill:true, tension:.35, pointRadius:4,
              pointBackgroundColor:'#C8A96B',
              borderWidth:2
            },{
              label:'Last Year',
              data:[18,22,20,28,30,34,38,42,36,44,48,50],
              borderColor:'#64748B',
              backgroundColor:'rgba(100,116,139,.05)',
              fill:true, tension:.35, pointRadius:3,
              pointBackgroundColor:'#64748B',
              borderWidth:1.5,
              borderDash:[5,5]
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ display:false } },
            scales:{
              y:{ beginAtZero:true, grid:{ color:'rgba(0,0,0,.04)' }, ticks:{ font:{ size:11 }, color:'#94a3b8' } },
              x:{ grid:{ display:false }, ticks:{ font:{ size:11 }, color:'#94a3b8' } }
            }
          }
        });
      }

      const barCtx = document.getElementById('chart-bar');
      if(barCtx){
        new Chart(barCtx, {
          type:'bar',
          data:{
            labels:['Q1','Q2','Q3','Q4'],
            datasets:[{
              label:'Milestones',
              data:[4,6,8,5],
              backgroundColor:['rgba(200,169,107,.7)','rgba(200,169,107,.8)','rgba(200,169,107,.9)','#C8A96B'],
              borderRadius:6,
              barPercentage:.6
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ display:false } },
            scales:{
              y:{ beginAtZero:true, grid:{ color:'rgba(0,0,0,.04)' }, ticks:{ font:{ size:11 }, color:'#94a3b8' } },
              x:{ grid:{ display:false }, ticks:{ font:{ size:11 }, color:'#94a3b8' } }
            }
          }
        });
      }

      const doughnutCtx = document.getElementById('chart-doughnut');
      if(doughnutCtx){
        new Chart(doughnutCtx, {
          type:'doughnut',
          data:{
            labels:['Strategy','Operations','Technology','Advisory'],
            datasets:[{
              data:[35,28,22,15],
              backgroundColor:['#C8A96B','#334155','#64748B','#CBD5E1'],
              borderWidth:0
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ position:'bottom', labels:{ padding:12, usePointStyle:true, font:{ size:11 }, color:'#64748B' } } },
            cutout:'65%'
          }
        });
      }

      const doughnutEngageCtx = document.getElementById('chart-doughnut-engage');
      if(doughnutEngageCtx){
        new Chart(doughnutEngageCtx, {
          type:'doughnut',
          data:{
            labels:['On Track','At Risk','Delayed'],
            datasets:[{
              data:[62,26,12],
              backgroundColor:['#22c55e','#f59e0b','#ef4444'],
              borderWidth:0
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ position:'bottom', labels:{ padding:12, usePointStyle:true, font:{ size:11 }, color:'#64748B' } } },
            cutout:'65%'
          }
        });
      }
    }

    if(role === 'admin'){

      const barCtx = document.getElementById('chart-bar');
      if(barCtx){
        new Chart(barCtx, {
          type:'bar',
          data:{
            labels:['Q1','Q2','Q3','Q4'],
            datasets:[{
              label:'Revenue',
              data:[420,580,640,780],
              backgroundColor:['rgba(200,169,107,.6)','rgba(200,169,107,.75)','rgba(200,169,107,.9)','#C8A96B'],
              borderRadius:6,
              barPercentage:.55
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ display:false } },
            scales:{
              y:{ beginAtZero:true, grid:{ color:'rgba(0,0,0,.04)' }, ticks:{ font:{ size:11 }, color:'#94a3b8', callback:v=>'$'+v+'K' } },
              x:{ grid:{ display:false }, ticks:{ font:{ size:11 }, color:'#94a3b8' } }
            }
          }
        });
      }

      const utilCtx = document.getElementById('chart-util');
      if(utilCtx){
        new Chart(utilCtx, {
          type:'doughnut',
          data:{
            labels:['Billable','Internal','Available'],
            datasets:[{
              data:[78,14,8],
              backgroundColor:['#22c55e','#f59e0b','#CBD5E1'],
              borderWidth:0
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ position:'bottom', labels:{ padding:12, usePointStyle:true, font:{ size:11 }, color:'#64748B' } } },
            cutout:'70%'
          }
        });
      }

      const pipelineCtx = document.getElementById('chart-pipeline');
      if(pipelineCtx){
        new Chart(pipelineCtx, {
          type:'doughnut',
          data:{
            labels:['Active','Pipeline','Completed'],
            datasets:[{
              data:[55,30,15],
              backgroundColor:['#C8A96B','#64748B','#22c55e'],
              borderWidth:0
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ position:'bottom', labels:{ padding:12, usePointStyle:true, font:{ size:11 }, color:'#64748B' } } },
            cutout:'70%'
          }
        });
      }
    }
  }

})();
