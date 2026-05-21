import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo, NextSeo } from 'next-seo';

import { useSiteSEOConfig } from '@/utils/config';

type IMetaProps = {
  title?: string;
  description?: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const seoConfig = useSiteSEOConfig()
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>

      <NextSeo
        titleTemplate={`%s | ${seoConfig.siteName}`}
        title={props.title || seoConfig.title}
        description={props.description || seoConfig.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title || seoConfig.title,
          description: props.description || seoConfig.description,
          url: props.canonical,
          site_name: seoConfig.siteName,
          images: seoConfig.images,
        }}
        twitter={{
          handle: '@rwlab71',
          site: '@rwlab71',
          cardType: 'summary_large_image',
        }}
      />
    </>
  );
};

export { Meta };
