import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null, ok: false });
  const [loading, setLoading] = useState(true); // track initialization

  useEffect(() => {
    // Load auth from localStorage/session
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth?.token) {
      setAuth({ ...storedAuth, ok: true });
    }
    setLoading(false); // done initializing
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
