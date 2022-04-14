module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
    plugins: [],
    // add your custom rules here
    rules: {
        'no-tabs': 'off',
        'comma-dangle': ['error', 'never'],
        indent: ['error', 4, {}],
        'vue/html-indent': ['warn', 4],
        'no-duplicate-imports': 'error',
        'no-multi-spaces': ['error'],
        'no-unused-vars': ['warn'],
        'vue/no-unused-vars': ['warn'],
        'vue/no-duplicate-attributes': ['error']
    }
};
