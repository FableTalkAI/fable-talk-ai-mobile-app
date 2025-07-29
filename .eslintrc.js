module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: { project: 'tsconfig.json' },
  ignorePatterns: ['/*', '!/src', '!node_modules'],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'no-var': 'error',
    'prefer-const': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        name: 'react-redux',
        importNames: ['useDispatch'],
        message: 'Use typed hook useAppDispatch instead.',
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
  },
};
