# Tutoriel: débuter avec ProConnect… sans écrire de code

« J'ai un service en ligne, je voudrais en proposer l'accès aux agents publics, ça fait mal docteur ? »

Réponse de Normand: ça dépend ! Votre ProConnexion peut être tout à fait indolore, voire plaisante, à condition de se dérouler dans les bonnes conditions. Par contre certains petits pièges peuvent vous compliquer l'existence.

Ce tuto s'adresse aux personnes qui ont les mains dans le code et dans le cambouis; il a pour modeste ambition de consolider certains de nos propres apprentissages. Nous espérons ainsi faciliter votre prise en main de ProConnect pour développer les quelques lignes de code permettant de transformer un service en ligne en « Fournisseur de Service » ProConnecté.

Vos retours serviront à l'améliorer et à rendre l'expérience des personnes qui vous succèderont encore plus fluide !

## Les bons outils

Une bonne boîte à outils vous facilitera grandement la tâche. Voici ceux qui ont été pour nous la clé du succès; si vous en identifiez d'autres, n'hésitez pas à nous les dénoncer:

- [l'espace Partenaires de ProConnect](https://partenaires.proconnect.gouv.fr/)

  - notamment [sa documentation technique](https://partenaires.proconnect.gouv.fr/docs)

  - mais surtout [le formulaire de création d'application test](https://partenaires.proconnect.gouv.fr/apps)

- [le debugger OIDC](https://oidcdebugger.com/)

- le [microscope à JWT](https://jwt.io/)

- l'outil en ligne [curl](https://curl.se/), l'extension VS Code [rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) ou un outil de type [Postman](<https://fr.wikipedia.org/wiki/Postman_(logiciel)>)

Dans ce tuto nous n'utilisons pas les outils suivants, mais ils ont leur utilité pour observer le déroulement d'une connexion via ProConnect:

- [le FS « bac à sable »](https://fsa1v2.integ01.dev-agentconnect.fr/)

- le debugger du navigateur

## Premiers pas: un essai 100% no-code

Pour commencer nous allons nous familiariser avec la « danse » ProConnect, variante non pas du tango argentin mais d'un pas plus exotique dénommé Open ID Connect (ou OIDC pour les intimes).

**Si vous connaissez déjà OIDC** par une utilisation précédente de France Connect ou d'un SSO basé sur ce protocole, bien des choses vont vous sembler familières. Si ce n'est pas le cas, pas de panique pour autant. Comme pour le tango, il faut bien commencer quelque part.

Avant toute chose commencez par créer un nouveau Fournisseur de Services dans l'Espace Partenaires.

**Pourquoi c'est indispensable:** les caractéristiques de sécurité de ProConnect exigent que les Fournisseurs de Service fassent l'objet d'une validation préalable par l'administration. Techniquement, le système OIDC ne peut fonctionner qu'avec une application qui a été préalablement déclarée.

Renseignez son nom (par exemple « Un FS rien que pour moi »), choisissez un algorithme de signature recommandé (plutôt que celui qui vous est proposé par défaut et qui ne l'est pas…). Le champ le plus important est dans la section « Configuration des URLs ».

Renseignez l'URL du debugger OIDC (<https://oidcdebugger.com/debug>) et cliquez sur Ajouter.

Rendez-vous ensuite sur <https://oidcdebugger.com/>

**L'application OIDC Debugger** va jouer dans ce premier essai le même rôle que votre Fournisseur de Service. Vous pouvez la considérer comme une « doublure lumière » de votre FS, ce que nous faisons ici est une répétition des étapes que vous allez ensuite devoir coder dans le FS.

Renseignez les champs suivants:

- Authorize URI: <https://fca.integ01.dev-agentconnect.fr/api/v2/authorize>

- Client ID: celui qui vous a été attribué dans l'Espace Partenaires

- Scope: openid sub given_name usual_name

- c'est tout !

Cliquez maintenant sur le bouton « Send Request ».

Si tout se passe bien, vous allez aboutir sur la page de connexion de ProConnect.

Il se peut que ça ne soit pas le cas: le protocole OIDC est parfois tâtillon. Les partenaires (fournisseurs de service comme fournisseurs d'identité) doivent éviter de se marcher sur les pieds ! En cas de faux pas, ProConnect vous indiquera un code d'erreur. **Ces codes d'erreur sont un moyen** (encore imparfait, mais nous travaillons à les améliorer) **de vous indiquer ce qu'il faut faire pour remédier à une situation incorrecte**.

**Les plus courants de ces codes sont documentés:** [ici dans l'Espace Partenaires](https://partenaires.proconnect.gouv.fr/docs/fournisseur-service/troubleshooting-fs). N'hésitez pas à placer cette page dans vos favoris.

Si vous obtenez une page indiquant simplement **Bad Request**, c'est probablement que vous n'avez pas ajouté l'URL adéquate à votre Fournisseur de Services. Revenez dans l'Espace Partenaires et vérifiez ce point.

## Vos papiers s'il vous plaît…

La phase suivante n'a rien de bien mystérieux, vous allez fournir une adresse servant d'identifiant, et un mot de passe. Le plus simple est d'utiliser l'adresse <user@yopmail.com> et… rigoureusement la même chose pour le mot de passe.

Vous devriez vous retrouver, une fois ces opérations accomplies, de retour sur OIDC Debugger avec l'indication du succès de votre connexion.

Ce n'est pas le bout du chemin cependant, puisque cette même page nous indique qu'il faut maintenant récupérer un « jeton » en échange du code que nous avons reçu.

**« Nous » c'est à dire en l'occurrence OIDC Debugger**, qui comme vous vous en souvenez, joue temporairement le rôle de votre FS: c'est donc votre FS qui va recevoir ce code, en paramètre de l'adresse `redirect_uri` appelée par le navigateur de l'usager, et qui va devoir, côté serveur, l'échanger contre le fameux jeton.

Puis dans un deuxième temps, ce jeton va nous servir enfin à obtenir les informations de l'utilisateur qui vient de se connecter, telles que son nom, prénom, adresse de messagerie et identifiant technique.

## …et plus vite que ça !

La requête permettant d'échanger le code contre un jeton est une requête POST, nous allons donc devoir utiliser un outil permettant d'émettre cette requête.

Dans ce qui suit, remplacez les valeurs par celle de votre FS. (Avec l'extension **rest-client** nous obtenons quelque chose de plus lisible que la commande pour **curl**. Adaptez éventuellement ces paramètres pour fonctionner avec **curl**.)

Il nous faudra être rapide, car les codes comme les jetons dans ces deux étapes ont une durée de vie limitée, respectivement 30 et 60 secondes. Lorsque c'est votre code qui effectuera ces opérations, tout ira bien entendu très vite… Mais pour cette répétition générale, vous devez copier-coller le code d'authentification de OIDC Debugger vers votre commande POST et l'envoyer sous 30 secondes.

<pre>
POST <https://fca.integ01.dev-agentconnect.fr/api/v2/token> HTTP/1.1\
content-type: application/x-www-form-urlencoded\
\
&code=(celui obtenu)\
&grant_type=authorization_code\
&client_id=(le votre)\
&client_secret=(le votre)\
&redirect_uri=<https://oidcdebugger.com/debug>
</pre>

Vous obtiendrez un jeton de la forme suivante:

{ "access_token": "v5q6PWoMIw1Gwu94eTF8-N7kzsogyCldDe9UYCGkE9k", "expires_in": 60, "id_token": (un token très long), "refresh_token": "zmpE-AQmOaDHy5UokaSCvjga-pOCd37OkNsDvhW1Q6h", "scope": "openid given_name usual_name", "token_type": "Bearer" }

La partie intéressante est le `access_token`. Vous pouvez maintenant (sous 60 secondes) fournir ce jeton pour obtenir les informations sur l'usager authentifié:

<pre>
GET <https://fca.integ01.dev-agentconnect.fr/api/v2/userinfo>\
Authorization: Bearer v5q6PWoMIw1Gwu94eTF8-N7kzsogyCldDe9UYCGkE9k
</pre>

Vous allez obtenir une chaîne tout à fait opaque, qui ressemble à ceci:

<pre>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZDAwMWY2NS1jYWY4LTQwMTMtOTg3Zi1hMTBiMWM1NzNkMzciLCJnaXZlbl9uYW1lIjoiTGF1cmVudCIsInVzdWFsX25hbWUiOiJCb3NzYXZpdCIsImF1ZCI6IjQ4ZDA2ZTQyMjQ2N2I4OGQ3M2E4N2ZmOTdjOTQ1NGFlMmRmMGVjZTMwZTJkZTNlZDU2YjdkNTNhNjg4NjNlZmUiLCJleHAiOjE3NDcyNjA5MTYsImlhdCI6MTc0NzI2MDg2NCwiaXNzIjoiaHR0cHM6Ly9mY2EuaW50ZWcwMS5kZXYtYWdlbnRjb25uZWN0LmZyL2FwaS92MiJ9.cRHssvlHzwvYpZHz84xJex_HP5lfJLpgJfHU2qq3klE
</pre>

Dans le code de votre FS, vous devrez faire appel à un composant vous permettant de décoder ce format JWT (JSON Web Token). Pour le faire « en répétition » vous pouvez utiliser l'outil <https://jwt.io/> - votre « Client Secret » vous permet par ailleurs de vérifier l'authenticité de ce jeton.

(Vous pouvez essayer avec l'exemple ci-dessus qui est un véritable jeton obtenu par ce processus.)

## Entrez dans la danse !

Félicitations, vous savez désormais réaliser toutes les étapes que votre code devra prendre en charge pour mener la danse ProConnect en tant que Fournisseur de Service, du moins pour ce qui est de la connexion initiale. (La déconnexion n'est qu'un petit pas supplémentaire.)

Il ne vous reste plus qu'à coder les quelques lignes automatisant ce processus qui vous est désormais familier, et vous joindre au bal.
