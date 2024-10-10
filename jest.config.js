/**
 * Jest configuration file for the Fitness Tracker MVP.
 *
 * This file defines the configuration options for Jest,
 * a JavaScript testing framework, to be used for unit testing
 * the components and utilities of the MVP.
 *
 * @see https://jestjs.io/docs/configuration
 */
module.exports = {
  // The root directory that Jest should search for tests.
  // This should typically be the root of your project.
  rootDir: '.',

  // The directory where Jest should output its coverage reports.
  // This is typically set to 'coverage'.
  coverageDirectory: 'coverage',

  // The test environment that Jest should use.
  // This is typically set to 'node' for server-side code
  // or 'jsdom' for browser-based code.
  testEnvironment: 'jsdom',

  // A list of paths to modules that Jest should mock.
  // This is useful for mocking external dependencies or
  // complex modules within the MVP.
  // Example:
  // moduleNameMapper: {
  //   '^.+\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  //   '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  // },
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // A list of paths to modules that Jest should ignore.
  // This can be used to exclude specific directories or
  // files from the testing process.
  // Example:
  // testPathIgnorePatterns: [
  //   '/node_modules/',
  //   '/dist/',
  //   '/build/',
  // ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/',
    '/cypress/',
    '/prisma/',
    '/public/',
  ],

  // The file extension for test files.
  // This is typically set to 'js' or 'jsx'.
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],

  // A list of paths to modules that Jest should transform.
  // This is used to configure transpilation or other
  // code transformations for different file types.
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest',
  },

  // The preset to be used for Jest configuration.
  // This can be a string or an object.
  // Example:
  // preset: 'ts-jest',
  preset: 'ts-jest',

  // A list of paths to modules that Jest should use
  // as setup files. These files are executed before
  // each test file.
  // Example:
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // The default timeout for tests in milliseconds.
  // This is typically set to 5000 (5 seconds).
  testTimeout: 10000,

  // Whether to collect coverage information from tests.
  // This is typically set to true.
  collectCoverage: true,

  // A list of globs to use when collecting coverage.
  // This can be used to specify the files to be
  // included in coverage reports.
  // Example:
  // collectCoverageFrom: ['src/**/*.+(ts|tsx|js)'],
  collectCoverageFrom: ['src/**/*.+(ts|tsx|js)'],

  // Whether to use the experimental `snapshotSerializers` option.
  // This allows you to use custom serializers for snapshot testing.
  // Example:
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  // snapshotSerializers: ['enzyme-to-json/serializer'],

  // This option allows you to customize the behavior of Jest
  // when running tests in a specific environment.
  // Example:
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.json',
  //   },
  // },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },

  // A list of paths to modules that Jest should use
  // as transformIgnorePatterns. These patterns are used
  // to specify which modules should not be transformed
  // by Jest.
  // Example:
  // transformIgnorePatterns: ['node_modules/(?!.*\\.(js|jsx|ts|tsx|mjs|cjs)$)'],
  // transformIgnorePatterns: ['node_modules/(?!.*\\.(js|jsx|ts|tsx|mjs|cjs)$)'],

  // A list of paths to modules that Jest should use
  // as watchPlugins. These plugins are used to
  // customize the behavior of Jest's watch mode.
  // Example:
  // watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  // watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};