require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const userRoute = require("./routes/userRoute");
const avatarRoute = require("./routes/avatarRoute");
const createWebSocketServer = require("./wsServer");

const app = express();
const PORT = Number(process.env.PORT || 4000);
const FRONTEND_URL = process.env.BASE_URL || "http://localhost:5173";

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.get("/api/health", (req, res) => res.json({ ok: true, service: "swift-chat" }));
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

const server = app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
createWebSocketServer(server);

const frontendDist = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(frontendDist, "index.html"), err => {
    if (err) next();
  });
});
