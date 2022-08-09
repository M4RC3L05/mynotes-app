module.exports = {
  "*.{js,jsx,ts,tsx,mjs}": "eslint",
  "*.{ts,tsx}": () => "tsc -p tsconfig.json --noEmit --skipLibCheck",
};
