/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    arrowParens: "avoid",
    printWidth: 9999,
    semi: false,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "none"
}

export default config
