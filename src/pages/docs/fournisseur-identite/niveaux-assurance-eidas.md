# Niveaux d'assurance (eidas) pour les Fournisseurs d'Identité

## Les niveaux d'assurance (ACR)

Pour indiquer le niveau d'assurance d'une authentification, ProConnect utilise l'attribut `acr` (Authentication Context Class Reference).

Les niveaux d'assurance sont définis selon trois axes : la qualité de l'identité, la méthode d'authentification, et le lien avec l'organisation.

| Valeur `acr` | Identité              | Authentification      | Organisation                            |
| ------------ | --------------------- | --------------------- | --------------------------------------- |
| `eidas0`     | Faible ou déclarative | Simple (mot de passe) | Modération ou déclaratif                |
| `eidas0-mfa` | Faible ou déclarative | **MFA**               | Modération ou déclaratif                |
| `eidas1`     | Faible                | Simple (mot de passe) | Modération ou plus                      |
| `eidas1-mfa` | Faible                | **MFA**               | Modération ou plus                      |
| `eidas2`     | Substantielle         | **MFA**               | Lien certifié par une source officielle |
| `eidas3`     | Élevée                | **MFA**               | Lien certifié par une source officielle |

> [!NOTE]
> `eidas2` et `eidas3` impliquent **toujours** une MFA. Il n'existe pas de variante simple-facteur pour ces niveaux. Pour en savoir plus sur l'authentification multifacteur, [voici la page dédiée](./authentification-multifacteur.md)

### Détail des niveaux eidas2 et eidas3

**Lien certifié par une source officielle** désigne un processus d'embarquement RH : l'identité de la personne a été vérifiée à son arrivée (via des justificatifs ou un processus interne), puis elle a été rattachée à l'organisation dans l'annuaire (création de compte, remise des moyens d'authentification).

La distinction entre eidas2 et eidas3 porte sur le type de moyen de double authentification :

| Niveau   | Exemple de moyen d'authentification   |
| -------- | ------------------------------------- |
| `eidas2` | TOTP (application d'authentification) |
| `eidas3` | Carte à puce avec code PIN            |
