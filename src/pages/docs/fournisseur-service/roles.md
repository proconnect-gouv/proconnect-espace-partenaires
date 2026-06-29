# Le scope `roles`

## Fonctionnement

Le champ `roles` est un tableau de String. Il :

- contient la valeur `agent_public` si l'utilisateur authentifié est associé à une organisation publique
- contient la valeur `agent_public_etat` si l'utilisateur est associé à la Fonction Publique d'État
- contient la valeur `agent_public_territorial` si l'utilisateur est associé à la Fonction Publique Territoriale
- est vide sinon

Le calcul de cette valeur est détaillé dans [ce code](https://github.com/proconnect-gouv/proconnect-identite/blob/main/packages/identite/src/services/organization/compute-service-public-info.ts).
