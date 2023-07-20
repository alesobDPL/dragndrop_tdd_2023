import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@chakra-ui/react";


const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 350,
    height: 60,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    border: "1px solid gray",
    borderRadius: 5,
    marginBottom: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    bgColor:"green"
  };

  

  return (
    <Box style={itemStyle} ref={setNodeRef} {...attributes} {...listeners} >
      <div> Nombre: {item.name} - Estado: {item.pet_status}</div>
      <div>Tipo: {item.pet_type} codigo: {item.id}</div>
    </Box>
  );
};

export default SortableItem;