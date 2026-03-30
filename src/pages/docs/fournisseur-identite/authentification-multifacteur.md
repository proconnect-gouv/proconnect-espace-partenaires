# Authentification multi-facteur (MFA) pour les Fournisseurs d'Identité

## Contexte

Certains Fournisseurs de Service (FS) exigent que leurs utilisateurs s'authentifient avec un second facteur avant d'accéder à leur service. Lorsqu'un FS active cette exigence, ProConnect le signale à votre Fournisseur d'Identité lors de la requête d'autorisation.

Pour comprendre comment un FS configure cette exigence de son côté, consultez [la documentation dédiée aux Fournisseurs de Service](../fournisseur-service/double_authentification.md).

> [!CAUTION]
> Ces niveaux sont provisoires et seront définitifs au T2 2026. Vous pouvez commencer à les implémenter pour être MFA-ready.

## Les niveaux d'assurance (ACR)

Pour indiquer le niveau d'assurance d'une authentification, ProConnect utilise l'attribut `acr` (Authentication Context Class Reference).

Les niveaux d'assurance sont définis selon trois axes : la qualité de l'identité, la méthode d'authentification, et le lien avec l'organisation.

| Valeur `acr` | Identité              | Authentification      | Organisation                            |
| ------------ | --------------------- | --------------------- | --------------------------------------- |
| `eidas0`     | Faible ou déclarative | Simple (mot de passe) | Modération ou déclaratif                |
| `eidas0-mfa` | Faible ou déclarative | **MFA**               | Modération ou déclaratif                |
| `eidas1`     | Faible                | Simple (mot de passe) | Modération ou plus                      |
| `eidas1-mfa` | Faible                | **MFA**               | Modération ou plus                      |
| `eidas2`     | Substantielle         | **MFA**               | Lien certifié par une source officielle |
| `eidas3`     | Élevée                | **MFA**               | Lien certifié par une source officielle |

> [!NOTE]
> `eidas2` et `eidas3` impliquent **toujours** une MFA. Il n'existe pas de variante simple-facteur pour ces niveaux.

### Détail des niveaux eidas2 et eidas3

**Lien certifié par une source officielle** désigne un processus d'embarquement RH : l'identité de la personne a été vérifiée à son arrivée (via des justificatifs ou un processus interne), puis elle a été rattachée à l'organisation dans l'annuaire (création de compte, remise des moyens d'authentification).

La distinction entre eidas2 et eidas3 porte sur le type de moyen de double authentification :

| Niveau   | Exemple de moyen d'authentification   |
| -------- | ------------------------------------- |
| `eidas2` | TOTP (application d'authentification) |
| `eidas3` | Carte à puce avec code PIN            |

## Ce que ProConnect vous envoie

Lorsqu'un FS exige une MFA, ProConnect transmet cette exigence à votre FI via le paramètre `claims` de la requête à l'`authorization_endpoint`. Voici une demande de MFA standard :

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

Le champ `essential: true` signifie que l'exigence est **obligatoire** : si votre FI ne peut pas satisfaire l'un des niveaux demandés, l'authentification doit échouer.

> [!NOTE]
> Le FS peut demander un ou plusieurs niveaux à la fois. Votre FI doit satisfaire **exactement un** des niveaux listés.

## Ce que vous devez retourner

Votre FI doit retourner dans l'ID token la valeur `acr` correspondant au niveau **réellement atteint** lors de l'authentification :

- Retournez uniquement le niveau que l'utilisateur a effectivement atteint
- Ne déclarez pas un niveau plus élevé que ce qui a été réellement accompli
- Si l'utilisateur n'a pas encore de second facteur configuré ou ne l'a pas utilisé, forcez une étape d'authentification supplémentaire avant de retourner le token

## Comment tester mon Fournisseur d'Identité ?

Pour tester la MFA de votre Fournisseur d'Identité, vous pouvez aller sur :

- https://test.proconnect.gouv.fr/ en intégration sur Internet
- https://docteur.proconnect.gouv.fr/ en production sur Internet

Puis cliquer sur `Connexion double authentification (2FA)` et faire le parcours de connexion. Si vous faites une connexion complète sans retourner d'erreur, votre Fournisseur d'identité est prêt pour la MFA. Vous trouverez plus d'informations sur les tests [dans notre page dédiée](./test-configuration-fi.md)
