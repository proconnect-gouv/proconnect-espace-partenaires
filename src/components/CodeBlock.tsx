import styles from "./CodeBlock.module.css";
import CopyToClipboard from "./CopyToClipboard";

interface CodeBlockProps {
  rendered: string;
  code: string;
}

export default function CodeBlock({ rendered, code }: CodeBlockProps) {
  return (
    <div className={styles.container}>
      <pre>
        <code>{rendered}</code>
      </pre>

      <CopyToClipboard code={code} />
    </div>
  );
}
