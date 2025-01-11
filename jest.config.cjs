module.exports = {
  setupFilesAfterEnv: ['./setupTests.js'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };