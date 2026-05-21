import { useTranslation } from "next-i18next";

export const useSiteSEOConfig = () => {
  const { t } = useTranslation()
  return {
    siteName: t('seoSiteName'),
    title:
      t('seoTitle'),
    description:
      t('seoDescription'),
    images: [
      {
        url: 'https://rwnomad-image-prod.oss-cn-wulanchabu.aliyuncs.com/shared-image/og.png',
        width: 1200,
        height: 628,
        alt: 'RW Lab',
      },
    ],
  } as const
}