import path from "path";
import { visit } from "unist-util-visit";

// Plugin to handle relative links based on source file
export const remarkRelativeLinks = () => (tree, file) => {
  visit(tree, "link", (node) => {
    // Skip external links
    if (node.url.match(/^(https?:)?\/\//) || node.url.match(/^mailto:/)) {
      return;
    }

    // Remove #hash from href and store it in a variable
    let hash = node.url.match(/#.*$/);
    if (hash) {
      node.url = node.url.replace(hash[0], "");
    }

    const pagesPath = path.join(
      path.dirname(import.meta.url).replace(/^file\:/, ""),
      "../../src/pages",
    );

    // Handle relative links
    if (!node.url.startsWith("/")) {
      node.url = path.join(path.dirname(file.path), node.url);
      if (!node.url.startsWith(pagesPath)) {
        throw new Error("Invalid link: " + node.url);
      }
      node.url = node.url.slice(pagesPath.length);
    }

    // Remove .md extension and normalize paths
    node.url = node.url.replace(/\.mdx?$/, "").replace(/\/index$/, "");

    // Add hash back to href if it exists
    if (hash) {
      node.url = node.url + hash[0];
    }
  });
};
