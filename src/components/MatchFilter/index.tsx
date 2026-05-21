import React, { useState, useMemo, useCallback } from 'react';
import styles from './MatchFilter.module.css';
import { SingleSelect } from '@/pages/components/SingleSelect';
import { StylesConfig } from 'react-select';
import { Box, Flex, Text, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from '@chakra-ui/react';
import { JobCustomForm, JobCustomFormValues } from '@/pages/components/JobCustomForm';
import { useJobSubscription } from '@/pages/data';
import { useTranslation } from 'next-i18next';
import { useUserInfo } from '@/pages/user/data';
import { useUserSelector } from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import api from '@/api';
import { toast } from '@/utils';
import to from 'await-to-js';
import { useMembership, useFeatureAccess } from '@/hooks/useMembership';
import { MembershipFeature } from '@/utils/membership';
import { useRouter } from 'next/router';
import { CloseIcon } from "@/components/Icons";

const selectStyles: StylesConfig<any, any> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: '48px',
    minHeight: '44px',
    padding: '0 16px 0 16px',
    border: state.isFocused ? '1px solid #13172E' : '1px solid #E6E7E9',
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    '&:hover': {
      borderColor: '#13172E',
    },
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    fontSize: '14px',
    color: '#13172E',
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: '0',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    fontSize: '14px',
    color: '#13172E',
  }),
  indicatorsContainer: (baseStyles, { hasValue }) => ({
    ...baseStyles,
    paddingRight: '0',
    display: hasValue ? 'flex' : 'flex',
    alignItems: 'center',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: '8px 0 8px 8px',
    display: 'flex',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    borderRadius: '8px',
    border: '1px solid #E6E7E9',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginTop: '4px',
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: '6px 0',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    padding: '0 16px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#000',
    backgroundColor: state.isFocused ? '#F1F2F3' : 'transparent',
    '&:hover': {
      backgroundColor: '#F1F2F3',
    },
  }),
};

export interface MatchFilterProps {
  jobCount?: number;
  options?: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (value: string | undefined) => void;
  disabled?: boolean;
  filterFormValues?: JobCustomFormValues;
  onFilterFormValuesChange?: (values: JobCustomFormValues) => void;
  isSubscribed?: boolean;
  userInfo?: any;
  showMatchScore?: boolean;
}

export const MatchFilter: React.FC<MatchFilterProps> = ({
  jobCount = 0,
  options: optionsProp,
  value,
  onChange,
  disabled = false,
  filterFormValues,
  onFilterFormValuesChange,
  isSubscribed = false,
  userInfo,
  showMatchScore = true,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refetch: refetchJobSubscription } = useJobSubscription(
    {},
    {
      enabled: isSubscribed, // 仅在订阅tab时启用，避免干扰其他tab的数据加载
    }
  );
  const { userProfile } = useUserSelector();
  const isLogin = useMemo(() => Boolean(userInfo), [userInfo]);

  const defaultOptions = useMemo(() => [
    { label: t('sortByPublishTime'), value: 'publish_time', type: 'sort' },
    { label: t('sortByMatchScoreTop100'), value: '100', type: 'ranking' },
  ], [t]);

  const options = useMemo(() => optionsProp || defaultOptions, [optionsProp, defaultOptions]);

  const hasAdvancedFilterAccess = useFeatureAccess(MembershipFeature.ADVANCED_JOB_FILTER, userProfile || undefined);
  const hasEmailNotificationAccess = useFeatureAccess(MembershipFeature.JOB_EMAIL_NOTIFICATION, userProfile || undefined);

  // 匹配度筛选对所有用户可用，无需会员权限检查
  const isMatchScoreDisabled = disabled;

  const saveSubscriptionMutation = useMutation({
    mutationFn: (values: JobCustomFormValues) => {
      return api.job.addJobSubscribe({
        alarmType: values.alarmType || 0,
        jobClassIds: values.jobClass || [],
        types: values.jobType || [],
        countryIds: values.country || [],
        keywords: values.keywords || [],
      });
    },
    onSuccess: () => {
      refetchJobSubscription();
      toast({
        description: t('saveSuccess'),
        status: 'success',
      });
    },
  });

  const updateSubscriptionMutation = useMutation({
    mutationFn: (values: JobCustomFormValues) => {
      return api.job.updateJobSubscribe({
        alarmType: values.alarmType || 0,
        jobClassIds: values.jobClass || [],
        types: values.jobType || [],
        countryIds: values.country || [],
        keywords: values.keywords || [],
      });
    },
    onSuccess: () => {
      refetchJobSubscription();
      toast({
        description: t('updateSuccess'),
        status: 'success',
      });
    },
  });

  const checkCondition = (values: JobCustomFormValues) => {
    if (!values.keywords?.length) {
      return Promise.reject(new Error(t('pleaseSelectAtLeastOneKeyword')));
    }
    if (!values.jobClass?.length) {
      return Promise.reject(new Error(t('pleaseSelectAtLeastOneJobClass')));
    }
    if (!values.jobType?.length) {
      return Promise.reject(new Error(t('pleaseSelectAtLeastOneJobType')));
    }
    if (!values.country?.length) {
      return Promise.reject(new Error(t('pleaseSelectAtLeastOneCountry')));
    }
    if (!values.alarmType) {
      return Promise.reject(new Error(t('pleaseSelectEmailFrequency')));
    }
    return Promise.resolve();
  };

  const checkConditionAndSave = async (values: JobCustomFormValues) => {
    if (!isLogin) {
      toast({
        title: t('pleaseLoginFirst'),
        status: 'error',
      });
      router.push('/login?next=' + encodeURIComponent(router.asPath));
      return;
    }

    if (!hasAdvancedFilterAccess || !hasEmailNotificationAccess) {
      toast({
        title: t('insufficientPermissions'),
        description: t('membershipRequired'),
        status: 'warning',
      });
      return;
    }

    const [error] = await to(checkCondition(values));
    if (error) {
      toast({
        description: error.message,
        status: 'error',
      });
      return;
    }

    if (isSubscribed) {
      updateSubscriptionMutation.mutate(values);
    } else {
      saveSubscriptionMutation.mutate(values);
    }
    onClose();
  };

  const handleOpenModal = () => {
    if (!isLogin) {
      router.push('/login?next=' + encodeURIComponent(router.asPath));
      return;
    }
    onOpen();
  };

  return (
      <>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>
            {isSubscribed ? t('subscribedJobs') : t('discoverFeaturedJobs')}（{jobCount}）
          </h2>
          <div className={isSubscribed && !showMatchScore ? styles.controlsWrapperWithoutSelect : styles.controlsWrapper}>
            {isSubscribed && (
              <button className={styles.button} onClick={handleOpenModal}>
                {t('configureSubscriptionConditions')}
              </button>
            )}
            {showMatchScore && (
              <div className={styles.selectWrapper}>
                <SingleSelect
                  instanceId="match-filter-select"
                  options={options}
                  onChange={onChange}
                  value={value}
                  placeholder={t('matchScore')}
                  customStyles={selectStyles}
                  disabled={isMatchScoreDisabled}
                  clearable={false}
                />
              </div>
            )}
          </div>
        </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="16px" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.25)">
          <Flex
            borderBottom="1px dashed #ADADAD"
            p="24px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              fontWeight="bold"
              fontSize="18px"
              color="#13172E"
            >
              {t('configureSubscriptionConditions')}
            </Text>
            <Box
              as="button"
              onClick={onClose}
              cursor="pointer"
              p="4px"
              _hover={{ bg: '#F1F2F3' }}
              borderRadius="4px"
            >
              <CloseIcon w="20px" h="20px" />
            </Box>
          </Flex>
          <ModalBody p="32px">
            <Box w="100%">
              <JobCustomForm
                value={filterFormValues}
                onChange={onFilterFormValuesChange}
                canSave={true}
                userInfo={userInfo}
                onSaveSuccess={onClose}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MatchFilter;
