import React from 'react';
import { VStack, Image, Text, Box } from '@chakra-ui/react';

export interface EmptyStateNoJobsProps {
  title?: string;
  imageSrc?: string;
  width?: number;
}

export const EmptyStateNoJobs: React.FC<EmptyStateNoJobsProps> = ({
  title = '暂未搜索到相关岗位，请等待新的岗位发布',
  imageSrc = '/assets/figma/empty-no-jobs.svg',
  width = 266,
}) => {
  return (
    <Box width={`${width}px`} textAlign="center">
      <VStack spacing={4} align="center">
        {imageSrc ? (
          <Image src={imageSrc} alt="empty" boxSize="240px" opacity={0.6} />
        ) : (
          <Box boxSize="240px" opacity={0.6} />
        )}

        <Text fontSize="14px" fontWeight={500} color="#84858B">
          {title}
        </Text>
      </VStack>
    </Box>
  );
};

export default EmptyStateNoJobs;
