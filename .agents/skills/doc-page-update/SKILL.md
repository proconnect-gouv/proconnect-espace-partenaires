---
name: doc-page-update
description: Update, correct, restructure, rename, move or delete an existing page of the ProConnect partner documentation under src/pages/docs. Use this whenever the user asks to change, fix, reword, reorganise or remove documentation content in this repository, even for a one-line edit. Covers surgical editing that survives the CI markdown formatter, keeping public URLs stable with redirects, and the inbound links and e2e assertions that break otherwise.
---

# Playbook — update a documentation page

Use this when changing an existing page under `src/pages/docs/`. The rules it relies on are in [`AGENTS.md`](../../../AGENTS.md) section 5; this file is only the procedure.

## 1. Find the page and its surroundings

```bash
grep -ril "<keyword>" src/pages/docs          # the page itself
grep -rn "<slug>" src/pages/docs src/layouts  # who links to it, and its table of contents row
```

Read the whole page before editing. Partners read these pages linearly, and a paragraph inserted in the middle of a sequence can contradict the one above it. Also read the sibling pages the change touches: the same fact is often stated in the FS page and the FI page, and leaving one of them stale is worse than not updating either.

## 2. Edit surgically

- Change only the sections you were asked to change. Markdown is reformatted in CI by `prettier --print-width 100`, so **never reflow paragraphs by hand** — a whole-file diff hides the one line that actually changed and makes review useless.
- Keep the existing heading style of the page: numbered (`## 1.`, `### 1.1.`) or not, emoji or not.
- Do not touch the `# H1` unless that is the task: it is the page title, the breadcrumb label, the search-index key, and it is asserted in `e2e/uuv/features/docs.feature` for the section index pages. If you do change it, check that file.
- If the update makes the page answer a second question, stop and propose splitting it instead — see the `doc-page-create` skill.
- Dated information (a compliance deadline, a migration, a deprecation) belongs in a dated page such as `fournisseur-identite/2026_03_conformite_mfa.md`, not inlined into a reference page where it will silently become false.
- Removing content is a real option, but say so explicitly in the report rather than deleting quietly — a partner may be relying on it.

## 3. If you rename, move or delete a page

Renaming is usually harmless: most pages are not linked from anywhere outside the site. What is never optional is fixing the internal links, because a link to a file that no longer exists **does not fail the build** — only a link escaping `src/pages` does — so nothing will catch it for you.

1. `grep -rn "<old-slug>" src/pages/docs src/layouts` and fix every hit: relative links in other pages, the `table_matieres.md` row, and the `docsNav.ts` entry if the page has one.
2. Check `e2e/uuv/features/docs.feature` if the page was a section index — its H1 and URL may be asserted there.
3. **Ask whether the old URL needs a redirect**, and wait for the answer. Who holds that link outside the repository is invisible from the code, so it is the person's call, never yours. Ask plainly, and say what you observed — whether the page looks like one support circulates (an audience index, troubleshooting, test credentials, an IP referential) or one that only ever lived inside the documentation. Add the redirect in `next.config.mjs` (`redirects()`) only once they confirm.
4. Deleting a page is the same procedure, minus the new target: fix every inbound link first, or readers will meet a 404 from the table of contents.

## 4. Verify

```bash
npx prettier --write <changed files> --print-width 100
npm run build     # catches Invalid link and MDX errors
npm run dev       # open the page, follow the links you touched
git diff          # the diff should contain only your change
```

## 5. Report

State what changed, which other pages you checked for the same fact, and what you did **not** verify. Any new claim about ProConnect behaviour that you did not read in the code or the upstream repositories needs a maintainer's confirmation before merge.
