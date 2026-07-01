# Forcer la double authentification (2FA) sur votre service

## 0. Préambule et Calendrier 2026

> [!CAUTION]
> La double authentification n’est pas supportée par tous les fournisseurs d’identité de la fédération ProConnect. Avant de forcer la 2FA sur votre service, vérifiez le calendrier suivant.

### 0.1. Introduction et état des lieux

La [Feuille de Route Cyber de l'ANSSI](https://cyber.gouv.fr/nous-connaitre/publications/feuilles-de-route-de-la-securite-numerique-de-letat/feuille-de-route-de-securite-numerique-2026-2027/) oblige les Systèmes d'Information à "Déployer une authentification multi-facteur des utilisateurs sur le système d'information et de communication de l'Etat" :

- avant le 28 février 2027 pour les SI à enjeux
- avant le 28 février 2028 pour l'ensemble des SI

ProConnect et ses Fournisseurs d'Identité sont considérés comme étant des SI à enjeux, le déploiement et la généralisation de la MFA est un de nos gros enjeux 2026.

La majorité des Fournisseurs d'Identité a bien intégré la feuille de route cyber dans leur feuille de route et devraient respecter le délai du 28 février 2027.

La comformité des Fournisseurs d'Identité arrivera au compte-goutte à l'automne. En attendant, ProConnect prendra le relai en proposant un OTP Mail avec une valeur `acr` de `eidas1-mfa`.

Voici un schéma de l'authentification multi-facteur prévue en attendant la comformité générale du 28 février 2027 :

```
              FS
              │
              │ claims acr MFA
              ▼
         ProConnect
              │
      FI compatible MFA ?
       ┌──────┴───────────┐
      OUI                NON
       │                   │
       │ demande MFA       │ demande connexion std
       ▼                   ▼
      FI                  FI
       │                   │
       │ retour MFA        │ retour connexion
       ▼                   ▼
  ProConnect          ProConnect
       │                   │
       │                   │ OTP mail
       │                   ▼
       │             validation OTP
       │                   │
       ▼                   ▼
      FS                  FS
  acr: selon MFA      acr: eidas1-mfa
       du FI
  (eidas1-mfa → eidas3)
```

### 0.2. Calendrier des prochains mois

| Date               | Étape                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Printemps 2026     | Normalisation et implémentation de [la nouvelle norme eidas ProConnect](../ressources/norme_eidas.md) |
| Début juillet 2026 | WIP technique                                                                                         |
| Fin juillet 2026   | Implémentation de l'OTP Mail selon le schéma ci-dessus                                                |
| Fin de l'été 2026  | Les premiers Fournisseurs d'Identité deviennent compatibles MFA ProConnect                            |
| 28 février 2027    | Tous les FIs sont compatibles MFA                                                                     |

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
