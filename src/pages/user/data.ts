import api, { GetUserProfileResponse, RequestParams } from "@/api"
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"

export const fetchUserInfo = async (request?: RequestParams) => {
  const response = await api.web.getUserProfile(request)
  return response
}


export const useUserInfo = (
  options?: Omit<UseQueryOptions<GetUserProfileResponse>, 'queryKey' | 'queryFn'>
): UseQueryResult<GetUserProfileResponse> => {
  return useQuery<GetUserProfileResponse>({
    ...options,
    queryKey: ['web/getUserProfile'],
    queryFn: () => fetchUserInfo(),
    // 如果 enabled 已经设置为 false，则不覆盖
    enabled: options?.enabled !== false,
  })
}
