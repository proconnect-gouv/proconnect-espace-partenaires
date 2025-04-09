import { ReactNode } from "react";

import { signOut, useSession } from "next-auth/react";

import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { SkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";
import Head from "next/head";
import { useRouter } from "next/router";

const brandTop = (
  <>
    République
    <br />
    Française
  </>
);

const homeLinkPops = {
  href: "/",
  title: "Espace Partenaires ProConnect - Accueil",
};

type LayoutProps = {
  children: ReactNode;
};

const getGithubDeepLink = (path: string) => {
  if (path.startsWith("/docs")) {
    return "/tree/main/src/pages/docs";
  } else {
    return "";
  }
};

export function PageLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const contentSecurityPolicy = process.env.CONTENT_SECURITY_POLICY;

  const bottomLinks = [
    {
      text: "Conditions générales d'utilisation",
      linkProps: {
        href: "https://www.proconnect.gouv.fr/cgu",
      },
    },
    {
      text: "Statistiques",
      linkProps: {
        href: "https://www.proconnect.gouv.fr/stats",
      },
    },
    {
      text: "Statuts des services",
      linkProps: {
        href: "https://status.agentconnect.gouv.fr/",
      },
    },
    {
      text: "Contribuer sur GitHub",
      linkProps: {
        href: `${process.env.NEXT_PUBLIC_APP_REPOSITORY_URL}` + getGithubDeepLink(router.asPath),
      },
    },
  ];

  const quickAccessItems =
    session && session.user
      ? [
          {
            iconId: "fr-icon-question-line" as const,
            linkProps: {
              href: "https://proconnect.crisp.help/fr/",
            },
            text: "Aide",
          },
          {
            buttonProps: {
              onClick: () => signOut({ callbackUrl: "/" }),
            },
            iconId: "fr-icon-logout-box-r-line" as const,
            text: `Déconnecter ${session.user.email}`,
          },
        ]
      : [
          {
            iconId: "fr-icon-question-line" as const,
            linkProps: {
              href: "https://proconnect.crisp.help/fr/",
            },
            text: "Aide",
          },
          {
            iconId: "fr-icon-account-line" as const,
            linkProps: {
              href: "/login",
            },
            text: "Se connecter",
          },
        ];

  return (
    <>
      <Head>
        {contentSecurityPolicy && (
          <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SkipLinks
        links={[
          {
            anchor: "#content",
            label: "Contenu",
          },
          {
            anchor: "#fr-header",
            label: "Menu",
          },
          {
            anchor: "#fr-footer",
            label: "Pied de page",
          },
        ]}
      />
      <Header
        brandTop={brandTop}
        serviceTitle="Espace Partenaires ProConnect"
        serviceTagline="Documentation technique et gestion des applications en développement"
        homeLinkProps={homeLinkPops}
        quickAccessItems={quickAccessItems}
        navigation={[
          {
            text: "Accueil",
            linkProps: {
              href: "/",
            },
            isActive: router.asPath === "/",
          },
          {
            text: "Documentation technique",
            linkProps: {
              href: "/docs",
            },
            isActive: router.asPath.startsWith("/docs"),
          },
          {
            text: "Vos applications",
            linkProps: {
              href: "/apps",
            },
            isActive: router.asPath.startsWith("/apps"),
          },
        ]}
      />
      <main role="main" id="content">
        {children}
      </main>
      <Footer
        brandTop={brandTop}
        accessibility="non compliant"
        contentDescription={``}
        homeLinkProps={homeLinkPops}
        accessibilityLinkProps={{
          href: "https://www.proconnect.gouv.fr/accessibilite",
        }}
        termsLinkProps={{
          href: "https://www.proconnect.gouv.fr/mentions-legales",
        }}
        bottomItems={[...bottomLinks]}
      />
    </>
  );
}
