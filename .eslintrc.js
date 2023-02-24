module.exports = {
  root: true,
  ignorePatterns: ['!**/*', 'public', '.cache', 'node_modules'],
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
