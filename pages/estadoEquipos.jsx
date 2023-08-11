import React, { useState, useEffect } from "react";
import { Switch, Box, Tr, Thead,Th,Tbody,Td, Table, useToast } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { getEquipos, UpdateEquipo } from "../data/equipo";
import {checkTokenAdmin} from "@/data/login"

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
      <Navbar />
      <Box mt={6}>
        <Table variant="striped" colorScheme="green">
          <Thead bg="green.300">
            <Tr>
              <Th color="white">  N°</Th>
              <Th color="white">Equipo</Th>
              <Th color="white">¿Estado?</Th>
              <Th color="white">Activar o desactivar equipo</Th>

            </Tr>
          </Thead>
          <Tbody>
            {equipos.map((equipo, index) => (
              <Tr key={equipo._id}>
                <Td>{index + 1}</Td>
                <Td>{equipo.nombre}</Td>
                <Td>{equipo.estado ? "Activo":"Inactivo"}</Td>
                
                <Td>
                <Switch
            size="lg"
            isChecked={equipo.estado}
            onChange={() => handleToggleEquipo(equipo)}
            colorScheme="green"
          />
              </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
    
  );
};

export default EquiposList;
