const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// --- Basics ---
app.use(express.json());

// Optional: CORS nur falls du NICHT über eine Rewrite-Regel gehst
// app.use(cors({ origin: ['http://localhost:5173', 'https://DEIN-FRONTEND.onrender.com'] }));

// --- ENV ---
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


if (!MONGO_URI) {
  console.error('❌ MONGO_URI ist nicht gesetzt!');
  process.exit(1);
}

// --- DB Connect ---
(async () => {
  try {
    await mongoose.connect(MONGO_URI, DB_NAME ? { dbName: DB_NAME } : undefined);
    console.log('✅ MongoDB verbunden');
  } catch (err) {
    console.error('❌ MongoDB Fehler:', err);
    process.exit(1);
  }
})();

// --- Routen ---
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// -> WICHTIG: Router einhängen (Datei: backend/routes/books.js)
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

// 404 für nicht gefundene Routen (API)
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Zentrales Error-Handling
// (falls in Routern next(err) aufgerufen wird)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

// --- Start ---
app.listen(PORT, () => {
  console.log('🚀 Server läuft auf Port', PORT);
});
