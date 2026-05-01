# Coding Rules

## General Rules

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

## Pre-Implementation requirements

- **Testing**: Always testing in browser the result of changes.
- **Refactoring**: Always check refactoring ability before offering changes. If code can be better - do it.

## Prohibitions

- No Options API (data, methods, etc.).
- Don't use external libraries if the task can be solved with Vue 3's core capabilities.
- Don't make components too long—suggest breaking them up.
