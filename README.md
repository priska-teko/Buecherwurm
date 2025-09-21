# Bücherwurm 📚

Ein MERN-Stack Projekt (MongoDB, Express, React, Node.js) mit **Vite** als Frontend-Build-Tool.  
Die Anwendung erlaubt das Anlegen, Verwalten und Filtern einer persönlichen Bücherliste.

---

## 🚀 Features
- Bücher hinzufügen, bearbeiten, löschen
- Statusverwaltung: *geplant*, *lese*, *gelesen*
- Filterleiste mit Zählern
- Context API zur globalen Stateverwaltung
- REST-API im Backend (Express)
- MongoDB Datenbank
- Vite + React im Frontend

---

## 🛠️ Installation & Setup

### 1. Repository klonen
```bash
git clone <repo-url>
cd buecherwurm
```

### 2. Backend einrichten
```bash
cd backend
npm install
```

- `.env` Datei im Backend anlegen:
  ```
  PORT=4000
  MONGO_URI=mongodb://localhost:27017/buecherwurm
  ```

- Backend starten:
  ```bash
  npm start
  ```
  ➝ läuft standardmäßig auf `http://localhost:4000`

### 3. Frontend einrichten
```bash
cd frontend
npm install
```

- `vite.config.js` enthält bereits Proxy-Einstellungen, damit API-Calls (`/api/...`) zum Backend durchgeleitet werden.

- Frontend starten:
  ```bash
  npm run dev
  ```
  ➝ läuft standardmäßig auf `http://localhost:5173`

---

## 📂 Projektstruktur
```
buecherwurm/
│
├── backend/              # Express + MongoDB API
│   ├── models/           # Mongoose Models
│   ├── routes/           # Express Routes
│   ├── server.js         # Entry Point
│   └── .env              # Konfiguration (lokal anlegen)
│
├── frontend/             # React + Vite
│   ├── public/           # statische Dateien
│   ├── src/
│   │   ├── components/   # React Komponenten
│   │   ├── context/      # React Context (BooksContext)
│   │   ├── hooks/        # Custom Hooks
│   │   ├── pages/        # Seiten (Home, Search, ...)
│   │   ├── App.jsx       # App-Komponente
│   │   ├── main.jsx      # Einstiegspunkt
│   │   └── index.css     # globale Styles
│   └── vite.config.js
│
└── README.md
```

---

## 📦 API Endpunkte (Backend)
Basis: `http://localhost:4000/api`

- `GET /api/books` → alle Bücher
- `POST /api/books` → neues Buch anlegen
- `PATCH /api/books/:id` → Buch aktualisieren
- `DELETE /api/books/:id` → Buch löschen

---

## 🧩 Technologien
- **Frontend:** React 18, React Router, Context API, Vite
- **Backend:** Node.js, Express, Mongoose
- **Datenbank:** MongoDB

---

## 💡 Nützliche Skripte
- `npm run dev` (im Frontend): Vite Dev Server
- `npm start` (im Backend): startet Express Server
- `npm run build` (im Frontend): Produktion-Build für Deployment

