import CodeBlock from "@/components/CodeBlock";
import { fr } from "@codegouvfr/react-dsfr";
import { CallOut, CallOutProps } from "@codegouvfr/react-dsfr/CallOut";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import NextLink from "next/link";
import { Fragment, ReactNode } from "react";
import { Step, VerticalStepper } from "./components/VerticalStepper";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Add table components that use DSFR classes
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
      <div className={fr.cx("fr-table")}>
        <table {...props} className={fr.cx("fr-table__body")} />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead {...props} className={fr.cx("fr-table__head")} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th {...props} className={fr.cx("fr-table__header")} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr {...props} className={fr.cx("fr-table__row")} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
      <td {...props} className={fr.cx("fr-table__cell")} />
    ),
    img: (props) => {
      const { src, alt, ...rest } = props;

      if (!src) return null;

      return (
        <Image
          src={src}
          alt={alt || ""}
          width={800} // Those are only fallback dimensions and will be overridden by the image dimensions in style
          height={600}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          {...rest}
        />
      );
    },
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className={fr.cx("fr-h1")}>{children}</h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className={fr.cx("fr-h2", "fr-mt-3w")}>{children}</h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className={fr.cx("fr-h3", "fr-mt-3w")}>{children}</h3>
    ),
    /*p: ({ children }: { children: ReactNode }) => (
        <p className={fr.cx("fr-text--md", "fr-mb-2w")}>{children}</p>
    ),*/
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      let href = props.href || "";

      // Skip external links
      if (href.match(/^(https?:)?\/\//)) {
        return (
          <NextLink {...props} target="_blank" rel="noopener noreferrer" />
        );
      }

      return <NextLink {...props} href={href} className={fr.cx("fr-link")} />;
    },
    blockquote: (props) => {
      // Map GitHub alert types to DSFR CallOut color variants
      // https://docs.github.com/fr/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
      // https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/mise-en-avant/
      // TODO icons?
      // Note: we couldn't use the Alert component because it only supports text description, not any children
      const alertColorMap: Record<
        string,
        CallOutProps.ColorVariant | undefined
      > = {
        NOTE: undefined,
        TIP: "green-menthe",
        IMPORTANT: "orange-terre-battue",
        WARNING: "yellow-tournesol",
        CAUTION: "pink-macaron",
      };

      if (
        props.children &&
        Array.isArray(props.children) &&
        props.children.length === 3
      ) {
        const lines = props.children[1]?.props?.children;
        if (lines.length > 1 && typeof lines[0] === "string") {
          const match = lines[0].match(
            /\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/
          );
          if (match) {
            return (
              <CallOut colorVariant={alertColorMap[match[1]]}>
                {lines.slice(2)}
              </CallOut>
            );
          }
        }
        return <CallOut>{props.children[1].props.children}</CallOut>;
      }

      // Default case for regular blockquotes
      return <CallOut>{props.children}</CallOut>;
    },
    pre: (props) => {
      if (
        typeof props.children === "object" &&
        props.children.type === "code" &&
        props["data-code"]
      ) {
        return (
          <CodeBlock
            rendered={props.children.props.children}
            code={decodeURIComponent(props["data-code"])}
          />
        );
      }
      return <pre {...props} />;
    },
    VerticalStepper,
    Step,
    ...components,
  };
}

/**
 * Avoid unauthorized HTML tags inside p tags. (e.g. no p inside p, no div inside p, etc.)
 */
export const paragraphContentMDXComponents: MDXComponents = {
  p: Fragment,
};
