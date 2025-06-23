import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Criação do contexto
const AuthContext = createContext();

// Hook de acesso ao contexto
export function useAuth() {
    return useContext(AuthContext);
}

// Componente provedor de autenticação
export function AuthProvider({children}) {
    const [user, setUser] = useState(null); // Dados do usuário logado
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(true); // Flag para renderizar apenas após a verificação

    // Função para buscar os dados do usuário autenticado
    const fetchUser = useCallback(async (token) => {
        try {
            const res = await axios.get("http://localhost:8000/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            logout(); // Se o token for inválido ou expirado, faz logout
        }
    }, []);

    // Função de login
    async function login(email, password) {
        try {
            const response = await axios.post("http://localhost:8000/login", {
                username: email,
                password,
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const token = response.data.access_token;
            localStorage.setItem("token", token);
            setToken(token);
            await fetchUser(token); // Busca o usuário imediatamente após login
            return true;
        } catch (error) {
            console.error("Erro no login:", error);
            return false;
        }
    }

    // Função de logout
    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    // Efeito para tentar restaurar o login ao abrir o app
    useEffect(() => {
        if (token) {
            fetchUser(token);
        }
        setLoading(false);
    }, [token, fetchUser]);

    const value = {
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}