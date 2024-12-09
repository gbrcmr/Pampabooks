import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Product from '../../components/Product';

const Home = () => {
    const [books, setBooks] = useState([]); // Estado para armazenar os livros
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // URL com a nova porta
                const response = await axios.get('http://localhost:3000/api/livros');
                console.log(response.data)
                setBooks(response.data); // Atualiza o estado com os livros recebidos
            } catch (error) {
                setError(error.message); // Define mensagem de erro
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        fetchBooks(); // Chama a função para buscar os livros
    }, []); // O useEffect vai rodar apenas uma vez, quando o componente for montado

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