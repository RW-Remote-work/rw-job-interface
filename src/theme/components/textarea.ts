import { ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
  variants: {
    outline: {
      _focusVisible: {
        borderColor: "primary.900",
        boxShadow: "0 0 0 1px #000",
      },
    },
  },
});
