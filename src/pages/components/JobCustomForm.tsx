'use client'
import { PropsWithChildren, ReactNode, useMemo, useState, useEffect } from "react";
import { MultipleSelect } from "./MultipleSelect";
import { Box, Flex, Text } from "@chakra-ui/react";
import { JobType, useAlarmTypeOptions, useJobTypeOptions } from "../constants";
import { useCountryList, useJobClassList, useJobSubscription } from "../data";
import { i18n } from "next-i18next";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { SingleSelect } from "./SingleSelect";
import { toast } from "@/utils";
import to from "await-to-js";
import { useUserInfo } from "../user/data";
import router from "next/router";
import { useMembership, useFeatureAccess } from "@/hooks/useMembership";
import { getLink } from "@/utils/navigation";
import { MembershipFeature } from "@/utils/membership";
import VipSVG from '@/assets/icons/vip.svg'
import SaveSubscriptionIcon from '@/assets/icons/save-subscription.svg'
import { LockedIcon } from "@/components/Icons/Locked";
import { useTranslation } from "next-i18next";

import Image from 'next/image'
interface MockFormItemProps {
  label: ReactNode
  description?: string
}

const MockFormItem = ({ label, description, children }: PropsWithChildren<MockFormItemProps>) => {
  return <Flex suppressHydrationWarning flexDirection="column">
    <Box suppressHydrationWarning fontSize="14px" fontWeight="400" color="#202020" lineHeight="22px">
      {label}
    </Box>
    <Box suppressHydrationWarning mt="12px">
      {children}
    </Box>
    {
      description && (
        <Text mt="8px" fontSize="12px" fontWeight="400" color="#838383" lineHeight="20px">
          {description}
        </Text>
      )
    }
  </Flex >
}


export interface JobCustomFormValues {
  keywords?: string[]
  jobType?: JobType[]
  jobClass?: number[]
  country?: number[]
  /** 邮件通知频率 */
  alarmType?: number
}

interface JobCustomFormProps {
  value?: JobCustomFormValues
  onChange?: (values: JobCustomFormValues) => void
  canSave?: boolean
  onCreateSubscriptionSuccess?: () => void
  onSaveSuccess?: () => void // 保存成功回调（包括创建和更新）
  userInfo?: any // 添加用户信息属性
  disabled?: boolean
}

export const JobCustomForm = ({ value, onChange, canSave = true, onCreateSubscriptionSuccess, onSaveSuccess, userInfo, disabled = false }: JobCustomFormProps) => {
  const { t } = useTranslation();
  const jobTypeOptions = useJobTypeOptions()
  const { data: jobClassListData } = useJobClassList()
  const { data: countryListData } = useCountryList()
  const alarmTypeOptions = useAlarmTypeOptions()

  // 检查用户是否有邮件通知权限
  const hasEmailNotificationAccess = useFeatureAccess(MembershipFeature.JOB_EMAIL_NOTIFICATION);

  // 检查用户是否有高级筛选权限
  const hasAdvancedFilterAccess = useFeatureAccess(MembershipFeature.ADVANCED_JOB_FILTER);

  // 组合禁用状态：外部禁用或无会员权限
  const isFormDisabled = disabled || !hasAdvancedFilterAccess;
  const isEmailDisabled = disabled || !hasEmailNotificationAccess;

  const isLogin = useMemo(() => {
    return Boolean(userInfo)
  }, [userInfo])

  const { data: jobSubscription, refetch: refetchJobSubscription } = useJobSubscription({
  }, {
    enabled: isLogin,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const isSubscripted = useMemo(() => {
    return Boolean(jobSubscription?.id)
  }, [jobSubscription])


  const jobClassOptions = useMemo(() => {
    return jobClassListData?.map(option => ({
      label: t(option.name!) + '(' + option.jobCount + ')',
      value: option.id!,
    }))
  }, [jobClassListData, t])

  const countryOptions = useMemo(() => {
    return countryListData?.map(option => {
      const name = i18n?.language === 'zh' ? option.name : option.englishName
      const label = (name === '全球' || name === 'Global') ? t('distributed') : (name || '')
      return {
        label,
        value: option.id!
      }
    })
  }, [countryListData, i18n?.language, t])


  const saveSubscriptionMutation = useMutation({
    mutationFn: (values: JobCustomFormValues) => {
      return api.job.addJobSubscribe({
        alarmType: values.alarmType || 0,
        jobClassIds: values.jobClass || [],
        types: values.jobType || [],
        countryIds: values.country || [],
        keywords: values.keywords || [],
      })
    },
    onSuccess: () => {
      refetchJobSubscription()
      onCreateSubscriptionSuccess?.()
      onSaveSuccess?.() // 调用保存成功回调
      toast({
        description: t('saveSuccess'),
        status: 'success',
      })
    }
  })

  const updateSubscriptionMutation = useMutation({
    mutationFn: (values: JobCustomFormValues) => {
      return api.job.updateJobSubscribe({
        alarmType: values.alarmType || 0,
        jobClassIds: values.jobClass || [],
        types: values.jobType || [],
        countryIds: values.country || [],
        keywords: values.keywords || [],
      })
    },
    onSuccess: () => {
      refetchJobSubscription()
      toast({
        description: t('updateSuccess'),
        status: 'success',
      })
      onSaveSuccess?.() // 调用保存成功回调
    }
  })

  const removeSubscriptionMutation = useMutation({
    mutationFn: () => {
      return api.job.cancelJobSubscribe()
    },
    onSuccess: () => {
      refetchJobSubscription()
      toast({
        description: t('unsubscribeSuccess'),
        status: 'success',
      })
      onSaveSuccess?.() // 调用保存成功回调（取消订阅后也关闭Modal）
    }
  })

  // 是否符合订阅条件
  const checkCondition = (values: JobCustomFormValues) => {
    if (!values.keywords?.length) {
      return Promise.reject(new Error(t('pleaseSelectAtLeastOneKeyword')))
    }
    if (!values.jobClass?.length) {
      return Promise.reject(new Error(t('pleaseSelectAtLeastOneJobClass')))
    }
    if (!values.jobType?.length) {
      return Promise.reject(new Error(t('pleaseSelectAtLeastOneJobType')))
    }

    if (!values.alarmType) {
      return Promise.reject(new Error(t('pleaseSelectEmailFrequency')))
    }

    return Promise.resolve()
  }

  const checkConditionAndToast = async (values: JobCustomFormValues, onSuccess: () => void) => {
    if (!isLogin) {
      toast({
        title: t('pleaseLoginFirst'),
        status: 'error',
      })
      window.location.href = getLink('MAIN', '/login')
      return
    }

    // 检查高级筛选和邮件订阅权限
    if (!hasAdvancedFilterAccess || !hasEmailNotificationAccess) {
      toast({
        title: t('insufficientPermissions'),
        description: t('membershipRequired'),
        status: 'warning',
      })
      return
    }

    const [error] = await to(checkCondition(values))
    if (error) {
      toast({
        description: error.message,
        status: 'error',
      })
      return
    }
    onSuccess()
  }

  const renderUpdateSubscription = () => {
    return (
      <Box w="100%" display="flex" alignItems="center" gap="16px" flexDir="column">
        <Box
          w="full"
          as="button"
          type="submit"
          aria-label="保存订阅"
          tabIndex={0}
          onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.currentTarget.click();
            }
          }}
          bg="#13172E"
          borderRadius="29px"
          px="20px"
          py="4px"
          h="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="4px"
          cursor="pointer"
          _hover={{ bg: '#23284A' }}
          _active={{ bg: '#23284A' }}
          _focus={{ boxShadow: '0 0 0 2px #8393F3' }}
          onClick={() => {
            const values = value || {}
            checkConditionAndToast(values, () => {
              updateSubscriptionMutation.mutate(values)
            })
          }}
        >
          <Image src={SaveSubscriptionIcon} alt="save" width={18} height={18} />
          <Text
            color="#FFFFFF"
            fontFamily="'Source Han Sans CN', 'Noto Sans SC', 'Microsoft YaHei', sans-serif"
            fontWeight={500}
            fontSize="14px"
            lineHeight="16px"
          >
            {t('saveSubscription')}
          </Text>
        </Box>

        <Text
          fontSize="12px"
          color="#13172E"
          fontWeight="400"
          lineHeight="20px"
          textDecoration="underline"
          cursor="pointer"
          onClick={() => {
            removeSubscriptionMutation.mutate()
          }}
        >
          {t('unsubscribe')}
        </Text>
      </Box>
    )
  }

  const renderCreateSubscription = () => {
    return (
      <Box w="100%" display="flex" justifyContent="center">
        <Box
          w="full"
          as="button"
          type="submit"
          aria-label="保存订阅"
          tabIndex={0}
          bg="#13172E"
          borderRadius="29px"
          px="20px"
          py="4px"
          h="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="4px"
          _hover={{ bg: '#23284A' }}
          _active={{ bg: '#23284A' }}
          _focus={{ boxShadow: '0 0 0 2px #8393F3' }}
          border="none"
          cursor="pointer"
          onClick={() => {
            const values = value || {}
            checkConditionAndToast(values, () => {
              saveSubscriptionMutation.mutate(values)
            })
          }}
        >
          <Image src={SaveSubscriptionIcon} alt="save" width={18} height={18} />
          <Text
            color="#FFFFFF"
            fontFamily="'Source Han Sans CN', 'Noto Sans SC', 'Microsoft YaHei', sans-serif"
            fontWeight={500}
            fontSize="14px"
            lineHeight="16px"

          >
            {t('saveSubscription')}
          </Text>
        </Box>
      </Box>
    )
  }

  const renderSubscription = () => {
    if (isSubscripted) {
      return renderUpdateSubscription()
    }
    return renderCreateSubscription()
  }

  return <Flex flexDirection="column" gap="24px">
    <MockFormItem label={
       <Flex gap="4px" alignItems="center" position="relative">
       <Text as="span" color="red.500" position="absolute" left="-14px" lineHeight="22px" fontSize="16px" fontWeight="bold">*</Text>
       <Text lineHeight="22px">{t('jobKeywords')}</Text>
       <Image src={VipSVG} alt="vip svg" height={12} width={32} />
     </Flex>
    }>
      <MultipleSelect
        instanceId="job-keywords-select"
        creatable
        onChange={(v) => {
          onChange?.({
            ...value,
            keywords: v
          })
        }}
        value={value?.keywords}
        clearable={true}
        placeholder={t('pleaseEnter')}
        disabled={isFormDisabled}
      />
    </MockFormItem>

    <MockFormItem label={
      <Flex gap="4px" alignItems="center" position="relative">
        <Text as="span" color="red.500" position="absolute" left="-14px" lineHeight="22px" fontSize="16px" fontWeight="bold">*</Text>
        <Text lineHeight="22px">{t('zhi-wei-fen-lei')}</Text>
        <Image src={VipSVG} alt="vip svg" height={12} width={32} />
      </Flex>
    }>
      <MultipleSelect
        instanceId="job-class-select"
        options={jobClassOptions}
        onChange={(v) => {
          onChange?.({
            ...value,
            jobClass: v
          })
        }}
        value={value?.jobClass}
        clearable
        searchable
        placeholder={t('pleaseSelect')}
        disabled={isFormDisabled}
      />
    </MockFormItem>
    <MockFormItem label={
      <Flex gap="4px" alignItems="center" position="relative">
        <Text as="span" color="red.500" position="absolute" left="-14px" lineHeight="22px" fontSize="16px" fontWeight="bold">*</Text>
        <Text lineHeight="22px">{t('gong-zuo-lei-xing')}</Text>
        <Image src={VipSVG} alt="vip svg" height={12} width={32} />
      </Flex>
    }>
      <MultipleSelect
        instanceId="job-type-select"
        options={jobTypeOptions}
        onChange={(v) => {
          onChange?.({
            ...value,
            jobType: v
          })
        }}
        value={value?.jobType}
        clearable={true}
        placeholder={t('pleaseSelect')}
        disabled={isFormDisabled}
      />
    </MockFormItem>
    <MockFormItem label={
      <Flex gap="4px" alignItems="center">
        <Text>{t('companyLocation')}</Text>
        <Image src={VipSVG} alt="vip svg" height={12} width={32} />
      </Flex>
    }>
      <MultipleSelect
        instanceId="job-country-select"
        options={countryOptions}
        onChange={(v) => {
          onChange?.({
            ...value,
            country: v
          })
        }}
        value={value?.country}
        clearable={true}
        searchable
        placeholder={t('pleaseSelect')}
        disabled={isFormDisabled}
      />
    </MockFormItem>
    <MockFormItem label={
      <Flex gap="4px" alignItems="center" position="relative">
        <Text as="span" color="red.500" position="absolute" left="-14px" lineHeight="22px" fontSize="16px" fontWeight="bold">*</Text>
        <Text lineHeight="22px">{t('emailNotificationFrequency')}</Text>
        <Image src={VipSVG} alt="vip svg" height={12} width={32} />
      </Flex>
    }>
      <SingleSelect
        instanceId="email-notification-select"
        options={alarmTypeOptions}
        onChange={(v) => {
          onChange?.({
            ...value,
            alarmType: v
          })
        }}
        value={value?.alarmType}
        clearable={true}
        placeholder={t('pleaseSelect')}
        disabled={isEmailDisabled}
      />
    </MockFormItem>


    {
      canSave ? renderSubscription() : null
    }
  </Flex>;
};

export default JobCustomForm;
