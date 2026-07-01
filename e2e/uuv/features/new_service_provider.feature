# language: fr
Fonctionnalité: Créer un nouveau fournisseur de service

  Contexte:
    Étant donné que je suis connecté en tant que "new.service@local.host"
    Quand je visite l'Url "/apps"
    Alors je dois voir un titre nommé "Vos applications" avec le niveau 1

  Scénario: Créer un nouveau fournisseur de service
    Quand je clique sur le bouton nommé "Créer un nouveau fournisseur de service"
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
