import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, userDetails, selectedUserId }) {
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  return <div className="h-[calc(100vh-136px)] overflow-y-auto chat-scroll px-4 md:px-7 py-6 space-y-3">
    {!selectedUserId && <div className="h-full grid place-items-center text-center text-gray-500"><div><div className="text-5xl mb-4">💬</div><p className="font-semibold text-gray-300">Select someone to start chatting</p><p className="text-sm mt-1">Your messages will appear here in real time.</p></div></div>}
    {selectedUserId && messages.map((message, index) => {
      const mine = String(message.sender) === String(userDetails?._id);
      return <div key={message._id || message.id || index} className={`flex ${mine ? "justify-end" : "justify-start"}`}><div className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-4 py-3 text-sm ${mine ? "bg-primarySecond rounded-tr-sm" : "bg-primary rounded-tl-sm"}`}><div>{message.text}</div><div className="text-[10px] opacity-60 mt-1 text-right">{message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}) : "now"}</div></div></div>;
    })}
    <div ref={end}/>
  </div>;
}
