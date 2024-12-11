import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    FormErrorMessage,
    InputRightElement,
    IconButton,
    useDisclosure,
    InputGroup,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Cadaster = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');


    const onClickReveal = () => {
        onToggle();
    };

    const isEmailValid = (email) => {
        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async () => {

        // Reset errors
        setError('');
        setEmailError('');
        setPasswordError('');


        if (!email) {
            setEmailError('Email é obrigatório.');
            return;
        }

        if (!isEmailValid(email)) {
            setEmailError('Formato de email inválido.');
            return;
        }

        if (!password) {
            setPasswordError('Senha é obrigatória.');
            return;
        }

        try {

            const response = await axios.post('http://localhost:3000/api/usuarios/registrar', {
                email,
                password,
            });


            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {

            setError('Erro ao cadastrar. Tente novamente mais tarde.');
            console.error(err);
        }

    };

    return (
        <Container
            maxW="lg"
            py={{
                base: '12',
                md: '24',
            }}
            px={{
                base: '0',
                sm: '8',
            }}
        >
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack
                        spacing={{
                            base: '2',
                            md: '3',
                        }}
                        textAlign="center"
                    >
                        <Heading
                            size={{
                                base: 'xs',
                                md: 'sm',
                            }}
                        >
                            Crie sua conta aqui!
                        </Heading>
                        <Text color="fg.muted">
                            Já tem uma conta? <Link href="./Login">Clique aqui</Link>
                        </Text>
                    </Stack>
                </Stack>
                <Box
                    py={{
                        base: '0',
                        sm: '8',
                    }}
                    px={{
                        base: '4',
                        sm: '10',
                    }}
                    bg={{
                        base: 'transparent',
                        sm: 'bg.surface',
                    }}
                    boxShadow={{
                        base: 'none',
                        sm: 'md',
                    }}
                    borderRadius={{
                        base: 'none',
                        sm: 'xl',
                    }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl isInvalid={emailError}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('');
                                    }}
                                />
                                <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={passwordError}>
                                <FormLabel htmlFor="password">Senha</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton
                                            variant="text"
                                            backgroundColor={'white'}
                                            size={2}
                                            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                                            icon={isOpen ? <HiEyeOff /> : <HiEye />}
                                            onClick={onClickReveal}
                                        />
                                    </InputRightElement>
                                    <Input
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError('');
                                        }}
                                        type={isOpen ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                    />
                                </InputGroup>
                                <FormErrorMessage>{passwordError}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing="6">
                            <Button backgroundColor={'#00923F'} color={'white'} onClick={handleSignUp}>
                                Cadastrar
                            </Button>
                            {error && (
                                <Text color="red.500" textAlign="center">
                                    {error}
                                </Text>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default Cadaster