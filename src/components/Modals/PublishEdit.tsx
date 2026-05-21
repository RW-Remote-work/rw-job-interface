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
      岗位修改
    </Text>
    <Text fontSize="20px" textAlign="center" fontWeight={500} margin={'16px 0'}>修改成功！</Text>
    <Text fontSize="14px" color={'#6478F0'} textAlign="center" margin={'10px 0'} fontWeight={400}>如需再次修改，可以关闭该窗口，在自动刷新后，可再次修改</Text>
    <Text fontSize="14px" color={'#6478F0'} textAlign="center" margin={'10px 0'} fontWeight={400}>无需再次修改，关闭【修改】窗口后，【岗位列表】将自动刷新</Text>
    {/*<Text fontSize="14px" color={'#ADADAD'} textAlign="center" fontWeight={400}>如已修改好该岗位，请关闭该窗口后，点击编辑窗口右上角的关闭‘X’按钮，</Text>*/}
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
        onClick={() => router.replace(router.asPath)}
      >
        好的
      </Button>
    </Flex>
  </Flex>
}