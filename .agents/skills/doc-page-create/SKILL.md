---
name: doc-page-create
description: Create a new page in the ProConnect partner documentation under src/pages/docs. Use this whenever the user asks to add, write, draft or create a documentation page, doc or note for Fournisseur de Service / Fournisseur d'Identité partners in this repository, even if they do not mention the path. Covers picking the section and the single question the page answers, writing a page that stands on its own, the H1-and-no-frontmatter rules, wiring the page into table_matieres.md, and the build checks that catch broken relative links.
---

# Playbook — create a documentation page

Use this when adding a new page under `src/pages/docs/`. The rules it relies on are in [`AGENTS.md`](../../../AGENTS.md) section 5; this file is only the procedure.

## 1. Before creating anything

1. **Is the question already answered?** `grep -ril "<keyword>" src/pages/docs` and read the hits. Two pages answering the same question is the thing to avoid — the answer splits in two and both halves rot. Pages that merely _mention_ the subject are not a problem: a page is allowed to restate a fact it needs.
2. **Is this a section of an existing page?** If the subject only makes sense while reading another page, add a `##` section there instead.
3. **Which audience?** A reader arrives at `/docs`, says whether they are FS, FI or sécurité/métier, lands on that audience's home, and finds pages through its table of contents. The folder you choose decides which of those paths the page sits on:

- `fournisseur-service/` — teams integrating the ProConnect button
- `fournisseur-identite/` — organisations joining the federation as an IdP
- `metier/` — security, legal and business stakeholders (table of contents only; pages live elsewhere)
- `ressources/` — material shared by FS and FI (OIDC, eIDAS, glossary, MFA)

4. **What single question does the page answer?** Write it down in the reader's words before writing the page — it becomes the `table_matieres.md` row, and if you cannot phrase one question, the page has no shape yet.
5. **Is it explanation or reference?** A page that explains _why_ and a page that lists _what_ serve different needs. Pick one; a page trying to do both serves neither.

Confirm the answers with the person asking if any of them is a guess.

## 2. Create the file

Path: `src/pages/docs/<section>/<slug>.md`. Slug style is inconsistent across the repo (`niveaux-acr.md`, `custom-scope.md`, `siret_hint_usage.md`) — match the files already in that folder rather than introducing a third style.

Use `.mdx` only if you need `CallOut`, `VerticalStepper`/`Step` or `Quote`. Plain `.md` otherwise: it is simpler and every other page is `.md`.

Skeleton:

```markdown
# <Titre de la page>

<Une ou deux phrases qui répondent immédiatement à la question, sans préambule.>

## <Première section>

<Contenu.>

> [!NOTE]
> <Information utile mais non bloquante.>

## <Deuxième section>
```

**Write it to be read cold.** The reader may land here from a search engine or a support email, having read nothing else, so the page states its own context rather than assuming a previous page. Concretely: repeat a short table or a one-line definition where it saves a click — the eIDAS levels table sits in three pages on purpose — but link to the canonical page in `ressources/` for the long _why_ instead of re-explaining it.

- The `# H1` is the first line, appears once, and becomes the page title, the breadcrumb label and the search-index key. No YAML frontmatter — it is not parsed.
- One line per paragraph. Never hard-wrap prose: prettier preserves what you write, and wrapped paragraphs make later diffs unreadable.
- Number sections (`## 1.`, `### 1.1.`) only if the sibling pages in that folder do.
- French, vouvoiement, factual tone. Protocol terms stay canonical: `client_id`, `scope`, `acr`.
- Code fences always declare a language, so Shiki can highlight them.
- Alerts: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`. Reserve `CAUTION` for things that break a partner's integration.
- Prefer linking to the doc page that owns a subject over pasting a third-party URL again: external links already repeated across many pages (Grist, démarches-simplifiées) are the ones that rot.

## 3. Wire it in

A page that is not wired in is invisible — nothing crawls the folder to build the menu.

1. **`table_matieres.md` of the section** — add a row under the right numbered theme: `| [Titre](./<slug>.md) | <La question en langage utilisateur ?> |`. This is how readers find pages, so the table lists every page of that audience. A page in `ressources/` is shared: add a row to each audience's table that needs it.
2. **Cross-links, in both directions.** This is research, not a formality: a page nobody links to is reached only by readers who already knew it existed.
   - _Outbound_ — link the pages this one defers to instead of re-explaining them: `[Flux OIDC](../ressources/flux_oidc.md)`, `[Rôles](./roles.md)`.
   - _Inbound_ — `grep -rln "<keyword>" src/pages/docs` to find the pages whose readers will run into this question, read them, and propose a link from each with a one-line reason. Add the ones where the reader obviously needs it; list the rest and let the person decide, so the diff stays reviewable.
   - Links are relative and keep the extension. One that escapes `src/pages` makes `npm run build` throw `Invalid link:`; one pointing at a file that does not exist fails silently, so check the path yourself.
3. Never touch `public/search-index.json` — `npm run predev` regenerates it from the files.

## 4. Verify

```bash
npx prettier --write src/pages/docs/<section>/<slug>.md --print-width 100
npm run build     # catches Invalid link and MDX errors
npm run dev       # open the page, the table of contents row, and every link you added
```

## 5. Report

Say which page you created, where you linked it from, and **what you could not verify** — any factual claim about ProConnect behaviour that you did not read in the code or in the upstream repositories needs a maintainer's confirmation before merge. Guessing here is worse than leaving a gap: partners implement against these pages.
