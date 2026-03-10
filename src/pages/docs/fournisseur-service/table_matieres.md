# Table des matières de la documentation Fournisseurs de Service

Voici la table des matières de la documentation des Fournisseurs de Service ProConnect.

Avant toute chose, nous vous recommandons fortement de lire [notre page de processus pour intégrer ProConnect](./index.mdx).

## ⚖️ 1. Éligibilité et contractualisation

→ _Vérifier que votre cas d'usage est éligible et formaliser votre entrée dans la fédération_

| Page                                                  | Question                                                                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Éligibilité](./eligibilite_installation.md)          | Suis-je éligible à utiliser le bouton ProConnect pour mon application ?                                 |
| [Couverture ProConnect](./couverture-proconnect.md)   | Qui peut se connecter (et qui ne peut pas se connecter) à ProConnect ?                                  |
| [DataPass](./datapass-fs.md)                          | Comment remplir le DataPass, qui fait office de contractualisation entre mon organisation et la DINUM ? |
| [Règles de design](./recommandation_parcours.md)      | Quelles règles de design de parcours dois-je respecter impérativement ?                                 |
| [Serveurs Internet / RIE](./serveurs_internet_rie.md) | Quelle est la différence entre les serveurs Internet et les serveurs RIE ?                              |

## 🔧 2. Mise en service

→ _Obtenir ses clés, brancher le bouton, tester son intégration_

Nous vous recommandons de lire [notre page généraliste sur l'implémentation technique](./implementation_technique.md) pour avoir un aperçu précis et généraliste de l'implémentation ProConnect.

| Page                                                         | Question                                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| [Bouton ProConnect](./bouton_proconnect.md)                  | Où se trouve le code html ou le composant du bouton ProConnect ?                      |
| [Identifiants de test](./identifiants-fi-test.md)            | Quels identifiants de test puis-je utiliser ?                                         |
| [Clés sur le RIE](./fs_RIE.md)                               | Comment obtenir un client_id et client_secret pour une application sur le RIE ?       |
| [Modifier les redirect_uri](./modification_redirect_uris.md) | Comment modifier des redirect_uri de ma configuration — intégration ou production — ? |
| [Serveurs Internet / RIE](./serveurs_internet_rie.md)        | Quelle est la différence entre les serveurs Internet et les serveurs RIE ?            |

## 🔐 3. Authentification et sessions

→ _Comprendre comment ProConnect gère la connexion et la durée de session_

| Page                                       | Question                                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| [SSO](./sso.md)                            | Comment fonctionne l'authentification unique (SSO) de ProConnect ?                    |
| [Refresh token](./refresh-token.md)        | Comment prolonger la durée d'accès aux utilisateurs ProConnect via le refresh_token ? |
| [Niveaux ACR](./niveaux-acr.md)            | À quoi correspondent les niveaux d'assurance d'authentification ACR ?                 |
| [FI utilisé](./connaitre-le-fi-utilise.md) | Comment savoir avec quel Fournisseur d'Identité s'est authentifié mon utilisateur ?   |

## 👤 4. Données utilisateur

→ _Connaître les données disponibles sur les pros et comment les récupérer_

| Page                                      | Question                                                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Données fournies](./donnees_fournies.md) | Quelles sont les données fournies par ProConnect sur l'utilisateur ?                                |
| [Scopes et claims](./scope-claims.md)     | Quels scopes et claims utiliser ?                                                                   |
| [Scope custom](./custom-scope.md)         | Comment récupérer les données non canoniques qui seraient renvoyées par un FI via le scope custom ? |

## ✨ 5. Fonctionnalités avancées

→ _Personnaliser le parcours et accéder à des niveaux de confiance renforcés_

| Page                                                                                   | Question                                                                                                                                     |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [MFA](./double_authentification.md)                                                    | Comment forcer la double authentification ou la Multi Factor Authentication (MFA) ?                                                          |
| [Certification dirigeant](./certification-dirigeant.md)                                | Qu'est-ce que la certification dirigeant et comment l'implémenter ?                                                                          |
| [Design certification dirigeant](./recommandation_parcours_certification_dirigeant.md) | Quelles règles de design de parcours dois-je respecter pour la certification dirigeant ?                                                     |
| [idp_hint](./idp_hint_usage.md)                                                        | Comment spécifier à ProConnect que les usagers de mon FS doivent être redirigés directement vers un Fournisseur d'Identité (FI) spécifique ? |
| [login_hint](./login_hint_usage.md)                                                    | Comment préremplir l'adresse email dans la mire de connexion ProConnect ?                                                                    |
| [siret_hint](./siret_hint_usage.md)                                                    | Comment spécifier à ProConnect que les usagers de mon FS doivent se voir suggérer une organisation spécifique à sélectionner ?               |
| [Serveur de ressources](./resource_server.md)                                          | Comment implémenter un Serveur de Ressources ?                                                                                               |
| [Niveaux ACR](./niveaux-acr.md)                                                        | À quoi correspondent les niveaux d'assurance d'authentification ACR ?                                                                        |

## 🆘 6. Aide

→ _Trouver de l'aide en cas de problème ou de question_

| Page                                         | Question                                                                                      |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Messages d'erreur](./troubleshooting-fs.md) | J'ai un message d'erreur, comment le déchiffrer ?                                             |
| [Service partenaires](./aide_support.md)     | J'aimerais contacter le service partenaires de ProConnect pour de l'aide ou pour une question |
| [Glossaire](./../ressources/glossaire.md)    | Quel est le glossaire de tous ces termes techniques ?                                         |
