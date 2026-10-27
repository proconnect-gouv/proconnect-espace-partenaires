# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot, Gemini CLI…) working in this repository. Read this file before your first edit.

## 1. Two products in one repository

This Next.js app serves two things with **different rules**. Identify which one you are touching before writing anything.

| Area                                      | Paths                                                                                                                         | Rules                            |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Espace Partenaires** — the application  | `src/pages/*.tsx`, `src/pages/apps/`, `src/pages/api/`, `src/components/`, `src/lib/`, `src/layouts/`, `prisma/`, `packages/` | sections 3 and 4                 |
| **Documentation technique** — public docs | `src/pages/docs/**`                                                                                                           | sections 3 and 5                 |
| End-to-end tests                          | `e2e/**`                                                                                                                      | `e2e/AGENTS.md` (a stub for now) |

Keep them separate: a documentation change should not touch application code, and a feature change should not rewrite documentation pages. If a task genuinely needs both, say so and split the commits.

## 2. Setup and commands

Setup is in [README.md](README.md). Two things it does not say: `PROCONNECT_CLIENT_ID` and `PROCONNECT_CLIENT_SECRET` go in `.env.development.local` (ask a maintainer), and browsing `/docs` needs neither credentials nor a database.

| Command                      | What it actually does                                                            |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `npm run lint`               | prettier `--list-different`, eslint, `tsc --noEmit`. **The gate — must pass.**   |
| `npm run format`             | prettier `--write` over the repo (print width 100)                               |
| `npm run test`               | alias for `npm run lint`. There are **no unit tests** — never claim tests passed |
| `npm run type:check`         | `tsc --noEmit` alone                                                             |
| `npm run build`              | production build; the only check that MDX and documentation links compile        |
| `npm run test:links`         | linkinator crawl of a running dev server                                         |
| `cd e2e && npm run test:e2e` | the UUV/Playwright suite — see `e2e/AGENTS.md`                                   |

## 3. Rules that apply everywhere

- **Credentials** go in `.env.development.local` / `.env.local`, which are git-ignored. `.env.development` is committed and holds placeholders — never put a real value there.
- **Never edit generated output**: `.next/`, `prisma/generated_clients/`, `public/search-index.json`, `public/robots.txt`, `packages/email/dist/`. Change the generator instead.
- **Run `npm run lint` before reporting a task done**, and `npm run format` if it reports formatting differences. CI runs the same thing.
- **No new dependency** without asking first. This is a public State service: every addition is supply-chain surface.
- **Do not run `npm run db:reset`** (it runs `docker compose down -v` and destroys local volumes) unless explicitly asked.
- **Never commit or push to `main`**, never force-push, never amend someone else's commit.
- Keep changes surgical: no drive-by refactors, no reformatting files you were not asked to change.
- **One line per paragraph in Markdown.** Never hard-wrap prose: prettier runs with `proseWrap: preserve`, so a wrapped paragraph stays wrapped forever and every later edit reflows several lines, turning a one-word change into an unreadable diff.

## 4. Espace Partenaires (application code)

- **Pages Router only** (`src/pages`). Do not introduce the App Router, server actions or RSC.
- **DSFR is mandatory for UI**: components from `@codegouvfr/react-dsfr`, classes through `fr.cx()`. No ad-hoc CSS when a DSFR class exists; otherwise a colocated `*.module.css`.
- **Types everywhere.** No `any`, no `@ts-ignore`. The `@ts-expect-error` comments in `src/layouts/docs.tsx` are legacy — do not add more.
- **KISS and DRY**, and prefer an existing helper over a new abstraction.
- **No global state store.** Per-page React state, as today.
- **Secrets and data access are server-side only**: `getServerSideProps` or `src/pages/api/*`. Authenticate with `getServerSession(…, authOptions)` and bail out with a 401 or a redirect to `/login` — copy the pattern in `src/pages/api/apps/index.ts`.
- **Two databases, two Prisma schemas** — pick deliberately:
- `prisma/db_espace.prisma` (PostgreSQL) — NextAuth users, sessions, tokens. Ours.
- `prisma/db_proconnect.prisma` (MongoDB) — the external ProConnect database. Treat as foreign.
- **All OIDC client operations go through `src/lib/pcdbapi.ts`** (HMAC-SHA256 signed requests to PCDBAPI). Never call that API from a component or with a hand-rolled fetch.
- **Language**: user-facing strings in French; identifiers, types and comments in English.

## 5. Documentation technique (`src/pages/docs/**`)

Writing documentation is not writing features. The audience is partners integrating ProConnect: Fournisseurs de Service (`fournisseur-service/`), Fournisseurs d'Identité (`fournisseur-identite/`), security and business stakeholders (`metier/`), with shared material in `ressources/`.

**This repository keeps its agent skills in `.agents/skills/<name>/SKILL.md`.** If your tool discovers skills there, it already knows about them. If it does not, read the one that matches your task before you start — each holds the procedure, so this file can stay limited to the rules:

- creating a page → `.agents/skills/doc-page-create/SKILL.md`
- updating, renaming or deleting a page → `.agents/skills/doc-page-update/SKILL.md`

### 5.1. How a reader finds a page

Discoverability runs through the tables of contents, not through the side menu:

1. `/docs` (`index.md`) asks the reader which they are — Fournisseur de Service, Fournisseur d'Identité, or sécurité/métier.
2. Each audience has a home: `fournisseur-service/index.mdx` and `fournisseur-identite/index.mdx` lay out the integration path step by step. The sécurité/métier audience goes straight to its table of contents.
3. That audience's `table_matieres.md` lists **every page it may need**, grouped by theme, each row phrased as the question the page answers. Pages in `ressources/` are shared and appear in several tables.

A page with no row in a `table_matieres.md` is effectively invisible: nothing crawls the folder, and `src/layouts/docsNav.ts` deliberately carries only the entry points. Coverage is meant to be complete — the only pages currently left out on purpose are the two `changement-agentconnect-proconnect-*` migration notices.

### 5.2. What belongs on a page

The governing principle is [Every Page is Page One](https://everypageispageone.com/the-book/). A partner arrives from a search engine, a support email or a Tchap thread, so **any page can be the first one they read**. Each page therefore establishes its own context and links out for depth, instead of depending on having been read after another page.

- **Prefer atomic pages** — one page, one question. If a page has grown a second subject, propose the split rather than performing it: deciding what partners should find where is an editorial call, not a cleanup.
- **Repetition that saves a click is good.** A short reference table or a one-line definition may appear on several pages. The eIDAS levels table is deliberately in three pages — sending a reader to a table-only page first would be exactly the linear dependency this principle rejects.
- **Long explanations have one home.** The _why_ — the 1500-word treatment of a subject — lives once, usually in `ressources/`, and other pages link to it. Repeat a fact, not an essay.
- **Never duplicate a fact that differs by audience.** `fournisseur-service/referentiel-IP.md` and `fournisseur-identite/referentiel-IP.md` are twins in structure but state different IP ranges and opposite traffic directions. Pages that look alike are not necessarily saying the same thing: check before you unify anything.
- **Be careful with third-party URLs.** The Grist configuration table appears in 7 pages, the démarches-simplifiées forms in 6. Nothing catches a missed edit when one of them moves, so prefer linking to the doc page that owns the subject rather than pasting the external URL again.

When unsure what belongs on a page, [Diátaxis](https://diataxis.fr/start-here/) is the tool: a page that explains _why_ and a page that lists _what_ serve different needs and may legitimately state the same fact. The error to avoid is a single page trying to do both at once.

### 5.3. Voice

- **All content is in French**, vouvoiement, DINUM tone: factual, direct, no marketing.
- Keep protocol vocabulary canonical: `client_id`, `scope`, `redirect_uri`, `acr`, OIDC, eIDAS, RIE.
- Never invent ProConnect behaviour. Claims come from the code, the upstream repositories, or a maintainer. If you cannot verify something, leave it out and flag the gap.

### 5.4. Mechanics enforced by the build

- Every `.md` and `.mdx` file under `src/pages` is a public route (`pageExtensions` in `next.config.mjs`), which is why doc pages live here — and why no other Markdown file belongs under `src/pages`.
- **Renaming a page changes its URL.** Most pages are not linked from outside the site, so renaming is usually fine — but **every internal link must follow**, and nothing in the build catches a dangling one. Whether the old URL needs a redirect in `next.config.mjs` is not knowable from the repository: ask the person and wait for their answer before adding one.
- Changing an `# H1` changes the title, the breadcrumb and the search result, and may break the assertions in `e2e/uuv/features/docs.feature`.
- Pages are plain `.md` at `src/pages/docs/<section>/<slug>.md`. Use `.mdx` **only** when the page needs React components (today: the two `index.mdx`).
- **No YAML frontmatter** — it is not parsed. The first line is a single `# H1`, which is both the page title and the search-index key (`scripts/generate-search-index.ts`).
- One `# H1`, then `##` / `###`. Long or sequential pages number their sections (`## 1. Titre`, then `### 1.1.`) — roughly 40% of pages do; follow the siblings of the page you edit.
- **Internal links are relative and keep the extension**: `[Rôles](./roles.md)`, `[Flux OIDC](../ressources/flux_oidc.md)`. `src/lib/remark-relative-links.mjs` rewrites them and **throws `Invalid link:` at build time** if the target escapes `src/pages`. A link to a file that does not exist does not fail the build — verify the path yourself.
- Alerts use GitHub syntax, rendered as DSFR callouts by `src/lib/remark-alerts.mjs`: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.
- Code fences must declare a language (Shiki highlights them).
- Images sit next to the page, are referenced relatively, and need alt text.
- Components available in `.mdx` only: `CallOut`, `VerticalStepper` / `Step`, `Quote` — see `src/mdx-components.tsx`.
- Emoji in headings are an established convention here; stay consistent with neighbouring pages.

## 6. Git, commits and pull requests

Follow the [ProConnect team guidelines](https://github.com/proconnect-gouv/federation/blob/main/CONTRIBUTING.md) for branches, commits and pull requests. Two things they do not cover, both specific to this repository:

- **CI must be green**: `build`, `lint`, `test`, `e2e-tests`. A bot also runs `prettier --write '**/*.{md,mdx}'` on pull requests and pushes a `💅 style(docs)` commit — pull before continuing after it fires.
- **Security issues** are never filed as public issues; see `SECURITY.md`.

## 7. Before you say it is done

1. `npm run lint` passes.
2. `npm run build` passes if you touched MDX, remark plugins, `next.config.mjs` or any doc page.
3. The change is visible in `npm run dev` for anything user-facing.
4. The diff contains only the files your task required.
5. You state plainly what you did **not** verify (e2e suite, production data, credentials).

## 8. Further reading

- `README.md` — how to run the project
- `docs/architecture.md` — components and authentication flow
- `CONTRIBUTING.md` — contribution process
