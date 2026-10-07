import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const change = e => setData({ ...data, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await axios.post("/api/user/register", data);
      toast.success(res.data.message);
      if (res.data.verificationUrl) {
        toast.success("Development verification link generated — opening it now.", { duration: 5000 });
        setTimeout(() => window.location.href = res.data.verificationUrl, 500);
      } else navigate("/login");
    } catch (err) { toast.error(err.response?.data?.message || "Registration failed"); }
    finally { setLoading(false); }
  };
  return <AuthShell title="Create an account" subtitle="Join Swift-Chat in less than a minute."><form onSubmit={submit} className="space-y-4">
    <div className="grid grid-cols-2 gap-3"><Field name="firstName" label="First Name" value={data.firstName} onChange={change}/><Field name="lastName" label="Last Name" value={data.lastName} onChange={change}/></div>
    <Field name="email" label="Email" type="email" value={data.email} onChange={change}/><Field name="password" label="Password" type="password" value={data.password} onChange={change}/>
    <button disabled={loading} className="w-full rounded-xl bg-primarySecond py-3 font-semibold disabled:opacity-50">{loading ? "Creating…" : "Create account"}</button>
    <p className="text-sm text-gray-400 text-center">Already have an account? <Link to="/login" className="text-primarySecond">Login here</Link></p>
  </form></AuthShell>;
}
function Field({ name, label, type="text", value, onChange }) { return <label className="block"><span className="text-sm text-gray-300">{label}</span><input required name={name} type={type} value={value} onChange={onChange} className="mt-1 w-full rounded-xl border border-white/10 bg-dark px-4 py-3 outline-none focus:border-primarySecond" /></label>; }
function AuthShell({ title, subtitle, children }) { return <div className="min-h-screen bg-dark grid place-items-center p-4"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-primary/50 p-7 shadow-2xl"><Link to="/" className="text-sm text-gray-400">← Back to Swift-Chat</Link><h1 className="text-3xl font-bold mt-6">{title}</h1><p className="text-gray-400 mt-2 mb-6">{subtitle}</p>{children}</div></div>; }
