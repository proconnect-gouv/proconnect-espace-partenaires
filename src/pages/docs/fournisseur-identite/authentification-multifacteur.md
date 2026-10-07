# Authentification multi-facteur (MFA) pour les Fournisseurs d'Identité

> [!WARNING]
> La [Feuille de Route Cyber de l'ANSSI](https://cyber.gouv.fr/nous-connaitre/publications/feuilles-de-route-de-la-securite-numerique-de-letat/feuille-de-route-de-securite-numerique-2026-2027/) oblige ProConnect et ses Fournisseurs d'Identité à « Déployer une authentification multi-facteur des utilisateurs sur le système d'information et de communication de l'État » **avant le 28 février 2027**. Pour vérifier si votre FI est conforme à la MFA ProConnect, consultez [la procédure dédiée](./2026_03_conformite_mfa.md).

## 1. Contexte

Certains Fournisseurs de Service (FS) exigent que leurs utilisateurs s'authentifient avec un second facteur avant d'accéder à leur service. Lorsqu'un FS active cette exigence, ProConnect le signale à votre FI lors de la requête d'autorisation.

Pour comprendre comment un FS configure cette exigence de son côté, consultez [la documentation dédiée aux Fournisseurs de Service](../fournisseur-service/double_authentification.md).

Pour comprendre ce que représente l'`acr` et quelle méthode d'authentification correspond à chaque niveau (`eidas1-mfa`, `eidas3`, …), consultez [Niveaux de confiance : Qu'est-ce que l'ACR ?](./acr-eidas.md).

## 2. Ce que ProConnect vous envoie

Lorsqu'un FS exige une MFA, ProConnect transmet cette exigence à votre FI (FI) via le paramètre `claims` de la requête à l'`authorization_endpoint`. Voici une demande de MFA standard :

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

## 3. Ce que vous devez retourner

Votre FI doit retourner dans l'ID token la valeur `acr` correspondant au niveau **réellement atteint** lors de l'authentification :

- Retournez uniquement le niveau que l'utilisateur a effectivement atteint
- Ne déclarez pas un niveau plus élevé que ce qui a été réellement accompli
- Si l'utilisateur n'a pas encore de second facteur configuré ou ne l'a pas utilisé, forcez une étape d'authentification supplémentaire avant de retourner le token

En complément, retournez les valeurs `amr` correspondant aux méthodes effectivement utilisées. Voici quelques exemples de valeurs `amr` :

| Méthode d'authentification           | `acr` à retourner | Valeurs `amr`           |
| ------------------------------------ | ----------------- | ----------------------- |
| Mot de passe                         | `eidas1`          | `["pwd"]`               |
| Lien magique                         | `eidas1`          | `["mail"]`              |
| Mot de passe + TOTP                  | `eidas2`          | `["pwd", "otp", "mfa"]` |
| Passkey synchronisé (ex. iCloud)     | `eidas2`          | `["pop", "mfa"]`        |
| Passkey hardware / carte agent + PIN | `eidas3`          | `["pop", "pin", "mfa"]` |

Pour la liste complète des valeurs `amr` et leur statut, voir [Claim AMR](../ressources/claim_amr.md).

Pour comprendre tous les types d'authentification côté métier sans jargon technique, voici la note qui explique côté métier qu'est-ce que l'authentification multifacteur et quels sont les moyens d'authentification : [Authentification Multifacteur](./../ressources/mfa.md)


## 4. Comment tester mon Fournisseur d'Identité (FI) ?

### 4.1. Tester le FI

Pour tester la MFA de votre FI, vous pouvez aller sur :

- https://test.proconnect.gouv.fr/ en intégration sur Internet
- https://docteur.proconnect.gouv.fr/ en production sur Internet

Puis cliquer sur `Connexion double authentification (2FA)` et faire le parcours de connexion. Si vous faites une connexion complète sans retourner d'erreur, votre FI est prêt pour la MFA. Vous trouverez plus d'informations sur les tests [dans notre page dédiée](./test-configuration-fi.md)

### 4.2. Le cas du code par email

Dans [le cadre du calendrier MFA](./../fournisseur-service/double_authentification.md), lors de la connexion, nous envoyons un OTP par e-mail à l'utilisateur pour les Fournisseurs d'Identité **qui ne sont pas conformes à la MFA**.

En effet, l'écran ci-dessous apparaît pour l'utilisateur après authentification par le FI lorsque :

- le FS a requis une classe d'authentification ACR conforme MFA
- le FI **n'est pas capable de renvoyer un ACR conforme MFA**

Si cet écran s'affiche pour votre FI, cela signifie donc que des développements sont encore à faire pour qu'il soit conforme.

Voici la liste des ACR que ProConnect est capable d'enrichir :

| ACR requis par le FS | ACR renvoyé par le FI | ACR enrichi par PCF après validation de l'OTP e-mail |
| -------------------- | --------------------- | ---------------------------------------------------- |
| `eidas1-mfa`         | `eidas1`              | `eidas1-mfa`                                         |
| `eidas0-mfa`         | `eidas0`              | `eidas0-mfa`                                         |

![Écran code OTP Mail](/images/docs/keycloak/MFA/code_email_FI.png)
