import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Nav from "./Chat/Nav";
import SelectAvatar from "./SelectAvatar";
import { useProfile } from "../context/profileContext";

export default function Profile() {
  const { userDetails, setUserDetails } = useProfile();
  const [formData, setFormData] = useState({ firstName:"", lastName:"", email:"" });
  const [selectedLink, setSelectedLink] = useState("");
  useEffect(() => { if (userDetails) { setFormData(userDetails); setSelectedLink(userDetails.avatarLink || ""); } }, [userDetails]);
  const change = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); try { const res = await axios.put("/api/user/profile/update", { ...formData, avatarLink:selectedLink }); setUserDetails(res.data); toast.success("Profile updated"); } catch (err) { toast.error(err.response?.data?.message || "Update failed"); } };
  return <div className="flex min-h-screen bg-background"><Nav/><div className="flex-1 p-5 md:p-10 overflow-y-auto"><div className="max-w-2xl mx-auto"><h1 className="text-3xl font-bold">Update Profile</h1><p className="text-gray-500 mt-2">Change your name or avatar.</p><form onSubmit={submit} className="mt-8 space-y-5"><div className="grid sm:grid-cols-2 gap-4"><Field label="First Name" name="firstName" value={formData.firstName || ""} onChange={change}/><Field label="Last Name" name="lastName" value={formData.lastName || ""} onChange={change}/></div><Field label="Email" name="email" value={formData.email || ""} disabled onChange={()=>{}}/><SelectAvatar selectedLink={selectedLink} setSelectedLink={setSelectedLink}/><button className="rounded-xl bg-primarySecond px-6 py-3 font-semibold">Update Profile</button></form></div></div></div>;
}
function Field({ label, name, value, onChange, disabled }) { return <label className="block"><span className="text-sm text-gray-300">{label}</span><input disabled={disabled} name={name} value={value} onChange={onChange} className="mt-1 w-full rounded-xl border border-white/10 bg-dark px-4 py-3 disabled:opacity-50"/></label>; }
