# Recommandation de parcours lors de l'implémentation de la Certification Dirigeant

> [!NOTE]
> Ce document complète la [documentation technique de la Certification Dirigeant](./certification-dirigeant.md) en apportant des recommandations UX et UI pour offrir un parcours fluide à vos utilisateurs.

---

## 1. Contexte

La Certification Dirigeant fonctionne comme un niveau d'assurance (ACR) OpenID Connect, de manière similaire à l'authentification multifacteur. Elle permet de vérifier que l'utilisateur est bien le dirigeant d'une organisation donnée en croisant son identité FranceConnect avec les données INSEE / RNE.

Selon la nature de votre service, deux cas d'usage se distinguent :

- **Cas 1 — Action sensible ponctuelle** : l'utilisateur est déjà connecté via un parcours classique. Au moment d'effectuer une action sensible (ex. : fermeture de l'entreprise), votre service déclenche une Certification Dirigeant pour confirmer son identité, à l'image d'une confirmation par authentification multifacteur avant une action irréversible.

- **Cas 2 — Service entièrement sensible** : l'ensemble du service nécessite le statut de dirigeant. La Certification Dirigeant est alors demandée dès la page de connexion.

---

## 2. Populations non éligibles

La Certification Dirigeant ne couvre pas l'ensemble des dirigeants. Voici les populations non éligibles à la certification dirigeant :

- Les organisations publiques
- Les associations
- Les entreprises appartenant exclusivement à des entreprises

Si à terme ProConnect pourra certifier ces population, pour le moment il est impératif de prévoir un parcours alternatif pour ces utilisateurs afin de ne pas les bloquer sans recours.



### 2.1. Afficher clairement les critères d'éligibilité

Avant de déclencher le parcours, affichez une liste de prérequis explicites. L'utilisateur est éligible si toutes ces conditions sont remplies :

- Son organisation est une entreprise privée (SARL, SAS, SA, EI…) immatriculée au RCS/RNE
- Il y figure en tant que dirigeant personne physique (gérant, président, etc.)
- Il possède un compte FranceConnect actif

Exemple de formulation :

> Avant de continuer, vérifiez que vous êtes bien le dirigeant d'une entreprise privée immatriculée en France et que vous possédez un compte FranceConnect.

### 2.2. Proposer un parcours alternatif

Une fois les populations identifiées, ProConnect peut gérer automatiquement le gros de vos connexions. Ainsi, vous pourrez proposer un parcours alternatif. Une solution simple est une interface pour mettre en ligne des pièces de justification et un backoffice qui pourra valider manuellement les quelques comptes qui ont mis des pièces valides.

---

## 3. Cas 1 — Certification Dirigeant pour une action sensible

Dans ce scénario, l'utilisateur est déjà authentifié sur votre service. La Certification Dirigeant intervient comme une étape de confirmation avant une action critique.

[Voici un exemple de parcours avec schémas pour ce cas d'usage](https://www.figma.com/proto/KN1TfabEUBjMMOukq1VbVJ/Tutorials?page-id=26%3A1057&node-id=26-1333&p=f&viewport=-86%2C377%2C0.08&t=EQBPjFFUYJ4gdpVl-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=26%3A1333)

### 3.1. Informer l'utilisateur avant le déclenchement

Affichez une modale ou une page interstitielle précisant :

1. Pourquoi cette vérification est nécessaire (ex. : « Cette action est irréversible et requiert de confirmer votre statut de dirigeant »)
2. Ce qui va se passer (redirection vers ProConnect pour une vérification d'identité en tant que dirigeant)
3. Que l'action sera disponible immédiatement après certification

Cette étape d'information, analogue au prompt de confirmation avant une action MFA, réduit l'abandon et les demandes support.

Exemple de formulation :

> Pour finaliser cette action, nous devons confirmer votre statut de dirigeant. Vous allez être redirigé vers ProConnect. Une fois la vérification effectuée, vous reviendrez automatiquement sur cette page.

### 3.2. Déclencher la certification au moment de l'action sensible

Placez un bouton de déclenchement directement au point d'entrée de l'action sensible (et non en amont). Lors du clic :

1. Stockez l'état courant (action en attente, données du formulaire) dans la session ou via le paramètre `state` de la requête `/authorize`.
2. Lancez le flux OpenID Connect avec le paramètre `claims` incluant l'ACR requis ([voir documentation technique](./certification-dirigeant.md#2-configuration-du-paramètre-claims)).
3. Après retour, vérifiez l'`acr` dans l'ID token côté serveur avant d'exécuter l'action.

### 3.3. Gérer le retour après certification

- Succès : restaurez le contexte de session et exécutez (ou affichez) l'action sensible directement. Ne redemandez pas la certification tant que la session est active.
- Échec (ACR absent ou incorrect) : affichez un message explicite indiquant la cause (ex. : « Votre statut de dirigeant n'a pas pu être confirmé ») et proposez le parcours alternatif (voir section 2.2) ainsi qu'un lien vers le support.

---

## 4. Cas 2 — Certification Dirigeant dès la connexion

Dans ce scénario, l'accès au service est réservé aux dirigeants. La Certification Dirigeant est exigée dès le point d'entrée.

[Voici un exemple de parcours avec schémas pour ce cas d'usage](https://www.figma.com/proto/KN1TfabEUBjMMOukq1VbVJ/Tutorials?page-id=26%3A1057&node-id=26-1058&p=f&viewport=-86%2C377%2C0.08&t=EQBPjFFUYJ4gdpVl-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=26%3A1058)


### 4.1. Distinguer le parcours Certification Dirigeant du parcours classique

La page de connexion présente un seul parcours principal : le bouton ProConnect Certification Dirigeant. En complément, indiquez discrètement (lien ou texte secondaire) le parcours alternatif à destination des populations non éligibles (voir section 2.2).

### 4.2. Préciser le public éligible et les prérequis

Affichez les prérequis en amont du bouton de connexion (voir section 2.1) pour que l'utilisateur sache qu'il est au bon endroit avant de lancer le flux.

### 4.3. Proposer un parcours alternatif en cas d'échec ou de non-éligibilité

En cas d'échec de certification, redirigez vers une page dédiée indiquant la cause et proposant :

- Le parcours alternatif pour les populations non éligibles (voir section 2.2)
- Un lien vers le support

---

## 5. Checklist d'implémentation

- [ ] Les critères d'éligibilité sont affichés avant le bouton de connexion
- [ ] Un parcours alternatif est accessible pour les populations non éligibles
- [ ] L'utilisateur est informé de ce qui va se passer avant le déclenchement du flux
- [ ] Le paramètre `state` (ou session) préserve le contexte avant la redirection
- [ ] L'`acr` est vérifié côté serveur après réception de l'ID token ([voir documentation technique](./certification-dirigeant.md#4-traitement-par-proconnect))
- [ ] En cas d'échec, le message indique la cause et propose le parcours alternatif ou le support
