/** @type {import("@commitlint/types").UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // `content`: cambios de contenido clínico (requieren revisión clínica).
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "content",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
};

export default config;
