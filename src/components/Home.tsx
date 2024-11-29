import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("");  // Para controlar o tipo de mensagem (erro ou sucesso)
    const [senhaAntiga, setSenhaAntiga] = useState<string>("");  // Para armazenar a senha antiga
    const [novaSenha, setNovaSenha] = useState<string>("");  // Para armazenar a nova senha
    const [usuarioIdAlteracao, setUsuarioIdAlteracao] = useState<number | null>(null);  // Para armazenar o id do usuário a ser alterado

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await fetch("http://savir07.tecnologia.ws/api/listUsuarios.php");
            const data = await response.json();

            if (data) {
                setUsuarios(data);
            }
        };
        fetchUsuarios();
    }, []);

    const handleAlterarSenha = async () => {
        if (!senhaAntiga || !novaSenha || !usuarioIdAlteracao) {
            setMessage("Por favor, preencha todos os campos.");
            setMessageType("error");
            setTimeout(() => setMessage(""), 5000);
            return;
        }

        // Enviar a senha antiga e nova para o servidor
        const response = await fetch("http://savir07.tecnologia.ws/api/alterarUsuarios.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: usuarioIdAlteracao, senha_antiga: senhaAntiga, nova_senha: novaSenha }),
        });

        const data = await response.json();
        setMessage(data.message || "Erro ao alterar senha");
        setMessageType(data.success ? "success" : "error");

        // Remove a mensagem após 5 segundos
        setTimeout(() => setMessage(""), 5000);

        // Limpar os campos de senha
        setSenhaAntiga("");
        setNovaSenha("");
        setUsuarioIdAlteracao(null);
    };

    const handleExcluirUsuario = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
        if (confirmDelete) {
            const response = await fetch("http://savir07.tecnologia.ws/api/excluir-usuario.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();
            setMessage(data.message || "Erro ao excluir usuário");
            setMessageType(data.success ? "success" : "error");
            setUsuarios(usuarios.filter((usuario) => usuario.id !== id));

            // Remove a mensagem após 5 segundos
            setTimeout(() => setMessage(""), 5000);
        }
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="container mt-4">
                    <h3>Lista de Usuários</h3>

                    {/* Exibe a mensagem de sucesso ou erro */}
                    {message && (
                        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    )}

                    <ul className="list-group">
                        {usuarios.map((usuario) => (
                            <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <span><strong>{usuario.nome}</strong> ({usuario.email})</span>
                                </div>

                                {/* Botões */}
                                <div>
                                    <button
                                        className="btn btn-dark me-2"
                                        onClick={() => {
                                            setUsuarioIdAlteracao(usuario.id);
                                            setSenhaAntiga("");
                                            setNovaSenha("");
                                        }}
                                    >
                                        Alterar Senha
                                    </button>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => handleExcluirUsuario(usuario.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>

                                {/* Card de alteração de senha */}
                                {usuarioIdAlteracao === usuario.id && (
                                    <div className="mt-3 p-4 border rounded shadow">
                                        <h5>Alterar Senha para {usuario.nome}</h5>
                                        <div className="mb-3">
                                            <label htmlFor="senhaAntiga" className="form-label">Senha Antiga</label>
                                            <input
                                                type="password"
                                                id="senhaAntiga"
                                                className="form-control"
                                                placeholder="Digite sua senha antiga"
                                                value={senhaAntiga}
                                                onChange={(e) => setSenhaAntiga(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
                                            <input
                                                type="password"
                                                id="novaSenha"
                                                className="form-control"
                                                placeholder="Digite a nova senha"
                                                value={novaSenha}
                                                onChange={(e) => setNovaSenha(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="btn btn-dark w-100"
                                            onClick={handleAlterarSenha}
                                        >
                                            Confirmar Alteração
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default Home;
