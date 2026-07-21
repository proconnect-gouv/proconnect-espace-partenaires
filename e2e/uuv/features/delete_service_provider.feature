# language: fr
Fonctionnalité: Supprimer un fournisseur de service

  Contexte:
    Étant donné que je suis connecté en tant que "delete.service@local.host"
    Quand je visite l'Url "/apps"
    Alors je dois voir un titre nommé "Vos applications" avec le niveau 1

  Scénario: Supprimer un fournisseur de service
    Quand je clique sur le bouton nommé "Créer un nouveau fournisseur de service"
    Alors je dois voir un titre nommé "Gestion de votre Fournisseur de Service" avec le niveau 1
    Et je clique sur "Nom de l’application"
    Et je vide le champ focalisé
    Et j'entre la valeur "App à supprimer"
    Et je vois "Les modifications ont été enregistrées"
    Quand je clique sur le bouton nommé "Supprimer cette application"
    Alors je vois "Supprimer cette application ?"
    Quand je clique sur le bouton nommé "Supprimer définitivement"
    Alors je dois voir un titre nommé "Vos applications" avec le niveau 1
    Et je ne dois pas voir un élément qui contient "App à supprimer"
