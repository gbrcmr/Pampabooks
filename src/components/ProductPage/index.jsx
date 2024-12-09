import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const ProductPage = () => {
    const { id } = useParams(); // Obtém o ID da rota

    const [book, setBook] = useState([]); // Estado para armazenar os livros
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro

    useEffect(() => {
        const fetchBook = async () => {
            try {
                // URL com a nova porta
                const response = await axios.get(`http://localhost:3000/api/livros/${id}`);
                console.log(response.data)
                setBook(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    });

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Header />
            <div>
                <h1>{book.name}</h1>
                <p>Descrição: {book.description}</p>
                {/* Aqui você pode buscar mais informações sobre o produto com base no ID */}
            </div>
        </>
    );
};

export default ProductPage;