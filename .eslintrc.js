module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
  ],
  globals: {
    localStorage: true,
  },
  rules: {
    'simple-import-sort/sort': 1,
  },
};
