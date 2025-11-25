// Lógica compartida para páginas de escenarios independientes
(function(){
  const scenarios = [
    {
      id:1,
      title:'Intervención educativa ante casos de acoso escolar',
      desc:'Detectas que un estudiante A reporta acoso por parte de estudiante B en el patio. ¿Cuál es la acción más alineada con la Ley 1620 para proteger derechos y restablecer el ambiente escolar?',
      options:[
        {text:'Ignorar y sugerir que resuelvan entre ellos', correct:false, feedback:'La ley promueve la intervención institucional, no ignorar.', detail:'Esto está mal porque la Ley 1620 exige intervención institucional para proteger a la víctima y garantizar el debido proceso. Pasos recomendados: informar a la dirección, documentar la ocurrencia, activar la ruta de atención educativa y ofrecer acompañamiento pedagógico al afectado.'},
        {text:'Informar a dirección, documentar y activar ruta de atención educativa', correct:true, feedback:'Correcto — la ley exige rutas de atención y medidas pedagógicas.', detail:'Esto está correcto porque respeta la ruta institucional y prioriza la protección del estudiante. Pasos a seguir: documentar la información, activar la atención institucional, coordinar medidas pedagógicas y hacer seguimiento para restablecer el ambiente escolar.'},
        {text:'Publicar el caso en redes para crear conciencia', correct:false, feedback:'No se debe exponer a estudiantes; se prioriza la protección y la confidencialidad.', detail:'Esto está mal porque expones a las personas involucradas y podrías revictimizarlas. En su lugar: seguir la ruta de atención, garantizar la confidencialidad y trabajar en estrategias educativas públicas sin identificar a las personas.'}
      ]
    },
    {
      id:2,
      title:'Reporte y seguimiento de una posible vulneración',
      desc:'Un docente recibe evidencia (mensajes) que podrían constituir vulneración de derechos. ¿Qué procede según la Ley 1620?',
      options:[
        {text:'Eliminar los mensajes y no informar para evitar problemas', correct:false, feedback:'Ocultar evidencia impide la ruta de atención y puede agravar la situación.', detail:'Esto está mal porque borrar evidencia impide la investigación y la atención apropiada. Pasos correctos: conservar la evidencia, proteger la cadena de custodia si aplica, informar a la institucionalidad y activar las medidas de reparación educativa.'},
        {text:'Guardar evidencia, informar a la institucionalidad correspondiente y activar medidas de reparación educativa', correct:true, feedback:'Correcto — la documentación y la ruta de atención son claves.', detail:'Esto está correcto porque documenta y formaliza la situación para activar protocolos. Pasos: asegurar la evidencia, informar a coordinación/directivos, activar la ruta y dar seguimiento con medidas pedagógicas y de protección.'},
        {text:'Enviar los mensajes al autor como advertencia pública', correct:false, feedback:'No es adecuado exponer ni sancionar públicamente sin proceso institucional.', detail:'Esto está mal porque puede vulnerar derechos y no respeta procedimientos. En su lugar: notificar a la instancia educativa responsable y seguir los procedimientos de investigación y acompañamiento.'}
      ]
    },
    {
      id:3,
      title:'Diseño de estrategias preventivas en el aula',
      desc:'Como coordinador, quieres prevenir conflictos y vulneraciones. ¿Qué medida es coherente con la Ley 1620?',
      options:[
        {text:'Solo aplicar sanciones cuando haya denuncias formales', correct:false, feedback:'La ley favorece la prevención y rutas educativas, no solo sanciones.', detail:'Esto está mal porque limita la acción a sanciones reactivas. La Ley 1620 promueve prevención, formación y rutas pedagógicas: implementar talleres, formación en convivencia y protocolos preventivos.'},
        {text:'Implementar rutas pedagógicas, talleres de convivencia y seguimiento a casos', correct:true, feedback:'Correcto — la ley promueve prevención, educación y rutas de atención.', detail:'Esto está correcto porque previene y educa. Pasos: diseñar talleres, formar al personal, documentar casos y establecer seguimientos para medir el impacto y ajustar las estrategias.'},
        {text:'Evitar tocar el tema en clase para no generar alarma', correct:false, feedback:'Evitar el tema impide la prevención y la formación en convivencia.', detail:'Esto está mal porque omitir el tema deja a la comunidad sin herramientas. Mejor: incorporar contenidos de convivencia y prevención de manera transversal, con un enfoque pedagógico.'}
      ]
    },
    {
      id:4,
      title:'Comunicación con familias y responsabilidades',
      desc:'Al manejar un caso que implica a menores, ¿cómo actuar en relación con las familias y la confidencialidad?',
      options:[
        {text:'Compartir todos los detalles públicamente para mayor transparencia', correct:false, feedback:'La confidencialidad y protección del menor son prioritarias.', detail:'Esto está mal porque atenta contra la privacidad y protección del menor. Pasos apropiados: informar a las familias involucradas respetando protocolos, proteger datos personales y coordinar acciones con la institución.'},
        {text:'Informar a la familia correspondiente respetando protocolos y solicitar acompañamiento institucional', correct:true, feedback:'Correcto — se debe informar a la familia en el marco de la ruta de atención.', detail:'Esto está correcto porque integra a la familia en el proceso de atención respetando la confidencialidad. Pasos: comunicar con respeto, ofrecer acompañamiento institucional y coordinar medidas de reparación o apoyo.'},
        {text:'No informar a nadie para evitar conflictos', correct:false, feedback:'Ocultar información impide la atención adecuada y puede perjudicar al estudiante.', detail:'Esto está mal porque impide la atención temprana y el acompañamiento. En su lugar: seguir protocolos para informar a quienes deban saber y activar medidas de protección.'}
      ]
    },
    {
      id:5,
      title:'Evaluación y mejora de las rutas institucionales',
      desc:'Se quiere evaluar si las rutas de atención funcionan. ¿Qué paso es apropiado?',
      options:[
        {text:'No realizar seguimiento, confiar en la intuición del personal', correct:false, feedback:'El seguimiento y la evaluación son necesarios para mejorar procesos.', detail:'Esto está mal porque impide la mejora continua. Pasos: recopilar datos, monitorear casos, obtener retroalimentación y ajustar protocolos según hallazgos.'},
        {text:'Recopilar datos, hacer seguimiento y ajustar protocolos según hallazgos', correct:true, feedback:'Correcto — la mejora continua requiere evaluación y ajustes.', detail:'Esto está correcto porque permite ajustar procesos basados en evidencia. Pasos: establecer indicadores, recolectar datos, analizar resultados y planear mejoras.'},
        {text:'Eliminar la ruta y dejar cada caso a discreción de quien llega primero', correct:false, feedback:'Eliminar rutas institucionales incrementa riesgos y generará inconsistencias.', detail:'Esto está mal porque aumenta riesgos y desigualdades. Mantener rutas claras y evaluarlas es la alternativa adecuada.'}
      ]
    }
  ];

  function findScenario(id){
    return scenarios.find(s=>s.id===Number(id));
  }

  function renderScenarioOnPage(s){
    const titleEl = document.getElementById('scenario-title');
    const descEl = document.getElementById('scenario-desc');
    const optionsEl = document.getElementById('options');
    if(!titleEl || !descEl || !optionsEl) return;
    titleEl.textContent = s.title;
    descEl.textContent = s.desc;
    optionsEl.innerHTML = '';
    s.options.forEach((opt, oi)=>{
      const b = document.createElement('button');
      b.className = 'option-btn';
      b.textContent = opt.text;
      b.dataset.idx = oi;
      b.addEventListener('click', ()=> selectOption(s, oi, b, optionsEl));
      optionsEl.appendChild(b);
    });
  }

  function selectOption(s, oi, btnEl, optionsContainer){
    // evitar repetir selección
    if(btnEl.disabled) return;
    const opt = s.options[oi];
    if(opt.correct){
      btnEl.classList.add('correct');
    } else {
      btnEl.classList.add('wrong');
    }
    // mostrar retroalimentación
    const fb = document.createElement('div');
    fb.className = 'small-muted';
    fb.style.marginTop='10px';
    fb.textContent = opt.feedback;
    optionsContainer.appendChild(fb);
    // deshabilitar todas las opciones
    optionsContainer.querySelectorAll('button').forEach(b=>b.disabled=true);

    // guardar puntaje: 1 si correcta, 0 si no
    const score = opt.correct ? 1 : 0;
    let player = 'Invitado';
    try{
      const cu = JSON.parse(localStorage.getItem('currentUser')||'null');
      if(cu && cu.name) player = cu.name;
    }catch(e){}

    saveScore(player, score, s.id);

    // mostrar confirmación y botones: Siguiente situación (hasta 2), Ver ranking sólo al final, y Volver a escenarios anteriores
    const savedDiv = document.createElement('div');
    savedDiv.style.marginTop = '10px';
    // detalle adicional (explicación extendida)
    const detailDiv = document.createElement('div');
    detailDiv.style.marginTop = '8px';
    detailDiv.innerHTML = `<strong>Resultado:</strong><p class="small-muted">${opt.detail || opt.feedback}</p>`;
    savedDiv.appendChild(detailDiv);

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '8px';
    container.style.alignItems = 'center';
    container.style.marginTop = '8px';

    const info = document.createElement('span');
    info.className = 'small-muted';
    info.innerHTML = `Puntaje guardado: <strong>${score}</strong>`;
    container.appendChild(info);

    // calcular si hay siguiente y si se permite (máx 2 en la cadena)
    const nextId = Number(s.id) + 1;
    const nextExists = !!findScenario(nextId);
    if(!window._scenarioChain) window._scenarioChain = { startId: Number(s.id), count: 1 };

    // si existe siguiente y aún no llegamos al límite de 2, mostrar botón "Siguiente situación"
    if(nextExists && (window._scenarioChain.count || 1) < 2){
      const btnNext = document.createElement('button');
      btnNext.className = 'btn small';
      btnNext.textContent = 'Siguiente situación';
      btnNext.addEventListener('click', ()=>{
        // incrementar contador y cargar siguiente en la misma página
        window._scenarioChain.count = (window._scenarioChain.count||1) + 1;
        // cargar siguiente escenario en página
        initScenarioPage(nextId);
      });
      container.appendChild(btnNext);
    }

    // "Ver ranking" sólo aparece si no hay siguiente permitido (alcanzado el máximo) o no existe siguiente
    const reachedMax = (window._scenarioChain.count && window._scenarioChain.count >= 2);
    if(!nextExists || reachedMax){
      const btnRank = document.createElement('button');
      btnRank.className = 'btn small';
      btnRank.textContent = 'Ver ranking';
      // dirigir a la página de ranking dedicada
      btnRank.addEventListener('click', ()=>{ location.href = '../ranking/ranking.html'; });
      container.appendChild(btnRank);
    }

    // siempre mostrar botón para volver a la lista de escenarios
    const btnBack = document.createElement('button');
    btnBack.className = 'btn small';
    btnBack.textContent = 'Volver a escenarios anteriores';
    btnBack.addEventListener('click', ()=>{ location.href = '../simulador.html'; });
    container.appendChild(btnBack);

    savedDiv.appendChild(container);
    optionsContainer.appendChild(savedDiv);
  }

  function saveScore(name, score, scenarioId){
    try{
      const key = 'edulex_scores_v1';
      const raw = localStorage.getItem(key);
      const arr = raw? JSON.parse(raw): [];
      arr.push({name:name||'Invitado', score:score, date: new Date().toISOString(), scenarioId: scenarioId || null});
      // ordenar desc por score, luego por fecha
      arr.sort((a,b)=>{
        if(b.score !== a.score) return b.score - a.score;
        return new Date(b.date) - new Date(a.date);
      });
      const trimmed = arr.slice(0,50);
      localStorage.setItem(key, JSON.stringify(trimmed));
    }catch(e){
      console.warn('No se pudo guardar el puntaje', e);
    }
  }

  // función pública para inicializar desde cada página
  window.initScenarioPage = function(id){
    const s = findScenario(id);
    if(!s){
      console.warn('Escenario no encontrado', id);
      return;
    }
    // llevar seguimiento de cadena de situaciones (hasta 2)
    if(!window._scenarioChain){
      window._scenarioChain = { startId: Number(id), count: 1 };
    } else if(window._scenarioChain.startId === undefined){
      window._scenarioChain = { startId: Number(id), count: 1 };
    } else if(window._scenarioChain.startId !== Number(id) && window._scenarioChain.count === 0){
      window._scenarioChain = { startId: Number(id), count: 1 };
    }
    // guardar id actual
    window._currentScenarioId = Number(id);

    // mostrar nombre del usuario si existe
    try{
      const cu = JSON.parse(localStorage.getItem('currentUser')||'null');
      const el = document.getElementById('current-user-name');
      const el2 = document.getElementById('current-user-name-inline');
      if(cu && cu.name){ if(el) el.textContent = cu.name; if(el2) el2.textContent = cu.name; }
    }catch(e){}
    renderScenarioOnPage(s);
  };

})();
