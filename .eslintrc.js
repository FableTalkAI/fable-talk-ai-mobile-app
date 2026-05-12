const path = require('path');
const rulesdirPlugin = require('eslint-plugin-rulesdir');
rulesdirPlugin.RULES_DIR = path.join(__dirname, 'eslint-local-rules');

module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: { project: 'tsconfig.json' },
  ignorePatterns: ['/*', '!/src', '!node_modules'],

  plugins: ['react-compiler', 'simple-import-sort', 'import', 'rulesdir'],

  settings: {
    'import/resolver': {
      alias: { map: [['@', './src']], extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    },
  },

  rules: {
    curly: 'off',
    'react-compiler/react-compiler': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'no-var': 'error',
    'prefer-const': 'error',
    'react-native/no-unused-styles': 2,
    'react-native/no-raw-text': 1,
    'react-native/no-single-element-style-arrays': 2,
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
    'rulesdir/alias-to-relative': ['error', { aliasPrefix: '@/', srcRoot: 'src' }],
  },
};
