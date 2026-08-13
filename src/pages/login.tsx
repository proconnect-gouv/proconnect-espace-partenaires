import { fr } from "@codegouvfr/react-dsfr";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { ProConnectButton } from "@codegouvfr/react-dsfr/ProConnectButton";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(
    context.req as NextApiRequest,
    context.res as NextApiResponse,
    authOptions,
  );

  // Redirect to apps if already authenticated
  if (session) {
    return {
      redirect: {
        destination: "/apps",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function Login() {
  const [authenticationError, setAuthenticationError] = useState("");
  const router = useRouter();
  const oidcCallbackError = router.query.error as string | undefined;

  const handleProConnectLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAuthenticationError("");

    try {
      await signIn("proconnect", {
        callbackUrl: "/apps",
      });
    } catch {
      setAuthenticationError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <>
      <NextSeo title="Connexion" />
      <div className={fr.cx("fr-py-6w", "fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
          <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-col-lg-6")}>
            <div className={fr.cx("fr-card", "fr-p-4w")} style={{ textAlign: "center" }}>
              <h1>Connexion</h1>
              <p>
                Connectez-vous pour accéder à votre Espace Partenaires ProConnect et gérer vos
                applications.
              </p>

              {(oidcCallbackError || authenticationError) && (
                <Alert
                  severity="error"
                  description={oidcCallbackError || authenticationError}
                  className={fr.cx("fr-mb-3w")}
                  small
                />
              )}
              <ProConnectButton onClick={handleProConnectLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
