# Erreur Y030031 — redirect_uri non autorisée

## 1. L'erreur

L'erreur `Y030031` signifie que la `redirect_uri` envoyée en paramètre de l'[`/authorization_endpoint`](./implementation_technique.md) ne correspond à aucune des `redirect_uri` enregistrées dans la configuration de votre FS sur ProConnect.

ProConnect refuse la requête par mesure de sécurité : si une `redirect_uri` non autorisée était acceptée, un attaquant pourrait détourner le code d'autorisation vers un serveur qu'il contrôle.

## 2. Sources fréquentes de confusion

### 2.1. Internet et RIE sont deux configurations distinctes

Vos `redirect_uri` sont enregistrées séparément sur les serveurs Internet et sur les serveurs RIE. Une URI autorisée côté Internet ne l'est pas automatiquement côté RIE, et inversement. Voir [la page dédiée aux FS sur le RIE](./fs_RIE.md).

### 2.2. Intégration et production sont deux configurations distinctes

De même, vos `redirect_uri` d'intégration et de production sont gérées indépendamment. Une URI valide en intégration ne sera pas reconnue en production, et inversement.

### 2.3. Mon application est-elle configurée pour Internet ? Pour la production ?

Pour savoir pour quel serveur le `client_id` est configuré, allez sur [la liste complète des Fournisseurs de Service ProConnect](https://grist.numerique.gouv.fr/o/proconnect/gNkPzdjPZnv8/ProConnect-Configuration-des-FI-et-FS/p/14), faites une recherche (`ctrl` + `F`) avec votre `client_id` : vous trouverez où est configurée votre application. Vous aurez aussi la liste complète des `redirect_uris` renseignées.

## 3. Comment identifier ce qui ne va pas

Il y a un mismatch, il faudra donc comparer :

- la liste des `redirect_uris` enregistrées dans votre application (procédure pour la récupérer plus haut)
- la `redirect_uri` demandée à ProConnect

Pour connaître avec certitude la `redirect_uri` demandée à ProConnect, récupérez l'adresse complète de l'URL de l'`authorization_endpoint`, généralement au format `https://PROCONNECT_DOMAIN/api/v2/authorize?acr_values=eidas1&client_id=6925fb8143c76eded44d32b40c0cb1006065f7f003de52712b78985704f39950&nonce=agent_connect_nonce_D2S2eZwHL6rWtDQUg3c37PHyo3LpqtHn&redirect_uri=https%3A%2F%2Fmonurl.gouv.fr%2Fagent_connect%2Fcallback%2F&response_type=code&scope=openid%20email%20given_name%20usual_name&state=agent_connect_state_2yB6wdmHQbjHs8qrJDBD1tyKdc3ijKu6`.

> [!NOTE]
> Vous ne savez pas comment obtenir l'adresse `authorization_endpoint` ? Il s'agit de l'URL de la page qui affiche l'erreur :
>
> - revenez sur la page sur laquelle est affiché le message "redirect_uri did not match any of the client's registered redirect_uris"
> - récupérez l'URL
> - passez l'URL dans un décodeur d'URL ([nous recommandons ce décodeur](https://www.urldecoder.org/))
> - isolez la valeur du query parameter `redirect_uri` de l'URL

Une fois le mismatch identifié, vous pouvez passer à la partie suivante.

## 4. Comment résoudre le problème

Trois situations sont possibles :

- **La `redirect_uri` est correcte mais absente de la configuration ProConnect pour votre FS** : ajoutez-la via la [procédure de modification des redirect_uri](./modification_redirect_uris.md).
- **La `redirect_uri` n'est pas correcte** : changez-la dans votre configuration de développement.
- **Vous appelez le mauvais serveur** : vérifiez que vous ciblez bien le bon environnement (intégration / production) et le bon réseau (Internet / RIE). Voir [la page dédiée aux FS sur le RIE](./fs_RIE.md).
