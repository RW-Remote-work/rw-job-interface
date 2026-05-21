import React from 'react';
import {
  Box,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';

import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

import ArrowSwitchHorizontal from '@/assets/svgs/arrow-switch-horizontal.svg';
import { buttonHover } from '@/theme/style';
import { SimplePagination } from '../Pagination/SimplePagination';
import { PageType } from '@/data/work';

export interface JobAreaContainerProps {
  pager: PageType;
  total: number;
  onPageChange: (page: number) => void;
  onSortClick: () => void;
  children: React.ReactNode;
}

function Index({ pager, total, onSortClick, onPageChange, children }: JobAreaContainerProps) {
  const router = useRouter();
  return (
    <Flex borderRadius="4px" width="1200px" justify="space-between">
      <Box width="836px">
        <Flex justify="space-between" alignItems="center" marginBottom="16px">
          <Box color="rgba(0,0,0,0.6)">为您找到相关结果 {total} 个</Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box color="rgba(0,0,0,0.6)">发布时间</Box>
            <Image
              src={ArrowSwitchHorizontal}
              alt="排序"
              _hover={buttonHover}
              w="16px"
              h="16px"
              ml="16px"
              onClick={onSortClick}
            />
          </Box>
        </Flex>
        {children}
        {!!total && (
          <SimplePagination
            justifyContent="center"
            page={pager.page}
            total={total}
            mt="80px"
            mb="80px"
            onChange={(page) => onPageChange(page)}
          ></SimplePagination>
        )}
      </Box>
      {/*<Flex width="340px" flexDirection="column">*/}
      {/*  <Flex*/}
      {/*    padding="0 24px"*/}
      {/*    borderRadius="4px"*/}
      {/*    mt="14px"*/}
      {/*    height="88px"*/}
      {/*    backgroundColor="rgba(175, 235, 185, 1)"*/}
      {/*    alignItems="center"*/}
      {/*    justifyContent="space-between"*/}
      {/*  >*/}
      {/*    <Box fontWeight="900">💡 发布岗位获得贝壳</Box>*/}
      {/*    <Button*/}
      {/*      onClick={() => {*/}
      {/*        router.push('publish');*/}
      {/*      }}*/}
      {/*      borderRadius="28px"*/}
      {/*      fontWeight="medium"*/}
      {/*      _hover={{ bg: '' }}*/}
      {/*      borderColor="black"*/}
      {/*      variant="outline"*/}
      {/*    >*/}
      {/*      立刻发布 -{'>'}*/}
      {/*    </Button>*/}
      {/*  </Flex>*/}
      {/*</Flex>*/}
    </Flex>
  );
}

export default Index;
