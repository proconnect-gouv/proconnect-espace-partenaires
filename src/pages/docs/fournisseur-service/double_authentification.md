# Forcer la double authentification (2FA) sur votre service

## Vue d'ensemble

Cette documentation explique comment configurer votre service pour exiger obligatoirement la double authentification (2FA) lors de la connexion via ProConnect. Cette mesure renforce la sécurité en s'assurant que tous les utilisateurs disposent d'un second facteur d'authentification.

## Configuration côté client

Pour forcer la 2FA, remplacez le paramètre `acr_values: "eidas1"` par le paramètre `claims` dans votre URL d'autorisation :

```json
{
  "claims": {
    "id_token": {
      "acr": {
        "essential": true,
        "values": [
          "eidas2",
          "eidas3",
          "https://proconnect.gouv.fr/assurance/self-asserted-2fa",
          "https://proconnect.gouv.fr/assurance/consistency-checked-2fa"
        ]
      }
    }
  }
}
```

Voici un exemple d'URL contenant les bons paramètres :

https://identite-sandbox.proconnect.gouv.fr/oauth/authorize?client_id=client_id&scope=openid email profile organization&response_type=code&redirect_uri=https%3A%2F%2Ftest.identite.proconnect.gouv.fr%2Flogin-callback&claims={"id_token"%3A{"acr"%3A{"essential"%3Atrue%2C"value"%3A"https%3A%2F%2Frefeds.org%2Fprofile%2Fmfa"}}}

## Explication des valeurs ACR

- eidas2 : Accès de type _login / mot de passe_ **+** un second facteur (TOTP, POP, ou équivalent)

- eidas3 : Accès via une **carte agent**, avec **PIN + certificats**

- self-asserted-2fa : Identité déclarative + authentification à double facteur

- consistency-checked-2fa : Identité déclarative + **test(s) de cohérence** (par exemple : contrôle du domaine de messagerie, envoi d’un code par courrier postal au siège social, vérification de l’adresse de contact dans un annuaire officiel, etc.) + authentification à double facteur

## Validation côté serveur (obligatoire)

Dans votre fonction de callback vous devez vérifier les acr qui sont renvoyés dans l'id_token et déclencher une erreur si la valeur des acr ne correspond pas aux valeurs exigées.

```js
throw new HTTPException(403, {
  message:
    "Vous ne pouvez pas accéder au service sans avoir une double authentification installée. Veuillez installer une application d'authentification et vous connecter à nouveau.",
});
```

## Comportement utilisateur

**Lorsqu'un utilisateur n'a pas configuré la 2FA :**

1. Il sera redirigé vers notre parcours ProConnect pour configurer un moyen d'authentification supplémentaire
2. S'il tente de contourner cette étape, il recevra le message d'erreur personnalisé
3. Il devra obligatoirement configurer une application d'authentification pour accéder au service
