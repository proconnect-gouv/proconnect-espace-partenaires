import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ProConnect | Identifiez les professionnels sur les sites de l’administration</title>
      </Head>

      <section
        className={fr.cx("fr-py-6w")}
        style={{
          backgroundColor: "var(--background-alt-brown-opera)",
        }}
        id="home-hero"
      >
        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-grid-row--middle")}>
            <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
              <h1>
                Rejoignez les partenaires
                <br />
                de ProConnect !
              </h1>
              <div className={fr.cx("fr-text--xl")}>
                Simplifiez l&rsquo;identification des professionnels
                <br /> du public et du privé.
              </div>

              <div className={fr.cx("fr-btns-group", "fr-btns-group--inline", "fr-mt-4w")}>
                <Button
                  linkProps={{
                    href: "/docs",
                  }}
                  priority="primary"
                >
                  Consulter la documentation
                </Button>

                <Button
                  linkProps={{
                    href: "/apps",
                  }}
                  priority="secondary"
                >
                  Créer une application
                </Button>
              </div>
            </div>

            <div
              className={fr.cx("fr-col-12", "fr-col-md-6")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/home-laptop.svg"
                alt="Illustration d'un ordinateur portable avec l'interface de connexion ProConnect"
                width={384}
                height={302}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="fr-container fr-py-8w fr-py-lg-12w">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-mb-5v">
          <div className="fr-col-12">
            <h2 className="fc-text--center">Pourquoi intégrer ProConnect sur mon service ?</h2>
            <p className="fr-text--lead fc-text--center">
              ProConnect est la solution officielle de l&rsquo;État pour l&rsquo;identification des
              professionnels du public et du privé.
              <br />
              <b>
                Plus de 800 000 connexions sont déjà réalisées chaque mois sur 120 services actifs !
              </b>
            </p>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-sm-9 fr-col-md-7 fr-col-lg-4 fc-text--center">
            <Image
              className="fr-mb-5v"
              src="/images/pictograms/system/success.svg"
              alt="Gagnez du temps"
              role="presentation"
              width={100}
              height={100}
            />
            <h3 className="fr-mb-3v fr-mb-md-5 fr-h5">Gagnez du temps</h3>
            <p className="fr-text--lg">
              Utilisez un seul bouton pour connecter tous les agents publics sur votre service
            </p>
          </div>
          <div className="fr-col-12 fr-col-sm-9 fr-col-md-7 fr-col-lg-4 fc-text--center">
            <Image
              className="fr-mb-5v"
              src="/images/pictograms/system/padlock.svg"
              alt="Identifiez vos utilisateurs"
              role="presentation"
              width={100}
              height={100}
            />
            <h3 className="fr-mb-3v fr-mb-md-5 fr-h5">Identifiez vos utilisateurs</h3>
            <p className="fr-text--lg">
              Associez chaque utilisateur de façon sécurisée au SIRET de son organisation.
            </p>
          </div>
          <div className="fr-col-12 fr-col-sm-9 fr-col-md-7 fr-col-lg-4 fc-text--center">
            <Image
              className="fr-mb-5v"
              src="/images/pictograms/leisure/community.svg"
              alt="Simplifiez la collaboration"
              role="presentation"
              width={100}
              height={100}
            />
            <h3 className="fr-mb-3v fr-mb-md-5 fr-h5">Simplifiez la collaboration</h3>
            <p className="fr-text--lg">
              Permettez à vos utilisateurs d&rsquo;inviter tous leurs interlocuteurs, publics et
              privés.
            </p>
          </div>
        </div>
      </section>

      <section
        id="jumbo-types"
        style={{
          backgroundColor: "var(--background-alt-blue-france)",
        }}
      >
        <div className="fr-container fr-py-8w fr-py-lg-12w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-mb-5v">
            <div className="fr-col-12">
              <h2 className="fc-text--center">Les différents types de partenaires</h2>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12 fr-col-sm-9 fr-col-md-7 fr-col-lg-4 fc-text--center">
              <Image
                className="fr-mb-5v"
                src="/images/pictograms/digital/internet.svg"
                alt="Fournisseur de Service"
                role="presentation"
                width={100}
                height={100}
              />
              <h3 className="fr-mb-3v fr-mb-md-5 fr-h5">Fournisseur de Service</h3>
              <p className="fr-text--lg">
                Je souhaite implémenter le bouton ProConnect sur mon site internet pour en faciliter
                l&rsquo;accès aux agents publics.
              </p>
              <p className="fr-text--lg">
                <a href="/docs/fournisseur-service" className="fr-mb-6v">
                  <span>En savoir plus</span>
                  <span
                    className="fr-icon-arrow-right-line fr-icon--sm fr-ml-2v"
                    aria-hidden="true"
                  ></span>
                </a>
              </p>
            </div>
            <div className="fr-col-12 fr-col-sm-9 fr-col-md-7 fr-col-lg-4 fc-text--center">
              <Image
                className="fr-mb-5v"
                src="/images/pictograms/document/national-identity-card.svg"
                alt="Fournisseur d'Identité"
                role="presentation"
                width={100}
                height={100}
              />
              <h3 className="fr-mb-3v fr-mb-md-5 fr-h5">Fournisseur d&rsquo;Identité</h3>
              <p className="fr-text--lg">
                Je souhaite permettre à mes utilisateurs d&rsquo;accéder à l&rsquo;ensemble des
                services disponibles via ProConnect.
              </p>
              <p className="fr-text--lg">
                <a href="/docs/fournisseur-identite" className="fr-mb-6v">
                  <span>En savoir plus</span>
                  <span
                    className="fr-icon-arrow-right-line fr-icon--sm fr-ml-2v"
                    aria-hidden="true"
                  ></span>
                </a>
              </p>
            </div>
            <div className="fr-col-12 fr-col-sm-9 fr-col-md-7 fr-col-lg-4 fc-text--center">
              <Image
                className="fr-mb-5v"
                src="/images/pictograms/digital/data-visualization.svg"
                alt="Fournisseur de Données"
                role="presentation"
                width={100}
                height={100}
              />
              <h3 className="fr-mb-3v fr-mb-md-5 fr-h5">Fournisseur de Données</h3>
              <p className="fr-text--lg">
                Je souhaite permettre aux Fournisseurs de Service d&rsquo;accéder à des données dont
                je dispose sur leurs utilisateurs.
              </p>
              <p className="fr-text--lg">
                <span className="fr-mb-6v">
                  <span>Bientôt disponible !</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="fr-container fr-py-8w fr-py-lg-12w">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-mb-5v">
          <div className="fr-col-12">
            <h2 className="fc-text--center">Les services déjà ProConnectés</h2>
          </div>
        </div>

        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-mb-8w">
          <div className="fr-col-md-3 fr-col-sm-6 fr-col-12 fc-text--center">
            <a
              href="https://lasuite.numerique.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className={fr.cx("fr-raw-link")}
            >
              <Image
                src="/images/partners/lasuite.svg"
                alt="La Suite"
                width={180}
                height={70}
                style={{ objectFit: "contain", height: "70px" }}
              />
            </a>
          </div>
          <div className="fr-col-md-3 fr-col-sm-6 fr-col-12 fc-text--center">
            <a
              href="https://www.rdv-service-public.fr"
              target="_blank"
              rel="noopener noreferrer"
              className={fr.cx("fr-raw-link")}
            >
              <Image
                src="/images/partners/rdv-service-public.svg"
                alt="RDV Service Public"
                width={180}
                height={70}
                style={{ objectFit: "contain", height: "70px" }}
              />
            </a>
          </div>
          <div className="fr-col-md-3 fr-col-sm-6 fr-col-12 fc-text--center">
            <a
              href="https://whaller.com"
              target="_blank"
              rel="noopener noreferrer"
              className={fr.cx("fr-raw-link")}
            >
              <Image
                src="/images/partners/whaller.png"
                alt="Whaller"
                width={180}
                height={70}
                style={{ objectFit: "contain", height: "70px" }}
              />
            </a>
          </div>
          <div className="fr-col-md-3 fr-col-sm-6 fr-col-12 fc-text--center">
            <a
              href="https://www.malt.fr"
              target="_blank"
              rel="noopener noreferrer"
              className={fr.cx("fr-raw-link")}
            >
              <Image
                src="/images/partners/malt.svg"
                alt="Malt"
                width={180}
                height={70}
                style={{ objectFit: "contain", height: "70px" }}
              />
            </a>
          </div>
        </div>

        <div className="fc-text--center">
          <a
            href="https://www.proconnect.gouv.fr/services"
            className={fr.cx("fr-link")}
            target="_blank"
          >
            Découvrez l&rsquo;annuaire des services{" "}
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
