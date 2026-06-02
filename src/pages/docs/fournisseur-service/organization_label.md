# Le scope `organization_label`

## Contenu du claim

Le claim `organization_label` est un String.
Il contient le nom d'affichage de l'organisation à laquelle est rattaché l'utilisateur lors de sa connexion. Cette organisation est celle qui correspond au champ `siret` renvoyé également par ProConnect.

Le calcul de cette valeur est détaillé dans [ce code pour la valeur `libelle`](https://github.com/proconnect-gouv/proconnect-identite/blob/2cefef41187c3c7c445146d845a027fbf3ee56cb/packages/identite/src/managers/organization/adapters/api_entreprise.ts#L26-L42).

Cette valeur est enrichie par ProConnect à des fins d'**affichage** pour l'utilisateur final.
