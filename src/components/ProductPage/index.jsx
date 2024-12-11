import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import ReviewForm from '../Review';
import ReviewList from '../ReviewList';
import {
    Box,
    Container,
    Stack,
    Text,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md'

const ProductPage = () => {
    const { id } = useParams();

    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
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
    }, [id]);

    const handleAddCart = async () => {
        const authEmail = localStorage.getItem('authEmail');
        console.log(authEmail)

        try {
            const response = await axios.post(
                'http://localhost:3000/api/cart/add',
                {
                    bookId: id,
                    quantity: 1,
                    email: authEmail,
                }
            );
            console.log('Produto adicionado com sucesso:', response.data);
        } catch (err) {

            console.error('Erro ao adicionar produto. Verifique suas credenciais.');
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    var bookPrice = book.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return (
        <Container maxW={'7xl'} >
            <Header />
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Stack border="1px" borderColor="black" spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {book.name}
                        </Heading>
                        <Text
                            color={useColorModeValue('gray.900', 'gray.400')}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            {bookPrice || 0}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                        }>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={useColorModeValue('yellow.500', 'yellow.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Autor
                            </Text>


                            <Text justifySelf={'center'}>
                                {book.author}
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={useColorModeValue('yellow.500', 'yellow.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Descrição
                            </Text>
                            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis vel sequi perferendis eius ea dolore quaerat amet repudiandae iusto illum quasi, ratione sed ut sapiente exercitationem est! Vitae, excepturi dolores?</Text>
                        </Box>
                    </Stack>

                    <Button
                        onClick={handleAddCart}
                        rounded={'none'}
                        alignSelf={'center'}
                        w={'90%'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg={useColorModeValue('gray.900', 'gray.50')}
                        color={useColorModeValue('white', 'gray.900')}
                        textTransform={'uppercase'}
                        _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                        }}>
                        Add to cart
                    </Button>

                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        <MdLocalShipping />
                        <Text>Entrega em até 5 dias úteis</Text>
                    </Stack>
                </Stack>
                <ReviewForm />
            </SimpleGrid>
            <ReviewList />
        </Container>
    )
}

export default ProductPage;