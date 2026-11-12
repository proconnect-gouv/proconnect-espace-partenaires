# 🏢 Qu'est-ce que la certification dirigeant ?

La certification dirigeant est un niveau de garantie que ProConnect peut attacher à une connexion pour prouver que la personne connectée est l'un des dirigeants déclarés de l'organisation qu'elle a sélectionnée.

Elle s'obtient en croisant l'identité personnelle de l'usager avec les registres officiels d'entreprises. Un fournisseur de service l'exige en demandant un niveau de garantie (`acr`) spécifique dans sa requête OpenID Connect.

> [!TIP]
> Dans les grandes lignes, la certification est comme l'équivalent numérique de la comparaison entre KBis et la carte d'identité d'une personne pour les procédures de son entreprise.

> [!CAUTION]
> Cette fonctionnalité est disponible de manière expérimentale et pourrait évoluer. Pour passer en production, merci de prendre contact avec nous par mail à [support.partenaires@mail.proconnect.gouv.fr](mailto:support.partenaires@mail.proconnect.gouv.fr).

## 1. Ce que la certification garantit

La Certification Dirigeant atteste : l'état civil de la personne connectée correspond exactement à celui d'un dirigeant déclaré de l'entreprise sélectionnée, tel que publié par les registres officiels.

## 2. Comment ça marche

Du point de vue de l'usager, le parcours se déroule en quatre temps :

1. il sélectionne son organisation dans ProConnect
2. ProConnect lui demande de confirmer son identité (via FranceConnect)
3. ProConnect récupère auprès des registres la liste des dirigeants déclarés de l'entreprise
4. ProConnect compare l'identité RNIPP à celle de chaque dirigeant. Si l'une correspond, la connexion est certifiée.

Aucune pièce justificative n'est demandée et aucune validation humaine n'intervient : la certification est automatique, ou elle échoue.

La comparaison porte sur l'unité légale (le SIREN), pas sur l'établissement : un dirigeant est certifié quel que soit l'établissement (le SIRET) qu'il a sélectionné.

### 2.1. Les registres interrogés

| Type d'organisation     | Registre utilisé                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| Entrepreneur individuel | Répertoire Sirene de l'INSEE                                                                                    |
| Toutes les autres       | Registre National des Entreprises (RNE) de l'INPI, avec repli sur le Registre du commerce et des sociétés (RCS) |

### 2.2. La correspondance d'identité

Cinq critères sont comparés, et **tous doivent correspondre** pour que la certification soit accordée :

- le nom de famille
- le premier prénom
- le sexe
- la date de naissance
- le lieu de naissance : la commune pour une naissance en France, le pays sinon.

Une correspondance partielle ne certifie pas. Une divergence d'état civil entre FranceConnect et le registre suffit donc à faire échouer la certification d'une personne qui est pourtant bien dirigeante de l'entreprise.

## 3. Qui peut être certifié

Trois conditions doivent être réunies :

1. l'organisation appartient à l'une des catégories juridiques couvertes (voir 3.1)
2. la personne y est déclarée comme dirigeant **personne physique** dans le registre
3. elle possède un compte FranceConnect dont l'état civil correspond à celui du registre

### 3.1. Les catégories juridiques couvertes

La certification s'appuie sur une liste fermée de catégories juridiques INSEE. Elle couvre notamment :

- l'entrepreneur individuel
- les sociétés commerciales : SARL, SAS, SA, SNC, sociétés d'exercice libéral, sociétés coopératives…
- les sociétés civiles : SCI, sociétés civiles professionnelles, de moyens, d'exploitation agricole…
- certains établissements publics à caractère industriel ou commercial et régies de collectivités
- les sociétés étrangères, immatriculées ou non au RCS
- certaines mutuelles et sociétés d'assurance à forme mutuelle.

La liste de référence est tenue dans [le code de ProConnect](https://github.com/proconnect-gouv/proconnect-identite/blob/main/packages/identite/src/data/certification/categories-juridiques-sources.ts).

## 4. Qui ne peut pas l'être

La certification dirigeant ne couvre pas l'ensemble des dirigeants. Ne peuvent pas être certifiés :

- les organisations de droit administratif : État, collectivités territoriales, établissements publics administratifs ;
- les groupements de droit privé : associations, fondations, syndicats ;
- les groupements sans personnalité morale ;
- les entreprises dont tous les dirigeants déclarés sont des personnes morales : le registre ne publie alors aucun état civil à comparer ;
- les personnes sans compte FranceConnect ;
- les dirigeants dont l'état civil au registre diverge de celui que renvoie FranceConnect.

> [!IMPORTANT]
> Si ProConnect pourra à terme certifier une partie d'entre elles, il est pour le moment impératif de prévoir un parcours alternatif afin de ne pas les bloquer sans recours. Voir [les recommandations de parcours](../fournisseur-service/recommandation-parcours-certification-dirigeant.md).

## 5. Quand l'utiliser

La Certification Dirigeant est une fonctionnalité qui permet de garantir que vous parlez à une personne qui a des droits importants d'une organisation.

C'est un processus plus lourd qu'une simple création de compte, mais indispensable pour des démarches qui demandent d'avoir au bout du fil la bonne personne (exemple : une application où l'on rentre des IBAN pour recevoir des subventions).

## 6. Délégation

ProConnect répond à une seule question : cette personne est-elle dirigeante de cette entreprise ? Il n'existe pas de niveau « mandaté par le dirigeant », et aucune donnée transmise ne décrit un mandat. En l'état, la Certification Dirigeant ne permet donc pas de déléguer.

Si votre service doit par exemple s'ouvrir à un expert-comptable, un avocat ou un salarié habilité, la délégation se construit chez vous, à partir de ce que ProConnect vous garantit :

1. le dirigeant se connecte avec la certification dirigeant — c'est le socle de confiance
2. depuis votre service, il désigne les personnes autorisées à agir pour le compte de son entreprise
3. ces personnes se connectent ensuite avec ProConnect, sans certification, et votre service leur applique les droits que le dirigeant leur a accordés.

ProConnect vous garantit le point de départ ; la chaîne de délégation qui en découle vous appartient.

## 7. Comment y accéder

La certification dirigeant est expérimentale : elle est disponible en intégration, et son passage en production se fait après prise de contact avec [le service partenaires](../fournisseur-service/aide_support.md).

Vous pouvez la tester dès maintenant en intégration avec des données fictives : voir [la documentation technique](../fournisseur-service/implementer-certification-dirigeant.md#62-tester-la-certification-dirigeant-en-intégration).

## 8. Pour aller plus loin

| Page                                                                                                                               | Question                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Implémentation technique - Certification Dirigeant](../fournisseur-service/implementer-certification-dirigeant.md)                | Comment demander et vérifier la certification dirigeant dans mon flux OpenID Connect ?   |
| [Recommandations de parcours - Certification Dirigeant](../fournisseur-service/recommandation-parcours-certification-dirigeant.md) | Quelles règles de design de parcours dois-je respecter pour la certification dirigeant ? |
| [Niveaux ACR](../fournisseur-service/niveaux-acr.md)                                                                               | Quels sont les autres niveaux de garantie disponibles dans la fédération ?               |
