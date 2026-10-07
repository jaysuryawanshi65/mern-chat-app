import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Hero() {
  const { isAuthenticated } = useAuth();
  return <section className="overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm mb-5"><span className="h-2 w-2 rounded-full bg-secondary online-dot"/> Real-time messaging</div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Swift Chat: instant connections, effortless conversations.</h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl">Connect seamlessly, chat instantly, and see who's online. A full-stack MERN chat app powered by WebSockets.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={isAuthenticated ? "/chathome" : "/login"} className="rounded-xl bg-primarySecond px-6 py-3 font-semibold">{isAuthenticated ? "Open Chat" : "Login"}</Link>
          {!isAuthenticated && <Link to="/register" className="rounded-xl border border-white/20 px-6 py-3 font-semibold">Create account</Link>}
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-10 bg-primarySecond/10 blur-3xl rounded-full"/>
        <div className="relative rounded-3xl border border-white/10 bg-primary/70 p-5 shadow-2xl">
          <div className="flex gap-3 items-center border-b border-white/10 pb-4"><div className="h-10 w-10 rounded-full bg-secondary grid place-items-center text-dark font-bold">A</div><div><b>Alex</b><div className="text-xs text-secondary">● Online</div></div></div>
          <div className="space-y-4 py-5"><div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white/10 p-3 text-sm">Hey! Are you online?</div><div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-sm bg-primarySecond p-3 text-sm">Yep 😄 Messages arrive instantly.</div><div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white/10 p-3 text-sm">Nice. That's the WebSocket magic.</div></div>
          <div className="rounded-xl bg-dark px-4 py-3 text-sm text-gray-500">Type a message…</div>
        </div>
      </div>
    </div>
  </section>;
}
