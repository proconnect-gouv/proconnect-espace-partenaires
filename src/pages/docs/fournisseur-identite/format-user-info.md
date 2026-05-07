# Contrôle des identités retournés par les userinfos des FI

Après avoir récupéré l'ID token via `/token`, ProConnect appelle l'endpoint `/user-info` de votre FI pour obtenir les claims utilisateur (scopes listés dans la [section 3.1 de la configuration](./configuration.md#31-scopes)). C'est donc bien `/user-info` qui doit exposer ces données, et non l'ID token.

Pour que ProConnect reconnaisse comme valide une identité, le FI doit retourner les champs obligatoires définis [ici](./configuration.md#31-scopes) en respectant les contraintes.

## Siret

Si un siret est fourni avec des espaces, nous supprimons les espaces. Si ce siret est reconnu comme incorrect, nous le remplaçons par le siret par défaut du FI. Ce siret par défaut est configuré dans ProConnect.

## Numéro de téléphone

Les numéros de téléphone sont optionnels. Cependant si un FI retourne un champ `phone_number` qui contient plus de 256 caractères, l'identité sera considérée comme invalide et ProConnect retournera une erreur.

Si l'identité contient un `phone_number` qui respecte la contrainte définie ci-dessus mais est reconnu comme incorrect par ProConnect, ProConnect retournera une identité sans numéro de téléphone mais sans erreur.
