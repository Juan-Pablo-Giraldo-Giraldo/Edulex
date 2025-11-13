Proyecto: Plataforma de Simulación Jurídica — UI + Backend (Demo)
Descripción general

Este proyecto combina una interfaz interactiva (frontend) y un servidor Node/Express (backend) orientados a la creación de una plataforma de simulación educativa.
El sistema busca innovar en la enseñanza de temas legales mediante experiencias prácticas, dinámicas y seguras, reemplazando la lectura tradicional por la participación activa del estudiante.

Ejes fundamentales del proyecto

Simulación de situaciones:
El módulo recrea escenarios de conflicto jurídico donde el estudiante puede interactuar, tomar decisiones y observar los efectos de sus acciones.
Esto reemplaza la lectura densa por una interacción lúdica y práctica, reduciendo el agotamiento visual y mental.

Lógica ramificada:
Cada decisión legal tomada por el usuario genera consecuencias específicas (óptimas, plausibles o inadecuadas).
El aprendizaje se centra en la reflexión sobre fortalezas y debilidades del perfil profesional, no en la simple memorización.

Inmersión y reducción del miedo:
El entorno simulado permite “jugar” con las variables sin riesgo real.
Al tratarse de un espacio libre de consecuencias académicas, se elimina el miedo a fallar y se transforma el error en una fuente de retroalimentación constructiva.

Actualmente, pocas instituciones emplean estrategias de este tipo para enseñar materias jurídicas.
En Colombia, la enseñanza de la legislación para licenciados sigue siendo un reto por la escasez de estrategias didácticas interactivas.
Estudios realizados en la UNAD, basados en la Ley 1480, demostraron en una prueba piloto con 30 participantes una alta adaptación y comprensión mediante el uso de un simulador educativo.
La Figura 1.1 ilustra el impacto positivo de esta propuesta.

Estructura del proyecto

frontend/: HTML, CSS y JavaScript para la interfaz de inicio de sesión y páginas auxiliares.

backend/: Servidor Node/Express con SQLite para gestionar usuarios, sesiones y endpoints /register, /login, /logout.

Requisitos

Node.js v16+

npm

Ejecución en Windows (PowerShell)

Abrir PowerShell y ubicarse en la carpeta del backend:

cd "C:/Users/pablo/OneDrive/Escritorio/Uni/info 4/proyecto final/backend"


Instalar dependencias:

npm install


Iniciar el servidor:

npm start


Acceder desde el navegador:

Login: http://localhost:4567/login/

Registro: http://localhost:4567/register/

Simulador (protegido): http://localhost:4567/simulator/

Notas técnicas

Los usuarios se almacenan en backend/data/users.db (SQLite).

Las contraseñas se guardan con hashing (bcrypt).

La gestión de sesión se maneja mediante cookies y persistencia con connect-sqlite3.

Para desarrollo puedes usar npm run dev si tienes nodemon instalado globalmente.

Si se desea, el sistema puede migrarse a un contenedor Docker o a otra base de datos (por ejemplo, H2 Server).
Estas adaptaciones permiten escalar la plataforma y facilitar su despliegue institucional.
