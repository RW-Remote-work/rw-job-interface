import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 添加百度站点验证元标签 */}
        <meta name="baidu-site-verification" content="codeva-PvIjdFVvWW" />
      </Head>
      <body style={{ overflowX: "auto" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
