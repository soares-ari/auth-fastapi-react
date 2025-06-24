import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handler de envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success= await login(email, password);
        if (success) {
            navigate("/dashboard"); // redireciona se o login funcionar
        } else {
            setError("E-mail ou senha inválidos.");
        }
    };

    return (
        <div style={{maxWidth: "400px", margin: "100px auto"}}>
            <h2>Login</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}