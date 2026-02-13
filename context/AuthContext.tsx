import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  user: string | null;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const storedUser = await SecureStore.getItemAsync("user");
    if (storedUser) setUser(storedUser);
    setLoading(false);
  };

  const login = async (username: string) => {
    await SecureStore.setItemAsync("user", username);
    setUser(username);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
