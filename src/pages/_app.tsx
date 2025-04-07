import "../styles/global.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";

import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";

import { init } from "@socialgouv/matomo-next";

import { DocsLayoutFactory } from "../layouts/docs";
import { PageLayout } from "../layouts/page";

declare module "@codegouvfr/react-dsfr/next-pagesdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

declare module "@codegouvfr/react-dsfr" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
  defaultColorScheme: "light",
  Link,
  useLang: () => "fr",
  preloadFonts: ["Marianne-Regular", "Marianne-Medium", "Marianne-Bold"],
});

export { dsfrDocumentApi };

const { withAppEmotionCache, augmentDocumentWithEmotionCache } = createEmotionSsrAdvancedApproach({
  key: "css",
});

export { augmentDocumentWithEmotionCache };

function App({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  let Layout = PageLayout;

  if (router.pathname.match(/^\/docs/)) {
    Layout = DocsLayoutFactory({
      pathname: router.pathname.replace(/^\/docs\//, ""),
    });
  }

  return (
    <SessionProvider session={session}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  );
}

// Apply both DSFR and emotion cache wrappers
export default withDsfr(withAppEmotionCache(App));
