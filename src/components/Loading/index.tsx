import { CircularProgress, CircularProgressProps, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export interface ILoadingProps {
  color?: string;
}

export default function Loading({ color = "primary.500", ...otherProps }: CircularProgressProps) {
  return (
    <CircularProgress isIndeterminate color={color} size="64px" {...otherProps} />
  )
  // return <motion.div animate={{ rotate: 360 }} transition={{ duration: 1 }}>
  //   <Spinner size="xl" color={color} />
  // </motion.div>;
}
