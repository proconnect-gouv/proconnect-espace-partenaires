# language: fr
Fonctionnalité: Page non trouvée

  Scénario: Une page non trouvée
    Étant donné que je visite l'Url "/argent-connect"
    Alors je dois voir un titre nommé "Erreur 404" avec le niveau 1
    Et je dois voir un élément qui contient "La page n’a pas été trouvée"
