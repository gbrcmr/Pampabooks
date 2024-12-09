import { Link } from "react-router-dom";
import './style.scss';

const Header = () => {
    return (
        <header className="header">
            <h1 className="logo">Pampabooks</h1>
            <nav className="nav">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/pedidos">Pedidos</Link>
                <Link className="nav-link" to="/carrinho">Carrinho</Link>
            </nav>
        </header>
    )
};

export default Header;