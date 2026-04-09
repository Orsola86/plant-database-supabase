module.exports = {
  root: true,
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
    "prettier",
  ],
  plugins: ["@typescript-eslint", "tailwindcss", "jsx-a11y"],
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      callees: ["classnames", "clsx"],
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-custom-classname": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};
