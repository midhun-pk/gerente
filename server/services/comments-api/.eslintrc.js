module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        mongo: true,
        mocha: true
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "linebreak-style": [ "error", "windows" ],
        quotes: [ "error", "single" ],
        semi: [ "error", "always" ],
        "array-bracket-spacing": [ "error", "always" ],
        "object-curly-spacing": [ "error", "always" ],
    }
};