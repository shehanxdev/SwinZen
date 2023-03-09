module.exports = {
  displayName: 'swingzen',
  preset: '@testing-library/react-native',
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: ['<rootDir>/src/config/test.config.ts'],
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleNameMapper: {
    '^@sz/config(.*)$': '<rootDir>/src/config$1',
    '^@sz/constants(.*)$': '<rootDir>/src/constants$1',
    '^@sz/routes(.*)$': '<rootDir>/src/routes$1',
    '^@sz/screens(.*)$': '<rootDir>/src/screens$1',
    '^@sz/services(.*)$': '<rootDir>/src/services$1',
    '^@sz/stores(.*)$': '<rootDir>/src/stores$1',
    '^@sz/utils(.*)$': '<rootDir>/src/utils$1',
  },
  transform: {
    '/node_modules/.+\\.(js|ts|tsx)$': './react-native-jest-preprocessor.js',
    '\\.(js|ts|tsx)$': './react-native-jest-preprocessor.js',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve('react-native/jest/assetFileTransformer.js'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
};
