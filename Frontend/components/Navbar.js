import { Box, Flex, Button, Stack, Show, HStack, useDisclosure, IconButton, Heading, useToast as Toast, Text, Image} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import router from "next/router";
import axios from "axios";
import Cookies from 'js-cookie'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = Toast()
    return (
        <Stack id="navFix">
            <Box width={["100%"]}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"} bgGradient={'linear(to-r, white, green, white)'} paddingInline="10" borderBottomRadius="20">
                    <HStack w="10%">
                    <Show breakpoint="(min-width: 800px)">
                        <Image
                            src="bapets_logo_with_trademark_jorge.png"
                            alt="Bapets SPA"
                            w={400}
                            onClick={() => router.push('/')}
                            className="pointer"
                            color={"green.700"}
                        />
                        </Show>
                    </HStack>
                    <Flex alignItems={"center"} justifyContent={"space-between"} >

                        <HStack spacing={8} alignItems={"center"}  >
                            <HStack
                                as={"nav"}
                                spacing={10}
                                display={{ base: "none", md: "flex" }}
                                id="myDIV"
                            >
                               {/*  <Text className="btnRes pointer" color={"white"} onClick={() => router.push('/')}>
                                    INICIO
                                </Text> */}

                            </HStack>
                        </HStack>
                    </Flex>
                    <HStack as={"nav"} id="myDIV" display={{ base: "none", md: "flex" }}>
                        <Button className="btnRes" as={"nav"} onClick={() => {
                            axios.post(`${process.env.SERVIDOR}/logout`)
                            Cookies.remove("token")
                            router.replace('/')
                            toast({
                                title: 'Sesion cerrada!',
                                duration: 2000,
                                status: 'success',
                                isClosable: true
                            })
                        }} colorScheme={"red"} m="1" left="0" >Cerrar Sesion</Button>
                    </HStack>

                    <HStack w="90%" display={{ md: "none" }} >
                    <Image
                            src="bapets_logo_with_trademark_jorge.png"
                            alt="Bapets SPA"
                            w={100}
                            onClick={() => router.push('/')}
                            className="pointer"
                            color={"green.700"}
                        />
                    </HStack>

                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    {isOpen ? (

                        <Box paddingInline="3" paddingBlock="2" borderRadius={"15"} mt="300" display={{ md: "none" }} bgGradient={'linear(to-b, green, black, green)'}>
                            <Stack as={"nav"} spacing={4}>
                                <Button onClick={isOpen ? onClose : onOpen}
                                    _hover={{
                                        textShadow: "#FC0 1px 0 10px",
                                        transform: "scale(1.2)",
                                    }}>
                                    <a href="/inicio">
                                        {" "}
                                        <b>Inicio</b>
                                    </a>
                                </Button>
                                <Button onClick={isOpen ? onClose : onOpen}
                                    _hover={{
                                        textShadow: "#FC0 1px 0 10px",
                                        transform: "scale(1.2)",
                                    }}>
                                    <a href="/servicios">
                                        {" "}
                                        <b>Servicios</b>
                                    </a>
                                </Button>

                                <Button onClick={isOpen ? onClose : onOpen}
                                    _hover={{
                                        textShadow: "#FC0 1px 0 10px",
                                        transform: "scale(1.2)",
                                    }}>
                                    <a href="/clientes">
                                        {" "}
                                        <b>Clientes</b>
                                    </a>
                                </Button>
                                <Button onClick={isOpen ? onClose : onOpen}
                                    _hover={{
                                        textShadow: "#FC0 1px 0 10px",
                                        transform: "scale(1.2)",
                                    }}>
                                    <a href="/mascotas">
                                        {" "}
                                        <b>Mascotas</b>
                                    </a>
                                </Button>
                                <Button
                                    onClick={isOpen ? onClose : onOpen}
                                    _hover={{
                                        textShadow: "#FC0 1px 0 10px",
                                        transform: "scale(1.2)",
                                    }}
                                >
                                    <a href="/anfora">
                                        {" "}
                                        <b>Anforas</b>
                                    </a>
                                </Button>
                                <Button onClick={() => {
                                    axios.post(`${process.env.SERVIDOR}/logout`)
                                    Cookies.remove("token")
                                    router.replace('/')
                                    toast({
                                        title: 'Sesion cerrada!',
                                        duration: 2000,
                                        status: 'success',
                                        isClosable: true
                                    })
                                }} colorScheme={"red"} m="1" left="0">Cerrar Sesion</Button>
                            </Stack>
                        </Box>
                    ) : null}
                </Flex>
            </Box>
            <hr />
        </Stack>
    );
}
export default Navbar