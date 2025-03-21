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
        text: "Implémentation technique",
        linkProps: {
          href: "/docs/fournisseur-service/implementation_technique",
        },
      },
      {
        text: "Recommandations parcours",
        linkProps: {
          href: "/docs/fournisseur-service/recommandation_parcours",
        },
      },
      {
        text: "Bouton ProConnect",
        linkProps: { href: "/docs/fournisseur-service/bouton_proconnect" },
      },
      {
        text: "Données fournies",
        linkProps: { href: "/docs/fournisseur-service/donnees_fournies" },
      },
      {
        text: "Scopes et claims",
        linkProps: { href: "/docs/fournisseur-service/scope-claims" },
      },
      {
        text: "Scope custom",
        linkProps: { href: "/docs/fournisseur-service/custom-scope" },
      },

      {
        text: "Connaître le FI utilisé",
        linkProps: {
          href: "/docs/fournisseur-service/connaitre-le-fi-utilise",
        },
      },
      {
        text: "Redirection vers un FI",
        linkProps: { href: "/docs/fournisseur-service/idp_hint_usage" },
      },
      {
        text: "Identifiants de test",
        linkProps: { href: "/docs/fournisseur-service/identifiants-fi-test" },
      },
      {
        text: "Remplir le DataPass",
        linkProps: { href: "/docs/fournisseur-service/datapass-fs" },
      },
      {
        text: "Migration AgentConnect",
        linkProps: {
          href: "/docs/fournisseur-service/changement-agentconnect-proconnect-fs",
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
        text: "Test de configuration",
        linkProps: { href: "/docs/fournisseur-identite/test-configuration-fi" },
      },
      {
        text: "Troubleshooting",
        linkProps: { href: "/docs/fournisseur-identite/troubleshooting-fi" },
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
        text: "Migration AgentConnect",
        linkProps: {
          href: "/docs/fournisseur-identite/changement-agentconnect-proconnect-fi",
        },
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
