# Forcer la double authentification (2FA) sur votre service

> [!CAUTION]
> La double authentification n’est pas supportée par tous les fournisseurs d’identité de la fédération ProConnect. Avant de forcer la 2FA sur votre service, vérifiez que les fournisseurs d’identité de vos utilisateurs supportent bien le niveau d’assurance requis.<br><br>
> Si vous souhaitez en savoir plus sur la compatibilité 2FA ou son implémentation technique, contactez l’équipe technique partenaires à : support.partenaires@mail.proconnect.gouv.fr.

## 1. Vue d'ensemble

Cette documentation explique comment configurer votre service pour exiger obligatoirement la double authentification (2FA) lors de la connexion via ProConnect. Cette mesure renforce la sécurité en s'assurant que tous les utilisateurs disposent d'un second facteur d'authentification.

## 2. Configuration côté client

Pour forcer la 2FA, le champ `acr` présent dans le paramètre `claims` envoyé lors de l'appel au `authorization_endpoint` doit contenir les valeurs présentes dans l'exemple ci-dessous :

```json
{
  "claims": {
    "id_token": {
      "acr": {
        "essential": true,
        "values": ["eidas0-mfa", "eidas1-mfa", "eidas2", "eidas3"]
      }
    }
  }
}
```

NB: le champ `claims` doit être présent dans l’URL en version URI-encoded (cf [Implémentation technique](./implementation_technique.md))

## 3. Explication des valeurs ACR

Ces niveaux correspondent aux valeurs eidas qui impliquent une MFA. Pour comprendre ce que chacun signifie (qualité de l’identité, méthode d’authentification, lien avec l’organisation), voir [Niveaux eidas](./niveaux-eidas.md).

## 4. Validation côté serveur (obligatoire)

Dans votre fonction de callback vous devez impérativement vérifier les valeurs contenues dans le champ `acr` présentes dans l'id_token renvoyé lors de l'appel au `token_endpoint`. Si la valeur des acr ne correspond pas aux valeurs exigées, il vous faut déclencher une erreur comme suit :

```js
throw new HTTPException(403, {
  message:
    "Vous ne pouvez pas accéder au service sans avoir une double authentification installée. Veuillez installer une application d'authentification et vous connecter à nouveau.",
});
```

## 5. Comportement utilisateur

**Lorsqu'un utilisateur n'a pas configuré la 2FA :**

1. Il sera redirigé vers notre parcours ProConnect pour configurer un moyen d'authentification supplémentaire
2. S'il tente de contourner cette étape, il recevra le message d'erreur personnalisé
3. Il devra obligatoirement configurer une application d'authentification pour accéder au service

## 6. Pour aller plus loin

[Niveaux ACR](./niveaux-acr.md) : comment utiliser l'ACR dans vos requêtes, et comment lire les méthodes d'authentification (`amr`) retournées par ProConnect.
