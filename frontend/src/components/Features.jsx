export default function Features() {
  const features = [
    ["⚡", "Real-time chat", "WebSockets deliver messages instantly without polling."],
    ["🔐", "JWT authentication", "Protected accounts with token-based authentication."],
    ["🟢", "Online presence", "See which verified users are currently connected."],
    ["💾", "Persistent history", "Messages are stored in MongoDB and loaded on chat open."]
  ];
  return <section className="border-y border-white/10 bg-black/10"><div className="max-w-7xl mx-auto px-4 py-20"><h2 className="text-3xl font-bold text-center">Everything you need for a chat app</h2><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{features.map(([icon,title,text]) => <div key={title} className="rounded-2xl border border-white/10 bg-primary/40 p-6"><div className="text-3xl">{icon}</div><h3 className="mt-4 font-bold text-lg">{title}</h3><p className="mt-2 text-sm text-gray-400">{text}</p></div>)}</div></div></section>;
}
