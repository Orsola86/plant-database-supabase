module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "google",
    "prettier",
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "eslint-plugin-simple-import-sort",
    "react-hooks",
    "tailwindcss",
    "jsx-a11y",
  ],
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      callees: ["classnames", "clsx"],
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "require-jsdoc": 0,
    "react/react-in-jsx-scope": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-custom-classname": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/alt-text": [
      0,
      {
        elements: ["img"],
        img: ["Image"],
      },
    ],
  },
};
