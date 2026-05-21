import React, { useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Stack,
  Text,
  Image,
  Button,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';

import wechat from '@/assets/images/wechat.svg';
import wechat2 from '@/assets/images/wechat2.svg';
import discord from '@/assets/images/discord.svg';
import redbook from '@/assets/images/redbook.svg';
import rwLogo from '@/assets/svgs/logo-black.svg';

import wechatQrCode from '@/assets/images/wechatQrCode.jpeg';
import gzhQrCode from '@/assets/images/gzhQrCode.jpeg';
import redbookQrCode from '@/assets/images/redbookQrCode.png';
import discordQrCode from '@/assets/images/discordQrCode.png';

import { textNormalStyle } from '@/theme/style';

export interface IProps {}

const QrItem = ({
  text,
  img,
  qrCode,
  url,
  disableClick = false,
}: {
  text: string;
  img: string;
  qrCode: string;
  url?: string;
  disableClick?: boolean;
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    if (url && !disableClick) {
      window.open(url, '_blank');
    }
  };

  return (
    <Stack
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      position="relative"
      justify="center"
      alignItems="center"
      spacing="8px"
      cursor={url && !disableClick ? "pointer" : "default"}
      onClick={handleClick}
      _hover={url && !disableClick ? { opacity: 0.8 } : {}}
      overflow="visible"
    >
      <Image src={img} alt="" width="26px" height="26px" />
      <Text fontSize="12px" fontWeight="400" color="#54555D" lineHeight="20px">
        {text}
      </Text>
      {isHover && (
        <Box
          position="absolute"
          top="-180px"
          left="50%"
          transform="translateX(-50%)"
          width="160px"
          height="160px"
          zIndex={10}
          borderRadius="8px"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
          overflow="visible"
        >
          <Image
            width="100%"
            height="100%"
            src={qrCode}
            alt=""
            borderRadius="8px"
            objectFit="contain"
          />
        </Box>
      )}
    </Stack>
  );
};

// 可点击的社交媒体链接组件
const SocialLink = ({
  text,
  img,
  url,
}: {
  text: string;
  img: string;
  url: string;
}) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <Stack
      justify="center"
      alignItems="center"
      spacing="8px"
      cursor="pointer"
      onClick={handleClick}
      _hover={{ opacity: 0.8 }}
    >
      <Image src={img} alt="" width="26px" height="26px" />
      <Text fontSize="12px" fontWeight="400" color="#54555D" lineHeight="20px">
        {text}
      </Text>
    </Stack>
  );
};

function Index({}: IProps) {
  return (
    <>
      <Box
        width="100%"
        bg="white"
        py="24px"
      >
        <Flex
          margin="0 auto"
          maxWidth="1200px"
          width="1200px"
          justifyContent="space-between"
          alignItems="center"
          px="10px"
        >
          {/* Logo Section */}
          <Flex alignItems="center" justifyContent="center" width="62px" height="34px">
            <Image src={rwLogo} alt="RW" width="60px" height="32.75px" />
          </Flex>

          {/* Social Media Links */}
          <Flex gap="48px" alignItems="center" overflow="visible">
            <QrItem 
              img={discord} 
              text={'Discord'} 
              qrCode={discordQrCode} 
              url="https://discord.gg/ufnyKT3dTC"
            />
            <QrItem 
              img={redbook} 
              text={'小红书'} 
              qrCode={redbookQrCode} 
              url="https://www.xiaohongshu.com/user/profile/5bf6a634f8c5e90001270786?xsec_token=YBC2YPZF5wnmunyPOsk_tH_4O0nTbqV_n31xE13jfxvGY=&xsec_source=app_share&xhsshare=CopyLink&appuid=5bf6a634f8c5e90001270786&apptime=1743226175&share_id=692a3092da0b49d1b7b5010ae3ca659c"
            />
            <SocialLink
              img="/svg/instagram.svg"
              text="Instagram"
              url="https://www.instagram.com/rwlab71?igsh=Y2MweWVrcXByZjcy&utm_source=qr"
            />
            <SocialLink
              img="/svg/threads.svg"
              text="Threads"
              url="https://www.threads.net/@rwlab71?igshid=NTc4MTIwNjQ2YQ=="
            />
            {/* 临时隐藏Facebook链接
            <SocialLink
              img="/svg/facebook.svg"
              text="Facebook"
              url="https://www.facebook.com/profile.php?id=61572976485778"
            />
            */}
            <QrItem 
              img={wechat2} 
              text={'公众号'} 
              qrCode={gzhQrCode} 
              url="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3NDgyMjg0MA==&scene=124#wechat_redirect"
              disableClick={true}
            />
            <SocialLink
              img="/svg/twitter.svg"
              text="X"
              url="https://x.com/rwlab71"
            />
            <SocialLink
              img="/svg/linkin.svg"
              text="LinkedIn"
              url="https://linkedin.com/company/rw%E5%AE%9E%E9%AA%8C%E5%AE%A4/"
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
export default Index;
