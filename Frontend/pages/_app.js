import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { DndContext } from "@dnd-kit/core";




export default function App({ Component, pageProps }) {


  return (
    <ChakraProvider>
      <DndContext>
        <Component {...pageProps} />
      </DndContext>
    </ChakraProvider>

  );
}