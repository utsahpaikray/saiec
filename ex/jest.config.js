const presets = require('jest-preset-angular/presets')
const tsJest = require('ts-jest')
const tsconfig = require('./tsconfig.json')

module.exports = {
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      Object.assign({}, presets.defaultTransformerOptions, {
        tsconfig: '<rootDir>/tsconfig.jest.json'
      })
    ]
  },
  verbose: true,
  bail: 1,
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  coveragePathIgnorePatterns: [
    '.actions.ts',
    '.effects.ts',
    '-gen.ts',
    'cms-types.ts',
    'types.ts',
    '.mock.ts',
    'jest.helpers.ts'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs|@vanderlande-gravity|@lit|lit)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
    '<rootDir>/features/'
  ],
  reporters: ['default', 'jest-junit'],
  moduleNameMapper: tsJest.pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths,
    {
      prefix: '<rootDir>/'
    }
  ),
  testEnvironment: 'jsdom',
  testRegex: ['(/__tests__/.*|(\\.|/)(spec.jest))\\.[jt]sx?$']
}
