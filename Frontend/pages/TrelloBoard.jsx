import React, { useState, useEffect } from "react";
import {DndContext,KeyboardSensor,PointerSensor,useSensor,useSensors} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Droppable from "../components/Droppable";
import { arrayMove } from "../components/array";
import Timer from "../components/Timer"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useToast} from "@chakra-ui/react";
import {getMascotasEnProceso, UpdateMascota} from "../data/pet"
import {getEquipos} from "../data/equipo"
import {createLog} from "@/apiCall/proceso"
import Navbar from "@/components/Navbar";
import {checkToken} from "@/data/login"
import jwt from 'jsonwebtoken';

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userData = decodedToken; 
    const check = await checkToken(token);
    
    if (check.status === 200) {
      return {
        props: {data:userData}
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
};

export function TrelloBoard({data}) {
  const [mascotas, setMascotas] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [items, setItems] = useState({
    Mascotas: [],
    Equipo_1: [],
    Equipo_2: [],
    Equipo_3: [],
    Equipo_4: [],
    Equipo_5: []
  });
  const toast = useToast();
  const capacidadMaxima = 2;
  const [tiempoEquipo_1, setTiempoEquipo_1] = useState("00:00:00");
  const [tiempoEquipo_2, setTiempoEquipo_2] = useState("00:00:00");
  const [tiempoEquipo_3, setTiempoEquipo_3] = useState("00:00:00");
  const [tiempoEquipo_4, setTiempoEquipo_4] = useState("00:00:00");
  const [tiempoEquipo_5, setTiempoEquipo_5] = useState("00:00:00");

  const equipoTiempo = {
    Equipo_1: tiempoEquipo_1,
    Equipo_2: tiempoEquipo_2,
    Equipo_3: tiempoEquipo_3,
    Equipo_4: tiempoEquipo_4,
    Equipo_5 : tiempoEquipo_5
  };






  useEffect(() => {
    getMascotasEnProceso().then((res) => {
      const mascotas = res.data;
      setItems((prevItems) => {
        const updatedItems = {
          ...prevItems,
          Mascotas: mascotas.map((mascota, index) => ({
            id: mascota._id, 
            name: mascota.name,
            pet_type: mascota.pet_type, // Assuming pet_type contains the description
            pet_status: mascota.pet_status, // Assuming pet_status contains the status
            weight: mascota.weight,
          })),
        };
        return updatedItems;
      });
    });
  
    getEquipos().then((res) => {
      setEquipos(res.data);
    });
  }, []);


  
  const handleStatusChange = (columnId) => {

    // Check if any pets are selected
    if (items[columnId].length === 0) {
      toast({
        title: "Error",
        description: 'No hay mascotas seleccionadas.',
        status: "warning",
        duration: 2000,
        isClosable: true
      })
      return;
    }
  
    // Create an array of pet IDs from the selected pets
    setItems((prevItems) => {
      const updatedItems = {
        ...prevItems,
        [columnId]: prevItems[columnId].map((item) => {
     
          
          // Update the pet_status property for the specific pet
          return {
            ...item,
            pet_status: "Para entrega",
          };
        }),
      };
  
      // Update the pets in the database
/*       updatedItems[columnId].forEach((pet) => {
        UpdateMascota(pet.id, { pet_status: "Para entrega" })
          .then((response) => {
            console.log("Mascota actualizada.",response)
          })
          .catch((error) => {
            console.log("Error, mascota no actualizada.",error)
          });
      }); */
  
      // Create logs with selected pets
      
      createLog(toast,columnId, items[columnId], equipoTiempo[columnId], data.sub); 
  
      return updatedItems;
    }); 
  };
  
  
  

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = ({ over, active }) => {
    const overId = over?.id;
  
    if (!overId) {
      return;
    }
  
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;
  
    if (!overContainer) {
      return;
    }
  
    if (activeContainer !== overContainer) {
      // Check if the overContainer is an "equipo_x" column
      if (overContainer.startsWith("Equipo")) {
        // Check if the overContainer already contains an item
        if (items[overContainer].length >= capacidadMaxima) {
          // Prevent the default behavior of the drag event.
          return;
        }
      }
  
      setItems((items) => {
        const activeIndex = active.data.current.sortable.index;
        const activeItem = items[activeContainer][activeIndex];
  
        const newItems = {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (item, index) => index !== activeIndex
          ),
          [overContainer]: [activeItem, ...items[overContainer]],
        };
  
        return newItems;
      });
    }
  };
  
  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }
  
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
  
    if (activeContainer === overContainer) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
  
      setItems((items) => {
        const newItems = {
          ...items,
          [activeContainer]: arrayMove(
            items[activeContainer],
            activeIndex,
            overIndex
          ),
        };
  
        return newItems;
      });
    } else {
      const activeIndex = active.data.current.sortable.index;
  
      setItems((items) => {
        let maxWeight = 0;
    



        // Check if the overContainer is an "equipo_x" column
        if (overContainer.startsWith("Equipo")) {

        // Check if the overContainer already contains 2 item(or the number passed throught the variable)
         if (items[overContainer].length >= capacidadMaxima) {
             toast({
                title: "Error",
                description: `Ya existen 2 mascotas en el ${overContainer} para entrar a proceso.`,
                status: "warning",
                duration: 2000,
                isClosable: true})
                return items;
                    }

        else{

      // Get the maximum weight for the overContainer
      if(overContainer==="Equipo_1"){
        maxWeight = process.env.PESO_EQUIPO_1
      }else if(overContainer==="Equipo_2"){
        maxWeight = process.env.PESO_EQUIPO_2
      }else if(overContainer==="Equipo_3"){
        maxWeight = process.env.PESO_EQUIPO_3
      }else if(overContainer==="Equipo_4"){
        maxWeight = process.env.PESO_EQUIPO_4
      }else if(overContainer==="Equipo_5"){
        maxWeight = process.env.PESO_EQUIPO_5
      }
      
      const activeItem = items[activeContainer][activeIndex];
      
      let itemWeight = items[overContainer].reduce((acc, item) => {
        if (item) {
          acc += item.weight;
        }
        return acc;
      }, 0);

      itemWeight = itemWeight + activeItem.weight

    
      // Check if the total weight of the items in the overContainer is greater than the maximum weight
      if (itemWeight >= maxWeight) {
        // Show a warning message
        alert(
          `The total weight of the items in this column cannot exceed ${maxWeight}kg.`);

        // Ask the user if they want to add the Mascota to the column anyway
        const confirm = window.confirm(
          `Con esta mascota superas el peso maximo del equipo¿Deseas agregarla de todas maneras?`
        );
        if (confirm) {
          // Add the Mascota to the column
          const selectedPet = items[activeContainer][activeIndex];
          setSelectedPets([selectedPet]); // Set the selected pet as an array
          return {
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (item, index) => index !== activeIndex
            ),
            [overContainer]: [...items[overContainer], activeItem],
          };
        } else {
          // Do not add the Mascota to the column
          return items;
        }
      } 
    }

          
        }
  
        const activeItem = items[activeContainer][activeIndex];
  
        // If dragging from "Mascotas" to "Equipo".
        if (activeContainer === "Mascotas" && overContainer.startsWith("Equipo")) {
          const selectedPet = items[activeContainer][activeIndex];
          setSelectedPets([selectedPet]); // Set the selected pet as an array
          return {
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (item, index) => index !== activeIndex
            ),
            [overContainer]: [...items[overContainer], activeItem],
          };
        }
  
        // If dragging from "Equipo" to "Mascotas"
        if (activeContainer.startsWith("Equipo") && overContainer === "Mascotas") {
          setSelectedPets(items[overContainer]);
          return {
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (item, index) => index !== activeIndex
            ),
            [overContainer]: [...items[overContainer], activeItem],
          };
        }
  
        return items;
      });
    }
  };
  
  

  const containerStyle = { display: "flex" , 
  paddingBottom: "40px" } ;




  return (
   
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
       <Navbar/>
      <div style={containerStyle}>
        
        <div style={{ display: 'flex' }}>
          <Droppable id="Mascotas" items={items["Mascotas"]} setItems={setItems} />
          <Tabs isLazy>
            <TabList>
              <Tab isDisabled={equipos?.find((eq) => eq.nombre === "Equipo_1")?.estado ===false}>Equipo 1</Tab>
              <Tab isDisabled={equipos?.find((eq) => eq.nombre === "Equipo_2")?.estado ===false}>Equipo 2</Tab>
              <Tab isDisabled={equipos?.find((eq) => eq.nombre === "Equipo_3")?.estado ===false}>Equipo 3</Tab>
              <Tab isDisabled={equipos?.find((eq) => eq.nombre === "Equipo_4")?.estado ===false}>Equipo 4</Tab>
              <Tab isDisabled={equipos?.find((eq) => eq.nombre === "Equipo_5")?.estado ===false}>Equipo 5</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box style={containerStyle} >
                  <Droppable id="Equipo_1" items={items["Equipo_1"]} setItems={setItems} equipos={equipos} setEquipos={setEquipos } handleStatusChange={() => handleStatusChange("Equipo_1")}  />
                </Box>
                <Timer handleStatusChange={() => handleStatusChange("Equipo_1")} setTiempo={setTiempoEquipo_1} setDndStatus={setDndStatus} id={"Equipo_1"}/>
               
              </TabPanel>
              <TabPanel>
                <Box style={containerStyle}>
                  <Droppable id="Equipo_2" items={items["Equipo_2"]} setItems={setItems} equipos={equipos} setEquipos={setEquipos} handleStatusChange={() => handleStatusChange("Equipo_2")} />
                </Box>
                <Timer handleStatusChange={() => handleStatusChange("Equipo_2")} setTiempo={setTiempoEquipo_2}/>
               
              </TabPanel>
              <TabPanel>
                <Box style={containerStyle}>
                  <Droppable id="Equipo_3" items={items["Equipo_3"]} setItems={setItems} equipos={equipos} setEquipos={setEquipos} handleStatusChange={() => handleStatusChange("Equipo_3")} />
                </Box>
                <Timer handleStatusChange={() => handleStatusChange("Equipo_3")} setTiempo={setTiempoEquipo_3} />
               
              </TabPanel>
              <TabPanel>
                <Box style={containerStyle}>
                  <Droppable id="Equipo_4" items={items["Equipo_4"]} setItems={setItems} equipos={equipos} setEquipos={setEquipos} handleStatusChange={() => handleStatusChange("Equipo_4")} />
                </Box>

                <Timer handleStatusChange={() => handleStatusChange("Equipo_4")} setTiempo={setTiempoEquipo_4} />
              </TabPanel>
              <TabPanel>
                <Box style={containerStyle}>
                  <Droppable id="Equipo_5" items={items["Equipo_5"]} setItems={setItems} equipos={equipos} setEquipos={setEquipos} handleStatusChange={() => handleStatusChange("Equipo_5")} />
                </Box>

                <Timer handleStatusChange={() => handleStatusChange("Equipo_5")} setTiempo={setTiempoEquipo_5} />
              </TabPanel>

            </TabPanels>
          </Tabs>
        </div>
      </div>
    </DndContext>
  );
  
}

export default TrelloBoard;