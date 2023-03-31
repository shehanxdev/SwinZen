module.exports = {
  root: true,
  ignorePatterns: ['!**/*', 'public', '.cache', 'node_modules'],
  extends: ['airbnb-typescript', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': ['off'], //NOTE::Turning on this option since it only will provides sync between eslint and prettier plugins. But it can cause some inconsistence sugestions.
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-loop-func': 'off'
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
