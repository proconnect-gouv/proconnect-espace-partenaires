# Table des matières de la documentation Fournisseurs de Service

Voici la table des matières de la documentation des Fournisseurs de Service ProConnect.

Avant toute chose, nous vous recommandons fortement de lire [notre page de processus pour intégrer ProConnect](./index.mdx).

## ⚖️ 1. Éligibilité et contractualisation

→ *Vérifier que votre cas d'usage est éligible et formaliser votre entrée dans la fédération*

- [Suis-je éligible à utiliser le bouton ProConnect pour mon application ?](./eligibilite_installation.md)
- [Qui peut se connecter (et qui ne peut pas se connecter) à ProConnect ?](./couverture-proconnect.md)
- [Comment remplir le DataPass, qui fait office de contractualisation entre mon organisation et la DINUM ?](./datapass-fs.md)
- [Quelles règles de design de parcours dois-je respecter impérativement ?](./recommandation_parcours.md)
- [Quelle est la différence entre les serveurs Internet et les serveurs RIE ?](./serveurs_internet_rie.md)

## 🔧 2. Mise en service

→ *Obtenir ses clés, brancher le bouton, tester son intégration*

Nous vous recommandons de lire [notre page généraliste sur l'implémentation technique](./implementation_technique.md) pour avoir un aperçu précis et généraliste de l'implémentation ProConnect.

- [Où se trouve le code html ou le composant du bouton ProConnect ?](./bouton_proconnect.md)
- [Quels identifiants de test puis-je utiliser ?](./identifiants-fi-test.md)
- [Comment obtenir un client_id et client_secret pour une application sur le RIE ?](./fs_RIE.md)
- [Comment modifier des redirect_uri de ma configuration — intégration ou production — ?](./modification_redirect_uris.md)
- [Quelle est la différence entre les serveurs Internet et les serveurs RIE ?](./serveurs_internet_rie.md)

## 🔐 3. Authentification et sessions

→ *Comprendre comment ProConnect gère la connexion et la durée de session*

- [Comment fonctionne l'authentification unique (SSO) de ProConnect ?](./sso.md)
- [Comment prolonger la durée d'accès aux utilisateurs ProConnect via le refresh_token ?](./refresh-token.md)
- [À quoi correspondent les niveaux d'assurance d'authentification ACR ?](./niveaux-acr.md)
- [Comment savoir avec quel Fournisseur d'Identité s'est authentifié mon utilisateur ?](./connaitre-le-fi-utilise.md)

## 👤 4. Données utilisateur

→ *Connaître les données disponibles sur l'agent et comment les récupérer*

- [Quelles sont les données fournies par ProConnect sur l'utilisateur ?](./donnees_fournies.md)
- [Quels scopes et claims utiliser ?](./scope-claims.md)
- [Comment récupérer les données non canoniques qui seraient renvoyées par un FI via le scope custom ?](./custom-scope.md)

## ✨ 5. Fonctionnalités avancées

→ *Personnaliser le parcours et accéder à des niveaux de confiance renforcés*

- [Comment forcer la double authentification ?](./double_authentification.md)
- [Qu'est-ce que la certification dirigeant et comment l'implémenter ?](./certification-dirigeant.md)
- [Quelles règles de design de parcours dois-je respecter pour la certification dirigeant ?](./recommandation_parcours_certification_dirigeant.md)
- [Comment spécifier à ProConnect que les usagers de mon FS doivent être redirigés directement vers un Fournisseur d'Identité (FI) spécifique ?](./idp_hint_usage.md)
- [Comment préremplir l'adresse email dans la mire de connexion ProConnect ?](./login_hint_usage.md)
- [Comment spécifier à ProConnect que les usagers de mon FS doivent se voir suggérer une organisation spécifique à sélectionner ?](./siret_hint_usage.md)
- [Comment implémenter un Serveur de Ressources ?](./resource_server.md)
- [À quoi correspondent les niveaux d'assurance d'authentification ACR ?](./niveaux-acr.md)

## 🆘 6. Aide

→ *Trouver de l'aide en cas de problème ou de question*

- [J'ai un message d'erreur, comment le déchiffrer ?](./troubleshooting-fs.md)
- [J'aimerais contacter le service partenaires de ProConnect pour de l'aide ou pour une question](./aide_support.md)
- [Quel est le glossaire de tous ces termes techniques ?](./../ressources/glossaire.md)
