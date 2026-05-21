import { Box, BoxProps, Image } from "@chakra-ui/react";
import LogoSymbol from "@/assets/svgs/logo-symbol.svg";
import CoLiveCreate from "@/assets/svgs/co-live-create.svg";
import ThreeHCircle from "@/assets/svgs/three-h-circle.svg";
import ThreeVCircle from "@/assets/svgs/three-v-circle.svg";
import { PropsWithChildren } from "react";

export interface IdealTypeImageProps extends BoxProps {
  type: "type1" | "type2";
}
const IdealTypeImage = ({ type, ...otherProps }: PropsWithChildren<IdealTypeImageProps>) => {
  return (
    <Box position="relative" h="100%" bg="#716DF7" {...otherProps}>
      <Image
        src={LogoSymbol}
        w="126px"
        h="69px"
        alt=""
        position="absolute"
        left="86px"
        top="62px"
      />
      {type === "type1" ? (
        <Image
          src={ThreeHCircle}
          alt=""
          w="350px"
          h="362px"
          position="absolute"
          left="171px"
          top="162px"
        />
      ) : null}
      {type === "type2" ? (
        <Image
          src={ThreeVCircle}
          alt=""
          w="445px"
          h="368px"
          position="absolute"
          left="135px"
          top="162px"
        />
      ) : null}
      <Image
        src={CoLiveCreate}
        w="145px"
        h="52px"
        alt=""
        position="absolute"
        left="86px"
        bottom="78px"
      />
    </Box>
  );
};

export default IdealTypeImage;
