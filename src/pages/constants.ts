import { i18n, useTranslation } from 'next-i18next'
import { useMemo } from 'react'
export enum JobType {
  REMOTE_FULL_TIME = 'REMOTE_FULL_TIME',
  REMOTE_PART_TIME = 'REMOTE_PART_TIME',
  REMOTE_INTERN = 'REMOTE_INTERN',
  PROJECT_COOP = 'PROJECT_COOP',
}

export const useJobTypeOptions = () => {
  const { t } = useTranslation()

  return useMemo(() => [
    { label: t('quan-zhi-yuan-cheng'), value: JobType.REMOTE_FULL_TIME },
    { label: t('jian-zhi-yuan-cheng'), value: JobType.REMOTE_PART_TIME },
    { label: t('shi-xi-yuan-cheng'), value: JobType.REMOTE_INTERN },
    { label: t('xiang-mu-he-zuo'), value: JobType.PROJECT_COOP },
  ], [t])
}

export const useJobTypeOption = (jobType?: JobType) => {
  const jobTypeOptions = useJobTypeOptions()

  return useMemo(() => {
    return jobTypeOptions.find(option => option.value === jobType)
  }, [jobType, jobTypeOptions])
}

export const useAlarmTypeOptions = () => {
  const { t } = useTranslation()

  return useMemo(() => [
    {
      label: t('不通知'),
      value: 0,
    },
    {
      label: t('每天'),
      value: 1,
    },
    {
      label: t('每周'),
      value: 2,
    },
  ], [t])
}


export const jobTypeEnumOld = [

  {
    name: 'quan-zhi-yuan-cheng',
    value: 'REMOTE_FULL_TIME',
  },
  {
    name: 'jian-zhi-yuan-cheng',
    value: 'REMOTE_PART_TIME',
  },
  {
    name: 'shi-xi-yuan-cheng',
    value: 'REMOTE_INTERN',
  },
  {
    name: 'xiang-mu-he-zuo',
    value: 'PROJECT_COOP',
  }
];

export const jobTypeEnum = [
  {
    name: i18n?.t('bu-xian') || '',
    value: "UN_RESTRICTED",
  },
  {
    name: i18n?.t('quan-zhi-yuan-cheng') || '',
    value: 'REMOTE_FULL_TIME',
  },
  {
    name: i18n?.t('jian-zhi-yuan-cheng') || '',
    value: 'REMOTE_PART_TIME',
  },
  {
    name: i18n?.t('shi-xi-yuan-cheng') || '',
    value: 'REMOTE_INTERN',
  },
  {
    name: i18n?.t('xiang-mu-he-zuo') || '',
    value: 'PROJECT_COOP',
  }
];
export const salaryTypeEnum = [
  {
    name: 'shi-xin',
    value: 'HOUR_PAY',
  },
  {
    name: 'ri-xin',
    value: 'DAY_PAY',
  },
  {
    name: 'zhou-xin',
    value: 'WEEKLY_PAY',
  },
  {
    name: 'yue-xin',
    value: 'MONTHLY_PAY',
  },
  {
    name: 'nian-xin',
    value: 'YEARLY_PAY',
  },
  {
    name: 'xin-zi-mian-yi',
    value: 'UNKNOWN_PAY',
  }
];
