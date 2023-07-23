import { useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import router from 'next/router'
import { Button,Input,HStack,Heading, Container,Image, useToast as Toast, Flex } from '@chakra-ui/react'
import {checkToken} from "@/data/login"








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
          description: 'Has iniciado sesion',
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

  const sendEmail = async () => {
    try {
      const response = await axios.post(`${process.env.SERVIDOR}/EnviarEmail`, {
        to: 'manuel.torres2001@alumnos.ubiobio.cl',
        subject: 'Your Subject Here',
        html: '<h1>Hello, this is the email content!</h1>',
      });

      console.log(response.data.message); // 'Email sent successfully'
      // You can add additional logic or update the UI after the email is sent successfully.
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error and show a message or perform any other necessary actions.
    }
  };

  const containerStyle = { margin: 5} ;

  

  return (
    <>
       <Container maxW="container.sm" mt="6%"  >
       <Heading textAlign={"center"}>Inicio de Sesion</Heading>
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
        <br />
        <HStack align="center" justify="center">
        <Button  colorScheme="whatsapp" type='submit'>Login</Button>
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
       <Button onClick={sendEmail} colorScheme="blue">mandar email</Button>
      </Container>

    </>
    
  );
};

export default Login;
