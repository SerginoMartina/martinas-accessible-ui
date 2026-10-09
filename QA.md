# Repository QA review

## Summary

The project has a strong accessibility-focused foundation: strict TypeScript, semantic native controls where practical, component-level regression tests, detailed usage notes, Storybook's accessibility addon, and explicit boundaries around CAPTCHA and authentication integrations. It is a useful senior-project demonstration, but it should not yet be presented as a production-ready, publishable component package or as WCAG-conformant.

## Validation performed

| Check | Result |
|---|---|
| `pnpm typecheck` | Passed |
| `pnpm test` | Passed: 19 files, 103 tests |
| `pnpm test:e2e` | Passed: Chromium dashboard/progress smoke test |
| `pnpm build` | Passed |
| `pnpm build-storybook` | Passed, with bundle-size and Node deprecation warnings |
| Workspace diagnostics on changed source/config/test files | No errors reported |
| Browser check | Dashboard sidebar loaded; progress advanced from 35% to 45% and updated its status announcement |

The first Playwright run exposed missing runner/browser setup; the runner dependency, isolated test directory, Vitest exclusion, smoke test, and local Chromium installation are now in place. Run `pnpm exec playwright install chromium` once on a new machine before `pnpm test:e2e`.

## Strengths observed

- Native HTML controls and fieldset/legend grouping are used for choice and range inputs.
- The newly added hover card describes its actual focusable trigger; context-menu navigation skips disabled items.
- Component tests cover labels, state, focus restoration, error descriptions, and keyboard interactions across many patterns.
- CAPTCHA and login are documented as consumer/provider integrations, not as fake verification or a built-in authentication backend.
- The accessibility guide explicitly says the project has not undergone a formal WCAG conformance audit.
- A public source export barrel exists at [`src/index.ts`](./src/index.ts), and the dashboard and Storybook both build.

## Prioritized improvements

### High priority

1. **Complete dark-theme coverage.** `ThemeProvider` changes document theme tokens, but a source scan still finds 96 fixed slate/white color utility uses across 32 component files. Many controls will therefore retain light surfaces/text in dark mode. Replace fixed colors with semantic tokens where the component is expected to theme, document intentional exceptions, and add light/dark visual and contrast checks. See [`src/index.css`](./src/index.css), [`src/components/atoms/FoundationPrimitives.tsx`](./src/components/atoms/FoundationPrimitives.tsx), and [`src/components/molecules/InteractionPrimitives.tsx`](./src/components/molecules/InteractionPrimitives.tsx).
2. **Use measured context-menu placement.** The menu currently clamps its position using assumed `220 × 180` dimensions. A large menu, small viewport, or high zoom can still place content off-screen. Measure the rendered menu and clamp it to the viewport; add tests for narrow viewports, long menus, and keyboard invocation near screen edges. See [`src/components/molecules/InteractionPrimitives.tsx`](./src/components/molecules/InteractionPrimitives.tsx).
3. **Add CI and a repeatable accessibility gate.** No repository workflow files were found. Add CI that uses the lockfile (`pnpm install --frozen-lockfile`) and runs typecheck, unit tests, app build, Storybook build, and the browser smoke suite. The Storybook axe addon is useful, but it does not replace automated checks of representative rendered states or manual keyboard and screen-reader testing. Keep the current non-conformance disclaimer until those checks have been completed.

### Medium priority

4. **Split the dashboard catalogue from its presentation.** [`src/docs/ComponentGallery.tsx`](./src/docs/ComponentGallery.tsx) is 1,497 lines and currently combines component metadata, explanatory copy, previews, and sidebar/dashboard rendering. Move the typed catalogue and preview renderers into smaller modules so missing docs/previews are easier to detect and the dashboard remains reviewable as the library grows.
5. **Finish package/release metadata before publishing.** [`package.json`](./package.json) has an empty description, generic author/license metadata, and `main: "index.js"` but no package `exports`, type declarations, or library build output. [`README.md`](./README.md) correctly describes this as an application/demo today. If npm distribution is a goal, add a library build, declaration output, explicit entry points, package file allowlist, and accurate ownership/license metadata first.
6. **Resolve the Vite config-module warning.** `pnpm test` warns that ESM syntax in `vitest.config.ts` is being loaded from a CommonJS package and that Vite's native config loader will not support that combination by default. Align the config extension/module mode with the package and verify Vitest, Vite, and Storybook after the change.
7. **Typecheck test/config TypeScript too.** [`tsconfig.json`](./tsconfig.json) includes only `src`, so the new Playwright test and root configuration files are executed/loaded without being covered by `pnpm typecheck`. Add a dedicated test/config TypeScript project or extend the typecheck script to validate those files as well.

### Lower priority

8. **Reduce Storybook's largest chunks if startup/download cost matters.** The build succeeds, but Vite warns about chunks above 500 kB; the generated iframe bundle is about 1.14 MB before gzip, and axe/docs renderer assets are also substantial. Consider splitting documentation-heavy stories and loading large helpers only where needed; do not suppress the warning without measuring the result.
9. **Expand browser coverage selectively.** The new Playwright suite is intentionally a smoke test for the homepage and progress interaction. Add focused browser scenarios for modal/popover focus, context-menu edge placement, theme behavior, reduced motion, and at least one non-Chromium engine when browser support requirements are known.
10. **Add lint and formatting checks.** There is no lint or format script/configuration in the package manifest. Introduce a consistent formatter/linter and run it in CI once the team agrees on the rules; the current strict typecheck catches type errors but not all maintainability or style issues.

## Scope and limitations

This review checked project structure, package/configuration, documentation, component patterns, test setup, build output, and the new dashboard flow. It did not perform a formal WCAG audit, a complete manual review of all 74 dashboard entries, exhaustive browser/assistive-technology testing, dependency vulnerability triage, or a production CAPTCHA/authentication review. Color contrast and theme behavior should be checked in a real browser with representative component states before claiming conformance.
