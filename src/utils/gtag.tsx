import Script from "next/script"

const googleTagId = process.env.NEXT_PUBLIC_GTAG_ID
export const GTag = () => {
    if (!googleTagId) return null
    return <>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleTagId}', {
              page_path: window.location.pathname,
            });
          `,
            }}
        />
    </>
}