import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          ProConnect | Identifiez les professionnels sur les sites de
          l’administration
        </title>
      </Head>

      <div className={fr.cx("fr-py-6w")}>
        <div
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--middle"
          )}
        >
          <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
            <h1>
              Nous identifions pour vous
              <br />
              les professionnels du privé
              <br />
              et du public.
            </h1>

            <div
              className={fr.cx(
                "fr-btns-group",
                "fr-btns-group--inline",
                "fr-mt-4w"
              )}
            >
              <Button
                linkProps={{
                  href: "/demo",
                }}
                priority="primary"
              >
                Faire le parcours démo
              </Button>

              <Button
                linkProps={{
                  href: "/docs",
                }}
                priority="secondary"
              >
                Implémenter ProConnect
              </Button>
            </div>
          </div>

          <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
            <Image
              src="/images/home-laptop.svg"
              alt="Illustration d'un ordinateur portable avec l'interface de connexion"
              width={384}
              height={302}
              priority
            />
          </div>
        </div>

        <section className={fr.cx("fr-mt-10w")}>
          <h2>Pourquoi intégrer ProConnect ?</h2>

          <div
            className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-4w")}
          >
            <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
              <div className={fr.cx("fr-card", "fr-card--no-border")}>
                <div className={fr.cx("fr-card__body")}>
                  <div className={fr.cx("fr-card__content")}>
                    <h3>Gagnez du temps de développement</h3>
                    <p>
                      Nous nous chargeons de connecter vos utilisateurs à votre
                      service numérique.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
              <div className={fr.cx("fr-card", "fr-card--no-border")}>
                <div className={fr.cx("fr-card__body")}>
                  <div className={fr.cx("fr-card__content")}>
                    <h3>Profitez de notre process d’identification</h3>
                    <p>
                      Notre algorithme identifie les organisations, s’adapte à
                      leur taille et apprend de chaque partenaire.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
              <div className={fr.cx("fr-card", "fr-card--no-border")}>
                <div className={fr.cx("fr-card__body")}>
                  <div className={fr.cx("fr-card__content")}>
                    <h3>Simplifier votre service</h3>
                    <p>
                      Offrez un parcours simple, rapide et utilisé sur plusieurs
                      services de l’État.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={fr.cx(
              "fr-btns-group",
              "fr-btns-group--center",
              "fr-mt-4w"
            )}
          >
            <Button
              linkProps={{
                href: "/demo",
              }}
            >
              Faire le parcours démo
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
