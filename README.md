# Espace Partenaire ProConnect

https://partenaires.proconnect.gouv.fr/

Cette application permet aux partenaires de ProConnect (fournisseurs de services et fournisseurs d'identité) de créer de nouveaux identifiants en preprod, ainsi que de consulter la [documentation d'implémentation](https://partenaires.proconnect.gouv.fr/docs).

Son code est basé sur [Next.js](https://nextjs.org/), connecté à deux bases de données :

- une base de données PostgreSQL pour les sessions en cours
- la base de données MongoDB externe de ProConnect où sont stockés les applications

Ce dépôt a été initié à partir du [template Next.js de betagouv](https://github.com/betagouv/template-nextjs).

## Lancer le code

Après avoir cloné le projet :

### Développement

```bash
docker-compose up -d # pour lancer les conteneurs de base de données
npm install # pour installer les dépendances
npm run dev # pour lancer en mode développement
```

Il suffit ensuite de se rendre sur [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

### Tests

```
# lancer les tests unitaires
npm run test

# lancer les tests end-to-end
npm run e2e --ui
```
