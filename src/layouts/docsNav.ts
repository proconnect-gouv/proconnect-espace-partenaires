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
        text: "Recommandations de parcours",
        linkProps: {
          href: "/docs/fournisseur-service/recommandation_parcours",
        },
      },
      {
        text: "Implémentation technique",
        linkProps: {
          href: "/docs/fournisseur-service/implementation_technique",
        },
      },
      {
        text: "Remplir le DataPass",
        linkProps: { href: "/docs/fournisseur-service/datapass-fs" },
      },
      {
        text: "Ressources",
        items: [
          {
            text: "Aide et support",
            linkProps: {
              href: "/docs/fournisseur-service/aide_support",
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
            text: "Forcer la double authentification",
            linkProps: {
              href: "/docs/fournisseur-service/double_authentification",
            },
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
            text: "Préremplir l'email",
            linkProps: {
              href: "/docs/fournisseur-service/login_hint_usage",
            },
          },
          {
            text: "Identifiants de test",
            linkProps: {
              href: "/docs/fournisseur-service/identifiants-fi-test",
            },
          },
          {
            text: "Migration AgentConnect",
            linkProps: {
              href: "/docs/fournisseur-service/changement-agentconnect-proconnect-fs",
            },
          },
          {
            text: "Single Sign-On",
            linkProps: {
              href: "/docs/fournisseur-service/sso",
            },
          },
          {
            text: "Certification dirigeant",
            linkProps: {
              href: "/docs/fournisseur-service/certification-dirigeant",
            },
          },
          {
            text: "Obtenir des tokens pour le RIE",
            linkProps: {
              href: "/docs/fournisseur-service/fs_RIE",
            },
          },  
          {          
            text: "Niveaux d’assurance (ACR)",
            linkProps: {
              href: "/docs/fournisseur-service/niveaux-acr",
            },
          },
          {
            text: "Serveur de Ressources",
            linkProps: {
              href: "/docs/fournisseur-service/resource_server",
            },
          },
          {
            text: "Refresh token",
            linkProps: {
              href: "/docs/fournisseur-service/refresh-token",
            },
          },
          {
            text: "Erreurs récurrentes",
            linkProps: {
              href: "/docs/fournisseur-service/troubleshooting-fs",
            },
          },
        ],
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
