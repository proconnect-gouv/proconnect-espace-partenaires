import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { fr } from "@codegouvfr/react-dsfr";
import { useRouter } from "next/router";
import NextLink from "next/link";
import CodeBlock from '@/components/CodeBlock';
import { Fragment, ReactNode } from "react";
import { CallOut, CallOutProps } from "@codegouvfr/react-dsfr/CallOut";
import path from 'path';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {// Add table components that use DSFR classes
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
          alt={alt || ''}
          width={800} // Those are only fallback dimensions and will be overridden by the image dimensions in style
          height={600}
          style={{
            maxWidth: '100%',
            height: 'auto'
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
        //const router = useRouter();
        let href = props.href || '';
        
        // Skip external links
        if (href.startsWith('http') || href.startsWith('//')) {
          return <NextLink {...props} target="_blank" rel="noopener noreferrer" />;
        }

        // Remove .md extension and handle index.md special case
        href = href.replace(/\.md$/, '').replace(/\/index$/, '');
/*
        // If it's a relative path, make it absolute
        if (!href.startsWith('/')) {
          const base = router.pathname.replace(/\/[^/]+$/, '/');
          href = new URL(href, 'http://base.com' + base).pathname;
        }
*/
        // Ensure /docs prefix
        if (!href.startsWith('/docs/')) {
          href = '/docs/' + href.replace(/^\//, '');
        }

        return (
          <NextLink 
              {...props} 
              href={href} 
              className={fr.cx("fr-link")}
          />
        );
    },
    blockquote: (props) => {

        // Map GitHub alert types to DSFR CallOut color variants
        // https://docs.github.com/fr/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
        // https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/mise-en-avant/
        // TODO icons?
        // Note: we couldn't use the Alert component because it only supports text description, not any children
        const alertColorMap: Record<string, CallOutProps.ColorVariant | undefined> = {
            NOTE: undefined,
            TIP: "green-menthe",
            IMPORTANT: "orange-terre-battue",
            WARNING: "yellow-tournesol",
            CAUTION: "pink-macaron"
        };

        if (
            props.children &&
            Array.isArray(props.children) &&
            props.children.length === 3
        ) {
            const lines = props.children[1]?.props?.children;
            if (lines.length > 1 && typeof lines[0] === 'string') {
                const match = lines[0].match(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
                if (match) {
                    return <CallOut colorVariant={alertColorMap[match[1]]}>{lines.slice(2)}</CallOut>;
                }
            }
            return <CallOut>{props.children[1].props.children}</CallOut>;
        }
        
      // Default case for regular blockquotes
      return <CallOut>{props.children}</CallOut>;
    },
    pre: (props) => {
      if (typeof props.children === 'object' && props.children.type === 'code') {
        const { children, className = '' } = props.children.props;
        // Extract language from className (format: "language-xxx")
        const lang = className.replace('language-', '');
        
        return (
          <CodeBlock 
            code={children} 
            lang={lang || 'text'} 
            theme="nord" 
          />
        );
      }
      return <pre {...props} />;
    },
    ...components,
  }
};


/**
 * Avoid unauthorized HTML tags inside p tags. (e.g. no p inside p, no div inside p, etc.)
 */
export const paragraphContentMDXComponents: MDXComponents = {
    p: Fragment,
};
