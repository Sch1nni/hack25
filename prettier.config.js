/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ['prettier-plugin-tailwindcss'],
    printWidth: 1000,
    useTabs: false,
    endOfLine: 'lf',
    semi: false,
    singleQuote: true,
    quoteProps: 'consistent',
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    vueIndentScriptAndStyle: true,
    singleAttributePerLine: true,
}

export default config
