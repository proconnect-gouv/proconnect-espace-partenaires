# 🧪 Test de la connexion d'un Fournisseur de Service

Lorsque vous implémentez la connexion OIDC via ProConnect sur votre Fournisseur de Service, vous voudrez sans doute tester la connexion à votre Fournisseur de Service.

## 📋 Liste des fournisseurs d'identité en intégration

[Voici la liste des Fournisseurs d'Identité](https://grist.numerique.gouv.fr/o/docs/3kQ829mp7bTy/ProConnect-Configuration-des-FI-et-FS/p/2) sur notre plateforme d'intégration. Si vous avez accès à des comptes de test, vous pouvez les utiliser.

## 🔐 Fournisseur d'Identité de test

Nous avons mis à disposition des identifiants de test sur différents Fournisseurs d'Identité.

Vous pouvez tester des identitifiants avec nos Fournisseurs de Service de test :

- Sur internet : https://test.proconnect.gouv.fr
- Sur le RIE : https://fsa1v2.integ02.agentconnect.rie.gouv.fr

### 🔧 FIA1 – FI pour tests et intégration

**En intégration** sur **Internet** et le **RIE**, ProConnect possède un Fournisseur d'Identité de test qui permet d'utiliser n'importe quel identifiant.

Pour tester la connexion sur votre Fournisseur de Service :

- cliquez sur le bouton "S'identifier avec ProConnect" depuis votre Fournisseur de Service **en intégration**
- à l'arrivée sur la mire ProConnect, entrez un email en `@test.proconnect.gouv.fr` (par exemple `test@test.proconnect.gouv.fr` ou `marie.durant@test.proconnect.gouv.fr`). Nous vous redirigerons vers le FI de test de ProConnect
- vous pouvez choisir des éléments comme l'`email`, le `SIRET`, ou l'`ACR`
  - Vous pouvez par exemple rentrer `john.lennon@elysee.fr` en `eidas3` pour le SIRET [10000001700010](https://annuaire-entreprises.data.gouv.fr/entreprise/republique-francaise-presidence-100000017)
- cliquez sur "Se connecter". Nous vous redirigerons vers votre Fournisseur de Service avec les éléments sélectionnés

### 🔧 ProConnect Identité

**En intégration** sur **Internet** seulement, il vous est possible d'utiliser ProConnect Identité.

Pour tester la connexion sur votre Fournisseur de service :

- cliquez sur le bouton "S'identifier avec ProConnect" depuis votre Fournisseur de Service **en intégration**
- à l'arrivée sur la mire ProConnect, entrez `user@yopmail.com`. Vous serez redirigés vers la sandbox de ProConnect Identité (dont le design est identique à celui de ProConnect Fédération).
- indiquez `user@yopmail.com` également en mot de passe.
- sélectionnez l'organisation de rattachement "Direction Interministérielle du Numérique (DINUM)" (ou toute autre organisation de votre choix). Vous devriez être redirigé vers votre Fournisseur de Service.

Cette plateforme utilise de vraies données ouvertes de l'INSEE pour les données des organisations. Elle n’est cependant connectée à aucun environnement de production.

Avec toute adresse email, vous pouvez créer n’importe quel compte utilisateur en entrant n’importe quel numéro SIRET. Aussi, avec une adresse en `yopmail.com` et en `proton.me`, vous avez accès à une présélection d'organisations que vous pouvez rejoindre.

À noter que nous procédons de manière périodique à des resets de la base de données d'intégration, les comptes peuvent être supprimés. Il existe également [une liste de comptes « persistants »](https://github.com/numerique-gouv/moncomptepro/blob/master/scripts/fixtures.sql#L10) qui sont re-configurés à l'original plusieurs fois par semaines quel que soit l'usage qui en a été fait.
