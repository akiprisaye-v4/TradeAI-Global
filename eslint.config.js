import react from "eslint-plugin-react";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "legacy/**",
      "backup-*/**"
    ]
  },

  {
    files: ["src/**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",

        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {}
  }
];
