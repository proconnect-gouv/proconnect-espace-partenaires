# Le scope `roles`

## Fonctionnement

Le champ `roles` est un tableau de String.
Il :

- contient la valeur "`agent_public`" si l'utilisateur authentifié est associé à une organisation publique
- est vide sinon

Le calcul de cette valeur est détaillé dans [ce code](https://github.com/proconnect-gouv/proconnect-identite/blob/main/packages/identite/src/services/organization/is-public-service.ts).

Tous les Fournisseurs de Service de production créés après le 12 mai 2026 sont autorisés à demander ce scope par défaut. Pour les autres, vous pouvez en faire la demande par mail à support.partenaires@mail.proconnect.gouv.fr en indiquant le client ID de votre Fournisseur de Service.
