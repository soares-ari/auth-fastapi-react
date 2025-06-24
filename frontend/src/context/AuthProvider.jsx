import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// URL base da API (pode futuramente vir de um .env ou config global)
const API_BASE = "http://localhost:3333";

// Criação do contexto de autenticação
const AuthContext = createContext();

// Hook customizado para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Provedor que gerencia o estado de autenticação
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Usuário autenticado
  const [token, setToken] = useState(() => localStorage.getItem("token")); // Token armazenado
  const [loading, setLoading] = useState(true); // Flag de carregamento inicial

  // Busca os dados do usuário logado com base no token
  const fetchUser = useCallback(async (token) => {
    try {
      const response = await axios.get(`${API_BASE}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      logout(); // Token inválido → força logout
    }
  }, []);

  // Realiza o login com e-mail e senha
  async function login(email, password) {
    try {
      const response = await axios.post(
        `${API_BASE}/login`,
        new URLSearchParams({
          username: email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setToken(token);
      await fetchUser(token); // Busca o usuário após login
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  }

  // Remove dados da sessão
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  // Restaura sessão anterior (se houver token)
  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
    setLoading(false);
  }, [token, fetchUser]);

  // Valores disponíveis no contexto
  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  // Renderiza filhos apenas após a checagem de login
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
