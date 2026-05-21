import { Box, Button, Flex } from '@chakra-ui/react';
import { Pagination, Autoplay, } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';


const banners = [
  {
    title: '用远程人才，加速你的全球业务增长',
    subtitle: '轻松触达遍布世界的技术、设计、运营、市场人才\n助你以更低成本组建高效团队',
    cta: '联系RW企业招聘负责人 →',
    supportText: '获得RW LAB海外人才库支持，加入世界领先的远程雇主行列',
    onClick: () => {
      window.open('https://amlv54trrp.feishu.cn/share/base/form/shrcnypwO7TUckwwli91T3QeRVe')
    }
  },
  {
    title: 'Expand into the Chinese Market',
    subtitle: 'Don\'t speak Chinese? Unsure about the market? Need help with Chinese platforms? \nFind trusted partners here to build your brand awareness in China fast!',
    cta: 'Contact RW →',
    supportText: 'connect with the best candidates quickly!',
    onClick: () => {
      window.open('https://amlv54trrp.feishu.cn/share/base/form/shrcnPR3irTbpD7s4u8kZJ9yWgf')
    }
  },
];

const SwiperComponent = () => {
  return (
    <Box
      width="100%"
      height="440px"
      position="relative"
      overflow="hidden"
      className="swiper-container publish-banner-swiper"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        style={{ height: '100%', width: '100%' }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} style={{ width: '100%', height: '100%' }}>
            <Flex
              justifyContent="center"
              width="100%"
              height="100%"
              background="linear-gradient(180deg, #F8F6F2 60%, #ACEBCB 100%)"
              textAlign="left"
            >
              <Flex
                flexDirection="column"
                alignItems="start"
                width="800px"
                height="500px"
                pt="80px"
                pb="100px"
              >
                <Box
                  as="h1"
                  fontSize="40px"
                  fontWeight="bold"
                  mb="22px"
                  background="linear-gradient(180deg, #F8F6F2 60%, #ACEBCB 100%)"
                >
                  {banner.title}
                </Box>
                <Box
                  width="800px"
                  fontSize="16px"
                  mb="24px"
                  color="#13172E"
                  lineHeight="1.6"

                >
                  <pre>
                    {banner.subtitle}
                  </pre>
                </Box>
                <Button
                  width="auto"
                  height="48px"
                  px="32px"
                  borderRadius="24px"
                  backgroundColor="black"
                  color="white"
                  _hover={{ backgroundColor: 'black' }}
                  mb="16px"
                  cursor="pointer"
                  onClick={banner.onClick}
                >
                  {banner.cta}
                </Button>
                <Box width="800px" fontSize="14px" color="#13172E" >
                  {banner.supportText}
                </Box>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

const PublishBannerCarousel = () => {

  return <SwiperComponent />;
};

export default PublishBannerCarousel;

