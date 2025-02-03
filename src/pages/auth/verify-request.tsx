import Head from "next/head";
import { fr } from "@codegouvfr/react-dsfr";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

export default function VerifyRequest() {
  return (
    <>
      <Head>
        <title>Vérifiez votre email | ProConnect</title>
      </Head>
      <div className={fr.cx("fr-py-6w")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
          <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
            <Alert
              severity="info"
              title="Vérifiez votre email"
              description="Un lien de connexion vous a été envoyé. Vérifiez votre boîte de réception et vos spams."
            />
          </div>
        </div>
      </div>
    </>
  );
} 