import Avatar from "./Avatar";

export default function Contact({ user, selected, onClick, online }) {
  return <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition ${selected ? "bg-primarySecond/20" : "hover:bg-white/5"}`}>
    <Avatar username={`${user.firstName} ${user.lastName}`} userId={user._id} avatarLink={user.avatarLink} isOnline={online}/>
    <div className="min-w-0 flex-1"><div className="font-medium truncate">{user.firstName} {user.lastName}</div><div className="text-xs text-gray-500">{online ? "Online" : "Offline"}</div></div>
  </button>;
}
