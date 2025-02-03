import { ReactNode } from 'react';
import { fr } from "@codegouvfr/react-dsfr";
import { SideMenu, SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { docTree } from './docsNav';
import { PageLayout } from './page';
import styles from './docs.module.css';

interface DocsLayoutProps {
  children: ReactNode;
}

interface DocsLayoutFactoryProps {
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
        text: item.text?.toString() || '',
        href: item.linkProps.href
      });
    }
    if (item.items) {
      acc.push(...flattenPages(item.items));
    }
    return acc;
  }, []);
}

export function DocsLayoutFactory({ pathname }: DocsLayoutFactoryProps) {
  const sectionTree = JSON.parse(JSON.stringify(docTree));
  let currentPageLabel: string | undefined = undefined;
  let currentSection: string | undefined = undefined;

  // Set isActive to true for the current section and page, recursively
  const setIsActive = (items: SideMenuProps.Item[]) => {
    items.forEach(item => {
      if (item.linkProps?.href === "/docs/" + pathname) {
        item.isActive = true;
        currentPageLabel = item.text?.toString();
        // Set current section for breadcrumb
        if (item.linkProps.href.split("/").length > 2) {
          const section = sectionTree.find(s => 
            s.items?.some(i => i.linkProps?.href === item.linkProps?.href)
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

  // Build breadcrumb segments
  let segments = [
    { label: "Accueil", linkProps: { href: "/" } },
    { label: "Documentation technique", linkProps: { href: "/docs" } }
  ];

  // Only add section to breadcrumb if we're not on an introduction page
  if (currentSection && pathname.split("/").length > 1 && currentPageLabel !== currentSection) {
    segments.push({ 
      label: currentSection,
      linkProps: { href: `/docs/${pathname.split("/")[0]}` } 
    });
  }

  // Get flattened list of pages for pagination
  const flatPages = sectionTree.reduce<FlatPage[]>((acc, section) => {
    if (section.items) {
      acc.push(...flattenPages(section.items));
    }
    return acc;
  }, []);

  const currentIndex = flatPages.findIndex(page => page.href === "/docs/" + pathname);
  const prevPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const nextPage = currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null;

  return function DocsLayout({ children }: DocsLayoutProps) {
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
                inner: fr.cx("fr-pt-12v")
              }}
            />
          </div>
          <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-py-12v")}>
            <Breadcrumb
              segments={segments}
              currentPageLabel={currentPageLabel}
            />
            {children}

            <div className={fr.cx("fr-pt-6w", "fr-mt-14v")+" "+styles["page-switcher"]+" "+((!prevPage && nextPage)?styles["page-switcher--f-end"]:"")}>
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
} 
