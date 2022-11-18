module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:n/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['sonarjs', 'n'],
  rules: {},
}
