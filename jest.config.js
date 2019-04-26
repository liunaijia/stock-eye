module.exports = {
  setupFiles: [
    '<rootDir>/src/testShim.js',
    '<rootDir>/src/testSetup.js',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};
