module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "keyword-spacing": ["error", { before: true, after: true }],
    quotes: "off",
    "import/no-unresolved": 0,
    indent: "off",
    "no-tabs": "off",
    "object-curly-spacing": "off",
    "linebreak-style": 0,
    "max-len": ["warn", { code: 200 }],
    camelcase: ["warn", { ignoreDestructuring: true, properties: "never" }],
    "operator-linebreak": "off",
    semi: 2,
  },
};
