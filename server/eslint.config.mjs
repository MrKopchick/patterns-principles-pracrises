import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,

      "@typescript-eslint/explicit-function-return-type": ["error"],
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/no-empty-function": ["error"],

      "no-fallthrough": "error",
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
  {
    ...prettier,
    files: ["**/*.ts"],
  },
];
