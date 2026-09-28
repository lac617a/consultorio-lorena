/** @type {import("lint-staged").Configuration} */
const config = {
  "*.{ts,tsx,js,mjs,cjs}": ["eslint --fix --max-warnings=0", "prettier --write"],
  "*.{md,mdx,json,css,yml,yaml}": ["prettier --write"],
};

export default config;
