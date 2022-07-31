module.exports = {
  "*.{js,jsx,ts,tsx}": "eslint",
  "*.{ts,tsx}": () => "tsc -p tsconfig.json --noEmit --skipLibCheck",
};
