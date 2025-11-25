// Lógica del simulador (guardado en localStorage)
(function(){
  const scenarios = [
    {
      id:1,
      title:'Intervención educativa ante casos de acoso escolar',
      desc:'Detectas que un estudiante A reporta acoso por parte de estudiante B en el patio. ¿Cuál es la acción más alineada con la Ley 1620 para proteger derechos y restablecer el ambiente escolar?',
      options:[
        {text:'Ignorar y sugerir que resuelvan entre ellos', correct:false, feedback:'La ley promueve la intervención institucional, no ignorar.'},
        {text:'Informar a dirección, documentar y activar ruta de atención educativa', correct:true, feedback:'Correcto — la ley exige rutas de atención y medidas pedagógicas.'},
        {text:'Publicar el caso en redes para crear conciencia', correct:false, feedback:'No se debe exponer a estudiantes; se prioriza la protección y la confidencialidad.'}
      ]
    },
    {
      id:2,
      title:'Reporte y seguimiento de una posible vulneración',
      desc:'Un docente recibe evidencia (mensajes) que podrían constituir vulneración de derechos. ¿Qué procede según la Ley 1620?',
      options:[
        {text:'Eliminar los mensajes y no informar para evitar problemas', correct:false, feedback:'Ocultar evidencia impide la ruta de atención y puede agravar la situación.'},
        {text:'Guardar evidencia, informar a la institucionalidad correspondiente y activar medidas de reparación educativa', correct:true, feedback:'Correcto — la documentación y la ruta de atención son claves.'},
        {text:'Enviar los mensajes al autor como advertencia pública', correct:false, feedback:'No es adecuado exponer ni sancionar públicamente sin proceso institucional.'}
      ]
    },
    {
      id:3,
      title:'Diseño de estrategias preventivas en el aula',
      desc:'Como coordinador, quieres prevenir conflictos y vulneraciones. ¿Qué medida es coherente con la Ley 1620?',
      options:[
        {text:'Solo aplicar sanciones cuando haya denuncias formales', correct:false, feedback:'La ley favorece la prevención y rutas educativas, no solo sanciones.'},
        {text:'Implementar rutas pedagógicas, talleres de convivencia y seguimiento a casos', correct:true, feedback:'Correcto — la ley promueve prevención, educación y rutas de atención.'},
        {text:'Evitar tocar el tema en clase para no generar alarma', correct:false, feedback:'Evitar el tema impide la prevención y la formación en convivencia.'}
      ]
    }
  ];

  // Estado
  let playerName = '';
  let currentIndex = 0; // índice de escenario actual en la secuencia seleccionada
  let score = 0;
  let answered = {}; // mapa scenarioId -> boolean

  // Elementos
  const el = selector => document.querySelector(selector);

  const screenHome = el('#screen-home');
  const screenScenarios = el('#screen-scenarios');
  const screenResults = el('#screen-results');



  const scenariosList = el('#scenarios-list');
  const scenarioPanel = el('#scenario-panel');
  const scenarioTitle = el('#scenario-title');
  const scenarioDesc = el('#scenario-desc');
  const optionsContainer = el('#options');
  const backToList = el('#back-to-list');
  const prevBtn = el('#prev-scenario');
  const nextBtn = el('#next-scenario');

  const finalFeedback = el('#final-feedback');
  const leaderboard = el('#leaderboard');

  // Inicialización: mostrar lista de escenarios
  function renderScenariosList(){
    scenariosList.innerHTML = '';
    scenarios.forEach((s,i)=>{
      const card = document.createElement('div');
      card.className = 'scenario-card';
      card.innerHTML = `<h4>${s.title}</h4><p class="small-muted">Situación ${i+1}</p><p>${s.desc.substring(0,120)}...</p><div style="margin-top:8px"><button class="btn" data-file="escenarios/escenario${s.id}.html">Abrir escenario</button></div>`;
      scenariosList.appendChild(card);
    });
  }

  function showScreen(screen){
    [screenHome, screenScenarios, screenResults].forEach(s=>s.classList.add('hidden'));
    screen.classList.remove('hidden');
  }

  function openScenarioById(id){
    const idx = scenarios.findIndex(s=>s.id===id);
    if(idx===-1) return;
    currentIndex = idx;
    renderScenario(scenarios[currentIndex]);
    scenarioPanel.classList.remove('hidden');
  }

  function renderScenario(s){
    scenarioTitle.textContent = s.title;
    scenarioDesc.textContent = s.desc;
    optionsContainer.innerHTML = '';
    s.options.forEach((opt,oi)=>{
      const b = document.createElement('button');
      b.className = 'option-btn';
      b.textContent = opt.text;
      b.dataset.idx = oi;
      b.addEventListener('click', ()=> selectOption(s, oi, b));
      optionsContainer.appendChild(b);
    });
  }

  function selectOption(s, oi, btnEl){
    if(answered[s.id]) return; // ya contestado
    const opt = s.options[oi];
    answered[s.id] = true;
    if(opt.correct){
      score += 1;
      btnEl.classList.add('correct');
    } else {
      btnEl.classList.add('wrong');
    }
    // mostrar retroalimentación inmediata dentro del panel
    const fb = document.createElement('div');
    fb.className = 'small-muted';
    fb.style.marginTop='10px';
    fb.textContent = opt.feedback;
    optionsContainer.appendChild(fb);

    // marcar otras opciones como deshabilitadas
    optionsContainer.querySelectorAll('button').forEach(b=>b.disabled=true);
  }

  function gotoNext(){
    if(currentIndex < scenarios.length -1){
      currentIndex +=1;
      renderScenario(scenarios[currentIndex]);
    } else {
      finishRun();
    }
  }

  function gotoPrev(){
    if(currentIndex >0){
      currentIndex -=1;
      renderScenario(scenarios[currentIndex]);
    }
  }

  function finishRun(){
    // mostrar feedback y leaderboard
    const total = scenarios.length;
    const pct = Math.round((score/total)*100);
    // pedir nombre al finalizar (si no hay uno establecido)
    if(!playerName){
      try{
        const entered = prompt('Introduce tu nombre para registrar el puntaje:','');
        playerName = entered && entered.trim() ? entered.trim() : 'Invitado';
      }catch(e){ playerName = 'Invitado'; }
    }

    finalFeedback.innerHTML = `<p><strong>${playerName}</strong>, obtuviste <strong>${score}</strong> de ${total} puntos (${pct}%).</p>`;
    // mensaje cualitativo
    let msg = '';
    if(pct===100) msg='Excelente: aplicaste correctamente las rutas y medidas.';
    else if(pct>=70) msg='Muy bien: buena comprensión, revisa algunos puntos.';
    else if(pct>=40) msg='Regular: repasa las rutas de atención y prevención.';
    else msg='Necesita reforzamiento: revisa las medidas de prevención y documentación.';
    finalFeedback.innerHTML += `<p class="small-muted">${msg}</p>`;

    saveScore(playerName, score, 'run');
    renderLeaderboard();
    showScreen(screenResults);
  }

  // Almacenamiento en localStorage (clave: edulex_scores)
  function saveScore(name, score, scenarioId){
    try{
      const key = 'edulex_scores_v1';
      const raw = localStorage.getItem(key);
      const arr = raw? JSON.parse(raw): [];
      arr.push({name:name||'Invitado',score:score,date:new Date().toISOString(), scenarioId: scenarioId || null});
      // ordenar desc por score
      arr.sort((a,b)=>b.score-a.score);
      // mantener últimos 50
      const trimmed = arr.slice(0,50);
      localStorage.setItem(key, JSON.stringify(trimmed));
    }catch(e){
      console.warn('No se pudo guardar el puntaje', e);
    }
  }

  function renderLeaderboard(){
    const key = 'edulex_scores_v1';
    const raw = localStorage.getItem(key);
    const arr = raw? JSON.parse(raw): [];
    if(arr.length===0){
      leaderboard.innerHTML = '<div class="small-muted">Aún no hay puntajes registrados.</div>';
      return;
    }
    leaderboard.innerHTML = '';
    arr.forEach((r, i)=>{
      const row = document.createElement('div');
      row.className='leader-row';
      row.innerHTML = `<div><span class="leader-name">${i+1}. ${r.name}</span><div class="small-muted">${new Date(r.date).toLocaleString()}${r.scenarioId? ' · escenario: '+r.scenarioId : ''}</div></div><div class="leader-score">${r.score}</div>`;
      leaderboard.appendChild(row);
    });
  }

  // Eventos
  // Si existe el formulario de inicio, lo ignoramos (registro eliminado). En su lugar, la ejecución
  // se inicia al seleccionar una situación o abrir un escenario desde la lista.


  function startRun(){
    // reset estado
    score = 0; answered = {};
    currentIndex = 0;
    renderScenariosList();
    showScreen(screenScenarios);
    // mostrar lista por defecto
    scenarioPanel.classList.add('hidden');
    renderScenariosList();
  }

  // Delegación botones "Abrir escenario"
  scenariosList.addEventListener('click', (ev)=>{
    const btn = ev.target.closest('button');
    if(!btn) return;
    // si tiene data-file -> abrir página externa
    const file = btn.dataset.file;
    if(file){
      // abrir en la misma pestaña la página del escenario
      location.href = file;
      return;
    }
    const id = Number(btn.dataset.id);
    if(id) {
      openScenarioById(id);
    }
  });
  // Agregar listeners solo si los elementos existen (hemos eliminado varios botones del DOM)
  if(backToList) backToList.addEventListener('click', ()=>{ scenarioPanel.classList.add('hidden'); });
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ gotoPrev(); });
  if(nextBtn) nextBtn.addEventListener('click', ()=>{
    const sid = scenarios[currentIndex].id;
    if(!answered[sid]){ alert('Por favor selecciona una opción antes de continuar.'); return; }
    if(currentIndex < scenarios.length -1){ currentIndex +=1; renderScenario(scenarios[currentIndex]); }
    else { finishRun(); }
  });

  // Los botones de control finales se han movido al selector/ranking. No hay listeners aquí.

  // Manejar clicks en los botones "Seleccionar" de las tarjetas de situación para iniciar la ejecución
  document.addEventListener('click', (ev)=>{
    const choose = ev.target.closest('.choose-btn.primary');
    if(!choose) return;
    // Si el enlace tiene href a un archivo real, permitir la navegación.
    const href = choose.getAttribute('href');
    if(href && href !== '#') return; // dejar que el navegador navegue
    ev.preventDefault();
    // iniciar la corrida de escenarios
    startRun();
  });

  // Inicializar vista
  showScreen(screenHome);
  renderLeaderboard();

})();
