import React, { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Droppable from "../components/Droppable";
import { arrayMove } from "../components/array";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {getMascotas} from "../data/pet"
import {getEquipos} from "../data/equipo"

export function TrelloBoard() {
  const [mascotas, setMascotas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [items, setItems] = useState({
    Mascotas: [
      { id: 1, name: "Perrito 1", description: "Happy dog", status: "en proceso", weight: 5 },
      { id: 2, name: "Gato1", description: "Cute cat", status: "en proceso", weight: 4 },
      { id: 3, name: "Perrito 2", description: "Playful dog", status: "en proceso", weight: 10.3 },
      { id: 4, name: "Gato2", description: "Lazy cat", status: "en proceso", weight: 7 },
      { id: 5, name: "Gato3", description: "Curious cat", status: "en proceso", weight: 5.2 },
      { id: 6, name: "Gato4", description: "Elegant cat", status: "en proceso", weight: 4.3 },
      { id: 7, name: "Dinosaurio", description: "Fierce dinosaur", status: "en proceso", weight: 30 },
      { id: 8, name: "Conejo", description: "Cute rabbit", status: "en proceso", weight: 1.3 },
    ],
    Horno_1: [{ id: 9, name: "Perrito3", description: "Adorable puppy", status: "en proceso", weight: 10 }],
    Horno_2: [],
    Horno_3: [],
    Horno_4: []
  });

  useEffect(()=> {
    getMascotas().then(res => {
      setMascotas(res.data);})

      getEquipos().then(res => {
      setEquipos(res.data);})


  },[]);

  console.log(mascotas,equipos)

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
        const activeItem = items[activeContainer][activeIndex];
  
        // If dragging from "Mascotas" to "Horno"
        if (activeContainer === "Mascotas" && overContainer.startsWith("Horno")) {
          return {
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (item, index) => index !== activeIndex
            ),
            [overContainer]: [...items[overContainer], activeItem],
          };
        }
  
        // If dragging from "Horno" to "Mascotas"
        if (activeContainer.startsWith("Horno") && overContainer === "Mascotas") {
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
  

  const containerStyle = { display: "flex" };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div style={containerStyle}>
        <div style={{ display: 'flex' }}>
          <Droppable id="Mascotas" items={items["Mascotas"]} setItems={setItems} />
          <Tabs isLazy>
            <TabList>
              <Tab>Horno 1</Tab>
              <Tab>Horno 2</Tab>
              <Tab>Horno 3</Tab>
              <Tab>Horno 4</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div style={containerStyle}>
                  <Droppable id="Horno_1" items={items["Horno_1"]} setItems={setItems} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={containerStyle}>
                  <Droppable id="Horno_2" items={items["Horno_2"]} setItems={setItems} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={containerStyle}>
                  <Droppable id="Horno_3" items={items["Horno_3"]} setItems={setItems} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={containerStyle}>
                  <Droppable id="Horno_4" items={items["Horno_4"]} setItems={setItems} />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </DndContext>
  );
  
}

export default TrelloBoard;
