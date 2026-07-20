# Espace Partenaires ProConnect

https://partenaires.proconnect.gouv.fr/

Cette application permet aux partenaires de ProConnect (fournisseurs de services et fournisseurs d'identité) de créer de nouveaux identifiants en preprod, ainsi que de consulter la [documentation d'implémentation](https://partenaires.proconnect.gouv.fr/docs).

Son code est basé sur [Next.js](https://nextjs.org/), connecté à deux bases de données :

- une base de données PostgreSQL pour les sessions en cours
- la base de données MongoDB externe de ProConnect où sont stockés les applications

Ce dépôt a été initié à partir du [template Next.js de betagouv](https://github.com/betagouv/template-nextjs).

## Lancer le code

### Prérequis

- Node installé
- Docker installé

### Développement

Get values for PROCONNECT_CLIENT_ID and PROCONNECT_CLIENT_SECRET and put it into `.env.development.local`

```bash
docker compose up --build --wait # pour lancer les conteneurs de base de données
npm ci # pour installer les dépendances
npm run db_espace:reset # pour créer le schéma de la base de donnée
npm run dev # pour lancer en mode développement
```

Il suffit ensuite de se rendre sur [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

### Tests

Lancer les tests unitaires :

```bash
npm run test
```

Préparation des tests end-to-end :

```bash
docker compose up --build --wait
cat .env.development .env.development.local > .env.production.local
npm run build
npm run db_espace:reset
cd e2e
npm ci
```

Lancer les tests end-to-end :

```bash
cd e2e
PROCONNECT_CLIENT_ID=xxx PROCONNECT_CLIENT_SECRET=xxx npm run studio
```

### Documentation

La documentation est disponible dans le dossier `docs`.

- [Architecture](docs/architecture.md)
- [Bonnes pratiques](/docs/best-practices.md)
