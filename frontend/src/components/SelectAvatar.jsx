import { useEffect, useState } from "react";
import axios from "axios";

export default function SelectAvatar({ setSelectedLink, selectedLink }) {
  const [avatars, setAvatars] = useState([]);
  useEffect(() => { axios.get("/api/avatar/all").then(r => setAvatars(r.data.avatars)).catch(console.error); }, []);
  return <div><p className="text-sm text-gray-300 mb-3">Choose Avatar</p><div className="grid grid-cols-3 sm:grid-cols-6 gap-3">{avatars.map(a => <button type="button" key={a._id} onClick={() => setSelectedLink(a.link)} className={`rounded-full p-1 ${selectedLink === a.link ? "ring-2 ring-primarySecond" : ""}`}><img src={a.link} alt="Avatar" className="w-16 h-16 rounded-full object-cover"/></button>)}</div>{!avatars.length && <p className="text-sm text-gray-500 mt-2">Run <code>npm run seed:avatars</code> in the server directory.</p>}</div>;
}
