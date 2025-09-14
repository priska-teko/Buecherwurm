// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI ist nicht gesetzt!");
  process.exit(1);
}

// DB verbinden (optional dbName geben, falls nicht im URI)
mongoose
  .connect(MONGO_URI /* , { dbName: 'test' } */)
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => {
    console.error("❌ MongoDB Fehler:", err);
    process.exit(1);
  });

// Health-Check (muss 200 liefern)
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Bücher-Router
app.use("/api/books", require("./routes/books"));

app.listen(PORT, () => {
  console.log("🚀 Server läuft auf Port", PORT);
});
