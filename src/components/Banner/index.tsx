import { Flex, Text, Image, ImageProps, FlexProps } from '@chakra-ui/react';
import React from 'react';

const Banner = ({
  title,
  englishTitle,
  desc,
  img,
  imgProps,
  containerProps,
}: {
  title: string;
  englishTitle: string;
  desc: string;
  img: string;
  imgProps?: ImageProps;
  containerProps?: FlexProps;
}) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      maxWidth={"1200px"}
      marginTop="89px"
      backgroundSize="cover"
      {...containerProps}
    >
      <Flex flexDirection="column" alignItems="flex-start" maxWidth={'625px'}>
        <Text
          marginBottom="8px"
          color="black"
          fontWeight="900"
          fontSize="72px"
          lineHeight="101px"
        >
          {title}
        </Text>
        <Text
          color="black"
          fontWeight="900"
          fontSize="60px"
          marginBottom="20px"
        >
          {englishTitle}
        </Text>
        <Text
          color="black"
          fontWeight="400"
          fontSize="16px"
          fontStyle="normal"
          lineHeight="180%"
        >
          {desc}{' '}
        </Text>
      </Flex>
      <Image src={img} height="327px" alt="" {...imgProps} />
    </Flex>
  );
};

export default Banner;
