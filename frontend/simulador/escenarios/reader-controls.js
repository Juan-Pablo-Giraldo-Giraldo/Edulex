// Controles compartidos: tamaño de letra, anchura, tema
document.addEventListener('DOMContentLoaded', () => {
  const defaultPrefs = { size: 'standard', width: 'standard', theme: 'auto' };
  const STORAGE_KEY = 'readerPrefs';

  function loadPrefs(){
    try { return Object.assign({}, defaultPrefs, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')); }
    catch { return defaultPrefs; }
  }

  function savePrefs(p){ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

  function applyPrefs(p){
    const root = document.documentElement;
    root.classList.remove('size-small','size-standard','size-large');
    root.classList.add('size-' + (p.size || 'standard'));
    root.classList.remove('width-standard','width-wide');
    root.classList.add('width-' + (p.width || 'standard'));
    root.classList.remove('theme-auto','theme-light','theme-dark');
    root.classList.add('theme-' + (p.theme || 'auto'));
  }

  function setupControls(){
    const prefs = loadPrefs();
    // seleccionar radios si existen
    const radios = document.querySelectorAll('[data-reader-control]');
    radios.forEach(r => {
      const name = r.dataset.readerControl;
      if (name in prefs) {
        if (r.value === prefs[name]) r.checked = true;
      }
      r.addEventListener('change', () => {
        const cur = loadPrefs();
        cur[name] = r.value;
        savePrefs(cur);
        applyPrefs(cur);
      });
    });
    applyPrefs(prefs);
  }

  setupControls();

  // función para mostrar nombre del usuario si hay sesión
  const currentEl = document.getElementById('current-user-name');
  if (currentEl) {
    try{
      const cu = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (cu && cu.name) currentEl.textContent = cu.name;
    }catch{}
  }
});
