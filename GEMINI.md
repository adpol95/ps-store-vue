# Project Overview

`ps-store-vue` is a Vue 3 application built with TypeScript and Vite, following the **Feature-Sliced Design (FSD)** architectural methodology.

**Working Model:**

- **User (Director):** Provides architectural direction, clarifies legacy logic, and approves plans.
- **Gemini CLI (Actor):** Responsible for implementation, research, and ensuring adherence to FSD and modern standards.

**Primary Goal:**
Rewrite the legacy `ps-store-fr` (frontend) and `ps-store-bck` (backend) projects into this modern architecture. The focus is on migrating features while upgrading them to use current best practices, types, and the FSD structure.

## Tech Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Pinia
- **Server State:** TanStack Query (Vue Query)
- **Routing:** Vue Router
- **HTTP Client:** Axios
- **Styling:** Sass (SCSS)
- **Validation:** Zod
- **Testing:** Vitest
- **Linting/Formatting:** ESLint, Prettier

## Before offer changes

- **Testing**: Always testing in browser the result of changes.
- **Refactoring**: Always check refactoring ability before offering changes. If code can be better - do it.

# Coding Rules

- Write only in TypeScript. Avoid using `any`.
- Use `ref()` instead of `reactive()` for basic and complex states.
- All components must have prop typing via `defineProps<{...}>()`.
- Move complex logic to Composables (similar to hooks in React).
- Component file names must be PascalCase (e.g., MyComponent.vue).
- Follow a strict FSD architecture.
- **Composition API:** Always use `<script setup>` with TypeScript.
- **Path Aliases:**
    - `@/` points to `src/`.
    - Absolute imports are configured for `app/`, `entities/`, `features/`, `pages/`, `shared/`, `widgets/` via `tsconfig.json`.
- **FSD Enforcement:** Adhere to FSD layers. Avoid cross-imports within the same layer (e.g., a feature importing another feature). Use `shared/api` for global API configuration.

# Prohibitions

- No Options API (data, methods, etc.).
- Don't use external libraries if the task can be solved with Vue 3's core capabilities.
- Don't make components too long—suggest breaking them up.

## Architecture (FSD)

The project is structured according to Feature-Sliced Design:

- `src/app`: Application-wide setup (providers, styles, entry point).
- `src/pages`: Full pages composed of widgets and features.
- `src/widgets`: Complex UI components (e.g., Header, ProductList).
- `src/features`: User interactions with business value (e.g., AddToCart, Login).
- `src/entities`: Business entities (e.g., Product, Cart, User).
- `src/shared`: Reusable infrastructure (API, UI components, config, libs).
    - **UI Library:** Includes `Button`, `Input`, `Checkbox`, `Select`, `Badge`, `Skeleton`, `Card`, `Spinner`, `Modal`.

# Building and Running

## Key Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Locally previews the production build.
- `npm run typecheck`: Runs TypeScript type checking.
- `npm run test:unit`: Executes unit tests with Vitest.
- `npm run lint`: Runs ESLint for code quality.
- `npm run format`: Checks code formatting with Prettier.

# Development Conventions

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for the Axios instance (defaults to `/api`).

## Testing Practices

- Use `vitest` for unit testing.
- New features should ideally include a `smoke.test.ts` or specific unit tests.
- Keep tests close to the implementation (e.g., in the same directory or a `__tests__` folder within the slice).

## Git Workflow

- **Pre-commit Hooks:** Husky and lint-staged are used to run ESLint and Prettier before commits.
- **Divided commits:** Always create multiple and divided commits by areas of responsibility of the written code.
- **Commit Messages:** Follow a clear and concise format.
