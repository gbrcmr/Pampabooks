import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Product from '../../components/Product';

const Home = () => {
    const [books, setBooks] = useState([]); // Estado para armazenar os livros
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        // Verifica se o token de autenticação existe
        const authToken = localStorage.getItem('authToken'); // ou sessionStorage.getItem('authToken')

        if (!authToken) {
            navigate('/login'); // Redireciona para a página de login se não existir o token
            return; // Interrompe a execução do useEffect
        }

        const fetchBooks = async () => {
            try {
                // URL com a nova porta
                const response = await axios.get('http://localhost:3000/api/livros', {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Envia o token no cabeçalho
                    },
                });
                console.log(response.data);
                setBooks(response.data); // Atualiza o estado com os livros recebidos
            } catch (error) {
                setError(error.message); // Define mensagem de erro
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        fetchBooks(); // Chama a função para buscar os livros
    }, []); // O useEffect agora depende de `navigate`

    if (loading) {
        return <div>Carregando...</div>; // Exibe uma mensagem enquanto os livros estão sendo carregados
    }

    if (error) {
        return <div>{error}</div>; // Exibe a mensagem de erro, se houver
    }

    return (
        <div className="container">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="main">
                <h2>Bem-vindo à nossa loja!</h2>
                <p>Explore nossos produtos incríveis e aproveite ofertas exclusivas.</p>

                {/* Listagem de Livros */}
                <div className="products">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <Product key={book._id} id={book._id} name={book.name} author={book.author} description={book.description} />
                        ))
                    ) : (
                        <p>Nenhum livro disponível.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;