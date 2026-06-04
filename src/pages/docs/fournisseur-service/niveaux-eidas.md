# Niveaux d'assurance eidas pour les Fournisseurs de Service

> [!CAUTION]
> Les niveaux ACR renvoyés par ProConnect sont actuellement en cours de définition en collaboration avec nos partenaires et l'ANSSI.

## 1. Les niveaux eidas

ProConnect communique le niveau de confiance d'une authentification via l'attribut `acr`. Chaque niveau est défini selon trois axes :

- **Identité** : quelle est la qualité de preuve de l'identité de l'utilisateur ?
- **Authentification** : comment l'utilisateur s'est-il authentifié ?
- **Organisation** : quel est le lien entre l'utilisateur et son organisation ?

| Valeur `acr` | Identité              | Authentification                             | Organisation                            |
| ------------ | --------------------- | -------------------------------------------- | --------------------------------------- |
| `eidas0`     | Faible ou déclarative | Simple (mot de passe)                        | Modération ou déclaratif                |
| `eidas0-mfa` | Faible ou déclarative | **MFA (auto-géré)**                          | Modération ou déclaratif                |
| `eidas1`     | Faible                | Simple (mot de passe)                        | Modération ou plus                      |
| `eidas1-mfa` | Faible                | **MFA (auto-géré)**                          | Modération ou plus                      |
| `eidas2`     | Substantielle         | **MFA (géré par l'organisation)**            | Lien certifié par une source officielle |
| `eidas3`     | Élevée                | **MFA matérielle (géré par l'organisation)** | Lien certifié par une source officielle |

Les niveaux eidas sont construits sur trois piliers indépendants. Comprendre chacun d'eux permet de choisir le niveau adapté à votre service.

> [!NOTE]
> Le niveau eidas retourné est déterminé par le pilier le plus faible. Un Fournisseur d'Identité aura vérifié l'**identité** de ses agents à un niveau élevé et le lien avec l'**organisation** est certifié par une source officielle, mais si la méthode d'**authentification** est un simple mot de passe, le niveau retourné sera `eidas1`, et non `eidas3`.

### 1.1. La qualité de l'identité

Le [règlement eIDAS (2015/1502)](https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32015R1502&from=FR) définit trois niveaux de garantie pour l'identification électronique. Ils décrivent dans quelle mesure l'identité numérique d'un utilisateur a été vérifiée avant de lui être attribuée. ProConnect y ajoute un niveau **déclaratif**, en-dessous des niveaux eIDAS.

| Qualité                 | Explication                                                                                                                                                                                                                          | Exemple                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Déclarative             | L'utilisateur renseigne lui-même ses informations, sans aucune vérification externe.                                                                                                                                                 | Compte créé sans vérification d'identité                                                                            |
| Faible _(eIDAS)_        | L'existence de l'identité peut être **présumée** à partir d'une source faisant autorité. Aucune vérification active n'est requise : on présume que la personne est bien celle qu'elle prétend être.                                  | Vérification d'identité avec FranceConnect                                                                          |
| Substantielle _(eIDAS)_ | Il a été **vérifié** que la personne est en possession d'un document d'identité reconnu, dont l'authenticité a été contrôlée. Des mesures ont été prises pour minimiser le risque d'usurpation (perte, vol, expiration, révocation). | Vérification d'identité avec FranceConnect+                                                                         |
| Élevée _(eIDAS)_        | Niveau substantiel, plus : la personne a été identifiée par comparaison de **caractéristiques physiques** (biométrie ou photographie) auprès d'une source faisant autorité.                                                          | Embarquement par un processus RH traditionnel ; Vérification d'identité avec FranceConnect+ et MonIdentitéNumérique |

### 1.2. La méthode d'authentification

Un facteur d'authentification appartient à l'une des trois catégories suivantes, telles que définies par le [règlement eIDAS (2015/1502)](https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32015R1502&from=FR) :

- **Connaissance** : quelque chose que l'on sait : mot de passe, code PIN
- **Possession** : quelque chose que l'on possède : téléphone, clé physique, carte à puce
- **Inhérent** : quelque chose que l'on est : empreinte digitale, reconnaissance faciale

Une authentification multi-facteur (MFA) doit combiner au moins deux facteurs appartenant à des **catégories différentes**. Deux mots de passe ne constituent pas une MFA.

Deux critères issus du règlement permettent de distinguer les niveaux MFA entre eux :

- **Contrôle du facteur (section 2.2.1)** : peut-on _présumer_ que le second facteur est sous contrôle exclusif de la personne, ou la protection est-elle _fiable_ par construction ?
- **Résistance aux attaques (section 2.3.1)** : le mécanisme résiste-t-il à un attaquant à potentiel _modéré_ ou _élevé_ ?

| Méthode                                  | Explication                                                                                                                                                                                                             |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simple                                   | Un seul facteur d'authentification.                                                                                                                                                                                     |
| MFA (auto-géré)                          | Deux facteurs de catégories différentes. Contrôle : **présumé** exclusif. Résistance : attaquant à potentiel **modéré**. Le second facteur est configuré et géré par l'agent lui-même.                                  |
| MFA (géré par l'organisation)            | Identique à MFA (auto-géré) du point de vue eIDAS, contrôle **présumé**, résistance **modérée**. Seule différence : l'organisation maîtrise le cycle de vie du second facteur (distribution, association, révocation). |
| MFA matérielle (géré par l'organisation) | Deux facteurs de catégories différentes. Contrôle : **fiable** (le facteur est physique et sa clé ne peut pas être extraite). Résistance : attaquant à potentiel **élevé**.                                             |

**Exemples commentés**

Les exemples suivants illustrent pourquoi une méthode donnée atteint eidas2 mais pas eidas3, ou eidas3. La distinction repose sur les deux critères du règlement : garantie _présumée_ ou _fiable_ sur le contrôle du facteur, et résistance à un attaquant à potentiel _modéré_ ou _élevé_.

| Méthode                                         | Niveau max      | Pourquoi pas l'autre                                                                                                                                      |
| ----------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TOTP (application authenticator)                | eidas2          | Le secret TOTP peut être sauvegardé et transféré sur un autre appareil → seulement _présumé_ sous contrôle exclusif. Ne résiste pas à un attaquant élevé. |
| SMS OTP                                         | eidas2          | Vulnérable au SIM swapping et à l'interception SS7 → ne résiste pas à un attaquant élevé.                                                                 |
| Push notification (ex. Microsoft Authenticator) | eidas2          | Dépend de la sécurité de l'appareil et du compte cloud associé → seulement _présumée_ sous contrôle exclusif.                                             |
| Passkey synchronisé (ex. iCloud Keychain)       | eidas2          | La clé est synchronisée entre appareils → seulement _présumée_ sous contrôle exclusif. Ne résiste pas à un attaquant élevé.                               |
| Passkey non-synchronisé (hardware-backed)       | eidas2 à eidas3 | Si la clé est ancrée dans la puce de l'appareil et non exportable, peut atteindre une garantie _fiable_. Dépend de l'implémentation.                      |
| Carte à puce + PIN (ex. carte agent)            | eidas3          | La clé privée est ancrée dans la puce et ne peut pas être extraite → garantie _fiable_. Résiste aux attaquants à potentiel élevé.                         |
| Clé FIDO2 matérielle (ex. YubiKey) + PIN        | eidas3          | Clé générée dans le secure element, non exportable → garantie _fiable_. Résiste aux attaquants à potentiel élevé.                                         |

### 1.3. Le lien avec l'organisation

| Lien                                    | Explication                                                                                                                                                                                                                                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Déclaratif                              | L'appartenance de l'utilisateur à son organisation est auto-déclarée.                                                                                                                                                                                                                          |
| Modération                              | L'appartenance est validée par un tiers (administrateur, modérateur).                                                                                                                                                                                                                          |
| Lien certifié par une source officielle | L'appartenance a été **enregistrée et vérifiée auprès d'une source faisant autorité** sur la base de procédures reconnues (processus RH formel : création de compte, rattachement dans l'annuaire, remise des moyens d'authentification). Le lien peut être suspendu ou révoqué à tout moment. |

### 1.4. Le cas de `eidas0`

`eidas0` regroupe les cas où l'identité est **faible ou déclarative** et le lien organisationnel est **modération ou déclaratif**. Ces deux axes ayant chacun deux valeurs possibles, voici comment les combinaisons sont interprétées :

| Identité    | Organisation | Niveau                                                   |
| ----------- | ------------ | -------------------------------------------------------- |
| Déclarative | Déclaratif   | Non autorisé (les deux piliers sont au niveau minimal)   |
| Déclarative | Modération   | `eidas0`                                                 |
| Faible      | Déclaratif   | `eidas0`                                                 |
| Faible      | Modération   | `eidas1` (les deux piliers atteignent le niveau suivant) |

`eidas0` correspond donc aux cas intermédiaires : l'un des deux piliers est déclaratif tandis que l'autre atteint le niveau faible ou modération.

## 2. Comment exiger un niveau minimum ?

Pour exiger un niveau eidas minimum, ajoutez le paramètre `acr` avec `essential: true` dans votre requête `/authorize` :

```json
{
  "claims": {
    "id_token": {
      "acr": {
        "essential": true,
        "values": ["eidas2", "eidas3"]
      }
    }
  }
}
```

Pour plus de détails sur l'utilisation technique de l'ACR, voir [Niveaux ACR](./niveaux-acr.md).

Pour forcer spécifiquement la double authentification (MFA), voir [Double authentification](./double_authentification.md).
