(function(){
  const bugIcon = document.getElementById('bugIcon');
  const bugModal = document.getElementById('bugModal');
  const bugBackdrop = document.getElementById('bugBackdrop');
  const bugCancel = document.getElementById('bugCancel');
  const bugForm = document.getElementById('bugForm');
  const bugStatus = document.getElementById('bugStatus');

  function openBugModal(){ 
    if(!bugModal) return;
    bugModal.setAttribute('aria-hidden','false'); 
    const t = document.getElementById('bugTitle');
    if(t) t.focus();
  }
  function closeBugModal(){ 
    if(!bugModal) return;
    bugModal.setAttribute('aria-hidden','true'); 
    if(bugStatus) bugStatus.textContent=''; 
    if(bugForm) bugForm.reset(); 
  }

  if(bugIcon){ 
    bugIcon.addEventListener('click', openBugModal); 
    if(bugIcon.parentElement) bugIcon.parentElement.addEventListener('keypress', function(e){ if(e.key==='Enter' || e.key===' ') openBugModal(); });
  }
  if(bugBackdrop) bugBackdrop.addEventListener('click', closeBugModal);
  if(bugCancel) bugCancel.addEventListener('click', closeBugModal);

  async function toBase64(file){ 
    return new Promise((res,rej)=>{ 
      const r=new FileReader(); 
      r.onload=()=>res(r.result.split(',')[1]); 
      r.onerror=rej; 
      r.readAsDataURL(file); 
    }); 
  }

  if(!bugForm) return;

  bugForm.addEventListener('submit', async function(e){
    e.preventDefault();
    if(bugStatus) bugStatus.textContent='Enviando...';
    const title = (document.getElementById('bugTitle')||{}).value ? document.getElementById('bugTitle').value.trim() : '';
    const description = (document.getElementById('bugDesc')||{}).value ? document.getElementById('bugDesc').value.trim() : '';
    const fileInput = document.getElementById('bugFile');
    let screenshot = null;
    if(fileInput && fileInput.files && fileInput.files[0]){
      try{ screenshot = await toBase64(fileInput.files[0]); }catch(err){ console.warn('error encoding file',err); }
    }

    const payload = { title, description, screenshot, ts: new Date().toISOString(), page: window.location.pathname };

    // Intentar enviar al servidor; si falla, guardar en localStorage
    try{
      const res = await fetch('/report-bug', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if(res.ok){ if(bugStatus) bugStatus.textContent='Reporte enviado. Gracias.'; setTimeout(closeBugModal,1200); return; }
    }catch(err){ /* ignore */ }

    // fallback: save to localStorage
    try{
      const key = 'bugReports';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
      if(bugStatus) bugStatus.textContent='Guardado localmente (sin servidor).';
      setTimeout(closeBugModal,1200);
    }catch(err){ if(bugStatus) bugStatus.textContent='Error al guardar reporte.' }
  });
})();
