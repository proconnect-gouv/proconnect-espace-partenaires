# Implémenter un Serveur de Ressources (SR)

## Utilisation

Un SR (ou Resource Server dans la terminologie OIDC) permet d'effectuer des actions au nom d'un utilisateur proConnecté et de renvoyer à un Fournisseur de Service des informations concernant l'utilisateur.

## Fonctionnement

1. L'utilisateur s'authentifie sur le FS via ProConnect selon le parcours classique. Dans le cadre de cette connexion, un `access_token` est renvoyé au FS.
2. Le FS requête une route du SR pour effectuer une action. Par exemple, si le SR contient des informations de géolocalisation sur les utilisateurs, il peut s'agir de la route `https://resource-server.fr/api/users/locations`. Cet appel doit contenir l'`access_token` renvoyé par ProConnect lors de l'appel du FS au `token_endpoint`. L'usage est d'envoyer l'`access_token` en `Bearer` dans le header `Authorization`.
3. Le SR requête l'`introspection_endpoint` de ProConnect avec l'`access_token` selon les modalités indiquées dans [la RFC](https://www.rfc-editor.org/rfc/rfc7662.html#section-2).
4. Le SR reçoit en réponse de l'`introspection_endpoint` un JSON qui contient notamment deux champs utiles :

- `active`: défini si l'`access_token` est encore actif. Si le champ vaut `false`, ce sera le seul champ renvoyé par ProConnect
- `sub`: l'identifiant unique de l'utilisateur dans ProConnect

5. Le SR, qui peut maintenant identifier l'utilisateur à l'aide du `sub` récupéré, répond à la requête du FS en renvoyant les données concernant l'utilisateur. Dans notre exemple, il récupère toutes les géolocalisations liées à ce `sub` et les renvoie au FS.

## Enregistrement auprès de ProConnect

Le SR doit d'abord suivre le processus d'inscription auprès de ProConnect **en tant que FS**. En effet, inscrire un Resource Server auprès de ProConnect doit se faire lors de l'enregistrement d'un FS.

Il doit ensuite écrire à support.partenaires@mail.proconnect.gouv.fr en spécifiant :

- le `client_id` de son FS qui lui aura été transmis après inscription
- l'`introspection_signed_response_alg` : RS256, HS256 ou ES256. Si vous ne savez pas quoi choisir, nous recommandons RS256.

Une fois la réponse du support reçue, votre SR est capable d'effectuer les appels à ProConnect !

> NB: l'`introspection_signed_response_alg` indique comment ProConnect signe le contenu de la réponse d’introspection.
> Votre bibliothèque OIDC cliente vérifie l’intégrité et l'authenticité de la réponse avec le JWKS public de ProConnect.

## Exemple d'implémentation

Voici un exemple de Resource Server implémenté en ExpressJS : https://github.com/proconnect-gouv/proconnect-test-resource-server
