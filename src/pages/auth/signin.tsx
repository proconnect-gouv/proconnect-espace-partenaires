import { GetServerSideProps } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { fr } from '@codegouvfr/react-dsfr';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import Head from 'next/head';

interface Props {
  csrfToken: string;
}

export default function SignIn({ csrfToken }: Props) {
  return (
    <>
      <Head>
        <title>Connexion | ProConnect</title>
      </Head>
      <div className={fr.cx('fr-py-6w')}>
        <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
          <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
            <h1>Connexion</h1>
            <form method="post" action="/api/auth/signin/email">
              <input type="hidden" name="csrfToken" value={csrfToken} />
              <Input
                label="Email"
                nativeInputProps={{
                  type: 'email',
                  name: 'email',
                  id: 'email',
                  required: true,
                  autoComplete: 'email',
                }}
              />
              <div className={fr.cx('fr-mt-2w')}>
                <Button type="submit">Se connecter avec un lien magique</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};
