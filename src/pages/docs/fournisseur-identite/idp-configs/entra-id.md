# Configuration de votre Fournisseur d'Identité avec Microsft Entra ID

## Prérequis

- un compte Microsoft Azure
- un compte Microsoft Entra ID
- une licence Entra ID P1 ou P2

Par ailleurs la configuration suivante suppose un tenant (locataire) de type « Workforce » (annuaire interne d'entreprise) mais est susceptible de s'adapter à d'autres types.

## Créer une « App Registration » (Inscription d'Application)

Pour la création les paramètres importants sont:

- Nom: libre
- Type de compte: Single Tenant
- Redirect URI: l'adresse de redirection telle que décrite dans la [configuration](./../configuration.md) ProConnect (section « Créer un client »)

⚠️ Ces adresses doivent être enregistrées avec le type « Web » et non pas « Application à page unique » (Single Page Application): une erreur **AADSTS9002325** peut être affichée dans ce derniers cas

## Créer un Client Secret

Dans l'application ainsi créée, créer un Client Secret via l'entrée Certificates & Secrets. **Attention** à bien noter la valeur du secret qui ne sera affichée qu'à la création. Noter également l'identifiant du Client ainsi créé.

Cette paire client secret et client ID correspond aux informations transmises lors de votre demande d'enregistrement auprès de ProConnect comme fournisseur d'identité.

## Configuration du Token (jeton)

Dans la section Token Configuration de l'application, dans la partie « Optional Claims » nous conseillons de faire figurer:

- `acrs`
- `email`
- `given_name`
- `preferred_username`
- `verified_primary_email`

## Manifeste d'application

Dans la section Manifest de la configuration de l'application, modifiez le texte du fichier de configuration, en recherchant la mention `"acceptMappedClaims": null` pour la modifier en `"acceptMappedClaims": true` . Cette modification autorise la configuration des correspondances d'attributs. (L'erreur **AADSTS50146** peut se produire tant que cette modification n'est pas effectuée.)

## Correspondances d'attributs

Votre application apparaît également dans la section Entreprise Apps (Applications d'entreprise), à cet endroit vous pouvez configurer des correspondantes permettant de présenter avec les noms attendus par ProConnect des attributs de vos comptes usager.

Sélectionnez votre application, puis la section Single Sign-On. Configurez les correspondances suivantes:

- `usual_name` -> `user.surname`
- `uid` -> `user.objectid`
- `siret` -> `user.department` (c'est une suggestion: vous pouvez configurer l'attribut qui vous convient, du moment que le SIRET approprié est renvoyé avec le nom `siret` pour chaque usager)

## Renseigner l'adresse de messagerie des comptes

Certains champs sont considérés comme « réservés » et ne peuvent pas faire l'objet d'une configuration de correspondance. C'est notamment le cas du champ `email` qui est requis pour l'identité ProConnect. Ce champ est fourni à partir de la propriété « Adresse de contact » du compte usager; il doit donc impérativement être renseigné (et conforme à l'adresse qui sert d'identifiant du compte).

## Adresses des endpoints (points de terminaison)

- Discovery URL: [https://login.microsoftonline.com/<tenant-id>/.well-known/openid-configuration](https://login.microsoftonline.com/4d7c0522-66af-419d-b17d-ee19db95acae/.well-known/openid-configuration)

- Logout URL: [https://login.microsoftonline.com/<tenant-id>/oauth2/logout](https://login.microsoftonline.com/4d7c0522-66af-419d-b17d-ee19db95acae/oauth2/logout)

## Algorithmes de chiffrement

- `id_token_signed_response_alg` : RS256
- `userinfo_signed_response_alg` : Aucun

## Autres types de tenants (locataires)

Pour les tenants externes les endpoints ont la forme suivante :

- `https://<tenant-id>.ciamlogin.com/<tenant-id>/v2.0`
- une erreur **AADSTS500208** sanctionne les tentatives de connexion avec une identité provenant du mauvais type de tenant
