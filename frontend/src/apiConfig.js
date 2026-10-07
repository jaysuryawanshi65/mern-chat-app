const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
const socketUrl = import.meta.env.VITE_SOCKET_URL || "ws://localhost:4000";
export { baseUrl, socketUrl };
