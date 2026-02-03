# Serveurs Internet, serveurs RIE

## 1. Serveurs Internet, serveurs RIE

ProConnect est hébergé sur deux réseaux :

- Internet
- RIE

Pour chacun des réseaux, ProConnect aura un environnement de test et un environnement de production. 

> [!IMPORTANT]
> À noter que les environnements ne discutent pas entre eux, donc des clés pour l'intégration ne marcheront pas pour la production. Idem pour pour des clés RIE production qui ne marchera pas pour des clés production Internet. 


## 2. Fournisseurs d'Identité internet et RIE

ProConnect sur ses serveurs Internet peut utiliser des Fournisseurs d'Identité sur Internet et sur le RIE (pour le cas du RIE, à condition que l'agent ait accès au RIE via un VPN un un accès direct). 

ProConnect sur ses serveurs RIE ne peut utiliser que des Fournisseurs d'Identité sur le RIE. 

## 2. Schéma

Voici un schéma de fonctionnement de ProConnect :

![](/images/docs/schema_reseau.png)
