import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "@/utils/toast";


interface UseWorkOperatorProps {
  onApplySuccess?: () => void
  onFavoriteSuccess?: () => void
  onRemoveFavoriteSuccess?: () => void
}

export const useWorkOperator = ({
  onApplySuccess,
  onFavoriteSuccess,
  onRemoveFavoriteSuccess,
}: UseWorkOperatorProps = {}) => {
  const applyJobMutation = useMutation({
    mutationFn(jobId: number) {
      return api.web.apply(jobId)
    },
    onSuccess() {
      onApplySuccess?.()
    },
    onError(error: any) {
      // 处理重复申请错误
      if (error?.response?.data?.message?.includes('重复申请') || 
          error?.response?.data?.message?.includes('已申请') ||
          error?.message?.includes('重复申请') ||
          error?.message?.includes('已申请')) {
        toast({
          title: '该岗位已申请，请勿重复申请',
          status: 'warning'
        });
        // 即使是重复申请错误，也刷新数据以确保状态同步
        onApplySuccess?.();
      } else {
        // 其他错误正常显示
        toast({
          title: error?.response?.data?.message || error?.message || error?.detail || '申请失败，请稍后重试',
          status: 'error'
        });
      }
    }
  })



  const favoriteJobMutation = useMutation({
    mutationFn(jobId: number) {
      return api.favorites.addFavorite({
        relatedDataId: jobId,
        time: dayjs().toISOString(),
        type: 'REMOTE_WORK',
      })
    },
    onSuccess() {
      onFavoriteSuccess?.()
    }
  })

  const removeFavoriteJobMutation = useMutation({
    mutationFn(jobId: number) {
      return api.favorites.deleteFavorite(
        'REMOTE_WORK',
        jobId,
      )
    },
    onSuccess() {
      onRemoveFavoriteSuccess?.()
    }
  })


  return {
    applyJobMutation,
    favoriteJobMutation,
    removeFavoriteJobMutation,
  }
}
