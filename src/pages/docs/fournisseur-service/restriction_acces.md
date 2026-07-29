# Comment restreindre l'accès à mon service à certaines populations ?

## 1. ProConnect ne filtre pas qui peut se connecter à votre service

Toute personne professionnelle disposant d'un compte ProConnect valide (voir [Couverture ProConnect](./couverture-proconnect.md) pour savoir qui peut utiliser ProConnect) peut utiliser le bouton ProConnect dès qu'il est installé sur votre service. ProConnect n'offre pas de mécanisme de restriction pour le compte des Fournisseurs de Service.

### 1.1. La seule exception : les organisations privées

La seule exception est pour les personnes travaillant pour une organisation de droit privé : il est possible de ne restreindre son application uniquement pour les agents publics.

> [!NOTE]
> Les organisations privées utilisant ProConnect ne peuvent connecter que les agents publics. Voir [Éligibilité](./eligibilite_installation.md).

En dehors de ce cas, toute restriction supplémentaire doit être faite de votre côté.

## 2. La restriction est du côté métier

ProConnect est un outil d'authentification : il vérifie l'identité d'une personne professionnelle, mais ne décide pas si elle a le droit d'accéder à votre service. Comme rappelé dans nos [recommandations de parcours](./recommandation_parcours.md), c'est vous qui avez le contrôle sur ce qui se passe avant et après la connexion.

Concrètement, une fois le retour de ProConnect reçu sur votre service (`id_token` et claims associés), c'est à vous de vérifier si l'utilisateur authentifié a le droit d'accéder à votre service, et de bloquer l'accès si ce n'est pas le cas.

## 3. Exemples de filtrage

Voici quelques exemples que nos partenaires utilisent régulièrement pour les filtrages applicatifs.

Ces exemples s'appuient sur les claims renvoyés par ProConnect. Pour la liste complète, voir [Données fournies](./donnees_fournies.md) et [Scopes et claims](./scope-claims.md).

### 3.1. Restreindre au domaine email

Il est possible de récupérer le domaine email utilisé et de ne restreindre qu'à certains domaines emails autorisés.

Exemple : restreindre l'application aux personnes avec des emails en `@interieur.gouv.fr` et `@lyon.fr`.

### 3.2. Restreindre au Fournisseur d'Identité

Il est possible de n'autoriser que certains Fournisseurs d'Identité, via l'ID du FI qui est renvoyé. Pour plus d'information, voir [connaitre le FI utilisé](./connaitre-le-fi-utilise.md).

### 3.3. Restreindre avec une liste précise de personnes ayant les accès à l'application

Si vous avez la liste des emails des personnes qui ont accès à l'application, vous pouvez filtrer par email.

Exemple : un back-office interne où vous connaissez les emails des personnes qui y ont accès.

### 3.4. Restreindre aux agents publics, d'État, territorial

Le claim `roles` indique si l'utilisateur est un agent public (`agent_public`, `agent_public_etat`, `agent_public_territorial`), ou est vide sinon. Voir [le scope roles](./roles.md).

```json
"roles": ["agent_public", "agent_public_etat"]  // agent public, accès autorisé
"roles": []                                     // pas un agent public, accès refusé
```

### 3.5. Restreindre à une liste d'organisations

Le claim `siret` identifie l'organisation de l'utilisateur. Vous pouvez comparer sa valeur à une liste d'organisations autorisées maintenue de votre côté (par exemple les SIRET des collectivités partenaires d'un dispositif).

> [!NOTE]
> Pour certaines populations (exemple : agents du Ministère de l'Interieur), le SIRET n'a pas une fiabilité exemplaire. N'hésitez pas à nous contacter pour en savoir plus si vous voulez filtrer par SIRET.

### 3.6. Filtrer sur des données spécifiques au Fournisseur d'Identité

Le scope `custom` peut contenir des données propres à certains Fournisseurs d'Identité (par exemple des données d'autorisation en interne). Ces données sont gérées côté Fournisseur d'Identité qu'il faudra contacter indépendamment pour connaître le format de ces données. Voir [le scope custom](./custom-scope.md).

## 4. Bonnes et mauvaises pratiques pour bloquer un accès

### 4.1. Ce que nous conseillons

- Effectuer le contrôle d'accès côté serveur, après réception et vérification des claims
- Afficher un message d'erreur explicite indiquant pourquoi l'accès est refusé
- Donner une solution aux utilisateurs bloqués (contact, page d'aide, parcours alternatif)
- Documenter en amont de la connexion les conditions d'accès à votre service (voir nos [recommandations de parcours](./recommandation_parcours.md))

### 4.2. Ce que nous déconseillons

- Utiliser `siret_hint` comme mécanisme de contrôle d'accès : ce paramètre ne fait que suggérer une organisation au moment de la connexion, il ne garantit rien et ne bloque personne. Voir [siret_hint](./siret_hint_usage.md)
- Bloquer silencieusement un utilisateur sans lui expliquer pourquoi, ni comment obtenir de l'aide, par exemple avec un message "erreur, veuillez ressayer plus tard" (nous avons déjà vu ce cas)

## 5. Ce que la restriction n'est pas

Exiger un niveau de confiance (ACR) ou la [certification dirigeant](./certification-dirigeant.md) permet de prouver la fiabilité d'une identité ou d'un rôle, pas de filtrer une population. Un utilisateur peut parfaitement obtenir le niveau requis sans pour autant faire partie du public que vous souhaitez cibler. Voir [Niveaux ACR](./niveaux-acr.md).
