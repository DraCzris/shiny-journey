/* eslint-disable filenames/match-regex */

/** @type {import('eslint').LinterConfig} */

const config = {
  extends: ['@waypoint/eslint-config/next.js'],
  root: true,
  parserOptions: {
    project: true,
  },
  rules: {
    'react/jsx-no-literals': 'off',
  },
}

module.exports = config
