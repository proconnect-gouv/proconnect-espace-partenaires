# niveaux de confiance (eidas) pour les Fournisseurs d'Identité

## 1. Norme eIDAS commune

> [!NOTE]
> Chaque niveau `eidas` combine trois critères : identité personnelle, type et sécurisation de l'authentification, lien à l'organisation. Le détail de ces critères et des exemples commentés sont disponibles dans la note dédiée : [Norme eIDAS : niveaux de confiance](../ressources/norme_eidas.md).

## 2. Qu'est-ce que l'ACR ?

**ACR** (_Authentication Context Reference_) est un champ standard d'OpenID Connect. Il représente le **niveau de confiance** d'une authentification. Autrement dit, la qualité de la preuve que l'utilisateur est bien qui il prétend être.

En pratique :

- Votre FI retourne une valeur `acr` dans l'ID token pour indiquer le contexte d'authentification de l'utilisateur : identité, authentification, organisation.
- ProConnect transmet cette valeur aux Fournisseurs de Service.

Un fait important est **qu'un Fournisseur de Service peut exiger un niveau minimum** avant d'autoriser l'accès (exemple : exiger une authentification multi-facteur). Si votre Fournisseur d'Identité est mal configuré, il ne renverra pas les bons niveaux d'ACR et vos utilisateurs se retrouveront bloqués.

## 3. Les niveaux de confiance en un coup d'oeil

ProConnect communique le niveau de confiance d'une authentification via l'attribut `acr`. Chaque niveau est défini selon trois axes :

- **Identité** : quelle est la qualité de preuve de l'identité de l'utilisateur ?
- **Authentification** : comment l'utilisateur s'est-il authentifié ?
- **Organisation** : quel est le lien entre l'utilisateur et son organisation ?

| Valeur `acr` | Identité              | Authentification      | Organisation                            |
| ------------ | --------------------- | --------------------- | --------------------------------------- |
| `eidas0`     | Faible ou déclarative | Simple (mot de passe) | Modération ou déclaratif                |
| `eidas0-mfa` | Faible ou déclarative | MFA faible            | Modération ou déclaratif                |
| `eidas1`     | Faible                | Simple (mot de passe) | Modération ou plus                      |
| `eidas1-mfa` | Faible                | MFA faible            | Modération ou plus                      |
| `eidas2`     | Substantielle         | MFA forte             | Lien certifié par une source officielle |
| `eidas3`     | Élevée                | MFA forte matérielle  | Lien certifié par une source officielle |

## 4. Ce que cela signifie pour un FI

En tant que Fournisseur d'Identité, vous maîtrisez les trois piliers : l'identité de vos agents est vérifiée à l'embarquement, et leur rattachement à l'organisation est certifié par vos processus RH. Ces deux piliers sont donc toujours au niveau maximum pour les niveaux eidas1, eidas2 et eidas3.

En pratique, **le niveau que vous retournez est déterminé par la méthode d'authentification que vous proposez** :

| Méthode d'authentification    | Niveau retourné | Exemples                                           |
| ----------------------------- | --------------- | -------------------------------------------------- |
| Simple (mot de passe)         | `eidas1`        | Mot de passe seul                                  |
| MFA faible (géré par l'agent) | `eidas1-mfa`    | SMS OTP, email OTP                                 |
| MFA forte                     | `eidas2`        | TOTP, push notification, passkey                   |
| MFA forte matérielle          | `eidas3`        | Carte à puce + PIN, clé FIDO2 matérielle (YubiKey) |

Pour le détail des méthodes MFA qui atteignent eidas2 ou eidas3 (et pourquoi certaines n'atteignent pas eidas3), voir [Norme eIDAS : La méthode d'authentification](../ressources/norme_eidas.md#4-la-méthode-dauthentification).

Pour implémenter la MFA côté FI, voir [Authentification multi-facteur](./authentification-multifacteur.md).

### 4.1. La distinction eidas1-mfa / eidas2

La frontière repose sur la force cryptographique du second facteur :

- **Force cryptographique** (Guide ANSSI) : eidas2 requiert un facteur cryptographiquement fort (TOTP, FIDO2…). Un SMS OTP, canal non sécurisé, n'y atteint pas.

| Niveau       | Second facteur                    | Exemple                          |
| ------------ | --------------------------------- | -------------------------------- |
| `eidas1-mfa` | MFA faible (pas de crypto fort)   | SMS OTP, email OTP               |
| `eidas2`     | MFA forte (protocole crypto fort) | TOTP, push notification, passkey |
