# Authentification multi-facteur (MFA) pour les Fournisseurs d'Identité

> [!WARNING]
> La [Feuille de Route Cyber de l'ANSSI](https://cyber.gouv.fr/nous-connaitre/publications/feuilles-de-route-de-la-securite-numerique-de-letat/feuille-de-route-de-securite-numerique-2026-2027/) oblige ProConnect et ses Fournisseurs d'Identité à « Déployer une authentification multi-facteur des utilisateurs sur le système d'information et de communication de l'État » **avant le 28 février 2027**. Pour vérifier si votre Fournisseur d'Identité est conforme à la MFA ProConnect, consultez [la procédure dédiée](./2026_03_conformite_mfa.md).

## Contexte

Certains Fournisseurs de Service (FS) exigent que leurs utilisateurs s'authentifient avec un second facteur avant d'accéder à leur service. Lorsqu'un FS active cette exigence, ProConnect le signale à votre Fournisseur d'Identité lors de la requête d'autorisation.

Pour comprendre comment un FS configure cette exigence de son côté, consultez [la documentation dédiée aux Fournisseurs de Service](../fournisseur-service/double_authentification.md).

Pour comprendre ce que représente l'`acr` et quelle méthode d'authentification correspond à chaque niveau (`eidas1-mfa`, `eidas3`, …), consultez [Niveaux d'assurance — Qu'est-ce que l'ACR ?](./niveaux-assurance-eidas.md).

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
