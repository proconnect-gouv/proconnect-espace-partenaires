import { fr } from "@codegouvfr/react-dsfr";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import { OidcClient, pcdbClient } from "../../lib/pcdbapi";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const apps = await pcdbClient.listOidcClients(session.user.email);
    return { props: { apps } };
  } catch (error) {
    return { props: { apps: [], error: String(error) } };
  }
};

export default function AppsIndex({ apps, error }: { apps: OidcClient[]; error?: string }) {
  const [isCreating, setIsCreating] = useState(false);

  if (error) {
    return (
      <div className={fr.cx("fr-alert", "fr-alert--error", "fr-mb-3w", "fr-container")}>
        <p>{error}</p>
      </div>
    );
  }

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const response = await fetch("/api/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to create app");
      }

      const newApp = await response.json();
      window.location.href = `/apps/${newApp._id}`;
    } catch (error) {
      console.error("Failed to create app:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <section
        className={fr.cx("fr-pt-6w", "fr-pb-4w")}
        style={{
          backgroundColor: "var(--background-alt-blue-france)",
        }}
        id="apps-hero"
      >
        <div className={fr.cx("fr-container")}>
          <h1>Vos applications</h1>
          <p>Gérez vos applications OpenID Connect en cours de développement.</p>
        </div>
      </section>

      <div className={fr.cx("fr-my-4w", "fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--middle", "fr-grid-row--gutters")}>
          <div className={fr.cx("fr-col")}>
            <h2>Fournisseurs de Service</h2>
          </div>
        </div>

        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-pb-6w")}>
          {apps.length === 0 && (
            <div className={fr.cx("fr-col-12")}>
              <p>Aucun Fournisseur de Service n&rsquo;est encore associé à votre email.</p>
              <p>Vous pouvez en créer un avec le bouton ci-dessous.</p>
            </div>
          )}

          <div className={fr.cx("fr-col-12")}>
            <Button onClick={handleCreate} disabled={isCreating} iconId="fr-icon-add-line">
              {isCreating ? "Création en cours..." : "Créer un nouveau fournisseur de service"}
            </Button>
          </div>

          {apps.map((app) => (
            <div key={app._id} className={fr.cx("fr-col-12", "fr-col-md-6")}>
              <Card
                background
                border
                // desc={app.title || app.name}
                horizontal
                linkProps={{
                  href: `/apps/${app._id}`,
                }}
                size="small"
                start={
                  <>
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
                  </>
                }
                end={
                  <span className={fr.cx("fr-mb-0", "fr-text--xs")}>
                    {app.createdAt && app.updatedAt && (
                      <span className={fr.cx("fr-mb-0", "fr-text--md")}>
                        <strong>Date de création :</strong> {app.createdAt.substring(8, 10)}/
                        {app.createdAt.substring(5, 7)}/{app.createdAt.substring(0, 4)}
                        <br />
                        <strong>Date de mise à jour :</strong> {app.updatedAt.substring(8, 10)}/
                        {app.updatedAt.substring(5, 7)}/{app.updatedAt.substring(0, 4)}
                      </span>
                    )}
                  </span>
                }
                title={app.name}
                titleAs="h2"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
