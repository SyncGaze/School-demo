import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const loadSchoolData = () => {
    const data = localStorage.getItem("schoolData");
    return data ? JSON.parse(data) : null;
  };

  const loadUserRole = () => {
    const role = localStorage.getItem("userRole");
    return role ? JSON.parse(role) : null;
  };

  const loadUserProfile = () => {
    const profile = localStorage.getItem("userProfile");
    return profile ? JSON.parse(profile) : null;
  };

  const loadThemeColor = () => {
    const color = localStorage.getItem("themeColor");
    return color || "#6366f1";
  };

  const [schoolData, setSchoolData] = useState(loadSchoolData());
  const [userRole, setUserRole] = useState(loadUserRole());
  const [userProfile, setUserProfile] = useState(loadUserProfile());
  const [themeColor, setThemeColor] = useState(loadThemeColor());

  useEffect(() => {
    if (userRole) localStorage.setItem("userRole", JSON.stringify(userRole));
    if (userProfile) localStorage.setItem("userProfile", JSON.stringify(userProfile));
    if (themeColor) localStorage.setItem("themeColor", themeColor);
  }, [userRole, userProfile, themeColor]);

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    setUserRole(null);
    setUserProfile(null);
  };

  const value = {
    schoolData,
    setSchoolData,
    userRole,
    setUserRole,
    userProfile,
    setUserProfile,
    themeColor,
    setThemeColor,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};