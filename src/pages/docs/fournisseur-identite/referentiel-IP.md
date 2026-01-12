# Référentiel adresses IP

## Contexte

Dans le cadre d’un **changement d’infrastructure visant à améliorer la résilience et la disponibilité** du service, nous mettons à disposition la liste actualisée des adresses IP utilisées par **ProConnect Fédération** pour interagir avec les Fournisseurs d’Identité.

Ces adresses correspondent aux _forward proxies_ par lesquels transitent les requêtes sortantes de la Fédération vers les endpoints des Fournisseurs d’Identité.

Les Fournisseurs d’Identité doivent s’assurer que leurs configurations réseau **autorisent le trafic HTTPS entrant depuis ces adresses IP**, afin de garantir la bonne communication avec la plateforme ProConnect.

## Consignes de configuration

Autoriser le trafic **TCP sur le port 443 (HTTPS)** depuis les adresses IP listées ci-dessous.

Si votre Fournisseur d’Identité est **exposé sur le RIE**, une **demande spécifique auprès de la PFS** est nécessaire pour permettre à ces IP d’accéder à vos endpoints.

En cas de doute, n'hésitez pas à nous contacter à [support.partenaires@mail.proconnect.gouv.fr](mailto:support.partenaires@mail.proconnect.gouv.fr)

## Liste des adresses IP à autoriser

|**Exposition**|**Environnement**|**IP à autoriser par les Fournisseurs d'Identité**|
|Internet|Production|145.242.17.7 <br>145.242.17.171 <br>145.242.17.181 <br>185.24.185.32|
|Internet||Intégration|145.242.17.6 <br>145.242.17.166 <br>185.24.185.245|
|RIE <br>(Réseau interministériel de l'Etat)|Production|100.67.22.9 <br>100.67.23.75 <br>100.67.22.95 <br>100.67.23.13|
|RIE <br>(Réseau interministériel de l'Etat)||Intégration|100.67.22.12 <br>100.67.22.47 <br>100.67.23.109|
