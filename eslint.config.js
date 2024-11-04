// @ts-check

import defineConfig from '@akisaira/eslint-config'

export default [
  ...defineConfig({
    tsconfigPath: './tsconfig.json',
    tsconfigRootDir: '.',
    extensionsEnabled: {
      solid: true
    }
  }),
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  }
]
