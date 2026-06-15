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
🎵 <b>Lossless FLAC Streaming</b><br>
⚡ <b>Fast HTTP Range Streaming</b><br>
🎨 <b>Automatic Cover Art Extraction</b><br>
📋 <b>Metadata Parsing & Caching</b><br>
🔍 <b>Built-in Search System</b><br>
💿 <b>Embedded Artwork Support</b><br>
📱 <b>Responsive Modern UI</b><br>
🚀 <b>Self Hosted</b><br>
🌐 <b>Browser Based</b><br>
🎧 <b>No Subscription Required</b>
</p>

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

### <div align="center">Clone the repository</div>


```bash
git clone https://github.com/Mikolaj0524/FlacStream.git
cd FlacStream
```

### <div align="center">Install dependencies</div>

```bash
cd frontend
npm install

cd ../backend
npm install
```

### <div align="center">Start FlacStream</div>

```bash
cd backend
node index.js
```

That's it. 🎉

The backend will automatically:

* Build the frontend (if needed)
* Scan your music library
* Read FLAC metadata
* Extract album covers
* Generate cache files
* Start the streaming server

---

## <div align="center">🎶 Adding Music</div>

Place your `.flac` files inside:

```text
backend/music
```

Example:

```text
backend/music/
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
│   ├── src/
│   └── dist/
│
├── backend/
│   ├── music/
│   ├── covers/
│   ├── cache.json
│   └── index.js
│
└── preview/
```

---

## <div align="center">🌐 API</div>

### <div align="center">Get Song List</div>

```http
GET /songs
```

### <div align="center">Stream Audio</div>

```http
GET /stream/{song.flac}
```

### <div align="center">Get Cover Artwork</div>

```http
GET /covers/{cover-file}
```

---

## <div align="center">📜 License</div>
<div align="center">
    FlacStream project is licensed under GNU GPL v3.0 license.
</div>

---
</div>
