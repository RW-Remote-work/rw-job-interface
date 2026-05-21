import { buttonHover } from '@/theme/style';
import { Flex, Text, Image, Stack, Link, FlexProps } from '@chakra-ui/react';

import rightArrowBlack from '@/assets/images/rightArrowBlack.svg';

export interface CardProps extends FlexProps {
  title: string;
  desc: string;
  link: string;
  cover: string;
}

function Card({ title, desc, link, cover, ...containerProps }: CardProps) {
  return (
    <Flex
      padding="28px"
      width="580px"
      flexDirection="row"
      borderRadius="16px"
      border="1px solid"
      borderColor="#EDE8DF"
      background="#FBFAF9"
      {...containerProps}
    >
      <Flex flexDirection="column" marginRight="40px" justifyContent="space-between">
        <Text fontSize="20px" fontWeight="600" width="200px">
          {title}
        </Text>

        <Text
          marginTop="28px"
          marginBottom="44px"
          fontSize="14px"
          fontWeight="400"
          lineHeight="23px"
        >
          {desc}
        </Text>
        <Stack direction="row" spacing="10px">
          <Image width="12px" src={rightArrowBlack} alt="" />
          <Link
            width="180px"
            fontSize="10px"
            paddingBottom="2px"
            borderBottom="1px solid #000000"
            _hover={{
              textDecoration: 'none',
              ...buttonHover,
            }}
          >
            {link}
          </Link>
        </Stack>
      </Flex>
      <Image width="260px" src={cover} alt="" />
    </Flex>
  );
}

export default Card;
