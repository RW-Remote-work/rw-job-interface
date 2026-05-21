import { ComponentStyleConfig } from '@chakra-ui/react';

export default <ComponentStyleConfig>{
  baseStyle: {
    control: {
      _checked: {
        bg: 'black',
        borderColor: 'black',
        _hover: {
          bg: 'grey.700',
          borderColor: 'grey.700',
        },
      },
    },
  },
};
