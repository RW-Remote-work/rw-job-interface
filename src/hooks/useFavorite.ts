
import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext, useMemo } from "react";
import { useUserAction, useUserSelector } from "./useUser";
import { useRouter } from "next/router";

export interface IFavoriteProps {
  isFavorite?: boolean;
  id: number;
  onSuccess?: (data: any) => void
}

export const useFavoriteAction = ({ isFavorite, id, onSuccess }: IFavoriteProps) => {
  const { isLogin } = useUserSelector();
  const router = useRouter();

  const favoriteJob = useMutation({
    mutationKey: ["addFavorite"],
    mutationFn: (relatedDataId: number) => api.favorites.addFavorite({
      type: "REMOTE_WORK",
      relatedDataId,
      time: new Date().toISOString(),
    }),
    onSuccess,
  })

  const deleteFavoriteJob = useMutation({
    mutationKey: ["deleteFavorite"],
    mutationFn: (id: number) => api.favorites.deleteFavorite('REMOTE_WORK', id),
    onSuccess,
  })




  const handleFavorite = () => {
    if (!isLogin) {
      router.push("/login")
      return
    }
    if (id) {
      isFavorite ? deleteFavoriteJob.mutateAsync(id) : favoriteJob.mutateAsync(id)
    }
  }

  return {
    handleFavorite,
  } as const;
};
