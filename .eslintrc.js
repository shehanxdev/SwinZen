module.exports = {
  root: true,
  ignorePatterns: ['!**/*', 'public', '.cache', 'node_modules'],
  extends: ['airbnb-typescript', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': ['off'], //NOTE::Turning on this option will provide sync between eslint and prettier plugins. But it can cause some inconsistence sugestions. So currently it's being turned off.
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
