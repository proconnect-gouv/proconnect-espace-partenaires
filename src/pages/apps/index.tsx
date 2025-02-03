import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { Card } from '@codegouvfr/react-dsfr/Card';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { fr } from '@codegouvfr/react-dsfr';
import { OidcClient } from '../../types';
import { prisma_proconnect } from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from 'next/router';

// Get data from MongoDB through Prisma
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // Redirect to login if not authenticated
  if (!session?.user?.email) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const oidcClients = await prisma_proconnect.oidcClient.findMany({
      where: {
        email: session.user.email,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      props: {
        // Need to serialize dates for Next.js
        oidcClients: JSON.parse(JSON.stringify(oidcClients)),
      },
    };
  } catch (error) {
    console.error('Failed to fetch OIDC clients:', error);
    return {
      props: {
        oidcClients: [],
      },
    };
  }
};

export default function AppsPage({
  oidcClients,
}: {
  oidcClients: OidcClient[];
}) {
  const router = useRouter();

  const handleCreateApp = async () => {
    try {
      const response = await fetch('/api/apps/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create app');
      }

      const newApp = await response.json();
      router.push(`/apps/${newApp.id}`);
    } catch (error) {
      console.error('Error creating app:', error);
      // You might want to add proper error handling/display here
    }
  };

  return (
    <div className={fr.cx('fr-mb-10v')}>
      <div
        className={fr.cx(
          'fr-grid-row',
          'fr-grid-row--middle',
          'fr-grid-row--gutters',
          'fr-mb-3w'
        )}
      >
        <div className={fr.cx('fr-col')}>
          <h1>Vos applications</h1>
        </div>
        <div className={fr.cx('fr-col-auto')}>
          <Button onClick={handleCreateApp} iconId="fr-icon-add-line">
            Créer une application
          </Button>
        </div>
      </div>

      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        {oidcClients.map((oidcClient) => (
          <div
            key={oidcClient.id}
            className={fr.cx('fr-col-12', 'fr-col-md-6')}
          >
            <Card
              background
              border
              desc={oidcClient.title || oidcClient.name}
              horizontal
              linkProps={{
                href: `/apps/${oidcClient.id}`,
              }}
              size="small"
              start={
                <>
                  <ul className={fr.cx('fr-badges-group')}>
                    <li>
                      <Badge severity={oidcClient.active ? 'info' : 'warning'}>
                        {oidcClient.active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </li>
                  </ul>
                  {oidcClient.site && (
                    <p className={fr.cx('fr-mb-0', 'fr-text--xs')}>
                      → {oidcClient.site}
                    </p>
                  )}
                </>
              }
              title={oidcClient.name}
              titleAs="h2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
