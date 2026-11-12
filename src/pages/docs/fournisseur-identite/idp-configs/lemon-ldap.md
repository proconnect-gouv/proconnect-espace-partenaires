# Configuration spécifique à LemonLDAP::NG

## Service OpenID Connect

### Sécurité

### Envoyer tous les attributs exportés

Activer

### Contexte d'authentification

Il vous faut créer un mapping :
| Clef | Valeur|
|---- | ------ |
|eidas1 | 1 |
|eidas2 | 2 |
|eidas3 | 3 |

Le client doit être confidentiel (ne pas activer le mode `public`).

## Authentification Multi-Facteurs (MFA)

La configuration de la MFA se fait dans Service OpenIDConnect -> Contexte d'Authentification. À partir de là, vous pourrez rentrer les combinaisons Clés (`acr` demandé) - Valeurs (type d'authentification que vous allez faire).

![](/images/docs/lemonldap-mfa.png)

> [!NOTE]
> Pour une vue d'ensemble de la MFA sur ProConnect, consultez [la documentation dédiée](../authentification-multifacteur.md).

> [!NOTE]
> Voir aussi [la documentation ProConnect](https://lemonldap-ng.org/documentation/latest/oidc-proconnect.html) sur le site de LemonLDAP::NG. 
