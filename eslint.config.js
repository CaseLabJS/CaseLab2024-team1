import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';
import pluginMobx from 'eslint-plugin-mobx';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist', '!.storybook'] },

  {
    settings: { react: { version: '18.3' } },
    extends: [
      js.configs.recommended,
      // ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...storybook.configs['flat/recommended'],
      pluginMobx.flatConfigs.recommended,
      prettierRecommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  }
);
