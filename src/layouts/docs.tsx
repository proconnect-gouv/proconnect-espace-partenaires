import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { SideMenu, SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import Link from "next/link";
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

interface TraversalResult {
  flatPages: FlatPage[];
  hasCurrentPage: boolean;
  breadcrumbSegments: Array<{ label: string; linkProps: { href: string } }>;
}

function traverseTree(
  items: SideMenuProps.Item[],
  targetPath: string,
  parentSections: SideMenuProps.Item[] = []
): TraversalResult {
  let result: TraversalResult = {
    flatPages: [],
    hasCurrentPage: false,
    breadcrumbSegments: [
      { label: "Accueil", linkProps: { href: "/" } },
      { label: "Documentation technique", linkProps: { href: "/docs" } },
    ],
  };

  for (const item of items) {
    if (item.linkProps?.href) {
      const page = {
        text: item.text?.toString() || "",
        href: item.linkProps.href.toString(),
      };
      result.flatPages.push(page);

      if (item.linkProps.href === "/docs/" + targetPath) {
        item.isActive = true;
        result.hasCurrentPage = true;

        // For all pages except root sections
        if (parentSections.length > 0) {
          // Mark all parent sections as expanded
          parentSections.forEach((section) => {
            // @ts-expect-error doesn't seem to infer type correctly
            section.expandedByDefault = true;
          });

          // Build breadcrumb segments from parent sections
          parentSections.forEach((section) => {
            // @ts-expect-error doesn't seem to infer type correctly
            const sectionPath = section.items?.[0]?.linkProps?.href;
            result.breadcrumbSegments.push({
              label: section.text?.toString() || "",
              linkProps: { href: sectionPath || "/docs" },
            });
          });

          // For non-intro pages, add the page itself to breadcrumb
          if (item.text !== "Introduction") {
            result.breadcrumbSegments.push({
              label: item.text?.toString() || "",
              linkProps: { href: item.linkProps.href },
            });
          }
        }
      }
    }

    // @ts-expect-error doesn't seem to infer type correctly
    if (item.items) {
      // @ts-expect-error doesn't seem to infer type correctly
      const childResult = traverseTree(item.items, targetPath, [...parentSections, item]);
      result.flatPages.push(...childResult.flatPages);
      if (childResult.hasCurrentPage) {
        result = childResult;
      }
    }
  }

  return result;
}

function DocsLayout({ children, pathname }: DocsLayoutProps) {
  const { sectionTree, flatPages, breadcrumbSegments, currentIndex } = useMemo(() => {
    const tree = structuredClone(docTree);
    const { flatPages, breadcrumbSegments } = traverseTree(tree, pathname);
    return {
      sectionTree: tree,
      flatPages,
      breadcrumbSegments,
      currentIndex: flatPages.findIndex((page) => page.href === "/docs/" + pathname),
    };
  }, [pathname]);

  const prevPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const nextPage = currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null;

  return (
    <PageLayout>
      <div className={fr.cx("fr-grid-row", "fr-container")}>
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
            segments={breadcrumbSegments.slice(0, -1)}
            currentPageLabel={breadcrumbSegments[breadcrumbSegments.length - 1]?.label}
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
                <Link
                  href={prevPage.href}
                  className="fr-link fr-icon-arrow-left-line fr-link--icon-left"
                >
                  {prevPage.text}
                </Link>
              </p>
            )}
            {nextPage && pathname != "/docs" && (
              <p className="fr-mb-0">
                <Link
                  href={nextPage.href}
                  className="fr-link fr-icon-arrow-right-line fr-link--icon-right fr-mt-auto fr-mr-0"
                >
                  {nextPage.text}
                </Link>
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
