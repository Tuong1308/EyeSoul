/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  testRegex: 'test/.*\\.e2e-spec\\.ts$',
  transform: { '^.+\.ts$': 'ts-jest' },
  setupFiles: ['<rootDir>/test/load-test-env.ts'],
  globalSetup: '<rootDir>/test/global-setup.ts',
};
