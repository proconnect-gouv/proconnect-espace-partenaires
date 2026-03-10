# 🆘 Aide à l'implémentation technique de ProConnect

Votre implémentation technique vous renvoie une erreur ? Cette rubrique vous donne la marche à suivre pour vous débloquer dans les meilleures conditions.

![](/images/docs/erreur.png)

## 1. Erreurs récurrentes

Avant toute chose, nous avons noté [quelques erreurs récurrentes qui peuvent apporter des premiers éléments de débogage](./troubleshooting-fs.md).

Si cela n'est pas suffisant, voici la marche à suivre pour vous aider.

## 2. Contacter le service partenaires de ProConnect

### 2.1. Canaux de communication

Comme ces conversations peuvent envoyer de gros messages, nous vous recommandons de passer par notre email : support.partenaires@mail.proconnect.gouv.fr

Vous pouvez utiliser notre chaine Tchap pour faire des pré-questions avant la demande d'aide.

> [!IMPORTANT]
> Ces liens concernent le service partenaires de ProConnect, pour nos partenaires qui essaient de coder le bouton ProConnect sur leur application. Si vous voulez contacter le support usager de ProConnect car vous n'arrivez pas à vous connecter à une application, suite à une erreur, [nous vous donnons ici le lien vers le centre d'aide de ProConnect](https://proconnect.crisp.help/fr/) qui pourra répondre à vos questions.

### 2.2. Les éléments à nous envoyer

Voici les éléments à nous envoyer pour nous aider à identifier le problème le plus rapidement possible :

- une mise en contexte du problème
- le `client_id` de l'application
- l'environnement (`intégration` ou `production`)
- le réseau (`RIE` ou `Internet`)
- l'URL de la route `/authorize` complète (généralement au format `https://fca.integ01.dev-agentconnect.fr/api/v2/authorize?acr_values=eidas1&client_id=492739239028-e6dc-41b1-9586-9516a82bcd03&nonce=agent_connect_nonce_D2S2eZwHL6rWtDQUg3c37PHyo3LpqtHn&redirect_uri=https://monurl.gouv.fr/agent_connect/callback&response_type=code&scope=openid email given_name usual_name&state=agent_connect_state_2yB6wdmHQbjHs8qrJDBD1tyKdc3ijKu6` )
- le code erreur (généralement au format `Y090329302`)
- l'ID complète de l'erreur (généralement au format `724e5098-d6a1-465c-bd65-55b562c2c978`)

Avec ceci, nous devrions avoir les armes pour vous apporter des éléments d'aide.

> [!IMPORTANT]
> Nous copierons-collerons ces éléments dans nos logs d'erreur pour retrouver le message complet de l'erreur. Ainsi, nous vous demandons d'envoyer les différents éléments au format texte pour pouvoir les copier-coller facilement (même si on aime beaucoup les captures d'écran qui aident beaucoup à la mise en contexte).
