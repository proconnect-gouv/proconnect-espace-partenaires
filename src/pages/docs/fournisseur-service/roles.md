# Le scope `roles`

## Fonctionnement

Le champ `roles` est un tableau de String.
Il :

- contient la valeur "`agent_public`" si l'utilisateur authentifié est associé à une organisation publique
- est vide sinon

Le calcul de cette valeur est détaillé dans [ce code](https://github.com/proconnect-gouv/proconnect-identite/blob/main/packages/identite/src/services/organization/is-public-service.ts).
