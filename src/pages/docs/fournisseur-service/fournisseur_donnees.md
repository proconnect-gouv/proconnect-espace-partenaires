# Implémenter un Fournisseur de Données (FD)

## Utilisation

Un FD (ou Resource Server dans la terminologie OIDC) permet d'effectuer des actions au nom d'un utilisateur proConnecté et de renvoyer à un Fournisseur de Service des informations concernant l'utilisateur.

## Fonctionnement

1. L'utilisateur s'authentifie sur le FS via ProConnect selon le parcours classique .
2. Un `access_token` est renvoyé au FS. Cet `access_token` permet notamment d'authentifier l'appel au `userinfo_endpoint`.
3. Le FS appelle une route du FD pour effectuer une action. Par exemple, si le FD contient des informations sur les utilisateurs, il peut s'agir de la route `https://resource-server.fr/api/users`. Cet appel doit contenir l'`access_token` renvoyé par ProConnect lors de l'appel du FS au `token_endpoint`. L'usage est d'envoyer l'`access_token` en `Bearer` dans le header `Authorization`.
4. Le FD appelle l`introspection_endpoint` de ProConnect avec l'`access_token` selon les modalités indiquées dans [la RFC](https://www.rfc-editor.org/rfc/rfc7662.html#section-2). Le FD étant en réalité un cas spécifique d'un FS, **il faut que le FD soit enregistré auprès de ProConnect**.
5. Le FD reçoit en réponse de l'`introspection_endpoint un JSON qui contient notamment deux champs utiles :

- `active`: défini si l'`access_token` est encore actif. Si le champ vaut `false`, ce sera le seul champ renvoyé par ProConnect
- `sub`: l'identifiant unique de l'utilisateur dans ProConnect

6. Le FD est maintenant capable d'identifier l'utilisateur et de lui renvoyer les données le concernant !

## Enregistrement auprès de ProConnect

Le FD doit d'abord suivre le processus d'inscription auprès de ProConnect **en tant que FS**.

Il doit ensuite écrire à support.partenaires@mail.proconnect.gouv.fr en spécifiant :

- le `client_id` de son FS qui lui aura été transmis après inscription
- l'`introspection_signed_response_alg` : RS256, HS256 ou ES256. Si vous ne savez pas quoi choisir, nous recommandons RS256.

Une fois la réponse du support reçue, votre FD est capable d'effectuer les appels à ProConnect !

> NB: l'`introspection_signed_response_alg` indique comment ProConnect **signe** (JWS) le contenu de la réponse d’introspection.
> Votre bibliothèque OIDC cliente vérifie l’intégrité et l'authenticité de la réponse avec le JWKS public de ProConnect.
