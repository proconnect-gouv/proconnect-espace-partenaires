import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { SideMenu, SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { ReactNode, useMemo } from "react";
import styles from "./docs.module.css";
import { docTree } from "./docsNav";
import { PageLayout } from "./page";

interface DocsLayoutProps {
  children: ReactNode;
  pathname: string;
}

interface FlatPage {
  text: string;
  href: string;
}

function flattenPages(items: SideMenuProps.Item[]): FlatPage[] {
  return items.reduce<FlatPage[]>((acc, item) => {
    if (item.linkProps?.href) {
      acc.push({
        text: item.text?.toString() || "",
        href: item.linkProps.href,
      });
    }
    if (item.items) {
      acc.push(...flattenPages(item.items));
    }
    return acc;
  }, []);
}

function DocsLayout({ children, pathname }: DocsLayoutProps) {
  // Memoize the section tree
  const sectionTree = useMemo(
    () => JSON.parse(JSON.stringify(docTree)),
    [] // docTree is a constant, so empty deps array is fine
  );

  // Memoize these values to avoid recalculations
  const { currentPageLabel, currentSection } = useMemo(() => {
    let currentPageLabel: string | undefined = undefined;
    let currentSection: string | undefined = undefined;

    // Set isActive to true for the current section and page, recursively
    const setIsActive = (items: SideMenuProps.Item[]) => {
      items.forEach((item) => {
        if (item.linkProps?.href === "/docs/" + pathname) {
          item.isActive = true;
          currentPageLabel = item.text?.toString();
          // Set current section for breadcrumb
          if (item.linkProps.href.split("/").length > 2) {
            const section = sectionTree.find((s) =>
              s.items?.some((i) => i.linkProps?.href === item.linkProps?.href)
            );
            if (section) {
              currentSection = section.text?.toString();
              section.expandedByDefault = true;
              // For introduction pages, use section title instead
              if (currentPageLabel === "Introduction") {
                currentPageLabel = section.text?.toString();
              }
            }
          }
        }
        if (item.items) {
          setIsActive(item.items);
        }
      });
    };

    // Set active states in the tree
    setIsActive(sectionTree);

    return { currentPageLabel, currentSection };
  }, [pathname, sectionTree]);

  // Get flat list of pages for prev/next navigation
  const flatPages = useMemo(() => flattenPages(docTree), []);

  // Memoize segments array
  const segments = useMemo(() => {
    const baseSegments = [
      { label: "Accueil", linkProps: { href: "/" } },
      { label: "Documentation technique", linkProps: { href: "/docs" } },
    ];

    if (
      currentSection &&
      pathname.split("/").length > 1 &&
      currentPageLabel !== currentSection
    ) {
      baseSegments.push({
        label: currentSection,
        linkProps: { href: `/docs/${pathname.split("/")[0]}` },
      });
    }

    if (currentPageLabel) {
      baseSegments.push({
        label: currentPageLabel,
        linkProps: { href: `/docs/${pathname}` },
      });
    }

    return baseSegments;
  }, [currentSection, currentPageLabel, pathname]);

  const currentIndex = useMemo(
    () => flatPages.findIndex((page) => page.href === "/docs/" + pathname),
    [flatPages, pathname]
  );

  const prevPage = useMemo(
    () => (currentIndex > 0 ? flatPages[currentIndex - 1] : null),
    [currentIndex, flatPages]
  );

  const nextPage = useMemo(
    () =>
      currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null,
    [currentIndex, flatPages]
  );

  return (
    <PageLayout>
      <div className={fr.cx("fr-grid-row")}>
        <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
          <SideMenu
            align="left"
            burgerMenuButtonText="Rubriques de la documentation"
            items={sectionTree}
            sticky
            fullHeight
            className={fr.cx("fr-mb-0-5v")}
            classes={{
              inner: fr.cx("fr-pt-12v"),
            }}
          />
        </div>
        <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-py-12v")}>
          <Breadcrumb
            segments={segments}
            currentPageLabel={currentPageLabel}
          />
          {children}
          {/* Navigation prev/next */}
          <div
            className={
              fr.cx("fr-pt-6w", "fr-mt-14v") +
              " " +
              styles["page-switcher"] +
              " " +
              (!prevPage && nextPage ? styles["page-switcher--f-end"] : "")
            }
          >
            {prevPage && (
              <p className="fr-mb-0">
                <a
                  href={prevPage.href}
                  className="fr-link fr-icon-arrow-left-line fr-link--icon-left"
                >
                  {prevPage.text}
                </a>
              </p>
            )}
            {nextPage && (
              <p className="fr-mb-0">
                <a
                  href={nextPage.href}
                  className="fr-link fr-icon-arrow-right-line fr-link--icon-right fr-mt-auto fr-mr-0"
                >
                  {nextPage.text}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export function DocsLayoutFactory({ pathname }: { pathname: string }) {
  return function WrappedDocsLayout({ children }: { children: ReactNode }) {
    return <DocsLayout pathname={pathname}>{children}</DocsLayout>;
  };
}
