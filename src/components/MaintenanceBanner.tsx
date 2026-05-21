import { fr } from "@codegouvfr/react-dsfr";

export const MaintenanceBanner = () => {
  return (
    <div className={fr.cx("fr-container", "fr-my-10w")}>
      <div className={fr.cx("fr-alert", "fr-alert--info")}>
        <h3 className={fr.cx("fr-alert__title")}>Espace partenaire en maintenance</h3>
        <p>
          L’espace partenaire est temporairement indisponible en raison d’une opération de
          maintenance. Les modifications sont momentanément désactivées.
        </p>
      </div>
    </div>
  );
};
