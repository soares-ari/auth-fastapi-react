import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Componente que protege rotas privadas
export default function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    // Enquanto os dados de autenticação são carregados
    if (loading) return <p>Carregando...</p>

    // Se o usuário não estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Se autenticado, renderiza o conteúdo protegido
    return children;
}