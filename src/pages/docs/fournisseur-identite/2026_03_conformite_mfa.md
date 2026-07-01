# Conformité MFA — Feuille de Route Cyber ANSSI 2026-2027

La [Feuille de Route de Sécurité Numérique 2026-2027 de l'ANSSI](https://cyber.gouv.fr/nous-connaitre/publications/feuilles-de-route-de-la-securite-numerique-de-letat/feuille-de-route-de-securite-numerique-2026-2027/) impose de « Déployer une authentification multi-facteur des utilisateurs sur le système d'information et de communication de l'État » **avant le 28 février 2027**.

ProConnect et ses Fournisseurs d'Identité sont concernés par cette obligation.

ProConnect a récemment changé les niveaux d'assurance renvoyés aux Fournisseurs d'Identité. Nous demandons à nos Fournisseurs d'Identité de verifier leur conformité MFA et de nous prévenir par mail à support.partenaires@mail.proconnect.gouv.fr. La liste des Fournisseurs d'Identité compatibles est disponibles ici : https://grist.numerique.gouv.fr/o/proconnect/gNkPzdjPZnv8/ProConnect-Configuration-des-FI-et-FS/p/13

Afin de vérifier que votre Fournisseur d'Identité est conforme avec cette nouvelle norme, voici la procédure.

## Vérifier la conformité de votre FI en intégration

### Vérifier la connexion fonctionnelle des niveaux d'ACR possibles

- Allez sur [https://test.proconnect.gouv.fr/](https://test.proconnect.gouv.fr/) et cliquez sur `Connexion - implémentation Fournisseur d’Identité`
- La connexion devrait être fonctionnelle

> [!NOTE]
> Ce lien renvoie tous les ACR possibles que ProConnect peut demander. Si la connexion est fonctionnelle, c'est que vous n'aurez pas d'écran de plantage en cas d'un ACR demandé par un Fournisseur de Service. Plus d'information dans les niveaux d'assurance et les ACR dans la note dédiée : [Niveaux d'Assurance](./niveaux-assurance-eidas.md)

### Vérifier que l'authentification multifacteur est fonctionnelle

- Allez sur [https://test.proconnect.gouv.fr/](https://test.proconnect.gouv.fr/) et cliquez sur `Forcer une connexion à deux facteurs`
- La connexion devrait proposer un parcours d'authentification multifacteur
- La connexion doit être fonctionnelle
- Le niveaux `acr` renvoyé doit être conforme au parcours d'authentification.
  - Exemple : `eidas2` si c'est un TOTP
  - Exemple : `eidas3` si c'est par carte agent
  - Plus d'information sur les exigences européennes de sécurité dans la ressource commune de la norme eidas : [Norme eIDAS](../ressources/norme_eidas.md)

## Production

## Bonus - les AMR

## Notes relatives

Voici quelques notes relatives rédigées par les équipes de ProConnect au sujet de la MFA :

- [Norme eIDAS](../ressources/norme_eidas.md) : ressource commune FI/FS qui détaille les trois niveaux d'assurance (eidas1, eidas2, eidas3), les méthodes d'authentification associées et les exigences MFA par niveau. Indispensable pour comprendre ce que ProConnect attend concrètement de votre FI.
- [Niveaux d'assurance (eidas) pour les FI](./niveaux-assurance-eidas.md) : décrit comment ProConnect utilise l'attribut `acr` et ce que chaque valeur signifie du point de vue d'un Fournisseur d'Identité. À lire pour savoir quelle valeur `acr` retourner selon le parcours d'authentification proposé.
- [Authentification multi-facteur pour les FI](./authentification-multifacteur.md) : explique comment ProConnect signale une exigence MFA à votre FI et ce que vous devez retourner dans l'ID token. La page de référence pour implémenter la MFA côté FI.
- [MFA pour les Fournisseurs de Service](../fournisseur-service/double_authentification.md) : explique comment un FS active l'exigence de double authentification. Utile pour comprendre d'où vient la demande que votre FI reçoit et ce que le FS attend en retour.
- amr ressource commune _(à compléter)_
