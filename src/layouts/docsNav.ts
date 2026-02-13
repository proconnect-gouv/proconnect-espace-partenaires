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
        text: "Prérequis",
        linkProps: { href: "/docs/fournisseur-identite/prerequis-fi" },
      },
      {
        text: "Configuration",
        linkProps: { href: "/docs/fournisseur-identite/configuration" },
      },
      {
        text: "Ressources",
        items: [
          {
            text: "Test de configuration",
            linkProps: {
              href: "/docs/fournisseur-identite/test-configuration-fi",
            },
          },
          {
            text: "Plateformes et Hybridge",
            linkProps: { href: "/docs/fournisseur-identite/plateformes_fi" },
          },
          {
            text: "Certificats",
            linkProps: { href: "/docs/fournisseur-identite/certificats_fi" },
          },
          {
            text: "LemonLDAP",
            linkProps: {
              href: "/docs/fournisseur-identite/idp-configs/lemon-ldap",
            },
          },
          {
            text: "Keycloak",
            linkProps: {
              href: "/docs/fournisseur-identite/idp-configs/keycloak",
            },
          },
          {
            text: "Migration AgentConnect",
            linkProps: {
              href: "/docs/fournisseur-identite/changement-agentconnect-proconnect-fi",
            },
          },
          {
            text: "Erreurs récurrentes",
            linkProps: {
              href: "/docs/fournisseur-identite/troubleshooting-fi",
            },
          },
          {
            text: "Format de l'userinfo",
            linkProps: {
              href: "/docs/fournisseur-identite/format-user-info",
            },
          },
          {
            text: "Référentiel IP",
            linkProps: {
              href: "/docs/fournisseur-identite/referentiel-IP",
            },
          },
        ],
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
