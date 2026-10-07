import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { baseUrl } from "./apiConfig";
import { AuthProvider, useAuth } from "./context/authContext";
import { ProfileProvider } from "./context/profileContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ChatHome from "./pages/ChatHome";
import Profile from "./components/Profile";

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

function Layout() { return <><Outlet /></>; }
function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  { path: "/", element: <Layout />, children: [
    { index: true, element: <Home /> },
    { path: "register", element: <Register /> },
    { path: "login", element: <Login /> },
    { path: "users/:id/verify/:token", element: <VerifyEmail /> },
    { path: "chathome", element: <Protected><ChatHome /></Protected> },
    { path: "profile", element: <Protected><Profile /></Protected> }
  ]}
]);

export default function App() {
  return <AuthProvider><ProfileProvider><RouterProvider router={router} /><Toaster position="top-right" toastOptions={{ style: { background: "#131313", color: "#fff" } }} /></ProfileProvider></AuthProvider>;
}
