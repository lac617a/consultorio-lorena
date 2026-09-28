import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Orden de imports: ver CLAUDE.md → "Estándares de código".
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
          // dot: true para que "@/.velite" (contenido generado) cuente como interno
          // aunque la carpeta aún no exista, como pasa en el CI antes de generar contenido.
          pathGroups: [{ pattern: "@/**", group: "internal", patternOptions: { dot: true } }],
          pathGroupsExcludedImportTypes: ["type"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../*"],
              message: "Usa el alias @/ en lugar de rutas relativas largas.",
            },
          ],
          paths: [
            {
              name: "framer-motion",
              message: "Usa el paquete `motion` (motion/react o motion/react-m).",
            },
          ],
        },
      ],
    },
  },
  // Debe ir al final: desactiva las reglas de estilo que chocan con Prettier.
  prettier,
  globalIgnores([".next/**", ".velite/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
