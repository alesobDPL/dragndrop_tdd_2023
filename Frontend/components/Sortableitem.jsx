import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@chakra-ui/react";


const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 200,
    height: 40,
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

  /*console.log(item)*/

  return (
    <Box style={itemStyle} ref={setNodeRef} {...attributes} {...listeners} >
      {item.name} - {item.description} - {item.status}
    </Box>
  );
};

export default SortableItem;
