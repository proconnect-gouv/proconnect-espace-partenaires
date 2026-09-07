# Vous êtes sur le RIE ? Voici toutes les exceptions à savoir pour votre cas

Le reste de cette documentation est écrit pour des Fournisseurs de Service hébergés sur Internet. Si votre application est hébergée sur le RIE (Réseau Interministériel de l'État), plusieurs points diffèrent : cette page les regroupe.

## 1. Qu'est-ce que le RIE

ProConnect est hébergé sur deux réseaux :

- Internet
- RIE

Pour chacun des réseaux, ProConnect a un environnement de test et un environnement de production.

> [!IMPORTANT]
> Les environnements ne discutent pas entre eux : des clés d'intégration ne fonctionneront pas en production, et des clés RIE ne fonctionneront pas sur Internet (et inversement).

Voici un schéma de fonctionnement de ProConnect :

![](/images/docs/schema_reseau.png)

## 2. Vue d'ensemble des différences

| Sujet | Internet (par défaut) | RIE |
| --- | --- | --- |
| Obtenir ses clé (intégration) | Auto-service sur [l'espace partenaires](/apps) | [Formulaire Démarche-Numérique](./obtenir_cles_rie.md) |
| Obtenir ses clés (production) | Formulaire Démarche-Numérique | [Formulaire  Démarche-Numérique](./obtenir_cles_rie.md) |
| ProconnectDomain | `fca.integ01.dev-agentconnect.fr` / `auth.agentconnect.gouv.fr` | `fca.integ02.agentconnect.rie.gouv.fr` / `auth.agentconnect.rie.gouv.fr` |
| Adresses IP à autoriser | Liste publique | [Demande spécifique auprès de la PFS](./referentiel-IP.md) |
| Fournisseurs d'Identité disponibles | FI Internet + RIE (si VPN activé) | FI RIE uniquement |
| ProConnect Identité (création de compte email / mot de passe) | Disponible | Non disponible |
| Population couverte | Voir [couverture ProConnect](./couverture-proconnect.md) | Essentiellement des agents publics déjà éligibles |

## 3. Obtenir et modifier vos identifiants

L'espace partenaires n'est pas disponible sur le RIE. L'obtention de vos `client_id` / `client_secret`, ainsi que la modification de vos `redirect_uri`, se font par formulaire Démarche-Numérique : voir [la page dédiée](./obtenir_cles_rie.md).

## 4. Adresses IP à autoriser

Si votre application est sur le RIE, une demande spécifique auprès de la PFS est nécessaire pour autoriser les IP ProConnect. La liste complète est disponible sur la [page du référentiel IP](./referentiel-IP.md).

## 5. Domaines et URLs ProConnect sur le RIE

La valeur de `PROCONNECT_DOMAIN` à utiliser dépend de votre réseau et de votre environnement : voir [la page dédiée](../ressources/valeur_ac_domain.md).

Pour tester une connexion standard, le Fournisseur de Service de test ProConnect sur le RIE est disponible à l'adresse [https://test.proconnect.rie.gouv.fr](https://test.proconnect.rie.gouv.fr).

## 6. Fournisseurs d'Identité disponibles

ProConnect sur ses serveurs Internet peut utiliser des Fournisseurs d'Identité sur Internet et sur le RIE (pour le cas du RIE, à condition que l'agent ait accès au RIE via un VPN ou un accès direct).

ProConnect sur ses serveurs RIE ne peut utiliser que des Fournisseurs d'Identité sur le RIE.

ProConnect Identité (création de compte par email / mot de passe) n'est disponible que sur Internet. Sur le RIE, vos utilisateurs ne peuvent se connecter que via un Fournisseur d'Identité. Le schéma de fonctionnement présenté dans [l'introduction de la documentation](../index.md) (qui inclut la branche ProConnect Identité) ne s'applique donc pas au cas d'une application sur le RIE.

Pour savoir quels sont les Fournisseurs d'Identité disponibles sur le RIE, voici le tableau dédié : [Liste des Fournisseurs d'Identité ProConnect](https://grist.numerique.gouv.fr/o/proconnect/gNkPzdjPZnv8/ProConnect-Configuration-des-FI-et-FS)

## 7. Qui peut se connecter

Les [cas non couverts par ProConnect](./couverture-proconnect.md) (étudiants, entreprises étrangères, organisations sans SIRET...) s'appliquent sur Internet. 

Sur le RIE, seuls les personnes ayant un Fournisseur d'Identité sur le RIE branché à ProConnect peuvent se connecter. Pour savoir quels sont les Fournisseurs d'Identité disponibles sur le RIE, voici le tableau dédié : [Liste des Fournisseurs d'Identité ProConnect](https://grist.numerique.gouv.fr/o/proconnect/gNkPzdjPZnv8/ProConnect-Configuration-des-FI-et-FS)

