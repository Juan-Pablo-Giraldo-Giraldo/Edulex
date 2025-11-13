document.getElementById('logoutBtn').addEventListener('click', async function(){
    try{
        const res = await fetch('/logout', { method: 'POST' });
        const data = await res.json();
        if(data.success) window.location.href = '/login/';
    } catch(e){
        alert('Error al cerrar sesión');
    }
});
