document.addEventListener('DOMContentLoaded', ()=>{
  const key = 'edulex_scores_v1';
  const raw = localStorage.getItem(key);
  const arr = raw? JSON.parse(raw): [];

  const attemptsList = document.getElementById('attempts-list');
  const summaryGrid = document.getElementById('summary-grid');

  function computeStats(data){
    const totalAttempts = data.length;
    const sumScore = data.reduce((s, a)=> s + (Number(a.score)||0), 0);
    const avgScore = totalAttempts? (sumScore / totalAttempts) : 0;
    const best = data.length? data.reduce((m,a)=> a.score>m.score? a:m, data[0]) : null;
    const last = data.length? data[0] : null; // assuming stored newest first

    // attempts by player
    const byPlayer = {};
    data.forEach(d=>{ const n=d.name||'Invitado'; byPlayer[n]=(byPlayer[n]||0)+1; });

    // attempts by scenario
    const byScenario = {};
    data.forEach(d=>{ const s = d.scenarioId || 'run'; byScenario[s]=(byScenario[s]||0)+1; });

    return { totalAttempts, avgScore, best, last, byPlayer, byScenario };
  }

  function renderSummary(stats){
    summaryGrid.innerHTML = '';
    const cards = [
      {title:'Total intentos', value: stats.totalAttempts},
      {title:'Puntaje promedio', value: stats.avgScore.toFixed(2)},
      {title:'Mejor registro', value: stats.best? `${stats.best.name} — ${stats.best.score}` : '—'},
      {title:'Último intento', value: stats.last? `${stats.last.name} — ${stats.last.score}` : '—'}
    ];
    cards.forEach(c=>{
      const el = document.createElement('div');
      el.className = 'summary-card';
      el.innerHTML = `<h3>${c.title}</h3><div class="muted">${c.value}</div>`;
      summaryGrid.appendChild(el);
    });

    // by player
    const pCard = document.createElement('div'); pCard.className='summary-card';
    pCard.innerHTML = `<h3>Intentos por usuario</h3>`;
    const ul = document.createElement('div'); ul.style.marginTop='8px';
    Object.keys(stats.byPlayer).sort((a,b)=>stats.byPlayer[b]-stats.byPlayer[a]).forEach(u=>{
      const r = document.createElement('div'); r.textContent = `${u}: ${stats.byPlayer[u]}`; ul.appendChild(r);
    });
    pCard.appendChild(ul);
    summaryGrid.appendChild(pCard);

    // by scenario
    const sCard = document.createElement('div'); sCard.className='summary-card';
    sCard.innerHTML = `<h3>Intentos por escenario</h3>`;
    const ul2 = document.createElement('div'); ul2.style.marginTop='8px';
    Object.keys(stats.byScenario).sort((a,b)=>stats.byScenario[b]-stats.byScenario[a]).forEach(s=>{
      const r = document.createElement('div'); r.textContent = `${s}: ${stats.byScenario[s]}`; ul2.appendChild(r);
    });
    sCard.appendChild(ul2);
    summaryGrid.appendChild(sCard);
  }

  function renderAttempts(data){
    attemptsList.innerHTML = '';
    if(data.length===0){ attemptsList.innerHTML = '<div class="small-muted">No hay intentos registrados.</div>'; return; }
    // show latest 50
    data.slice(0,50).forEach((a,i)=>{
      const row = document.createElement('div'); row.className='attempt-row';
      row.innerHTML = `<div><div><strong>${a.name}</strong> ${a.scenarioId? `<span class="small-muted">(escenario ${a.scenarioId})</span>`:''}</div><div class="attempt-meta">${new Date(a.date).toLocaleString()}</div></div><div class="leader-score">${a.score}</div>`;
      attemptsList.appendChild(row);
    });
  }

  // ensure newest first by date
  const sorted = arr.slice().sort((a,b)=> new Date(b.date) - new Date(a.date));
  const stats = computeStats(sorted);
  renderSummary(stats);
  renderAttempts(sorted);
});
