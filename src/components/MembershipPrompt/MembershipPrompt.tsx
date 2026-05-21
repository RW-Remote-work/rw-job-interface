import React from 'react';
import { Box, Image, Text, Flex, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export interface MembershipPromptProps {
  image?: string;
  message?: string;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
}

export const MembershipPrompt: React.FC<MembershipPromptProps> = ({
  image = '/assets/figma/membership-prompt.svg',
  message = '订阅功能仅限会员专属，请开通会员后再试～',
  primaryLabel = '立即开通会员',
  onPrimaryClick,
}) => {
  return (
    <Box
      width="350px"
      borderRadius="md"
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="20px"
      p={5}
    >
      {image && (
        <Flex justify="center">
          <Image src={image} alt="illustration" boxSize="280px" objectFit="cover" opacity={0.9} />
        </Flex>
      )}

      <Text
        fontSize="14px"
        fontWeight={500}
        lineHeight="1.5714285714285714em"
        color="#84858B"
        textAlign="center"
        px={2}
      >
        {message}
      </Text>

      <Button
        onClick={onPrimaryClick}
        bg="#13172E"
        color="#FFFFFF"
        borderRadius="29px"
        height="32px"
        px="16px"
        rightIcon={<ChevronRightIcon boxSize="20px" color="#FFFFFF" />}
        _hover={{ bg: '#0f131f' }}
        fontSize="12px"
        fontWeight={500}
      >
        {primaryLabel}
      </Button>
    </Box>
  );
};

export default MembershipPrompt;
