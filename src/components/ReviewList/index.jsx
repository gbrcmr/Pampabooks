import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Avatar,
    Heading,
    Text,
    VStack,
    HStack,
    Stack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const reviews = [
    {
        id: 1,
        author: 'João Silva',
        rating: 4,
        comment: 'Ótimo produto, atendeu minhas expectativas!',
    },
    {
        id: 2,
        author: 'Maria Souza',
        rating: 5,
        comment: 'Excelente qualidade e entrega rápida.',
    },
    {
        id: 3,
        author: 'Carlos Lima',
        rating: 3,
        comment: 'Produto bom, mas poderia ter mais funcionalidades.',
    },
];

const ReviewsList = () => {
    const renderStars = (rating) => {
        return (
            <HStack spacing={1}>
                {[...Array(5)].map((_, index) => (
                    <StarIcon
                        key={index}
                        color={index < rating ? 'yellow.500' : 'gray.300'}
                        w={5}
                        h={5}
                    />
                ))}
            </HStack>
        );
    };

    return (
        <VStack spacing={4} align="stretch">
            {reviews.map((review) => (
                <Card key={review.id} border="1px" borderColor="gray.200" p={4}>
                    <CardHeader>
                        <HStack spacing={4}>
                            <Avatar name={review.author} />
                            <Box>
                                <Heading size="sm">{review.author}</Heading>
                                {renderStars(review.rating)}
                            </Box>
                        </HStack>
                    </CardHeader>
                    <CardBody>
                        <Text>{review.comment}</Text>
                    </CardBody>
                </Card>
            ))}
        </VStack>
    );
};

export default ReviewsList;