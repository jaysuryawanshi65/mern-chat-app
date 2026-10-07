import Avatar from "./Avatar";

export default function TopBar({ selectedUserId, setSelectedUserId, offlinePeople, onlinePeople }) {
  const user = onlinePeople[selectedUserId] || offlinePeople[selectedUserId];
  if (!user) return null;
  return <header className="h-[76px] border-b border-white/10 flex items-center px-5 gap-3"><button className="md:hidden text-gray-400" onClick={() => setSelectedUserId(null)}>←</button><Avatar username={user.username || `${user.firstName} ${user.lastName}`} userId={selectedUserId} avatarLink={user.avatarLink} isOnline={Boolean(onlinePeople[selectedUserId])}/><div><div className="font-semibold">{user.username || `${user.firstName} ${user.lastName}`}</div><div className="text-xs text-gray-500">{onlinePeople[selectedUserId] ? "Online" : "Offline"}</div></div></header>;
}
