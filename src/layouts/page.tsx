import { ReactNode } from 'react';

import { useSession, signOut } from 'next-auth/react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Footer } from '@codegouvfr/react-dsfr/Footer';
import { fr } from '@codegouvfr/react-dsfr';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { SkipLinks } from '@codegouvfr/react-dsfr/SkipLinks';

import pkg from '../../package.json';

const brandTop = (
  <>
    République
    <br />
    Française
  </>
);

const homeLinkPops = {
  href: '/',
  title: 'Espace Partenaires ProConnect - Accueil',
};

const bottomLinks = [
  {
    text: "Conditions générales d'utilisation",
    linkProps: {
      href: 'https://www.proconnect.gouv.fr/cgu',
    },
  },
  {
    text: 'Statistiques',
    linkProps: {
      href: 'https://www.proconnect.gouv.fr/stats',
    },
  },
  {
    text: 'Statuts des services',
    linkProps: {
      href: 'https://status.agentconnect.gouv.fr/',
    },
  },
  {
    text: 'Contribuer sur GitHub',
    linkProps: {
      href: `${process.env.NEXT_PUBLIC_APP_REPOSITORY_URL}`,
    },
  },
];

type LayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const contentSecurityPolicy = process.env.CONTENT_SECURITY_POLICY;

  const quickAccessItems =
    session && session.user
      ? [
          {
            iconId: 'fr-icon-question-line' as const,
            linkProps: {
              href: 'https://agentconnect.crisp.help/fr/',
            },
            text: 'Aide',
          },
          {
            buttonProps: {
              onClick: () => signOut({ callbackUrl: '/' }),
            },
            iconId: 'fr-icon-logout-box-r-line' as const,
            text: `Déconnecter ${session.user.email}`,
          },
        ]
      : [
          {
            iconId: 'fr-icon-question-line' as const,
            linkProps: {
              href: 'https://agentconnect.crisp.help/fr/',
            },
            text: 'Aide',
          },
          {
            iconId: 'fr-icon-account-line' as const,
            linkProps: {
              href: '/login',
            },
            text: 'Se connecter',
          },
        ];

  return (
    <>
      <Head>
        <title>Espace Partenaires ProConnect</title>
        {contentSecurityPolicy && (
          <meta
            httpEquiv="Content-Security-Policy"
            content={contentSecurityPolicy}
          />
        )}
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Documentation technique et gestion des applications en développement"
        />
      </Head>
      <SkipLinks
        links={[
          {
            anchor: '#content',
            label: 'Contenu',
          },
          {
            anchor: '#header-navigation',
            label: 'Menu',
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
            text: 'Accueil',
            linkProps: {
              href: '/',
            },
            isActive: router.asPath === '/',
          },
          {
            text: 'Documentation technique',
            linkProps: {
              href: '/docs',
            },
            isActive: router.asPath.startsWith('/docs'),
          },
          {
            text: 'Vos applications',
            linkProps: {
              href: '/apps',
            },
            isActive: router.asPath.startsWith('/apps'),
          },
        ]}
      />
      <main role="main" className={fr.cx('fr-container')} id="content">
        {children}
      </main>
      <Footer
        brandTop={brandTop}
        accessibility="non compliant"
        contentDescription={``}
        homeLinkProps={homeLinkPops}
        license={`Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous licence ${pkg.license}`}
        accessibilityLinkProps={{
          href: 'https://www.proconnect.gouv.fr/accessibilite',
        }}
        termsLinkProps={{
          href: 'https://www.proconnect.gouv.fr/mentions-legales',
        }}
        bottomItems={[...bottomLinks]}
      />
    </>
  );
}
