import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { api } from "../services/api";

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

function getStoredToken(): string | null {
  try {
    return localStorage.getItem("taskflow-token");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      return;
    }
    api.setToken(token);
    api.get<AuthUser>("/api/auth/me")
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem("taskflow-token");
        api.setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<{ user: AuthUser; token: string }>("/api/auth/login", { email, password });
    localStorage.setItem("taskflow-token", res.token);
    api.setToken(res.token);
    setUser(res.user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await api.post<{ user: AuthUser; token: string }>("/api/auth/register", { name, email, password });
    localStorage.setItem("taskflow-token", res.token);
    api.setToken(res.token);
    setUser(res.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout", {});
    } catch {
      // ignore
    }
    localStorage.removeItem("taskflow-token");
    api.setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
