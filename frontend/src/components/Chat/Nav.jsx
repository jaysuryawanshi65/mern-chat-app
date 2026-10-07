import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useProfile } from "../../context/profileContext";
import Avatar from "./Avatar";

export default function Nav() {
  const { logout } = useAuth();
  const { userDetails } = useProfile();
  const navigate = useNavigate();
  const doLogout = () => { logout(); navigate("/"); };
  return <aside className="w-16 lg:w-20 border-r border-white/10 bg-dark flex flex-col items-center py-4 gap-5 shrink-0">
    <Link to="/" className="h-10 w-10 rounded-2xl bg-primarySecond grid place-items-center font-extrabold">S</Link>
    <Link to="/profile" title="Profile"><Avatar username={`${userDetails?.firstName || "U"}`} userId={userDetails?._id} avatarLink={userDetails?.avatarLink}/></Link>
    <div className="mt-auto flex flex-col gap-3"><button onClick={doLogout} title="Logout" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10">↪</button></div>
  </aside>;
}
