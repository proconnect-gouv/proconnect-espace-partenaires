# language: fr
Fonctionnalité: Pages de documentation

  Scénario: Page d'accueil de la documentation
    Étant donné que je visite l'Url "/docs"
    Alors je dois voir un titre nommé "📚 Documentation technique" avec le niveau 2

  Scénario: Documentation Fournisseur de Service
    Étant donné que je visite l'Url "/docs/fournisseur-service"
    Alors je dois voir un titre nommé "Documentation Fournisseur de Service" avec le niveau 1

  Scénario: Documentation Fournisseur d'Identité
    Étant donné que je visite l'Url "/docs/fournisseur-identite"
    Alors je dois voir un titre nommé "Documentation Fournisseur d'Identité" avec le niveau 1

  Scénario: Lien depuis la page d'accueil de la documentation vers Fournisseur de Service
    Étant donné que je visite l'Url "/docs"
    Quand je clique sur le lien nommé "documentation Fournisseur de Service (FS)"
    Alors je dois voir un titre nommé "Documentation Fournisseur de Service" avec le niveau 1

  Scénario: Lien depuis la page d'accueil de la documentation vers Fournisseur d'Identité
    Étant donné que je visite l'Url "/docs"
    Quand je clique sur le lien nommé "documentation Fournisseur d'Identité (FI)"
    Alors je dois voir un titre nommé "Documentation Fournisseur d'Identité" avec le niveau 1
