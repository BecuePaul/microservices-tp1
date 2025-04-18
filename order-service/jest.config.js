module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'models/**/*.js',
    'routes/**/*.js',
    'server.js'
  ],
  coverageReporters: ['text', 'lcov'],
  testTimeout: 10000
};
