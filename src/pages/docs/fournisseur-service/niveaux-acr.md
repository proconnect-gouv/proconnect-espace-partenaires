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

Pour comprendre ce que signifie chaque niveau eidas (identité, méthode d’authentification, lien avec l’organisation), voir [Niveaux eidas](./niveaux-eidas.md).

## Les niveaux d’assurance associés à un rôle

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

- `otp` : authentification par application « authenticator » (ex. FreeOTP).

- `pop` : authentification par clé d’accès (Passkey).

- `mfa` : authentification à deux facteurs (plusieurs méthodes combinées).

Pour plus d’informations, vous pouvez consulter la [documentation de FranceConnect](https://docs.partenaires.franceconnect.gouv.fr/fs/fs-technique/fs-technique-amr/#quels-sont-les-differents-methodes-d-authentification-qui-peuvent-etre-utilisees).
