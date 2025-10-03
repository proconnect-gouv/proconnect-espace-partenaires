# language: fr
Fonctionnalité: Connexion

  Scénario: Connexion avec un utilisateur
    Étant donné que je visite l'Url "/"
    Quand je clique sur le lien nommé "Se connecter"
    Alors je dois voir un titre nommé "Connexion" avec le niveau 1
    Et je clique sur "Email professionnel"
    Quand j'entre la valeur "test@test.com"
    Et je clique sur le bouton nommé "Recevoir un lien de connexion"
    Alors je dois voir un titre nommé "Vérifiez votre email" avec le niveau 3

    Quand je vais à l'intérieur de l'email avec les filtres
      | subject    | Lien de connexion à l'Espace Partenaires ProConnect |
      | headers.to | test@test.com                                       |
    Alors je vois "Vous avez demandé un lien d'identification à l'Espace Partenaires"
    Quand je clique sur le lien nommé "Se connecter"
    Étant donné que je supprime l'email

    Alors je dois voir un titre nommé "Vos applications" avec le niveau 1

    Quand je clique sur le bouton nommé "Déconnecter test@test.com"
    Alors je dois voir un titre nommé "Rejoignez les partenaires de ProConnect !" avec le niveau 1

    Quand je clique sur le lien nommé "Vos applications"
    Alors je dois voir un titre nommé "Connexion" avec le niveau 1
