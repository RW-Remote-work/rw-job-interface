import { GetServerSidePropsContext } from "next";
import { i18n } from "next-i18next";

export const isClient = () => typeof window !== "undefined";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function formatDate(isoString: string): string {
  if (!isoString) return "--";
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}`;
  // return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

export const getApiBaseUrl = () => {
  const isDev = process.env.NODE_ENV === "development";
  if (isClient() || isDev) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  return process.env.NEXT_PUBLIC_INNER_API_BASE_URL;
};

export const getCookieDomain = () => {
  if (!isClient()) return undefined;
  const hostname = window.location.hostname;
  if (hostname.includes('rwnomad.com')) {
    return '.rwnomad.com';
  }
  return undefined;
};

export function calculateDaysBetweenDates(
  startDate?: string,
  endDate?: string
): number {
  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date();

  const startTime = start.getTime();
  const endTime = end.getTime();

  const timeDifference = endTime - startTime;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
}

export const getServerSideLanguage = ({ req }: GetServerSidePropsContext) => {
  const acceptLanguageHeader = req.headers["accept-language"];
  const langCookie = req.cookies.lang;
  const language = acceptLanguageHeader?.split(",")[0];

  const locale = langCookie || language || i18n?.language || 'en';

  if (locale.startsWith('zh')) {
    return 'zh';
  }

  if (locale.startsWith('en')) {
    return 'en';
  }

  return 'en';
};
