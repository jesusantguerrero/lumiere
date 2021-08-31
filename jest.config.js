// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
    'jsx',
    'node'
  ],
  transformIgnorePatterns: ['/node-modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  }
}