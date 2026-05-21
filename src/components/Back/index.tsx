import { buttonHover } from "@/theme/style";
import { Button, Flex, FlexProps, Image } from "@chakra-ui/react";
import ChevronLeft from "@/assets/svgs/chevron-left.svg"
import { MouseEventHandler } from "react";
import { buttonActive } from '../../theme/style';

export interface BackProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Back({ onClick, ...containerProps }: BackProps & FlexProps) {
  return <Flex justifyContent="center" alignItems="center" {...containerProps}>
    <Button
      onClick={onClick}
      width="142px"
      height="48px"
      background="#F4F4F4"
      borderRadius="44px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="primary.900"
      _hover={buttonHover}
      _active={buttonActive}
    >
      <Image src={ChevronLeft} alt="返回" mr="16px"></Image>
      返回
    </Button>
  </Flex>;
}
