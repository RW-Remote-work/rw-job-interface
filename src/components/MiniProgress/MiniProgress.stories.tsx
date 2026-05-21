import React from 'react';
import MiniProgress from './MiniProgress';
import { Box, ChakraProvider } from '@chakra-ui/react';

const MiniProgressStories = {
  title: 'Components/MiniProgress',
  component: MiniProgress,
};

export default MiniProgressStories;

export const Default = () => (
  <ChakraProvider>
    <Box p={4} bg="gray.50">
      <MiniProgress value={25} />
    </Box>
  </ChakraProvider>
);

export const Half = () => (
  <ChakraProvider>
    <Box p={4} bg="gray.50">
      <MiniProgress value={50} />
    </Box>
  </ChakraProvider>
);

export const High = () => (
  <ChakraProvider>
    <Box p={4} bg="gray.50">
      <MiniProgress value={85} />
    </Box>
  </ChakraProvider>
);
