import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { getProcesos } from "@/data/proceso";

const ProcesosList = () => {
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        const response = await getProcesos();
        setProcesos(response.data);
      } catch (error) {
        console.error("Error fetching procesos:", error);
      }
    };

    fetchProcesos();
  }, []);

  return (
    <>
      <Navbar />
      <Box mt={6}>
        <Table variant="striped" colorScheme="green">
          <Thead bg="green.300">
            <Tr>
              <Th color="white">Número de registro</Th>
              <Th color="white">Fecha Inicio</Th>
              <Th color="white">Tiempo de Ejecución</Th>
              <Th color="white">Equipo</Th>
              <Th color="white">Mascota 1</Th>
              <Th color="white">Mascota 2</Th>
              <Th color="white">Operario</Th>
            </Tr>
          </Thead>
          <Tbody>
            {procesos.map((proceso, index) => (
              <Tr key={proceso._id}>
                <Td>{index + 1}</Td>
                <Td>{new Date(proceso.fechaInicio).toLocaleString()}</Td>
                <Td>{proceso.tiempoEjecucion}</Td>
                <Td>{proceso.equipo.nombre}</Td>
                <Td>{proceso.mascota1.name}</Td>
                <Td>{proceso.mascota2 ? proceso.mascota2.name : " - "}</Td>
                <Td>{proceso.operario.nombre} {proceso.operario.apellido}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ProcesosList;
