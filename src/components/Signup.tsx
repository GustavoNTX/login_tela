import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import './Signup.css';

const Signup = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (senha !== confirmSenha) {
            setMessage("As senhas não coincidem");
            return;
        }

        const response = await fetch("http://savir07.tecnologia.ws/api/cadastro.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        const data = await response.json();

        if (data.message === "Cadastro bem-sucedido") {
            navigate("/");
        } else {
            setMessage(data.message || "Erro ao tentar criar conta");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ width: "25rem", borderRadius: "15px" }}>
                <h2 className="text-center mb-4">Criar Conta</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                id="nome"
                                className="form-control"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="confirmSenha" className="form-label">Confirme sua Senha</label>
                        <div className="input-group">
                            <input
                                type={confirmSenhaVisivel ? "text" : "password"}
                                id="confirmSenha"
                                className="form-control"
                                placeholder="Confirme sua senha"
                                value={confirmSenha}
                                onChange={(e) => setConfirmSenha(e.target.value)}
                            />
                            <span
                                className="input-group-text"
                                style={{ cursor: "pointer" }}
                                onClick={() => setConfirmSenhaVisivel(!confirmSenhaVisivel)}
                            >
                                {confirmSenhaVisivel ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    {message && <div className="alert alert-danger" role="alert">{message}</div>}
                    <button type="submit" className="btn btn-primary w-100">Criar Conta</button>
                </form>
                <p className="mt-3 text-center">
                    Já tem uma conta? <a href="/">Entre aqui</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
