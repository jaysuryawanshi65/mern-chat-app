import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { socketUrl } from "../apiConfig";
import { useProfile } from "../context/profileContext";
import Nav from "../components/Chat/Nav";
import OnlineUserList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";

export default function ChatHome() {
  const { userDetails } = useProfile();
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  const loadPeople = useCallback(async () => {
    try {
      const res = await axios.get("/api/user/people");
      const map = {};
      res.data.filter(p => String(p._id) !== String(userDetails?._id)).forEach(p => { map[p._id] = p; });
      setOfflinePeople(map);
    } catch (e) { console.error(e); }
  }, [userDetails?._id]);

  const loadMessages = useCallback(async () => {
    if (!selectedUserId) { setMessages([]); return; }
    try { const res = await axios.get(`/api/user/messages/${selectedUserId}`); setMessages(res.data); }
    catch (e) { console.error(e); }
  }, [selectedUserId]);

  useEffect(() => { loadPeople(); }, [loadPeople]);
  useEffect(() => { loadMessages(); }, [loadMessages]);

  useEffect(() => {
    if (!userDetails) return;
    let stopped = false;
    const connect = () => {
      const socket = new WebSocket(socketUrl);
      socketRef.current = socket;
      socket.onopen = () => { if (!stopped) setConnected(true); };
      socket.onclose = () => { if (!stopped) { setConnected(false); setTimeout(connect, 1500); } };
      socket.onerror = () => setConnected(false);
      socket.onmessage = event => {
        const data = JSON.parse(event.data);
        if (data.online) {
          const online = {};
          data.online.forEach(p => { if (String(p.userId) !== String(userDetails._id)) online[p.userId] = { _id:p.userId, username:p.username, avatarLink:p.avatarLink }; });
          setOnlinePeople(online);
        } else if (data.text) {
          if (String(data.sender) === String(selectedUserId) || String(data.recipient) === String(selectedUserId)) setMessages(prev => [...prev, data]);
        }
      };
      setWs(socket);
    };
    connect();
    return () => { stopped = true; socketRef.current?.close(); };
  }, [userDetails?._id, selectedUserId]);

  const sendMessage = e => {
    e.preventDefault();
    if (!selectedUserId || !newMessage.trim() || socketRef.current?.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify({ recipient: selectedUserId, text: newMessage.trim() }));
    setNewMessage("");
  };

  return <div className="flex min-h-screen bg-background">
    <Nav/>
    <OnlineUserList onlinePeople={onlinePeople} offlinePeople={offlinePeople} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}/>
    <main className="flex-1 min-w-0 relative">
      {selectedUserId && <TopBar selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} offlinePeople={offlinePeople} onlinePeople={onlinePeople}/>} 
      <ChatMessages messages={messages} userDetails={userDetails} selectedUserId={selectedUserId}/>
      <div className="absolute left-0 right-0 bottom-0"><MessageInputForm newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} selectedUserId={selectedUserId} connected={connected}/></div>
    </main>
  </div>;
}
