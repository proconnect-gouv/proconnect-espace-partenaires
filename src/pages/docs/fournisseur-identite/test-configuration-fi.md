# Test de la configuration de votre Fournisseur d'Identité (FI)

## ⚙️ 1. Fonctionnement et inscription

### 1.1. Routage par domaine email

ProConnect propose un système de redirection par domaine email : votre FI est associé à un ou plusieurs domaines, et ProConnect redirige automatiquement les usagers qui saisissent une adresse correspondante.

Par exemple, si vos domaines sont `@france.fr` et `@france.gouv.fr`, tout usager avec une de ces adresses sera redirigé vers votre FI.

### 1.2. Inscription préalable

> [!IMPORTANT]
> Afin de pouvoir récupérer les éléments techniques tels que la `discovery_url` ou le `client_id` et d'ouvrir les flux nécessaires, vous devez avoir soumis le [formulaire d'inscription du FI](https://www.demarches-simplifiees.fr/commencer/demande-creation-fi-fca). Une fois ce formulaire validé, c'est que le FI est prêt à être testé.

## 📎 2. URL du Fournisseur de Service

Selon votre environnement et le réseau de votre FI :

|             | Internet                                                  | RIE                                             |
| ----------- | --------------------------------------------------------- | ----------------------------------------------- |
| Intégration | https://test.proconnect.gouv.fr                           | https://fsa1v2.integ02.agentconnect.rie.gouv.fr |
| Production  | [Docteur ProConnect](https://docteur.proconnect.gouv.fr/) | [CisirRH](https://portail.cisirh.rie.gouv.fr)   |

## 🧪 3. Protocole de test

### 3.1. Intégration

1. Rendez-vous sur l'URL de test correspondant à votre réseau (tableau ci-dessus)
2. Cliquez sur **"S'identifier avec ProConnect"**
3. Saisissez une adresse e-mail dont le domaine correspond à votre FI
4. Cliquez sur **"Se connecter"** : vous devriez être redirigé vers votre portail d'authentification
5. Connectez-vous avec des identifiants de recette sur votre FI
6. Vous devriez être redirigé vers l'écran principal avec les informations de votre utilisateur

### 3.2. Production

Mêmes étapes, avec une précaution supplémentaire :

> [!NOTE]
> Pour éviter de rediriger des usagers réels vers un FI pas encore prêt, nous avons un système pour cacher le FI et il faudra ajouter `+proconnect` dans le préfixe de l'adresse e-mail de test. Par exemple : `test+proconnect@france.fr` ou `marie.martin+proconnect@france.fr`.

## ✅ 4. La checklist du FI fonctionnel

Voici ce que nous attendons d'un Fournisseur d'Identité fonctionnel :

- [ ] Le parcours de connexion complet est fonctionnel
- [ ] Le parcours de déconnexion complet est fonctionnel
- [ ] [La connexion par double-authentification](./authentification-multifacteur.md) renvoie un comportement maitrisé par vous qui ne casse pas le parcours

## 🆘 5. En cas d'erreur

Si le test échoue, deux ressources sont disponibles :

- [Configuration](./configuration.md) - la page qui explique comment configurer son Fournisseur d'Identité
- [Erreurs récurrentes](./troubleshooting-fi.md) — liste des codes d'erreur les plus fréquents et leur résolution
