const baseConfig = require('./default.js')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...baseConfig,
  extends: [
    ...baseConfig.extends,
    // https://github.com/yannickcr/eslint-plugin-react#recommended
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js#L119
    'plugin:react/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: [...baseConfig.plugins, 'react', 'react-hooks', 'jsx-a11y'],
  rules: {
    ...baseConfig.rules,
    'no-console': 'error',
    // react
    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-curly-brace-presence': ['error'],
    'react/jsx-handler-names': ['error'],
    'react/jsx-sort-props': [
      'error',
      { callbacksLast: true, shorthandFirst: true, reservedFirst: true },
    ],
    'react/jsx-no-literals': [
      'warn',
      {
        allowedStrings: ['-', '(', ')'],
        ignoreProps: true,
      },
    ],

    // react-hooks
    // https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
}
