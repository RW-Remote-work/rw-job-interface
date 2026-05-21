import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

export type MiniProgressProps = {
  value?: number; // 0 - 100
  width?: string | number;
  height?: number;
  showPercent?: boolean;
};

const MiniProgress: React.FC<MiniProgressProps> = ({
  value = 25,
  width = 106,
  height = 12,
  showPercent = true,
}) => {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const fillWidth = `${pct}%`;

  return (
    <Flex direction="column" align="center" gap={2} width={width}>
      <Box
        width="100%"
        height={`${height}px`}
        borderRadius={`${height * 4}px`}
        bg="#F1F2F3"
        overflow="hidden"
      >
        <Box
          height="100%"
          width={fillWidth}
          borderRadius={`${height * 4}px`}
          bgGradient="linear(to-r, rgba(193,201,249,1), rgba(131,147,243,1))"
        />
      </Box>
      {showPercent && (
        <Text
          fontFamily="Source Han Sans CN, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto"
          fontWeight={500}
          fontSize="14px"
          color="#13172E"
          textAlign="right"
          width="100%"
        >
          {pct}%
        </Text>
      )}
    </Flex>
  );
};

export default MiniProgress;
