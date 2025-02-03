import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import styles from './CodeBlock.module.css';
import CopyToClipboard from './CopyToClipboard';

interface CodeBlockProps {
  code: string;
  lang?: string;
  theme?: string;
}

// TODO: filename? https://www.nikolailehbr.ink/blog/syntax-highlighting-shiki-next-js
// TODO: investigate compile-time only? https://mdxjs.com/guides/syntax-highlighting/#syntax-highlighting-at-compile-time
export default function CodeBlock({ code, lang = 'typescript', theme = 'nord' }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const highlighted = await codeToHtml(code, {
          lang,
          theme,
        });
        setHtml(highlighted);
      } catch (error) {
        console.error('Error highlighting code:', error);
        // Fallback to plain text if highlighting fails
        setHtml(`<pre><code>${code}</code></pre>`);
      }
    };

    highlightCode();
  }, [code, lang, theme]);

  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code}</code></pre>` }} />
      <CopyToClipboard code={code} />
    </div>
  );
}