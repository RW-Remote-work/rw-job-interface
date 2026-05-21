import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Box, ChakraProvider, useToast } from "@chakra-ui/react";
import { theme } from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "@/stores/userStore";
import Header from "@/components/Header";
import { SimpleHeader } from "@/components/SimpleHeader";
import Footer from "@/components/Footer";

import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { setToast, toast } from "@/utils/toast";
import { ErrorResponse } from "@/types";
import { parseCookie } from "@/utils/cookies";
import axios from "axios";
import { GetUserProfileResponse } from "@/api";
import { GTag } from "@/utils/gtag";
import { getApiBaseUrl, isClient } from "@/utils";
import { GlobalProvider } from "@/components/GlobalProvider";
import NiceModal from "@ebay/nice-modal-react";
import "./../plugins/yup";
import { appWithTranslation } from "next-i18next";
import isMobile from "is-mobile";
import { useSiteSEOConfig } from "@/utils/config";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const noHeaderAndFooter = [
  "/login",
  "/register",
  "/register-success",
  "/reset",
];

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(err) {
        const errorMsg = (err as ErrorResponse).detail;

        errorMsg &&
          toast({
            title: errorMsg,
            status: "error",
          });
      },
    },
  },
});

interface PageProps {
  userProfile: GetUserProfileResponse | null;
}

function App({ Component, pageProps, ...otherProps }: AppProps<PageProps>) {
  const seoConfig = useSiteSEOConfig()
  const { userProfile } = pageProps;
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    setToast(toast);
  }, [toast]);

  const isNeedHeaderAndFooter = useMemo(
    () => !noHeaderAndFooter.includes(router.pathname),
    [router.pathname]
  );

  const renderNoHeaderAndFooterComponent = () => {
    return (
      <Box>
        <Component {...pageProps} />
      </Box>
    );
  };

  const renderComponent = () => {
    return (
      <>
        <SimpleHeader />
        <Box paddingTop="60px" bg="#F7F7F7">
          <Component {...pageProps} />
        </Box>
        {/* 在移动端隐藏Footer组件 */}
        <Box display={{ base: "none", md: "block" }}>
          <Footer />
        </Box>
      </>
    );
  };

  // 移除 useMemo 包装，确保路由变化时组件能正确重新渲染
  const children = (
    <>
      <GTag />
      {isNeedHeaderAndFooter
        ? renderComponent()
        : renderNoHeaderAndFooterComponent()}
    </>
  );

  return (
    <Box as="main">
      <ChakraProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider defaultUserProfile={userProfile}>
            <NiceModal.Provider>
              <GlobalProvider>
                {children}
              </GlobalProvider>
            </NiceModal.Provider>
          </UserContextProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </Box>
  );
}

App.getInitialProps = async (app: AppContext) => {
  const userAgent = app.ctx.req?.headers["user-agent"] || '';
  const isMobileDevice = isMobile({ ua: userAgent, tablet: true });

  // 注释掉移动端自动跳转逻辑
  // 原始功能：检测到访问设备为移动端时，根据当前域名自动跳转到 m.rwnomad.com 或 mtest.rwnomad.com
  // if (isMobileDevice) {
  //   const curHost = app.ctx.req?.headers.host!;
  //   const targetUrl = ['www.rwnomad.com', 'rwnomad.com']
  //     .includes(curHost) ? 'https://m.rwnomad.com' : 'https://mtest.rwnomad.com';
  //
  //   console.log(targetUrl, 'targetUrl')
  //   return app.ctx.res?.writeHead(302, {
  //     Location: targetUrl,
  //   }).end();
  // }
  const cookies = parseCookie(app.ctx.req?.headers.cookie);

  const token = cookies["token"];

  const baseUrl = getApiBaseUrl();
  const userProfileFetchUrl = baseUrl + "/web/users/profile";

  console.log(userProfileFetchUrl, "userProfileFetchUrl");

  const userProfile: GetUserProfileResponse | null = token
    ? await axios
      .get(userProfileFetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
    : null;

  return {
    pageProps: {
      userProfile,
    },
  };
};

export default appWithTranslation(App);
