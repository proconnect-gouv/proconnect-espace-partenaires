# Validation : distinction eidas2 / eidas3 — méthode d'authentification

Document de travail pour revue et validation avant publication dans `niveaux-eidas.md`.

---

## 1. Sources réglementaires

Règlement d'exécution (UE) 2015/1502 de la Commission du 8 septembre 2015 — Annexe, sections 2.2.1 et 2.3.1.

Source officielle : https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32015R1502&from=FR

---

## 2. Ce que dit le règlement

### 2.2.1 — Caractéristiques et conception des moyens d'identification électronique (page 9, L 235/15)

| Niveau     | Texte exact                                                                                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Substantiel | « Le moyen d'identification électronique est conçu de sorte qu'**on puisse présumer** qu'il est utilisé uniquement sous le contrôle de la personne à laquelle il appartient ou en sa possession. »                               |
| Élevé      | « Le moyen d'identification électronique **protège contre les doubles emplois et les manipulations ainsi que contre les attaquants à potentiel d'attaque élevé**. » + « conçu de sorte que la personne à laquelle il appartient puisse **le protéger de façon fiable** contre toute utilisation non autorisée. » |

### 2.3.1 — Mécanisme d'authentification (pages 10-11, L 235/16-17)

| Niveau     | Texte exact                                                                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Substantiel | « il est hautement improbable que des activités telles que les tentatives de décryptage, l'écoute, l'attaque par rejeu ou la manipulation d'une communication par un **attaquant ayant un potentiel d'attaque modéré** puissent nuire aux mécanismes d'authentification. » |
| Élevé      | Idem, remplaçant « modéré » par « **élevé** ».                                                                                                                                                                                                                        |

---

## 3. Notre interprétation

Le règlement établit deux critères distinctifs entre eidas2 et eidas3 :

### Critère 1 : garantie sur le contrôle du facteur (2.2.1)

- **eidas2** : on peut *présumer* que le facteur est sous le contrôle exclusif de la personne — mais rien n'empêche techniquement qu'il soit copié, exporté ou synchronisé.
- **eidas3** : la personne peut *fiablement* protéger le facteur — la garantie est technique, pas présumée. En pratique, cela implique que la clé cryptographique ne peut pas être extraite du support.

### Critère 2 : résistance aux attaques (2.3.1)

- **eidas2** : résiste à un attaquant à potentiel d'attaque *modéré* (phishing standard, attaques courantes).
- **eidas3** : résiste à un attaquant à potentiel d'attaque *élevé* (attaques sophistiquées, compromission de l'appareil, etc.).

> ⚠️ Le règlement définit des **propriétés**, pas des technologies. Il ne dit pas qu'une carte à puce est eidas3 ou qu'un TOTP est eidas2. C'est une évaluation par un organisme de conformité qui détermine si une technologie donnée satisfait ces critères.

---

## 4. Ce que nous disons dans la documentation

### Paragraphe introductif (avant le tableau)

> Un facteur d'authentification appartient à l'une des trois catégories suivantes, telles que définies par le règlement eIDAS (2015/1502) :
>
> - **Connaissance** — quelque chose que l'on sait : mot de passe, code PIN
> - **Possession** — quelque chose que l'on possède : téléphone, clé physique, carte à puce
> - **Inhérent** — quelque chose que l'on est : empreinte digitale, reconnaissance faciale
>
> Une authentification multi-facteur (MFA) doit combiner au moins deux facteurs appartenant à des **catégories différentes**. Deux mots de passe ne constituent pas une MFA.

### Tableau

| Méthode                                  | Explication                                                                                                                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simple                                   | Un seul facteur d'authentification.                                                                                                                                                                                             |
| MFA (auto-géré)                          | Deux facteurs de catégories différentes. Le second facteur peut être **présumé** sous le contrôle exclusif de la personne, et résiste aux attaquants à potentiel d'attaque modéré. L'agent configure et gère lui-même son second facteur. |
| MFA (géré par l'organisation)            | Idem, avec l'organisation qui maîtrise l'intégralité du cycle de vie du second facteur (distribution, association, révocation).                                                                                                 |
| MFA matérielle (géré par l'organisation) | Deux facteurs de catégories différentes. La personne peut **fiablement** protéger le second facteur contre toute utilisation non autorisée — il résiste aux attaquants à potentiel d'attaque élevé. En pratique, cela implique un facteur physique dont la clé ne peut pas être extraite. |

---

## 5. Exemples commentés

| Méthode            | Niveau    | Pourquoi pas l'autre                                                                                                        |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| TOTP (app)         | eidas2    | Le secret TOTP peut être sauvegardé et transféré sur un autre appareil → seulement *présumé* sous contrôle exclusif.       |
| SMS OTP            | eidas2    | Vulnérable au SIM swapping et à l'interception SS7 → ne résiste pas à un attaquant élevé.                                  |
| Passkey synchronisé | eidas2   | La clé est synchronisée dans le cloud et peut être sur plusieurs appareils → seulement *présumée* sous contrôle exclusif.   |
| Push notification  | eidas2    | Dépend de la sécurité de l'appareil et du compte cloud associé → seulement *présumée*.                                     |
| Carte à puce + PIN | eidas3    | La clé privée est ancrée dans la puce et ne peut pas être extraite → garantie *fiable*. Résiste aux attaques sophistiquées. |
| Clé FIDO2 matérielle (ex. YubiKey) + PIN | eidas3 | Idem : clé générée dans le secure element, non exportable → garantie *fiable*.                           |

---

## 6. Points à valider

- [ ] L'interprétation de « fiablement » comme « clé non extractable » est-elle correcte ?
- [ ] Un TOTP implémenté sur un hardware token non-exportable serait-il eidas3 ?
- [ ] Un passkey non-synchronisé (lié à un seul appareil, hardware-backed) serait-il eidas3 ?
- [ ] La notion de « potentiel d'attaque modéré/élevé » est-elle définie ailleurs dans la réglementation ou dans une norme de référence (ISO 29115 ?) ?
- [ ] Faut-il mentionner que c'est une évaluation par un organisme de conformité qui tranche in fine ?
