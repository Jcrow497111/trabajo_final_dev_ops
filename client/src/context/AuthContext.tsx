import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AuthUser {
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => false,
  logout: () => {},
});

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("task-manager-auth");
    if (raw === "true") return { email: "usuario@taskmanager.app" };
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);

  const login = useCallback((email: string, _password: string) => {
    if (!email.trim()) return false;
    localStorage.setItem("task-manager-auth", "true");
    setUser({ email });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("task-manager-auth");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
