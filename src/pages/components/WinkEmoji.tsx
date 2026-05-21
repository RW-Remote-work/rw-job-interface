'use client'
import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

// 动态导入Lottie组件避免SSR问题
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <Box w="100px" h="100px" />
});

import WinkEmojiLottie from "./wink-emoji.json";

export const WinkEmoji: FC = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 防止服务端渲染不匹配，在客户端挂载前返回占位符
  if (!isClient) {
    return <Box w="100px" h="100px" />;
  }

  return (
    <Box 
      w="100px" 
      h="100px" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      flexShrink={0}
    >
      <Lottie
        animationData={WinkEmojiLottie}
        loop={true}
        autoplay={true}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  )
}

export default WinkEmoji
