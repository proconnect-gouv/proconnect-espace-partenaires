# AGENTS.md — End-to-end tests

This file exists so that agent rules specific to `e2e/` have an obvious home. Agents read the nearest `AGENTS.md` to the file they are editing, so anything written here applies to the end-to-end tests (UUV + Playwright) without polluting the rules for the rest of the repository.

**It is intentionally empty for now.** Nobody has written down the conventions for these tests yet, and a guess would be worse than a gap: agents treat whatever is here as authoritative.

Until it is filled, the repository-wide rules in [`../AGENTS.md`](../AGENTS.md) apply, and anyone working in `e2e/` should read the existing feature files and [`README.md`](README.md) first.

If you maintain these tests, this is the place for: how to install and run the suite, how to write a scenario, what must never be done (pointing a test at a real environment, for instance), and how to read a failure.
