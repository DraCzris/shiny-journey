const baseConfig = require('./default.js')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...baseConfig,
  ignorePatterns: [...baseConfig.ignorePatterns, '**/resolver-types.ts'],
  rules: {
    ...baseConfig.rules,
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'object-shorthand': 'off',
  },
}
