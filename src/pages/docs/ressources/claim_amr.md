# Le claim `amr` : méthodes d'authentification

Le claim `amr` (Authentication Methods References) est un tableau de chaînes de caractères présent dans l'ID token. Il décrit les méthodes d'authentification effectivement utilisées lors de la connexion.

- Un **Fournisseur d'Identité** le retourne pour décrire comment l'utilisateur s'est authentifié.
- Un **Fournisseur de Service** peut le lire pour adapter son parcours — par exemple, éviter de redemander un second facteur si la MFA a déjà été réalisée.

Contrairement à `acr` (niveau de confiance global), `amr` liste les méthodes concrètes utilisées. Les deux claims sont complémentaires.

## 1. Les valeurs `amr` dans ProConnect

ProConnect utilise les valeurs définies dans [RFC 8176 — Authentication Method Reference Values](https://www.rfc-editor.org/rfc/rfc8176) et dans [OpenID Connect EAP ACR Values 1.0](https://openid.net/specs/openid-connect-eap-acr-values-1_0.html), complétées par une extension propre à ProConnect pour le cas du lien magique. Ces valeurs sont enregistrées dans le [registre IANA AMR](https://www.iana.org/assignments/authentication-method-reference-values/authentication-method-reference-values.xhtml), qui fait référence.

### 1.1. Tableau des valeurs

| Valeur `amr` | Description                                                                                  | Exemples                                                       | Origine       |
| ------------ | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- |
| `pwd`        | Authentification par mot de passe.                                                           | Connexion ProConnect par mot de passe                          | RFC 8176      |
| `mail`       | Authentification via un secret transmis par email (lien magique ou code à usage unique).     | Code reçu par email, lien magique                              | ProConnect    |
| `otp`        | Authentification avec une application authenticator (TOTP/HOTP).                             | FreeOTP, Google Authenticator                                  | RFC 8176      |
| `pin`        | Code PIN ou schéma saisi pour déverrouiller une clé sur l'appareil.                          | PIN de carte agent, PIN d'application                          | RFC 8176      |
| `pop`        | Proof-of-possession d'une clé (hardware ou software non spécifié).                           | Passkey, carte agent                                           | OpenID EAP    |
| `hwk`        | Clé cryptographique ancrée dans un composant matériel de sécurité (non extractable).         | Carte agent, YubiKey, passkey non-synchronisé hardware-backed  | RFC 8176      |
| `swk`        | Clé cryptographique protégée par logiciel.                                                   | Passkey synchronisé (iCloud Keychain, Google Password Manager) | RFC 8176      |
| `mfa`        | Indique qu'une authentification multi-facteur a été réalisée. Accompagne les autres valeurs. | Combiné avec `otp`, `hwk`, `swk`…                              | RFC 8176      |

### 1.2. Le cas de `mail`

RFC 8176 ne définit pas de valeur standard pour les liens magiques ni pour l'email OTP. ProConnect a ajouté `mail` comme extension pour deux raisons :

- Permettre aux Fournisseurs d'Identité de déclarer ces méthodes d'authentification dans leur ID token.
- Permettre aux Fournisseurs de Service d'adapter leur parcours en conséquence. Par exemple pour éviter de redemander un OTP Mail s'il a déjà été demandé dans le parcours.

## 2. Demander le claim `amr` (Fournisseurs de Service)

Par défaut, `amr` n'est pas inclus dans l'ID token. Pour le demander explicitement en tant que Fournisseur de Service, ajoutez le paramètre suivant à votre requête `authorization_endpoint` :

| clé      | valeur                      |
| -------- | --------------------------- |
| `claims` | `{"id_token":{"amr":null}}` |

Pour plus d'informations sur les valeurs `amr` de FranceConnect, voir la [documentation FranceConnect](https://docs.partenaires.franceconnect.gouv.fr/fs/fs-technique/fs-technique-amr/#quels-sont-les-differents-methodes-d-authentification-qui-peuvent-etre-utilisees).
