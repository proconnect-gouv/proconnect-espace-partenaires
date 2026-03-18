import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";

export const docTree: SideMenuProps.Item[] = [
  {
    text: "Fournisseur de Service",
    //linkProps: { href: "/docs/fournisseur-service" },
    items: [
      {
        text: "Introduction",
        linkProps: { href: "/docs/fournisseur-service" },
      },

      {
        text: "Éligibilité",
        linkProps: {
          href: "/docs/fournisseur-service/eligibilite_installation",
        },
      },
      {
        text: "Table des matières",
        linkProps: {
          href: "/docs/fournisseur-service/table_matieres",
        },
      },
    ],
  },
  {
    text: "Fournisseur d'Identité",
    //linkProps: { href: "/docs/fournisseur-identite" },
    items: [
      {
        text: "Introduction",
        linkProps: { href: "/docs/fournisseur-identite" },
      },
      {
        text: "Table des matières",
        linkProps: { href: "/docs/fournisseur-identite/table_matieres" },
      },
    ],
  },
  {
    text: "Ressources communes",
    //linkProps: { href: "/docs/fournisseur-identite" },
    items: [
      {
        text: "Flux OpenID Connect",
        linkProps: { href: "/docs/ressources/flux_oidc" },
      },
      {
        text: "Valeur de PROCONNECT_DOMAIN",
        linkProps: { href: "/docs/ressources/valeur_ac_domain" },
      },
      {
        text: "Claim amr",
        linkProps: { href: "/docs/ressources/claim_amr" },
      },
      {
        text: "Glossaire",
        linkProps: { href: "/docs/ressources/glossaire" },
      },
    ],
  },
];
