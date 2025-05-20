// eslint.config.js
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/out/**',
      '**/public/**',
      '**/coverage/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslintParser, // Указываем parser ЯВНО
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
      '@typescript-eslint': tseslintPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      // Кодстайл
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],

      // Импорты: порядок
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '**/*.module.css',
              group: 'index',
              position: 'after',
            },
            {
              pattern: 'clsx',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],

      // React
      'react/react-in-jsx-scope': 'off',

      // Удаление неиспользуемых импортов
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Чтобы нормально работать с TS
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
