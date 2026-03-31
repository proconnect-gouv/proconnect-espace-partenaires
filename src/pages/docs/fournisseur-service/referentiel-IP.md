# Référentiel adresses IP

## Contexte

Dans le cadre d'un **changement d'infrastructure visant à améliorer la résilience et la disponibilité** du service, nous mettons à disposition la liste actualisée des adresses IP utilisées par **ProConnect Fédération** pour interagir avec les Fournisseurs de Service.

Ces adresses correspondent aux _reverse proxies_ par lesquels transitent les requêtes sortantes de la Fédération vers les endpoints des Fournisseurs de Service.

Les Fournisseurs de Service doivent s'assurer que leurs configurations réseau **autorisent le trafic HTTPS sortant vers ces adresses IP**, afin de garantir la bonne communication avec la plateforme ProConnect.

## Consignes de configuration

Autoriser le trafic **TCP sur le port 443 (HTTPS)** vers les adresses IP listées ci-dessous.

Si votre Fournisseur de Service est **exposé sur le RIE**, une **demande spécifique auprès de la PFS** est nécessaire pour permettre à votre adresse IP d'accéder à ces endpoints.

En cas de doute, n'hésitez pas à nous contacter à [support.partenaires@mail.proconnect.gouv.fr](mailto:support.partenaires@mail.proconnect.gouv.fr)

## Liste des adresses IP à autoriser

| **Exposition**                              | **Environnement** | **Tenant** | **IP à autoriser par les FS**    |
| ------------------------------------------- | ----------------- | ---------- | -------------------------------- |
| Internet                                    | Production        | ProConnect | 145.242.17.7 <br>145.242.17.170  |
|                                             |                   | OPI Cloud  | 145.242.17.167 <br>185.24.185.30 |
|                                             | Intégration       | ProConnect | 145.242.17.6                     |
|                                             |                   | OPI Cloud  | 145.242.17.174 <br>185.24.185.31 |
| RIE <br>(Réseau interministériel de l'Etat) | Production        | ProConnect | 100.67.22.9 <br>100.67.23.77     |
|                                             |                   | OPI Cloud  | 100.67.22.39 <br>100.67.23.118   |
|                                             | Intégration       | ProConnect | 100.67.22.12                     |
|                                             |                   | OPI Cloud  | 100.67.22.110 <br>100.67.23.114  |
