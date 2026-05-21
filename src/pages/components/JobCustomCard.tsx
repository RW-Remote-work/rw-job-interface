import { Box, Text, Image, Flex, Collapse } from "@chakra-ui/react"
import { FC, useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { JobCustomForm, JobCustomFormValues } from "./JobCustomForm"
import Mailbox from '@/assets/images/mailbox.png'

// 卡片属性类型
export type JobCustomCardProps = {
  isSubscribed?: boolean
  filterFormValues?: JobCustomFormValues
  canSave?: boolean
  onFilterFormValuesChange?: (values: JobCustomFormValues) => void
  onCreateSubscriptionSuccess?: () => void
  userInfo?: any // 添加用户信息属性
  disabled?: boolean
}

export const JobCustomCard: FC<JobCustomCardProps> = ({
  isSubscribed = false,
  filterFormValues,
  onFilterFormValuesChange,
  canSave = true,
  onCreateSubscriptionSuccess,
  userInfo, // 接收用户信息
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Flex suppressHydrationWarning direction="column" gap="32px" px="32px" pt="24px" pb="32px">
      {
        isSubscribed ? null : (
          <Flex
            w="100%"
            justifyContent="flex-start"
            alignItems="center"
            gap={4}
            onClick={toggleExpanded}
            cursor="pointer"
          >
            <Image src={Mailbox} mb={2} alt="mailbox" width="44px" height="44px" />
            {/* 标题 */}
            <Flex flexDirection="column">
              <Text
                fontWeight="bold"
                fontSize="lg"
                color="gray.800"
                mb={1}
              >
                {t('rwAiJobCustomization')}
              </Text>
              {/* 副标题 */}
              <Text
                fontSize="md"
                color="gray.500"
              >
                {t('tailoredJobOpportunities')}
              </Text>
            </Flex>
          </Flex>
        )
      }

      {/* Form */}
      <Collapse suppressHydrationWarning in={isExpanded} animateOpacity>
        <Box suppressHydrationWarning>
          <JobCustomForm
            value={filterFormValues}
            onChange={onFilterFormValuesChange}
            canSave={canSave}
            onCreateSubscriptionSuccess={onCreateSubscriptionSuccess}
            userInfo={userInfo} // 传递用户信息
            disabled={disabled}
          />
        </Box>
      </Collapse>
    </Flex>
  )
}

export default JobCustomCard;
