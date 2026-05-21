import React, { useMemo, useEffect, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useQuery } from '@tanstack/react-query'
import { Skeleton, Spinner } from '@chakra-ui/react'
import api, { MatchDetail } from '@/api'
import { setOptimizeState } from '@/hooks/useResumeOptimize'
import styles from './AIProfileMatch.module.css'

type SkillItem = {
  content: string
  status?: string
}

export type AIProfileMatchProps = {
  /** 岗位 ID */
  jobId?: number
  /** 匹配分数（百分比） */
  matchScore?: string
  /** 匹配状态标签 */
  matchStatus?: string
  /** 岗位名称 */
  position?: string
  /** 优化状态改变时的回调 */
  onOptimizeStatusChange?: (status: 'idle' | 'loading' | 'success' | 'error') => void
}

const formatScore = (value?: number) => `${Math.round(value || 0)}%`

const parseAnalysisToItems = (analysis?: string): SkillItem[] => {
  if (!analysis) return []
  try {
    const parsed = JSON.parse(analysis)
    if (Array.isArray(parsed)) {
      return parsed.map((item: { content?: string; status?: string }) => ({
        content: item.content || '',
        status: item.status
      }))
    }
  } catch {
  }
  return []
}

const getMatchSections = (data: MatchDetail, t: (key: string) => string) => {
  const sectionsData = [
    {
      title: t('coreSkills'),
      percent: formatScore(data.skillScore),
      items: parseAnalysisToItems(data.coreSkillsAnalysis)
    },
    {
      title: t('projectExperience'),
      percent: formatScore(data.experienceScore),
      items: parseAnalysisToItems(data.projectExperienceAnalysis)
    },
    {
      title: t('educationBackground'),
      percent: formatScore(data.educationScore),
      items: parseAnalysisToItems(data.educationAnalysis)
    },
    {
      title: t('language'),
      percent: formatScore(data.languageScore),
      items: parseAnalysisToItems(data.languageAnalysis)
    }
  ]
  return sectionsData.filter(s => s.items.length > 0)
}

const SkillItemComponent = ({ item }: { item: SkillItem }) => {
  const isMatched = item.status?.toUpperCase() !== 'UNMATCHED'
  return (
    <div className={styles.itemRow}>
      <div className={`${styles.itemIcon} ${isMatched ? styles.iconChecked : styles.iconUnmatched}`}>
        {isMatched ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM11.7197 5.25684C11.3469 4.91334 10.743 4.91457 10.3721 5.25977L6.50098 8.86523L5.62793 8.05176C5.25705 7.70619 4.65325 7.70521 4.28027 8.04883C3.90779 8.39249 3.90663 8.95146 4.27734 9.29688L5.82617 10.7402C6.00492 10.9067 6.24848 11 6.50195 11C6.75523 10.9999 6.99809 10.9065 7.17676 10.7402L11.7227 6.50488C12.0932 6.15945 12.0922 5.60045 11.7197 5.25684Z" fill="#13172E"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 7C7.44772 7 7 7.44772 7 8V12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12V8C9 7.44772 8.55229 7 8 7ZM8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4Z" fill="#F38B64"/>
          </svg>
        )}
      </div>
      <span className={styles.itemText}>{item.content}</span>
    </div>
  )
}

const MatchSection = ({ section }: { section: { title: string; percent: string; items: SkillItem[] } }) => {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>{section.title}</div>
        <div className={styles.sectionPercent}>{section.percent}</div>
      </div>
      <div className={styles.sectionContent}>
        {section.items.map((item, i) => <SkillItemComponent key={i} item={item} />)}
      </div>
    </div>
  )
}

const AIProfileMatch: React.FC<AIProfileMatchProps> = ({
  jobId,
  matchScore: externalMatchScore,
  matchStatus: externalMatchStatus,
  position,
  onOptimizeStatusChange,
}) => {
  const { t } = useTranslation()
  const isOptimizingRef = useRef(false)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['matchDetail', jobId],
    queryFn: () => api.ai.getMatchDetails(jobId!),
    enabled: !!jobId,
  })

  // 加载完成后，获取优化后的简历 URL
  const resolvedResumeUrl = data?.optimizedResumeUrl

  // 当从 API 获取到简历 URL 时，更新全局状态
  useEffect(() => {
    if (jobId && resolvedResumeUrl) {
      setOptimizeState(jobId, { 
        status: 'success', 
        resumeUrl: resolvedResumeUrl 
      })
    }
  }, [jobId, resolvedResumeUrl])

  // 处理优化按钮点击
  const handleOptimizeClick = useCallback(async () => {
    // 如果已有简历 URL，直接打开
    if (resolvedResumeUrl) {
      window.open(resolvedResumeUrl, '_blank')
      return
    }

    if (!jobId || isOptimizingRef.current || isOptimizing) return
    isOptimizingRef.current = true
    setIsOptimizing(true)
    
    // 通知外部优化状态改变
    onOptimizeStatusChange?.('loading')

    // 先打开空白窗口，用户点击立即响应，避免被浏览器阻止
    let popupWindow: Window | null = null
    try {
      popupWindow = window.open('', '_blank')
      if (!popupWindow) {
        // 浏览器阻止了弹出窗口，提示用户
        alert(t('allowPopup'))
        isOptimizingRef.current = false
        setIsOptimizing(false)
        return
      }
      // 显示加载中提示
      popupWindow.document.write(`<html><head><title>${t('optimizingResume')}</title></head><body style="font-family: system-ui; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f5f5;"><div style="text-align: center;"><div style="font-size: 48px; margin-bottom: 16px;">⏳</div><div>${t('optimizingResume')}</div></div></body></html>`)
    } catch {
      // 忽略窗口打开错误
    }

    try {
      const res = await api.ai.o(jobId)
      const optimizedUrl = (res as Record<string, unknown>).optimized_resume_url
      if (optimizedUrl && typeof optimizedUrl === 'string') {
        // 更新已打开窗口的URL
        if (popupWindow) {
          popupWindow.location.href = optimizedUrl
        } else {
          window.open(optimizedUrl, '_blank')
        }
        // 更新全局状态 - 关键：这里要更新全局状态，让 ResumeBoost 感知到
        if (jobId) {
          setOptimizeState(jobId, { status: 'success', resumeUrl: optimizedUrl })
        }
        // 通知外部优化成功
        onOptimizeStatusChange?.('success')
      } else if (popupWindow) {
        popupWindow.close()
        // 通知外部优化成功（虽然没有URL，但接口调用成功）
        onOptimizeStatusChange?.('success')
      }
    } catch (error) {
      console.error('Optimize resume failed:', error)
      if (popupWindow) {
        popupWindow.document.write(`<html><head><title>${t('optimizationFailed')}</title></head><body style="font-family: system-ui; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #fee;"><div style="text-align: center;"><div style="font-size: 48px; margin-bottom: 16px;">❌</div><div>${t('optimizationFailed')}</div></div></body></html>`)
      }
      // 通知外部优化失败
      onOptimizeStatusChange?.('error')
    } finally {
      isOptimizingRef.current = false
      setIsOptimizing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, resolvedResumeUrl, isOptimizing])

  const { matchScore, matchStatus, sections } = useMemo(() => {
    // 优先使用外部传入的值来显示头部
    const displayScore = externalMatchScore ?? (data ? formatScore(data.matchScore ?? data.totalScore ?? 0) : '')
    const displayStatus = externalMatchStatus ?? (data ? t((() => {
      const percent = data.matchScore ?? data.totalScore ?? 0
      if (percent >= 80) return 'perfectMatch'
      if (percent >= 60) return 'highlyMatched'
      if (percent >= 40) return 'partialMatch'
      if (percent >= 20) return 'potentialMatch'
      return 'noMatch'
    })()) : t('notMatched'))
    
    // sections 使用接口返回的
    const displaySections = data ? getMatchSections(data, t) : []

    return {
      matchScore: displayScore,
      matchStatus: displayStatus,
      sections: displaySections
    }
  }, [data, externalMatchScore, externalMatchStatus, t])

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorState}>{t('loadFailed')}</div>
        </div>
      </div>
    )
  }

  if (!data && !isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.emptyState}>{t('noMatchData')}</div>
        </div>
      </div>
    )
  }

  // Loading 时的骨架屏 - 只显示 sections 部分
  const LoadingSkeleton = () => (
    <div className={styles.dimensionsArea}>
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <Skeleton width="60px" height="24px" mb="4px" />
          <Skeleton width="40px" height="32px" />
        </div>
        <div className={styles.sectionContent}>
          <Skeleton width="100%" height="24px" mb="8px" />
          <Skeleton width="85%" height="24px" mb="8px" />
          <Skeleton width="70%" height="24px" />
        </div>
      </div>
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <Skeleton width="60px" height="24px" mb="4px" />
          <Skeleton width="40px" height="32px" />
        </div>
        <div className={styles.sectionContent}>
          <Skeleton width="100%" height="24px" mb="8px" />
          <Skeleton width="90%" height="24px" mb="8px" />
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 头部信息区域：两个卡片横向并排 */}
        <div className={styles.headerRow}>
          {/* 左侧卡片：状态标签和分数 */}
          <div className={styles.headerCard}>
            <div className={styles.badge}>{matchStatus}</div>
            <div className={styles.score}>{matchScore}</div>
          </div>
          
          {/* 右侧卡片：优化建议 */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryTitle}>{t('optimizationSuggestion')}</div>
            <div className={styles.summaryText}>
              {data?.summary || t('noOptimizationSuggestion')}
            </div>
          </div>
        </div>

        {/* 内容区域：loading 时显示骨架屏，否则显示真实内容 */}
        {isLoading ? <LoadingSkeleton /> : (
          <div className={styles.dimensionsArea}>
            {sections.map((s) => <MatchSection key={s.title} section={s} />)}
          </div>
        )}

        {/* 临时注释：根据最新接口调整隐藏底部优化按钮 */}
        {/* 底部按钮：loading 完成后显示 */}
        {/* {!isLoading && (
          <div className={styles.footer}>
            <button
              className={styles.cta}
              onClick={handleOptimizeClick}
              disabled={isOptimizing || isOptimizingRef.current}
            >
              {isOptimizing ? (
                <Spinner size="sm" color="white" mr="8px" />
              ) : (
                <svg className={styles.ctaIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6773 5.84033C12.0103 4.99644 13.2047 4.99635 13.5376 5.84033L14.5503 8.40967C14.9569 9.44049 15.7734 10.256 16.8043 10.6626L19.3736 11.6763C20.2175 12.0093 20.2175 13.2036 19.3736 13.5366L16.8043 14.5503C15.7734 14.9569 14.9569 15.7724 14.5503 16.8032L13.5376 19.3726C13.2047 20.2166 12.0103 20.2166 11.6773 19.3726L10.6636 16.8032C10.2571 15.7726 9.44128 14.9569 8.4107 14.5503L5.84136 13.5366C4.9972 13.2037 4.9972 12.0092 5.84136 11.6763L8.4107 10.6626C9.44129 10.256 10.2571 9.44031 10.6636 8.40967L11.6773 5.84033ZM5.81304 3.70752C5.91296 3.45442 6.27073 3.45443 6.37066 3.70752L6.91851 5.09619C6.94901 5.17342 7.01021 5.23466 7.08745 5.26514L8.47613 5.81299C8.72915 5.91295 8.7292 6.27069 8.47613 6.37061L7.08745 6.91846C7.0102 6.94897 6.94898 7.01014 6.91851 7.08741L6.37066 8.47608C6.27065 8.72892 5.91303 8.72893 5.81304 8.47608L5.26519 7.08741C5.23471 7.01012 5.17351 6.94897 5.09624 6.91846L3.70757 6.37061C3.45455 6.27068 3.4546 5.91297 3.70757 5.81299L5.09624 5.26514C5.17349 5.23466 5.23468 5.17343 5.26519 5.09619L5.81304 3.70752Z" fill="white"/>
                </svg>
              )}
              {isOptimizing ? t('optimizing') : (resolvedResumeUrl ? t('viewCustomResume') : t('aiOptimizeResume'))}
            </button>
            {!resolvedResumeUrl && !isOptimizing && (
              <div className={styles.note}>{t('canCloseWindow')}</div>
            )}
          </div>
        )} */}
      </div>
    </div>
  )
}

export default AIProfileMatch
