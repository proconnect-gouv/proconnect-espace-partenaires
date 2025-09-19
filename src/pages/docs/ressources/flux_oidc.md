# Qu’est-ce que le protocole OpenID Connect ?

Le protocole **OpenID Connect (OIDC)** est au cœur du fonctionnement de ProConnect.  
Il s’agit d’une couche d’authentification standardisée reposant sur le protocole **OAuth 2.0**.  
OIDC permet à des _fournisseurs de services_ (applications ou services en ligne) d’accéder à l’identité des _utilisateurs_ via un _fournisseur d’identité_.

- **Spécification officielle** : [openid.net/connect](http://openid.net/connect/)
- **Référence technique** : [OpenID Connect Core 1.0 – Authorization Code Flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)

## Inscription du fournisseur de service

Avant tout échange, le _fournisseur de services_ doit s’enregistrer auprès du _provider_ (fournisseur d’identité / ProConnect).  
Lors de cette étape, il fournit notamment :

- une **URL de callback** (`redirect_uri`) : l’adresse vers laquelle l’utilisateur sera redirigé une fois authentifié ;
- une **URL de redirection post-déconnexion** (`post_logout_redirect_uri`) : l’adresse vers laquelle l’utilisateur sera renvoyé après sa déconnexion.

En retour, le provider attribue au fournisseur de service un **`client_id`** (identifiant public) et un **`client_secret`** (clé privée partagée).

## Déroulé du flux standard

Lorsque l’utilisateur clique sur le bouton « Se connecter avec ProConnect », le parcours type est le suivant :

![doc_fs_fca](/images/docs/flux_openid.svg)

1. **Redirection navigateur** : le fournisseur de service redirige l’utilisateur vers l’`authorization_endpoint` du provider, en incluant son `client_id` et sa `redirect_uri`.
2. **Authentification** : le provider affiche une mire de connexion et authentifie l’utilisateur.
3. **Retour au fournisseur de service** : si l’authentification réussit, le provider redirige l’utilisateur vers la `redirect_uri` avec un **code d’autorisation** (`code`) en paramètre.
4. **Échange du code** : le fournisseur de service appelle, côté serveur, le `token_endpoint` du provider en lui transmettant le `code`, son `client_id` et son `client_secret`.
5. **Réponse du provider** : le provider renvoie un `id_token` (JWT contenant l’identité) et un `access_token`.
6. **Appel UserInfo** : le fournisseur de service appelle, côté serveur, le `userinfo_endpoint` du provider avec l’`access_token`.
7. **Réponse UserInfo** : le provider renvoie les informations de l’utilisateur.
