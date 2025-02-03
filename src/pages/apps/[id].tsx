import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { ProviderUrl } from "../../components/ProviderUrl";
import { SideMenu } from "../../components/AppSideMenu";
import { GetServerSideProps } from "next";
import { useState, useCallback } from "react";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { prisma_proconnect, OidcClient } from '../../lib/prisma';
import debounce from "lodash/debounce";
import { CopyableField } from "../../components/CopyableField";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { NotificationsContainer } from "../../components/NotificationsContainer";
import { Select } from "@codegouvfr/react-dsfr/Select";

type Props = {
  initialData: OidcClient;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
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

  const id = context.params?.id;
  if (typeof id !== 'string') {
    return { notFound: true };
  }

  try {
    const oidcClient = await prisma_proconnect.oidcClient.findFirst({
      where: {
        id,
        email: session.user.email
      },
    });

    if (!oidcClient) {
      return { notFound: true };
    }

    return {
      props: {
        initialData: JSON.parse(JSON.stringify(oidcClient)),
      },
    };
  } catch (error) {
    console.error('Failed to fetch OIDC client:', error);
    return { notFound: true };
  }
};

const SIGNATURE_ALGORITHMS = [
  {
    label: "RS256 (RSA + SHA256) - Recommandé", 
    value: "RS256"
  },
  {
    label: "ES256 (EC + SHA256) - Recommandé",
    value: "ES256"
  },
  {
    label: "HS256 (HMAC + SHA256) - Non recommandé",
    value: "HS256"
  }
] as const;

export default function AppDetailPage({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [signatureAlg, setSignatureAlg] = useState(
    data.id_token_signed_response_alg || "RS256"
  );

  const saveData = async (updates: Partial<OidcClient>) => {
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const response = await fetch(`/api/apps/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      const updatedApp = await response.json();
      setData(updatedApp);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving app:', error);
      setSaveError('Une erreur est survenue lors de la sauvegarde');
    }
  };

  // Debounced save for title
  const debouncedSave = useCallback(
    debounce((updates: Partial<OidcClient>) => saveData(updates), 500),
    [data.id]
  );

  const handleUpdate = (updates: Partial<OidcClient>) => {
    setData(prev => ({
      ...prev,
      ...updates
    }));

    // For title changes, use debounced save
    if ('name' in updates) {
      debouncedSave(updates);
    } else {
      // For URLs, save immediately
      saveData(updates);
    }
  };

  const generateKeys = async () => {
    // TODO: Replace with actual API call
    const mockKeys = {
      clientId: "client_" + Math.random().toString(36).substring(7),
      clientSecret: "secret_" + Math.random().toString(36).substring(7)
    };

    handleUpdate(mockKeys);
  };

  const hasKeys = Boolean(data.key && data.client_secret);

  const handleSignatureAlgChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAlg = e.target.value;
    setSignatureAlg(newAlg);
    
    try {
      const updates = {
        id_token_signed_response_alg: newAlg,
        userinfo_signed_response_alg: newAlg
      };

      await saveData(updates);
    } catch (error) {
      console.error('Error updating signature algorithm:', error);
      setSaveError('Failed to update signature algorithm');
    }
  };

  return (
    <>
      <h1>{data.name}</h1>
      <div className={fr.cx("fr-container--fluid", "fr-mt-10v")}>
        <div className={fr.cx("fr-grid-row")}>
          <SideMenu />
          <div className={fr.cx("fr-col-12", "fr-col-md-9")}>
            <div className={fr.cx("fr-mb-10v")}>
              <Input
                className={fr.cx("fr-col-md-7")}
                state={data.name === "" ? "error" : "default"}
                stateRelatedMessage="Nom de projet obligatoire"
                label="Nom du projet"
                nativeInputProps={{
                  type: "text",
                  placeholder: "Test - date",
                  onChange: (e) => handleUpdate({ name: e.target.value }),
                  required: true,
                  value: data.name,
                }}
              />
            </div>

            <div className={fr.cx("fr-mb-10v")}>
              <h2>Clés d'API</h2>
              {!hasKeys ? (
                <Button onClick={generateKeys}>Générer les clés</Button>
              ) : (
                <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
                  <div className={fr.cx("fr-col-12")}>
                    <CopyableField
                      label="Client ID"
                      value={data.key}
                    />
                  </div>
                  <div className={fr.cx("fr-col-12", "fr-mt-2w")}>
                    <CopyableField
                      label="Client Secret"
                      value={data.client_secret}
                    />
                  </div>
                </div>
              )}
            </div>

            <ProviderUrl
              urls={data.redirect_uris}
              onUpdate={redirect_uris => handleUpdate({ redirect_uris })}
              title="Configuration des URLs"
              description="Saisissez l'url de la ou les pages sur lesquelles vous souhaitez utiliser le bouton de connexion MonComptePro"
              label="URL de la page de connexion :"
            />
            <ProviderUrl
              urls={data.post_logout_redirect_uris}
              onUpdate={post_logout_redirect_uris => 
                handleUpdate({ post_logout_redirect_uris })
              }
              title="Configuration des URLs de déconnexion"
              description="Saisissez l'url de la ou les pages sur lesquelles vous souhaitez rediriger l'utilisateur après sa déconnexion"
              label="URL de la page de déconnexion :"
            />

            <div className={fr.cx("fr-mb-10v")}>
              <h2>Algorithme de signature</h2>
              <p>
                L'algorithme de signature est utilisé pour signer les jetons d'identité et les informations utilisateur.
              </p>
              <Select
                label="Algorithme de signature"
                hint="Algorithme utilisé pour signer les jetons d'identité et les informations utilisateur"
                nativeSelectProps={{
                  value: signatureAlg,
                  onChange: handleSignatureAlgChange
                }}
              >
                {SIGNATURE_ALGORITHMS.map((alg) => (
                  <option key={alg.value} value={alg.value}>
                    {alg.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <NotificationsContainer
        error={saveError}
        success={saveSuccess ? "Les modifications ont été enregistrées" : null}
        onErrorClose={() => setSaveError(null)}
        onSuccessClose={() => setSaveSuccess(false)}
      />
    </>
  );
}