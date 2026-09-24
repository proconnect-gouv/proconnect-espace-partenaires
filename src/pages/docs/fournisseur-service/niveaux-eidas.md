# Niveaux de confiance eidas pour les Fournisseurs de Service

## 1. Norme eIDAS commune

> [!NOTE]
> Chaque niveau `eidas` combine trois critères : identité personnelle, type et sécurisation de l'authentification, lien à l'organisation. Le détail de ces critères et des exemples commentés sont disponibles dans la note dédiée : [Norme eIDAS : niveaux de confiance](../ressources/norme_eidas.md).

## 2. Qu'est-ce que l'ACR ?

**ACR** (_Authentication Context Reference_) est un champ standard d'OpenID Connect. Il représente le **niveau de confiance** d'une authentification. Autrement dit, la qualité de la preuve que l'utilisateur est bien qui il prétend être.

En pratique :

- Le Fournisseur d'Identité de l'utilisateur retourne une valeur `acr` dans l'ID token pour indiquer le contexte d'authentification : identité, authentification, organisation.
- ProConnect transmet cette valeur à votre Fournisseur de Service.

Un fait important est **que vous pouvez exiger un niveau minimum** avant d'autoriser l'accès à votre service (exemple : exiger une authentification multi-facteur).

## 3. Les niveaux de confiance en un coup d'oeil

ProConnect communique le niveau de confiance d'une authentification via l'attribut `acr`. Chaque niveau est défini selon trois axes :

- **Identité** : quelle est la qualité de preuve de l'identité de l'utilisateur ?
- **Authentification** : comment l'utilisateur s'est-il authentifié ?
- **Organisation** : quel est le lien entre l'utilisateur et son organisation ?

| Valeur `acr` | Identité              | Authentification      | Organisation                            |
| ------------ | --------------------- | --------------------- | --------------------------------------- |
| `eidas0`     | Faible ou déclarative | Simple (mot de passe) | Modération ou déclaratif                |
| `eidas0-mfa` | Faible ou déclarative | MFA faible            | Modération ou déclaratif                |
| `eidas1`     | Faible                | Simple (mot de passe) | Modération ou plus                      |
| `eidas1-mfa` | Faible                | MFA faible            | Modération ou plus                      |
| `eidas2`     | Substantielle         | MFA forte             | Lien certifié par une source officielle |
| `eidas3`     | Élevée                | MFA forte matérielle  | Lien certifié par une source officielle |

## 4. Ce que cela signifie pour un FS

Pour exiger un niveau eidas minimum, ajoutez le paramètre `acr` avec `essential: true` dans votre requête `/authorize` :

```json
{
  "claims": {
    "id_token": {
      "acr": {
        "essential": true,
        "values": ["eidas2", "eidas3"]
      }
    }
  }
}
```

Pour plus de détails sur l'utilisation technique de l'ACR, voir [Niveaux ACR](./niveaux-acr.md).

Pour forcer spécifiquement la double authentification (MFA), voir [Double authentification](./double_authentification.md).
