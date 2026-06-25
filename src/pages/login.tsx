import { fr } from "@codegouvfr/react-dsfr";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
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
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkError, setMagicLinkError] = useState("");
  const router = useRouter();
  const proConnectError = router.query.error as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMagicLinkError("");

    try {
      await signIn("email", {
        email,
        callbackUrl: "/apps",
      });
    } catch {
      setMagicLinkError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NextSeo title="Connexion" />
      <div className={fr.cx("fr-py-6w", "fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
          <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-col-lg-6")}>
            <div className={fr.cx("fr-card", "fr-p-4w")}>
              <h1>Connexion</h1>
              <p>
                Connectez-vous pour accéder à votre Espace Partenaire ProConnect et gérer vos
                applications.
              </p>

              {(proConnectError || magicLinkError) && (
                <Alert
                  severity="error"
                  description={proConnectError || magicLinkError}
                  className={fr.cx("fr-mb-3w")}
                  small
                />
              )}

              <div style={{ textAlign: "center" }}>
                <ProConnectButton onClick={() => signIn("proconnect", { callbackUrl: "/apps" })} />
              </div>

              <div className="divider">ou</div>

              <form onSubmit={handleSubmit}>
                <Input
                  label="Email professionnel"
                  nativeInputProps={{
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value.trim()),
                    required: true,
                    autoComplete: "email",
                    disabled: isLoading,
                  }}
                />
                <div className={fr.cx("fr-mt-2w")}>
                  <Button type="submit" disabled={isLoading || !email}>
                    {isLoading ? "Envoi en cours..." : "Recevoir un lien de connexion"}
                  </Button>
                </div>
              </form>

              <p className={fr.cx("fr-mt-3w", "fr-mb-0", "fr-text--sm")}>
                Un lien de connexion sécurisé vous sera envoyé par email.
                <br />
                Ce lien est valable 24 heures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
