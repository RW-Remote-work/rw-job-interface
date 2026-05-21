import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

interface JobCardSkeletonProps {
  /** 骨架屏数量，默认为 1 */
  count?: number;
}

export const JobCardSkeleton = ({ count = 1 }: JobCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Flex
          key={index}
          bg="white"
          borderRadius="xl"
          px={8}
          pt={6}
          pb={4}
          w="100%"
          shadow="sm"
          gap={6}
          alignItems="stretch"
        >
          {/* 左侧主要内容区 */}
          <Box flex="1">
            {/* 顶部标签栏 */}
            <Flex justify="space-between" alignItems="flex-start" minHeight="24px" mb={4} gap={2}>
              <Flex gap={3} flex={1} flexWrap="wrap" rowGap={2}>
                <Skeleton height="24px" width="60px" borderRadius="md" />
                <Skeleton height="24px" width="80px" borderRadius="md" />
                <Skeleton height="24px" width="70px" borderRadius="md" />
              </Flex>
              <Skeleton height="24px" width="50px" borderRadius="4px" />
            </Flex>

            {/* 主体内容 */}
            <Flex
              flexDir={{ base: "column", md: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "flex-start", lg: "center" }}
              mb={{ base: 1, md: 1, lg: 2 }}
              gap={{ base: 1, md: 1, lg: 4 }}
            >
              <Skeleton height="28px" width="60%" borderRadius="md" />
              <Flex gap={1}>
                <Skeleton height="28px" width="80px" borderRadius="md" />
                <Skeleton height="28px" width="100px" borderRadius="md" />
              </Flex>
            </Flex>

            {/* 岗位描述 */}
            <SkeletonText
              noOfLines={3}
              skeletonHeight="12px"
              spacing="4px"
              mb={2}
            />

            {/* 标签行 */}
            <Flex gap={4} mt={2} mb={2}>
              <Skeleton height="20px" width="100px" borderRadius="full" />
              <Skeleton height="20px" width="120px" borderRadius="full" />
              <Skeleton height="20px" width="80px" borderRadius="full" />
            </Flex>

            {/* 底部操作区 */}
            <Flex justify="space-between" alignItems="center" mt={4}>
              <Flex gap={2}>
                <Skeleton height="32px" width="80px" borderRadius="md" />
                <Skeleton height="32px" width="80px" borderRadius="md" />
              </Flex>
              <Skeleton height="24px" width="100px" borderRadius="md" />
            </Flex>
          </Box>

          {/* 右侧分数区 */}
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minW="80px"
            gap={2}
          >
            <Skeleton width="60px" height="60px" borderRadius="full" />
            <Skeleton height="16px" width="40px" borderRadius="md" />
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default JobCardSkeleton;
