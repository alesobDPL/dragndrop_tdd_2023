import { useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import router from 'next/router'
import { Button,Input,HStack,Heading, Container,Image, useToast as Toast, Flex } from '@chakra-ui/react'
import {checkToken} from "@/data/login"
import {enviarEmail} from "@/data/email"



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const toast = Toast()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.SERVIDOR}/login`, { username, password });
      
      setMessage(response.data.message);
      if (response.status === 200) {
        cookies.set('token', response.data.token, { expires: 1, path: '/' });
        toast({
          title: "Bienvenido!",
          description: 'Has iniciado sesión',
          status: "success",
          duration: 2000,
          isClosable: true
        })
        // Redirect to a TrelloBoard or protected route
        router.push("/TrelloBoard")
      }
    } catch (error) {
      setMessage(error.response.data.message);
      toast({
        title: "Error de usuario!",
        description: 'Datos de usuario incorrectos',
        status: "warning",
        duration: 2000,
        isClosable: true
      })
    }
  };

  const containerStyle = { margin: 5} ;

  

  return (
    <>
       <Container maxW="container.sm" mt="6%"  >
       <Heading textAlign={"center"}>Inicio de Sesión</Heading>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required  style={containerStyle}/>
        </label>
        <br />
        <label>
          Contraseña:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={containerStyle} />
        </label>
        <br/>
        <HStack align="center" justify="center">
        <Button  colorScheme="whatsapp" type='submit' margin={"20px"} alignContent={"center"}>Iniciar sesión</Button >
        </HStack>
      </form>
      <Flex align="center" justify="center">
        <Image
                              src="bapets_logo_with_trademark_jorge.png"
                              alt="Bapets SPA"
                              w={"35%"}
                              onClick={() => router.push('/')}
                              className="pointer"
                              color={"green.700"}

                          />
       </Flex>
      </Container>

    </>
    
  );
};

export default Login;
