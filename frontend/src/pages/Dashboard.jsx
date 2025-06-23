import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate;

    // Quando o usuário clicar em logout
    const handleLogout = () => {
        logout();
        navigate("/login")
    };

    return (
        <div style={{ maxWidth: "600px", margin: "100% auto" }}>
            <h2>Bem-vindo ao Dashboard</h2>
            {user ? (
                <div>
                    <p><strong>E-mail:</strong> {user.email} </p>
                    <p><strong>ID:</strong> {user.id} </p>
                    <button onClick={handleLogout}>Sair</button>
                </div>
            ) : (
                <p>Carregando informações do usuário...</p>
            )}
        </div>
    );
}