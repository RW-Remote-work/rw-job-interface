import api, { IPagePagingJobResponse, JobSubscribeResponse, ListCountryResponse, ListJobClassResponse, ListJobLabelResponse, RegionDetailResponse, RequestParams, ResumeResponse } from "@/api";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

interface JobListParams {
  page: number;
  size: number;

  /** 职位分类ID */
  jobClassIds?: number[];
  /** 工作类型，JobType */
  types?: string[];
  /** 国家/地区ID */
  countryIds?: number[];
  /** 岗位关键字 */
  keywords?: string[];
  /**
   * 发布日期
   * @format date-time
   */
  publishTimeAfter?: string;
  /** 排序字段：publish_time ASC */
  sortBy?: string;
}

export const fetchJobList = async (
  params: JobListParams,
  requestParams?: RequestParams
) => {
  const { page, size, ...rest } = params
  return api.web.listJob(rest, { page, size }, requestParams)
}

// 全部岗位列表 - 独立的 queryKey
export const useJobListAll = (
  params: JobListParams,
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<IPagePagingJobResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<IPagePagingJobResponse>({
    queryKey: ['jobListAll', params],
    queryFn: () => fetchJobList(params, requestParams),
    ...options,
  })
}

// 订阅岗位列表 - 独立的 queryKey
export const useJobListSubscribed = (
  params: JobListParams,
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<IPagePagingJobResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<IPagePagingJobResponse>({
    queryKey: ['jobListSubscribed', params],
    queryFn: () => fetchJobList(params, requestParams),
    ...options,
  })
}

// 保留原有的 useJobList（用于 UnlockAllRemoteJobModal）
export const useJobList = (
  params: JobListParams,
  tab: string,
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<IPagePagingJobResponse>, 'queryKey' | 'queryFn'
  >) => {
  return useQuery<IPagePagingJobResponse>({
    queryKey: ['jobList', tab, params],
    queryFn: () => fetchJobList(params, requestParams),
    ...options,
  })
}

// 已申请岗位接口
export const fetchAppliedJobs = async (
  params?: { page?: number; size?: number },
  requestParams?: RequestParams
) => {
  return api.apply.pagingAppliedJobs(params, requestParams)
}

export const useAppliedJobs = (
  params?: { page?: number; size?: number },
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<IPagePagingJobResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<IPagePagingJobResponse>({
    queryKey: ['appliedJobs', params],
    queryFn: () => {
      return fetchAppliedJobs(params, requestParams)
    },
    ...options,
  })
}


export const fetchJobClassList = async (params?: RequestParams) => {
  return api.job.listJobClass(params)
}

export const useJobClassList = (
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<ListJobClassResponse[]>, 'queryKey' | 'queryFn'
  >) => {
  return useQuery<ListJobClassResponse[]>({
    queryKey: ['jobClassList'],
    queryFn: () => {
      return fetchJobClassList(requestParams)
    },
    ...options,
  })
}

export const fetchJobLabelList = async (params?: RequestParams) => {
  return api.job.listJobLabel(params)
}

export const useJobLabelList = (
  options?: Omit<UseQueryOptions<ListJobLabelResponse[]>, 'queryKey' | 'queryFn'
  >) => {
  return useQuery<ListJobLabelResponse[]>({
    queryKey: ['jobLabelList'],
    queryFn: () => {
      return fetchJobLabelList()
    },
    ...options,
  })
}

export const fetchCountryList = async (params?: RequestParams) => {
  return api.regions.getCountries(params)
}

export const useCountryList = (
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<RegionDetailResponse[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<RegionDetailResponse[]>({
    queryKey: ['regions.getCountries', requestParams],
    queryFn: () => {
      return fetchCountryList(requestParams)
    },
    ...options,
  })
}


export const fetchJobSubscription = async (requestParams?: RequestParams) => {
  return api.job.getJobSubscribeById(requestParams)
}

export const useJobSubscription = (
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<JobSubscribeResponse | undefined>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<JobSubscribeResponse | undefined>({
    queryKey: ['jobSubscription', requestParams],
    queryFn: () => {
      return fetchJobSubscription(requestParams)
    },
    ...options,
  })
}

export const fetchSelfResume = async (requestParams?: RequestParams) => {
  try {
    return await api.admin.getSelfResume(requestParams)
  } catch (error: any) {
    // 当简历不存在时，API 返回 400 错误，此时返回 null 表示无简历
    if (error?.status === 400 || error?.response?.status === 400) {
      return null
    }
    // 其他错误返回 undefined
    return undefined
  }
}

export const useSelfResume = (
  options?: Omit<UseQueryOptions<ResumeResponse | null | undefined>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<ResumeResponse | null | undefined>({
    queryKey: ['selfResume'],
    queryFn: () => {
      return fetchSelfResume()
    },
    networkMode: 'always', // 每次都从网络获取最新数据
    ...options,
  })
}

// 收藏岗位接口
export const fetchFavoriteJobs = async (
  params?: { page?: number; size?: number },
  requestParams?: RequestParams
) => {
  return api.favorites.pagingJobFavorite(params, requestParams)
}

export const useFavoriteJobs = (
  params?: { page?: number; size?: number },
  requestParams?: RequestParams,
  options?: Omit<UseQueryOptions<IPagePagingJobResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<IPagePagingJobResponse>({
    queryKey: ['favoriteJobs', params],
    queryFn: () => {
      return fetchFavoriteJobs(params, requestParams)
    },
    ...options,
  })
}
