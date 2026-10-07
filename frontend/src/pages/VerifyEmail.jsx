import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { id, token } = useParams();
  const [state, setState] = useState({ loading: true, message: "" });
  useEffect(() => { axios.get(`/api/user/${id}/verify/${token}`).then(r => setState({ loading:false, message:r.data.message })).catch(e => setState({ loading:false, message:e.response?.data?.message || "Verification failed" })); }, [id, token]);
  return <div className="min-h-screen bg-dark grid place-items-center p-4"><div className="max-w-md w-full rounded-3xl border border-white/10 bg-primary/50 p-8 text-center"><div className="text-5xl">{state.loading ? "⏳" : "✉️"}</div><h1 className="text-2xl font-bold mt-5">Email verification</h1><p className="text-gray-400 mt-3">{state.loading ? "Verifying your email…" : state.message}</p>{!state.loading && <Link to="/login" className="inline-block mt-6 rounded-xl bg-primarySecond px-5 py-3 font-semibold">Go to Login</Link>}</div></div>;
}
