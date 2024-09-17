/* eslint-disable filenames/match-regex */

/** @type {import('eslint').LinterConfig} */

const config = {
  extends: ['@waypoint/eslint-config/default.js'],
  root: true,
  parserOptions: {
    project: true,
  },
}

module.exports = config
