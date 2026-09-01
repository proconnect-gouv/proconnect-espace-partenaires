# Erreur : client is invalid

## 1. L'erreur

L'erreur `invalid_client` signifie que ProConnect ne trouve pas de `client_id` avec le client_id que vous envoyez.

Cela peut être dû à une coquille, mais elle est souvent dûe à cause d'un appel sur le mauvais environnement de ProConnect.

## 2. Sources fréquentes de confusion

### 2.1. Internet et RIE sont deux configurations distinctes

Vos `client_id` sont enregistrés séparément sur les serveurs Internet et sur les serveurs RIE. Un `client_id` d'une application pour Internet ne marchera pas pour les serveurs RIE et vice-versa. Voir [la page dédiée aux FS sur le RIE](./fs_RIE.md).

### 2.2. Intégration et production sont deux configurations distinctes

De même, un `client_id` d'intégration et de production sont gérées indépendamment. Un `client_id` d'une application d'intégration ne marchera pas pour une application de production et inversement.

## 3. Mon application est-elle configurée pour Internet ? Pour la production ?

Pour savoir pour quel serveur le `client_id` est configuré, allez sur [la liste complète des Fournisseurs de Service ProConnect](https://grist.numerique.gouv.fr/o/proconnect/gNkPzdjPZnv8/ProConnect-Configuration-des-FI-et-FS/p/14), faites une recherche (`ctrl` + `F`) avec votre `client_id` : vous trouverez votre `client_id`. Si vous ne le trouvez pas, c'est qu'il y a une coquille.

Puis identifiez quel environnement de ProConnect vous appelez. [La page d'implémentation technique](./implementation_technique.md) pourra vous aider à ce sujet. La valeur de [PROCONNECT_DOMAIN](../ressources/valeur_ac_domain.md) vous permettra de savoir la bonne url à appeler.

## 4. Comment résoudre le problème

Deux situations sont possibles :

- Il y a une coquille : retrouvez votre `client_id` et changez-le
- Vous appelez le mauvais environnement ProConnect : corrigez la valeur de PROCONNECT_DOMAIN pour mettre l'environnement où votre `client_id` est enregistré
