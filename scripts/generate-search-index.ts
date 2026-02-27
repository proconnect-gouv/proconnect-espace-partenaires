import fs from "fs";
import path from "path";

interface SearchEntry {
  title: string;
  headings: string[];
  body: string;
  url: string;
}

const DOCS_DIR = path.join(__dirname, "../src/pages/docs");
const OUTPUT_PATH = path.join(__dirname, "../public/search-index.json");

function stripMarkdown(text: string): string {
  return (
    text
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove JSX/MDX components (multi-line and single-line)
      .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "")
      .replace(/<[A-Z][^>]*\/>/g, "")
      // Remove HTML tags
      .replace(/<[^>]+>/g, "")
      // Remove data URIs
      .replace(/url\(["']?data:[^)]+\)[\s\S]*?(?=[a-zA-Z\n])/g, "")
      // Remove markdown links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      // Remove bold/italic markers
      .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, "$2")
      // Remove inline code backticks
      .replace(/`([^`]+)`/g, "$1")
      // Remove headings markers
      .replace(/^#{1,6}\s+/gm, "")
      // Remove alert markers ([!NOTE], [!TIP], etc.)
      .replace(/\[\!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/g, "")
      // Remove blockquote markers
      .replace(/^>\s+/gm, "")
      // Remove list markers
      .replace(/^[\s]*[-*+]\s+/gm, "")
      .replace(/^[\s]*\d+\.\s+/gm, "")
      // Remove markdown table separator rows
      .replace(/^\|?[\s:]*[-|]+[-|:\s]*\|?\s*$/gm, "")
      // Remove table pipe characters
      .replace(/\|/g, " ")
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Collapse whitespace
      .replace(/\n{2,}/g, "\n")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function filePathToUrl(filePath: string): string {
  const relative = path.relative(DOCS_DIR, filePath);
  return "/docs/" + relative.replace(/\/index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, "");
}

function collectMarkdownFiles(dir: string, isRoot = true): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath, false));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      if (isRoot && /^index\.(md|mdx)$/.test(entry.name)) continue;
      files.push(fullPath);
    }
  }
  return files;
}

function processFile(filePath: string): SearchEntry {
  const raw = fs.readFileSync(filePath, "utf-8");

  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/[#*_`]/g, "").trim() : "";

  const headings = [...raw.matchAll(/^#{2,4}\s+(.+)$/gm)].map((m) =>
    m[1].replace(/[#*_`]/g, "").trim(),
  );

  const body = stripMarkdown(raw);

  return {
    title,
    headings,
    body,
    url: filePathToUrl(filePath),
  };
}

function run() {
  const files = collectMarkdownFiles(DOCS_DIR);
  const index: SearchEntry[] = files.map(processFile);

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2), "utf-8");

  console.log(`Search index generated: ${index.length} pages indexed → ${OUTPUT_PATH}`);
}

run();
