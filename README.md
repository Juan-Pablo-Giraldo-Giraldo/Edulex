# Proyecto: Plataforma de Simulación Jurídica — UI + Backend (Demo)

## Descripción general

Este repositorio contiene un prototipo de plataforma de simulación educativa para la enseñanza de contenidos jurídicos. Combina una interfaz web (frontend) con un servidor Node/Express (backend) para ofrecer escenarios interactivos, rutas de decisión y feedback inmediato.

## Ejes pedagógicos

- **Simulación de situaciones (escenario de conflicto):** el módulo recrea escenarios realistas en los que el estudiante toma decisiones y observa efectos prácticos en lugar de consumir solo texto jurídico.
- **Lógica ramificada:** cada decisión abre ramificaciones con consecuencias (óptimas, plausibles o inadecuadas). El objetivo es centrar el aprendizaje en la reflexión profesional, no en la memorización.
- **Inmersión y reducción del miedo:** el entorno seguro permite experimentar sin riesgo, transformando el error en retroalimentación constructiva.

Estos enfoques fueron validados en pruebas piloto (por ejemplo, un estudio en la UNAD sobre la Ley 1480 con 30 participantes) que mostraron una buena adaptación de los estudiantes a la simulación como método de aprendizaje.

## Estructura del proyecto

- `frontend/` — HTML, CSS y JavaScript (páginas: login, register, simulator, assets comunes).
- `backend/` — Node.js + Express. Endpoints principales: `/register`, `/login`, `/logout`, `/me`. Persistencia por defecto en SQLite (`backend/data/`).

## Requisitos

- Node.js v16+ (o superior)
- npm

## Ejecutar en desarrollo (Windows PowerShell)

1. Abrir PowerShell y situarse en la carpeta del backend:

```powershell
cd 'C:\Users\pablo\OneDrive\Escritorio\Uni\info 4\proyecto final\backend'
```

2. Instalar dependencias (usar `npm.cmd` si PowerShell bloquea `npm.ps1`):

```powershell
npm.cmd install
```

3. Iniciar el servidor:

```powershell
npm.cmd start
# o directamente:
# node src/server.js
```

4. Abrir en el navegador (puerto por defecto según el servidor; si no estás seguro usa 3000 o verifica `backend/src/server.js`):

- http://localhost:3000/login
- http://localhost:3000/register
- http://localhost:3000/simulator  (requiere autenticación)

**Nota:** algunas implementaciones o versiones pueden usar otro puerto (p. ej. 4567). Verifica el puerto real en `backend/src/server.js` o mediante la variable de entorno `PORT`.

## Persistencia y seguridad

- **Usuarios:** `backend/data/users.db` (SQLite) — conveniente para prototipos locales.
- **Contraseñas:** en el servidor se guardan con hashing (`bcrypt`).
- **Sesiones:** gestionadas con `express-session` y `connect-sqlite3` (cookies). En producción configura `SESSION_SECRET` como variable de entorno y usa cookies seguras (`SameSite`, `Secure`).

Si el remoto ya tiene commits (por ejemplo creó un README en GitHub), trae y fusiona:

```powershell
git pull origin main --allow-unrelated-histories
# resolver conflictos si aparecen
git add .
git commit -m "Merge remote changes"
git push -u origin main
```

## Despliegue y recomendaciones

- Frontend estático: GitHub Pages, Vercel o Netlify (apuntar al directorio `frontend/public`).
- Backend: Render, Railway o servicios similares. En producción evita SQLite y usa una base de datos gestionada (Postgres, MySQL).
- Si frontend y backend quedan en dominios distintos, habilita CORS y configura cookies con `SameSite=None` y `Secure=true` para permitir credenciales.

## Archivos útiles

- `.gitignore` — evita subir `node_modules`, datos locales y credenciales.
- `backend/src/server.js` — fichero principal del servidor (ver puerto y configuración de sesión).

---

Si quieres, puedo:

- crear un `.gitignore` ahora en tu proyecto, o
- confirmar el puerto leyendo `backend/src/server.js` y actualizar el README con el puerto exacto, o
- preparar un pequeño `Procfile`/`package.json` script para facilitar despliegues.

Indica qué prefieres y lo hago.
