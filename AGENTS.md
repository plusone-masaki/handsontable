# Repository Guidelines

## Project Structure & Module Organization
`src/` hosts the spreadsheet core, plugins, and the `3rdparty/walkontable` engine; keep features modular (component logic in `src/`, UI helpers in `src/helpers/`, localized strings under `languages/`). Build artifacts land in `dist/`, while `commonjs/` and `es/` are produced bundles that should never be edited manually. Tests live in `test/` (`test/unit`, `test/e2e`, `test/helpers`, `test/types`), and shared build settings sit in `hot.config.js`, `babel.config.js`, and `webpack.config.js`.

## Build, Test, and Development Commands
- `npm run watch` – rebuilds the UMD bundle on file changes for local development.
- `npm run build` – produces CommonJS, ES, UMD, minified UMD, and language bundles; run before publishing.
- `npm run lint` – eslint (Airbnb base) across `src/` and `test/`.
- `npm run test` – full suite: lint, Jest unit, TS types, Walkontable, e2e, and production smoke.
- `npm run test:unit` / `test:e2e` / `test:walkontable` – targeted suites when iterating quickly.
- `npm run test:types` – validates the public `handsontable.d.ts` against `test/types`.

## Coding Style & Naming Conventions
Follow the enforced ESLint config (2-space indentation, single quotes, dangling commas, no unused vars). Prefer ES modules, avoid default exports for utilities, and keep side effects inside plugin entry points. Name files using `CamelCase` for classes/components and `kebab-case` for helpers; Jest specs end in `.spec.js` or `.unit.js`. Update `handsontable.d.ts` and related JSDoc whenever public APIs change.

## Testing Guidelines
Unit tests rely on Jest with helpers from `test/unit` and bootstrap setup in `test/bootstrap.js`; align new specs with existing `describe` patterns. DOM- and integration-heavy features need Puppeteer-backed e2e specs under `test/e2e`, generated via `npm run test:e2e.dump` before running `test:e2e.puppeteer`. Walkontable has its own runner in `src/3rdparty/walkontable/test`. Add or adjust type tests in `test/types` whenever you extend TypeScript definitions. Aim to touch both unit and e2e layers for user-facing changes and document the commands you ran in the PR.

## Commit & Pull Request Guidelines
Commits should be concise, present-tense statements (e.g., `Fix column resizing regression`) and, when relevant, mention the issue or PR number (`(#5655)`). Multi-step changes belong in separate commits to ease backporting. Pull requests need: a clear summary, testing notes (`npm run test:unit`, etc.), linked issues, and UI screenshots or screencasts for visual tweaks. Keep PRs focused on a single feature or fix, and request review only after the CI-equivalent command set passes locally.
