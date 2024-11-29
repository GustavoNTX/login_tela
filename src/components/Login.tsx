import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [message, setMessage] = useState<string>("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://savir07.tecnologia.ws/api/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (data.message === "Login bem-sucedido") {
            localStorage.setItem('userName', data.nome);
            navigate("/home", { state: { nome: data.nome } });
            await fetch("http://savir07.tecnologia.ws/api/registrarAcesso.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuarioId: data.usuarioId,
                    sucesso: true,
                }),
            });


        } else {
            await fetch("http://savir07.tecnologia.ws/api/registrarAcesso.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuarioId: null,
                    sucesso: false,
                }),
            });

            setMessage(data.message || "Erro ao tentar login");
        }
    };


    return (
        <div className="login-container">
            <img
                src='/logo.svg'
                alt="Imagem ilustrativa"
                className="login-image"
            />
            <div className="login-form">
                <div className="card p-4 shadow-sm">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="senha" className="form-label">Senha</label>
                            <div className="input-group">
                                <input
                                    type={senhaVisivel ? "text" : "password"}
                                    id="senha"
                                    className="form-control"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <span
                                    className="input-group-text"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                                >
                                    {senhaVisivel ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {message && <div className="alert alert-danger" role="alert">{message}</div>}

                        <button type="submit" className="btn btn-primary w-100">Entrar</button>
                    </form>

                    <p className="mt-3 text-center">
                        Não tem uma conta? <a href="/signup">Crie uma conta</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
