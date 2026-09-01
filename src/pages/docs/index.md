# 📚 Documentation technique

## 1. 🧭 Comment fonctionne ProConnect ?

Voici un schéma explicatif de ProConnect. L'utilisateur clique sur ProConnect, arrive sur ProConnect, puis saisit son adresse email : selon le domaine de cette adresse, il est redirigé vers le Fournisseur d'Identité de son organisation, ou bien il crée un compte ProConnect Identité. Une fois la connexion effectuée, la rédirection est effectuée vers ProConnect puis vers le service.

```
                 ┌────────────────────────┐
                 │   Fournisseur de       │
                 │      Service           │
                 └──────────┬─────────────┘
                            │  1. Clic sur ProConnect
                            ▼
                 ┌────────────────────────┐
                 │       ProConnect       │
                 │  saisie de l'email     │
                 └──────────┬─────────────┘
                            │  2. Redirection FI
                   ┌────────┴─────────────┐
              domaine email          domaine email
              avec un FI             sans FI connu
                   │                      │
                   ▼                      ▼
        ┌───────────────────┐   ┌─────────────────────────┐
        │ Fournisseur       │   │  ProConnect Identité :  │
        │ d'Identité (FI) : │   │  création de compte     │
        │ connexion avec    │   │  email / mot de passe   │
        │ le compte pro     │   │                         │
        └─────────┬─────────┘   └────────────┬────────────┘
                  │                          │
                  └─────────┬────────────────┘
                            │  3. Retour vers ProConnect
                            ▼
                 ┌────────────────────────┐
                 │       ProConnect       │
                 └──────────┬─────────────┘
                            │  4. Retour vers le service
                            ▼
                 ┌────────────────────────┐
                 │   Fournisseur de       │
                 │   Service - connecté   │
                 └────────────────────────┘
```

## 2. 🏢 Vous êtes Fournisseur de Service ?

Vous implémentez le bouton ProConnect pour permettre à vos utilisateurs de s'identifier sur un de vos services en ligne ?

➡️ Consultez la [documentation Fournisseur de Service (FS)](./fournisseur-service/index.mdx).

## 3. 🔑 Vous êtes Fournisseur d'Identité ?

Vous intégrez ProConnect en tant que Fournisseur d'Identité et permettez aux membres de votre organisation de se connecter via ProConnect sur plusieurs services en ligne ?

➡️ Consultez la [documentation Fournisseur d'Identité (FI)](./fournisseur-identite/index.mdx).

## 4. 🤔 Question technique

Pour toute question relative à l'implémentation de ProConnect pour votre application, vous pouvez contacter l'équipe technique partenaires par les deux canaux suivants :

- par mail à support.partenaires@mail.proconnect.gouv.fr
- [sur notre chaîne Tchap](https://www.tchap.gouv.fr/#/room/!kBghcRpyMNThkFQjdW:agent.dinum.tchap.gouv.fr)
