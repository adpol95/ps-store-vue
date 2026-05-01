# ps-store-vue Instructions

This file serves as the main entry point for Gemini CLI instructions. It imports specific documentation from the `docs/` directory to maintain a clean and modular structure.

---

## <!-- import ./docs/project-overview.md -->

## <!-- import ./docs/tech-stack.md -->

## <!-- import ./docs/architecture.md -->

## <!-- import ./docs/coding-rules.md -->

## <!-- import ./docs/git-workflow.md -->

# Reference of target project (Legacy)

- There is two repository, they located on the same level of current project folder entry (ps-store-vue).
- Frontend: ps-store-fr
- Backend: ps-store-bck

# Building and Running

## Key Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Locally previews the production build.
- `npm run typecheck`: Runs TypeScript type checking.
- `npm run test:unit`: Executes unit tests with Vitest.
- `npm run lint`: Runs ESLint for code quality.
- `npm run format`: Checks code formatting with Prettier.

# Environment Variables

- `VITE_API_BASE_URL`: Base URL for the Axios instance (defaults to `/api`).

# Testing Practices

- Use `vitest` for unit testing.
- New features should ideally include a `smoke.test.ts` or specific unit tests.
- Keep tests close to the implementation (e.g., in the same directory or a `__tests__` folder within the slice).
