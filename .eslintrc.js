module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  globals: {
    __PATH_PREFIX__: true,
    __PREFIX_PATHS__: true,
    rootPath: true
  },
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off'
  }
}
