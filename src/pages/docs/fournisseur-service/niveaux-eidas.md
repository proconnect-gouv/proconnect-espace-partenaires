# Niveaux d'assurance eidas pour les Fournisseurs de Service

> [!CAUTION]
> Les niveaux ACR renvoyés par ProConnect sont actuellement en cours de définition en collaboration avec nos partenaires et l'ANSSI.

> [!NOTE]
> Pour en savoir plus sur la norme eIDAS à ProConnect, nous avons rédigé une ressource commune aux Fournisseurs d'Identité et Fournisseurs de Service disponible ici → [Norme eIDAS](../ressources/norme_eidas.md). Elle expliquera en détails avec des exemples les différents éléments de la norme.

## 1. Les niveaux eidas

ProConnect communique le niveau de confiance d'une authentification via l'attribut `acr`. Chaque niveau est défini selon trois axes :

- **Identité** : quelle est la qualité de preuve de l'identité de l'utilisateur ?
- **Authentification** : comment l'utilisateur s'est-il authentifié ?
- **Organisation** : quel est le lien entre l'utilisateur et son organisation ?

| Valeur `acr` | Identité              | Authentification                         | Organisation                            |
| ------------ | --------------------- | ---------------------------------------- | --------------------------------------- |
| `eidas0`     | Faible ou déclarative | Simple (mot de passe)                    | Modération ou déclaratif                |
| `eidas0-mfa` | Faible ou déclarative | MFA (auto-géré)                          | Modération ou déclaratif                |
| `eidas1`     | Faible                | Simple (mot de passe)                    | Modération ou plus                      |
| `eidas1-mfa` | Faible                | MFA (auto-géré)                          | Modération ou plus                      |
| `eidas2`     | Substantielle         | MFA (géré par l'organisation)            | Lien certifié par une source officielle |
| `eidas3`     | Élevée                | MFA matérielle (géré par l'organisation) | Lien certifié par une source officielle |

## 2. Comment exiger un niveau minimum ?

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
