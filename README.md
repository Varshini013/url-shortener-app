A production-ready HTTP URL Shortener microservice with a responsive React frontend built.

---

## ✨ Features

- 🌐 Shorten long URLs with optional custom shortcode
- 🕒 Optional validity (default 30 minutes)
- 📊 Track click statistics: count, timestamp, referrer, coarse location
- 🪵 Uses **custom logging middleware** (no `console.log`)
- ⚙️ Backend in **Node.js + Express**
- 💻 Frontend in **React + Material UI**
- 🧠 In-memory storage (no database)

---

## 📦 Backend API

### 🔸 POST `/shorturls`

Creates a new shortened URL.

**Request body:**
```json
{
  "url": "https://example.com/very/long/url",
  "validity": 30,
  "shortcode": "abcd1"
}
```

**Response:**
```json
{
  "shortLink": "http://localhost:5000/abcd1",
  "expiry": "2025-01-01T00:30:00Z"
}
```

---

### 🔸 GET `/shorturls/:shortcode`

Retrieves stats for a given shortcode.

**Response:**
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "createdAt": "2025-01-01T00:00:00Z",
  "expiry": "2025-01-01T00:30:00Z",
  "clicks": 5,
  "clickData": [
    {
      "timestamp": "2025-01-01T00:15:00Z",
      "referrer": "https://google.com",
      "location": "India"
    }
  ]
}
```

---

## 🧪 How to Run Locally

### 🔁 Clone this repo

```bash
git clone https://github.com/Varshini013/url-shortener-app.git
cd url-shortener-app
```

---

### 📦 Backend Setup

```bash
cd backend
npm install
node server.js
# Runs at http://localhost:5000
```

---

### 🌐 Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm start
# Runs at http://localhost:3000
```

---

## 🗂️ Folder Structure

```
url-shortener-app/
├── backend/
│   ├── data/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
├── README.md
└── .gitignore
```

---

## 📌 Notes

- 🧠 No database used — in-memory only
- 🪵 Custom logging middleware logs to `backend/log.txt`
- 🛑 No `console.log` used
- 🔐 No authentication — assumed pre-authorized users (per spec)
- 🌐 Frontend consumes backend via REST APIs only

---

## 🧹 Improvements (Optional Ideas)

- 🌍 Add persistent storage (MongoDB or SQLite)
- 🗺️ Improve location accuracy using IP lookup APIs
- 📁 Deploy on cloud (Render/Netlify/Heroku)

