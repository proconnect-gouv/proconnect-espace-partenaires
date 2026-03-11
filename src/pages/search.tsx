import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import Fuse, { IFuseOptions } from "fuse.js";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface SearchEntry {
  title: string;
  headings: string[];
  body: string;
  url: string;
}

function highlightTerms(text: string, terms: string[]): React.ReactNode[] {
  if (terms.length === 0) return [text];

  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className={fr.cx("fr-text--bold")}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function getExcerpt(body: string, terms: string[]): React.ReactNode {
  const lowerBody = body.toLowerCase();
  let bestIndex = 0;

  for (const term of terms) {
    const idx = lowerBody.indexOf(term.toLowerCase());
    if (idx !== -1) {
      bestIndex = idx;
      break;
    }
  }

  const contextStart = Math.max(0, bestIndex - 80);
  const contextEnd = Math.min(body.length, bestIndex + 200);
  const excerpt = body.slice(contextStart, contextEnd);

  return (
    <>
      {contextStart > 0 && "..."}
      {highlightTerms(excerpt, terms)}
      {contextEnd < body.length && "..."}
    </>
  );
}

const fuseOptions: IFuseOptions<SearchEntry> = {
  keys: [
    { name: "title", weight: 3 },
    { name: "headings", weight: 2 },
    { name: "body", weight: 1 },
  ],
  threshold: 0.3,
  ignoreDiacritics: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  const query = typeof router.query.q === "string" ? router.query.q : "";
  const [index, setIndex] = useState<SearchEntry[] | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/search-index.json`)
      .then((res) => res.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  }, []);

  const searchTerms = useMemo(
    () =>
      query
        .split(/\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length >= 2),
    [query],
  );

  const results = useMemo(() => {
    if (!index || !query) return [];
    const fuse = new Fuse(index, fuseOptions);
    return fuse.search(query);
  }, [index, query]);

  return (
    <>
      <NextSeo title={query ? `Recherche : ${query}` : "Recherche"} />
      <div className={fr.cx("fr-container", "fr-py-6w")}>
        <h1 className={fr.cx("fr-h2", "fr-mb-4w")}>
          {query ? (
            <>
              Résultat{results.length > 1 ? "s" : ""} de la recherche &laquo;&nbsp;{query}
              &nbsp;&raquo;
            </>
          ) : (
            "Recherche"
          )}
        </h1>

        {index === null && <p>Chargement...</p>}

        {index !== null && query && results.length === 0 && (
          <div className={fr.cx("fr-callout")}>
            <p className={fr.cx("fr-callout__text")}>
              Aucun résultat trouvé pour <strong>&laquo;&nbsp;{query}&nbsp;&raquo;</strong>. Essayez
              avec d&rsquo;autres termes ou consultez la{" "}
              <Link href="/docs" className={fr.cx("fr-link")}>
                documentation
              </Link>
              .
            </p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className={fr.cx("fr-text--sm", "fr-mb-3w")}>
              {results.length} résultat{results.length > 1 ? "s" : ""} de recherche
            </p>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
              {results.map(({ item }) => (
                <div key={item.url} className={fr.cx("fr-col-12")}>
                  <Card
                    title={item.title}
                    titleAs="h2"
                    desc={getExcerpt(item.body, searchTerms)}
                    enlargeLink
                    linkProps={{ href: item.url }}
                    border
                    size="small"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
