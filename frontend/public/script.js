document.getElementById('registerForm').addEventListener('submit', async function(e){
  e.preventDefault();
  // limpiar errores
  ['name-error','email-error','password-error','register-general'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = ''; });

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  let ok = true;
  if (name.length === 0){
    document.getElementById('name-error').textContent = 'Introduce tu nombre.';
    document.getElementById('name').classList.add('input-error');
    ok = false;
  } else document.getElementById('name').classList.remove('input-error');
  if (!email.includes('@')){
    document.getElementById('email-error').textContent = 'Introduce un correo válido.';
    document.getElementById('email').classList.add('input-error');
    ok = false;
  } else document.getElementById('email').classList.remove('input-error');
  if (password.length < 6){
    document.getElementById('password-error').textContent = 'La contraseña debe tener al menos 6 caracteres.';
    document.getElementById('password').classList.add('input-error');
    ok = false;
  } else document.getElementById('password').classList.remove('input-error');
  if (!ok) return;

  try{
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if(data.success){
      // redirigir al simulador protegido (la sesión se crea en el servidor)
      window.location.href = '/simulator/';
    } else {
      document.getElementById('register-general').textContent = data.message || 'No se pudo registrar';
    }
  } catch(err){
    document.getElementById('register-general').textContent = 'Error de conexión';
  }
});
