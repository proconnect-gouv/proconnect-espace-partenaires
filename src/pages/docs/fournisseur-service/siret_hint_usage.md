# Comment spécifier à ProConnect que les usagers de mon FS doivent se voir suggérer une organisation spécifique à sélectionner ?

Il peut arriver que, en tant que Fournisseur de Service (FS), vous souhaitiez qu'une organisation (entreprise, association...) soit suggérée à l'usager lors de sa connexion.

Pour ce faire, vous pouvez indiquer dans le paramètre `siret_hint` du `authorization_endpoint` le SIRET de l'organisation à suggérer. L'appel à ce endpoint est détaillé [ici](./implementation_technique.md).

ProConnect Fédération transmettra alors le `siret_hint` au Fournisseur d'Identité (FI) lors de la connexion, et si le FI prend en charge ce paramètre, il pourra préselectionner l'organisation correspondante lors de l'identification de l'usager.

> NB: le FI ProConnect Identité prend en charge le paramètre `siret_hint`.
