# Qu'est-ce que l'authentification multi-facteur (MFA) ?

Cette page présente la MFA de façon générale, sans rentrer dans l'implémentation technique. Elle s'adresse en priorité aux équipes sécurité et métier, mais reste utile aux Fournisseurs d'Identité (FI) et Fournisseurs de Service (FS) souhaitant une vue d'ensemble avant de passer aux pages techniques.

## 1. Qu'est-ce que la MFA ?

L'authentification multi-facteur (MFA) consiste à vérifier l'identité d'un utilisateur à l'aide d'au moins deux preuves (facteurs) appartenant à des catégories différentes :

- **Connaissance** : quelque chose que l'on sait (mot de passe, code PIN)
- **Possession** : quelque chose que l'on possède (téléphone, carte à puce, clé physique)
- **Inhérence** : quelque chose que l'on est (empreinte digitale, reconnaissance faciale)

> [!NOTE]
> Deux facteurs de la même catégorie ne constituent pas une MFA. Par exemple, un mot de passe et une question secrète sont tous les deux des facteurs de connaissance : ce n'est pas de la MFA.

## 2. Les différents types de MFA

Une MFA combine au moins deux méthodes d'authentification de catégories différentes. Voici les méthodes les plus courantes et leur catégorie :

| Méthode                                | Catégorie                                             | Exemple concret                                         |
| --------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| Mot de passe                            | Connaissance                                            | Mot de passe classique                                   |
| Code PIN                                | Connaissance                                            | PIN de carte, PIN d'application                          |
| Question secrète                        | Connaissance                                            | « Nom de votre premier animal ? »                         |
| Code reçu par SMS                       | Possession (téléphone)                                  | Code à 6 chiffres envoyé par SMS                          |
| Code reçu par email                     | Possession (boîte mail)                                 | Code ou lien magique envoyé par email                    |
| Application d'authentification (TOTP)   | Possession (secret cryptographique sur l'appareil)      | Google Authenticator, FreeOTP                             |
| Notification push                       | Possession                                              | Microsoft Authenticator                                   |
| Jeton matériel OTP                      | Possession                                              | Token RSA/Gemalto à écran                                  |
| Clé d'accès (passkey) synchronisée      | Possession (clé copiable entre appareils)               | Trousseau iCloud, Google Password Manager                 |
| Clé d'accès (passkey) liée à un appareil| Possession (clé non exportable)                         | Clé stockée dans la puce sécurisée d'un téléphone          |
| Carte à puce professionnelle            | Possession (clé non extractible)                        | Carte agent + certificat                                   |
| Clé de sécurité physique                | Possession (clé non extractible)                        | YubiKey                                                     |
| Empreinte digitale                      | Inhérence                                               | Touch ID, capteur d'empreinte                              |
| Reconnaissance faciale                  | Inhérence                                               | Face ID                                                     |

Toutes les MFA ne se valent pas pour autant : selon le second facteur choisi, la robustesse face à un attaquant varie fortement. Cette robustesse dépend de trois éléments :

- **La solidité cryptographique** du second facteur : un code reçu par SMS ou email n'est pas chiffré de bout en bout et peut être intercepté, alors qu'une application TOTP ou une passkey repose sur un mécanisme cryptographique.
- **Qui contrôle le facteur** : une clé qui ne peut jamais quitter un appareil physique (carte à puce, clé de sécurité) offre une garantie plus fiable qu'une clé synchronisée entre plusieurs appareils via le cloud.
- **La résistance aux attaques** : un facteur matériel non extractible résiste à des attaquants plus déterminés qu'un facteur logiciel.

> [!NOTE]
> Le saviez-vous ? Il existe un moyen de savoir avec quel type de MFA la personne s'est authentifiée, avec le claim `amr`, plus d'information dans la page dédiée : [Claim AMR](./claim_amr.md)


## 3. Pourquoi la MFA est-elle importante pour ProConnect ?

La sécurisation de la connexion est un enjeu important pour ProConnect. C'est un des trois pilliers des niveaux `eidas` de ProConnect. Pour plus de détails sur comment la MFA s'insère dans les niveaux `eidas` de ProConnect, voici la note dédiée : [Norme eIDAS : niveaux de confiance](./norme_eidas.md).

Concrètement, dans ProConnect :

- Un **Fournisseur de Service** peut exiger que ses utilisateurs s'authentifient avec un second facteur. Plus d'information sur comment un Fournisseur de Service peut exiger le second facteur : [Double authentification pour les Fournisseurs de Service](../fournisseur-service/double_authentification.md)
- Un **Fournisseur d'Identité** doit être capable de proposer cette authentification et de signaler, via le niveau de confiance eIDAS retourné, quelle robustesse de MFA a réellement été utilisée. Plus d'information sur comment paramétrer l'authentification multifacteur en tant que FI : [Authentification multi-facteur pour les Fournisseurs d'Identité](../fournisseur-identite/authentification-multifacteur.md)

## 4. Pour aller plus loin

Voici un récapitlatif des pages liées à la MFA dans la documentation ProConnect :

| Page                                                                                           | Pour qui    | Contenu                                                                     |
| ------------------------------------------------------------------------------------------------ | ----------- | ---------------------------------------------------------------------------- |
| [Norme eIDAS : niveaux de confiance](./norme_eidas.md)                                           | FI et FS    | Comment ProConnect traduit la robustesse de la MFA dans les niveaux `eidas` |
| [Claim AMR](./claim_amr.md)                                                                       | FI et FS    | La liste technique des méthodes d'authentification (`amr`) renvoyées par ProConnect |
| [Authentification multi-facteur pour les Fournisseurs d'Identité](../fournisseur-identite/authentification-multifacteur.md) | FI          | Ce qu'un FI doit implémenter et retourner pour supporter la MFA            |
| [Double authentification pour les Fournisseurs de Service](../fournisseur-service/double_authentification.md) | FS          | Comment un FS exige la MFA auprès de ses utilisateurs                      |
