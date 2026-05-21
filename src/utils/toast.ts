import { useToast } from "@chakra-ui/react";

let toast: ReturnType<typeof useToast>;

export const setToast = (t: ReturnType<typeof useToast>) => {
  toast = t;
};

export { toast };
