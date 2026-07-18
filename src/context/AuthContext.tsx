import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { db, type User } from "@/services/db";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOrganizer: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, role: "organizer" | "attendee") => Promise<boolean>;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(db.getUser("u3")); // Default to Marcus (attendee)

  const login = useCallback(async (email: string, _password: string) => {
    const found = db.getUserByEmail(email);
    if (found) { setUser(found); return true; }
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, role: "organizer" | "attendee") => {
    // Simulate signup - in real app would call Supabase
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => { setUser(null); }, []);
  const switchUser = useCallback((userId: string) => {
    const u = db.getUser(userId);
    if (u) setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: user !== null,
      isOrganizer: user?.role === "organizer",
      login,
      signup,
      logout,
      switchUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}