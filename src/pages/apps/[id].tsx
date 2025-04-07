import { fr } from "@codegouvfr/react-dsfr";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import debounce from "debounce";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { SideMenu } from "../../components/AppSideMenu";
import { CopyableField } from "../../components/CopyableField";
import { NotificationsContainer } from "../../components/NotificationsContainer";
import { ProviderUrl } from "../../components/ProviderUrl";
import { OidcClient, pcdbClient } from "../../lib/pcdbapi";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session?.user?.email) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const { id } = context.params as { id: string };
  try {
    const app = await pcdbClient.getOidcClient(id, session.user.email);
    return { props: { app } };
  } catch {
    return { notFound: true };
  }
};

const SIGNATURE_ALGORITHMS = [
  {
    label: "RS256 (RSA + SHA256) - Recommandé",
    value: "RS256",
  },
  {
    label: "ES256 (EC + SHA256) - Recommandé",
    value: "ES256",
  },
  {
    label: "HS256 (HMAC + SHA256) - Non recommandé",
    value: "HS256",
  },
] as const;

export default function AppDetailPage({ app }: { app: OidcClient }) {
  const [data, setData] = useState(app);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [signatureAlg, setSignatureAlg] = useState(data.id_token_signed_response_alg || "RS256");

  const handleSave = useCallback(
    async (updates: Partial<OidcClient>) => {
      try {
        const response = await fetch(`/api/apps/${data._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error("Failed to update app");
        }

        // const updated = await response.json();

        // Temporary workaround to get the updated app with clean fields
        const response_after_update = await fetch(`/api/apps/${data._id}`);
        const updated = await response_after_update.json();

        setData(updated);
        setSaveSuccess(true);
        setSaveError(null);

        // Auto-hide success message after 2 seconds
        setTimeout(() => setSaveSuccess(false), 2000);
      } catch (error) {
        console.error("Failed to update app:", error);
        setSaveError("Failed to update app");
        setSaveSuccess(false);
      }
    },
    [data._id]
  );

  // Create a memoized debounced save function
  const debouncedSave = useMemo(
    () => debounce((updates: Partial<OidcClient>) => handleSave(updates), 2000),
    [handleSave]
  );

  const handleUpdate = (updates: Partial<OidcClient>) => {
    setData((prev) => ({
      ...prev,
      ...updates,
    }));

    if ("name" in updates) {
      // For name, use debounced save
      debouncedSave(updates);
    } else {
      // For URLs, save immediately
      handleSave(updates);
    }
  };

  const handleSignatureAlgChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAlg = e.target.value;
    setSignatureAlg(newAlg);

    try {
      handleUpdate({
        id_token_signed_response_alg: newAlg,
        userinfo_signed_response_alg: newAlg,
      });
    } catch (error) {
      console.error("Error updating signature algorithm:", error);
      setSaveError("Failed to update signature algorithm");
    }
  };

  return (
    <>
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <SideMenu />

          <div className={fr.cx("fr-col-12", "fr-col-md-9", "fr-py-12v")}>
            <Breadcrumb
              currentPageLabel={data.name}
              segments={[{ label: "Applications", linkProps: { href: "/apps" } }]}
            />

            <div className={fr.cx("fr-mb-4w")}>
              <div className={fr.cx("fr-col")}>
                <h2>Gestion de votre Fournisseur de Service</h2>
              </div>
              <div>
                <ul className={fr.cx("fr-badges-group")}>
                  <li>
                    <Badge severity="info">EN TEST</Badge>
                  </li>
                  <li>
                    <Badge severity={app.active ? "success" : "error"}>
                      {app.active ? "Actif" : "Inactif"}
                    </Badge>
                  </li>
                </ul>
              </div>
            </div>

            <div className={fr.cx("fr-mb-10v")}>
              <Input
                className={fr.cx("fr-col-md-7")}
                state={data.name === "" ? "error" : "default"}
                stateRelatedMessage="Nom de projet obligatoire"
                label="Nom de l&rsquo;application"
                nativeInputProps={{
                  type: "text",
                  placeholder: "Test - date",
                  onChange: (e) => handleUpdate({ name: e.target.value }),
                  required: true,
                  value: data.name,
                }}
              />
            </div>

            <div id="cles" className={fr.cx("fr-mb-10v")}>
              <h3>Clés d&rsquo;API</h3>
              <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
                <div className={fr.cx("fr-col-12")}>
                  <CopyableField label="Client ID" value={data.key || ""} />
                </div>
                <div className={fr.cx("fr-col-12", "fr-mt-2w")}>
                  <CopyableField label="Client Secret" value={data.client_secret || ""} />
                </div>
              </div>
            </div>

            <div id="urls">
              <ProviderUrl
                urls={data.redirect_uris}
                onUpdate={(redirect_uris) => handleUpdate({ redirect_uris })}
                title="Configuration des URLs"
                description="Saisissez l&rsquo;adresse des pages sur lesquelles vous souhaitez utiliser le bouton de connexion ProConnect."
                label="URL de la page de connexion :"
              />
            </div>

            <div id="urls-deconnexion">
              <ProviderUrl
                urls={data.post_logout_redirect_uris || []}
                onUpdate={(post_logout_redirect_uris) =>
                  handleUpdate({ post_logout_redirect_uris })
                }
                title="Configuration des URLs de déconnexion"
                description="Saisissez l&rsquo;adresse des pages sur lesquelles vous souhaitez rediriger l&rsquo;utilisateur après sa déconnexion."
                label="URL de la page de déconnexion :"
              />
            </div>

            <div id="alg" className={fr.cx("fr-mb-10v")}>
              <h3>Algorithme de signature</h3>
              <p>
                L&rsquo;algorithme de signature est utilisé pour signer les jetons d&rsquo;identité
                et les informations utilisateur.
              </p>
              <Select
                label="Algorithme de signature"
                hint="Algorithme utilisé pour signer les jetons d&rsquo;identité et les informations utilisateur"
                nativeSelectProps={{
                  value: signatureAlg,
                  onChange: handleSignatureAlgChange,
                }}
              >
                {SIGNATURE_ALGORITHMS.map((alg) => (
                  <option key={alg.value} value={alg.value}>
                    {alg.label}
                  </option>
                ))}
              </Select>
            </div>

            <div id="production" className={fr.cx("fr-mb-10v")}>
              <h3>Passage en production</h3>
              <p>Cette application est encore en test.</p>
              <p>
                Pour connaître les étapes à suivre pour passer en production, veuillez{" "}
                <Link href="/docs/fournisseur-service" className={fr.cx("fr-link")}>
                  consulter la documentation
                </Link>
                .
              </p>
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
