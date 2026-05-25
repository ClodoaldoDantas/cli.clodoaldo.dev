# Agent Instructions - clodoaldo-dev-terminal

High-signal guidance for agents working on this repository.

## Stack & Commands
- **Framework:** Astro (React integration)
- **Styling:** Tailwind CSS v4 (theme defined in `src/styles/global.css`)
- **Package Manager:** `pnpm` (required, `pnpm-lock.yaml` present)
- **Dev Server:** `pnpm dev`
- **Build:** `pnpm build`
- **Formatting:** `pnpm format` (Prettier). Runs automatically via `lefthook` on pre-commit.

## Key Files & Directories
- `src/pages/index.astro`: Main entry point.
- `src/components/TerminalWindow.tsx`: Core React component for the terminal UI.
- `src/styles/global.css`: Tailwind v4 theme definitions and Dracula color palette.

## Conventions
- **UI/UX:** Uses Dracula color theme (e.g., `text-dracula-green`, `bg-dracula-bg`). Always check `global.css` for available theme variables.
- **Components:** React components in `src/components/` must be used with `client:load` (or appropriate directive) in Astro files if they require interactivity.
- **Formatting:** Adhere to Prettier config in `.prettierrc`. Run `pnpm format` before committing.

## Verification
- No automated test suite currently exists. 
- Verify changes by running `pnpm build` to check for compilation/type errors.
- For UI changes, use `pnpm dev` and inspect the browser.
