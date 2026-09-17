# Le scope `roles`

## Fonctionnement

Le champ `roles` est un tableau de String. Il :

- contient la valeur `agent_public` si l'utilisateur authentifié est associé à une organisation publique
- contient la valeur `agent_public_etat` si l'utilisateur est associé à la Fonction Publique d'État
- contient la valeur `agent_public_territorial` si l'utilisateur est associé à la Fonction Publique Territoriale
- est vide sinon

Le calcul de cette valeur est détaillé dans [ce code](https://github.com/proconnect-gouv/proconnect-identite/blob/main/packages/identite/src/services/organization/compute-service-public-info.ts).

## Demande

Le champ `roles` n'est pas systématiquement renvoyé par ProConnect. Pour l'obtenir, il suffit d'en faire la demande par mail à support.partenaires@mail.proconnect.gouv.fr en indiquant le client_id de l'application en expliquant l'utilisation souhaitée de ce champ `roles`.

## Usage du champ `roles` par le Fournisseur de Service à des fins de blocage

Si vous souhaitez bloquer l'accès à votre application pour les utilisateurs qui ne possèdent pas certaines valeurs du champ `roles`, il est **impératif de respecter les règles suivantes** sur l'écran de blocage:

- indiquer à l'utilisateur la règle du blocage
- indiquer à l'utilisateur les rôles qui lui sont associés
- indiquer à l'utilisateur le SIRET et le nom (claims `siret` et `organization_label` renvoyés systématiquement par ProConnect) de son organisation de rattachement

Voici un exemple de message d'erreur qui respecte ces consignes :

> [!CAUTION]
> Vous n'êtes pas autorisé à vous connecter à cette application.
> Cette application n'autorise que les agents publics de la Fonction Publique Territoriale. Or, les rôles qui vous sont associés sont : "agent_public", "agent_public_etat" pour l'organisation de rattachement "DINUM" (SIRET: 13002526500013)
