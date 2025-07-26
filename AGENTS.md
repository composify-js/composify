## Guidelines for Codex Agents

- When creating a new component, define styles in a [ComponentName].module.css file, and create a corresponding Storybook file named [ComponentName].stories.tsx.

- Strive to simplify APIs:
  - Use intuitive and self-explanatory names.
  - Minimize the number of exposed methods.
  - Keep the number of arguments as low as possible.

- Prioritize writing simple and performant code.

- Always refer to existing components to keep the codebase consistent and maintainable.

- Carefully match CSS styles to existing components for visual consistency.

- Always run project commands using `pnpm --filter [project] [command]` from the root directory. Do not use `npm run`.

## Before creating a pull request

1. Run `pnpm -r typecheck` and `pnpm -r lint` from the root directory to fix type and lint issues.

2. Run `pnpm -r test` to ensure all tests pass.

3. Run `pnpm -r build` to confirm that all packages build successfully.

If any of these steps fail, please resolve the issues before submitting the pull request.
