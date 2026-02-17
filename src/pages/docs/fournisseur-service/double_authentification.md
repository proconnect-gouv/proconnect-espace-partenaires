# Forcer la double authentification (2FA) sur votre service

> [!CAUTION]
> La double authentification n’est pas supportée par tous les fournisseurs d’identité de la fédération ProConnect. Avant de forcer la 2FA sur votre service, vérifiez que les fournisseurs d’identité de vos utilisateurs supportent bien le niveau d’assurance requis.<br><br>
> La liste des fournisseurs d’identité compatibles est disponible sur [cette page](https://grist.numerique.gouv.fr/o/docs/3kQ829mp7bTy/ProConnect-Configuration-des-FI-et-FS/p/5).<br><br>
> Si vous souhaitez en savoir plus sur la compatibilité 2FA ou son implémentation technique, contactez l’équipe technique partenaires à : support.partenaires@mail.proconnect.gouv.fr.

## Vue d'ensemble

Cette documentation explique comment configurer votre service pour exiger obligatoirement la double authentification (2FA) lors de la connexion via ProConnect. Cette mesure renforce la sécurité en s'assurant que tous les utilisateurs disposent d'un second facteur d'authentification.

## Configuration côté client

Pour forcer la 2FA, le champ `acr` présent dans le paramètre `claims` envoyé lors de l'appel au `authorization_endpoint` doit contenir les valeurs présentes dans l'exemple ci-dessous :

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

NB: le champ `claims` doit être présent dans l'URL en version URI-encoded (cf [Implémentation technique](./implementation_technique.md))

[Plus d’information sur les niveaux ACR utilisés dans la fédération.](./niveaux-acr.md)

## Explication des valeurs ACR

- eidas2 : Accès de type _login / mot de passe_ **+** un second facteur (TOTP, POP, ou équivalent)

- eidas3 : Accès via une **carte agent**, avec **PIN + certificats**

- self-asserted-2fa : Identité déclarative + authentification à double facteur

- consistency-checked-2fa : Identité déclarative + **test(s) de cohérence** (par exemple : contrôle du domaine de messagerie, envoi d’un code par courrier postal au siège social, vérification de l’adresse de contact dans un annuaire officiel, etc.) + authentification à double facteur

## Validation côté serveur (obligatoire)

Dans votre fonction de callback vous devez impérativement vérifier les valeurs contenues dans le champ `acr` présentes dans l'id_token renvoyé lors de l'appel au `token_endpoint`. Si la valeur des acr ne correspond pas aux valeurs exigées, il vous faut déclencher une erreur comme suit :

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
