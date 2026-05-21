import { getLink } from "@/utils/navigation";
import { Box, Text, Avatar, Button, HStack, useColorModeValue, Flex, Image } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { FC } from "react"
import { useRouter } from "next/router"
import { ResumeResponse, GetUserProfileResponse } from "@/api"
import Link from "next/link"
import { useMembership } from "@/hooks/useMembership"
import { useTranslation } from "react-i18next"

type TalentCardProps = {
  avatarUrl?: string
  name?: string
  email?: string
  resume?: ResumeResponse | null
  userInfo?: GetUserProfileResponse
  onJoinClick?: () => void
}

export const TalentCard: FC<TalentCardProps> = ({
  avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg",
  name = "呀叽的妙妙屋",
  email = "chenger_0911@163.com",
  resume,
  userInfo,
}) => {
  const router = useRouter()
  const { t } = useTranslation()

  // 获取会员状态
  const membership = useMembership(userInfo, t);
  
  // 判断用户是否是有效会员
  const isMember = membership.isValidMember;

  // 卡片背景色
  const cardBg = useColorModeValue("white", "gray.800")


  const renderButtons = () => {
    // 如果用户已经加入了人才库，只显示个人简历按钮
    if (resume) {
      return (
        <Flex gap="2" mt="6">
          <Button
            variant="outline"
            borderRadius="29px"
            px="4"
            py="1"
            h="32px"
            fontSize="12px"
            fontWeight="400"
            color="#13172E"
            borderColor="#13172E"
            _hover={{
              bg: "transparent",
            }}
            tabIndex={0}
            aria-label={t('personalResume')}
            suppressHydrationWarning
            onClick={() => window.location.href = getLink("MAIN", "/user") + "/resume"}
          >
            {t('personalResume')}
          </Button>
        </Flex>
      );
    }

    // 如果用户没有加入人才库，显示两个按钮
    return (
      <Flex gap="2" mt="6">
        <Button
          variant="outline"
          borderRadius="29px"
          px="4"
          py="1"
          h="32px"
          fontSize="12px"
          fontWeight="400"
          color="#13172E"
          borderColor="#13172E"
          _hover={{
            bg: "transparent",
          }}
          tabIndex={0}
          aria-label={t('personalResume')}
          suppressHydrationWarning
          onClick={() => window.location.href = getLink("MAIN", "/user") + "/resume"}
        >
          {t('personalResume')}
        </Button>
        <Button
          variant="solid"
          borderRadius="29px"
          px="4"
          py="1"
          h="32px"
          fontSize="12px"
          fontWeight="400"
          color="white"
          bg="#13172E"
          _hover={{
            bg: "#13172E",
          }}
          tabIndex={0}
          aria-label={t('joinTalentPool')}
          suppressHydrationWarning
          onClick={() => window.location.href = getLink("MAIN", "/user") + "/resume/create"}
        >
          {t('joinTalentPool')}
        </Button>
      </Flex>
    );
  };

  return (
    <Box
      w="full"
      borderRadius="2xl"
      bg={cardBg}
      p="0"
      overflow="hidden"
      position="relative"
      tabIndex={0}
      aria-label="人才卡片"
    >
      {/* 渐变背景 */}
      <Box
        h="90px"
        w="100%"
        bgGradient="linear(270deg, rgba(250,152,116,0.40) 0%, rgba(100,120,240,0.40) 100%)"
        aria-label="渐变背景"
      />

      {/* 信息区 */}
      <Flex flexDir="column" px={8} mt="-32px" pb={6}>
        {/* 头像 */}
        <Avatar
          src={avatarUrl}
          name={name}
          w="64px"
          h="64px"
          border="4px solid white"
          aria-label="用户头像"
        />
        <Flex alignItems="center" mb="1">
          <Text fontWeight="bold" fontSize="xl" color="gray.900" aria-label="昵称">
            {name}
          </Text>
          {isMember && (
            <Image
              src="/svg/member.svg"
              alt="会员图标"
              ml="2"
              w="14px"
              h="13px"
            />
          )}
        </Flex>
        <Text color="gray.400" fontSize="12px" aria-label="邮箱">
          {email}
        </Text>
        {/* 会员到期时间显示 */}
        {isMember && (
          <Text
            fontSize="12px"
            fontWeight="400"
            lineHeight="16px"
            color={membership.expireWarning ? membership.expireWarning.color : "#6478F0"}
            mt="2px"
          >
            {membership.displayTexts.endTimeText}
          </Text>
        )}
        {/* 按钮 */}
        {renderButtons()}
      </Flex>
    </Box>
  )
}

export default TalentCard
