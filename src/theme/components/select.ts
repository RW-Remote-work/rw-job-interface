import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  //   baseStyle: {
  //     borderColor: 'white.10',
  //     borderRadius: '8px',
  //     _hover: {
  //       borderColor: 'grey.800',
  //     },
  //     _focus: {
  //       borderColor: 'black',
  //       boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
  //     },
  //   },
  variants: {
    outline: {
      field: {
        borderColor: 'grey.50',
        borderRadius: '8px',
        _hover: {
          borderColor: 'grey.800',
        },
        _focus: {
          borderColor: 'black',
          boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});
