import React, { useState, useEffect } from "react";
import { Switch, Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { getEquipos, UpdateEquipo } from "../data/equipo";
import {checkTokenAdmin} from "@/data/login"
import axios from "axios";

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const check = await checkTokenAdmin(token);

    if (check.status === 200) {
      return {
        props: {},
      };
    }
  } catch (error) {
    const referer = context.req.headers.referer || '/';
    return {
      redirect: {
        destination: referer,
        permanent: false,
      },
    };
  }
};



const EquiposList = () => {
  const [equipos, setEquipos] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchEquipos();
  }, []);

  const fetchEquipos = async () => {
    try {
      const response = await getEquipos();
      setEquipos(response.data);

    } catch (error) {
      console.error("Error fetching equipos:", error);
    }
  };

  const handleToggleEquipo = async (equipo) => {
    try {
      // Update the estado (state) of the equipo locally
      setEquipos((prevEquipos) =>
        prevEquipos.map((eq) =>
          eq._id === equipo._id ? { ...eq, estado: !eq.estado } : eq
        )
      );

      // Update the estado (state) of the equipo in the database
      await UpdateEquipo(equipo._id, { estado: !equipo.estado });
      toast({
        title: "Actualizado",
        description:`Se ha actualizado el estado del ${equipo.nombre}`,
        status: "success",
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      console.error("Error updating equipo:", error);
      // Reset the estado (state) of the equipo back to its original value
      setEquipos((prevEquipos) =>
        prevEquipos.map((eq) =>
          eq._id === equipo._id ? { ...eq, estado: equipo.estado } : eq
        )
      );
      toast({
        title: "Error",
        description: 'Hubo un error al intentar actualizar el equipo.',
        status: "warning",
        duration: 2000,
        isClosable: true
      })
    }
  };

  return (
    <>
    <Navbar/>
    <Box p={4} borderRadius="md" borderWidth="1px" borderColor="gray.200">
      <Heading size="lg" mb={4}>
        Equipos
      </Heading>
      {equipos.map((equipo) => (
        <Flex key={equipo._id} alignItems="center" justifyContent="space-between" mb={2}>
          <Text fontWeight="bold">{equipo.nombre}</Text>
          <Switch
            size="lg"
            isChecked={equipo.estado}
            onChange={() => handleToggleEquipo(equipo)}
            colorScheme="green"
          />
        </Flex>
      ))}
    </Box>
    </>
  );
};

export default EquiposList;
