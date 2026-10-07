import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    if (!isAuthenticated) { setUserDetails(null); return; }
    try {
      const response = await axios.get("/api/user/profile");
      setUserDetails(response.data);
    } catch { setUserDetails(null); }
  };

  useEffect(() => { fetchUserDetails(); }, [isAuthenticated]);

  return <ProfileContext.Provider value={{ userDetails, setUserDetails, refreshProfile: fetchUserDetails }}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => useContext(ProfileContext);
