import { useMemo } from "react";
import Contact from "./Contact";

export default function OnlineUserList({ onlinePeople, offlinePeople, selectedUserId, setSelectedUserId }) {
  const users = useMemo(() => Object.entries({ ...offlinePeople, ...onlinePeople }).map(([id, u]) => ({ ...u, _id: id })).filter(u => u._id), [onlinePeople, offlinePeople]);
  const online = new Set(Object.keys(onlinePeople));
  return <aside className="hidden md:flex w-[30%] lg:w-[27%] max-w-sm border-r border-white/10 bg-dark/30 flex-col">
    <div className="p-5 border-b border-white/10"><h2 className="font-bold text-lg">People</h2><p className="text-xs text-gray-500 mt-1">{online.size} online</p></div>
    <div className="p-3 overflow-y-auto chat-scroll space-y-1">{users.map(user => <Contact key={user._id} user={user} online={online.has(user._id)} selected={selectedUserId === user._id} onClick={() => setSelectedUserId(user._id)}/>)}{!users.length && <p className="text-sm text-gray-500 p-3">No other verified users yet.</p>}</div>
  </aside>;
}
