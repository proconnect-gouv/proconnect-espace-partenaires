# Implémenter un Fournisseur de Données (FD)

## Utilisation

Un FD (ou Resource Server dans la terminologie OIDC) permet d'effectuer des actions au nom d'un utilisateur proConnecté et de renvoyer à un Fournisseur de Service des informations concernant l'utilisateur.

## Fonctionnement

1. L'utilisateur s'authentifie sur le FS via ProConnect selon le parcours classique .
2. Un `access_token` est renvoyé au FS. Cet `access_token` permet notamment d'authentifier l'appel au `userinfo_endpoint`.
3. Le FS appelle une route du FD pour effectuer une action. Par exemple, si le FD contient des informations sur les utilisateurs, il peut s'agir de la route `https://resource-server.fr/api/users`. Cet appel doit contenir l'`access_token` renvoyé par ProConnect lors de l'appel du FS au `token_endpoint`. L'usage est d'envoyer l'`access_token` en `Bearer` dans le header `Authorization`.
4. Le FD appelle le `introspection_endpoint` de ProConnect avec l'`access_token` selon les modalités indiquées dans [la RFC](https://www.rfc-editor.org/rfc/rfc7662.html#section-2). Le FD étant en réalité un cas spécifique d'un FS, **il faut que le FD soit enregistré auprès de ProConnect**.
5. Le FD reçoit un JSON en réponse, qui contient notamment deux champs utiles :

- `active`: défini si l'`access_token` est encore actif. Si le champ vaut `false`, ce sera le seul champ renvoyé par ProConnect
- `sub`: l'identifiant unique de l'utilisateur dans ProConnect

6. Le FD est maintenant capable d'identifier l'utilisateur et de lui renvoyer les données le concernant !

## Enregistrement auprès de ProConnect

Le FD doit d'abord suivre le processus d'inscription auprès de ProConnect **en tant que FS**.

Il doit ensuite écrire à support.partenaires@mail.proconnect.gouv.fr en spécifiant :

- le `client_id` de son FS qui lui aura été transmis après inscription
- `introspection_signed_response_alg` : HS256, ES256 ou RS256
- l'`introspection_encrypted_response_alg` : ECDH-ES ou RSA-OAEP
- `jwks_uri` : cf. "Signatures et chiffrements" ci-après

Une fois la réponse du Support reçue, votre FD est capable d'effectuer les appels à ProConnect !

## Signatures et chiffrements

### `introspection_signed_response_alg`

Indique comment ProConnect **signe** (JWS) le contenu de la réponse d’introspection.
Le FD vérifie l’intégrité et l'authenticité de la réponse avec le JWKS public de l'AS.

### `introspection_encrypted_response_alg`

Indique comment ProConnect **chiffre** (JWE) la réponse **pour le FD**. À toutes fins utiles, l'algorithme de chiffrement du contenu est A256GCM.

### `jwks_uri`

Le endpoint **de votre FD** qui expose la clef publique que ProConnect utilise pour **chiffrer** la réponse pour le FD. L'URI `/.well-known/jwks.json` est standard, mais n'est pas obligatoire.
