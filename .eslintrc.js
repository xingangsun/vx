module.exports = {
    "root": true,

    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "globalReturn": true,
            "impliedStrict": true,
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },

    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": false
    },

    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "commonjs": true
    },

    "globals": {
        "window": true,
        "document": true,
        "process": true
    },

    "extends": "vue",
    "plugins": ["vue"],

    // add your custom rules here
    "rules": {
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,

        "indent": [2, 4, { "SwitchCase": 1 }]
    }
}
