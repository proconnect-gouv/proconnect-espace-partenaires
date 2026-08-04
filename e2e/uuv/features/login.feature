# language: fr
Fonctionnalité: Connexion

  Scénario: Connexion avec un utilisateur via un lien de connexion envoyé par email puis via ProConnect
    Étant donné que je visite l'Url "/magic-link-login"
    Alors je dois voir un titre nommé "Connexion" avec le niveau 1
    Et je clique sur "Email professionnel"
    Quand j'entre la valeur "user@test.proconnect.gouv.fr"
    Et je clique sur le bouton nommé "Recevoir un lien de connexion"
    Alors je dois voir un titre nommé "Vérifiez votre email" avec le niveau 3

    Quand je vais à l'intérieur de l'email avec les filtres
      | subject    | Lien de connexion à l'Espace Partenaires ProConnect |
      | headers.to | user@test.proconnect.gouv.fr                        |
    Alors je vois "Vous avez demandé un lien d'identification à l'Espace Partenaires"
    Quand je clique sur le lien nommé "Se connecter"
    Étant donné que je supprime l'email

    Alors je dois voir un titre nommé "Vos applications" avec le niveau 1

    Quand je clique sur le bouton nommé "Déconnecter user@test.proconnect.gouv.fr"
    Alors je dois voir un titre nommé "Rejoignez les partenaires de ProConnect !" avec le niveau 1

    Quand je clique sur le lien nommé "Vos applications"
    Alors je dois voir un titre nommé "Connexion" avec le niveau 1

    Quand je clique sur le bouton nommé "S’identifier avec ProConnect"
    Alors je dois voir un titre nommé "Vous êtes sur une instance de test" avec le niveau 2
    Et je clique sur "Email professionnel"
    Quand j'entre la valeur "user@test.proconnect.gouv.fr"
    Et je clique sur le bouton nommé "Continuer"
    Alors je dois voir un titre nommé "Se connecter" avec le niveau 2
    Et j'entre la valeur "1" dans la boîte à texte nommée "sub"
    Et je clique sur le bouton nommé "Se connecter"
    Alors je dois voir un bouton nommé "Déconnecter user@test.proconnect.gouv.fr"

  Scénario: Connexion avec un utilisateur via ProConnect puis via un lien de connexion envoyé par email
    Étant donné que je visite l'Url "/"
    Quand je clique sur le lien nommé "Se connecter"

    Quand je clique sur le bouton nommé "S’identifier avec ProConnect"
    Alors je dois voir un titre nommé "Vous êtes sur une instance de test" avec le niveau 2
    Et je clique sur "Email professionnel"
    Quand j'entre la valeur "ursula@test.proconnect.gouv.fr"
    Et je clique sur le bouton nommé "Continuer"
    Alors je dois voir un titre nommé "Se connecter" avec le niveau 2
    Et j'entre la valeur "2" dans la boîte à texte nommée "sub"
    Et je clique sur le bouton nommé "Se connecter"
    Alors je dois voir un bouton nommé "Déconnecter ursula@test.proconnect.gouv.fr"

    Quand je clique sur le bouton nommé "Déconnecter ursula@test.proconnect.gouv.fr"
    Alors je dois voir un titre nommé "Rejoignez les partenaires de ProConnect !" avec le niveau 1

    Et que je visite l'Url "/magic-link-login"
    Et je clique sur "Email professionnel"

    Quand j'entre la valeur "ursula@test.proconnect.gouv.fr"

    Et je clique sur le bouton nommé "Recevoir un lien de connexion"
    Quand je vais à l'intérieur de l'email avec les filtres
      | subject    | Lien de connexion à l'Espace Partenaires ProConnect |
      | headers.to | ursula@test.proconnect.gouv.fr                      |
    Quand je clique sur le lien nommé "Se connecter"
    Étant donné que je supprime l'email

    Alors je dois voir un bouton nommé "Déconnecter ursula@test.proconnect.gouv.fr"
