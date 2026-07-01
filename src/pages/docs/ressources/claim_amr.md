# Le claim `amr` : méthodes d'authentification

Le claim `amr` (Authentication Methods References, défini dans [RFC 8176](https://www.rfc-editor.org/rfc/rfc8176)) est un tableau de chaînes de caractères présent dans l'ID token. Il décrit les méthodes d'authentification effectivement utilisées lors de la connexion.

- Un **Fournisseur d'Identité** le retourne pour décrire comment l'utilisateur s'est authentifié.
- Un **Fournisseur de Service** peut le lire pour adapter son parcours — par exemple, éviter de redemander un second facteur si la MFA a déjà été réalisée.

Contrairement à `acr` (niveau d'assurance global), `amr` liste les méthodes concrètes utilisées. Les deux claims sont complémentaires.

## 1. Les valeurs `amr` dans ProConnect

| Valeur `amr` | Description | Statut |
| ------------ | ----------- | ------ |
| `pwd`        | Authentification par mot de passe. En complément, un OTP peut être envoyé par email si le navigateur n'est pas enrôlé. | RFC 8176 |
| `mail`       | Authentification par email reçu. | Extension ProConnect |
| `otp`        | Authentification avec une application authenticator (TOTP/HOTP, ex. FreeOTP). | RFC 8176 |
| `pop`        | Authentification avec une clé d'accès (Passkey) ou une carte agent. | Extension ProConnect |
| `mfa`        | Indique qu'une authentification multi-facteur a été réalisée. Accompagne les autres valeurs. | RFC 8176 |

> [!NOTE]
> `mail` et `pop` sont des extensions propres à ProConnect. Les valeurs RFC 8176 équivalentes seraient respectivement inexistante pour le lien magique, et `hwk` / `swk` pour les clés d'accès. Il n'existe pas de valeur `amr` standard pour l'email OTP dans RFC 8176.

## 2. Demander le claim `amr` (Fournisseurs de Service)

Par défaut, `amr` n'est pas inclus dans l'ID token. Pour le demander explicitement, ajoutez le paramètre suivant à votre requête `authorization_endpoint` :

| clé      | valeur                      |
| -------- | --------------------------- |
| `claims` | `{"id_token":{"amr":null}}` |

Pour plus d'informations sur les valeurs `amr` de FranceConnect, voir la [documentation FranceConnect](https://docs.partenaires.franceconnect.gouv.fr/fs/fs-technique/fs-technique-amr/#quels-sont-les-differents-methodes-d-authentification-qui-peuvent-etre-utilisees).
