# Niveaux d’assurance et utilisation de l’ACR

## Communication du niveau d’assurance via l’ACR

Pour indiquer le niveau d’assurance d’une authentification, ProConnect se base sur l’attribut ACR pour Authentication Context Class Reference.

Les principes d’utilisation de l’ACR sont décrits dans la spécification [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html#acrSemantics).

Un fournisseur de service peut consulter le niveau ACR de l'authentification en incluant le paramètre suivant dans sa requête `/authorize` :

```
claims={
  "id_token": {
    "acr": null
  }
}
```

Un fournisseur de service peut exiger un ou plusieurs niveaux ACR en incluant le paramètre suivant dans sa requête `/authorize` :

```
claims={
  "id_token": {
    "acr": {
      "essential": true,
      "values": [
        "https://proconnect.gouv.fr/assurance/consistency-checked-2fa"
      ]
    }
  }
}
```

## Niveaux d’assurance pour les identités

> [!CAUTION]
> Les niveaux ACR renvoyés par ProConnect sont actuellement en cours de définition en collaboration avec nos partenaires et l’ANSSI.
> Ils sont donc appelés à évoluer au fil des travaux et pourront être ajustés dans le futur.

### Identités issues d’un processus RH

**Processus RH** : il s’agit de la procédure complète, depuis la création de l’identité numérique (éventuellement avec un contrôle en face-à-face) jusqu’à la résiliation du compte à la fin du contrat de travail.

Les règles de preuve d’identité à respecter pour chaque niveau de confiance **eIDAS v1** sont détaillées dans le document ANSSI _« Référentiel d’exigences de sécurité pour les moyens d’identification électronique »_.

Les exigences spécifiques aux échanges entre administrations françaises seront précisées dans le **RGS v3** (en cours de rédaction par l’ANSSI).

**FranceConnect** peut être utilisé en complément d’une source de données authentique (par exemple l’INSEE pour la certification du dirigeant d’entreprise) afin de renforcer ce processus.

**Niveaux eIDAS** pris en compte dans ProConnect :

1. `eidas1` : Accès de type _login / mot de passe_, délivré dans un cadre RH.

2. `eidas2` : Accès de type _login / mot de passe_ **+** un second facteur (TOTP, POP, ou équivalent), toujours délivré dans un cadre RH.

3. `eidas3` : Accès via une **carte agent**, avec **PIN + certificats**, délivré dans un cadre RH.

### Identités sans processus RH

Dans le cas où l’identité n’est pas délivrée via un processus RH, seuls les niveaux **ci-dessous** sont disponibles.

1. `https://proconnect.gouv.fr/assurance/self-asserted` : Identité déclarative simple.

2. `https://proconnect.gouv.fr/assurance/self-asserted-2fa` : Identité déclarative + authentification à double facteur.

3. `https://proconnect.gouv.fr/assurance/consistency-checked` : Identité déclarative + **test(s) de cohérence** (par exemple : contrôle du domaine de messagerie, envoi d’un code par courrier postal au siège social, vérification de l’adresse de contact dans un annuaire officiel, etc.).

4. `https://proconnect.gouv.fr/assurance/consistency-checked-2fa` : Identité déclarative + test(s) de cohérence + authentification à double facteur.

### Les niveaux d’assurance associés à un rôle

Le service ProConnect dispose d’une liste des dirigeants de chaque entreprise constituée à partir du répertoire Sirene et du registre national des entreprises (RNE).

ProConnect utilise donc le numéro SIREN que vous renseignez, puis vous invite à authentifier votre identité avec le compte FranceConnect de votre choix (Impôts, AMELI, La Poste…).

Si l’identité FranceConnect correspond à celle d’un des dirigeants pour ce numéro SIREN, votre compte est automatiquement certifié sur le portail de service public.

Pour imposer ce niveau de certification dans un service, il suffit de demander le niveau d’assurance suivant : `https://proconnect.gouv.fr/assurance/certification-dirigeant`.

[Plus d’information sur la certification dirigeant.](./certification-dirigeant.md)

## Les méthodes d’authentifications

Pour éviter qu’un usager ne doive saisir un second facteur dans votre service alors qu’il a déjà utilisé une authentification multi-facteur via ProConnect, il est possible de récupérer la liste des méthodes d’authentification dans le claim `amr` et d’adapter votre parcours en conséquence. Par défaut, ce claim n’est pas inclus dans l’ID Token et doit être explicitement demandé. Pour ce faire, vous devez ajouter le paramètre suivant à votre requête :

```
claims={
  "id_token": {
    "amr": null
  }
}
```

ProConnect Identité peut renvoyer différentes valeurs `amr`, éventuellement combinées :

- `pwd` : authentification par mot de passe (en complément, un OTP peut être envoyé par e-mail si le navigateur utilisé n’est pas enrôlé).

- `mail` : authentification via un lien de connexion (« lien magique »).

- `totp` : authentification par application « authenticator » (ex. FreeOTP).

- `pop` : authentification par clé d’accès (Passkey).

- `mfa` : authentification à deux facteurs (plusieurs méthodes combinées).

Pour plus d’informations, vous pouvez consulter la [documentation de FranceConnect](https://docs.partenaires.franceconnect.gouv.fr/fs/fs-technique/fs-technique-amr/#quels-sont-les-differents-methodes-d-authentification-qui-peuvent-etre-utilisees).
