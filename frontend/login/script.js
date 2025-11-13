document.getElementById('loginForm').addEventListener('submit', async function(e){
  e.preventDefault();
  // limpiar errores previos
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-error').textContent = '';
  document.getElementById('login-general').textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  let hasError = false;
  if (!email.includes('@')){
    document.getElementById('email-error').textContent = 'Introduce un correo válido.';
    document.getElementById('email').classList.add('input-error');
    hasError = true;
  } else {
    document.getElementById('email').classList.remove('input-error');
  }
  if (password.length < 6){
    document.getElementById('password-error').textContent = 'La contraseña debe tener al menos 6 caracteres.';
    document.getElementById('password').classList.add('input-error');
    hasError = true;
  } else {
    document.getElementById('password').classList.remove('input-error');
  }
  if (hasError) return;

  try{
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(data.success){
      // redirigir al simulador protegido
      window.location.href = '/simulator/';
    } else {
      document.getElementById('login-general').textContent = data.message || 'Credenciales inválidas';
    }
  } catch(err){
    document.getElementById('login-general').textContent = 'Error de conexión';
  }
});
