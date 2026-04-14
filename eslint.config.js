import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import vue from "eslint-plugin-vue";
import vuejsAccessibility from "eslint-plugin-vuejs-accessibility";
import globals from "globals";
import vueParser from "vue-eslint-parser";

const vueA11yRecommended =
    vuejsAccessibility.configs?.["flat/recommended"] ??
    vuejsAccessibility.configs?.recommended;

export default [
    {
        // Глобальное игнорирование
        ignores: ["dist/**", "node_modules/**", "coverage/**", "public/**", "build/**"]
    },
    js.configs.recommended,
    ...vue.configs["flat/recommended"],
    {
        files: ["**/*.{ts,tsx,vue,js,jsx,mjs,cjs}"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: "latest",
                sourceType: "module",
                extraFileExtensions: [".vue"]
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            "prettier": prettierPlugin,
            "simple-import-sort": simpleImportSort,
            "boundaries": boundaries,
            "vuejs-accessibility": vuejsAccessibility
        },
        settings: {
            "boundaries/include": ["src/**/*"],
            "boundaries/alias": {
                "@": "./src",
                "app": "./src/app",
                "pages": "./src/pages",
                "widgets": "./src/widgets",
                "features": "./src/features",
                "entities": "./src/entities",
                "shared": "./src/shared"
            },
            "boundaries/elements": [
                { type: "shared", pattern: "shared/**" },
                { type: "entities", pattern: "entities/**" },
                { type: "features", pattern: "features/**" },
                { type: "widgets", pattern: "widgets/**" },
                { type: "pages", pattern: "pages/**" },
                { type: "app", pattern: "app/**" }
            ]
        },
        rules: {
            ...(boundaries.configs?.recommended?.rules ?? {}),
            // Интеграция Prettier (подсвечивает ошибки форматирования)
            "prettier/prettier": "error",

            "no-console": ["error", { allow: ["warn", "error"] }],
            "prefer-const": ["error", { destructuring: "all" }],
            "no-return-await": "error",
            "no-useless-call": "error",
            "prefer-promise-reject-errors": "error",

            // TypeScript специфичные правила
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
            ],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { fixStyle: "separate-type-imports" }
            ],
            "@typescript-eslint/no-redeclare": [
                "error",
                { ignoreDeclarationMerge: true }
            ],
            "no-redeclare": "off", // Отключаем базовый, чтобы работал TS-вариант

            // Vue специфичные настройки
            "vue/multi-word-component-names": "off",
            "vue/define-macros-order": [
                "error",
                {
                    order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"]
                }
            ],
            "vue/block-order": [
                "error",
                {
                    order: ["script", "template", "style"]
                }
            ],

            // Автоматическая сортировка импортов
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        // Side effect imports.
                        ["^\\u0000"],
                        // Vue first, then other packages.
                        ["^vue$", "^vue/", "^@?\\w"],
                        // Aliases.
                        ["^@/", "^(app|pages|widgets|features|entities|shared)(/|$)"],
                        // Relative imports.
                        ["^\\./", "^\\.\\./"]
                    ]
                }
            ],
            "simple-import-sort/exports": "error",

            // Границы слоёв (FSD)
            "boundaries/dependencies": [
                "error",
                {
                    default: "disallow",
                    // Добавляем сообщение об ошибке для ясности
                    message:
                        "{{ file.type }} is not allowed to import {{ dependency.type }}. Use public API instead.",
                    rules: [
                        {
                            from: { type: "shared" },
                            allow: {
                                to: { type: "shared" }
                                // Для shared часто разрешают более глубокие импорты,
                                // но если хотите строгости, можно ограничить и тут
                            }
                        },
                        {
                            from: { type: "entities" },
                            allow: {
                                to: [{ type: "entities" }, { type: "shared" }]
                            }
                        },
                        {
                            from: { type: "features" },
                            allow: {
                                to: [
                                    { type: "features" },
                                    { type: "entities" },
                                    { type: "shared" }
                                ]
                            }
                        },
                        {
                            from: { type: "widgets" },
                            allow: {
                                to: [
                                    { type: "widgets" },
                                    { type: "features" },
                                    { type: "entities" },
                                    { type: "shared" }
                                ]
                            }
                        },
                        {
                            from: { type: "pages" },
                            allow: {
                                to: [
                                    { type: "pages" },
                                    { type: "widgets" },
                                    { type: "features" },
                                    { type: "entities" },
                                    { type: "shared" }
                                ]
                            }
                        },
                        {
                            from: { type: "app" },
                            allow: {
                                to: [
                                    { type: "app" },
                                    { type: "pages" },
                                    { type: "widgets" },
                                    { type: "features" },
                                    { type: "entities" },
                                    { type: "shared" }
                                ]
                            }
                        }
                    ]
                }
            ],

            // Отключаем curly
            "curly": "off"
        }
    },
    ...(Array.isArray(vueA11yRecommended)
        ? vueA11yRecommended
        : vueA11yRecommended
          ? [vueA11yRecommended]
          : []),
    // Всегда последний, чтобы отключить конфликтующие правила оформления
    prettierConfig
];
