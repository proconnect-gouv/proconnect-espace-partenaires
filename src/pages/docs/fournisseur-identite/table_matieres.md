# Table des matières de la documentation Fournisseurs d'Identité

Voici la table des matières de la documentation des Fournisseurs d'Identité ProConnect.

Avant toute chose, nous vous recommandons fortement de lire [notre page de processus pour intégrer ProConnect](./index.mdx).

## 🔧 1. Prérequis et éligibilité

→ _Vérifier les conditions d'éligibilité avant de commencer_

| Page                                                                  | Question                                                                                                                                        |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [Prérequis](./prerequis-fi.md)                                        | Quels sont les prérequis pour devenir Fournisseur d'Identité pour ProConnect ?                                                                  |
| [Plateformes et Hybridge](./plateformes_fi.md)                        | Quelle est la différence entre la plateforme Internet, la plateforme RIE et l'Hybridge ?                                                        |
| [Résolution de la Discovery URL (RIE)](./resolution_discovery_url.md) | Mon FI est sur le RIE mais n'a pas d'adresse en `rie.gouv.fr` ou `ader.gouv.fr` — comment permettre à ProConnect de résoudre ma Discovery URL ? |

## 🛠️ 2. Configuration et mise en service

→ _Configurer votre FI, tester l'intégration et supporter la MFA_

| Page                                                                 | Question                                                                                      |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Configuration](./configuration.md)                                  | Comment configurer OpenID Connect (OIDC) pour ProConnect en tant que Fournisseur d'Identité ? |
| [Authentification multi-facteur](./authentification-multifacteur.md) | Comment supporter l'authentification multi-facteur (MFA) exigée par certains FS ?             |
| [Test de configuration](./test-configuration-fi.md)                  | Comment tester la configuration de mon Fournisseur d'Identité ?                               |
| [Format de l'userinfo](./format-user-info.md)                        | Quelles contraintes ProConnect applique-t-il sur les identités retournées par les userinfos ? |
| [Certificats](./certificats_fi.md)                                   | Quels sont les certificats d'authentification utilisés par ProConnect ?                       |
| [Référentiel IP](./referentiel-IP.md)                                | Quelles adresses IP dois-je autoriser pour que ProConnect puisse contacter mon FI ?           |

## ⚙️ 3. Configurations spécifiques

→ _Adapter la configuration selon le logiciel utilisé_

| Page                                     | Question                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| [LemonLDAP](./idp-configs/lemon-ldap.md) | Comment configurer LemonLDAP pour fonctionner avec ProConnect ?           |
| [Keycloak](./idp-configs/keycloak.md)    | Comment configurer Keycloak pour fonctionner avec ProConnect ?            |
| [Entra ID](./idp-configs/entra-id.md)    | Comment configurer Entra ID (Azure AD) pour fonctionner avec ProConnect ? |

## 🆘 4. Aide et référence

→ _Trouver de l'aide en cas de problème ou de question_

| Page                                           | Question                                              |
| ---------------------------------------------- | ----------------------------------------------------- |
| [Erreurs récurrentes](./troubleshooting-fi.md) | J'ai un code d'erreur, comment le déchiffrer ?        |
| [Glossaire](./../ressources/glossaire.md)      | Quel est le glossaire de tous ces termes techniques ? |
