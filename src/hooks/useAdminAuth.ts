import { useState, useCallback } from "react";

const ADMIN_KEY = "dashboard-admin-auth";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(ADMIN_KEY) === "true";
  });

  const login = useCallback((password: string): boolean => {
    // Mock login — replace with real auth later
    if (password === "admin2026") {
      localStorage.setItem(ADMIN_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
};
