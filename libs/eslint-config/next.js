const reactConfig = require('./react.js')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...reactConfig,
  extends: [
    ...reactConfig.extends,
    // https://nextjs.org/docs/basic-features/eslint#eslint-plugin
    'plugin:@next/next/recommended',
  ],
  ignorePatterns: [
    ...reactConfig.ignorePatterns,
    '**/public/browser-check/*',
    '**/.next/**/*',
  ],
  rules: {
    ...reactConfig.rules,
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    ...reactConfig.overrides,
    {
      // disable filename rules for NextJS pages and apis (e.g. [[...slug]] would be failing)
      files: ['**/pages/**/*.tsx', '**/pages/api/**/*.ts'],
      rules: {
        'filenames/match-regex': ['off'],
      },
    },
    {
      files: ['*.gql'],
      rules: {
        'spaced-comment': 'off',
        // typescript rules don't work without typescript parser so switch them off
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/unified-signatures': 'off',
        // '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-redeclare': 'off',
      },
    },
  ],
}
