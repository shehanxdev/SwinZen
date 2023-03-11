module.exports = {
  root: true,
  ignorePatterns: ['!**/*', 'public', '.cache', 'node_modules'],
  extends: ['airbnb-typescript', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/lines-between-class-members': 'off'
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
