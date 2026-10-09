# Martina's Accessible UI

A React UI component library with accessibility-minded components, Storybook documentation, and Vitest tests.

## 🚀 Features

- **Accessibility-minded:** Semantic markup, keyboard support, and accessible state are built into components. A formal WCAG conformance audit has not been performed.
- **Interaction patterns:** Sortable, filterable and resizable data tables; keyboard-operable tabs; searchable selection; date ranges; file validation and per-file upload progress.
- **Accessible form patterns:** Reusable fields that connect labels, hints, and validation messages, plus a focusable error summary with links to affected fields.
- **Accessible navigation and feedback:** Native radio groups, editable combobox suggestions, skip links, action menus, inline alerts, and live announcements.
- **Design-system primitives:** Theme context and controls, responsive layout helpers, aspect ratios, cards, semantic quotations and code, links with icons, icon buttons, separators, and loading indicators.
- **Page layout patterns:** In-flow and fixed headers, site and popup sidebars, simple/column/minimal footers, and accessible content blocks.
- **Accessible interaction patterns:** Text areas, card choices, switches, range sliders, segmented native radio controls, popovers, hover cards, scroll regions, carousels, context menus, and definition lists.
- **Workflows and localization hooks:** A validated multi-step form and progress stepper, breadcrumbs, a keyboard-operated tree and command palette, avatars, and a locale selector that leaves translations to the consuming app.
- **Content patterns:** Page heroes, semantic ordered and unordered lists, article layouts, labelled navigation link lists, icon-supported feature lists, and call-to-action banners.
- **Accessible media and sign-in patterns:** Images with alternative text/captions, native video and audio players with transcript/caption support, media-and-text layouts, a provider integration slot for CAPTCHA (not a fake challenge), and a labelled login form.
- **Testable:** Component tests use Vitest and Testing Library.
- **Storybook Documentation:** Interactive overview and stories for the library components.
- **Scalable Architecture:** Atomic Design principles for modularity.

## 🛠 Tech Stack

- **Framework:** React (TypeScript)
- **Styling:** Tailwind CSS
- **Testing:** Vitest and Testing Library
- **Documentation:** Storybook

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/martinas-accessible-ui.git

# Install dependencies
pnpm install
```

## 🧪 Running Tests

```bash
# Run component tests
pnpm test

# Run the Chromium dashboard smoke test (install the browser once with `pnpm exec playwright install chromium`)
pnpm test:e2e

# Type-check the project
pnpm typecheck

# Build the application
pnpm build
```

## 📖 Documentation & A11y

- **Component dashboard:** `pnpm dev` opens the documentation dashboard as the application homepage. Use the sidebar to browse each component's purpose, variants, API, keyboard behavior, accessibility guidance, and interactive preview.
- **Storybook overview and component stories:** `pnpm storybook` (open the **Overview** story)
- **Build Storybook:** `pnpm build-storybook`
- **Public component API:** Import supported components from `src/index.ts`; the repository is currently an application/demo rather than a configured publishable npm package.
- **Accessibility Audit:** [A11y.md](<A11y.md>)

## 🏗 Project Structure

- `.storybook`: Storybook configuration and preview setup.
- `stories`: Storybook source stories, grouped by component layer and separate from application source.
- `storybook-static`: Generated output from `pnpm build-storybook`; ignored by Git and should not be edited manually.
- `src/components/atoms`: Base controls, foundation/theme/layout primitives, avatars, loading skeletons, skip links, and live regions.
- `src/components/molecules`: Selection, overlays, navigation, disclosure, feedback, workflow, locale, tooltip, date-range, pagination, form, and upload controls.
- `src/components/organisms`: Complex data, dialog, accessible content and media patterns, authentication integrations, and complete form/workflow examples.
- `src/docs`: Interactive component dashboard and its documentation.
- `src/theme`: Design tokens and styles.
- `QA.md`: Repository QA findings, validation results, and prioritized follow-up work.
