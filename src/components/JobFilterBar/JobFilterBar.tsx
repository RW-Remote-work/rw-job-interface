import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './JobFilterBar.module.css'
import { MultipleSelect } from '@/pages/components/MultipleSelect'
import { SingleSelect } from '@/pages/components/SingleSelect'
import { useJobClassList, useCountryList } from '@/pages/data'
import { JobType, useJobTypeOptions, useAlarmTypeOptions } from '@/pages/constants'
import { i18n } from 'next-i18next'
import { StylesConfig } from 'react-select'

// 搜索框下拉组件样式
const searchSelectStyles: StylesConfig<any, any> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: '32px',
    minHeight: '44px',
    padding: '0 16px',
    border: state.isFocused ? '1px solid #13172E' : '1px solid #E6E7E9',
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    fontSize: '14px',
    color: '#8a8a8a',
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
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    paddingRight: '0',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: '8px 0 8px 8px',
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
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#F1F2F3',
    },
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#F5F5F5',
    borderRadius: '8px',
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    margin: '2px',
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    fontSize: '13px',
    color: '#13172E',
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    padding: '0',
    width: '22px',
    height: '22px',
    borderRadius: '100px',
    backgroundColor: 'transparent',
    color: '#13172E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: '#E5E5E5',
    },
  }),
}

// 自定义下拉组件样式
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
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    paddingRight: '0',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: '8px 0 8px 8px',
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
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#F5F5F5',
    borderRadius: '8px',
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    margin: '2px',
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    fontSize: '13px',
    color: '#13172E',
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    padding: '0',
    width: '22px',
    height: '22px',
    borderRadius: '100px',
    backgroundColor: 'transparent',
    color: '#13172E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#E5E5E5',
    },
  }),
}

export interface JobFilterBarProps {
  /** 当前 Tab 值 */
  tab?: 'SUBSCRIBED' | 'APPLIED' | 'ALL' | 'FAVORITE';
  /** Tab 切换回调 */
  onTabChange?: (tab: 'SUBSCRIBED' | 'APPLIED' | 'ALL' | 'FAVORITE') => void;
  /** 是否已订阅 */
  isSubscribed?: boolean;
  /** 是否已登录 */
  isLogin?: boolean;
  /** 全部岗位数量 */
  totalCount?: number;
  /** 只读模式 - 禁用筛选功能 */
  readOnly?: boolean;
  /** 筛选值变化回调 - 将筛选条件传递给父组件 */
  onFilterChange?: (filters: {
    keywords?: string;
    jobClassIds?: number[];
    types?: JobType[];
    countryIds?: number[];
  }) => void;
  /** 外部传入的筛选初始值 */
  initialFilters?: {
    keywords?: string;
    jobClassIds?: number[];
    types?: JobType[];
    countryIds?: number[];
  };
}

const baseTabs = ['全部岗位', '收藏岗位', '已申请岗位']

export default function JobFilterBar({
  tab = 'ALL',
  onTabChange,
  isSubscribed = false,
  isLogin = false,
  totalCount = 0,
  readOnly = false,
  onFilterChange,
  initialFilters,
}: JobFilterBarProps) {
  const { t, i18n } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  // JobFilterBar 内部维护独立的筛选状态，不受外部订阅值影响
  // initialFilters 仅在组件挂载时使用一次，用于设置初始占位符提示
  const [q, setQ] = useState('')
  const [selectedJobClasses, setSelectedJobClasses] = useState<number[]>([])
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([])
  const [selectedCountries, setSelectedCountries] = useState<number[]>([])
  
  // 获取数据
  const { data: jobClassListData } = useJobClassList()
  const { data: countryListData } = useCountryList()
  const jobTypeOptions = useJobTypeOptions()
  const alarmTypeOptions = useAlarmTypeOptions()

  const tabKeys = useMemo(() => {
    if (!isLogin) return ['ALL'];
    return ['ALL', 'SUBSCRIBED', 'FAVORITE', 'APPLIED'];
  }, [isLogin]);

  const tabs = useMemo(() => {
    // 保持与 tabKeys 对应的显示文本
    if (!isLogin) {
      return [t('全部岗位')]
    }
    return [t('全部岗位'), t('订阅岗位'), t('收藏岗位'), t('已申请岗位')]
  }, [isLogin, t])

  // 根据 tab prop 同步 activeIndex
  useEffect(() => {
    const index = tabKeys.indexOf(tab as string);
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [tab, tabKeys])

  // 筛选值变化时通知父组件
  useEffect(() => {
    if (onFilterChange && !readOnly) {
      onFilterChange({
        keywords: q,
        jobClassIds: selectedJobClasses.length > 0 ? selectedJobClasses : undefined,
        types: selectedJobTypes.length > 0 ? selectedJobTypes : undefined,
        countryIds: selectedCountries.length > 0 ? selectedCountries : undefined,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, selectedJobClasses, selectedJobTypes, selectedCountries, readOnly])

  // 只读模式下切换 tab 不重置筛选条件
  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    const key = tabKeys[index] || 'ALL';
    onTabChange?.(key as 'SUBSCRIBED' | 'APPLIED' | 'ALL' | 'FAVORITE');

    if (!readOnly) {
      // 切换 tab 时重置筛选条件
      setSelectedJobClasses([])
      setSelectedJobTypes([])
      setSelectedCountries([])
      setQ('')
    }
  }

  // 构建选项
  const jobClassOptions = useMemo(() => {
    return jobClassListData?.map(option => ({
      label: i18n?.language === 'zh' ? option.name! : ((option as any).englishName || option.name!),
      value: option.id!,
    }))
  }, [jobClassListData, i18n?.language])
  
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

  return (
    <div className={styles.root} data-job-filter-bar>
      <div className={styles.tabs}>
        {tabs.map((t, i) => (
          <div 
            key={t} 
            onClick={() => handleTabClick(i)} 
            className={i === activeIndex ? styles.tabActive : styles.tab}
          >
            {t}
          </div>
        ))}
      </div>

      {/* 只在选择"全部岗位"时显示搜索过滤条件，且非只读模式 */}
      {activeIndex === 0 && !readOnly && (
        <div className={styles.searchRow}>
          <div className={styles.searchSelectWrapper}>
            <MultipleSelect
              instanceId="job-keywords-filter"
              creatable
              onChange={(v: string[]) => setQ(v.join(','))}
              value={q ? q.split(',').filter(Boolean) : []}
              placeholder={t('searchJobs')}
              customStyles={searchSelectStyles}
              disabled={readOnly}
            />
          </div>
        </div>
      )}

      {activeIndex === 0 && !readOnly && (
        <div className={styles.controls}>
          <div className={styles.leftGroup}>
            <div className={styles.selectWrapper}>
              <MultipleSelect
                instanceId="job-filter-class"
                options={jobClassOptions}
                onChange={setSelectedJobClasses}
                value={selectedJobClasses}
                placeholder={t('Job classification')}
                searchable
                customStyles={selectStyles}
                disabled={readOnly}
              />
            </div>
            <div className={styles.selectWrapper}>
              <MultipleSelect
                instanceId="job-filter-type"
                options={jobTypeOptions}
                onChange={setSelectedJobTypes}
                value={selectedJobTypes}
                placeholder={t('Job type')}
                customStyles={selectStyles}
                disabled={readOnly}
              />
            </div>
            <div className={styles.selectWrapper}>
              <MultipleSelect
                instanceId="job-filter-country"
                options={countryOptions}
                onChange={setSelectedCountries}
                value={selectedCountries}
                placeholder={t('The country/region where the company is located')}
                searchable
                customStyles={selectStyles}
                disabled={readOnly}
              />
            </div>
            <div className={styles.resetText} onClick={() => {
              if (!readOnly) {
                setSelectedJobClasses([])
                setSelectedJobTypes([])
                setSelectedCountries([])
                setQ('')
              }
            }}>
              {t('resetAll')}
            </div>
            {/* <div className={styles.selectWrapper}>
              <SingleSelect
                instanceId="job-filter-alarm"
                options={alarmTypeOptions}
                onChange={setSelectedAlarmType}
                value={selectedAlarmType}
                placeholder="邮件通知频率"
                customStyles={selectStyles}
              />
            </div> */}
          </div>

          {/* <div className={styles.rightGroup}>
            <div className={styles.subscribePill}>
              <div className={styles.count}>0</div>
              <div>订阅当前筛选条件</div>
            </div>

            <div className={styles.resetBtn} title="重置">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12a9 9 0 10-1.9 5.4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 3v6h-6" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div> */}
        </div>
      )}
    </div>
  )
}
