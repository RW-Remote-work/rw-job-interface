import React, { useState } from 'react';
import {
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
/** 发布岗位成功弹窗 */
export default function Publish() {


  const router = useRouter()
  const handleModalClose = () => {
    // 在这里编写关闭Modal后需要执行的操作
    router.push('/work').then(router.reload)
  };
  return <Flex flexDirection="column" paddingBottom="34px" width="500px">
    <Text
      width="100%"
      padding="15px 42px"
      fontSize="20px"
      fontWeight="400"
      lineHeight="32px"
      color="black"
      textAlign="left"
      borderBottom={'1px dashed #E5E5E5'}
    >
      发布岗位
    </Text>
    <Text fontSize="20px" textAlign="center" fontWeight={500} margin={'16px 0'}>发布成功！获得贝壳+5</Text>
    <Text fontSize="14px" color={'#6478F0'} textAlign="center" margin={'10px 0'} fontWeight={400}>审核通过后将获得5枚贝壳奖励</Text>
    <Text fontSize="14px" color={'#ADADAD'} textAlign="center" fontWeight={400}>注意：为了保证岗位的时效，岗位发布上线60天后将自动下线~</Text>
    <Flex justifyContent="space-evenly">
      <Button
        width="142px"
        height="48px"
        borderRadius="44px"
        fontWeight="medium"
        marginTop="40px"
        alignSelf="center"
        _hover={{ bg: '' }}
        borderColor="black"
        onClick={() => router.reload()}
      >
        继续发布
      </Button>
    </Flex>
  </Flex>
}