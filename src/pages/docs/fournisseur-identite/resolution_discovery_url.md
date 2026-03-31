# Résolution de la Discovery URL pour les Fournisseurs d'Identité (FI) sur le RIE

## Contexte

ProConnect doit accéder à la Discovery URL de votre FI au moment de la configuration et lors des échanges OIDC. Pour les FI hébergés sur le RIE, ProConnect résout les noms de domaine via les serveurs DNS du RIE.

Or, **seuls les domaines en `rie.gouv.fr` ou `ader.gouv.fr`** sont résolus par ces serveurs DNS. Si votre FI utilise un autre domaine, la Discovery URL sera inaccessible et l'intégration échouera.

## Ce que vous devez faire

Deux solutions s'offrent à vous :

### Option 1 — Utiliser un domaine en `rie.gouv.fr` ou `ader.gouv.fr` (recommandé)

Assurez-vous que la Discovery URL de votre FI utilise un domaine reconnu par le serveur DNS du RIE.

Exemple : `https://monfi.ministere.rie.gouv.fr/.well-known/openid-configuration`

### Option 2 — Fournir les adresses IP explicitement

Si vous ne pouvez pas utiliser un domaine en `rie.gouv.fr` ou `ader.gouv.fr`, vous devez nous communiquer les adresses IP d'exposition de votre serveur afin que nous puissions le configurer directement.

Contactez-nous à [support.partenaires@mail.proconnect.gouv.fr](mailto:support.partenaires@mail.proconnect.gouv.fr) ou [sur notre chaîne Tchap](https://www.tchap.gouv.fr/#/room/!kBghcRpyMNThkFQjdW:agent.dinum.tchap.gouv.fr).

## Voir aussi

- [Plateformes et Hybridge](./plateformes_fi.md)
- [Référentiel adresses IP](./referentiel-IP.md)
- [Prérequis FI](./prerequis-fi.md)
