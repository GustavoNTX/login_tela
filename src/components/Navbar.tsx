import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const nomeUsuario = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('userName');
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-flex">
                <span className="navbar-brand">
                    Bem-vindo, {nomeUsuario}!
                </span>
                <div className="d-flex align-items-center ml-auto">
                    <button className="btn btn-outline-secondary" onClick={handleLogout}>
                        <FaSignOutAlt /> Sair
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
