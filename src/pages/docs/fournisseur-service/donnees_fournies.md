# En tant que Fournisseur de Service, quelles sont les données que je peux récupérer par ProConnect sur les pros ?

Les données sont fournies par les Fournisseurs d'Identité aux Fournisseurs de Services, via ProConnect, conformément à l'habilitation obtenue via [datapass.api.gouv.fr](https://datapass.api.gouv.fr), et le choix des données réalisé par le Fournisseur de Services dans cette demande.

## 1. Les données fournies par les Fournisseurs d'Identité

Ces données sont **systématiquement** transmises par les Fournisseurs d'Identité via ProConnect. Elles permettent d'identifier un utilisateur.

| Champs     | Obligatoire | Description                                              | Format                          |
| ---------- | ----------- | -------------------------------------------------------- | ------------------------------- |
| given_name | Oui         | Prénoms séparés par des espaces (standard OpenIDConnect) | UTF-8 (standard OpenIDConnect)  |
| usual_name | Oui         | Nom de famille d'usage (par défaut = family_name)        | UTF-8                           |
| email      | Oui         | Adresse courriel                                         | UTF-8 (standard OpenIDConnect)  |
| uid        | Oui         | Identifiant unique de l'agent auprès du FI               | String (standard OpenIDConnect) |
| siret      | Oui         | Identifiant d'établissement                              | string, 14 chiffres sans espace |

## 2. Les données renvoyées par ProConnect

Ces données sont générées ou enrichies par ProConnect lui-même et sont **systématiquement** présentes, indépendamment du Fournisseur d'Identité utilisé.

| Champs | Obligatoire | Description                                                                                                                | Format |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------- | ------ |
| sub    | Oui         | Identifiant unique de l'agent, spécifique à chaque couple FI/FS                                                            | String |
| idp_id | Oui         | Fournisseur d'Identité utilisé par l'utilisateur pour s'authentifier (plus de détails [ici](./connaitre-le-fi-utilise.md)) | String |

### 2.1. Le champ sub

ProConnect transmet systématiquement au Fournisseur de Services un identifiant unique pour chaque agent (le `sub`) : cet identifiant est spécifique **à chaque Fournisseur d'Identité**. Il est recommandé de l'utiliser pour effectuer la réconciliation d'identité.

![schéma de reconciliation d'identité par le sub](/images/docs/reconciliation-sub.png)

## 3. Les données additionnelles

Ces données sont optionnelles et dépendent du Fournisseur d'Identité. Elles ne sont pas garanties par tous les Fournisseurs d'Identité.

| Champs | Obligatoire | Description                                                                                         | Format           |
| ------ | ----------- | --------------------------------------------------------------------------------------------------- | ---------------- |
| phone  | Non         | Téléphone de contact                                                                                | Format non normé |
| custom | Non         | Champ avec données spécifiques au Fournisseur d'Identité (plus de détails [ici](./custom-scope.md)) | JSON             |

## 4. Les données complémentaires

Ces données dépendent des Fournisseurs d'Identité et peuvent varier fortement d'un Fournisseur d'Identité à l'autre. Elles ne sont pas automatiquement autorisées par ProConnect. Pour plus de détails, n'hésitez pas à contacter le Fournisseur d'Identité sur ces données.

| Champs               | Obligatoire | Description                               | Format                                                     |
| -------------------- | ----------- | ----------------------------------------- | ---------------------------------------------------------- |
| organizational_unit  | Non         | Ministère/Direction/Service d'affectation | UTF8                                                       |
| belonging_population | Non         | Population d'appartenance                 | string, Exemple: agent, prestataire, partenaire, stagiaire |
| chorusdt             | Non         | Entité ministérielle/Matricule Agent      | string                                                     |

> [!WARNING]
> Les scopes de ces données ne sont pas dans la configuration de base ProConnect et il faudra les demander à ProConnect pour y avoir accès.

## 5. La liste des scopes disponibles lors de l'étape d'authentification ProConnect

ProConnect a étendu le mécanisme de scopes pour qu'il soit plus modulaire.

- Un seul scope est obligatoire : openid. Il permet de récupérer le sub (identifiant unique technique) de l'utilisateur.
- Il est possible de combiner plusieurs scopes de son choix pour récupérer seulement les informations dont a besoin le FS.

Cette liste de scopes est définie par la norme OpenIDConnect : http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims

Pour la correspondance détaillée entre scopes et claims, consultez [la documentation dédiée](./scope-claims.md).

## 6. Le cas du SIRET

Le SIRET renvoyé permet d'identifier la structure de travail de la personne qui se connecte. Si cette structure est privée, la [certification dirigeant](certification-dirigeant.md) permet de garantir de parler à une personne capable de représenter l'organisation privée.
