// @ts-check

const restrictedGlobals = [
  {
    name: 'parseFloat',
    message: 'use #type-coercion -> Number(val)',
  },
  {
    name: 'parseInt',
    message: 'use #type-coercion -> Number(val)',
  },
  // {
  //   name: 'Array',
  //   message: 'use #array-constructor',
  // },
  {
    name: 'fdescribe',
    message: 'Do not commit fdescribe. Use describe instead.',
  },
]

const restrictedProperties = [
  {
    object: 'describe',
    property: 'only',
    message: `don't focus spec blocks`,
  },
  {
    object: 'it',
    property: 'only',
    message: `don't focus tests`,
  },
  {
    object: 'require',
    property: 'ensure',
    message:
      'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
  },
  {
    object: 'System',
    property: 'import',
    message:
      'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
  },
]

/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    // https://eslint.org/docs/rules/
    // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
    'eslint:recommended',
    // https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
    'standard',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
    'plugin:@typescript-eslint/recommended',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',
    // https://github.com/prettier/eslint-config-prettier
    'prettier',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: true,
  },

  reportUnusedDisableDirectives: true,
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': 'node',
  },
  plugins: ['@typescript-eslint', 'filenames', 'import', 'prettier'],
  ignorePatterns: [
    '**/schema/*',
    '**/generated-types.ts',
    '**/generated-types.tsx',
    '**/node_modules/**/*',
    '**/dist/**/*',
    '**/build/**/*',
    '**/dist-types/**/*',
    '**/.turbo/**/*',
  ],
  rules: {
    // eslint core
    'no-restricted-globals': ['error', ...restrictedGlobals],
    'no-restricted-properties': ['error', ...restrictedProperties],
    'no-param-reassign': ['error', { props: true }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-console': 'warn',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default', 'React'],
            message:
              'Please use named imports instead of the default (import React => import { ReactNode }).',
          },
          {
            name: 'react-router-dom',
            importNames: [
              'Match',
              'Link',
              'useNavigate',
              'navigate',
              'useMatch',
              'useLocation',
              'Redirect',
              'Routes',
            ],
            message: 'Use our wrapper components from `libs` folder',
          },
        ],
        patterns: [
          {
            group: ['apps/*'],
            message: 'Use relative paths instead',
          },
          {
            group: ['../../../'],
            message: 'Use absolute instead',
          },
          {
            group: ['@waypoint/utils/*'],
            message: 'Use @waypoint/utils root import instead',
          },
          {
            group: ['@waypoint/styles/*'],
            message: 'Use @waypoint/styles root import instead',
          },
          {
            group: ['@waypoint/theme/*'],
            message: 'Use @waypoint/theme root import instead',
          },
        ],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
      },
    ],
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    'dot-notation': 'error',
    'prefer-regex-literals': ['off'],
    'arrow-body-style': ['error', 'as-needed'],
    'object-shorthand': ['error', 'properties'],

    // typescript
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        // Allow type assertion in call and new expression
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    // '@typescript-eslint/strict-boolean-expressions': 'error',

    // TypeScript rules extending core eslint rules
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        variables: false,
        functions: false,
        typedefs: true,
        ignoreTypeReferences: true,
      },
    ],
    'no-magic-numbers': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    camelcase: 'off',
    // standard
    curly: ['error', 'all'],
    // NOTE:
    // we don't use this rule at all but standard config has turned this on!
    // ( 7142.559 ms | 58.4% of eslint execution )
    'import/export': 'off',

    // filenames
    // https://github.com/selaux/eslint-plugin-filenames
    'filenames/match-regex': [
      'error',
      // allow only kebab-case, enum of suffixes, non endings with `-` -> (thats negative lookbehind `(?<!-)`)
      '^_?[?[a-z0-9-]*]?(?<!-)([.](test|spec|cy|mock|styles|hook|provider|context|hoc|helpers|config|module|stories|d))*$',
    ],

    // import
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/no-amd': 'error',
    // NOTE 🚨:
    // This rule is a perf hell
    // ( 87534.087ms | 95% of eslint execution )
    // 'import/no-deprecated': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@waypoint/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '{console-ui,tenant-admin}/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/newline-after-import': 'error',
    'spaced-comment': [
      'error',
      'always',
      { exceptions: ['i18n'], markers: ['/'] },
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    // prettier
    // NOTE 🚨:
    // We cannot use this with eslint pipeline as it's very slow
    // prettier/prettier |   170.074 |    77.9%
    // 'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.story.tsx',
        '**/custom-types/**/*d.ts',
        '**/storybook/**',
      ],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/consistent-type-definitions': 'off',
        'react/jsx-no-literals': 'off',
        '@next/next/no-img-element': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
    {
      files: ['**/*.styles.*'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/order': 'off',
        'import/newline-after-import': 'off',
        'import/no-duplicates': 'off',
      },
    },
    {
      files: ['browser-test.js', 'public/locale/*'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
      },
    },
  ],
}

module.exports = config
