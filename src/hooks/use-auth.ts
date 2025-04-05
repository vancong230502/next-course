import { useEffect, useState } from "react";

interface User {
  email: string;
  role: "admin" | "student";
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";

  return { isAuthenticated, user, isAdmin, isStudent };
} 