import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { isAuthenticated, setAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (isAuthenticated) navigate("/chathome", { replace: true }); }, [isAuthenticated]);
  const change = e => setData({ ...data, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    try { await axios.post("/api/user/login", data); setAuthenticated(true); toast.success("Login successful"); navigate("/chathome"); }
    catch (err) { toast.error(err.response?.data?.message || "Login failed"); }
  };
  return <div className="min-h-screen bg-dark grid place-items-center p-4"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-primary/50 p-7 shadow-2xl"><Link to="/" className="text-sm text-gray-400">← Back to Swift-Chat</Link><h1 className="text-3xl font-bold mt-6">Welcome back</h1><p className="text-gray-400 mt-2 mb-6">Sign in to continue chatting.</p><form onSubmit={submit} className="space-y-4"><label className="block"><span className="text-sm text-gray-300">Email</span><input required type="email" name="email" value={data.email} onChange={change} className="mt-1 w-full rounded-xl border border-white/10 bg-dark px-4 py-3"/></label><label className="block"><span className="text-sm text-gray-300">Password</span><input required type="password" name="password" value={data.password} onChange={change} className="mt-1 w-full rounded-xl border border-white/10 bg-dark px-4 py-3"/></label><button className="w-full rounded-xl bg-primarySecond py-3 font-semibold">Login</button><p className="text-sm text-gray-400 text-center">New here? <Link to="/register" className="text-primarySecond">Create an account</Link></p></form></div></div>;
}
