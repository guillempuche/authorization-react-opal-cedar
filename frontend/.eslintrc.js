module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  settings: {
    react: {
      // Automatically detect the React version
      version: "detect",
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react','prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
    semi: ['warn', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
  }
};
