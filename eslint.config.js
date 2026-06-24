import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintReact from '@eslint-react/eslint-plugin'
import noHardcodedStrings from 'eslint-plugin-no-hardcoded-strings'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'no-hardcoded-strings': noHardcodedStrings,
      '@eslint-react': eslintReact,
    },
    rules: {
      'no-hardcoded-strings/no-hardcoded-strings': ['error', {
        ignoreStrings: ['←', '→', '·', '↓', '↑', '.'],
      }],
      ...eslintReact.configs['recommended-typescript'].rules,
    },
  },
])
