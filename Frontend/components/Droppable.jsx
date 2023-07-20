import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { Grid, Badge, Heading, Container, Flex} from "@chakra-ui/react";

const Droppable = ({ id, items, setItems, equipos, setEquipos }) => {
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = {
    padding: "20px 10px",
    border: "2px solid black",
    borderRadius: "5px",
    minWidth: 110,
    width: "650px",
  };





  return (
    <>
      <Container maxW="container.xl">
        <Flex justifyContent="center" alignItems="center" mb={10}>
          <Heading fontSize="30px" letterSpacing="wide">
            <Badge px={5} py={2} rounded="lg">
              {id}
            </Badge>
          </Heading>

        </Flex>
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
          <Grid ref={setNodeRef} style={droppableStyle} alignItems="center" justifyContent="center">
            {items.map((item, index) => (
              <SortableItem key={item.id} item={item} index={index} />
            ))}
          </Grid>
        </SortableContext>
      </Container>
    </>
  );
};

export default Droppable;
