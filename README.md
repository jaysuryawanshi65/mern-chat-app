# Swift Chat — MERN Real-Time Chat

A complete real-time chat application based on the uploaded MERN/WebSocket tutorial PDF.

## Stack
- MongoDB + Mongoose
- Express + Node.js
- React + Vite
- WebSocket (`ws`)
- JWT authentication + cookies
- Nodemailer email verification
- Tailwind CSS

## Features
- Register / login / email verification
- JWT authentication
- Online/offline user list
- Real-time one-to-one messaging over WebSocket
- Persistent messages in MongoDB
- Profile update + avatar selection
- Responsive landing/chat UI

## 1. Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Optional SMTP account for real email verification

## 2. Backend
```bash
cd server
npm install
copy .env.example .env
```
Fill in `DB` and `JWTPRIVATEKEY`. For email verification, fill SMTP variables.

Start:
```bash
npm run dev
```
Server: `http://localhost:4000`

## 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`

## 4. Seed avatar URLs
After the backend is running, either use the included seed script:
```bash
cd server
npm run seed:avatars
```
Or POST `{ "link": "https://..." }` to `/api/avatar`.

## 5. Production build
```bash
cd frontend
npm run build
```

Then run the server and serve the generated `frontend/dist` through your preferred deployment setup.

## Notes
The PDF's tutorial uses a WebSocket server mounted on the same HTTP server and a MongoDB-backed message model. This implementation follows that architecture while filling in a few incomplete/OCR-damaged snippets from the PDF so the project is runnable.
