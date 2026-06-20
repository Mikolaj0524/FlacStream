# <div hidden> FlacStream</div>
<p align="center">
  <img src="https://github.com/Mikolaj0524/FlacStream/blob/main/frontend/public/logo_purple.svg?raw=true" alt="FlacStream Logo">
</p>
<div align="center">

### Stream your music collection in **FLAC Lossless Quality**
<br>
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/FLAC-Lossless-E91E63?style=for-the-badge">
<br>
<br>

**A lightweight self-hosted music streaming platform built for FLAC enthusiasts.**
<br>
<br>
**Fully responsive web layout for PC, mobile, tablet, TV, and all devices.**
<br>
</div>

<p align="center">
  <img src="https://github.com/Mikolaj0524/FlacStream/blob/main/preview/1.png?raw=true" alt="FlacStream Preview">
</p>

---

## <div align="center">✨ Features</div>

<p align="center">
🎵 Lossless FLAC Streaming<br>
⏩ Partial Audio Loading<br>
⚡ Fast HTTP Range Streaming<br>
🎨 Automatic Cover Art Extraction<br>
📋 Metadata Parsing & Caching<br>
🔍 Built-in Search System<br>
💿 Embedded Artwork Support<br>
📱 Responsive Modern UI<br>
🚀 Self Hosted<br>
🌐 Web Based<br>
🎧 No Subscription Required
</p>

---

## <div align="center">🔐 Authentication</div>

<p align="center">
🍪 Cookie-based authentication<br>
🔒 Server-side session validation<br>
🛡️ Protected API endpoints<br>
🚫 Unauthorized requests are blocked<br>
🔁 Persistent login between browser sessions
</p>

### <div align="center">backend/config.js:</div>

<p align="center">Authentication with keys</p>

```javascript
export const AUTHENTICATION = ["secret_key1", "secret_key2", ...];
```
<p align="center">Disable authentication</p>

```javascript
export const AUTHENTICATION = null;
```

---

## <div align="center">🛠️ Built With</div>

<p align="center">
React • Tailwind CSS • Vite • Node.js • Express.js
</p>

---


<p align="center">
  <img src="https://github.com/Mikolaj0524/FlacStream/blob/main/preview/2.png?raw=true" alt="FlacStream Search">
</p>

---

## <div align="center">🚀 Quick Start</div>
<br>

### <div align="center">Clone the repository</div>


```bash
git clone https://github.com/Mikolaj0524/FlacStream.git
cd FlacStream
```
<br>

### <div align="center">Install dependencies</div>

```bash
cd frontend
npm install
cd ../
```

```bash
cd backend
npm install
cd ../
```
<br>

### <div align="center">Build frontend</div>

```bash
cd frontend
npm run build
cd ../
```
<br>

### <div align="center">Start FlacStream</div>

```bash
cd backend
node index.js
```

That's it. 🎉

The backend will automatically:

* Scan your music library
* Read FLAC metadata
* Extract album covers
* Generate cache files
* Start the streaming server

---

## <div align="center">🎶 Adding Music</div>

Place your `.flac` files inside:

```text
backend/data/music/
```

Example:

```text
backend/data/music/
├── Artist - Song.flac
├── Artist - Song 2.flac
└── Album Track.flac
```

FlacStream will automatically detect them on startup.

---

## <div align="center">📂 Project Structure</div>

```text
FlacStream/
│
├── frontend/
│   ├── public/
│   │   ├── logo_gray.svg
│   │   ├── logo_purple.svg
│   │   ├── logo_white.svg
│   │   ├── sort_rnd.svg
│   │   └── unknown.svg
│   │    
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Content.jsx
│   │   │   ├── Empty.jsx
│   │   │   ├── Filter.jsx
│   │   │   ├── Item.jsx
│   │   │   ├── Items.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Player.jsx
│   │   │   └── Search.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── AppContext.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │    
│   └── index.html
│
├── backend/
│   ├── data/
│   │   ├── covers/
│   │   ├── music/
│   │   └── cache.json
│   │    
│   ├── modules/
│   │   ├── auth.js
│   │   ├── cache.js
│   │   └── sessions.js
│   │    
│   ├── routes/
│   │   ├── check.js
│   │   ├── covers.js
│   │   ├── songs.js
│   │   ├── stream.js
│   │   └── login.js
│   │    
│   ├── utils/
│   │   └── paths.js
│   │    
│   ├── config.js
│   └── index.js
```

---

## <div align="center">🌐 API</div>

### <div align="center">Login</div>

```http
POST /login

Response type: [status code (ok=200, unauthorized=401)]

fetch("/login", {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({key: "<put-your-secret-here>"})
});
```

<br>

<p align="middle">
   Endpoints under this message are protected by cookies.
</p>

### <div align="center">Song List</div>

```http
GET /songs

Response type: [json]

fetch("/songs", {
  credentials: "include"
});
```

### <div align="center">Stream Audio</div>

```http
GET /stream/{song.flac}         

Response type: [audio/flac stream]
Supports HTTP Range requests
```

### <div align="center">Cover Artwork</div>

```http
GET /covers/{cover-file}

Response type: [image]
```

### <div align="center">Check Cookie</div>

```http
GET /check

Response type: [status code (ok=200, unauthorized=401)]

fetch("/check", {
    method: "GET",
    credentials: "include"
});
```

---

## <div align="center">📜 License</div>
<div align="center">
    FlacStream project is licensed under GNU GPL v3.0 license.
</div>

---
</div>
