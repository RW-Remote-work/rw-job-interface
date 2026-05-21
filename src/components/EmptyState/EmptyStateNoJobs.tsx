import React from 'react';
import { VStack, Image, Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export interface EmptyStateNoJobsProps {
  title?: string;
  titleLines?: string[];
  imageSrc?: string;
  width?: number;
}

export const EmptyStateNoJobs: React.FC<EmptyStateNoJobsProps> = ({
  title,
  titleLines,
  imageSrc = '/assets/figma/empty-no-jobs.svg',
  width = 266,
}) => {
  const { t } = useTranslation('common');
  const displayTitle = title || t('noResultsFound');

  return (
    <Box width={`${width}px`} textAlign="center">
      <VStack spacing={4} align="center">
        {imageSrc ? (
          <Image src={imageSrc} alt="empty" boxSize="240px" opacity={0.6} />
        ) : (
          <Box boxSize="240px" opacity={0.6} />
        )}

        {titleLines ? (
          <VStack spacing={1} align="center">
            {titleLines.map((line, index) => (
              <Text key={index} fontSize="14px" fontWeight={500} color="#84858B">
                {line}
              </Text>
            ))}
          </VStack>
        ) : (
          <Text fontSize="14px" fontWeight={500} color="#84858B">
            {displayTitle}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default EmptyStateNoJobs;
