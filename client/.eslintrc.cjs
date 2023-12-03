module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-unused-vars": "off",
    semi: ["error", "always"],
    "no-trailing-spaces": "error",
    "keyword-spacing": ["error", { before: true, after: true }],
    "space-before-blocks": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
