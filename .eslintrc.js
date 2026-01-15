module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  // Add the necessary extensions.
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  globals: {
    module: "readonly",
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "eslint.config.mjs"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": ["warn", { allow: ["error", "log"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
