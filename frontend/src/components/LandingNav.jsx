import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function LandingNav() {
  const { isAuthenticated } = useAuth();
  return <nav className="border-b border-white/10 bg-dark/90 backdrop-blur">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-primarySecond grid place-items-center font-extrabold">S</div>
        <span className="text-xl font-bold">Swift-Chat</span>
      </Link>
      <div className="flex items-center gap-5 text-sm">
        <Link to={isAuthenticated ? "/chathome" : "/login"} className="hover:text-primarySecond">{isAuthenticated ? "Chat" : "Login"}</Link>
        {!isAuthenticated && <Link to="/register" className="rounded-xl bg-primarySecond px-4 py-2 font-semibold hover:opacity-90">Register</Link>}
      </div>
    </div>
  </nav>;
}
