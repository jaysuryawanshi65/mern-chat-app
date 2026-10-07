const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const Message = require("./models/messageModel");
const { User } = require("./models/userModel");

function parseCookie(cookieHeader, name) {
  const found = (cookieHeader || "").split(";").map(v => v.trim()).find(v => v.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : null;
}

module.exports = function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  const broadcastOnline = async () => {
    const online = await Promise.all(
      [...wss.clients].filter(c => c.readyState === WebSocket.OPEN && c.userId).map(async client => {
        const user = await User.findById(client.userId).select("avatarLink");
        return { userId: client.userId, username: client.username, avatarLink: user?.avatarLink || null };
      })
    );
    const payload = JSON.stringify({ online });
    [...wss.clients].forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(payload);
    });
  };

  wss.on("connection", async (connection, req) => {
    try {
      const token = parseCookie(req.headers.cookie, "authToken");
      if (!token) return connection.close(1008, "Authentication required");
      const userData = jwt.verify(token, process.env.JWTPRIVATEKEY);
      connection.userId = String(userData._id);
      connection.username = `${userData.firstName} ${userData.lastName}`;
    } catch (error) {
      return connection.close(1008, "Invalid authentication token");
    }

    connection.isAlive = true;
    connection.on("pong", () => { connection.isAlive = true; });

    connection.on("message", async raw => {
      try {
        const { recipient, text } = JSON.parse(raw.toString());
        if (!recipient || !text?.trim()) return;

        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text: text.trim()
        });

        const payload = JSON.stringify({
          sender: connection.userId,
          senderName: connection.username,
          recipient,
          text: text.trim(),
          id: msgDoc._id,
          createdAt: msgDoc.createdAt
        });

        [...wss.clients].forEach(client => {
          if (
            client.readyState === WebSocket.OPEN &&
            (client.userId === String(recipient) || client.userId === String(connection.userId))
          ) client.send(payload);
        });
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });

    connection.on("close", broadcastOnline);
    await broadcastOnline();
  });

  const interval = setInterval(() => {
    [...wss.clients].forEach(client => {
      if (client.isAlive === false) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 30000);

  wss.on("close", () => clearInterval(interval));
};
