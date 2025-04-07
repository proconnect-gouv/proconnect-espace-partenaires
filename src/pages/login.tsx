import { fr } from "@codegouvfr/react-dsfr";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(
    context.req as NextApiRequest,
    context.res as NextApiResponse,
    authOptions
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
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
      });

      if (result?.error) {
        setError("Une erreur est survenue. Veuillez réessayer.");
      } else if (result?.ok) {
        router.push("/auth/verify-request");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Connexion | ProConnect</title>
      </Head>
      <div className={fr.cx("fr-py-6w", "fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
          <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-col-lg-6")}>
            <div className={fr.cx("fr-card", "fr-p-4w")}>
              <h1>Connexion</h1>
              <p>
                Connectez-vous pour accéder à votre Espace Partenaire ProConnect et gérer vos
                applications.
              </p>

              {error && (
                <Alert severity="error" description={error} className={fr.cx("fr-mb-3w")} small />
              )}

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

              <p className={fr.cx("fr-mt-3w", "fr-text--sm")}>
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
