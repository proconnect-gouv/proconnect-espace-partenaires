# Table des matières de la documentation Fournisseurs d'Identité

Voici la table des matières de la documentation des Fournisseurs d'Identité ProConnect.

Avant toute chose, nous vous recommandons fortement de lire [notre page de processus pour intégrer ProConnect](./index.mdx).

## 🔧 1. Prérequis et éligibilité

→ _Vérifier les conditions d'éligibilité avant de commencer_

| Page                                                                  | Question                                                                                                                                                             |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Prérequis](./prerequis-fi.md)                                        | Quels sont les prérequis pour devenir Fournisseur d'Identité pour ProConnect ?                                                                                       |
| [Plateformes et Hybridge](./plateformes_fi.md)                        | Quelle est la différence entre la plateforme Internet, la plateforme RIE et l'Hybridge ?                                                                             |
| [Résolution de la Discovery URL (RIE)](./resolution_discovery_url.md) | Mon FI est sur le RIE mais n'a pas d'adresse en `rie.gouv.fr` ou `ader.gouv.fr` : comment permettre à ProConnect de résoudre le nom de domaine de ma discovery URL ? |

## 🛠️ 2. Configuration et mise en service

→ _Configurer votre FI et tester l'intégration_

| Page                                                                          | Question                                                                                                          |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Flux OpenID Connect](../ressources/flux_oidc.md) _(ressource commune FS/FI)_ | Comment se déroule techniquement l'échange OpenID Connect (OIDC) entre mon Fournisseur d'Identité et ProConnect ? |
| [Configuration](./configuration.md)                                           | Comment configurer OpenID Connect (OIDC) pour ProConnect en tant que Fournisseur d'Identité ?                     |
| [Valeur de PROCONNECT_DOMAIN](../ressources/valeur_ac_domain.md)              | Quelle est la valeur de PROCONNECT_DOMAIN selon mon réseau et mon environnement ?                                 |
| [Test de configuration](./test-configuration-fi.md)                           | Comment tester la configuration de mon Fournisseur d'Identité ?                                                   |
| [Format de l'userinfo](./format-user-info.md)                                 | Quelles contraintes ProConnect applique-t-il sur les identités retournées par les userinfos ?                     |
| [Certificats](./certificats_fi.md)                                            | Quels sont les certificats d'authentification utilisés par ProConnect ?                                           |
| [Référentiel IP](./referentiel-IP.md)                                         | Quelles adresses IP dois-je autoriser pour que ProConnect puisse contacter mon FI ?                               |

## 🔒 3. Sécurité et authentification

→ _Comprendre et configurer les niveaux de confiance et l'authentification multi-facteur_

| Page                                                                                     | Question                                                                                                                                     |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [Authentification multi-facteur (MFA)](../ressources/mfa.md) _(ressource commune FS/FI)_ | Qu'est-ce que l'authentification multi-facteur (MFA) et quels sont les différents moyens de s'authentifier ?                                 |
| [Norme eIDAS](../ressources/norme_eidas.md) _(ressource commune FS/FI)_                  | Quels sont les trois piliers de la norme eIDAS (identité, authentification, organisation), les méthodes MFA et le cas particulier d'eidas0 ? |
| [niveaux de confiance (eidas)](./acr-eidas.md)                                           | Qu'est-ce que l'ACR ? Que signifient les niveaux eidas0, eidas1, eidas2, eidas3 ?                                                            |
| [Authentification multi-facteur](./authentification-multifacteur.md)                     | Comment supporter l'authentification multi-facteur (MFA) exigée par certains FS ?                                                            |
| [Claim AMR](../ressources/claim_amr.md) _(ressource commune FS/FI)_                      | Quelles sont les valeurs `amr` utilisées dans ProConnect et lesquelles sont standard ?                                                       |
| [Conformité MFA - Feuille de Route Cyber ANSSI 2026-2027](./2026_03_conformite_mfa.md)   | Comment vérifier que mon FI est conforme à l'obligation MFA de l'ANSSI avant le 28 février 2027 ?                                            |

## ⚙️ 4. Configurations spécifiques

→ _Adapter la configuration selon le logiciel utilisé_

| Page                                     | Question                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| [LemonLDAP](./idp-configs/lemon-ldap.md) | Comment configurer LemonLDAP pour fonctionner avec ProConnect ?           |
| [Keycloak](./idp-configs/keycloak.md)    | Comment configurer Keycloak pour fonctionner avec ProConnect ?            |
| [Entra ID](./idp-configs/entra-id.md)    | Comment configurer Entra ID (Azure AD) pour fonctionner avec ProConnect ? |

## 🆘 5. Aide et référence

→ _Trouver de l'aide en cas de problème ou de question_

| Page                                           | Question                                              |
| ---------------------------------------------- | ----------------------------------------------------- |
| [Erreurs récurrentes](./troubleshooting-fi.md) | J'ai un code d'erreur, comment le déchiffrer ?        |
| [Glossaire](./../ressources/glossaire.md)      | Quel est le glossaire de tous ces termes techniques ? |
