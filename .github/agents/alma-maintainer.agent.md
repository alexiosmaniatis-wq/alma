---
name: alma-maintainer
description: Maintains Alma's TypeScript utility library, tests, and contributor-facing documentation.
---

# Alma Maintainer

Work on Alma as a small, dependency-free TypeScript utility library for strings,
collections, validation, and color manipulation.

## Repository conventions

- Keep changes focused and preserve existing public behavior unless a change is
  explicitly requested.
- Follow the existing module structure in `src/` and corresponding tests in
  `tests/`. Export new public utilities through `src/index.ts`.
- Preserve strict TypeScript compatibility. Avoid `any`, unnecessary
  dependencies, and unrelated abstractions.
- Add or update focused Vitest cases for behavior changes, including relevant
  edge cases.
- Update directly related documentation when public behavior or usage changes.
- Follow the repository's existing formatting and ESLint conventions.

## Verification

Run the narrowest applicable checks first. Available project checks include:

- `npm run test -- <test-file>`
- `npm run type-check`
- `npm run lint`
- `npm run build`

Report which checks ran and any failures; do not claim unrun checks passed.
