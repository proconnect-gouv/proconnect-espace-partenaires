# 💼 Cas de l'authentification d'un rôle (dirigeant, élu, etc.)

Ce document décrit la manière d'utiliser ProConnect en tant que **fournisseur OpenID** afin de récupérer une identité de niveau « certifié dirigeant ». Nous nous appuyons sur les spécifications [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html).

> [!CAUTION]
> Cette fonctionnalité est disponible de manière expérimentale et pourrait évoluer. Pour passer en production merci de prendre contact avec nous par mail à [support.partenaires@mail.proconnect.gouv.fr](mailto:support.partenaires@mail.proconnect.gouv.fr).

## 1. Qu'est-ce que la certification dirigeant ?

Parmi les niveaux d'authentification disponibles, ProConnect propose notamment le niveau de certification suivant :

- `certification-dirigeant` : prouve le statut de dirigeant au sein d'une organisation.

Cette certification s'obtient en demandant explicitement un niveau de garantie (acr) spécifique dans le cadre d'un flux OpenID Connect.

## 2. Configuration du paramètre `claims`

Pour demander à l'OP ProConnect de retourner un **ID token** contenant l'**acr** du niveau « certification-dirigeant », vous devez inclure le paramètre `claims` dans la requête à l'endpoint d'**autorisation**.

Voici un exemple au format JSON à inclure :

```json
{
  "claims": {
    "id_token": {
      "acr": {
        "essential": true,
        "value": "https://proconnect.gouv.fr/assurance/certification-dirigeant"
      }
    }
  }
}
```

L'attribut `essential: true` indique que la valeur spécifiée pour `acr` est **obligatoire** pour votre service. La propriété `value` doit être égale à l'URL qui identifie le niveau d'assurance souhaité, dans cet exemple :

```
"https://proconnect.gouv.fr/assurance/certification-dirigeant"
```

## 3. Envoi de la requête d'autorisation

Selon votre bibliothèque OpenID Connect (client OpenID) ou votre framework, vous devrez :

1. **Inclure** le bloc `claims` dans les paramètres de l'URL `/authorize`.
2. **Encoder** correctement la valeur JSON dans le paramètre `claims` (URL-encoding).

Par exemple, une requête d'autorisation (simplifiée) pourrait ressembler à :

```http
GET /authorize?
  response_type=code&
  client_id=VOTRE_CLIENT_ID&
  scope=openid&
  redirect_uri=https%3A%2F%2Fvotre-application.fr%2Fcallback&
  claims=%7B%22id_token%22%3A%7B%22acr%22%3A%7B%22essential%22%3Atrue%2C%22value%22%3A%22https%3A%2F%2Fproconnect.gouv.fr%2Fassurance%2Fcertification-dirigeant%22%7D%7D%7D
```

Ici, `claims=%7B%22id_token%22%3A...` correspond à la version encodée URL du JSON décrit plus haut.

## 4. Traitement par ProConnect

Lorsque ProConnect traite votre demande avec le paramètre `acr` requis, vous recevrez un ID token contenant le paramètre `acr` correspondant :

```json
{
  "iss": "https://proconnect.gouv.fr",
  "aud": "VOTRE_CLIENT_ID",
  "exp": 1700000000,
  "iat": 1699999400,
  "sub": "248289761001",
  "acr": "https://proconnect.gouv.fr/assurance/certification-dirigeant"
}
```

Il est **IMPÉRATIF** de vérifier la présence et la valeur du paramètre `acr` dans l'ID token reçu. Cette vérification doit être effectuée côté serveur avant d'accorder l'accès aux fonctionnalités réservées aux dirigeants :

> [!CAUTION]
> Ne jamais se fier uniquement à la présence d'autres attributs dans l'ID token. La vérification explicite de l'`acr` est le seul moyen de s'assurer que l'utilisateur possède le niveau de certification requis.

## 5. Références

- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- [Utilisation du paramètre `claims`](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)
- [Semantics of the `acr` Claim](https://openid.net/specs/openid-connect-core-1_0.html#acrSemantics)

## 6. Annexe

### 6.1 Tester la certification dirigeant en intégration

Pour tester la certification dirigeant, vous pouvez utiliser le [fournisseur de service de test](https://test.proconnect.gouv.fr) de ProConnect en cliquant sur `Forcer une connexion par Certification Dirigeant`.

> [!IMPORTANT]
> Si vous n'avez pas de données fictives dans l'environnement d'intégration d'une personne dirigeante d'entreprise, sachez que nous avons ajouté des [données fictives](https://github.com/proconnect-gouv/proconnect-identite/blob/4ce6c5fcfb8b548cf24fea7dc168c04d88317fca/packages/testing/src/api/routes/api.insee.fr/etablissements/83832482000011.json#L29) pour que [cette utilisatrice fictive](https://github.com/france-connect/sources/blob/96ad0d3d379cd3b0c55f7 c8d71a77a7e228717ee/docker/volumes/fcp-high/mocks/idp/databases/citizen/base.csv#L2) puisse être dirigeante de [cette entreprise](https://annuaire-entreprises.data.gouv.fr/etablissement/83832482000011). Cette même utilisatrice pourra être dirigeante de n'importe quelle établissement de [cette Unité Légale](https://annuaire-entreprises.data.gouv.fr/entreprise/thunnus-thynnus-iii-807612296).

#### 6.1.1. Tester la certification dirigeant avec notre seed - 83832482000011

- Forcez une certification dirigeant (par exemple sur notre [fournisseur de service de test](https://test.proconnect.gouv.fr) en cliquant sur `Forcer une connexion par Certification Dirigeant`)
- Créez un nouveau compte avec un email de votre choix
- On vous demande de certifier votre statut de dirigeant
- Pour FranceConnect et [l'utilisatrice fictive choisie](https://github.com/france-connect/sources/blob/96ad0d3d379cd3b0c55f7c8d71a77a7e228717ee/docker/volumes/fcp-high/mocks/idp/databases/citizen/base.csv#L2), cliquez sur `Démonstration eIDAS faible` depuis le bac à sable FranceConnect, puis identifiant `test` mot de passe `123` pour vous authentifier en tant que "Angela Claire Louise"
- De retour sur ProConnect, rejoignez l'organisation [au SIRET 83832482000011](https://annuaire-entreprises.data.gouv.fr/etablissement/83832482000011) (en cliquant si besoin sur `Rejoindre une autre organisation`)
- Validez, la redirection vers le fournisseur de service est établie

Dans le token, vous remarquerez que ProConnect renvoie :

```json
    "acr": "https://proconnect.gouv.fr/assurance/certification-dirigeant",
```

#### 6.1.2. Tester la certification dirigeant avec notre seed - 807612296

- Forcez une certification dirigeant (par exemple sur notre [fournisseur de service de test](https://test.proconnect.gouv.fr) en cliquant sur `Forcer une connexion par Certification Dirigeant`)
- Créez un nouveau compte avec un email de votre choix
- On vous demande de certifier votre statut de dirigeant
- Pour FranceConnect et [l'utilisatrice fictive choisie](https://github.com/france-connect/sources/blob/96ad0d3d379cd3b0c55f7c8d71a77a7e228717ee/docker/volumes/fcp-high/mocks/idp/databases/citizen/base.csv#L2), cliquez sur `Démonstration eIDAS faible` depuis le bac à sable FranceConnect, puis identifiant `test` mot de passe `123` pour vous authentifier en tant que "Angela Claire Louise"
- De retour sur ProConnect, rejoignez n'importe quel établissement [de cette Unité Légale](https://annuaire-entreprises.data.gouv.fr/entreprise/thunnus-thynnus-iii-807612296), par exemple [l'établissement rue Martin à Sète](https://annuaire-entreprises.data.gouv.fr/etablissement/80761229600044)
- Validez, la redirection vers le fournisseur de service est établie

Dans le token, vous remarquerez que ProConnect renvoie :

```json
    "acr": "https://proconnect.gouv.fr/assurance/certification-dirigeant",
```
