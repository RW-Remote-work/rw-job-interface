import { Flex, Box, Text, Image } from '@chakra-ui/react'
import React from 'react'

import doraQrcode from '@/assets/images/doraQrcode.png'


function Index() {
    return <Box>
        <Text
            width="100%"
            padding="15px 20px"
            fontSize="20px"
            fontWeight="400"
            lineHeight="32px"
            color="black"
            fontFamily="Alibaba PuHuiTi 2.0"
            borderBottom="1px dashed #ADADAD"
        >
            充值贝壳
        </Text>
        <Flex padding="64px" flexDirection="column" width="100%" alignItems="center">
            <Image src={doraQrcode} width="300px" height="300px" alt="" />
            <Text marginTop="40px" marginBottom="6px" fontSize="14px" fontWeight="400" >请添加社区小助手微信进行充值，社区将回馈等值贝壳哦</Text>
            <Text fontSize="12px" fontWeight="400">1RMB=2枚贝壳</Text>
        </Flex>
    </Box>
}

export default Index