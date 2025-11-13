// Header that shows auth state and logout button
(function(){
  async function refreshHeader(){
    try{
      const res = await fetch('/me', { cache: 'no-store' });
      const data = await res.json();

      const header = document.querySelector('.site-header') || createHeader();
      const inner = header.querySelector('.header-inner');
      inner.innerHTML = '';

      if(data && data.authenticated){
        const span = document.createElement('span');
        span.className = 'greeting';
        span.innerHTML = `Hola, <strong>${escapeHtml(data.name)}</strong>`;

        const btn = document.createElement('button');
        btn.id = 'headerLogout';
        btn.className = 'header-logout';
        btn.textContent = 'Cerrar sesión';
        btn.addEventListener('click', doLogout);

        inner.appendChild(span);
        inner.appendChild(btn);
      } else {
        const a1 = document.createElement('a');
        a1.href = '/login/';
        a1.textContent = 'Iniciar sesión';

        const sep = document.createElement('span');
        sep.className = 'sep';
        sep.textContent = ' | ';

        const a2 = document.createElement('a');
        a2.href = '/register/';
        a2.textContent = 'Registrarse';

        inner.appendChild(a1);
        inner.appendChild(sep);
        inner.appendChild(a2);
      }
    }catch(e){
      // ignore
      console.error('header /me failed', e);
    }
  }

  function createHeader(){
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = '<div class="header-inner"></div>';
    document.body.insertBefore(header, document.body.firstChild);
    return header;
  }

  async function doLogout(){
    try{
      await fetch('/logout', { method: 'POST' });
    }catch(e){
      // ignore
    }
    window.location.href = '/login/';
  }

  function escapeHtml(str){
    if(!str) return '';
    return str.replace(/[&<>"']/g, function(s){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'})[s];
    });
  }

  // init
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', refreshHeader);
  } else {
    refreshHeader();
  }
})();
