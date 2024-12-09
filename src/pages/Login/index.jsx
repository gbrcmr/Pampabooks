import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.scss';

const Login = () => {
    // const navigate = useNavigate();

    // const handleLogin = () => {
    //     // Após o login, redireciona para a página inicial
    //     navigate('/');
    // };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Verifica se todos os campos foram preenchidos
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // Limpa os erros e processa o login
        setError('');
        console.log('Logando com:', { email, password });
        // Aqui você pode implementar a lógica de autenticação (ex.: API login)
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;