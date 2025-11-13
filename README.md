# Proyecto: UI de login (frontend) + backend Node/Express (demo)

Este pequeño proyecto contiene:

- `frontend/` : HTML, CSS y JS para una tarjeta de inicio de sesión y páginas auxiliares.
- `backend/` : servidor Node/Express con SQLite para persistir usuarios, gestión de sesiones y endpoints `/register`, `/login`, `/logout`.

Requisitos
- Node 16+ y npm

Cómo ejecutar en Windows (PowerShell)

1. Abrir PowerShell y moverse a la carpeta `backend`:

```powershell
cd "C:/Users/pablo/OneDrive/Escritorio/Uni/info 4/proyecto final/backend"
```

2. Instalar dependencias:

```powershell
npm install
```

3. Iniciar el servidor:

```powershell
npm start
```

4. Abrir el navegador y visitar las páginas:

- Login: http://localhost:4567/login/
- Registro: http://localhost:4567/register/
- Simulador (protegido): http://localhost:4567/simulator/  (requiere sesión)

Notas
- El endpoint `/register` guarda usuarios en una base de datos SQLite ubicada en `backend/data/users.db`.
- Las contraseñas se guardan con hashing (bcrypt).
- La sesión se maneja con cookies y se guarda en SQLite (`connect-sqlite3`).
- Para desarrollo puedes usar `npm run dev` si instalas `nodemon` globalmente.

Si quieres que migre esto a un contenedor Docker o que cambie la persistencia a otra base (H2/Server), dímelo y lo adapto.
