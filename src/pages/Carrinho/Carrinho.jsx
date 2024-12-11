import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';  // Importa o ícone de lixeira
import axios from 'axios';
import Header from '../../components/Header';

const Carrinho = () => {
    const [cartItems, setCartItems] = useState([]); // Inicializa com um array vazio

    useEffect(() => {
        const getCartItems = async () => {
            const authEmail = localStorage.getItem('authEmail');
            console.log('Email do usuário:', authEmail);

            try {
                const response = await axios.get(
                    `http://localhost:3000/api/cart/view/${authEmail}`,
                );

                if (response.data && Array.isArray(response.data.items)) {
                    setCartItems(response.data.items);
                } else {
                    console.error('A resposta da API não contém a chave "items" ou não é um array', response.data);
                }
            } catch (err) {
                console.error('Erro ao obter itens do carrinho:', err);
            }
        };

        getCartItems();
    }, []);

    const handleProductDelete = async (productId) => {
        const authEmail = localStorage.getItem('authEmail');
        console.log('Deletando produto com ID:', productId);

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/cart/remove/${authEmail}/${productId}`,
            );

            if (response.data) {

                setCartItems(cartItems.filter(item => item._id !== productId));
                console.log('Produto deletado com sucesso');
            }
        } catch (err) {
            console.error('Erro ao deletar o item do carrinho:', err);
        }
    };

    const handleSubmitOrder = async () => {
        const authEmail = localStorage.getItem('authEmail');
        console.log('cart:', cartItems);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/order/create',
                {
                    email: authEmail,
                    items: cartItems.map(item => ({
                        bookId: item.book.id,
                        quantity: item.quantity,
                        price: item.book.price
                    })),
                }
            );

            if (response.data) {
                console.log('Pedido criado com sucesso', response.data);

                // Após o pedido ser criado, limpar o carrinho
                const clearCartResponse = await axios.delete(
                    `http://localhost:3000/api/cart/clear/${authEmail}`
                );

                // Se a resposta da limpeza do carrinho for bem-sucedida
                if (clearCartResponse.data) {
                    setCartItems([]); // Limpar o estado local do carrinho
                    console.log('Carrinho limpo com sucesso');
                }
            }
        } catch (err) {
            console.error('Erro ao criar o pedido:', err);
        }
    }

    return (
        <Container maxW="7xl" py={8}>
            <Header />
            <Heading mb={6}>Seu Carrinho</Heading>

            {/* Verificar se o carrinho está vazio */}
            {cartItems.length === 0 ? (
                <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')}>
                    Seu carrinho está vazio.
                </Text>
            ) : (
                <>
                    {/* Tabela com os itens do carrinho */}
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Livro</Th>
                                    <Th isNumeric>Quantidade</Th>
                                    <Th isNumeric>Preço Unitário</Th>
                                    <Th isNumeric>Subtotal</Th>
                                    <Th>Ações</Th> {/* Adiciona a coluna para ações */}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {cartItems.map((item) => (
                                    <Tr key={item._id}>
                                        <Td>{item.book.name}</Td>
                                        <Td isNumeric>{item.quantity}</Td>
                                        <Td isNumeric>R${item.book.price.toFixed(2)}</Td>
                                        <Td isNumeric>R${(item.book.price * item.quantity).toFixed(2)}</Td>
                                        <Td>
                                            {/* Ícone de lixeira */}
                                            <IconButton
                                                icon={<FaTrash />}
                                                colorScheme="red"
                                                aria-label="Deletar item"
                                                onClick={() => handleProductDelete(item._id)} // Chama a função de deletar
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* Total e botão de finalização */}
                    <Flex justify="space-between" mt={6} align="center">
                        <Text fontSize="2xl" fontWeight="bold">
                            Total: R${cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0).toFixed(2)}
                        </Text>
                        <Button
                            onClick={handleSubmitOrder}
                            colorScheme="teal"
                            size="lg"
                            textTransform="uppercase"
                        >
                            Finalizar Compra
                        </Button>
                    </Flex>
                </>
            )}
        </Container>
    );
};

export default Carrinho;