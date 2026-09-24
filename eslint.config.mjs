import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { files: ["src/**/*.{js,jsx}"] },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["src/components/About.jsx", "src/components/Contact.jsx"],
    // Retain legacy copy; literal apostrophes are an advisory, not a runtime bug.
    rules: { "react/no-unescaped-entities": "warn" },
  },
  {
    files: ["src/components/Footer.jsx"],
    // Preserve existing native /#home navigation and its scroll behavior.
    rules: { "@next/next/no-html-link-for-pages": "warn" },
  },
];

export default eslintConfig;
