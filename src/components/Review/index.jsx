import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Stack,
    Textarea,
    useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const urlPath = window.location.pathname;
    const idBook = urlPath.substring(urlPath.lastIndexOf('/') + 1);

    const handleRating = (index) => {
        setRating(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ rating, review });

        }
        setRating(0);
        setReview('');
    };

    const handleReview = async () => {
        // Obtém o token do localStorage
        const token = localStorage.getItem('authToken');


        if (!token) {
            console.error('Token de autenticação não encontrado. Por favor, faça login.');
            return;
        }

        try {

            const response = await axios.post(
                'http://localhost:3000/api/review/reviews',
                {
                    book: idBook,
                    rating: rating,
                    review: review,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Avaliação enviada com sucesso:', response.data);
        } catch (err) {

            if (err.response) {

                console.error('Erro ao fazer avaliação:', err.response.data.message || err.response.data);
            } else if (err.request) {

                console.error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
            } else {

                console.error('Erro inesperado ao enviar a avaliação:', err.message);
            }
        }
    };

    return (
        <Box
            maxW="lg"
            p={6}
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            borderRadius="md"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="lg"
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    {/* Campo de Rating */}
                    <FormControl isRequired>
                        <FormLabel>Nota</FormLabel>
                        <Stack direction="row">
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <IconButton backgroundColor={"white"}
                                        key={i}
                                        icon={<StarIcon />}
                                        onClick={() => handleRating(i + 1)}
                                        aria-label={`Rate ${i + 1}`}
                                        color={i < rating ? 'yellow.400' : 'gray.300'}
                                        variant="ghost"
                                        _hover={{ color: 'yellow.500' }}
                                    />
                                ))}
                        </Stack>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Sua avaliação</FormLabel>
                        <Textarea w={"95%"}
                            placeholder="Escreva aqui sua avaliação do produto..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            resize="none"
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="green"
                        size="lg"
                        isFullWidth
                        onClick={handleReview}
                    >
                        Enviar Avaliação
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ReviewForm;