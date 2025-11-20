# Recommandations de parcours utilisateur

## Généralités

ProConnect est un outil d’authentification.
**Il s'agit d'un pont entre un bouton de connexion et la partie authentifiée de votre service**.

**C’est vous qui avez le contrôle sur ce qui se passe avant et après ce pont.**
Voici quelques recommandations pour un parcours simple et sans blocage pour les visiteurs de vos services.

---

## Principes à respecter pour guider vos utilisatrices et utilisateurs

- Fournir les informations nécessaires en amont de la connexion

- Orienter les utilisateurs selon leur profil (professionnel, particulier, agent habilité)

- Prévenir et gérer les erreurs avec des messages explicites

---

## Cas d’usage et scénarios

Chaque service a ses particularités. Quelles sont les vôtres ?

| Votre cas                                                  | Comment faire ?                                                                                                                               | Exemple                                                                                                                                                            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Votre service accueille des particuliers et professionnels | Proposez un parcours de connexion différencié pour les particuliers et les professionnels ou créez deux embranchements après un tronc commun. | ![RDV Service public](/images/docs/screenshot-rdv.png)[RDV Service Public](https://rdv.anct.gouv.fr/)                                                              |
| Votre service est réservé à un public spécifique           | Affichez un encadré explicatif avec les conditions d'accès                                                                                    | ![Annuaire des Entreprises](/images/docs/screenshot-annuaire-entreprises.png)[Annuaire des Entreprises](https://annuaire-entreprises.data.gouv.fr/lp/agent-public) |
| Votre service propose plusieurs modes de connexion         | Hiérarchisez vos options : ProConnect en priorité, alternatives ensuite.                                                                      | ![FranceTransfert](/images/docs/screenshot-francetransfert.png) [FranceTransfert](https://francetransfert.numerique.gouv.fr/connect)                               |

---

## Gestion des erreurs & pages d’erreur

### ✅ Ce que nous conseillons

**A la connexion**

- Expliquer clairement les conditions d’accès.
- Hiérarchiser les boutons selon l’usage principal.

**En cas d'erreur**

- Afficher des messages d’erreur simples et actionnables.
- Guider l’utilisateur dans le choix de son parcours (particulier / pro).
- Donner une solution aux personnes qui se retrouvent bloquées (ex. adresse de support ou page d'aide).

### ❌ Ce que nous déconseillons

**A la connexion**

- Laisser plusieurs boutons sans contexte ni hiérarchie.
- Donner accès sans expliquer l’éligibilité.
- Mélanger les parcours particuliers et professionnels sans distinction claire.

**En cas d'erreur**

- Afficher des erreurs techniques incompréhensibles.
- Laisser les utilisateurs bloqués sans leur fournir d'aide **(cela crée une forte surcharge pour notre propre support)**

## 𖦏 Les cas non couverts par ProConnect

Pour des raisons techniques, [certaines personnes professionnelles ne peuvent pas utiliser ProConnect](./couverture-proconnect.md). Si vous devez connecter ces personnes, nous vous conseillons de proposer un login alternatif email - mot de passe locaux.
