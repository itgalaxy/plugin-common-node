module.exports = {
  root: true,
  extends: ["@webpack-contrib/eslint-config-webpack", "prettier"],
  env: {
    browser: false,
    node: true,
  },
  rules: {
    "import/no-extraneous-dependencies": "off",
    "no-alert": "off",
    "no-console": "off",
    "func-names": "off",
  },
};
