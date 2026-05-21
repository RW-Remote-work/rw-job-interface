import { Box } from "@chakra-ui/react";
import React from "react";

export default function Index({
  color = "rgba(151, 151, 151, 0.3)",
}: {
  color?: string;
}) {
  return <Box height="0.5px" width="100%" backgroundColor={color}></Box>;
}
