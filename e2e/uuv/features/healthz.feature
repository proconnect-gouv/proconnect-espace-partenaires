# language: fr
Fonctionnalité: Page de santé de l'application

  Scénario: Vérification de la page de santé
    Étant donné que je visite l'Url "/healthz"
    Alors je dois voir un titre nommé "App is up and running" avec le niveau 1
