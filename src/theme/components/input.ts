import { ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
  variants: {
    outline: {
      field: {
        _hover: {
          borderColor: "grey.600",
        },
        _focusVisible: {
          borderColor: "primary.900",
          boxShadow: "0 0 0 1px #000",
        },
      },
    },
    flushed: {
      field: {
        borderColor: {
          borderColor: "#ADADDA",
        },
        _hover: {
          borderColor: "grey.400",
        },
        _focusVisible: {
          borderColor: "primary.900",
          boxShadow: "none",
        },
      },
    },
  },
});
