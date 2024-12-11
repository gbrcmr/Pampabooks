import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Heading, Table, TableContainer, Thead, Tbody, Tr, Th, Td, Text, Spinner } from '@chakra-ui/react';
import Header from '../../components/Header';
const Pedidos = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const authEmail = localStorage.getItem('authEmail');
            if (!authEmail) {
                setError('Email não encontrado. Faça login para ver seus pedidos.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/order/view/${authEmail}`);
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar os pedidos. Tente novamente mais tarde.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Container maxW="7xl" py={8}>
                <Spinner size="xl" />
            </Container>
        );
    }

    console.log(orders)

    if (error) {
        return (
            <Container maxW="7xl" py={8}>
                <Text color="red.500">{error}</Text>
            </Container>
        );
    }

    return (
        <Container maxW="7xl" py={8}>
            <Header />
            <Heading mb={6}>Histórico de Pedidos</Heading>

            {orders.length === 0 ? (
                <Text fontSize="xl" color="gray.600">
                    Você não tem pedidos registrados.
                </Text>
            ) : (
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Data do Pedido</Th>
                                <Th>Itens</Th>
                                <Th isNumeric>Total</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map((order) => (
                                <Tr key={order._id}>
                                    <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                                    <Td>
                                        {order.items.map((item, index) => (
                                            <div key={index}>
                                                <strong>{item.bookId.name}</strong> - {item.quantity}x R${item.price.toFixed(2)}
                                            </div>
                                        ))}
                                    </Td>
                                    <Td isNumeric>R${order.total.toFixed(2)}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default Pedidos;