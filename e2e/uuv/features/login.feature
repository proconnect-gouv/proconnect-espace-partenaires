# language: fr
Fonctionnalité: Connexion

  Scénario: Connexion avec un utilisateur via ProConnect
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
