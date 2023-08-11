import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@chakra-ui/react";

const SortableItem = ({ item  }) => {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id   });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 350,
    height: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    marginBottom: "2px",
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    backgroundColor: "white", // Set the background color to white
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
  };

  const nameStyle = {
    fontWeight: "bold",
  };

  const typeStyle = {
    color: "#888",
  };

  return (
    <Box style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      <div>
        <span style={nameStyle}>Nombre:</span> {item.name}
      </div>
      <div>
        <span style={typeStyle}>Tipo:</span> {item.pet_type}
        <span style={typeStyle}> Peso:</span> {item.weight}Kg
      </div>
    </Box>
  );
};

export default SortableItem; 
