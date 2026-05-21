import { ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
  baseStyle: {
    _focus: { boxShadow: "none" },
  },
  variants: {
    solid: {
      _disabled: {
        bg: "primary.100",
      },
      _hover: {
        bg: "primary.500",
        _disabled: {
          bg: "primary.100",
        },
      },
      _active: {
        bg: "primary.700",
      },
      bg: "primary.900",
      color: "white",
    },
    outline: {
      _disabled: {
        borderColor: "primary.100",
      },
      _hover: {
        borderColor: "primary.500",
        color: "primary.500",
        _disabled: {
          borderColor: "primary.100",
          color:"primary.900"
        },
      },
      borderColor: "primary.900",
      color: "primary.900",
    },
  },
});
