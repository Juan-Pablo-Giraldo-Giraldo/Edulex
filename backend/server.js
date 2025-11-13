const path = require('path');
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 4567;

// DB (file backend/data/users.db)
const dbPath = path.join(__dirname, 'data', 'users.db');
const dbDir = path.join(__dirname, 'data');
const fs = require('fs');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session store in SQLite (connect-sqlite3)
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite', dir: path.join(__dirname, 'data') }),
  secret: process.env.SESSION_SECRET || 'change-this-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));

// Servir frontend estático
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));

// Helpers
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  res.status(401).json({ success: false, message: 'No autorizado' });
}

// Registro
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.json({ success: false, message: 'Faltan campos' });
  if (!email.includes('@') || password.length < 6) return res.json({ success: false, message: 'Email o contraseña inválidos' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    stmt.run(name, email, hashed, function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.json({ success: false, message: 'El correo ya está registrado' });
        }
        return res.status(500).json({ success: false, message: 'Error al guardar usuario' });
      }
      req.session.userId = this.lastID;
      req.session.userName = name;
      res.json({ success: true, message: 'Registro exitoso', userId: this.lastID });
    });
    stmt.finalize();
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error interno' });
  }
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.json({ success: false, message: 'Faltan campos' });
  db.get('SELECT id, name, password FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ success: false, message: 'Error DB' });
    if (!row) return res.json({ success: false, message: 'Usuario no encontrado' });
    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.json({ success: false, message: 'Contraseña incorrecta' });
    req.session.userId = row.id;
    req.session.userName = row.name;
    res.json({ success: true, message: 'Autenticado', userId: row.id });
  });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success: false, message: 'No se pudo cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// Protected simulator route (servir el archivo solo si autenticado)
app.get(['/simulator','/simulator/'], (req, res, next) => {
  if (req.session && req.session.userId) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'simulator', 'index.html'));
  } else {
    // si es petición XHR, devolver 401 JSON, si es navegador redirigir al login
    if (req.headers.accept && req.headers.accept.indexOf('application/json') !== -1) {
      res.status(401).json({ success: false, message: 'No autorizado' });
    } else {
      res.redirect('/login/');
    }
  }
});

// Endpoint para obtener info del usuario logueado
app.get('/me', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ authenticated: true, userId: req.session.userId, name: req.session.userName });
  } else {
    res.json({ authenticated: false });
  }
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
