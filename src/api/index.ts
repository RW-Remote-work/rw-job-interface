import { userStorage } from "@/utils/Storage";
import { Api, HttpClient } from "./../__generated__/RwInterfaceApi";
import { ErrorResponse } from "@/types";
import { toast } from "@/utils/toast";
import { getClientCookie, getCookie, removeCookie } from "@/utils/cookies";
import { isClient } from "@/utils";

const httpClient = new HttpClient({
  baseURL: "/api",
});

httpClient.instance.interceptors.request.use((config) => {
  // Do something before request is sent

  console.log(config.url, 'config.url')

  config.url = isClient()
    ? config.url : process.env.NEXT_PUBLIC_API_BASE_URL! + config.url;

  const token = isClient()
    ? getClientCookie('token') :
    getCookie(config.headers.Cookie || config.headers.cookie, 'token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["X-XSRF-TOKEN"] = "e2f5d7c7-8819-4885-b670-6a63c7b9b68c";
  }

  return config;
});

httpClient.instance.interceptors.response.use(
  (response) => {
    // Do something before request is sent

    return response;
  },
  (error) => {
    // Do something with response error
    console.error('【API Error】:', error)
    const errorInfo =
      typeof error?.response?.data === "string"
        ? { detail: error.response.data }
        : (error?.response?.data || {});

    const httpStatus = error.response?.status;

    if ([401, 403].includes(httpStatus)) {
      removeCookie("token");
    }

    const err: ErrorResponse = {
      ...errorInfo,
      detail: errorInfo.detail?.slice(0, 36) || '服务器错误',
      status: httpStatus,
      httpStatus,
    };

    if (httpStatus >= 500) {
      toast({
        title: "服务器错误",
        status: "error",
      });
      err.detail = "";
    }

    console.log("err", err)

    throw err;
  }
);

const api = new Api(httpClient);

export default api;

export * from "./../__generated__/RwInterfaceApi";
