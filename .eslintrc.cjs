/**
 * @file Sets up linting.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #eslint
 * - #linting
 * - #typescript
 * - #convention
 *
 * @todo
 * - [P4] Go through all ESLint options.
 */

/**
 * Configuration options for ESLint.
 * @type { import ( "eslint" ) .Linter.Config }
 */
const config = {
    parser: "@typescript-eslint/parser",
    parserOptions: { project: true },
    plugins: ["@typescript-eslint", "drizzle"],

    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended-type-checked", "plugin:@typescript-eslint/stylistic-type-checked"],

    rules: {
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "warn",

        "@typescript-eslint/consistent-type-imports": [
            "warn",

            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports"
            }
        ],

        //  Encourages the usage of types.

        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-inferrable-types": "off",

        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

        "@typescript-eslint/require-await": "off",

        "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],

        "comma-dangle": ["warn", "never"],
        quotes: ["warn", "double", { avoidEscape: true }],
        indent: ["warn", 4, { SwitchCase: 1 }],
        "max-len": ["warn", { code: 9999 }],

        //  Not compatible with Prettier.

        // "array-bracket-spacing": ["warn", "always"],
        // "space-in-parens": ["warn", "always"],
        // "space-before-function-paren": ["warn", "always"]
        // "lines-around-comment": ["warn", { beforeBlockComment: true }],

        "drizzle/enforce-update-with-where": [
            "error",
            {
                drizzleObjectName: ["db", "ctx.db"]
            }
        ],

        "import/no-anonymous-default-export": ["off"]
    }
}

module.exports = config
