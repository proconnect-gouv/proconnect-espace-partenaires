# Refresh token

## Utilité

Le mécanisme de Refresh token permet au Fournisseur de Service (FS) de pouvoir récupérer des informations utilisateurs auprès de ProConnect (PC) **après** l'expiration de l'`access_token` initialement émis lors de la connexion de l'utilisateur.

### Mécanisme

1. Lors de l'appel au `token_endpoint` (cf. [2.3.3. Génération du token](./implementation_technique.md)), PC renvoie entre autres le champ `refresh_token`.
2. Le FS stocke le `refresh_token` dans la session utilisateur **côté serveur** (afin d'éviter le vol de `refresh_token` par injection XSS par exemple).
3. Lorsque le FS souhaite récupérer des informations utilisateurs, il se retrouve dans une des trois situations suivantes :

- l'`access_token` n'a pas encore expiré (temps écoulé depuis la génération du token < 1 heure): il peut appeler le `userinfo_endpoint` à l'aide de l'`access_token` (cf. [2.3.6. Récupération des user info](./implementation_technique.md))
- l'`access_token` a expiré, mais pas le refresh_token (temps écoulé depuis la génération du token >= 1 heure mais < 2 heures) : il peut appeler le `token_endpoint` en POST avec les paramètres suivants pour récupérer un nouvel `access_token` et un nouveau `refresh_token` (comme spécifié par [la RFC - section Refresh Tokens](https://openid.net/specs/openid-connect-core-1_0.html#RefreshTokens)) :
  - `client_id=...`
  - `client_secret=...`
  - `grant_type=refresh_token`
  - `refresh_token=...`
  - `scopes=...`
- le `refresh_token` a expiré (temps écoulé depuis la génération du token >= 2 heures) : l'utilisateur doit effectuer une nouvelle connexion
