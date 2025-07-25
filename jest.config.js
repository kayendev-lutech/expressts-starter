module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@module/(.*)$': '<rootDir>/src/module/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@errors/(.*)$': '<rootDir>/src/errors/$1',
    '^@logger/(.*)$': '<rootDir>/src/logger/$1',
  },
};