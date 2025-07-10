import { SideMenu as DsfrSideMenu } from "@codegouvfr/react-dsfr/SideMenu";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const router = useRouter();
  const hash = router.asPath.split("#")[1] || "";

  return (
    <DsfrSideMenu
      className="fr-col-12 fr-col-md-3"
      classes={{
        inner: "fr-pt-12v",
      }}
      sticky
      fullHeight
      burgerMenuButtonText="Dans cette rubrique"
      items={[
        {
          isActive: hash === "cles",
          linkProps: {
            href: "#cles",
          },
          text: "Clés",
        },
        {
          isActive: hash === "urls",
          linkProps: {
            href: "#urls",
          },
          text: "URLs",
        },
        {
          isActive: hash === "algs",
          linkProps: {
            href: "#algs",
          },
          text: "Algorithmes",
        },
        {
          isActive: hash === "production",
          linkProps: {
            href: "#production",
          },
          text: "Production",
        },
      ]}
    />
  );
};
