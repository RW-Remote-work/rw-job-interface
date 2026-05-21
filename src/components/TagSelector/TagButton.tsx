import { Box, BoxProps, Image } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import closeCircleSvg from "@/assets/icons/close-circle.svg";

export interface TagButtonProps extends Omit<BoxProps, "onClick"> {
  tag: string;
  selected?: boolean;
  onClick?: (text: string) => void;
  append?: React.ReactNode;
}

export const TagButton = ({
  tag,
  selected,
  append,
  onClick,
  ...otherProps
}: PropsWithChildren<TagButtonProps>) => {
  const color = selected ? "#000" : "#616161";
  const bg = selected ? "#EAF8F1" : "#F2F2F2";
  return (
    <Box
      cursor="pointer"
      display="inline-block"
      rounded="8px"
      position="relative"
      px="18px"
      py="6px"
      fontSize="14px"
      lineHeight="20px"
      fontWeight="400"
      color={color}
      bg={bg}
      onClick={() => onClick?.(tag)}
      textAlign="center"
      transition="all 0.2s"
      {...otherProps}
    >
      {tag}
      {append}
    </Box>
  );
};
