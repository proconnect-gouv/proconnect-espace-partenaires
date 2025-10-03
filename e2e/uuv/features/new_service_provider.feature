# language: fr
Fonctionnalité: Créer un nouveau fournisseur de service

  Contexte:
    Étant donné que je visite l'Url "/"
    Quand je clique sur le lien nommé "Se connecter"
    Alors je dois voir un titre nommé "Connexion" avec le niveau 1
    Et je clique sur "Email professionnel"
    Quand j'entre la valeur "new.serive@local.host"
    Et je clique sur le bouton nommé "Recevoir un lien de connexion"
    Alors je dois voir un titre nommé "Vérifiez votre email" avec le niveau 3

    Quand je vais à l'intérieur de l'email avec les filtres
      | subject    | Lien de connexion à l'Espace Partenaires ProConnect |
      | headers.to | new.serive@local.host                               |
    Alors je vois "Vous avez demandé un lien d'identification à l'Espace Partenaires"
    Quand je clique sur le lien nommé "Se connecter"
    Étant donné que je supprime l'email

    Alors je dois voir un titre nommé "Vos applications" avec le niveau 1

  Scénario: Créer un nouveau fournisseur de service
    Quand je clique sur le bouton nommé "Créer un nouveau fournisseur de service"
    Alors je vois "Création en cours..."

    Alors je dois voir un titre nommé "Gestion de votre Fournisseur de Service" avec le niveau 1
    Et je clique sur "Nom de l’application"
    Et je vide le champ focalisé
    Et j'entre la valeur "Ma Retraite"
    Et je vois "Ma Retraite"

    Et je vois "Cette application est encore en test."

    Et je vois "Les modifications ont été enregistrées"

    Quand je clique sur le lien nommé "Vos applications"
    Alors je dois voir un titre nommé "Fournisseurs de Service" avec le niveau 2
    Alors je dois voir un titre nommé "Ma Retraite" avec le niveau 2
