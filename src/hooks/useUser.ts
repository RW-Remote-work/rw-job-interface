import api from "@/api";
import { UserContext, UserDispatchContext } from "@/stores/userStore";
import { removeCookie, setCookie } from "@/utils/cookies";
import { getCookieDomain } from "@/utils/common";
import { userStorage } from "@/utils/Storage";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext, useMemo } from "react";
import { useEventCallback } from "./useEventCallback";

export const useUserAction = () => {
  const _updateUser = useContext(UserDispatchContext);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.web.login({ username: email, password }),
    async onSuccess(value) {
      setCookie('token', value.access_token || '', { expires: 1, domain: getCookieDomain() });
      // userStorage.set("TOKEN", {
      //   accessToken: value.access_token || "",
      //   expiresAt: value.expires_at || "",
      // });

      return value;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.web.logout(),
    onSuccess(value) {
      const domain = getCookieDomain();
      removeCookie('token',{ path: "/", domain });
      removeCookie('JSESSIONID', { path: "/", domain });
      // userStorage.remove("TOKEN");
      // userStorage.remove("USER_PROFILE");
      updateUser(null);
      return value;
    },
  });

  const getUserProfileMutation = useMutation({
    mutationFn: () => api.web.getUserProfile(),
    onSuccess(value) {
      // userStorage.set("USER_PROFILE", value);
      updateUser(value);
    },
  });


  const updateNicknameMutation = useMutation({
    mutationFn(nickname: string) {
      return api.web.updateDisplayName({
        displayName: nickname,
      });
    },
    onSuccess(_, nickname) {
      updateUser((oldV) => ({ ...oldV, displayName: nickname }));
    },
  });

  const login = useEventCallback(async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
    return getUserProfileMutation.mutateAsync();
  });

  const isLoginLoading = useMemo(() => {
    return loginMutation.isLoading || getUserProfileMutation.isLoading;
  }, [loginMutation.isLoading, getUserProfileMutation.isLoading]);

  const getUserProfile = useEventCallback(() => {
    return getUserProfileMutation.mutateAsync();
  });

  const updateUser: typeof _updateUser = useEventCallback((cb) => {
    return _updateUser((oldValue) => {
      const value = typeof cb === 'function' ? cb(oldValue) : cb;
      return value
    });
  })


  const updateUserNickname = useEventCallback((nickName: string) => {
    return updateNicknameMutation.mutateAsync(nickName)
  })

  return {
    login,
    isLoginLoading,
    getUserProfile,
    logoutMutation,
    updateUser,
    updateUserNickname
  } as const;
};

export const useUserSelector = () => {
  const userProfile = useContext(UserContext);

  const isLogin = useMemo(() => {
    return Boolean(userProfile);
  }, [userProfile]);

  return {
    userProfile,
    isLogin,
  };
};

export const useUser = () => {
  return [useUserSelector(), useUserAction()] as const;
};
