import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  
  // Add browser globals
  {
    languageOptions: {
      globals: {
        ...globals.browser,  // This fixes console, document, alert errors
        ...globals.node,     // For Node.js globals if needed
      },
    },
  },
  
  // Custom rules
  {
    rules: {
      'react/no-unescaped-entities': 'off', // Turn off the quotes rule
      'no-unused-vars': 'warn',             // Make unused vars a warning instead of error
    }
  }
];

export default eslintConfig;