import React from 'react';
import './style.scss';
import { FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação

const getRandomColor = () => { // Função para gerar cor aleatória
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Product = ({ id, name, description, author }) => {
    const randomColor = getRandomColor();
    const navigate = useNavigate(); // Hook de navegação

    const handleClick = () => {
        navigate(`/product/${id}`); // Redireciona para a rota com o ID do produto
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="icon">
                <FaBook size={40} color={randomColor} />
            </div>
            <div className="name">
                <h3>{name}</h3>
            </div>
            <div className="author">
                <h3>{author}</h3>
            </div>
        </div>
    );
};

export default Product;