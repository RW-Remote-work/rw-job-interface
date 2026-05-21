import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import { memo, PropsWithChildren, useState } from "react";

export interface LoginInputProps extends InputProps {
  errorMessages?: string;
  hideDetail?: boolean;
}
const LoginInput = ({
  className = "",
  errorMessages,
  hideDetail = false,
  mb,
  flex,
  ...otherProps
}: PropsWithChildren<LoginInputProps>) => {
  return (
    <Box
      position="relative"
      className={className}
      pb={hideDetail ? "0" : "24px"}
      mb={mb}
      w="full"
      flex={flex}
    >
      <Input
        borderBottomColor="#ADADAD"
        fontSize="20px"
        h="36px"
        variant="flushed"
        _focus={{
          borderBottomColor: "primary.900",
        }}
        color="#000000"
        {...otherProps}
        _placeholder={{
          color: "#ADADAD",
          ...(otherProps._placeholder || null)
        }}
      />
      <Text
        position="absolute"
        bottom="0"
        fontSize="14px"
        color="#F34008"
        whiteSpace="nowrap"
      >
        {errorMessages}
      </Text>
    </Box>
  );
};

export default memo(LoginInput);
